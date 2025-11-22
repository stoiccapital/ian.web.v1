# Untap Your Sales Potential - Landing Page

Premium marketing landing page for elite sales coaching brand.

## Structure

```
/
├── index.template.html     # Template file with partial includes
├── build/
│   └── merge.js           # Build script to merge partials
├── dist/                  # Output directory (generated)
│   ├── index.html         # Merged HTML file
│   ├── css/               # Copied stylesheets
│   ├── js/                # Copied JavaScript
│   └── assets/            # Copied assets
├── html/partials/         # HTML partials
├── css/                   # Stylesheets
│   ├── base.css          # Design tokens, reset, typography
│   ├── components.css    # Reusable components
│   └── page.css          # Section-specific styles
└── js/
    └── main.js           # Navigation, smooth scroll, accordion, reveal
```

## Building the Site

The site uses a build-time partial merge system compatible with Cloudflare Pages.

### Build Command
```bash
npm run build
```

This will:
1. Merge `index.template.html` with all partials from `html/partials/`
2. Output the merged HTML to `dist/index.html`
3. Copy `css/`, `js/`, and `assets/` to `dist/` for proper asset paths

### Cloudflare Pages Deployment

Set the build command in Cloudflare Pages:
- **Build command**: `npm run build`
- **Output directory**: `dist`

The build system uses Node.js template syntax (`{{> partial.html}}`) which is processed at build time.

## Design System

- **Primary Color**: #0066ff (Blue)
- **Spacing**: 8px rhythm (4px for micro)
- **Typography**: Inter font family
- **Breakpoints**: Mobile-first responsive design
- **Animations**: IntersectionObserver-based reveal effects

## Features

- ✅ Sticky navigation with mobile menu
- ✅ Smooth scroll for anchor links
- ✅ Accordion FAQ with ARIA support
- ✅ Scroll-triggered reveal animations
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Premium SaaS aesthetic
- ✅ No external dependencies (vanilla JS)

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with ES6+ support.

