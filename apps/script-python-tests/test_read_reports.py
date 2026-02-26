import httpx
import json
import click

class PayloadClient:
    def __init__(self, base_url, api_key):
        self.base_url = base_url.rstrip('/')
        # Payload utilise souvent des API Keys ou des jetons JWT
        self.headers = {
            "Authorization": f"apps API-Key {api_key}",
            "Content-Type": "application/json"
        }

    def get_collection(self, collection_slug, tenant_id=None, limit=10):
        """
        Récupère les documents d'une collection avec un filtre optionnel par Tenant.
        """
        url = f"{self.base_url}/api/{collection_slug}"
        
        # Payload utilise une syntaxe de query complexe (qs) en interne, 
        # mais on peut passer des dictionnaires simples pour le filtrage.
        params = {
            "limit": limit,
            "depth": 1, # Profondeur des relations (très utile !)
        }

        if tenant_id:
            # Filtre : où le champ 'tenant' est égal à tenant_id
            params["where[tenant][equals]"] = tenant_id

        try:
            with httpx.Client(headers=self.headers) as client:
                response = client.get(url, params=params)
                response.raise_for_status()
                return response.json()
        except httpx.HTTPStatusError as e:
            print(f"Erreur lors de la requête : {e.response.status_code} - {e.response.text}")
            return None

class SmartSupersetClient:
    def __init__(self, url, user, pwd):
        self.url = url
        self.creds = {"username": user, "password": pwd, "provider": "db"}
        self.token = None

    def _login(self):
        r = httpx.post(f"{self.url}/api/v1/security/login", json=self.creds)
        self.token = r.json().get("access_token")

    def request(self, method, endpoint, **kwargs):
        if not self.token: self._login()
        
        headers = {"Authorization": f"Bearer {self.token}"}
        r = httpx.request(method, f"{self.url}{endpoint}", headers=headers, **kwargs)
        
        if r.status_code == 401: # Token expiré ?
            self._login()
            headers["Authorization"] = f"Bearer {self.token}"
            r = httpx.request(method, f"{self.url}{endpoint}", headers=headers, **kwargs)
        
        return r.json()

# --- Utilisation ---
API_URL = "http://cms:3000"
API_KEY = "b999b32d-3112-4192-9f3b-fee332693f47" # À générer dans la collection 'apps' de Payload
SUPERSET_URL = "http://superset:8088"
SUPERSET_USER = "admin"
SUPERSET_PWD = "admin"

@click.command()
@click.option('--count', default=10, help='Nombre de rapports à récupérer')
@click.option('--fetch-data', is_flag=True, help='Récupérer les données complètes rattachés aux graphiques des rapports')
def main(count, fetch_data):
    client = PayloadClient(API_URL, API_KEY)
    data = client.get_collection("reports", limit=count)

    if fetch_data:
        print("Récupération des rapports avec données complètes...")
        superset_client = SmartSupersetClient(SUPERSET_URL, SUPERSET_USER, SUPERSET_PWD)
        if data:
            charts_data = []
            for doc in data['docs']:
                # Récupère les identifiants des graphiques liés au rapport (.report.content[].chart.supersetChartId)
                chart_ids = []
                for content in doc.get('content', []):
                    if content.get('chart') and content['chart'].get('supersetChartId'):
                        chart_ids.append(content['chart']['supersetChartId'])
                print(f"[{doc['id']}] - {doc['title']} (Statut: {doc.get('_status', 'N/A')}) - Graphiques liés: {len(chart_ids)}")
                # Récupération des données complètes pour chaque graphique lié
                for chart_id in chart_ids:
                    # Récupère les métadonnées du graphique
                    chart_metadata = superset_client.request("GET", f"/api/v1/chart/{chart_id}")
                    query_context = chart_metadata.get('result', {}).get('query_context')
                    if query_context:
                        None
                    else:
                        raise click.ClickException(f"Le graphique {chart_id} n'a pas de query_context valide.")
                    data_req_payload = json.loads(query_context)
                    data_response = superset_client.request("POST", f"/api/v1/chart/data", json=data_req_payload)
                    data_result = data_response.get('result', [])[0]
                    charts_data.append({
                        "data": data_result.get('data', [])
                    })
            print(json.dumps({
                "report": doc,
                "charts": charts_data
            }, indent=2))
        else:
            print("Aucun rapport trouvé.")
    else:
        print("Récupération des rapports (sans données complètes)...")
        if data:
            for doc in data['docs']:
                print(f"[{doc['id']}] - {doc['title']} (Statut: {doc.get('_status', 'N/A')})")
                # Affiche les champs principaux sans les données complètes
                print(json.dumps({
                    "id": doc['id'],
                    "title": doc['title'],
                    "_status": doc.get('_status', 'N/A'),
                    "createdAt": doc.get('createdAt'),
                    "updatedAt": doc.get('updatedAt'),
                }, indent=2))
        else:
            print("Aucun rapport trouvé.")


if __name__ == "__main__":
    main()
