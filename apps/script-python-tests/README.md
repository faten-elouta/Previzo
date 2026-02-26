# Script Python Tests

## Instructions générales

L'implémentation dans la stack Sandbox implique la création d'une entité `Apps` côté Payload CMS. Cette entité doit être configurée avec les droits appropriés pour la lecture/gestion de contenu. L'authentification s'effectue avec une clé d'API, qui doit être générée et utilisée pour les requêtes.
⚠️ L'API Key n'est accessible qu'à sa création. Assurez-vous de la copier et de la stocker en lieu sûr, car elle ne pourra pas être récupérée ultérieurement.

```javascript
const response = await fetch('http://localhost:3000/api/reports', {
  headers: {
    Authorization: `${Apps.slug} API-Key ${YOUR_API_KEY}`,
  },
})
```

## Comment tester avec un script en Python (Payload CMS)

Lancer le script Python `test_read_reports.py` pour vérifier la connexion à l'API et la récupération des données. Assurez-vous d'avoir installé les dépendances nécessaires (comme `httpx`) et d'avoir configuré les variables d'environnement pour l'URL de l'API et la clé d'API.

```bash
python -m venv .venv
source .venv/bin/activate  # Sur Windows : .venv\Scripts\activate
pip install -r requirements.txt
```

Voici un exemple de commande pour exécuter le script avec un paramètre de limite pour les rapports à récupérer :

```bash
python test_read_reports.py --count 10
```

Pour fetcher les données sous-jacentes d'un chart rattaché à un rapport :

```bash
python test_read_reports.py --count 1 --fetch-data
```
