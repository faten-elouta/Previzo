# Sandbox - Previzo X contenu éditorial
<img width="818" height="384" alt="image" src="https://github.com/user-attachments/assets/dc600b3b-36c1-430d-a08a-f99906fa4b8b" />

## Objectifs

Cette sandbox a pour but de tester les interactions entre une application externe (simulé par un script Python) et le CMS Payload, en se concentrant sur la récupération de données à partir de collections spécifiques. L'objectif est de valider les permissions d'accès et la structure des données retournées par l'API de Payload.

En particulier, nous testons la capacité d'une application à lire des données et métadonnées de "rapports" stockés dans Payload et, conjointement, à récupérer les données sous-jacentes d'un "chart" rattaché à un rapport, en respectant les règles d'accès définies dans Payload.

## Prérequis

L'usage de docker, des devcontainers et d'un IDE compatible avec les devcontainers (comme VSCode) est recommandé pour faciliter la configuration de l'environnement de développement et d'exécution.

## La stack Sandbox

La stack Sandbox est composée de plusieurs applications, chacune jouant un rôle spécifique dans la simulation d'un environnement de travail réel :
- **CMS Payload** : Le cœur de la stack, où les données sont stockées et gérées. C'est ici que les rapports et les charts sont créés et configurés.
- **Script Python de test** : Un script Python qui simule une application externe interagissant avec l'API de Payload pour récupérer des données et tester les permissions d'accès.
- **Apache Superset** : Un outil de visualisation de données qui peut être utilisé pour créer des charts à partir des métadonnées récupérées de Payload.

# Permissions d'accès

L'application simulée utilise l'entité `Apps` de Payload pour s'authentifier et accéder aux données. Les permissions d'accès sont définies dans Payload, et l'application doit être configurée avec les droits appropriés pour lire les rapports et les charts.

# Lancer la stack Sandbox

Pour lancer la stack Sandbox, suivez les instructions spécifiques à chaque application. Assurez-vous que tous les services sont opérationnels avant d'exécuter le script Python de test.

Automatisés :
- `devcontainer` : Configure et lance l'environnement de développement avec tous les services nécessaires.
- `service containers` : Démarre les conteneurs Docker pour chaque application de la stack.
- `database` : `init.sh` initialise la base de données avec la structure nécessaire pour le fonctionnement de l'écosystème.

Reste à faire après lancement de la stack :
- Suivre les indications dans le README de chaque application pour la configuration initiale, notamment :
    - `.devcontainer/superset/README.md` pour la configuration initiale d'Apache Superset.
- Créer une `App` dans Payload avec les permissions de lecture sur les rapports.
- Importer ses données dans la BDD OLAP (PostgreSQL) pour les rendre accessibles à Superset.
- Ajouter un Dataset dans Superset pointant vers la source de données `olap_sandbox` (schéma `public`).
- Créer un Chart dans Superset basé sur ce Dataset.
- Récupérer l'identifiant du Chart créé (URL -> slice_id=XX)
- Créer un rapport dans Payload en y attachant le Chart via son identifiant (slice_id=XX)
- Exécuter le script Python de test pour vérifier la récupération des rapports et des données du Chart.
