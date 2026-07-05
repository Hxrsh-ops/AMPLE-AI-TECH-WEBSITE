const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

const cardTarget = `.showcase-canvas-card {
  width: 100%;
  aspect-ratio: 1.25;
  background: #0a0a0a !important;
  background-image: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%) !important;
  backdrop-filter: blur(48px) !important;
  -webkit-backdrop-filter: blur(48px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.25) !important;
  border-radius: 12px !important;
  position: relative;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 50px 100px -20px rgba(0, 0, 0, 1),
    0 30px 60px -30px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
  transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}`;

const cardReplacement = `.showcase-canvas-card {
  width: 100%;
  aspect-ratio: 1.25;
  background: #0a0a0a !important;
  background-image: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.25) !important;
  border-radius: 12px !important;
  position: relative;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 50px 100px -20px rgba(0, 0, 0, 1),
    0 30px 60px -30px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
  transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
  /* Ensure it creates a 3D effect context */
  transform-style: preserve-3d;
}`;

let modified = false;
if (css.includes(cardTarget)) { css = css.replace(cardTarget, cardReplacement); modified = true; }

fs.writeFileSync('src/styles/index.css', css);
console.log('Stacking context fixed!');
