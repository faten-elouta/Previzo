import os

# 1. Base de données technique (Metastore)
# On récupère la chaîne complète que tu as déjà construite dans le Docker Compose
SQLALCHEMY_DATABASE_URI = os.getenv('SUPERSET_SQLALCHEMY_DATABASE_URI')

# 2. Configuration du Cache (Valkey)
REDIS_HOST = os.getenv('SUPERSET_REDIS_HOST')
REDIS_PORT = os.getenv('SUPERSET_REDIS_PORT')

def get_cache_config(prefix):
    return {
        'CACHE_TYPE': 'RedisCache',
        'CACHE_DEFAULT_TIMEOUT': 300,
        'CACHE_KEY_PREFIX': prefix,
        'CACHE_REDIS_HOST': REDIS_HOST,
        'CACHE_REDIS_PORT': REDIS_PORT,
    }

CACHE_CONFIG = get_cache_config('superset_cache_')
DATA_CACHE_CONFIG = get_cache_config('superset_data_')
FILTER_STATE_CACHE_CONFIG = get_cache_config('superset_filter_')
EXPLORE_FORM_DATA_CACHE_CONFIG = get_cache_config('superset_explore_')

# 3. Sécurité et Embedding
SECRET_KEY = os.getenv('SUPERSET_SECRET_KEY')
ENABLE_CORS = os.getenv('SUPERSET_ENABLE_CORS', 'false').lower() == 'true'

# On autorise l'affichage dans les iframes de Payload
HTTP_HEADERS = {'X-Frame-Options': 'ALLOWALL'}
OVERRIDE_CONF = True

# Liste blanche CORS pour ton frontend (localhost:3000 par défaut pour Payload)
CORS_OPTIONS = {
    'supports_credentials': True,
    'allow_headers': ['*'],
    'expose_headers': ['*'],
    'allow_methods': ['*'],
    'allow_origin': ['http://localhost:3000'], 
}

# 4. Feature Flags
FEATURE_FLAGS = {
    "EMBEDDED_SUPERSET": os.getenv('SUPERSET_FEATURE_EMBEDDED_SUPERSET', 'false').lower() == 'true',
    "TALISMAN_ENABLED": False, # Désactivé pour faciliter le développement des iframes en local
}

# Log pour confirmer le chargement dans les docker logs
print(f">>>> Config Superset chargée : {SQLALCHEMY_DATABASE_URI.split('@')[-1]}")