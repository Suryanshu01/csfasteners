# C S Fasteners — Website

Industrial screw manufacturer website. Deployed via Netlify.

## Files
- `index.html` — Main website (single page, all CSS inline)
- `success.html` — Form submission thank-you page
- `robots.txt` — SEO crawler instructions
- `sitemap.xml` — Sitemap for Google indexing
- `netlify.toml` — Netlify config (headers, redirects)

## Setup: GitHub → Netlify

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `cs-fasteners-site`
3. Set to **Public**
4. Click **Create repository**

### Step 2: Upload Files
1. On the repo page, click **"uploading an existing file"**
2. Drag ALL 5 files into the upload area:
   - `index.html`
   - `success.html`
   - `robots.txt`
   - `sitemap.xml`
   - `netlify.toml`
3. Click **Commit changes**

### Step 3: Connect Netlify
1. Go to https://app.netlify.com
2. Sign up / log in with your GitHub account
3. Click **"Add new site"** → **"Import an existing project"**
4. Select **GitHub** → find `cs-fasteners-site`
5. Leave all settings default, click **Deploy site**
6. Netlify will give you a URL like `random-name.netlify.app`

### Step 4: Connect Your Domain
1. In Netlify dashboard → **Domain settings**
2. Click **Add custom domain**
3. Enter your domain (e.g., `www.csfasteners.in`)
4. Netlify will give you DNS records to add at your domain registrar
5. Add the records at your registrar (GoDaddy / Namecheap / Hostinger etc.)
6. Wait 10-30 mins for DNS propagation
7. Netlify auto-generates free HTTPS/SSL certificate

### Step 5: Enable Form Notifications
1. In Netlify dashboard → **Forms**
2. You'll see "quote-request" form listed
3. Go to **Site settings** → **Forms** → **Form notifications**
4. Click **Add notification** → **Email notification**
5. Enter your email (e.g., exports@csfasteners.in)
6. Now every form submission sends you an email!

### Step 6: Submit to Google
1. Go to https://search.google.com/search-console
2. Add your domain as a property
3. Verify ownership (Netlify DNS method is easiest)
4. Submit sitemap: enter `sitemap.xml` in the sitemaps section
5. Request indexing for your homepage URL

## SEO Notes
- Update `sitemap.xml` with your actual domain (replace csfasteners.in)
- Update `robots.txt` with your actual domain
- Update canonical URL in `index.html` with your actual domain
- Submit site to Google Search Console and Bing Webmaster Tools
- Create a Google Business Profile for "C S Fasteners" with factory address
- The structured data (JSON-LD) includes Organization, Products, and FAQ schema

## Form Handling
- Forms are processed by Netlify Forms (free, up to 100 submissions/month)
- Bot protection via honeypot field
- Submissions visible in Netlify dashboard → Forms
- Email notifications configured in Step 5 above
- WhatsApp link provided as secondary contact option
