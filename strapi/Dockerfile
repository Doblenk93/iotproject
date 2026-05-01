FROM node:18-alpine

# --- PERBAIKAN 1: Install System Dependencies ---
# Strapi sangat bergantung pada library 'sharp' untuk kompresi/olah gambar.
# Alpine Linux butuh tool tambahan ini agar 'sharp' bisa di-install tanpa error.
RUN apk update && \
    apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1

WORKDIR /srv/app

ENV NODE_ENV production

# Copy project files
COPY package*.json ./
RUN npm ci
COPY . .

# Build Strapi
RUN npm run build

# Expose port
EXPOSE 1337

# Start command
CMD ["npm", "run", "start"]