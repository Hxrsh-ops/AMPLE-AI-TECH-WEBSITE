const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

const targetStr = `
.showcase-canvas-card {
  width: 100%;
  aspect-ratio: 1.25;
  background: rgba(255, 255, 255, 0.02) !important;
  backdrop-filter: blur(32px) !important;
  -webkit-backdrop-filter: blur(32px) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 24px !important;
  position: relative;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 30px 70px rgba(0, 0, 0, 0.65), 
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 0 50px rgba(0, 153, 255, 0.01) !important;
  transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}`.trim();

const replacementStr = `
.showcase-canvas-card {
  width: 100%;
  aspect-ratio: 1.25;
  background: rgba(10, 10, 10, 0.8) !important;
  background-image: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%) !important;
  backdrop-filter: blur(48px) !important;
  -webkit-backdrop-filter: blur(48px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
  position: relative;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 40px 100px -10px rgba(0, 0, 0, 0.8), 
    inset 0 1px 1px rgba(255, 255, 255, 0.1) !important;
  transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}`.trim();

if (css.includes(targetStr)) {
  css = css.replace(targetStr, replacementStr);
  console.log('Replaced successfully');
} else {
  console.log('Target string not found');
}

fs.writeFileSync('src/styles/index.css', css);
