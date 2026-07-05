const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

const target = `.showcase-scroll-container {
  position: relative;
  width: 100%;
  background: #000000 !important;
  overflow: hidden !important;
}`;

const replacement = `.showcase-scroll-container {
  position: relative;
  width: 100%;
  background: #000000 !important;
  overflow: hidden !important;
}

.showcase-scroll-container::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.06;
  pointer-events: none;
  z-index: 0;
  animation: filmGrain 0.8s steps(1) infinite;
}

@keyframes filmGrain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  20% { transform: translate(-15%, 5%); }
  30% { transform: translate(7%, -25%); }
  40% { transform: translate(-5%, 25%); }
  50% { transform: translate(-15%, 10%); }
  60% { transform: translate(15%, 0%); }
  70% { transform: translate(0%, 15%); }
  80% { transform: translate(3%, 35%); }
  90% { transform: translate(-10%, 10%); }
}`;

if (css.includes(target)) {
  css = css.replace(target, replacement);
  fs.writeFileSync('src/styles/index.css', css);
  console.log('Grain added!');
} else {
  console.log('Target not found.');
}
