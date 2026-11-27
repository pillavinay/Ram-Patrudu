# Ram Patrudu — Portfolio Website

Premium personal-brand website for **Ram Patrudu** (rampatrudu.com).

**Stack:** Next.js 16 (static export) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion
**Hosting:** GitHub Pages (free, with HTTPS) + GoDaddy domain

---

## 1. Project structure (where things live)

```
ram-patrudu-portfolio/
├── app/                       ← pages (Next.js "App Router")
│   ├── layout.tsx             ← wraps every page: navbar, footer, loader, SEO defaults
│   ├── page.tsx               ← homepage (puts the 6 sections together)
│   ├── ventures/[slug]/page.tsx ← creates the 4 company pages
│   ├── template.tsx           ← page-transition animation
│   ├── globals.css            ← global styles & animations
│   ├── sitemap.ts / robots.ts ← SEO files (sitemap.xml, robots.txt)
│   └── not-found.tsx          ← 404 page
├── components/
│   ├── layout/                ← Navbar, Footer, Loader, Cursor, Providers
│   ├── home/                  ← Hero (viewfinder), VenturesStrip, VenturesList, Highlights,
│   │                            About, Journey, Vision, Contact, DragScroller
│   ├── ventures/              ← company page heroes + blocks + layouts
│   ├── motion/                ← reusable animations (Reveal, AnimatedHeading, Parallax)
│   └── ui/                    ← Button, ImageSlot, VentureLogo, JsonLd, Bits (CountUp, LiveClock, CopyButton…)
├── content/                   ← ✏️ ALL TEXT LIVES HERE
│   ├── site.ts                ← name, hero text, about, stats, socials, contact
│   ├── ventures.ts            ← the 4 companies (text, role, year, colours, layout, images)
│   ├── highlights.ts          ← "Drag to explore" highlight cards
│   └── journey.ts             ← timeline entries
├── styles/theme.css           ← 🎨 ALL COLOURS + FONTS LIVE HERE
├── public/                    ← images, favicon, social-preview images
├── scripts/make-og.py         ← regenerates social-preview images
└── .github/workflows/deploy.yml ← automatic deployment to GitHub Pages
```

**Rule of thumb:** to change words → `content/`. To change colours → `styles/theme.css`. To add photos → `public/images/`. You rarely need to touch `components/`.

---

## 2. Run it on your computer

Install Node.js 20 or newer first (`node -v` to check).

```bash
cd ram-patrudu-portfolio
npm install          # first time only
npm run dev          # open http://localhost:3000
```

Edit any file and the browser refreshes automatically.

To test the real production build:

```bash
npm run build        # creates the `out/` folder (the final website)
npm start            # serves `out/` at http://localhost:3000
```

---

## 3. Replace the placeholders

### Text
Anything inside **[square brackets]** is a placeholder. Search the `content/` folder for `[` and replace each one with **verified** information. Nothing has been invented — no dates, revenue, awards or services.

### Photos & logos
Drop files into `public/images/` with **exactly** these names. Until a file exists, a styled placeholder is shown automatically.

| File | Used in | Suggested size |
|---|---|---|
| `images/ram/hero-portrait.jpg` | Homepage hero | 1200 × 1500 (portrait) |
| `images/ram/about-1.jpg` | About — large photo | 1000 × 1250 |
| `images/ram/about-2.jpg` | About — small photo | 800 × 800 |
| `images/ram/vision-bg.jpg` | Vision section background | 2400 × 1400 (wide) |
| `images/ventures/<slug>/logo.png` | Logo (transparent PNG) | 400 × 400 |
| `images/ventures/<slug>/card.jpg` | Homepage venture card | 1600 × 1000 |
| `images/ventures/<slug>/hero.jpg` | Company page hero | 2000 × 1300 |
| `images/ventures/<slug>/gallery-1.jpg` … `gallery-3.jpg` | Company page media | 1200 × 1500 |

`<slug>` is one of: `trovity-insurance`, `mad-over-insurance`, `redcrabs`, `call-me-ooo`.

