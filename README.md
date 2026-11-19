# Borra Kasi Naga Sai Lakshmi — Developer Portfolio

A premium, responsive personal portfolio website built with vanilla HTML5, CSS3, and JavaScript.

## Features

- **Dark cinematic theme** with purple & electric-blue gradient accents
- **Glassmorphism cards** with subtle hover effects
- **Animated typing effect** for professional titles
- **Fully responsive** — mobile, tablet, and desktop
- **Smooth scroll** with reveal animations
- **Sticky navigation** with active section highlighting
- **Hamburger menu** for mobile
- **Back-to-top button**
- **Contact form** with client-side validation
- **SEO metadata** and custom SVG favicon
- **Accessible design** with `prefers-reduced-motion` support

## Project Structure

```
my-portfolio/
├── index.html              # Main HTML
├── css/
│   ├── style.css           # Main stylesheet (~30KB)
│   └── responsive.css      # Responsive breakpoints
├── js/
│   └── script.js           # Interactivity & animations
├── assets/
│   ├── profile.png         # ← Add your photo here
│   ├── resume.pdf          # ← Add your resume here
│   └── icons/
│       └── favicon.svg     # Custom SVG favicon
└── README.md
```

## Setup

1. **Add your profile photo** — place your image as `assets/profile.png`
2. **Add your resume** — place your resume PDF as `assets/resume.pdf`
3. Open `index.html` in a browser — no build tools required

## Contact Form Backend

The contact form validates inputs client-side but does **not** send emails without a backend. To enable email delivery, choose one of:

| Service | Setup |
|---------|-------|
| **Formspree** | Change `<form>` action to `https://formspree.io/f/YOUR_ID` and set `method="POST"` |
| **EmailJS** | Add the EmailJS SDK and configure `emailjs.send()` in `script.js` |
| **Netlify Forms** | Add `netlify` attribute to the `<form>` tag |

## Deploy to Vercel

### Option A — Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project folder
cd my-portfolio

# Deploy
vercel

# Follow prompts — select your account, confirm settings
# Vercel auto-detects static sites. No framework needed.

# Deploy to production
vercel --prod
```

### Option B — GitHub + Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"New Project"** → Import your repository
4. Framework Preset: **Other** (static)
5. Build Command: *(leave blank)*
6. Output Directory: `.` (root)
7. Click **Deploy**

### Option C — GitHub Pages

```bash
# Push to GitHub, then go to repo Settings → Pages
# Source: Deploy from branch → main → / (root)
# Your site will be live at https://username.github.io/repo-name
```

## Browser Support

Chrome, Firefox, Safari, Edge (latest 2 versions)

## License

© 2026 Borra Kasi Naga Sai Lakshmi. All rights reserved.
