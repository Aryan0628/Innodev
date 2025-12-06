# Auth0 Setup Instructions - Universal Configuration

## 🎯 Universal Setup (Works on Any Port/Domain)

This configuration is designed to work **independently** on any port, domain, or environment without manual changes.

### Step 1: Configure Auth0 for Universal Development

The application automatically detects your current URL and uses it. To make it work on **any port** without reconfiguration:

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Navigate to **Applications** → Your Application
3. Scroll to **Application URIs** section

#### Option A: Wildcard Pattern (Recommended for Development)

Add these **wildcard patterns** to support any localhost port:

**Allowed Callback URLs:**
```
http://localhost:*
http://127.0.0.1:*
http://localhost:*/callback
http://127.0.0.1:*/callback
```

**Allowed Logout URLs:**
```
http://localhost:*
http://127.0.0.1:*
```

**Allowed Web Origins:**
```
http://localhost:*
http://127.0.0.1:*
```

**Note:** Auth0 may not support wildcards in all cases. If wildcards don't work, use Option B.

#### Option B: Specific URLs (For Production or When Wildcards Don't Work)

Add your specific URLs. The app will log the exact URL it's using in the browser console:

**Allowed Callback URLs:**
```
http://localhost:5173
http://localhost:3000
http://localhost:8080
http://localhost:4173
https://yourdomain.com
https://yourdomain.com/callback
```

**Allowed Logout URLs:**
```
http://localhost:5173
http://localhost:3000
http://localhost:8080
http://localhost:4173
https://yourdomain.com
```

**Allowed Web Origins:**
```
http://localhost:5173
http://localhost:3000
http://localhost:8080
http://localhost:4173
https://yourdomain.com
```

### Step 2: Environment Variables

Create a `.env` file in the `client/` directory:

```env
# Required Auth0 Configuration
VITE_INNODEV_AUTH0_DOMAIN=dev-eqdjur8rssmalaln.us.auth0.com
VITE_INNODEV_AUTH0_CLIENT_ID=your_client_id_here
VITE_INNODEV_AUTH0_AUDIENCE=https://Codomon.com/api

# Optional: Override redirect URI (leave empty to use current origin automatically)
# VITE_INNODEV_AUTH0_REDIRECT_URI=http://localhost:5173
```

### Step 3: How It Works

The application:
1. ✅ **Automatically detects** your current URL (`window.location.origin`)
2. ✅ **Works on any port** (5173, 3000, 8080, etc.)
3. ✅ **Works in any environment** (dev, staging, production)
4. ✅ **Logs the exact URL** being used in the console
5. ✅ **Provides helpful error messages** if configuration is missing

### Step 4: Verify Configuration

1. Start your dev server: `npm run dev`
2. Open browser console (F12)
3. Look for the log message showing:
   ```
   ✅ Auth0 Configuration:
      Redirect URI: http://localhost:5173
   ```
4. Make sure this exact URL is in your Auth0 settings

### Step 5: Testing

1. Click "Log In" button
2. You'll be redirected to Auth0
3. After authentication, you'll be redirected back
4. The app will automatically navigate to `/dashboard`
5. The heatmap will load and display

### Troubleshooting

#### Error: "Callback URL mismatch"

**Solution:**
1. Check the browser console for the exact redirect URI being used
2. Add that exact URL to Auth0 **Allowed Callback URLs**
3. Or use the wildcard patterns from Option A above

#### Error: "Missing Auth0 environment variables"

**Solution:**
1. Create `.env` file in `client/` directory
2. Add the required variables (see Step 2)
3. Restart your dev server

#### Works on one port but not another

**Solution:**
1. Use wildcard patterns (Option A) in Auth0 settings
2. Or add the specific port URL to Auth0 settings
3. Check console for the exact URL being used

### Production Deployment

For production, add your production domain to Auth0:

**Allowed Callback URLs:**
```
https://yourdomain.com
https://yourdomain.com/callback
```

**Allowed Logout URLs:**
```
https://yourdomain.com
```

**Allowed Web Origins:**
```
https://yourdomain.com
```

The app will automatically use `https://yourdomain.com` when deployed.

### Advanced: Custom Redirect URI

If you need a specific redirect URI, set it in `.env`:

```env
VITE_INNODEV_AUTH0_REDIRECT_URI=https://custom-domain.com/callback
```

Make sure this exact URL is in your Auth0 **Allowed Callback URLs**.

