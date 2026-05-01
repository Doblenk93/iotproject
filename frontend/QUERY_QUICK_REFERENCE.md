# ⚡ STRAPI QUERY SYSTEM - QUICK REFERENCE

**Untuk development harian. Print atau bookmark ini!**

---

## 🎯 **IMPORT STATEMENT**

```typescript
import { 
  // Service functions
  getGeneralInfoHeader,
  getGeneralInfoFooter,
  getHomePageComplete,
  getPortfolioList,
  getPortfolioDetail,
  getPortfolioByType,
  searchPortfolio,
  getTestimonialList,
  getAboutPageComplete,
  getContactPageComplete,
  
  // Utilities
  getStrapiImageUrl,
  extractBlockContent,
  formatLocationData,
  formatProjectPeriod,
  extractContactInfo,
  extractSocialLinks,
  
  // Batch operations
  getHomePageData,
  getLayoutData,
} from '@/services/strapiService';
```

---

## 📍 **BY COMPONENT LOCATION**

### **Header.tsx**
```typescript
const data = await getGeneralInfoHeader();
// Fields: CompanyName, Email, CompanyLogo
// Size: ~20KB
```

### **Footer.tsx**
```typescript
const data = await getGeneralInfoFooter();
// Fields: semua + Contacts, Socials, BussinessHours
// Size: ~50KB
```

### **HomePage**
```typescript
const [homePage, portfolios, testimonials] = await Promise.all([
  getHomePageComplete(),           // Hero, Background, Capabilities
  getPortfolioList({ pageSize: 3 }), // 3 portfolio items
  getTestimonialList({ pageSize: 3, includeReviews: true }),
]);
```

### **PortfolioListPage**
```typescript
// Default: semua dengan pagination
const data = await getPortfolioList({ pageSize: 12 });

// Filter by type
const data = await getPortfolioByType('Environmental', 1, 12);

// Search
const data = await searchPortfolio('keyword', 1, 12);
```

### **PortfolioDetailPage**
```typescript
const data = await getPortfolioDetail(id);
// Fields: Title, Type, Description, Image, Location, Timestamp
// Size: ~80KB (OK untuk detail page)
```

### **AboutPage**
```typescript
const data = await getAboutPageComplete();
// Fields: PageH1, Background, VisionAndMission, Advantages
```

### **ContactPage**
```typescript
const [contactPage, generalInfo] = await Promise.all([
  getContactPageComplete(),  // Page specific
  getGeneralInfoContact(),   // General contact info
]);
```

---

## 🛠️ **UTILITY FUNCTIONS**

### **Image URLs**
```typescript
const imgUrl = getStrapiImageUrl(imagePath);
// Returns: full URL or placeholder
// Usage: <img src={imgUrl} />
```

### **Block Content**
```typescript
const text = extractBlockContent(blocksData);
// Extracts text dari rich text blocks
```

### **Location Data**
```typescript
const location = formatLocationData(component);
// Returns: { lat, lng, name }
// Usage: Pass ke map component
```

### **Project Period**
```typescript
const period = formatProjectPeriod(component);
// Returns: { startDate, endDate }
```

### **Contact Info**
```typescript
const contacts = extractContactInfo(contactsArray);
// Returns: { email: '...', phone: '...', ... }
```

### **Social Links**
```typescript
const socials = extractSocialLinks(socialsArray);
// Returns: Array<{ platform, url, icon }>
```

---

## 📊 **DATA SIZE REFERENCE**

Gunakan ini untuk estimate bandwidth:

| Query | Size | Usage |
|-------|------|-------|
| Header | ~20KB | Layout component |
| Footer | ~50KB | Layout component |
| Home complete | ~40KB | Homepage |
| Portfolio list (12 items) | ~36KB | List page |
| Portfolio detail | ~80KB | Detail page |
| Testimonial (5 items) | ~15-40KB | List/display |
| About page | ~45KB | About page |
| Contact page | ~45KB | Contact page |

---

## ⚠️ **COMMON MISTAKES**

❌ **Don't:**
```typescript
// Fetch tanpa service functions
fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/portofolios?populate=*`)

