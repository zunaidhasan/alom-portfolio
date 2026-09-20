import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsDir = path.resolve(__dirname, '../public/assets/projects');
const heroDir = path.resolve(__dirname, '../public/assets/hero');

if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}
if (!fs.existsSync(heroDir)) {
  fs.mkdirSync(heroDir, { recursive: true });
}

const assetsToDownload = [
  {
    id: '1NxWHMIYwQxNLlyDI_T0QGmLFX5c2hq0h',
    filename: 'all-design-showcase.png',
    title: 'Aura Collective — Comprehensive Brand Showcase',
    category: 'Brand Identity Systems',
    tag: 'Full Identity',
    year: '2024',
    client: 'Aura Studio & Partners',
    tools: ['Adobe Illustrator', 'Photoshop', 'Figma'],
    description: 'A complete visual universe created from ground zero: minimalist geometric logo mark, bespoke editorial typography, corporate guidelines, and physical collateral designed for an international multidisciplinary studio.'
  },
  {
    id: '13wjFWZXJlGG_f2hTeCUF_Vi6x8f2LDD1',
    filename: 'cover-image.jpg',
    title: 'Vanguard Architecture — Identity & Visual Language',
    category: 'Logo Design',
    tag: 'Rebranding',
    year: '2024',
    client: 'Vanguard Design Group',
    tools: ['Adobe Illustrator', 'Photoshop'],
    description: 'A structural, brutalist-meets-luxury brand mark engineered with golden-ratio precision. The identity translates seamlessly across digital interfaces, embossed physical folios, and environmental signage.'
  },
  {
    id: '1SUYSFm678nMoXaicqG-uFxM8enXktyph',
    filename: 'dental-care-branding.png',
    title: 'Lumina Dental & Aesthetics — Modern Clinic Identity',
    category: 'Rebranding',
    tag: 'Medical Identity',
    year: '2023',
    client: 'Lumina Healthcare UK',
    tools: ['Illustrator', 'Photoshop', 'InDesign'],
    description: 'Transforming a sterile healthcare practice into a warm, modern clinical sanctuary. The logo embodies organic precision, human empathy, and clinical excellence with a harmonious pastel and teal palette.'
  },
  {
    id: '1s6jm7yJYtXm6setFaEH-67NAZJxI5S6T',
    filename: 'business-cards.jpg',
    title: 'Obsidian & Gold — Luxury Foil Stationery Suite',
    category: 'Stationery & Business Cards',
    tag: 'Print & Packaging',
    year: '2024',
    client: 'Kruger Capital Management',
    tools: ['Adobe InDesign', 'Photoshop', 'Illustrator'],
    description: 'Tactile, ultra-heavy 600gsm matte black stock with precision metallic gold foil stamping and gilded edges. An unmistakable statement of prestige for private wealth management.'
  },
  {
    id: '1RcTJ_zOFny25gevHSaqUQhufkmwMajah',
    filename: 'brand-brochure.png',
    title: 'Elysian Living — Editorial Brand Guidelines & Lookbook',
    category: 'Brand Guidelines',
    tag: 'Editorial Design',
    year: '2023',
    client: 'Elysian Properties',
    tools: ['Adobe InDesign', 'Illustrator'],
    description: 'A 48-page comprehensive brand master-book defining clear typographic hierarchy, negative space rules, color alchemy, and photographic direction for high-end residential spaces.'
  },
  {
    id: '11rdUVAtLYiL5QCGiDHTCKjvEuwmsZAjU',
    filename: 'dental-rebrand-suite.png',
    title: 'Apex Dental Care — Multi-location Brand Evolution',
    category: 'Rebranding',
    tag: 'Healthcare Brand',
    year: '2023',
    client: 'Apex Health Group',
    tools: ['Illustrator', 'Figma'],
    description: 'Revamping an outdated healthcare brand across 6 locations. Redesigned the primary emblem, iconography set, clinic interiors typography, and patient onboarding packages.'
  },
  {
    id: '1xb180OLUWCpSbodK86cfVfGbEfj-4hcE',
    filename: 'amold-poster.png',
    title: 'Metropolis Culture Fest — Typography & Visual System',
    category: 'Social Media Branding',
    tag: 'Campaign Identity',
    year: '2024',
    client: 'Metropolis Arts Pavilion',
    tools: ['Photoshop', 'Illustrator'],
    description: 'Kinetic typography and high-contrast color theory designed for outdoor billboard campaigns and high-engagement social media rollouts.'
  },
  {
    id: '1DV7tmZwm1DSN15Y0KalVrbQ2gaMdltV4',
    filename: 'banner-design.png',
    title: 'Zenith Ventures — Digital Brand Presence & Web Identity',
    category: 'Brand Identity Systems',
    tag: 'Digital Branding',
    year: '2024',
    client: 'Zenith Global Ventures',
    tools: ['Figma', 'Illustrator', 'Photoshop'],
    description: 'Modern digital identity system designed for dynamic social grids, LinkedIn authority positioning, high-converting banner collateral, and pitch decks.'
  },
  {
    id: '1cf7b3WjNn7gR8rtzcEBoL0BlHoyPI_ch',
    filename: 'monogram-01.jpg',
    title: 'Solstice Monogram — Geometric Emblem Mark',
    category: 'Logo Design',
    tag: 'Monogram Mark',
    year: '2023',
    client: 'Solstice Creative Lab',
    tools: ['Adobe Illustrator'],
    description: 'A hypnotic, interlocking geometric monogram crafted using mathematical grid systems and optical balance adjustments for effortless scalability from 16px favicons to building facades.'
  },
  {
    id: '1N9KPAbcoAaq5Uz7vr3iGatdV2i50Cif9',
    filename: 'luxury-rebrand-02.jpg',
    title: 'Aethelgard Heritage — Luxury Rebranding Project',
    category: 'Rebranding',
    tag: 'Luxury Goods',
    year: '2024',
    client: 'Aethelgard Timepieces',
    tools: ['Illustrator', 'Photoshop'],
    description: 'A legacy European watchmaker needed a brand refresh for modern collectors. We streamlined their crest into a razor-sharp modern emblem while retaining 80 years of craftsmanship heritage.'
  },
  {
    id: '1MgOw3jf3Bj8y_0aKW-Kbz9qnfNEiqh3J',
    filename: 'tech-identity-03.png',
    title: 'Synapse AI — Intelligent Infrastructure Logo Mark',
    category: 'Logo Design',
    tag: 'Tech Identity',
    year: '2024',
    client: 'Synapse Cloud Inc.',
    tools: ['Adobe Illustrator', 'Figma'],
    description: 'Dynamic brand mark communicating high-speed neural networks and human ingenuity. Features adaptable lockups for dark mode dashboards, mobile apps, and technical whitepapers.'
  },
  {
    id: '1dHX0-LLOlYM0X3F37nhhQNc1M-sYGG6B',
    filename: 'design-concept-01.png',
    title: 'Kinetix Studio — Kinetic Motion & Visual Mark',
    category: 'Packaging Design',
    tag: 'Packaging & Identity',
    year: '2023',
    client: 'Kinetix Audio',
    tools: ['Adobe Illustrator', 'Photoshop'],
    description: 'Retail packaging architecture and acoustic-inspired visual identity. Designed with unboxing psychology in mind, utilizing embossing, spot UV varnishes, and custom die-cuts.'
  }
];

async function downloadAsset(item) {
  const targetPath = path.join(projectsDir, item.filename);
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 1000) {
    console.log(`[SKIP] ${item.filename} already exists (${fs.statSync(targetPath).size} bytes)`);
    return true;
  }

  const url = `https://drive.google.com/thumbnail?id=${item.id}&sz=w1200`;
  console.log(`[DOWNLOADING] ${item.filename} from Google Drive...`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    if (!res.ok) {
      console.error(`Failed to download ${item.filename}: HTTP ${res.status}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(targetPath, buffer);
    console.log(`[SUCCESS] Saved ${item.filename} (${buffer.length} bytes)`);
    return true;
  } catch (err) {
    console.error(`Error downloading ${item.filename}:`, err.message);
    return false;
  }
}

async function run() {
  console.log('Starting project asset downloads...');
  for (const item of assetsToDownload) {
    await downloadAsset(item);
    // tiny delay to be polite
    await new Promise(r => setTimeout(r, 250));
  }
  
  // Save manifest
  const manifestPath = path.resolve(__dirname, '../src/projectsManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(assetsToDownload, null, 2));
  console.log(`Saved projects manifest to ${manifestPath}`);
}

run();
