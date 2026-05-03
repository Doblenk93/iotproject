# -------- Builder Stage --------
FROM node:22-alpine AS builder

# Tambahkan libc6-compat untuk fix masalah esbuild tadi
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git libc6-compat

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /srv/app

COPY package*.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm ci

COPY . .
RUN npm run build

# -------- Runtime Stage --------
FROM node:22-alpine

RUN apk update && apk add --no-cache vips-dev bash libc6-compat

WORKDIR /srv/app
ENV NODE_ENV=production

# Copy node_modules
COPY --from=builder /srv/app/node_modules ./node_modules

# Copy SELURUH dist (sudah compiled .js)
COPY --from=builder /srv/app/dist ./

# Copy public
COPY --from=builder /srv/app/public ./public

# Copy package.json
COPY --from=builder /srv/app/package*.json ./

ENV PATH=/srv/app/node_modules/.bin:$PATH

EXPOSE 1337

CMD ["npm", "run", "start"]