# Alom Hossain — 3D Brand & Logo Design Portfolio

A single-page, high-performance, Awwwards-level 3D portfolio website for **Alom Hossain** — Graphic Designer specializing in **Logo Design, Rebranding & Brand Identity Systems**.

Live profile link: [Alom Hossain on Upwork](https://www.upwork.com/freelancers/~01e5113de9a8f9e445)

---

## 🌟 Key Features

1. **Three.js Interactive 3D Background**:
   - Floating wireframe geometric logo glyphs (Torus knot, Icosahedrons, Platonic solids) and ambient gold & teal particle constellation.
   - Reacts to subtle mouse movements with physics lerping.
   - Automatically pauses on tab visibility changes to preserve 60fps performance and zero battery drain.
   - WebGL fallback support.

2. **Interactive 3D Hero Card**:
   - Gyroscopic / mouse-following 3D perspective tilt.
   - Dedicated circular photo avatar slot for Alom Hossain with radiant golden halo glow.
   - Parallax-reactive floating tool badges (`Ai - Vector Master`, `Grid Precision`, `Ps - Mockup Pro`).
   - Dynamic live counter stats: *150+ Logos Crafted*, *80+ Brand Systems*, *5+ Years Experience*, *100% Client Satisfaction*.

3. **Curated Work Showcase & Case-Study Modals**:
   - 12 real projects downloaded from Alom's Google Drive archive.
   - Interactive category filtering (All, Logo Design, Rebranding, Brand Identity Systems, Guidelines, Stationery & Packaging).
   - High-performance 3D card tilt with specular light sheen.
   - Full case study modal dialog featuring challenge & solution narratives, tools used, hex color palettes, deliverables checklist, ESC key dismissal, and direct Upwork inquiry link.

4. **Specialized Capabilities & Services**:
   - 7 core branding disciplines: Logo Design, Rebranding, Brand Identity Systems, Brand Guidelines, Stationery & Business Cards, Packaging Design, Social Media & Digital Branding.
   - Key deliverables checklist and custom vector iconography.

5. **Design Philosophy & 4-Stage Formula**:
   - Narrative bio highlighting Swiss grid discipline, geometric clarity, and vector precision.
   - 4-Stage Identity Formula (Discovery → Exploration → Vector Crafting → System & Guidelines).

6. **Lead-Generating Contact Section**:
   - Direct Upwork verified specialist badge and profile invitation card.
   - Interactive project brief form with service selector, budget estimator, validation, and confetti celebration toast.

7. **Awwwards-Level Micro-Interactions**:
   - Dual custom cursor (inner dot + lagging magnetic fluid ring that snaps to links & cards).
   - Subtle Web Audio API tactile audio haptics (with toggle button in the navigation bar).
   - Preloader with monogram animation.
   - Prefers-reduced-motion support and mobile-first responsive layout.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
The optimized static production bundle is generated into the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📸 Photo & Project Asset Replacement Guide

### Replacing Alom Hossain's Hero Photo
1. Prepare a high-resolution square photo of Alom (recommended: 600×600px or larger, JPG or PNG).
2. Save your photo as `public/assets/hero/alom-hossain.jpg`.
3. Open `index.html` and locate the hero photo comment:
   ```html
   <!-- HERO PHOTO / AVATAR CONTAINER -->
   <img 
     id="hero-avatar-image"
     src="/assets/hero/alom-placeholder.svg" 
     alt="Alom Hossain — Graphic Designer & Brand Identity Specialist" 
   />
   ```
4. Change the `src` attribute from `/assets/hero/alom-placeholder.svg` to `/assets/hero/alom-hossain.jpg`.
5. The 3D tilt, gold halo ring, and floating badges will automatically frame the new photo.

### Adding or Updating Projects from Google Drive
The project images are stored locally in `public/assets/projects/` (downloaded from Google Drive):
- To update or add new projects, drop the image files into `public/assets/projects/`.
- Open `src/projectsData.js` to edit or add new project objects (title, category, client, tools, palette, case study narrative, deliverables).
- Run `npm run build` to update the production files.

---

## 🛠️ Technology Stack
- **Bundler**: Vite 5
- **3D Scene**: Three.js (WebGL)
- **Animations**: GSAP 3 + ScrollTrigger
- **Styling**: Tailwind CSS + Custom Obsidian & Gold Design Tokens
- **Icons**: Handcrafted Crisp SVG Vectors
- **Tactile Audio**: Native Web Audio API Synthesizer
- **Micro-Delights**: Canvas-Confetti

---

## 👤 Designer Credits
- **Designer**: Alom Hossain
- **Specialty**: Graphic Designer | Logo Design, Rebranding & Brand Identity Designer
- **Upwork Profile**: [https://www.upwork.com/freelancers/~01e5113de9a8f9e445](https://www.upwork.com/freelancers/~01e5113de9a8f9e445)
