# How to Replace Alom Hossain's Hero Photo

1. Prepare a high-resolution photo of Alom Hossain (square ratio 1:1, min 600x600px, e.g. `alom-hossain.jpg` or `alom-hossain.png`).
2. Drop your image into this folder:
   `public/assets/hero/alom-hossain.jpg`
3. Open `index.html` and find the hero avatar section (around lines marked with `<!-- HERO PHOTO / AVATAR -->`):
   Change:
   ```html
   <img src="/assets/hero/alom-placeholder.svg" alt="Alom Hossain" ... />
   ```
   To:
   ```html
   <img src="/assets/hero/alom-hossain.jpg" alt="Alom Hossain - Brand & Logo Designer" ... />
   ```
4. The rounded styling, 3D tilt, gold halo ring, and floating reactive badges will automatically frame the photo!
