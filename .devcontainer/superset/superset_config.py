import os

# ============================================================
# Base de données
# ============================================================
SQLALCHEMY_DATABASE_URI = os.getenv("SUPERSET_SQLALCHEMY_DATABASE_URI")

# ============================================================
# Cache Redis / Valkey
# ============================================================
REDIS_HOST = os.getenv("SUPERSET_REDIS_HOST", "valkey")
REDIS_PORT = int(os.getenv("SUPERSET_REDIS_PORT", "6379"))


def get_cache_config(prefix):
    return {
        "CACHE_TYPE": "RedisCache",
        "CACHE_DEFAULT_TIMEOUT": 300,
        "CACHE_KEY_PREFIX": prefix,
        "CACHE_REDIS_HOST": REDIS_HOST,
        "CACHE_REDIS_PORT": REDIS_PORT,
    }


CACHE_CONFIG = get_cache_config("superset_cache_")
DATA_CACHE_CONFIG = get_cache_config("superset_data_")
FILTER_STATE_CACHE_CONFIG = get_cache_config("superset_filter_")
EXPLORE_FORM_DATA_CACHE_CONFIG = get_cache_config("superset_explore_")

# ============================================================
# Sécurité
# ============================================================
SECRET_KEY = os.getenv("SUPERSET_SECRET_KEY", "change-me-secret-key")

# Garde CSRF activé par défaut.
# Ne désactive que si tu sais exactement pourquoi.
WTF_CSRF_ENABLED = True

# Si tu as un endpoint custom à exempter, mets-le explicitement ici.
WTF_CSRF_EXEMPT_LIST = []

# ============================================================
# Rôles / accès public
# ============================================================
AUTH_ROLE_PUBLIC = "Public"
PUBLIC_ROLE_LIKE = "Public"

# Pour l'embed SDK/guest token, garde un rôle guest dédié
# plutôt que de réutiliser "Public".
GUEST_ROLE_NAME = "Gamma"

# ============================================================
# Feature flags
# ============================================================
FEATURE_FLAGS = {
    "EMBEDDED_SUPERSET": True,
    "DASHBOARD_RBAC": True,
    "ENABLE_TEMPLATE_PROCESSING": True,
    "DISABLE_EMBEDDED_SUPERSET_LOGOUT": True,
}

# ============================================================
# Guest token JWT
# ============================================================
GUEST_TOKEN_JWT_SECRET = os.getenv("GUEST_TOKEN_JWT_SECRET", "change-this-guest-secret")
GUEST_TOKEN_JWT_AUDIENCE = os.getenv("GUEST_TOKEN_JWT_AUDIENCE", "superset")
GUEST_TOKEN_JWT_ALGORITHM = "HS256"

# ============================================================
# Cookies
# ============================================================
# En iframe/embed, Superset recommande SameSite=None + Secure=True
SESSION_COOKIE_SAMESITE = "None"
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True

# En local HTTP pur, certains navigateurs refuseront quand même
# les cookies Secure. L'idéal est d'utiliser HTTPS même en local
# via reverse proxy.
MAPBOX_API_KEY = os.getenv("MAPBOX_API_KEY", "")

# ============================================================
# CORS
# ============================================================
ENABLE_CORS = True
CORS_OPTIONS = {
    "supports_credentials": True,
    "allow_headers": ["*"],
    "expose_headers": ["*"],
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "origins": [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5000",
        "http://127.0.0.1:5000",
        "http://localhost:8088",
        "http://127.0.0.1:8088",
        # ajoute ici ton front réel en prod, ex:
        # "https://mon-app.exemple.com",
    ],
}

# ============================================================
# CSP / iframe
# ============================================================
HTTP_HEADERS = {}

TALISMAN_ENABLED = True
TALISMAN_CONFIG = {
    "force_https": False,  # passe à True en prod derrière HTTPS
    "session_cookie_secure": True,
    "frame_options": None,
    "content_security_policy": {
        "default-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "data:", "blob:"],
        "img-src": ["'self'", "data:", "blob:", "*"],
        "worker-src": ["'self'", "blob:"],
        "connect-src": ["'self'", "*"],
        "frame-ancestors": [
            "'self'",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:5000",
            "http://127.0.0.1:5000",
            # ajoute ici ton domaine front réel en prod
            # "https://mon-app.exemple.com",
        ],
    },
}