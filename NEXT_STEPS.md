# 🎯 LANGKAH BERIKUTNYA - Quick Reference

## ✅ Apa yang Sudah Selesai

Setup environment dan service layer untuk integrasi Strapi CMS sudah 100% complete:

### File & Folder yang Dibuat:
```
✅ Root Level:
   - .env (environment variables untuk 2 database)
   - .env.example (template)
   - init-db.sql (auto-initialize Strapi database)
   - STRAPI_INTEGRATION_GUIDE.md (dokumentasi lengkap)
   - STRAPI_SETUP_SUMMARY.md (ringkasan setup)

✅ Frontend:
   - src/services/strapiService.ts (API service layer)
   - src/hooks/useStrapi.ts (custom hooks)
   - src/types/strapi/index.ts (TypeScript types)
   - src/components/CompanyInfoDisplay.tsx
   - src/components/TeamMembersDisplay.tsx
   - src/components/ServicesDisplay.tsx
   - .env.local (frontend environment)

✅ Strapi:
   - .env (Strapi configuration)

✅ Docker:
   - docker-compose.yml (updated dengan 2 database config)
```

---

## 🚀 LANGKAH 1: Jalankan Docker (5 menit)

### 1a. Verifikasi .env File
```bash
# Buka file .env di root project
# Pastikan sudah terisi:

DB_USER=admin
DB_PASS=adminpassword
DB_IOT_NAME=sensordata

DB_STRAPI_NAME=strapi_data
DB_STRAPI_USER=strapi_user
DB_STRAPI_PASS=strapi_password

STRAPI_APP_KEYS=NHxLpRCvYJGNu/VhP7Ul0Q==,eZJxqsIX7DEuc5X93ifLnA==,eAzwmLBGUvCKd45BLB0Unw==,oQdqCNxdJaetrmeXbqbaTg==
STRAPI_API_TOKEN_SALT=yG2BisWsqftBsVBQ6Fo/2Q==
STRAPI_ADMIN_JWT_SECRET=1wuJC7rpsh3xN1YyztSr5Q==
STRAPI_JWT_SECRET=JtavwKK16/0NBd76hOL/kw==
STRAPI_TRANSFER_TOKEN_SALT=9HCPezmH6dGNQyv0FbUA+A==
STRAPI_ENCRYPTION_KEY=K7XNkZrQswz8J1l+wrCCkQ==

# Update ini dengan ImageKit credentials:
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

### 1b. Build & Run Docker
```bash
cd e:\Source_Code\iotproject

# Build images
docker-compose build

# Start services
docker-compose up -d

# Verify services running
docker-compose ps
```

### 1c. Verifikasi Services
```bash
# Check database
docker-compose logs database | tail -20

# Check Strapi
docker-compose logs strapi | tail -20

# Check frontend
docker-compose logs frontend | tail -20
```

**Expected URLs:**
- Strapi Admin: http://localhost:1337/admin
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Database: localhost:5432

---

## 🏗️ LANGKAH 2: Setup Content Types di Strapi (15-20 menit)

### 2a. Login ke Strapi Admin
1. Buka http://localhost:1337/admin
2. Create admin account (first run)
3. Login

### 2b. Create Content Types (via Content-Type Builder)

**COMPANY INFO (Single Type)**
1. Click **Content-Type Builder**
2. Click **Create new single type**
3. Name: `company-info` (format ini important!)
4. Add fields:
   - `companyName` (Text) - required
   - `description` (Rich text) - required
   - `address` (Text)
   - `email` (Email)
   - `phone` (Text)
   - `logo` (Media)
5. **Save**
6. Go back, find `company-info`, click publish

**TEAM MEMBERS (Collection Type)**
1. Click **Create new collection type**
2. Name: `team-member`
3. Add fields:
   - `name` (Text) - required
   - `position` (Text) - required
   - `bio` (Rich text)
   - `email` (Email)
   - `photo` (Media)
4. **Save**

**SERVICES (Collection Type)**
1. Click **Create new collection type**
2. Name: `service`
3. Add fields:
   - `title` (Text) - required
   - `description` (Rich text) - required
   - `shortDescription` (Text)
   - `image` (Media)
4. **Save**

**PROJECTS (Collection Type) - Optional**
1. Name: `project`
2. Add fields:
   - `title` (Text) - required
   - `slug` (UID) - required
   - `description` (Rich text)
   - `shortDescription` (Text)
   - `featuredImage` (Media)
   - `images` (Media - allow multiple)
3. **Save**

**TESTIMONIALS (Collection Type) - Optional**
1. Name: `testimonial`
2. Add fields:
   - `clientName` (Text) - required
   - `content` (Text) - required
   - `rating` (Number)
   - `photo` (Media)
3. **Save**

### 2c. Set Permissions

1. Go to **Settings → Roles** (left sidebar)
2. Click **Public**
3. Scroll down to **Permissions**
4. Expand semua content types
5. Check **find** dan **findOne** untuk:
   - company-info
   - team-members
   - services
   - (projects dan testimonials if created)
6. Click **Save**

### 2d. Add Test Data
1. Go ke **Content Manager**
2. Untuk setiap content type, create minimal test entry:
   - **company-info**: Add 1 entry dengan company name dan description
   - **team-member**: Add 2-3 sample entries
   - **services**: Add 2-3 sample entries
3. **Publish** setiap entry

### Verify API Working
```bash
# Test di browser atau Postman
http://localhost:1337/api/company-info?populate=*
http://localhost:1337/api/team-members?populate=*
http://localhost:1337/api/services?populate=*
```

Should return JSON data jika working correctly.

---

## 🔌 LANGKAH 3: Integrate ke Frontend (15-20 menit)

### 3a. Pilih One of Two Approaches:

#### Option A: Server-Side Rendering (RECOMMENDED untuk static company profile)
```typescript
// File: src/app/(profile)/about/page.tsx

