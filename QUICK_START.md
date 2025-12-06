# Quick Start - Universal Auth0 Setup

## 🚀 One-Time Auth0 Configuration (Works Forever)

### Step 1: Add These to Auth0 Dashboard

Go to **Auth0 Dashboard** → **Applications** → **Your App** → **Settings**

**Allowed Callback URLs:**
```
http://localhost:*
http://127.0.0.1:*
https://yourdomain.com
```

**Allowed Logout URLs:**
```
http://localhost:*
http://127.0.0.1:*
https://yourdomain.com
```

**Allowed Web Origins:**
```
http://localhost:*
http://127.0.0.1:*
https://yourdomain.com
```

**That's it!** The wildcard `*` means it works on **any port** automatically.

### Step 2: Environment Variables

Create `client/.env`:
```env
VITE_INNODEV_AUTH0_DOMAIN=your-domain.us.auth0.com
VITE_INNODEV_AUTH0_CLIENT_ID=your_client_id
VITE_INNODEV_AUTH0_AUDIENCE=your_audience
```

### Step 3: Run and Test

```bash
cd client
npm run dev
```

The app will:
- ✅ Automatically detect your current URL
- ✅ Work on any port (5173, 3000, 8080, etc.)
- ✅ Show the exact URL in console
- ✅ Work in dev, staging, and production

### How It Works

The app uses `window.location.origin` which automatically adapts to:
- Any port number
- Any domain
- Any environment

No manual configuration needed after the initial Auth0 setup!

