# Testing Webhooks in Development

## Problem:
- Strapi webhooks perlu URL yang accessible
- localhost:3000 tidak bisa di-access dari Strapi (jika berbeda machine)
- Butuh tunneling untuk test

## Solution: Gunakan Ngrok (FREE)

### Install Ngrok

```bash
# Download dari https://ngrok.com/download
# Atau via package manager:

# Windows (dengan Chocolatey):
choco install ngrok

# Linux/Mac (dengan Homebrew):
brew install ngrok

# Docker:
docker run --net=host -it ngrok/ngrok:latest ngrok http 3000
```

---

## Setup Ngrok Tunnel

### Step 1: Start Next.js Development Server

```bash
cd frontend
npm run dev
# Server running at http://localhost:3000
```

### Step 2: Start Ngrok Tunnel

```bash
ngrok http 3000

# Output:
# Forwarding                    https://xxxx-xx-xxx-xxx-xx.ngrok-free.app -> http://localhost:3000
# Copy the HTTPS URL
```

### Step 3: Register Ngrok Auth Token (Optional but Recommended)

```bash
# Sign up at ngrok.com (free)
ngrok config add-authtoken <YOUR_TOKEN>

# Then next time ngrok starts, you get:
# - Stable URL (not random each time)
# - Better rate limits
# - More features
```

---

## Test Revalidation Endpoint Locally

### Using the Ngrok URL:

```bash
# Example ngrok URL: https://1234-56-789-012-34.ngrok-free.app

curl -X POST https://1234-56-789-012-34.ngrok-free.app/api/revalidate \
  -H "x-revalidate-secret: dev-secret-change-in-production-12345" \
  -H "Content-Type: application/json"

# Expected response:
# {
#   "revalidated": true,
#   "timestamp": "2024-05-02T10:30:45.123Z",
#   "tags": ["strapi-data"],
#   "duration": "15ms"
# }
```

---

## Setup Strapi Webhook for Testing

### In Strapi Admin Dashboard:

1. Go to **Settings → Webhooks**
2. Click **Create New Webhook**
3. Fill in:

| Field | Value |
|-------|-------|
| **Name** | Next.js Cache (Dev) |
| **URL** | `https://1234-56-789-012-34.ngrok-free.app/api/revalidate` |
| **Events** | ✅ entry.publish, entry.update, etc. |

4. **Headers** section:
   ```json
   {
     "x-revalidate-secret": "dev-secret-change-in-production-12345"
   }
   ```

5. **Save & Test**

---

## Complete Testing Workflow

### Terminal Setup:

```
┌─ Terminal 1 ──────────────────────┐
│ npm run dev                        │
│ (Next.js on localhost:3000)        │
└────────────────────────────────────┘

┌─ Terminal 2 ──────────────────────┐
│ ngrok http 3000                    │
│ (Tunnel to localhost:3000)         │
│ Copy the URL                       │
└────────────────────────────────────┘

┌─ Terminal 3 ──────────────────────┐
│ # Optional monitoring              │
│ tail -f /var/log/strapi.log        │
└────────────────────────────────────┘
```

### Test Flow:

1. **Visit your app:**
   ```
   https://1234-56-789-012-34.ngrok-free.app
   ```

2. **Make note of current data displayed**

3. **Update data in Strapi CMS**
   - Go to any content
   - Edit something
   - Publish

4. **Check Next.js Console:**
   - Terminal 1 should show:
   ```
   🔄 Revalidating tags: strapi-data
   ✅ Cache revalidated successfully in Xms
   ```

5. **Refresh your app:**
   ```
   https://1234-56-789-012-34.ngrok-free.app
   ```
   - Should show NEW data immediately! ✨

---

## Monitoring Webhook Calls

### In Strapi Admin:

1. Go to **Settings → Webhooks**
2. Click on webhook you created
3. You'll see **"Webhook triggers"** history
4. Each entry shows:
   - Status (✅ success / ❌ failed)
   - Response from Next.js
   - Timestamp

### In Next.js Console:

```
🔄 Revalidating tags: strapi-data
✅ Cache revalidated successfully in 25ms
```

---

## Troubleshooting

### Issue: "403 Forbidden" or "Invalid secret"

**Cause**: Secret tidak match

**Fix**:
- Verify REVALIDATE_SECRET di `.env.local`:
  ```
  REVALIDATE_SECRET=dev-secret-change-in-production-12345
  ```
- Verify header di Strapi webhook matches exactly
- Check no extra spaces or quotes

---

### Issue: Webhook URL "Connection timeout"

**Cause**: Ngrok tunnel down or URL wrong

**Fix**:
- Check ngrok terminal, make sure it's running
- Copy the HTTPS URL again
- Update Strapi webhook URL with new one
- Test with curl first:
  ```bash
  curl https://your-ngrok-url/api/revalidate \
    -H "x-revalidate-secret: dev-secret-change-in-production-12345"
  ```

---

### Issue: Webhook sends, but data not updating

**Cause**: Tags tidak match

**Fix**:
- Check both use same tag: `['strapi-data']`
- Verify `fetch()` calls have `tags: ['strapi-data']`
- Restart Next.js dev server

---

## Quick Commands Reference

```bash
# Start everything for testing
Terminal 1: npm run dev
Terminal 2: ngrok http 3000

# Test endpoint
curl -X POST https://<ngrok-url>/api/revalidate \
  -H "x-revalidate-secret: dev-secret-change-in-production-12345"

# Monitor ngrok traffic
ngrok logs  # Shows all requests through tunnel

# Regenerate ngrok URL (free tier)
# Just restart: ngrok http 3000
```

---

## Production vs Development

| Aspect | Development | Production |
|--------|-------------|-----------|
| **Server** | localhost:3000 | https://your-domain.com |
| **Tunnel** | ngrok required | Direct HTTPS |
| **Webhook URL** | https://ngrok-url.app/api/revalidate | https://your-domain.com/api/revalidate |
| **Secret** | dev-secret-... | Generate new with openssl |
| **Logs** | Check Terminal | Check server logs/monitoring |

---

## Next: After Testing Works in Dev

1. ✅ Test end-to-end in development (this guide)
2. 🚀 Deploy to production
3. 🔧 Setup production webhook with real domain
4. 📊 Monitor in production

**Once confirmed working in dev → Deploy with confidence!** 🎉
