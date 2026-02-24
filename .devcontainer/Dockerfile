FROM debian:trixie-slim

LABEL maintainer=https://gitlab.brgm.fr/brgm/dev
LABEL author=t.faurie
# CalVer 0Y.0D.INCREMENT (https://calver.org/)
LABEL version=2026.055.0

# Variables d'environnement
ENV NODE_VERSION=24
ENV PNPM_VERSION=10
ENV NVM_VERSION=0.40.4
ENV SHELL=/bin/bash

# Installation des dépendances de base
RUN apt update && apt install -y git curl wget procps gpg

# Installation de NVM et Node et PNPM
RUN curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh | bash
RUN bash -c "source ~/.bashrc && nvm install ${NODE_VERSION} && nvm alias default ${NODE_VERSION} && nvm use default"
RUN bash -c "source ~/.bashrc && corepack enable pnpm && corepack prepare pnpm@${PNPM_VERSION} --activate"

# Nettoyage du cache APT
RUN apt clean && rm -rf /var/lib/apt/lists/*

CMD ["sleep", "infinity"]