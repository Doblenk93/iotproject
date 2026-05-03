# Ganti dari single-stage menjadi multi-stage build
FROM node:20-alpine AS builder

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

WORKDIR /srv/app
ENV NODE_ENV production

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# -------- Runtime Stage --------
FROM node:20-alpine

RUN apk update && apk add --no-cache vips-dev bash

WORKDIR /srv/app
ENV NODE_ENV production

# Copy hanya files yang dibutuhkan di runtime dari builder
COPY --from=builder /srv/app/node_modules ./node_modules
COPY --from=builder /srv/app/dist ./dist
COPY --from=builder /srv/app/public ./public
COPY --from=builder /srv/app/package*.json ./

EXPOSE 1337

CMD ["npm", "run", "start"]