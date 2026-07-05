const fs = require('fs');
let code = fs.readFileSync('src/js/main.js', 'utf-8');

// Replace text replacement block
const oldTextReplace = `        if (text.includes('YEARS IN AI EXCELLENCE')) {
            text = text.replace(/YEARS IN AI EXCELLENCE/g, 'BUILT FOR THE FUTURE OF WORK');
            changed = true;
        } else {
            if (text.includes('YEARS IN')) {
                text = text.replace(/YEARS IN/g, 'BUILT FOR');
                changed = true;
            }
            if (text.includes('AI EXCELLENCE')) {
                text = text.replace(/AI EXCELLENCE/g, 'THE FUTURE OF WORK');
                changed = true;
            }
        }
        
        if (text === 'AI models for smarter decisions') {
            text = '10+ AI models for smarter decisions';
            changed = true;
        } else if (text.includes('AI models for smarter decisions') && !text.includes('10+')) {
             text = text.replace(/AI models for smarter decisions/g, '10+ AI models for smarter decisions');
             changed = true;
        }

        if (text === 'Client satisfaction rate') {
            text = '99% Client satisfaction rate';
            changed = true;
        } else if (text.includes('Client satisfaction rate') && !text.includes('99%')) {
             text = text.replace(/Client satisfaction rate/g, '99% Client satisfaction rate');
             changed = true;
        }`;

const newTextReplace = `        if (/YEARS IN AI EXCELLENCE/i.test(text)) {
            text = text.replace(/YEARS IN AI EXCELLENCE/gi, 'BUILT FOR THE FUTURE OF WORK');
            changed = true;
        } else {
            if (/Years in/i.test(text)) {
                text = text.replace(/Years in/gi, 'Built for');
                changed = true;
            }
            if (/AI Excellence/i.test(text)) {
                text = text.replace(/AI Excellence/gi, 'the Future of Work');
                changed = true;
            }
        }
        
        if (/10\\+ AI models for smarter decisions/i.test(text)) {
             text = text.replace(/10\\+ AI models for smarter decisions/gi, '50+ AI models for smarter decisions');
             changed = true;
        } else if (/AI models for smarter decisions/i.test(text) && !/50\\+/.test(text)) {
             text = text.replace(/AI models for smarter decisions/gi, '50+ AI models for smarter decisions');
             changed = true;
        }

        if (/Client satisfaction rate/i.test(text) && !/99%/.test(text)) {
             text = text.replace(/Client satisfaction rate/gi, '99% Client satisfaction rate');
             changed = true;
        }`;

code = code.replace(oldTextReplace, newTextReplace);

// Replace animation block
const oldAnimBlock = `/* ─────────────────────────────────────────────────────────
   STATS ZOOM ANIMATION
   ───────────────────────────────────────────────────────── */
function initStatsZoom() {
    if (!window.gsap || !window.ScrollTrigger) return;
    
    // Check if we already initialized
    if (document.querySelector('.stats-zoom-initialized')) return;
    
    const statsImg = document.querySelector('img[src*="SVpiB8hg7Q5z"]');
    if (!statsImg) return;
    
    const wrapper = statsImg.closest('.ssr-variant') || statsImg.parentElement;
    if (!wrapper) return;
    
    statsImg.classList.add('stats-zoom-initialized');
    
    // Ensure overflow is hidden on parent so scale out doesn't break layout
    if (wrapper) wrapper.style.overflow = 'hidden';
    
    gsap.set(statsImg, { scale: 1.25, transformOrigin: 'center center' });
    gsap.to(statsImg, {
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}`;

const newAnimBlock = `/* ─────────────────────────────────────────────────────────
   STATS PARALLAX ANIMATION
   ───────────────────────────────────────────────────────── */
function initStatsZoom() {
    if (!window.gsap || !window.ScrollTrigger) return;
    
    // Check if we already initialized
    if (document.querySelector('.stats-zoom-initialized')) return;
    
    const statsImg = document.querySelector('img[src*="SVpiB8hg7Q5z"]');
    if (!statsImg) return;
    
    const wrapper = statsImg.closest('.ssr-variant') || statsImg.parentElement;
    if (!wrapper) return;
    
    statsImg.classList.add('stats-zoom-initialized');
    
    if (wrapper) wrapper.style.overflow = 'hidden';
    
    statsImg.style.height = '120%';
    statsImg.style.maxHeight = '120%';
    statsImg.style.objectFit = 'cover';
    
    gsap.set(statsImg, { yPercent: -15 });
    
    gsap.to(statsImg, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}`;

code = code.replace(oldAnimBlock, newAnimBlock);

fs.writeFileSync('src/js/main.js', code);