Using a different file name or format (e.g. `logo.svg`)? Change the path in `content/ventures.ts` or `content/site.ts`.

**Tip:** compress photos before uploading (e.g. squoosh.app, aim for under 400 KB each) so the site stays fast.

### Homepage sections (top to bottom)
Viewfinder hero (REC timecode) → ventures logo strip → **Ventures** list (hover for image preview, filter by category) → **Highlights** (drag to explore) → **About** (counting stats, portrait, principles) → **Journey** (drag / ← → timeline) → **Vision** statement → **Contact** (copy buttons, Instagram / WhatsApp / email, form).
Change the order in `app/page.tsx`.

### Dot cursor
On desktop, a small white dot replaces the mouse pointer and inverts whatever is under it (`mix-blend-mode: difference`); over links and buttons it grows. Settings are at the top of `components/layout/Cursor.tsx` (`DOT` size, `HOVER_SCALE` — set to `1` for no grow). It is switched off automatically on phones/tablets and for visitors who prefer reduced motion.

### Extra details to fill in (`content/site.ts`)
- `location` / `timeZone` — shown with a live clock in the navbar ("INDIA 16:34")
- `email`, `phone` — show rows with **Copy** buttons and an "Email me" button
- `whatsapp` — digits with country code (e.g. `919000000000`) shows a WhatsApp button
- `socials` — add LinkedIn / YouTube / X links
- In `content/ventures.ts`, `role` and `year` for each company appear in the Ventures list.

Highlight images go in `public/images/highlights/highlight-1.jpg` … `highlight-6.jpg` (portrait, ~1080×1350).

### Colours & fonts
Headings use **Archivo** (condensed, heavy), labels use **JetBrains Mono**. The current palette (near-black + off-white + red-orange `#E83C22`, matched to the reference) is **provisional**. When the final colours are ready, edit only `styles/theme.css` (whole site) and the `accent` / `accentInk` values for each company in `content/ventures.ts`.

### Company page layouts
Each company has its own layout (`layout` in `content/ventures.ts`):

| Company | Layout | Look |
|---|---|---|
| Trovity Insurance | `split` | Clean corporate split hero, card grid |
| Mad Over Insurance | `bold` | Giant typography, marquee, numbered services |
| Redcrabs | `editorial` | Full-screen photo hero, magazine story |
| Call Me OOO | `minimal` | Centred, calm, accordion services |

To re-order sections, edit `LAYOUTS` in `components/ventures/VenturePage.tsx`.

### Social preview images
After changing names or colours, regenerate the images shared on WhatsApp, LinkedIn etc.:

```bash
pip install pillow
python3 scripts/make-og.py
```

---

## 4. Contact form setup (free)

GitHub Pages can't run a server, so the form sends messages through **Web3Forms** (free).

1. Go to https://web3forms.com, enter the email address that should receive messages, and copy the **Access Key** they email you.
2. **Local testing:** copy `.env.example` to `.env.local` and paste the key:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
   ```
3. **Live site:** GitHub repo → **Settings → Secrets and variables → Actions → Variables tab → New repository variable**
   - Name: `NEXT_PUBLIC_WEB3FORMS_KEY`, Value: your key
4. Push any change (or re-run the workflow) so the site rebuilds with the key.

Until the key is set, the form validates input and then shows a friendly "not connected yet — message on Instagram" notice. The Web3Forms key is designed to be public, so it's safe in front-end code.

**Enquiries from company pages:** "Enquire Now" links go to `/?enquiry=<slug>#contact`, which pre-fills the message and tags the email with the company name.

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No (defaults to `https://rampatrudu.com`) | Canonical URLs, sitemap, social previews |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | For the contact form | Sends form messages to your email |

---

## 5. Deploy to GitHub Pages + rampatrudu.com

### Step 1 — Put the code on GitHub
1. On github.com click **New repository** → name it `ram-patrudu-portfolio` → **Public** → Create.
2. In a terminal inside the project folder:
   ```bash
   git init
   git add .
   git commit -m "Ram Patrudu portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ram-patrudu-portfolio.git
   git push -u origin main
   ```
   (GitHub asks for a password → use a **Personal Access Token**: GitHub → Settings → Developer settings → Personal access tokens.)

