const fs = require('fs');

let css = fs.readFileSync('src/styles/index.css', 'utf8');

// Remove previous fix that hid the logo text
css = css.replace(/@media \(max-width: 640px\) \{\s*\/\* Fix logo overlapping with menu on mobile \*\/\s*\.framer-1b226dy \.framer-1rq7f4y span \{\s*display: none !important;\s*\}\s*\}/g, '');

const redesignCss = `
/* ======== NAVBAR REDESIGN ======== */

/* 1. Global Navbar Layout Fix */
.framer-s9D2D .framer-1ujr9vo {
  gap: 10px !important;
  justify-content: space-between !important;
  padding: 0 16px !important;
}

/* Let the containers size to content */
.framer-s9D2D .framer-1wd8sgv,
.framer-s9D2D .framer-1b226dy,
.framer-s9D2D .framer-1ejzk5i {
  flex: 0 0 auto !important;
  width: auto !important;
}

/* Center the logo properly if space allows */
@media (min-width: 800px) {
  .framer-s9D2D .framer-1b226dy {
    position: absolute !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
  }
}

/* 2. Menu Button Redesign */
.framer-kl0AZ {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 8px 16px !important;
  border-radius: 50px !important; /* Sleek pill shape */
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px) !important;
  transition: all 0.3s ease !important;
  cursor: pointer !important;
  width: auto !important;
  height: auto !important;
}
.framer-kl0AZ:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

/* Hide the old icon (5 squares) completely */
.framer-9uotoe {
  display: none !important;
}

/* Clean up the text */
.framer-4sbh13 p {
  font-family: 'Geist', sans-serif !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  color: #fff !important;
  margin: 0 !important;
  display: block !important;
}

/* Mobile specific fixes */
@media (max-width: 799px) {
  /* Restore logo span */
  .framer-1b226dy .framer-1rq7f4y span {
    display: block !important;
    font-size: 18px !important; /* Slightly smaller to fit mobile */
  }
  
  /* On mobile, remove absolute centering and rely on flex space-between */
  .framer-s9D2D .framer-1b226dy {
    position: static !important;
    transform: none !important;
  }
  
  /* Shrink menu button */
  .framer-kl0AZ {
    padding: 6px 12px !important;
  }
  
  .framer-4sbh13 p {
    font-size: 12px !important;
  }
}

@media (max-width: 480px) {
  /* For very small screens, hide the word "Menu" and just use an icon */
  .framer-4sbh13::before {
    content: "☰";
    font-size: 16px;
    color: white;
    display: block;
    line-height: 1;
    font-weight: normal;
  }
  .framer-4sbh13 p {
    display: none !important;
  }
  .framer-1b226dy .framer-1rq7f4y span {
    font-size: 16px !important;
  }
}
`;

fs.writeFileSync('src/styles/index.css', css + '\n' + redesignCss);
console.log('CSS updated');
