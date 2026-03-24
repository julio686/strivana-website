# Strivana Website - Deployment Guide

## Quick Start Commands

Run these commands in your terminal:

```bash
cd C:\Users\julio\strivana-website

# Push to GitHub (you'll be prompted to sign in)
git push -u origin main
```

When prompted, enter your GitHub credentials or use a personal access token.

---

## Step-by-Step Deployment Instructions

### Step 1: Push Code to GitHub

The repository is already initialized. You just need to push it:

```bash
cd C:\Users\julio\strivana-website
git push -u origin main
```

**If you get an authentication error:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control of private repositories)
4. Generate token and copy it
5. Use the token as your password when prompted

### Step 2: Create GitHub Repository (if needed)

If the push fails because the repo doesn't exist:

1. Go to https://github.com/new
2. Repository name: `strivana-website`
3. Make it **Public**
4. Do NOT initialize with README (we already have one)
5. Click "Create repository"
6. Then push again with:
   ```bash
   git push -u origin main
   ```

### Step 3: Enable GitHub Pages

1. Go to your repository: https://github.com/julio686/strivana-website
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under "Source", select **GitHub Actions**
5. The workflow file we created (`.github/workflows/deploy.yml`) will automatically deploy

### Step 4: Configure Custom Domain

1. In the same Pages settings section
2. Under "Custom domain", enter: `strivanallc.com`
3. Click **Save**
4. Check "Enforce HTTPS" (recommended)

### Step 5: Update DNS with Your Domain Provider

Add these DNS records with your domain registrar (GoDaddy, Namecheap, etc.):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |
| CNAME | www | julio686.github.io | 600 |

Or use a CNAME record:
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | julio686.github.io | 600 |

DNS changes can take up to 24-48 hours to propagate.

---

## Verification Checklist

After deployment, verify:

- [ ] Repository visible at https://github.com/julio686/strivana-website
- [ ] GitHub Actions workflow running (Settings → Actions)
- [ ] Site live at https://julio686.github.io/strivana-website (temporary)
- [ ] Site live at https://strivanallc.com (after DNS propagates)
- [ ] All pages loading correctly
- [ ] Contact form submits successfully
- [ ] Chat bot working
- [ ] Mobile responsive

---

## Troubleshooting

### Build Failures

Check GitHub Actions logs:
1. Go to repository → Actions tab
2. Click on the failed workflow
3. Review error messages

Common fixes:
- Regenerate package-lock.json: `rm package-lock.json && npm install`
- Clear build cache: Go to Actions → Manage repository actions → Clear caches

### Custom Domain Not Working

1. Verify CNAME file exists in `public/CNAME` with content: `strivanallc.com`
2. Check DNS propagation: https://dnschecker.org
3. Wait 24-48 hours for DNS to fully propagate
4. Verify no conflicting DNS records

### FormSubmit.co Not Working

1. Submit the form once manually
2. Check julio@strivanallc.com inbox for verification email
3. Click verification link in FormSubmit email
4. Test form again

---

## Post-Deployment Tasks

1. **Replace placeholder images:**
   - Replace `public/logo.svg` with your actual logo
   - Replace `public/favicon.svg` with your favicon
   - Commit and push changes

2. **Update email addresses if needed:**
   - Edit `src/sections/CTA.tsx` for contact form
   - Edit `src/sections/Careers.tsx` for resume submissions

3. **Add Google Analytics (optional):**
   - Add tracking code to `index.html`

4. **SEO optimization:**
   - Update meta description in `index.html`
   - Add Open Graph tags

---

## Support

If you encounter issues:

1. GitHub Pages docs: https://docs.github.com/en/pages
2. FormSubmit docs: https://formsubmit.co/
3. React + Vite deployment: https://vitejs.dev/guide/static-deploy.html

---

## Current Status

| Task | Status |
|------|--------|
| Project created | ✅ Complete |
| Git initialized | ✅ Complete |
| Code committed | ✅ Complete |
| Push to GitHub | ⏳ Pending authentication |
| Enable GitHub Pages | ⏳ Pending |
| Configure custom domain | ⏳ Pending |
| DNS configuration | ⏳ Pending |
| Site live | ⏳ Pending |
