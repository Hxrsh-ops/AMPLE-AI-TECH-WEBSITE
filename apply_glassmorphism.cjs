const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

const blobTarget = `.showcase-blob {
  display: none !important;
  position: absolute;
  border-radius: 50%;
  filter: blur(160px);
  opacity: 0.22 !important;
  mix-blend-mode: screen;
  will-change: transform;
  pointer-events: none;
  z-index: 1;
}`;

const blobReplacement = `.showcase-blob {
  display: block !important;
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.9 !important;
  mix-blend-mode: normal;
  will-change: transform;
  pointer-events: none;
  z-index: 1;
}`;

const blobBlueTarget = `.blob-blue {
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, rgba(0, 153, 255, 0.85) 0%, rgba(0, 153, 255, 0) 70%);
  top: -100px;
  right: -100px;
  animation: showcaseBlobFloat1 22s ease-in-out infinite alternate;
}`;

const blobBlueReplacement = `.blob-blue {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(50, 50, 50, 0.9) 0%, rgba(15, 15, 15, 0) 70%);
  top: -100px;
  right: -100px;
  animation: showcaseBlobFloat1 22s ease-in-out infinite alternate;
}`;

const blobPurpleTarget = `.blob-purple {
  width: 650px;
  height: 650px;
  background: radial-gradient(circle, rgba(179, 102, 255, 0.65) 0%, rgba(179, 102, 255, 0) 70%);
  bottom: -200px;
  left: -150px;
  animation: showcaseBlobFloat2 28s ease-in-out infinite alternate;
}`;

const blobPurpleReplacement = `.blob-purple {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(40, 40, 40, 0.95) 0%, rgba(10, 10, 10, 0) 70%);
  bottom: -200px;
  left: -150px;
  animation: showcaseBlobFloat2 28s ease-in-out infinite alternate;
}`;

const stickyWrapperTarget = `.showcase-sticky-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 0 8%;
  box-sizing: border-box;
  gap: 60px;
  position: relative;
  z-index: 2;
}`;

const stickyWrapperReplacement = `.showcase-sticky-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 0 8%;
  box-sizing: border-box;
  gap: 60px;
  position: relative;
  z-index: 2;
}

.showcase-sticky-wrapper::before {
  content: "";
  position: absolute;
  inset: -100px;
  background: rgba(8, 8, 8, 0.6);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  z-index: 2;
  pointer-events: none;
}`;

// Note: we might also want to change the .showcase-scroll-container background to be extremely dark
const scrollContainerTarget = `.showcase-scroll-container {
  position: relative;
  width: 100%;
  background: var(--token-53ac5080-809d-430f-8c22-cd6ed2fb990c, rgb(13, 13, 13));
  overflow: hidden !important;
}`;
const scrollContainerReplacement = `.showcase-scroll-container {
  position: relative;
  width: 100%;
  background: #020202; /* deeper black base */
  overflow: hidden !important;
}`;

if(css.includes(blobTarget)) css = css.replace(blobTarget, blobReplacement);
else console.log('blobTarget not found');

if(css.includes(blobBlueTarget)) css = css.replace(blobBlueTarget, blobBlueReplacement);
else console.log('blobBlueTarget not found');

if(css.includes(blobPurpleTarget)) css = css.replace(blobPurpleTarget, blobPurpleReplacement);
else console.log('blobPurpleTarget not found');

if(css.includes(stickyWrapperTarget)) css = css.replace(stickyWrapperTarget, stickyWrapperReplacement);
else console.log('stickyWrapperTarget not found');

if(css.includes(scrollContainerTarget)) css = css.replace(scrollContainerTarget, scrollContainerReplacement);
else console.log('scrollContainerTarget not found');

fs.writeFileSync('src/styles/index.css', css);
console.log('Glassmorphism applied!');