### Step 2 — Turn on GitHub Pages
1. Repo → **Settings → Pages**.
2. **Source:** choose **GitHub Actions**.
3. Open the **Actions** tab: the "Deploy to GitHub Pages" workflow runs (≈ 2 minutes). Wait for the green ✓.
4. Back in **Settings → Pages → Custom domain**, type `rampatrudu.com` → **Save**.

### Step 3 — GoDaddy DNS (rampatrudu.com only)
GoDaddy → My Products → **DNS** next to **rampatrudu.com** → **DNS Records**.

Your current records and what to do with each:

| Type | Name | Current value | Action |
|---|---|---|---|
| A | @ | Parked | ✏️ **Edit** → `185.199.108.153` |
| CNAME | www | rampatrudu.com. | ✏️ **Edit** → `YOUR-USERNAME.github.io` |
| NS | @ | ns69/ns70.domaincontrol.com | ❌ Don't touch |
| SOA | @ | … | ❌ Don't touch |
| CNAME | _domainconnect | … | ❌ Don't touch |
| TXT | _dmarc | … | ❌ Don't touch (email security) |

Then **Add New Record** three times:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | `185.199.109.153` | 1 Hour |
| A | @ | `185.199.110.153` | 1 Hour |
| A | @ | `185.199.111.153` | 1 Hour |

✅ **eshantpatrudu.com is not affected** — you are only editing rampatrudu.com's records. Always check the domain name at the top of the GoDaddy page before saving.

### Step 4 — HTTPS / SSL
1. Wait 15 minutes – a few hours for DNS to spread.
2. GitHub → Settings → Pages: when the DNS check shows ✓, tick **Enforce HTTPS**. GitHub issues the SSL certificate for free.
3. Open `https://rampatrudu.com` 🎉

### Updating the site later
Edit files → then:
```bash
git add .
git commit -m "Update content"
git push
```
GitHub rebuilds and republishes automatically.

---

## 6. Testing & troubleshooting

```bash
nslookup rampatrudu.com          # should show 185.199.108–111.153
curl -I https://rampatrudu.com   # should return HTTP/2 200
```

| Problem | Fix |
|---|---|
| Still shows GoDaddy parked page | An old A record still exists, or DNS hasn't spread. Test in a fresh incognito window. |
| GitHub says "DNS check unsuccessful" | Wait longer; make sure all 4 A records are saved. |
| "Not secure" warning | Tick **Enforce HTTPS** once the DNS check is green. |
| Workflow fails on GitHub | Actions tab → open the failed run → read the red step. Usually a typo; run `npm run build` locally to see the same error. |
| Page works locally but images missing live | File names are case-sensitive on the server: `Hero.JPG` ≠ `hero.jpg`. |
| Contact form says "not connected" | Add the `NEXT_PUBLIC_WEB3FORMS_KEY` variable and redeploy. |
| `^[[200~` appears when pasting in terminal | Paste with **Ctrl + Shift + V**. |

### Quality checklist (done before delivery)
- ✅ Builds with no TypeScript errors; 4 company routes generated statically
- ✅ All internal links and section anchors resolve
- ✅ Dropdown: hover, click, Escape and click-outside close; navigates to each company page
- ✅ Mobile hamburger menu with expandable ventures list
- ✅ Contact form validation, error/success feedback, enquiry pre-fill
- ✅ Loader shows once per session; skipped for reduced-motion users
- ✅ Desktop (1440px) and mobile (390px) layouts checked — no sideways scrolling
- ✅ Dot cursor inverts over text and grows on links; off on touch / reduced motion
- ✅ Drag-to-scroll + ← → controls (Highlights, Journey); ventures filter + clear; stat counters
- ✅ SEO: page titles, descriptions, Open Graph images, favicon, sitemap.xml, robots.txt, JSON-LD (Person + Organization)
