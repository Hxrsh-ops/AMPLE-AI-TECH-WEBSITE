const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

const containerTarget = `.showcase-scroll-container {
  position: relative;
  width: 100%;
  background: var(--token-53ac5080-809d-430f-8c22-cd6ed2fb990c, rgb(13, 13, 13));
  overflow: hidden !important;
}`;

const containerReplacement = `.showcase-scroll-container {
  position: relative;
  width: 100%;
  background: radial-gradient(circle at 50% 60%, #1f1f1f 0%, #0a0a0a 50%, #000000 100%);
  overflow: hidden !important;
}`;

const cardTarget = `.showcase-canvas-card {
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
}`;

const cardReplacement = `.showcase-canvas-card {
  width: 100%;
  aspect-ratio: 1.25;
  background: #0f0f0f !important;
  background-image: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%) !important;
  backdrop-filter: blur(48px) !important;
  -webkit-backdrop-filter: blur(48px) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
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
    inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
  transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* Linear-style Floor Shadow Illusion */
.showcase-canvas-card::after {
  content: "";
  position: absolute;
  bottom: -40px;
  left: 5%;
  width: 90%;
  height: 20px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.9);
  filter: blur(20px);
  z-index: -1;
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.4s ease;
}`;

const cardHoverTarget = `.showcase-canvas-card:hover {
  border-color: rgba(255, 255, 255, 0.2) !important;
  box-shadow: 
    0 40px 100px -10px rgba(0, 0, 0, 0.95), 
    inset 0 1px 1px rgba(255, 255, 255, 0.15) !important;
}`;

const cardHoverReplacement = `.showcase-canvas-card:hover {
  border-color: rgba(255, 255, 255, 0.12) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
  transform: translateY(-4px);
  box-shadow: 
    0 60px 120px -20px rgba(0, 0, 0, 1),
    0 40px 80px -30px rgba(0, 0, 0, 0.9),
    inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
}

.showcase-canvas-card:hover::after {
  opacity: 0.7;
  transform: scale(0.95) translateY(10px);
}`;

let modified = false;
if (css.includes(containerTarget)) {
  css = css.replace(containerTarget, containerReplacement);
  modified = true;
} else {
  console.log('containerTarget not found');
}

if (css.includes(cardTarget)) {
  css = css.replace(cardTarget, cardReplacement);
  modified = true;
} else {
  console.log('cardTarget not found');
}

if (css.includes(cardHoverTarget)) {
  css = css.replace(cardHoverTarget, cardHoverReplacement);
  modified = true;
} else {
  console.log('cardHoverTarget not found');
}

if (modified) {
  fs.writeFileSync('src/styles/index.css', css);
  console.log('Linear style applied!');
}
