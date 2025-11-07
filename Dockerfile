# Folosim un Node.js slim image
FROM node:22-slim

# Instalăm librăriile necesare pentru Chromium
RUN apt-get update && apt-get install -y \
    wget \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libasound2 \
    libxshmfence1 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libdrm2 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libnss3 \
    lsb-release \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Setăm directorul de lucru
WORKDIR /app

# Copiem fișierele Node.js
COPY package*.json ./
RUN npm install

# Instalăm Chromium
RUN npx playwright install chromium --with-deps

COPY . .

# Variabile de mediu (le poți suprascrie în Render)
ENV WIZZ_EMAIL="emailul_tău"
ENV WIZZ_PASS="parola_ta"

# Comanda default
CMD ["node", "index.js"]
