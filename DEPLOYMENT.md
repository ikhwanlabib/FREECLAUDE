# 🚀 Deployment Guide - Claude AI Chatbox

Deploy your Claude AI Chatbox online in minutes - completely free!

## Quick Deployment Options

### 1. GitHub Pages (Free + Custom Domain)

**Easiest for GitHub users:**

```bash
# 1. Create new GitHub repository
# 2. Clone it locally
git clone https://github.com/YOUR-USERNAME/claude-ai-chatbox.git
cd claude-ai-chatbox

# 3. Copy all files (index.html, style.css, script.js, README.md, etc.) into repo

# 4. Push to GitHub
git add .
git commit -m "Initial commit: Claude AI Chatbox"
git push origin main

# 5. Go to Settings → Pages → Select 'main' branch
# 6. Your site is live at: https://YOUR-USERNAME.github.io/claude-ai-chatbox
```

**Add Custom Domain**:
- Settings → Pages → Custom Domain
- Update DNS records with your domain provider
- Enable HTTPS in settings

### 2. Netlify (Free + Global CDN) ⭐ Recommended

**Easiest overall:**

**Option A: Drag & Drop**
1. Go to [netlify.com](https://netlify.com)
2. Sign in (free account)
3. Drag and drop your project folder
4. Done! Your site is live in seconds

**Option B: Command Line**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Your site will live at: your-project.netlify.app
```

**Advantages**:
- ✅ Auto HTTPS
- ✅ Global CDN
- ✅ Custom domain support
- ✅ Very fast

### 3. Vercel (Free + Serverless)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
# Your site: your-project.vercel.app
```

### 4. Firebase Hosting (Free)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy

# Your site: your-project.firebaseapp.com
```

### 5. AWS S3 + CloudFront

```bash
# Upload files to S3 bucket with static website hosting
# Use CloudFront for global delivery
# Cost: ~$1-5/month

aws s3 sync . s3://your-bucket-name/
```

### 6. Local Server (Development)

```bash
# Python 3
cd /path/to/claude-ai-chatbox
python -m http.server 8000
# Open: http://localhost:8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

## Domain Setup

### Using Custom Domain

1. **Purchase Domain**: GoDaddy, Namecheap, Route53, etc.

2. **Update DNS**:
   ```
   Type    Name        Value
   A       @           Points to provider IP
   CNAME   www         Points to provider domain
   ```

3. **Add to Hosting**:
   - GitHub Pages: Settings → Pages → Custom domain
   - Netlify: Site settings → Domain management
   - Vercel: Settings → Domains

## Environment Considerations

### Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### CORS & API
- Puter.js handles CORS automatically
- No backend server needed
- Secure client-side processing

### Performance
- Static files only (no compilation needed)
- Minification is optional but recommended
- Works on any CDN automatically

## SSL/HTTPS Setup

**All major providers include free SSL**:
- Netlify ✅ Auto HTTPS
- Vercel ✅ Auto HTTPS
- GitHub Pages ✅ Auto HTTPS
- Firebase ✅ Auto HTTPS

## SSL Certificate (Optional for Custom Domain)

```bash
# Let's Encrypt (Free)
# Use for custom domains not covered by provider

# Certbot
sudo certbot certonly --standalone -d yourdomain.com
```

## Performance Optimization

### 1. Minify CSS & JavaScript

```bash
# Install tools
npm install -g cssnano-cli terser

# Minify CSS
cssnano style.css style.min.css

# Minify JavaScript
terser script.js -o script.min.js

# Update HTML to use minified versions
```

### 2. Enable Caching

Add to `.htaccess` (if using Apache):
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css A31536000
  ExpiresByType text/javascript A31536000
  ExpiresByType image/* A31536000
</IfModule>
```

### 3. Use CDN

- Netlify Global CDN ✅ (included)
- Vercel Edge Network ✅ (included)
- Cloudflare CDN (free tier available)

## Analytics & Monitoring

### Google Analytics

Add to `<head>` in index.html:
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Plausible Analytics (Privacy-Friendly)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### Sentry Error Tracking

```javascript
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "YOUR_DSN_HERE"
});
```

## Deployment Checklist

- [ ] All files included (index.html, style.css, script.js, README.md)
- [ ] Test locally first
- [ ] Verify Puter.js CDN loads
- [ ] Test on mobile
- [ ] Test in multiple browsers
- [ ] Check console for errors (F12)
- [ ] Verify HTTPS enabled
- [ ] Configuration files cleaned up
- [ ] Add custom domain (optional)
- [ ] Set up analytics (optional)

## Troubleshooting

### Issue: Puter.js not loading
**Solution**: Verify CDN URL in HTML:
```html
<script src="https://js.puter.com/v2/"></script>
```

### Issue: Chat not working on deployed site
**Solution**: 
- Check browser console (F12)
- Verify internet connection
- Try refreshing page
- Check Puter.js docs

### Issue: Files not uploading
**Solution**:
- Check file size (keep under 1MB)
- Verify file format is supported
- Check browser console for errors

### Issue: Slow loading
**Solution**:
- Enable minification
- Use CDN
- Clear browser cache
- Check internet speed

## Deployment URLs by Platform

| Platform | URL Format |
|----------|-----------|
| GitHub Pages | `https://username.github.io/repo-name` |
| Netlify | `https://your-site.netlify.app` |
| Vercel | `https://your-project.vercel.app` |
| Firebase | `https://your-project.firebaseapp.com` |
| Custom Domain | `https://yourdomain.com` |

## Recommended Deployment Flow

1. **Test Locally**:
   ```bash
   python -m http.server 8000
   ```

2. **Deploy to Staging** (Netlify Preview):
   ```bash
   netlify deploy
   ```

3. **Test on Deployed URL**

4. **Deploy to Production**:
   ```bash
   netlify deploy --prod
   ```

5. **Verify Live Site**:
   - Test all features
   - Test on mobile
   - Check console for errors

## Cost Comparison

| Platform | Price | Storage | Bandwidth |
|----------|-------|---------|-----------|
| GitHub Pages | Free | Unlimited | Free |
| Netlify | Free | 300 deploys/month | Free |
| Vercel | Free | 100 deployments/month | Free |
| Firebase | Free | 1GB storage, 10GB/month | Included |
| AWS S3 | $0.023/GB | As needed | Pay per use |

## Advanced Deployment

### CI/CD Pipeline

**.github/workflows/deploy.yml**:
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1
        with:
          publish-dir: './'
```

### Environment Variables

Create `.env` file (not for deployment):
```
CHATBOX_MODEL=claude-sonnet-4-6
CHATBOX_VERSION=1.0.0
```

## Post-Deployment

1. ✅ Monitor site health
2. ✅ Check analytics
3. ✅ Gather user feedback
4. ✅ Update content if needed
5. ✅ Share with users

## Support & Help

- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- GitHub Pages: https://pages.github.com
- Firebase Docs: https://firebase.google.com/docs
- Puter.js: https://docs.puter.com

---

**Choose Netlify or GitHub Pages for easiest deployment!**

Your chatbox will be live in minutes, completely free.

Updated: April 2026

