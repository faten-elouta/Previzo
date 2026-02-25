FROM debian:trixie-slim

LABEL maintainer=https://gitlab.brgm.fr/brgm/dev
LABEL author=t.faurie
# CalVer 0Y.0D.INCREMENT (https://calver.org/)
LABEL version=2026.056.0

# Variables d'environnement
ENV NODE_VERSION=24
ENV PNPM_VERSION=10
ENV NVM_VERSION=0.40.4
ENV PYTHON_VERSION=3.14.3
ENV SHELL=/bin/bash

# Installation des dépendances de base
RUN apt update && apt install -y git curl wget procps gpg

# Installation de NVM et Node et PNPM
RUN curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh | bash
RUN bash -c "source ~/.bashrc && nvm install ${NODE_VERSION} && nvm alias default ${NODE_VERSION} && nvm use default"
RUN bash -c "source ~/.bashrc && corepack enable pnpm && corepack prepare pnpm@${PNPM_VERSION} --activate"

# Installation des dépendances de build Python (https://github.com/pyenv/pyenv/wiki#suggested-build-environment)
RUN apt install -y make build-essential libssl-dev zlib1g-dev \
    libbz2-dev libreadline-dev libsqlite3-dev curl git \
    libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev

# Installation Pyenv et Python
RUN curl -fsSL https://pyenv.run | bash
RUN echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc \
    && echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc \
    && echo 'eval "$(pyenv init - bash)"' >> ~/.bashrc

# Installation de Python
RUN bash -c "source ~/.bashrc && pyenv install ${PYTHON_VERSION} && pyenv global ${PYTHON_VERSION}"

# Nettoyage du cache APT
RUN apt clean && rm -rf /var/lib/apt/lists/*

CMD ["sleep", "infinity"]