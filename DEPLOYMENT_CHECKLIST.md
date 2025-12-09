# AssetVerse Client Deployment Checklist

## ✅ Pre-Deployment Verification

### Required Files (CREATED)

- [x] `firebase.json` - Firebase Hosting configuration
- [x] `.firebaserc` - Firebase project configuration
- [x] `.env.example` - Environment variables documentation
- [x] `.env.production` - Production environment template
- [x] `package.json` - Has `build` script
- [x] `.gitignore` - Excludes .env files

### Code Configuration (VERIFIED)

- [x] `axiosInstance.js` - Uses `VITE_API_URL` environment variable
- [x] `firebase.init.js` - Firebase config from environment variables
- [x] SPA routing configured with rewrites in firebase.json
- [x] Cache headers configured for static assets

## 🚀 Deployment Steps

### Prerequisites

Before deploying the client, **ensure the server is deployed first** and you have:

- ✅ Vercel production URL (e.g., `https://your-server.vercel.app`)
- ✅ Server is working and accessible

### 1. Install Firebase CLI

If you haven't installed Firebase CLI:

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

This will open a browser for authentication.

### 3. Update Production Environment Variables

Open `.env.production` and update with your Vercel server URL:

```env
VITE_API_URL=https://your-server-project.vercel.app
```

**Important:**

- Remove trailing slash from URL
- Use the actual Vercel production URL (not preview URL)
- Keep all Firebase variables as they are

### 4. Build the Production Bundle

```bash
cd assetverse-client

# Build with production environment
npm run build
```

This creates an optimized `dist/` folder with:

- Minified JavaScript
- Optimized CSS
- Compressed assets
- Source maps

**Verify the build:**

- Check that `dist/` folder is created
- Typical size: 500KB - 2MB (compressed)
- No error messages in terminal

### 5. Deploy to Firebase Hosting

#### First-time deployment or update:

```bash
# Deploy to Firebase
firebase deploy --only hosting
```

#### Preview before deploying:

```bash
# Create a preview channel
firebase hosting:channel:deploy preview
```

After deployment, Firebase will provide:

- **Hosting URL**: `https://assestverse-clientside.web.app`
- **Alternative URL**: `https://assestverse-clientside.firebaseapp.com`

### 6. Update Server CORS Configuration

After deployment, update the server's allowed origins:

1. Go to Vercel Dashboard
2. Navigate to your server project
3. Go to: **Settings > Environment Variables**
4. Update `CLIENT_ORIGIN`:

```env
CLIENT_ORIGIN=https://assestverse-clientside.web.app,https://assestverse-clientside.firebaseapp.com,http://localhost:5173
```

5. **Redeploy** the server for changes to take effect

### 7. Test Your Deployment

Visit your Firebase hosting URL and test:

#### Homepage Tests:

- [ ] Website loads without errors
- [ ] Images and assets display correctly
- [ ] Navigation works

#### Authentication Tests:

- [ ] Register new HR account
- [ ] Register new Employee account
- [ ] Login with existing account
- [ ] Logout functionality

#### Dashboard Tests (HR):

- [ ] Dashboard stats load
- [ ] Add new asset
- [ ] View asset list
- [ ] Edit/Update asset
- [ ] View employee list
- [ ] Approve/Reject requests

#### Dashboard Tests (Employee):

- [ ] Dashboard stats load
- [ ] View available assets
- [ ] Request an asset
- [ ] View my assets
- [ ] View my team
- [ ] Return returnable asset

#### Payment Tests (if Stripe configured):

- [ ] View packages
- [ ] Initiate package upgrade
- [ ] Payment checkout page loads

## 🔧 Configuration Details

### Firebase Hosting Configuration

The `firebase.json` configures:

1. **Public directory**: `dist` (Vite build output)
2. **SPA Routing**: All routes redirect to `index.html`
3. **Cache Strategy**: Static assets cached for 1 year
4. **Ignored files**: node_modules, hidden files

### Environment Variables

| Variable         | Development           | Production                     |
| ---------------- | --------------------- | ------------------------------ |
| VITE_API_URL     | http://localhost:5000 | https://your-server.vercel.app |
| VITE*FIREBASE*\* | Same values           | Same values                    |

### Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [image files]
└── [other static assets]
```

## 🐛 Troubleshooting

### Issue: "Failed to compile" during build

**Solution:**

- Check for TypeScript/ESLint errors
- Run `npm run lint` to find issues
- Fix errors and rebuild

### Issue: API calls fail (CORS errors)

**Solution:**

- Verify `VITE_API_URL` in `.env.production`
- Check server's `CLIENT_ORIGIN` includes your Firebase URLs
- Ensure server was redeployed after updating CORS

### Issue: Firebase commands not found

**Solution:**

```bash
npm install -g firebase-tools
firebase login
```

### Issue: "Not authorized" during deployment

**Solution:**

- Run `firebase login` again
- Verify you have access to `assestverse-clientside` project
- Check `.firebaserc` has correct project ID

### Issue: 404 errors on page refresh

**Solution:**

- Verified - `firebase.json` already has SPA rewrites ✅
- All routes redirect to `index.html`

### Issue: Assets not loading (images/fonts)

**Solution:**

- Check `public/` folder files are included
- Verify asset paths use relative URLs
- Check browser console for 404 errors

### Issue: Firebase Auth not working

**Solution:**

- Verify all `VITE_FIREBASE_*` variables are set
- Check Firebase Console > Authentication is enabled
- Verify Authorized domains include your hosting URL

### Issue: Environment variables not loading

**Solution:**

- Vite only loads variables prefixed with `VITE_`
- Rebuild after changing .env files
- Check `import.meta.env.VITE_*` syntax

## 📊 Deployment Checklist Summary

### Before First Deploy:

- [ ] Server deployed to Vercel and working
- [ ] Got Vercel production URL
- [ ] Firebase CLI installed and logged in
- [ ] Updated `.env.production` with server URL

### Deploy Process:

- [ ] Run `npm run build` successfully
- [ ] Run `firebase deploy --only hosting`
- [ ] Note Firebase hosting URLs
- [ ] Update server CORS configuration
- [ ] Redeploy server with new CORS settings

### After Deploy:

- [ ] Test homepage loads
- [ ] Test user registration/login
- [ ] Test HR dashboard features
- [ ] Test Employee dashboard features
- [ ] Test API communication
- [ ] Test asset uploads (if Cloudinary configured)
- [ ] Test payments (if Stripe configured)

## 🎯 Post-Deployment

### Custom Domain (Optional)

To add a custom domain:

1. Go to Firebase Console
2. Navigate to: **Hosting > Custom domain**
3. Follow the instructions to verify ownership
4. Update DNS records
5. Update server CORS to include custom domain

### Analytics (Optional)

Enable Firebase Analytics:

1. Go to Firebase Console
2. Navigate to: **Analytics**
3. Follow setup instructions
4. Add analytics code to your app

### Performance Monitoring

Check Firebase Hosting performance:

1. Go to Firebase Console
2. Navigate to: **Hosting > Usage**
3. Monitor traffic and bandwidth
4. Check for errors in logs

## ✨ Deployment Complete!

Your client-side application is now live at:

- **Primary**: https://assestverse-clientside.web.app
- **Alternative**: https://assestverse-clientside.firebaseapp.com

**Full Application URLs:**

- **Client**: https://assestverse-clientside.web.app
- **Server**: https://your-server-project.vercel.app

### Quick Commands Reference:

```bash
# Build for production
npm run build

# Deploy to Firebase
firebase deploy --only hosting

# Preview deployment
firebase hosting:channel:deploy preview

# View deployment logs
firebase hosting:sites:list

# Rollback to previous version (from Firebase Console)
# Go to Hosting > Release history > Select version > Rollback
```

## 📝 Important Notes

1. **Environment Files**:

   - `.env` - Development (not committed to git)
   - `.env.production` - Production template (committed)
   - Update `.env.production` with actual URLs before building

2. **Build Before Deploy**:

   - Always run `npm run build` before `firebase deploy`
   - Vite builds from source and creates optimized `dist/`
   - Firebase deploys the `dist/` folder

3. **CORS Configuration**:

   - Client URL must be in server's `CLIENT_ORIGIN`
   - Server URL must match client's `VITE_API_URL`
   - Any URL change requires rebuild/redeploy

4. **Firebase Project**:

   - Project ID: `assestverse-clientside`
   - Hosting URLs are automatic
   - Can't change once created

5. **Cache Behavior**:
   - Static assets cached for 1 year
   - `index.html` not cached (immediate updates)
   - Hard refresh (Ctrl+Shift+R) to clear cache
