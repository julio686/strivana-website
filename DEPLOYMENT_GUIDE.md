# Strivana Website - Cloudflare Pages Deployment Guide

## Overview

This project is deployed to **Cloudflare Pages** with the custom domain `strivanallc.com`.

---

## Quick Start Commands

```bash
cd C:\Users\julio\strivana-website

# Push to GitHub
git push -u origin main
```

---

## Cloudflare Pages Setup

### Step 1: Get Your Cloudflare Account ID

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain `strivanallc.com`
3. On the right sidebar, find **Account ID** - copy this value

### Step 2: Configure GitHub Secrets

1. Go to your GitHub repository: `https://github.com/julio686/strivana-website`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | `cfut_5eoK1JYJvX90LQsNhSxDCOv6PzO8FEI09UYG9RjH3c8024a4` |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID |

### Step 3: Create Cloudflare Pages Project (if not exists)

If you haven't created the Pages project yet:

**Option A: Via Cloudflare Dashboard**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**
2. Click **Create a project**
3. Select **Direct Upload**
4. Project name: `strivana-website`
5. Click **Create project**

**Option B: Via API (using curl)**

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/pages/projects" \
  -H "Authorization: Bearer cfut_5eoK1JYJvX90LQsNhSxDCOv6PzO8FEI09UYG9RjH3c8024a4" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "strivana-website",
    "production_branch": "main"
  }'
```

### Step 4: Configure Custom Domain

1. In your Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `strivanallc.com`
4. Follow the DNS verification steps
5. Enable **Always Use HTTPS**

### Step 5: Push to GitHub

```bash
cd C:\Users\julio\strivana-website
git push -u origin main
```

The GitHub Actions workflow will automatically:
1. Build the project
2. Deploy to Cloudflare Pages
3. Update the deployment status

---

## Manual Deployment (Alternative)

If you need to deploy manually without GitHub Actions:

### Option 1: Using Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Authenticate with your API token
wrangler login

# Or use the API token directly
export CLOUDFLARE_API_TOKEN=cfut_5eoK1JYJvX90LQsNhSxDCOv6PzO8FEI09UYG9RjH3c8024a4

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=strivana-website
```

### Option 2: Using Direct Upload (Drag & Drop)

1. Run `npm run build` locally
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**
3. Select your project
4. Click **Create deployment**
5. Drag and drop the `dist` folder

### Option 3: Using API (curl)

```bash
# Build first
npm run build

# Create a zip of the dist folder
cd dist && zip -r ../deploy.zip . && cd ..

# Upload via API
curl -X POST "https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/pages/projects/strivana-website/deployments" \
  -H "Authorization: Bearer cfut_5eoK1JYJvX90LQsNhSxDCOv6PzO8FEI09UYG9RjH3c8024a4" \
  -F "file=@deploy.zip"
```

---

## Verification Checklist

After deployment, verify:

- [ ] Repository visible at https://github.com/julio686/strivana-website
- [ ] GitHub Actions workflow running successfully
- [ ] Site live at Cloudflare Pages subdomain (e.g., `strivana-website.pages.dev`)
- [ ] Site live at https://strivanallc.com (after DNS propagates)
- [ ] All pages loading correctly
- [ ] Contact form submits successfully
- [ ] Chat bot working
- [ ] Mobile responsive
- [ ] HTTPS working with SSL certificate

---

## Troubleshooting

### Build Failures

Check GitHub Actions logs:
1. Go to repository → Actions tab
2. Click on the failed workflow
3. Review error messages

Common fixes:
- Regenerate package-lock.json: `rm package-lock.json && npm install`
- Check Node.js version compatibility

### Deployment Failures

**API Token Issues:**
- Verify the token has `Cloudflare Pages:Edit` permission
- Check token hasn't expired
- Ensure Account ID is correct

**Project Not Found:**
- Create the project first via dashboard or API
- Verify project name matches exactly: `strivana-website`

### Custom Domain Not Working

1. Check DNS settings in Cloudflare:
   - Ensure `strivanallc.com` has proper A/AAAA or CNAME records
   - Proxy status should be **Proxied** (orange cloud)

2. Verify CNAME file exists in `public/CNAME` with content: `strivanallc.com`

3. Check SSL/TLS settings:
   - Go to SSL/TLS → Overview
   - Set to **Full (strict)**

4. Wait for DNS propagation (can take up to 24 hours)

### FormSubmit.co Not Working

1. Submit the form once manually
2. Check julio@strivanallc.com inbox for verification email
3. Click verification link in FormSubmit email
4. Test form again

---

## Useful API Commands

### Get All Deployments
```bash
curl "https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/pages/projects/strivana-website/deployments" \
  --header "Authorization: Bearer cfut_5eoK1JYJvX90LQsNhSxDCOv6PzO8FEI09UYG9RjH3c8024a4"
```

### Get Project Details
```bash
curl "https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/pages/projects/strivana-website" \
  --header "Authorization: Bearer cfut_5eoK1JYJvX90LQsNhSxDCOv6PzO8FEI09UYG9RjH3c8024a4"
```

### Delete a Deployment
```bash
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/pages/projects/strivana-website/deployments/DEPLOYMENT_ID" \
  --header "Authorization: Bearer cfut_5eoK1JYJvX90LQsNhSxDCOv6PzO8FEI09UYG9RjH3c8024a4"
```

---

## Post-Deployment Tasks

1. **Replace placeholder images:**
   - Replace `public/logo.jpg` with your actual logo
   - Replace `public/favicon.jpg` with your favicon
   - Commit and push changes

2. **Update email addresses if needed:**
   - Edit `src/sections/CTA.tsx` for contact form
   - Edit `src/sections/Careers.tsx` for resume submissions

3. **Add analytics (optional):**
   - Cloudflare Web Analytics is available in the dashboard
   - Or add Google Analytics to `index.html`

4. **SEO optimization:**
   - Update meta description in `index.html`
   - Add Open Graph tags

---

## Support Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages API Reference](https://developers.cloudflare.com/api/resources/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [FormSubmit Documentation](https://formsubmit.co/)

---

## Current Status

| Task | Status |
|------|--------|
| Project created | ✅ Complete |
| Git initialized | ✅ Complete |
| Code committed | ✅ Complete |
| GitHub repository | ✅ Complete |
| Cloudflare Pages setup | ⏳ Pending Account ID |
| Custom domain configured | ⏳ Pending |
| Site live | ⏳ Pending |
