# 🎯 Panduan Integrasi Strapi CMS ke IoT Project

Dokumentasi lengkap untuk mengintegrasikan Strapi Headless CMS ke dalam project IoT Anda untuk Company Profile.

---

## 📋 Daftar Isi
1. [Setup Awal](#setup-awal)
2. [Database Configuration](#database-configuration)
3. [Environment Variables](#environment-variables)
4. [Menjalankan dengan Docker](#menjalankan-dengan-docker)
5. [Membuat Content Types](#membuat-content-types)
6. [Integrasi Frontend](#integrasi-frontend)
7. [ImageKit Configuration](#imagekit-configuration)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Setup Awal

### Prerequisites
- Node.js 16+ (untuk Strapi lokal)
- Docker & Docker Compose
- PostgreSQL 14+ (via Docker)
- Account ImageKit (https://imagekit.io)

### File Structure
```
iotproject/
├── .env                           # Main environment variables
├── .env.example                   # Template untuk .env
├── init-db.sql                    # Script inisialisasi 2 database
├── docker-compose.yml             # Docker configuration
├── strapi/
│   ├── .env                       # Strapi specific config
│   ├── src/
│   │   ├── api/                   # Content types
│   │   ├── admin/                 # Custom admin configuration
│   │   └── plugins/               # Plugin configuration
│   └── package.json
└── frontend/
    ├── src/
    │   ├── services/
    │   │   └── strapiService.ts   # API service layer
    │   ├── hooks/
    │   │   └── useStrapi.ts       # Custom hooks
    │   ├── types/
    │   │   └── strapi/
    │   │       └── index.ts       # Type definitions
    │   └── components/
    │       ├── CompanyInfoDisplay.tsx
    │       ├── TeamMembersDisplay.tsx
    │       └── ServicesDisplay.tsx
    └── .env.local                 # Frontend environment variables
```

---

## 🗄️ Database Configuration

### 2 Database Terpisah
- **sensordata** (IoT Sensors): Untuk TimescaleDB dan IoT data
- **strapi_data** (Strapi CMS): Untuk content management

### Auto-initialization
File `init-db.sql` secara otomatis:
1. Membuat `strapi_data` database
2. Membuat `strapi_user` dengan credentials
3. Grant privileges untuk Strapi

### Verifikasi Database
```bash
# Connect ke PostgreSQL container
docker exec -it database psql -U admin -d postgres

# Lihat semua database
\l

# Koneksikan ke strapi_data
\c strapi_data

# Lihat tables
\dt
```

---

## 🔐 Environment Variables

### Root .env
Simpan di root folder project (`e:\Source_Code\iotproject\.env`)

```env
# Database - IoT
DB_USER=admin
DB_PASS=adminpassword
DB_IOT_NAME=sensordata

# Database - Strapi
DB_STRAPI_NAME=strapi_data
DB_STRAPI_USER=strapi_user
DB_STRAPI_PASS=strapi_password

# Strapi Configuration
STRAPI_HOST=0.0.0.0
STRAPI_PORT=1337
STRAPI_NODE_ENV=development

# Strapi Secrets (copy dari strapi/.env)
STRAPI_APP_KEYS=...
STRAPI_API_TOKEN_SALT=...
STRAPI_ADMIN_JWT_SECRET=...
STRAPI_JWT_SECRET=...
STRAPI_TRANSFER_TOKEN_SALT=...
STRAPI_ENCRYPTION_KEY=...

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Backend
BACKEND_SECRET_KEY=your_backend_secret

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
```

### Strapi .env
File `strapi/.env` akan auto-load dari parent .env melalui Docker

```env
HOST=${STRAPI_HOST:-0.0.0.0}
PORT=${STRAPI_PORT:-1337}

DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=${DB_STRAPI_NAME:-strapi_data}
DATABASE_USERNAME=${DB_STRAPI_USER:-strapi_user}
DATABASE_PASSWORD=${DB_STRAPI_PASS:-strapi_password}
DATABASE_SSL=false

APP_KEYS=${STRAPI_APP_KEYS}
API_TOKEN_SALT=${STRAPI_API_TOKEN_SALT}
ADMIN_JWT_SECRET=${STRAPI_ADMIN_JWT_SECRET}
JWT_SECRET=${STRAPI_JWT_SECRET}
TRANSFER_TOKEN_SALT=${STRAPI_TRANSFER_TOKEN_SALT}
ENCRYPTION_KEY=${STRAPI_ENCRYPTION_KEY}

NODE_ENV=${STRAPI_NODE_ENV:-development}

IMAGEKIT_PUBLIC_KEY=${IMAGEKIT_PUBLIC_KEY}
IMAGEKIT_PRIVATE_KEY=${IMAGEKIT_PRIVATE_KEY}
IMAGEKIT_URL_ENDPOINT=${IMAGEKIT_URL_ENDPOINT}
```

### Frontend .env.local
File `frontend/.env.local` (jangan commit ke git)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
```

---

## 🐳 Menjalankan dengan Docker

### Build & Start Services
```bash
cd e:\Source_Code\iotproject

# Build images
docker-compose build

# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f strapi
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f database
```

### Akses Services
- **Strapi Admin**: http://localhost:1337/admin
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Database**: localhost:5432

### Troubleshooting Services
```bash
# Restart specific service
docker-compose restart strapi

# Stop all
docker-compose down

# Remove volumes (WARNING: data loss!)
docker-compose down -v

# Check service health
docker-compose ps
```

---

## 📝 Membuat Content Types di Strapi

### 1. Login ke Strapi Admin
- URL: http://localhost:1337/admin
- Create admin account pada first run

### 2. Create Content Types

#### Company Info (Single Type)
1. Go to **Content-Type Builder**
2. Click **Create new single type**
3. Name: `company-info`
4. Add fields:
   - `companyName` (Text)
   - `description` (Rich text)
   - `address` (Text)
   - `email` (Email)
   - `phone` (Text)
   - `logo` (Media)
5. Save

#### Team Members (Collection Type)
1. **Create new collection type**
2. Name: `team-member`
3. Add fields:
   - `name` (Text) - required
   - `position` (Text) - required
   - `bio` (Rich text)
   - `email` (Email)
   - `photo` (Media)
   - `socialLinks` (Dynamic zone or JSON)
4. Save

#### Services (Collection Type)
1. **Create new collection type**
2. Name: `service`
3. Add fields:
   - `title` (Text) - required
   - `description` (Rich text) - required
   - `shortDescription` (Text)
   - `image` (Media)
   - `icon` (Text/Emoji)
   - `order` (Number)
4. Save

#### Projects (Collection Type)
1. **Create new collection type**
2. Name: `project`
3. Add fields:
   - `title` (Text) - required
   - `slug` (UID)
   - `description` (Rich text)
   - `shortDescription` (Text)
   - `category` (Text)
   - `technologies` (Text)
   - `link` (Text/URL)
   - `featuredImage` (Media)
   - `images` (Media - multiple)
   - `order` (Number)
4. Save

#### Testimonials (Collection Type)
1. **Create new collection type**
2. Name: `testimonial`
3. Add fields:
   - `clientName` (Text) - required
   - `content` (Text) - required
   - `rating` (Number 1-5)
   - `position` (Text)
   - `company` (Text)
   - `photo` (Media)
4. Save

### 3. Set Permissions
1. Go to **Settings → Roles**
2. Edit **Public** role
3. Under **Permissions**, enable **find** and **findOne** untuk semua content types
4. Save

### 4. Add Test Data
Setelah membuat content types, add minimal test data di setiap type melalui Strapi admin panel.

---

## 🔌 Integrasi Frontend

### Setup Environment Variables
```bash
# File: frontend/.env.local
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Menggunakan Service Layer - Server-side

**File: `src/app/profile/page.tsx`**

```typescript
import { getCompanyInfo, getTeamMembers } from '@/services/strapiService';
import { CompanyInfoDisplay } from '@/components/CompanyInfoDisplay';
import { TeamMembersDisplay } from '@/components/TeamMembersDisplay';

export const revalidate = 3600; // Revalidate setiap 1 jam

export default async function ProfilePage() {
  const companyInfo = await getCompanyInfo();
  const teamMembers = await getTeamMembers();

  return (
    <div className="space-y-12">
      <CompanyInfoDisplay data={companyInfo.data} />
      <TeamMembersDisplay data={teamMembers} />
    </div>
  );
}
```

### Menggunakan Custom Hook - Client-side

**File: `src/app/dashboard/page.tsx`**

```typescript
'use client';

import { useStrapiData } from '@/hooks/useStrapi';
import { CompanyInfo } from '@/types/strapi';

export default function DashboardPage() {
  const { data, loading, error } = useStrapiData<CompanyInfo>('/company-info?populate=*');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data?.attributes.companyName}</h1>
      <p>{data?.attributes.description}</p>
    </div>
  );
}
```

### Menggunakan Pagination Hook

```typescript
'use client';

import { useStrapiPagination } from '@/hooks/useStrapi';
import { TeamMember } from '@/types/strapi';

export default function TeamListPage() {
  const { data, loading, hasMore, loadMore } = useStrapiPagination<TeamMember>(
    '/team-members',
    { pageSize: 12 }
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {data.map(member => (
          <div key={member.id}>{member.attributes.name}</div>
        ))}
      </div>
      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          Load More
        </button>
      )}
    </div>
  );
}
```

---

## 🖼️ ImageKit Configuration

### Setup ImageKit Account
1. Daftar di https://imagekit.io (free tier available)
2. Create project
3. Get credentials:
   - **Public Key**
   - **Private Key**
   - **URL Endpoint** (format: `https://ik.imagekit.io/your_id`)

### Strapi Plugin Setup
Plugin sudah di-setup via tutorial ImageKit official. Verifikasi:

**File: `strapi/config/plugins.js`**

```javascript
module.exports = {
  upload: {
    config: {
      provider: 'imagekit',
      providerOptions: {
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      },
    },
  },
};
```

### Upload Images
1. Di Strapi admin, upload media melalui normal upload interface
2. Media otomatis dikirim ke ImageKit
3. Strapi menyimpan URL ImageKit di database

### Image Transformation di Frontend
Gunakan `getStrapiImageUrl()` helper:

```typescript
import { getStrapiImageUrl } from '@/services/strapiService';

const imageUrl = getStrapiImageUrl(imageData.attributes.url);
// URL sudah siap dengan ImageKit optimization
```

### ImageKit Free Tier Limits
- ⚠️ 5000 files per project
- ⚠️ 20GB bandwidth/month
- Monitor usage di dashboard ImageKit

---

## ✅ Best Practices

### 1. API Response Caching
```typescript
// Gunakan Next.js ISR untuk cache responses
export const revalidate = 3600; // Revalidate setiap 1 jam

// Atau on-demand revalidation
import { revalidateTag } from 'next/cache';

revalidateTag('company-info');
```

### 2. Type Safety
```typescript
// Selalu gunakan type dari Strapi types
import { CompanyInfo, TeamMember } from '@/types/strapi';

const company: CompanyInfo = await getCompanyInfo();
```

### 3. Error Handling
```typescript
try {
  const data = await getCompanyInfo();
  // Use data
} catch (error) {
  console.error('Failed to fetch company info:', error);
  // Fallback UI atau default values
}
```

### 4. Image Optimization
```typescript
// Selalu gunakan Image component dari Next.js
import Image from 'next/image';

<Image
  src={getStrapiImageUrl(imageUrl)}
  alt="Description"
  width={400}
  height={300}
  priority // untuk images yang visible immediately
/>
```

### 5. Security
- ✅ Jangan expose secret keys di frontend
- ✅ Gunakan API tokens untuk restricted endpoints
- ✅ Validate input sebelum send ke Strapi
- ✅ Use HTTPS di production

### 6. Performance
- ✅ Use pagination untuk large collections
- ✅ Limit populate depth: `?populate=*&depth=2`
- ✅ Use filter dan sort di Strapi: `?filters[status][$eq]=published&sort=createdAt:desc`
- ✅ Implement lazy loading untuk images

---

## 🔧 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:**
- Pastikan database container running: `docker-compose ps`
- Check logs: `docker-compose logs database`
- Pastikan credentials di .env match dengan docker-compose.yml

### Strapi Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::1337
```
**Solution:**
```bash
# Find process using port 1337
netstat -ano | findstr :1337  # Windows
lsof -i :1337                # macOS/Linux

# Kill process
taskkill /PID <PID> /F       # Windows
kill -9 <PID>                # macOS/Linux

# Atau change port di .env
STRAPI_PORT=1338
```

### ImageKit Not Uploading
**Solution:**
- Verify credentials di .env
- Check ImageKit dashboard apakah folder Strapi ada
- Pastikan API keys memiliki proper permissions
- Check Strapi logs: `docker-compose logs strapi`

### Frontend Not Fetching Data
```
Error: Failed to fetch from Strapi: 404 Not Found
```
**Solution:**
- Pastikan NEXT_PUBLIC_STRAPI_API_URL correct
- Verify content type names di endpoint (case-sensitive)
- Check Strapi permissions: Public role harus punya akses
- Test API di Postman atau browser:
  ```
  http://localhost:1337/api/team-members?populate=*
  ```

### CORS Error
```
Access to XMLHttpRequest... has been blocked by CORS policy
```
**Solution:**
- Strapi CORS sudah di-configure di docker-compose.yml
- Pastikan frontend URL ada di CORS whitelist
- Restart Strapi setelah update CORS config

### Database Data Lost After docker-compose down
```bash
# Gunakan -v HATI-HATI, akan delete volumes!
docker-compose down          # Safe
docker-compose down -v       # WARNING: Data loss!
```

---

## 📚 Useful Resources

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi API Reference](https://docs.strapi.io/dev-docs/api/rest)
- [ImageKit Documentation](https://docs.imagekit.io)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [TypeScript with Strapi](https://docs.strapi.io/dev-docs/configurations/typescript)

---

## 🎓 Next Steps

1. ✅ Setup .env dan docker-compose.yml (SUDAH SELESAI)
2. ✅ Buat service layer dan hooks (SUDAH SELESAI)
3. **TODO**: Jalankan `docker-compose up -d`
4. **TODO**: Create content types di Strapi admin
5. **TODO**: Add test data
6. **TODO**: Integrate komponen ke existing pages
7. **TODO**: Test API integration dengan Postman
8. **TODO**: Deploy ke production

---

## 📞 Support

Jika ada pertanyaan atau issue, cek:
1. Logs: `docker-compose logs <service-name>`
2. Strapi admin panel: http://localhost:1337/admin
3. API documentation: http://localhost:1337/documentation