import { getCompanyInfo, getTeamMembers } from '@/services/strapiService';
import { CompanyInfoDisplay } from '@/components/CompanyInfoDisplay';
import { TeamMembersDisplay } from '@/components/TeamMembersDisplay';

export const revalidate = 3600; // Revalidate setiap 1 jam

export default async function AboutPage() {
  const companyInfo = await getCompanyInfo();
  const teamMembers = await getTeamMembers();

  return (
    <div className="space-y-12 py-12 px-4">
      <CompanyInfoDisplay data={companyInfo.data} />
      <TeamMembersDisplay data={teamMembers} />
    </div>
  );
}
```

#### Option B: Client-Side (untuk real-time updates)
```typescript
'use client';

import { useStrapiData } from '@/hooks/useStrapi';
import { CompanyInfoDisplay } from '@/components/CompanyInfoDisplay';

export default function AboutPage() {
  const { data, loading, error } = useStrapiData('/company-info?populate=*');

  return (
    <CompanyInfoDisplay 
      data={data} 
      loading={loading} 
      error={error} 
    />
  );
}
```

### 3b. Update .env.local (Frontend)
```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3c. Integrate Existing Components

Perbarui existing components untuk use Strapi data:

**For Contacts Page:**
```typescript
import { getCompanyInfo } from '@/services/strapiService';

// Inject contact info dari Strapi
const companyInfo = await getCompanyInfo();
const { email, phone, address } = companyInfo.data.attributes;

// Use di template
```

**For Projects Component:**
```typescript
import { getProjects } from '@/services/strapiService';

// Ambil project data dari Strapi
const projects = await getProjects();

// Map ke existing component
```

### 3d. Test Integration
```bash
# Build frontend
cd frontend
npm run build

# Atau run dev server
npm run dev
```

Access http://localhost:3000 dan verify data loading dari Strapi.

---

## 🖼️ LANGKAH 4: Test ImageKit Integration (5 menit)

### 4a. Upload Test Image
1. Di Strapi Admin, go ke **Content Manager**
2. Edit **company-info** entry
3. Click logo field → Upload image
4. Pilih image dan upload

### 4b. Verify ImageKit
1. Check image tersimpan di ImageKit dashboard
2. Verify URL format: `https://ik.imagekit.io/your_id/...`

### 4c. Test di Frontend
Image should display dengan optimization (compressed, resized, etc.)

---

## ✨ LANGKAH 5: Customize & Extend (20-30 menit)

### 5a. Tambah Content Types Baru
Ikuti pattern yang sama:
1. Create di Strapi admin
2. Create type definition di `src/types/strapi/index.ts`
3. Create service function di `src/services/strapiService.ts`
4. Create display component di `src/components/`

### 5b. Styling Components
Components sudah punya basic styling. Customize dengan:
- Tailwind classes
- Custom CSS modules
- UI library (shadcn/ui, Material-UI, etc.)

### 5c. Add More Fields
Update content types dengan field:
- Categories
- Tags
- Dates
- Relations to other types
- Custom fields (JSON)

---

## 📊 File Structure Final

