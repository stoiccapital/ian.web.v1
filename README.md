# Untap Your Sales Potential - Landing Page

Premium marketing landing page for elite sales coaching brand.

## Structure

```
/
├── index.html              # Main file with SSI includes
├── index-standalone.html   # Merged version (for local viewing)
├── html/partials/          # HTML partials
├── css/                    # Stylesheets
│   ├── base.css           # Design tokens, reset, typography
│   ├── components.css     # Reusable components
│   └── page.css           # Section-specific styles
└── js/
    └── main.js            # Navigation, smooth scroll, accordion, reveal
```

## Viewing the Page

### Option 1: Standalone (No Server Required)
Open `index-standalone.html` directly in your browser. This is a merged version of all partials.

### Option 2: With SSI Support (Production)
Use a web server with Server Side Includes (SSI) support:
- Apache with `mod_include`
- Nginx with SSI module
- Any server that processes `<!--#include file="..." -->` directives

### Option 3: Merge Script
Run the Python merge script to regenerate the standalone version:
```bash
python3 merge.py
```

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

