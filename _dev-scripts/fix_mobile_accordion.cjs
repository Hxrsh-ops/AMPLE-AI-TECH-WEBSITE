const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

// Find the mobile media query block
const startIdx = css.indexOf('/* ── Mobile: stack vertically ─────────────────────────── */');
const endIdx = css.indexOf('/* Hide default Framer background video inside Hero to show our custom looping local video, but keep the premium cinematic overlay and patterns fully visible */');

if (startIdx !== -1 && endIdx !== -1) {
    const newMobileCSS = `/* ── Mobile: stack vertically ─────────────────────────── */
@media (max-width: 1199.98px) {
  .as-wrapper {
    padding: 0 20px;
  }

  .as-track {
    flex-direction: column;
    height: auto;
    border-radius: 12px;
    background: #000;
  }

  .as-panel {
    flex: none !important;
    width: 100%;
    min-height: auto;
    padding: 30px 20px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: #000;
  }

  .as-panel:last-child {
    border-bottom: none;
  }

  .as-panel-bg {
    opacity: 1 !important;
  }
  .as-panel-overlay {
    opacity: 1 !important;
  }

  .as-panel-content {
    pointer-events: auto !important;
    flex-direction: column !important;
    gap: 20px !important;
  }

  .as-panel-num {
    color: rgba(255, 255, 255, 0.55) !important;
  }

  .as-collapsed-title {
    display: none !important;
  }

  .as-panel-expanded-top,
  .as-panel-expanded-bottom {
    opacity: 1 !important;
    transform: none !important;
  }

  .as-panel.as-cta {
    min-height: 250px;
    gap: 30px;
  }

  .as-panel.as-cta .as-panel-content {
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }
}

`;
    css = css.substring(0, startIdx) + newMobileCSS + css.substring(endIdx);
    fs.writeFileSync('src/styles/index.css', css);
    console.log('Mobile accordion styles patched.');
} else {
    console.log('Could not find the correct bounds in index.css');
}