```
iotproject/
├── .env                          ← Main config (2 database)
├── .env.example                  ← Template
├── init-db.sql                   ← Auto-init Strapi DB
├── docker-compose.yml            ← Updated dengan 2 DB
├── Caddyfile
│
├── STRAPI_INTEGRATION_GUIDE.md   ← Full documentation
├── STRAPI_SETUP_SUMMARY.md       ← Setup summary
│
├── strapi/                        ← Strapi CMS
│   ├── .env                      ← Strapi config
│   └── ... (Strapi project files)
│
├── frontend/                      ← Next.js
│   ├── .env.local                ← Frontend config
│   ├── src/
│   │   ├── services/
│   │   │   └── strapiService.ts  ← API layer
│   │   ├── hooks/
│   │   │   └── useStrapi.ts      ← Custom hooks
│   │   ├── types/
│   │   │   └── strapi/
│   │   │       └── index.ts      ← Type definitions
│   │   ├── components/
│   │   │   ├── CompanyInfoDisplay.tsx
│   │   │   ├── TeamMembersDisplay.tsx
│   │   │   └── ServicesDisplay.tsx
│   │   └── app/
│   │       └── ... (pages)
│   └── ... (Next.js project files)
│
├── backend/                       ← Python FastAPI
│   └── ... (IoT backend)
│
└── mqtt/
    └── mosquitto.conf
```

---

## 🎯 Success Indicators

✅ Setup Complete ketika:
1. ✅ Semua Docker services berjalan (`docker-compose ps`)
2. ✅ Bisa access Strapi admin (http://localhost:1337/admin)
3. ✅ Content types sudah created dengan test data
4. ✅ API endpoints respond dengan data (test di Postman)
5. ✅ Frontend components display Strapi data correctly
6. ✅ Images upload ke ImageKit dan display dengan optimization

---

## 🔗 Documentation Files

Baca files ini untuk detail lebih:

1. **STRAPI_INTEGRATION_GUIDE.md** - Full documentation
   - Setup lengkap
   - API reference
   - Best practices
   - Troubleshooting

2. **STRAPI_SETUP_SUMMARY.md** - Setup summary
   - File overview
   - Architecture
   - Quick commands

3. **strapiService.ts** - API functions
   - getCompanyInfo()
   - getTeamMembers()
   - getServices()
   - etc.

4. **useStrapi.ts** - Custom hooks
   - useStrapiData<T>() 
   - useStrapiPagination<T>()

---

## 💡 Pro Tips

1. **Use Postman** untuk test API sebelum integrate ke frontend
   - Base URL: `http://localhost:1337/api`
   - Format: `/endpoint?populate=*`

2. **Use TypeScript** untuk type safety
   - Import dari `@/types/strapi`
   - IDE akan auto-complete

3. **Cache responses** di frontend
   - Server-side: `export const revalidate = 3600`
   - Client-side: `useStrapiData()` dengan callbacks

4. **Monitor ImageKit** quota
   - Dashboard di https://imagekit.io
   - Free tier: 5000 files, 20GB/month

5. **Keep .env.local** out of git
   - Add ke .gitignore
   - Share .env.example instead

---

## 🆘 If Something Goes Wrong

### Database Error
```bash
docker-compose logs database
# Check connection & init script
```

### Strapi Not Starting
```bash
docker-compose logs strapi
# Check database connection & env vars
```

### Frontend Not Fetching
```bash
# Test API endpoint di browser:
http://localhost:1337/api/team-members?populate=*

# Check browser console untuk CORS errors
# Check Strapi logs untuk permission errors
```

### ImageKit Not Working
```bash
# Verify credentials di .env
# Check ImageKit dashboard
# Check Strapi logs untuk upload errors
```

---

## 📞 Quick Reference

| Component | URL | Purpose |
|-----------|-----|---------|
| Strapi Admin | http://localhost:1337/admin | Manage content |
| Strapi API | http://localhost:1337/api | REST API endpoints |
| Frontend | http://localhost:3000 | Next.js app |
| Backend | http://localhost:8000 | IoT API |
| Database | localhost:5432 | PostgreSQL |
| ImageKit | https://imagekit.io | Media management |

---

## ✅ Next Steps Summary

1. **Run Docker** (5 min)
   ```bash
   docker-compose up -d
   ```

2. **Setup Content Types** (15-20 min)
   - Login to Strapi admin
   - Create content types
   - Add test data
   - Set permissions

3. **Integrate Frontend** (15-20 min)
   - Choose SSR or CSR approach
   - Update pages/components
   - Test data fetching

4. **Test ImageKit** (5 min)
   - Upload image via Strapi
   - Verify display

5. **Customize** (20-30 min)
   - Add more content types
   - Style components
   - Extend functionality

---

**Estimated Total Time**: ~1.5-2 hours untuk complete setup

**Status**: Ready to proceed with implementation! 🚀

---

Pertanyaan? Lihat STRAPI_INTEGRATION_GUIDE.md untuk detail lengkap.
