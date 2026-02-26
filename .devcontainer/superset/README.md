# Init Superset

Après la création du conteneur (à l'intérieur du conteneur) :

1. Initialiser la base de données :

```bash
superset db upgrade
```

2. Créer un utilisateur admin :

```bash
superset fab create-admin \
    --username admin \
    --firstname admin \
    --lastname admin \
    --email admin@admin.com \
    --password admin
```

3. Initialiser Superset :

```bash
superset init
```

4. Enjoy : login with admin/admin

5. Ajouter la source de données `olap_sandbox` (schéma `public`)
