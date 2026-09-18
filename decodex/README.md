# DecodeX

Personal creator / technology website for **DecodeX** by Muhammad Ahtisham Mukhtar (@itsdecordex).

## Stack

- HTML5
- Modern CSS3 (design tokens, dark/light themes)
- Vanilla JavaScript (ES6+)

No React, Vue, Bootstrap, or Tailwind as primary stack. GitHub Pages ready.

## Structure

```
decodex/
├── index.html          # Homepage
├── css/                # variables, base, layout, components
├── js/app.js           # Theme, nav, search, finder, contact
├── data/               # phones.js, videos.js (easy to extend)
├── assets/images/      # Character mascot
├── pages/              # about, reviews, finder, videos, contact, etc.
├── robots.txt
└── sitemap.xml
```

## Features

- Dark / light theme (localStorage + prefers-color-scheme)
- Responsive header + mobile menu
- Hero with DecodeX character
- Video carousel (TikTok-style cards)
- Phone reviews + full detail view
- Phone Finder (criteria + budget scoring)
- Phone Compare (two devices)
- Global search (Ctrl/Cmd+K)
- Contact form (mailto fallback + integration point)
- Favourites via localStorage
- Accessibility: focus states, ARIA, reduced motion
- SEO: meta, OG, JSON-LD, sitemap, robots

## Deploy (GitHub Pages)

1. Push this folder to a repository (e.g. `decodex`).
2. Settings → Pages → Deploy from branch `/` (or `/docs` if you move files).
3. Update canonical URLs in HTML and `sitemap.xml` to your real domain.

## Extend content

- Phones: edit `data/phones.js`
- Videos: edit `data/videos.js`
- Add pages under `pages/` and link in the header/footer

## Contact

- Email: itsdecordex@gmail.com
- TikTok / Instagram / YouTube: @itsdecordex
