const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

// Hide beam
css = css.replace('.showcase-bg-beam {', '.showcase-bg-beam {\n  display: none !important;');

// Hide blobs
css = css.replace('.showcase-blob {', '.showcase-blob {\n  display: none !important;');

// Update canvas card
const cardRegex = /\.showcase-canvas-card \{[\s\S]*?transition:.*?\}\n/g;
css = css.replace(cardRegex, `.showcase-canvas-card {
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
}
`);

// Update dot colors
css = css.replace(
  /\.mockup-dot\.red \{ background: rgba\(255, 255, 255, 0\.15\); \}/,
  '.mockup-dot.red { background: #FF5F56; box-shadow: 0 0 10px rgba(255,95,86,0.3); }'
);
css = css.replace(
  /\.mockup-dot\.yellow \{ background: rgba\(255, 255, 255, 0\.15\); \}/,
  '.mockup-dot.yellow { background: #FFBD2E; box-shadow: 0 0 10px rgba(255,189,46,0.3); }'
);
css = css.replace(
  /\.mockup-dot\.green \{ background: rgba\(255, 255, 255, 0\.15\); \}/,
  '.mockup-dot.green { background: #27C93F; box-shadow: 0 0 10px rgba(39,201,63,0.3); }'
);

fs.writeFileSync('src/styles/index.css', css);
console.log('Patched index.css');