// Fetch semua lalu filter di frontend
const all = await getPortfolioList({ pageSize: 100 });
const filtered = all.filter(p => p.type === 'Environmental');

// Tidak gunakan batch untuk multiple requests
const a = await getPortfolioList();
const b = await getTestimonialList();  // Sequential!
```

✅ **Do:**
```typescript
// Gunakan service functions
import { getPortfolioList } from '@/services/strapiService';
const data = await getPortfolioList();

// Filter di Strapi via service
const data = await getPortfolioByType('Environmental', 1, 12);

// Batch requests
const [portfolios, testimonials] = await Promise.all([
  getPortfolioList(),
  getTestimonialList(),
]);
```

---

## 🚦 **WHEN TO USE WHICH QUERY**

### **getGeneralInfoHeader()**
- For: Navigation, top banner
- Include: Logo, name, email only
- Size: Minimal (~20KB)

### **getGeneralInfoFooter()**
- For: Footer section
- Include: All contacts, socials, hours
- Size: Moderate (~50KB)

### **getGeneralInfoContact()**
- For: Contact form page
- Include: Email, address, contacts
- Size: Small (~15KB)

### **getGeneralInfoComplete()**
- For: Admin dashboard
- Include: Everything
- Size: Large (~60KB)

### **getHomePageHero()**
- For: Hero section only
- Include: Title, subtitle, background
- Size: Small (~30KB)

### **getHomePageComplete()**
- For: Full homepage
- Include: All sections + components
- Size: Moderate (~40KB)

### **getPortfolioList()**
- For: Grid/list view
- Options: `pageSize`, `includeDescription`
- Size: ~3KB per item

### **getPortfolioByType(type, page, pageSize)**
- For: Filtered list
- Filter: Environmental atau Electrical
- Size: ~3KB per item

### **searchPortfolio(term, page, pageSize)**
- For: Search results
- Filters: Title & Description
- Size: ~5KB per item

### **getPortfolioDetail(id)**
- For: Detail/modal view
- Include: All fields + components
- Size: ~80KB

### **getTestimonialList({ pageSize, includeReviews })**
- For: List of testimonials
- Options: With/without client words
- Size: ~3KB (minimal) or ~8KB (reviews)

### **getAllTestimonials()**
- For: Homepage showcase, all items
- Include: All testimonials
- Size: ~100KB total

### **getAboutPageComplete()**
- For: About page
- Include: Vision, mission, advantages
- Size: ~45KB

### **getContactPageComplete()**
- For: Contact page
- Include: Background, title, detail
- Size: ~30KB

### **getHomePageData() & getLayoutData()**
- For: Batch fetch multiple endpoints
- Parallel: Faster than sequential
- Best: Homepage, layout initialization

---

## 🔍 **DEBUG QUERIES IN BROWSER**

```typescript
// In component (dev only)
const data = await getPortfolioList();
console.log('Response:', data);
console.log('Data size:', JSON.stringify(data).length + ' bytes');

// Check individual fields
console.log('Portfolio items:', data.data.length);
console.log('First item:', data.data[0]);
```

---

## 📝 **TYPESCRIPT TYPES**

```typescript
// For responses
interface StrapiResponse<T> {
  data: T | T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// For portfolio
interface Portfolio {
  id: number;
  attributes: {
    Title: string;
    Type: 'Environmental' | 'Electrical';
    Description: any;
    Image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    Location: {
      locationName: string;
      latitude: number;
      longitude: number;
    };
    Timestamp: {
      startDate: string;
      endDate: string;
    };
  };
}
```

---

## ✨ **BEST PRACTICES**

1. **Batch related requests** → Use `Promise.all()`
2. **Cache HTML** → Use ISR with `revalidate: 3600`
3. **Handle errors** → Add try-catch in components
4. **Optimize images** → Use `getStrapiImageUrl()`
5. **Extract data safely** → Use utility functions
6. **Minimal queries** → Pick specific field selections
7. **Pagination** → Max 12 items per request
8. **Test locally** → Check Network tab in DevTools

---

**Saved you a look-up? Star this file! ⭐**
