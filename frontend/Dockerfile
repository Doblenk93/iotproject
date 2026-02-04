# --- TAHAP 1: Install Dependencies ---
FROM node:20-alpine AS deps
WORKDIR /app
# Install library tambahan yg kadang dibutuhkan alpine (opsional tapi aman)
RUN apk add --no-cache libc6-compat

# Copy package.json saja dulu biar cache docker optimal
COPY package.json package-lock.json* ./
# Install semua dependencies (termasuk devDependencies buat build)
RUN npm ci

# --- TAHAP 2: Build Aplikasi ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# INI DIA: Kita jalankan perintah build di dalam Docker
RUN npm run build

# --- TAHAP 3: Production Runner (Image Akhir) ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Buat user system biar gak jalan sebagai root (Keamanan)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy file hasil build dari tahap "builder"
# Hanya ambil folder public dan folder .next/static
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Ganti user ke user biasa
USER nextjs

EXPOSE 3000
ENV PORT 3000
# Hostname 0.0.0.0 penting buat Docker
ENV HOSTNAME "0.0.0.0" 

# Perintah jalannya beda dikit karena mode standalone
CMD ["node", "server.js"]