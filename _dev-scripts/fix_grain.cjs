const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

const targetBefore = `.showcase-scroll-container::before {
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
}`;

const replacementBefore = `.showcase-scroll-container::before {
  content: "";
  position: absolute;
  top: -20px;
  left: -20px;
  width: calc(100% + 40px);
  height: calc(100% + 40px);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-size: 150px 150px;
  background-repeat: repeat;
  opacity: 0.04;
  pointer-events: none;
  z-index: 0;
  will-change: transform;
  animation: filmGrain 0.6s steps(2) infinite;
}`;

const targetKeyframes = `@keyframes filmGrain {
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

const replacementKeyframes = `@keyframes filmGrain {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-5px, 5px); }
  40% { transform: translate(-5px, -5px); }
  60% { transform: translate(5px, 5px); }
  80% { transform: translate(5px, -5px); }
  100% { transform: translate(0, 0); }
}`;

let modified = false;
if (css.includes(targetBefore)) { css = css.replace(targetBefore, replacementBefore); modified = true; } else { console.log('targetBefore not found'); }
if (css.includes(targetKeyframes)) { css = css.replace(targetKeyframes, replacementKeyframes); modified = true; } else { console.log('targetKeyframes not found'); }

if (modified) {
  fs.writeFileSync('src/styles/index.css', css);
  console.log('Grain fixed!');
}
