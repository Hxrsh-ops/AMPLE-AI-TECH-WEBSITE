const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetVideo = '<video loop="" preload="none" poster="https://framerusercontent.com/images/vxnQq6KCweeBioEMVgx1SOxlA.png?width=1920&amp;height=1080" muted="" playsinline="" style="aspect-ratio: 1920/1080; cursor:auto; width:100%; height:100%; border-radius:0px; display:block; object-fit:cover; background-color:var(--token-e6153571-ff29-43ab-9b86-86e0a3bea6b1, rgba(255, 255, 255, 0)); object-position:50% 50%"></video>';
const replacementVideo = '<video src="https://framerusercontent.com/assets/LNnURVfpSp9Fvh6wpE6wglMr8.mp4" loop="" preload="none" poster="https://framerusercontent.com/images/vxnQq6KCweeBioEMVgx1SOxlA.png?width=1920&amp;height=1080" muted="" playsinline="" style="aspect-ratio: 1920/1080; cursor:auto; width:100%; height:100%; border-radius:0px; display:block; object-fit:cover; background-color:var(--token-e6153571-ff29-43ab-9b86-86e0a3bea6b1, rgba(255, 255, 255, 0)); object-position:50% 50%"></video>';

if (html.includes(targetVideo)) {
  html = html.replace(targetVideo, replacementVideo);
  fs.writeFileSync('index.html', html);
  console.log('Video fixed');
} else {
  console.log('Video not found');
}
