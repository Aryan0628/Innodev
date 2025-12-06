# Troubleshooting Dashboard Errors

## Error: "Unexpected token ':'"

This error typically means the server response is not valid JSON. Here's how to fix it:

### Step 1: Check if Backend Server is Running

Open a terminal and run:
```bash
cd server
npm run dev
```

You should see:
```
📥 Incoming: GET /health
Server is running at 8000
```

### Step 2: Test Server Connection

Open your browser and go to:
- `http://localhost:8000/health` - Should show `{"status":"ok","message":"Server is running"}`
- `http://localhost:8000/api/test` - Should show `{"message":"API is working",...}`

If these don't work, your server isn't running!

### Step 3: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab to see the actual response from the server

### Step 4: Common Issues

#### Issue: "Cannot connect to backend server"
**Solution:** Start the backend server:
```bash
cd server
npm run dev
```

#### Issue: CORS Error
**Solution:** The CORS is now configured to allow localhost on any port. If you still see CORS errors, check:
- Server is running on port 8000
- Frontend is making requests to `http://localhost:8000`

#### Issue: "Invalid JSON response"
**Solution:** Check what the server is actually returning:
1. Open Network tab in browser DevTools
2. Find the request to `/api/heatmap/data/public`
3. Click on it and check the Response tab
4. See what the server is actually sending

### Step 5: Verify Routes

Make sure these routes exist:
- `GET /health` - Health check
- `GET /api/test` - Test endpoint
- `GET /api/heatmap/data/public` - Public heatmap data

### Step 6: Check Server Logs

Look at your server terminal for:
- `📥 Incoming: GET /api/heatmap/data/public`
- `📊 Generating heatmap data...`
- `✅ Heatmap data generated successfully`

If you don't see these, the route might not be registered correctly.

## Quick Fix Checklist

- [ ] Backend server is running (`npm run dev` in server folder)
- [ ] Backend is on port 8000
- [ ] Frontend is making requests to `http://localhost:8000`
- [ ] No CORS errors in browser console
- [ ] Server logs show incoming requests
- [ ] `/health` endpoint returns JSON

## Still Not Working?

1. **Check the actual response:**
   - Open browser DevTools → Network tab
   - Find the failed request
   - Check the Response tab to see what the server sent

2. **Check server logs:**
   - Look at the terminal where server is running
   - Check for any error messages

3. **Test the endpoint directly:**
   - Open `http://localhost:8000/api/heatmap/data/public` in browser
   - Should see JSON data, not HTML

4. **Verify MongoDB connection:**
   - The heatmap endpoint doesn't require DB, but check if server starts properly

