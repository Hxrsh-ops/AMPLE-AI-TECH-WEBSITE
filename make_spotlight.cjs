const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

const containerTarget = `.showcase-scroll-container {
  position: relative;
  width: 100%;
  background: radial-gradient(ellipse at 75% 50%, rgba(45,45,45,1) 0%, rgba(15,15,15,1) 35%, rgba(5,5,5,1) 100%) !important;
  overflow: hidden !important;
}`;

const containerReplacement = `.showcase-scroll-container {
  position: relative;
  width: 100%;
  background: #000000 !important;
  overflow: hidden !important;
}`;

const cardTarget = `.showcase-canvas-card {
  width: 100%;
  aspect-ratio: 1.25;
  background: #080808 !important;
  background-image: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.0) 100%) !important;
  backdrop-filter: blur(48px) !important;
  -webkit-backdrop-filter: blur(48px) !important;
  border: 1px solid rgba(255, 255, 255, 0.06) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 12px !important;
  position: relative;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 50px 100px -20px rgba(0, 0, 0, 1),
    0 30px 60px -30px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
  transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}`;

const cardReplacement = `.showcase-canvas-card {
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
}

/* Spotlight glow behind the card */
.showcase-canvas-card::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
  filter: blur(80px);
  z-index: -2;
  pointer-events: none;
}`;

let modified = false;
if (css.includes(containerTarget)) { css = css.replace(containerTarget, containerReplacement); modified = true; }
if (css.includes(cardTarget)) { css = css.replace(cardTarget, cardReplacement); modified = true; }

fs.writeFileSync('src/styles/index.css', css);
console.log('Spotlight applied!');
