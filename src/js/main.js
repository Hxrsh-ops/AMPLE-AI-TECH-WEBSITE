import './forms.js';

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

function getRelativePathPrefix() {
    const p = window.location.pathname;
    if (p.includes('/blog/') || p.includes('/case-studies/') || p.includes('/legal-pages/')) {
        return '../';
    }
    return './';
}

/**
 * AmpleAI — v12 DEFINITIVE
 *
 * Scopes scroll-pinned interactive animations strictly to desktop viewport (min-width: 1200px)
 * and animates accordion flex properties directly for perfect reliability.
 */
import '../styles/index.css';

let currentTestimonialIndex = 0;

/* ─────────────────────────────────────────────────────────
   GLOBAL IMAGE ERROR CORRUPTION INTERCEPTOR (SELF-HEALING)
   ───────────────────────────────────────────────────────── */
const FALLBACK_IMAGES = {
    'case-study-dental.png': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    'case-study-realestate.png': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    'case-study-ecommerce.png': 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800',
    'nevis-avatar.png': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'who-we-are.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    'who-we-are.png': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    'team-ava.png': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    'team-ethan.png': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'team-noah.png': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    'team-sarah.png': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    'team-liam.png': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    'robotic-arm.png.jpeg': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800'
};

function handleFailedImg(img) {
    const src = img.src || '';
    if (src.includes('/assets/')) {
        const filename = src.split('/').pop().split('?')[0];
        if (FALLBACK_IMAGES[filename]) {
            console.log('[AmpleAI] Image corrupt/failed, loading uncorrupted fallback:', filename);
            img.src = FALLBACK_IMAGES[filename];
            img.srcset = '';
            img.removeAttribute('srcset');
        } else if (filename === 'lumothrive.jpg' || filename === 'lumothrive.png' || filename === 'lumothrive.svg') {
            // Replaces the broken image with a crisp SVG logo icon
            const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgEl.setAttribute("width", "40");
            svgEl.setAttribute("height", "40");
            svgEl.setAttribute("viewBox", "0 0 100 100");
            svgEl.setAttribute("fill", "none");
            svgEl.style.display = "block";
            svgEl.style.flexShrink = "0";
            
            const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            defs.innerHTML = `
                <linearGradient id="silver-grad-lumo-fb" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFFFFF" />
                    <stop offset="30%" stop-color="#E2E8F0" />
                    <stop offset="70%" stop-color="#94A3B8" />
                    <stop offset="100%" stop-color="#475569" />
                </linearGradient>
            `;
            svgEl.appendChild(defs);
            
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M 32 18 L 48 18 L 48 52 C 48 64 56 68 76 68 C 78 68 80 67 82 66 L 82 78 Q 70 82 58 82 C 38 82 32 72 32 52 Z");
            path.setAttribute("fill", "url(#silver-grad-lumo-fb)");
            svgEl.appendChild(path);
            
            img.replaceWith(svgEl);
        }
    }
}

// 1. Capture errors on load phase (crucial as it captures the event during error phase)
window.addEventListener('error', function (e) {
    const target = e.target;
    if (target && target.tagName === 'IMG') {
        handleFailedImg(target);
    }
}, true);

// 2. Scan and patch existing elements on DOMReady and general interval
function scanAndPatchAllImages() {
    document.querySelectorAll('img').forEach(img => {
        // If image has failed to load (naturalWidth/Height is 0) or has error state
        if (img.src && img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
            handleFailedImg(img);
        }
    });
}

document.addEventListener('DOMContentLoaded', scanAndPatchAllImages);
window.addEventListener('load', scanAndPatchAllImages);
// Periodic checking to handle deferred/hydrated images
const imgScanInterval = setInterval(scanAndPatchAllImages, 1000);
setTimeout(() => {
    clearInterval(imgScanInterval);
}, 6000);

const IMAGE_MAP = {
    'OR4te0XAqQp3f22sxMboTobp5w': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'RiB4JVDNfxz4HhK8vki0WzV5c8M': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'tYeMIbQoz3vIw3JkGIgJO3aAOk': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    'EEYaHcqogk3IyHDryrKLPdSzk': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    'vIculIPqr7lCDLJUfsY7ks1Zw': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    'dCtkpnoE7qEITkDuDvst22PaAOU': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    'Sg9QXajgT380oA1yHySylazfGs': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    'nTPaXeQZ8UlpaJbZOVt7Cvmkjq0': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    'jWmFga0Em87djh62ANoLFTFZ7G4': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    'ErWYoaPZx0lwx3MzZ9fBi2yGRY': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    'p9GIEWvTcTTUhNjOIqhzovHNs': 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
};

const SECTION_MAP = {
    'Hero': 'hero', 'About': 'about', 'Services': 'services',
    'Cases': 'case-studies', 'Step': 'process', 'Clients': 'clients',
    'Why Choose': 'why-choose', 'Journey': 'journey', 'Team': 'team',
    'Pricing': 'pricing', 'Stat': 'stats', 'Client Voices': 'testimonials',
    'Blog': 'blog',
};

/* ─────────────────────────────────────────────────────────
   DOM PATH & HYDRATION EXCLUSION SETUP
   ───────────────────────────────────────────────────────── */
const excludedPaths = new Set();
const excludedElements = new WeakSet();

function getDomPath(el) {
    const stack = [];
    let current = el;
    while (current && current.nodeType === Node.ELEMENT_NODE) {
        let sibCount = 0;
        let sibIndex = 0;
        if (current.parentNode) {
            for (let i = 0; i < current.parentNode.childNodes.length; i++) {
                let sib = current.parentNode.childNodes[i];
                if (sib.nodeName === current.nodeName) {
                    if (sib === current) {
                        sibIndex = sibCount;
                    }
                    sibCount++;
                }
            }
        }
        const tagName = current.nodeName.toLowerCase();
        const classes = Array.from(current.classList)
            .filter(c => c !== 'amp-card-hover' && c !== 'amp-hover-active')
            .join('.');
        const classStr = classes ? `.${classes}` : '';
        const indexStr = sibCount > 1 ? `:nth-of-type(${sibIndex + 1})` : '';
        stack.unshift(`${tagName}${classStr}${indexStr}`);
        current = current.parentNode;
    }
    return stack.join(' > ');
}

function setupExclusions() {
    const cards = document.querySelectorAll('[data-border="true"]');
    cards.forEach(card => {
        if (card.tagName === 'INPUT' || card.tagName === 'TEXTAREA') {
            excludedElements.add(card);
            excludedPaths.add(getDomPath(card));
            return;
        }
        
        const name = (card.getAttribute('data-framer-name') || '').toLowerCase();
        const nameExcluded = ['nav', 'menu', 'header', 'footer', 'white', 'dark', 'wrap', 'center', 'default', 'divider', 'button', 'toggle', 'indicator', 'badge'].some(k => name.includes(k));
        
        const sec = card.closest('section');
        const secName = sec ? (sec.getAttribute('data-framer-name') || '').toLowerCase() : '';
        const secExcluded = ['services', 'hero', 'clients', 'step', 'why choose', 'team', 'stat', 'client voices'].some(k => secName.includes(k));
        
        if (nameExcluded || secExcluded) {
            excludedElements.add(card);
            excludedPaths.add(getDomPath(card));
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupExclusions);
} else {
    setupExclusions();
}

const MENU_LINKS = [
    { label: 'HOME',         slug: 'hero' },
    { label: 'ABOUT US',     slug: 'about' },
    { label: 'BLOG',         slug: 'blog' },
    { label: 'CASE STUDIES', slug: 'case-studies' },
    { label: 'CONTACT US',   slug: 'contact' },
];


function init() {
    initPageLoader();
    initHeroCanvas();
    initSkeletonLoading();
    assignSectionIds();
    unlockHiddenElements();
    buildAndInjectMenu();
    wireHamburger();
    initBentoSpotlight();
    initAmbientGlowBlobs();

    // Inject accordion HTML at all screen sizes (mobile gets stacked layout via CSS)
    // MUST BE RUN BEFORE GSAP to allow ScrollTrigger querying to succeed
    initServicesAccordion();

    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({
            limitCallbacks: true,
            ignoreMobileResize: true
        });
        initLenisScroll();

        // Delay scroll and interactive animations slightly until React hydration has finished
        const runAnimInit = () => {
            setTimeout(() => {
                initHeroParallax();
                initProcessReveal();
                initClientsBgZoom();

                // Scope scroll-pinned interactive animations strictly to desktop viewports (min-width: 1200px)
                const mm = gsap.matchMedia();
                mm.add("(min-width: 1200px)", () => {
                    initAboutScattering();
                });
                
                initTextHighlight();

                // Refresh ScrollTrigger to ensure all layout offsets are accurate
                ScrollTrigger.refresh();
                console.log('[AmpleAI] ✓ Delayed GSAP animations initialized');
            }, 800);
        };

        if (document.readyState === 'complete') {
            runAnimInit();
        } else {
            window.addEventListener('load', runAnimInit);
        }
    }


    // Patch testimonials section to show single Lumothrive client
    patchTestimonialsSection();
    initVoicesTicker();
    patchPricingSection();
    patchRelatedProjectsLinks();
    patchMoreProjectsTableRows();

    // Initialize MutationObserver to intercept branding, images, and counters
    // Delayed until after window load + 500ms to prevent React hydration mismatch crashes
    if (document.readyState === 'complete') {
        setTimeout(() => { initRuntimeInterceptors(); }, 500);
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => { initRuntimeInterceptors(); }, 500);
        });
    }

    // Double RAF: let hidden CSS state render for 1 frame before observing
    // This ensures CSS transitions actually play (not instant snap)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            initScrollAnimations();
        });
    });

    document.body.classList.add('js-loaded');
    console.log('%c✦ AmpletechAI v12', 'color:#a8ff78;font-weight:bold;font-size:14px');
    registerServiceWorker();
}

// Bypasses HMR DOMContentLoaded racing condition in Vite
if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}


/* ─────────────────────────────────────────────────────────
   SECTION IDs
   ───────────────────────────────────────────────────────── */
function assignSectionIds() {
    document.querySelectorAll('[data-framer-name]').forEach(el => {
        const slug = SECTION_MAP[el.getAttribute('data-framer-name')];
        if (slug && !el.id) el.id = slug;
    });
}


/* ─────────────────────────────────────────────────────────
   UNLOCK FRAMER HIDDEN ELEMENTS
   ───────────────────────────────────────────────────────── */
function unlockHiddenElements() {
    document.querySelectorAll('[data-framer-appear-id]').forEach(el => {
        el.removeAttribute('data-framer-appear-id');
        if (el.style.opacity === '0') el.style.opacity = '';
        el.style.visibility = '';
    });
}


/* ─────────────────────────────────────────────────────────
   LENIS
   ───────────────────────────────────────────────────────── */
function initLenisScroll() {
    if (typeof Lenis === 'undefined') return;
    if (window.__lenis) return;

    const startLenis = () => {
        if (window.__lenis) return;
        const lenis = new Lenis({ 
            duration: 1.2, 
            smoothWheel: true, 
            autoRaf: false 
        });
        window.__lenis = lenis;
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(t => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
        console.log('[AmpleAI] Smooth scrolling (Lenis) initialized successfully');
        
        if (window.ScrollTrigger) {
            window.ScrollTrigger.refresh();
        }
    };

    if (document.readyState === 'complete') {
        setTimeout(startLenis, 500);
    } else {
        window.addEventListener('load', () => {
            setTimeout(startLenis, 500);
        });
    }
}

/* ─────────────────────────────────────────────────────────
   PAGE LOADER — Holds viewport at top until DOM settles
   ───────────────────────────────────────────────────────── */
function initPageLoader() {
    const loader = document.getElementById('ampleai-loader');
    if (!loader) return;

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const progressBar = loader.querySelector('.loader-progress-bar');
    let progress = 0;
    
    // Simulate progress animation
    const progressInterval = setInterval(() => {
        progress += Math.random() * 8;
        if (progress >= 90) {
            progress = 90;
            clearInterval(progressInterval);
        }
        if (progressBar) progressBar.style.width = `${progress}%`;
    }, 100);

    const handleLoadComplete = () => {
        clearInterval(progressInterval);
        if (progressBar) progressBar.style.width = '100%';
        
        setTimeout(() => {
            loader.classList.add('loaded');
            // Restore body scrolling
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            
            // Refresh ScrollTrigger once DOM layout has fully settled
            setTimeout(() => {
                if (window.ScrollTrigger) {
                    window.ScrollTrigger.refresh();
                }
            }, 500);
        }, 300);
    };

    // Fallback: load complete after 2.2 seconds
    const fallbackTimeout = setTimeout(handleLoadComplete, 2200);

    window.addEventListener('load', () => {
        clearTimeout(fallbackTimeout);
        // Ensure minimum loader display time of 1.5 seconds
        setTimeout(handleLoadComplete, 1500);
    });
}



/* ─────────────────────────────────────────────────────────
   HERO VIDEO BACKGROUND — Altrion's actual looping video
   ───────────────────────────────────────────────────────── */
function initHeroCanvas() {
    const hero = document.querySelector('section.framer-17rykba[data-framer-name="Hero"]');
    if (!hero) return;

    // Remove legacy custom video if exists to avoid double layering/artifacts
    const oldCustomVid = document.getElementById('ampletechai-hero-video');
    if (oldCustomVid) {
        oldCustomVid.remove();
        console.log('[AmpleAI] Removed legacy custom video element');
    }

    // Find the original video element inside BG Item and update its source inline
    const framerBg = hero.querySelector('[data-framer-name="BG Item"]');
    if (framerBg) {
        // Ensure BG Item is fully visible to keep its layout, overlays, and patterns intact
        framerBg.style.display = "";
        framerBg.style.opacity = "1";
        framerBg.style.visibility = "visible";

        const originalVid = framerBg.querySelector('video') || document.getElementById('ampletechai-hero-video-element');
        if (originalVid && !originalVid.__intercepted) {
            originalVid.__intercepted = true;
            console.log('[AmpleAI] Initializing bulletproof interception on Hero video element');

            // Force initial required properties
            originalVid.src = '/hero-bg.mp4';
            originalVid.preload = 'auto';
            originalVid.autoplay = true;
            originalVid.muted = true;
            originalVid.loop = true;
            originalVid.playsInline = true;
            originalVid.removeAttribute('poster');

            // Override setAttribute to reject any external attempts to reset src/poster
            const originalSetAttribute = originalVid.setAttribute;
            originalVid.setAttribute = function(name, value) {
                if (name === 'src' && value !== '/hero-bg.mp4') {
                    console.log('[AmpleAI] Blocked attempt to change video attribute src to:', value);
                    return originalSetAttribute.call(this, name, '/hero-bg.mp4');
                }
                if (name === 'poster') {
                    // Do not allow setting any poster image which might block the playing video
                    return;
                }
                return originalSetAttribute.call(this, name, value);
            };

            // Override src property with getter/setter to prevent React property overrides
            let currentSrc = '/hero-bg.mp4';
            Object.defineProperty(originalVid, 'src', {
                get() {
                    return currentSrc;
                },
                set(val) {
                    if (val !== '/hero-bg.mp4') {
                        console.log('[AmpleAI] Blocked property assignment src to:', val);
                        val = '/hero-bg.mp4';
                    }
                    currentSrc = val;
                    const nativeSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'src');
                    if (nativeSrcDescriptor && nativeSrcDescriptor.set) {
                        nativeSrcDescriptor.set.call(this, val);
                    }
                },
                configurable: true
            });

            // Override poster property to always return empty string
            Object.defineProperty(originalVid, 'poster', {
                get() {
                    return '';
                },
                set(val) {
                    // No-op
                },
                configurable: true
            });

            // Call load and play
            originalVid.load();
            originalVid.play().catch((err) => {
                console.log('[AmpleAI] Autoplay play() was deferred/blocked, setting up fallback triggers:', err.message);
                
                const playOnInteraction = () => {
                    if (originalVid.paused) {
                        originalVid.play().then(() => {
                            console.log('[AmpleAI] Video play() succeeded via user interaction!');
                            cleanup();
                        }).catch(() => {});
                    } else {
                        cleanup();
                    }
                };
                
                const cleanup = () => {
                    window.removeEventListener('click', playOnInteraction);
                    window.removeEventListener('touchstart', playOnInteraction);
                    window.removeEventListener('scroll', playOnInteraction);
                };
                
                window.addEventListener('click', playOnInteraction);
                window.addEventListener('touchstart', playOnInteraction);
                window.addEventListener('scroll', playOnInteraction);
            });
        } else if (originalVid) {
            // If already intercepted, just make sure it stays playing if it got paused
            if (originalVid.paused) {
                originalVid.play().catch(() => {});
            }
        }
    }
}


/* ─────────────────────────────────────────────────────────
   HERO PARALLAX
   ───────────────────────────────────────────────────────── */
function initHeroParallax() {
    const bgEl = document.querySelector(
        '[data-framer-name="BG Image"],[data-framer-name="BG"],[data-framer-name="Robot"]'
    );
    if (!bgEl) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth  - .5) * 14;
        my = (e.clientY / window.innerHeight - .5) * 14;
    });
    (function tick() {
        cx += (mx - cx) * .055; cy += (my - cy) * .055;
        gsap.set(bgEl, { x: cx, y: cy, force3D: true });
        requestAnimationFrame(tick);
    })();
}


/* ─────────────────────────────────────────────────────────
   BENTO SPOTLIGHT
   ───────────────────────────────────────────────────────── */
function applyCardHoverClasses() {
    const cards = document.querySelectorAll('[data-border="true"]');
    cards.forEach(card => {
        if (card.tagName === 'INPUT' || card.tagName === 'TEXTAREA') return;
        
        // Exclude nested sub-cards/sub-borders inside link tags to prevent inner blocks from popping out independently
        if (card.parentElement && card.parentElement.closest('a')) return;
        
        // Exclude specific text/list tag names
        const excludeTags = ['LI', 'P', 'SPAN', 'IMG', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'INPUT', 'TEXTAREA', 'BUTTON', 'A'];
        if (excludeTags.includes(card.tagName)) return;
        
        // Exclude elements inside FAQ accordion/questions/answers
        const isFaq = card.closest('[class*="faq" i], [class*="accordion" i], [class*="question" i], [class*="answer" i]');
        if (isFaq) return;
        
        // Exclude list items or elements inside list items (e.g. features list)
        if (card.closest('li')) return;
        
        // Exclude elements inside forms or headers/navs/footers
        if (card.closest('form') || card.closest('header, footer, nav') || card.closest('[class*="nav" i], [class*="menu" i], [class*="header" i], [class*="footer" i]')) return;
        
        const path = getDomPath(card);
        if (excludedElements.has(card) || excludedPaths.has(path)) {
            if (card.classList.contains('amp-card-hover')) {
                card.classList.remove('amp-card-hover');
            }
            return;
        }

        const name = (card.getAttribute('data-framer-name') || '').toLowerCase();
        const nameExcluded = ['nav', 'menu', 'header', 'footer', 'white', 'dark', 'wrap', 'center', 'default', 'divider', 'button', 'toggle', 'indicator', 'badge'].some(k => name.includes(k));
        
        const sec = card.closest('section');
        const secName = sec ? (sec.getAttribute('data-framer-name') || '').toLowerCase() : '';
        const secExcluded = ['services', 'hero', 'clients', 'step', 'why choose', 'team', 'stat', 'client voices', 'faq', 'question', 'pricing', 'contact', 'legal', 'footer', 'nav'].some(k => secName.includes(k));
        
        if (nameExcluded || secExcluded) {
            excludedElements.add(card);
            excludedPaths.add(path);
            if (card.classList.contains('amp-card-hover')) {
                card.classList.remove('amp-card-hover');
            }
            return;
        }

        if (!card.classList.contains('amp-card-hover')) {
            card.classList.add('amp-card-hover');
        }
        
        // Mark card as clickable if it is a link or contains a link/button
        const isClickable = card.tagName === 'A' || 
                            card.closest('a') !== null || 
                            card.querySelector('a, button, [role="button"]') !== null;
                            
        if (isClickable) {
            card.classList.add('amp-clickable');
        } else {
            card.classList.remove('amp-clickable');
        }
    });
}

function initBentoSpotlight() {
    applyCardHoverClasses();
    
    let activeCard = null;
    document.addEventListener('mousemove', e => {
        const card = e.target.closest('.amp-card-hover');
        if (card) {
            if (activeCard && activeCard !== card) {
                activeCard.style.setProperty('--mouse-x', '-9999px');
                activeCard.style.setProperty('--mouse-y', '-9999px');
            }
            activeCard = card;
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
        } else if (activeCard) {
            activeCard.style.setProperty('--mouse-x', '-9999px');
            activeCard.style.setProperty('--mouse-y', '-9999px');
            activeCard = null;
        }
    });
}


/* ─────────────────────────────────────────────────────────
   AMBIENT GLOW BLOBS
   ───────────────────────────────────────────────────────── */
function initAmbientGlowBlobs() {
    if (document.querySelector('.ambient-glow-blob')) return;
    const b1 = document.createElement('div');
    b1.className = 'ambient-glow-blob blob-1';
    const b2 = document.createElement('div');
    b2.className = 'ambient-glow-blob blob-2';
    document.body.appendChild(b1);
    document.body.appendChild(b2);
}


/* ─────────────────────────────────────────────────────────
   SCROLL ANIMATIONS — IntersectionObserver + CSS transitions
   Double-RAF ensures hidden state renders before observe starts
   ───────────────────────────────────────────────────────── */
function initScrollAnimations() {
    const hero = document.querySelector('[data-framer-name="Hero"]');

    // ── Step tiles: each section[data-framer-name="Step"] (Excluded from overall section fade to allow step-by-step card reveals) ──
    const steps = [...document.querySelectorAll('section[data-framer-name="Step"]')];
    console.log(`[AmpleAI] Step tiles found: ${steps.length}`);
    // addFade(steps); // Excluded to prevent the whole section from popping up together


    // ── Cards / bordered elements (not in hero) ──
    const cards = [...document.querySelectorAll('[data-border="true"]')]
        .filter(c => !hero?.contains(c) && 
                    !c.closest('#process') && // Filter out process cards to use GSAP ScrollTrigger instead
                    !c.classList.contains('ample-service-col') && 
                    !c.classList.contains('ample-services-desktop') && 
                    !c.classList.contains('ample-card-scatter') && 
                    !c.classList.contains('ample-card-center') && 
                    !c.classList.contains('ample-about-right'));
    cards.forEach((c, i) => { c.style.transitionDelay = `${(i % 4) * 0.09}s`; });
    addFade(cards);

    // ── Section headings ──
    const headings = [...document.querySelectorAll(
        'section[data-framer-name]:not([data-framer-name="Hero"]) h2,' +
        'section[data-framer-name]:not([data-framer-name="Hero"]) h3'
    )];
    addFade(headings);

    // ── Text blocks (first 6 per section) ──
    const seen = new Set();
    const texts = [];
    document.querySelectorAll(
        'section[data-framer-name]:not([data-framer-name="Hero"]) [data-framer-component-type="RichTextContainer"]'
    ).forEach(t => {
        const sec = t.closest('section[data-framer-name]');
        const key = sec?.getAttribute('data-framer-name');
        if (!key) return;
        if (!seen.has(key)) seen.set ? seen.set(key, 0) : (seen[key] = 0); // fallback
        const count = seen[key] || 0;
        if (count < 6) { texts.push(t); seen[key] = count + 1; }
    });
    addFade(texts);
}

function addFade(elements) {
    if (!elements.length) return;
    elements.forEach(el => el.classList.add('amp-fade'));

    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('amp-visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    elements.forEach(el => io.observe(el));
}


/* ─────────────────────────────────────────────────────────
   MENU
   ───────────────────────────────────────────────────────── */
function buildAndInjectMenu() {
    if (document.getElementById('ampleai-menu-drawer')) return;
    const d = document.createElement('div');
    d.id = 'ampleai-menu-drawer';
    d.setAttribute('aria-hidden', 'true');
    d.setAttribute('role', 'dialog');
    d.innerHTML = `
        <div id="ampleai-menu-topbar">
            <button id="ampleai-menu-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg><span>CLOSE</span></button>
            <div id="ampleai-menu-logo-center">AmpletechAI</div>
            <!-- TODO: Replace with actual Cal.com booking URL once account is created -->
            <a href="https://cal.com/" target="_blank" rel="noopener noreferrer" id="ampleai-menu-book-btn">BOOK A CALL <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 10L10 1M10 1H4M10 1v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></a>
        </div>
        <div id="ampleai-menu-body">
            <div id="ampleai-menu-left"><nav id="ampleai-menu-links">
                ${MENU_LINKS.map(l => {
                    const href = l.href || `#${l.slug||''}`;
                    return `<a href="${href}" class="ampleai-menu-link" ${l.href?'target="_blank" rel="noopener" data-external="true"':`data-slug="${l.slug||''}"`}><span>${l.label}</span><span class="ampleai-menu-link-arrow">↗</span></a>`;
                }).join('')}
            </nav></div>
            <div id="ampleai-menu-middle" class="ampleai-menu-middle-gap">
                <div class="menu-quick-stats">
                    <h4>QUICK STATS</h4>
                    <a href="${getRelativePathPrefix()}case-studies.html" class="menu-stat-pill">
                        <span class="stat-num">5+</span>
                        <span class="stat-lbl">Projects delivered</span>
                    </a>
                    <a href="${getRelativePathPrefix()}index.html#testimonials" class="menu-stat-pill">
                        <span class="stat-num">98%</span>
                        <span class="stat-lbl">Client satisfaction</span>
                    </a>
                    <a href="${getRelativePathPrefix()}index.html#expertise" class="menu-stat-pill">
                        <span class="stat-num">100%</span>
                        <span class="stat-lbl">System uptime</span>
                    </a>
                </div>
                <div class="menu-socials">
                    <h4>FOLLOW US</h4>
                    <div class="menu-social-links-row">
                        <a href="https://www.instagram.com/ample.ai/" target="_blank" rel="noopener noreferrer" class="menu-social-link">Instagram</a>
                        <a href="https://x.com/" target="_blank" rel="noopener noreferrer" class="menu-social-link">Twitter/X</a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" class="menu-social-link">LinkedIn</a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" class="menu-social-link">YouTube</a>
                    </div>
                </div>
            </div>
            <div id="ampleai-menu-right">
                <div class="menu-logo-showcase">
                    <div class="menu-logo-showcase-glow"></div>
                    <img src="${getRelativePathPrefix()}assets/Ample.ai.svg" alt="AmpletechAI Logo" class="menu-showcase-logo">
                </div>
                
                <a href="${getRelativePathPrefix()}about-us.html" class="menu-about-btn">
                    <span>VIEW ABOUT US</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </a>
                
                <div class="menu-right-footer">
                    <div class="menu-right-contact">
                        <div class="menu-contact-item">
                            <span class="label">TALK TO US</span>
                            <a href="tel:+917338989888" class="val">+91 7338989888</a>
                        </div>
                        <div class="menu-contact-item">
                            <span class="label">EMAIL US</span>
                            <a href="mailto:hello@ampletechai.com" class="val">hello@ampletechai.com</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>`;
    document.body.appendChild(d);
    document.getElementById('ampleai-menu-close').addEventListener('click', closeMenu);
    d.querySelectorAll('.ampleai-menu-link').forEach(a => {
        a.addEventListener('click', e => {
            if (a.dataset.external === 'true') { closeMenu(); return; }
            e.preventDefault();
            const slug = a.dataset.slug;
            closeMenu();
            setTimeout(() => {
                const t = slug ? document.getElementById(slug) : null;
                if (t) {
                    if (window.__lenis) window.__lenis.scrollTo(t, { offset: -80 });
                    else t.scrollIntoView({ behavior: 'smooth' });
                } else if (slug) {
                    if (slug === 'about') {
                        window.location.href = getRelativePathPrefix() + 'about-us.html';
                    } else if (slug === 'case-studies') {
                        window.location.href = getRelativePathPrefix() + 'case-studies.html';
                    } else if (slug === 'contact') {
                        window.location.href = getRelativePathPrefix() + 'contact.html';
                    } else if (slug === 'blog') {
                        window.location.href = getRelativePathPrefix() + 'blog.html';
                    } else {
                        window.location.href = getRelativePathPrefix() + `index.html#${slug}`;
                    }
                }
            }, 350);
        });
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

function wireHamburger() {
    document.querySelectorAll('.framer-kl0AZ').forEach(h => {
        h.style.cursor = 'pointer';
        h.setAttribute('role', 'button');
        h.setAttribute('tabindex', '0');
        h.addEventListener('click', openMenu);
        h.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openMenu(); });
    });
}

function openMenu() {
    const d = document.getElementById('ampleai-menu-drawer');
    if (!d) return;
    
    // Compensate scrollbar width to prevent layout jump
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
        const header = document.querySelector('header');
        if (header) header.style.paddingRight = `${scrollBarWidth}px`;
    }

    document.body.classList.add('ampleai-menu-open');
    document.body.style.overflow = 'hidden';
    document.body.style.overflowY = 'hidden';
    if (window.__lenis) window.__lenis.stop();
    
    d.setAttribute('aria-hidden', 'false');
    d.style.display = 'block';
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(d, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.fromTo('#ampleai-menu-topbar', { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.35, delay: 0.05 });
        gsap.fromTo('.ampleai-menu-link', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, delay: 0.1 });
        gsap.fromTo('#ampleai-menu-right', { opacity: 0 }, { opacity: 1, duration: 0.45, delay: 0.2 });
    }
    document.getElementById('ampleai-menu-close')?.focus();
}

function closeMenu() {
    const d = document.getElementById('ampleai-menu-drawer');
    if (!d) return;
    
    document.body.classList.remove('ampleai-menu-open');
    document.body.style.overflow = '';
    document.body.style.overflowY = '';
    document.body.style.paddingRight = '';
    const header = document.querySelector('header');
    if (header) header.style.paddingRight = '';
    
    if (window.__lenis) window.__lenis.start();
    
    d.setAttribute('aria-hidden', 'true');
    if (typeof gsap !== 'undefined') {
        gsap.to(d, { opacity: 0, duration: 0.25, onComplete: () => { d.style.display = 'none'; } });
    } else { d.style.display = 'none'; }
}



/* ─────────────────────────────────────────────────────────
   PROCESS REVEAL — Cards fade and slide up one-by-one on scroll
   ───────────────────────────────────────────────────────── */
function initProcessReveal() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const mm = gsap.matchMedia();

    // Helper to find the active element (desktop vs mobile)
    const getActiveEl = (selector) => {
        const elements = document.querySelectorAll(selector);
        for (let el of elements) {
            const parent = el.closest('.ssr-variant');
            if (parent && window.getComputedStyle(parent).display !== 'none') {
                return el;
            }
        }
        return elements[0];
    };

    // Desktop: Pin and stack cards sequentially
    mm.add("(min-width: 1200px)", () => {
        const stepsContainer = document.querySelector('.framer-ly6508');
        if (!stepsContainer) return;

        const card1 = getActiveEl('.framer-9hd1tq-container');
        const card2 = getActiveEl('.framer-sb1e2m-container');
        const card3 = getActiveEl('.framer-1qzupzc-container');
        const card4 = getActiveEl('.framer-sc5l4v-container');

        if (!card1 || !card2 || !card3 || !card4) return;

        // Reset any inline styles first to prevent conflicts
        gsap.killTweensOf([card1, card2, card3, card4]);

        // Card 1 starts visible (Step 1). Cards 2, 3, 4 start hidden and scaled down.
        gsap.set(card1, { opacity: 1, scale: 1, y: 0 });
        gsap.set([card2, card3, card4], { opacity: 0, scale: 0.9, y: 80 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: stepsContainer,
                start: "top 270px",          // Align with CSS top: 270px sticky offset
                end: "bottom 620px",         // Duration maps to the native scroll height of the container
                scrub: 1,                    // Smooth scrub tied to scroll velocity
                invalidateOnRefresh: true
            }
        });

        // 1. Reveal Step 2 (Card 2) on the right
        tl.to(card2, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" });

        // 2. Dim Step 1 (Card 1) and overlap Step 3 (Card 3) on the left
        tl.to(card1, { opacity: 0.25, scale: 0.96, duration: 0.5, ease: "power2.out" }, "+=0.3")
          .to(card3, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }, "<");

        // 3. Dim Step 2 (Card 2) and overlap Step 4 (Card 4) on the right
        tl.to(card2, { opacity: 0.25, scale: 0.96, duration: 0.5, ease: "power2.out" }, "+=0.3")
          .to(card4, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }, "<");
          
        // Add a small pause at the end for user convenience
        tl.to({}, { duration: 0.3 });
    });

    // Mobile/Tablet: Single-column natural vertical layout is fully handled statically via CSS overrides

    console.log('[AmpleAI] ✓ Process step reveals initialized');
}


/* ─────────────────────────────────────────────────────────
   ABOUT CARD DISPERSAL (Cinematic Scroll Pinning & Scattering)
   ───────────────────────────────────────────────────────── */
function initAboutScattering() {
    const sec = document.querySelector('[data-framer-name="About"]');
    const container = document.querySelector('.ample-about-container');
    const leftCol = document.querySelector('.ample-about-left');
    const centerCard = document.querySelector('.ample-card-center');
    const rightList = document.querySelector('.ample-about-right');
    const scatterCards = document.querySelectorAll('.ample-card-scatter');

    if (!sec || !container || !centerCard || !rightList || scatterCards.length === 0) return;

    // Create a ScrollTrigger timeline to pin the About section
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "+=220%",
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
        }
    });

    // Phase 1: Fade out the right bullet advantages list
    tl.to(rightList, {
        opacity: 0,
        x: 60,
        pointerEvents: 'none',
        duration: 0.8,
        ease: "power2.inOut"
    }, "start");

    // Phase 2: Disperse / scatter the cards from behind Amanda Reed's card!
    // Card 1: Mannequin Visual Card (right visual) -> rotates + moves to right
    tl.fromTo('.ample-card-scatter-1', {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 0.8,
        rotation: 0
    }, {
        opacity: 1,
        x: 350,
        y: 20,
        scale: 1,
        rotation: 8,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
            const el = document.querySelector('.ample-card-scatter-1');
            if (el) el.classList.add('amp-active');
        },
        onReverseComplete: () => {
            const el = document.querySelector('.ample-card-scatter-1');
            if (el) el.classList.remove('amp-active');
        }
    }, "scatter");

    // Card 2: Partner logos / consulting card (left milestone) -> rotates + moves to left
    tl.fromTo('.ample-card-scatter-2', {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 0.8,
        rotation: 0
    }, {
        opacity: 1,
        x: -330,
        y: 60,
        scale: 1,
        rotation: -8,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
            const el = document.querySelector('.ample-card-scatter-2');
            if (el) el.classList.add('amp-active');
        },
        onReverseComplete: () => {
            const el = document.querySelector('.ample-card-scatter-2');
            if (el) el.classList.remove('amp-active');
        }
    }, "scatter");

    // Card 3: Glossy render card (outer top) -> moves to outer top or stays hidden / small offset
    tl.fromTo('.ample-card-scatter-3', {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 0.8,
        rotation: 0
    }, {
        opacity: 1,
        x: 100,
        y: -180,
        scale: 0.95,
        rotation: 4,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
            const el = document.querySelector('.ample-card-scatter-3');
            if (el) el.classList.add('amp-active');
        },
        onReverseComplete: () => {
            const el = document.querySelector('.ample-card-scatter-3');
            if (el) el.classList.remove('amp-active');
        }
    }, "scatter");

    // Card 4: Retainer stats / 95% client rate card (bottom right) -> moves to bottom right
    tl.fromTo('.ample-card-scatter-4', {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 0.8,
        rotation: 0
    }, {
        opacity: 1,
        x: 320,
        y: 350,
        scale: 1,
        rotation: -4,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
            const el = document.querySelector('.ample-card-scatter-4');
            if (el) el.classList.add('amp-active');
        },
        onReverseComplete: () => {
            const el = document.querySelector('.ample-card-scatter-4');
            if (el) el.classList.remove('amp-active');
        }
    }, "scatter");

    // Slightly rotate the main Center Amanda Card too for organic depth!
    tl.to(centerCard, {
        rotation: 2,
        y: -20,
        duration: 1.2,
        ease: "power3.out"
    }, "scatter");
}

/* ─────────────────────────────────────────────────────────
   SERVICES ACCORDION — Part 1: Custom HTML Injection
   Runs at ALL screen sizes. Mobile gets stacked CSS layout.
   Desktop gets the horizontal accordion via Part 2 GSAP.
   ───────────────────────────────────────────────────────── */function initServicesAccordion() {
    const sec = document.querySelector('[data-framer-name="Services"]');
    if (!sec) return;
    // Guard: only inject once
    if (sec.querySelector('.as-wrapper')) return;

    // ── Service data ──────────────────────────────────────────
    const SERVICES = [
        {
            num: '00-1',
            title: 'AI Strategy & Roadmap',
            desc: 'We help you identify the most impactful areas for AI adoption and create a clear path to get there.',
            pills: ['Competitive benchmarking', 'Strategic planning', 'Opportunity analysis', 'Scalable roadmap'],
            bg: 'https://framerusercontent.com/images/i2SBWnvwttbCZ7DYLasXh0Eu2Lc.jpg'
        },
        {
            num: '00-2',
            title: 'Workflow Automation',
            desc: 'We streamline your daily operations with AI-driven workflows that reduce manual effort, minimize errors, and accelerate business efficiency.',
            pills: ['Process optimization', 'Task automation', 'Workflow scalability'],
            bg: 'https://framerusercontent.com/images/kX6UGNrNBUlQcVx3r8UK6341ocg.jpg'
        },
        {
            num: '00-3',
            title: 'AI agents & systems',
            desc: 'We build AI agents — voice, chat, and workflow-based — that plug directly into your existing tools and handle real tasks end-to-end.',
            pills: ['Voice & chat AI agents', 'System integrations', 'Autonomous task handling'],
            bg: 'https://framerusercontent.com/images/dtjDJ9jrNxrPfsdEAjTDnyuOP4g.jpg'
        },
        {
            num: '00-4',
            title: 'Data Strategy & Management',
            desc: 'We help you build a strong data foundation — from collection to analysis — ensuring accuracy, accessibility, and actionable insights.',
            pills: ['Data governance', 'Quality assurance'],
            bg: 'https://framerusercontent.com/images/LzbCZTNq3OFIQ6xvgQSummbSDg.jpg'
        }
    ];

    // ── Build HTML ────────────────────────────────────────────
    const panelsHTML = SERVICES.map((s, i) => `
        <div class="as-panel${i === 0 ? ' as-active' : ''}" data-idx="${i}">
            <div class="as-panel-bg" style="background-image: url('${s.bg}');"></div>
            <div class="as-panel-overlay"></div>
            <div class="as-panel-content">
                <span class="as-panel-num">${s.num}</span>
                <div class="as-panel-expanded-top">
                    <h3 class="as-expanded-title">${s.title}</h3>
                    <p class="as-desc">${s.desc}</p>
                </div>
                <div class="as-panel-expanded-bottom">
                    <div class="as-includes-label">Includes</div>
                    <div class="as-pills">${s.pills.map(p => `<span class="as-pill">${p}</span>`).join('')}</div>
                </div>
                <div class="as-collapsed-title">${s.title}</div>
            </div>
        </div>
    `).join('');

    const ctaHTML = `
        <div class="as-panel as-cta">
            <div class="as-panel-content">
                <div class="as-cta-logo">AmpletechAI</div>
                <div class="as-cta-content">
                    <h3 class="as-cta-heading">Start your AI journey with us</h3>
                    <a href="contact.html" class="as-cta-btn">
                        Let's Talk
                        <svg viewBox="0 0 11 11" fill="none"><path d="M1 10L10 1M10 1H4M10 1v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                    </a>
                </div>
            </div>
        </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.className = 'as-wrapper';
    wrapper.innerHTML = `<div class="as-track">${panelsHTML}${ctaHTML}</div>`;

    // Inject into the Framer Wrap container, or directly into the section
    const wrapEl = sec.querySelector('[data-framer-name="Wrap"]');
    if (wrapEl) {
        wrapEl.appendChild(wrapper);
    } else {
        sec.appendChild(wrapper);
    }

    // Add hover and click interactions for accordion panels
    const track = wrapper.querySelector('.as-track');
    const panels = Array.from(wrapper.querySelectorAll('.as-panel:not(.as-cta)'));

    if (track && panels.length > 0) {
        panels.forEach(panel => {
            // Mouse hover for desktop
            panel.addEventListener('mouseenter', () => {
                if (window.innerWidth >= 1200) {
                    panels.forEach(p => p.classList.remove('as-active'));
                    panel.classList.add('as-active');
                }
            });

            // Tap/Click for mobile and touch devices
            panel.addEventListener('click', () => {
                if (window.innerWidth < 1200) {
                    panels.forEach(p => p.classList.remove('as-active'));
                    panel.classList.add('as-active');
                }
            });
        });

        // Mouse leave track resets to first panel (desktop only)
        track.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 1200) {
                panels.forEach(p => p.classList.remove('as-active'));
                panels[0].classList.add('as-active');
            }
        });
    }

    console.log('[AmpletechAI] ✓ Custom Services accordion injected and hover handlers bound');
}
/* ─────────────────────────────────────────────────────────
   DYNAMIC RUNTIME INTERCEPTORS
   ───────────────────────────────────────────────────────── */

function fixStatsCounters() {
    // ONLY run on the homepage — skip on all other pages
    const isHomepage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' ||
                       window.location.pathname.endsWith('/index.html');
    if (!isHomepage) return;

    // Direct targeted replacements for the 3 homepage stat columns
    const fasterAIEls = document.querySelectorAll('.framer-gcuxec-container .framer-cmyx3u-container');
    const uptimeEls = document.querySelectorAll('.framer-1ta63gf-container .framer-cmyx3u-container');
    const businessesEls = document.querySelectorAll('.framer-g534p2-container .framer-cmyx3u-container');

    let patched = 0;
    fasterAIEls.forEach(el => {
        if (el.querySelector('.amp-counter-fixed')) return;
        el.innerHTML = '<div class="amp-counter-fixed" data-target="5" data-unit="X"><span class="amp-counter-val">0</span><span class="amp-counter-unit">X</span></div>';
        patched++;
        observeCounter(el.querySelector('.amp-counter-fixed'));
    });

    uptimeEls.forEach(el => {
        if (el.querySelector('.amp-counter-fixed')) return;
        el.innerHTML = '<div class="amp-counter-fixed" data-target="99" data-unit="%"><span class="amp-counter-val">0</span><span class="amp-counter-unit">%</span></div>';
        patched++;
        observeCounter(el.querySelector('.amp-counter-fixed'));
    });

    businessesEls.forEach(el => {
        if (el.querySelector('.amp-counter-fixed')) return;
        el.innerHTML = '<div class="amp-counter-fixed" data-target="5" data-unit="+"><span class="amp-counter-val">0</span><span class="amp-counter-unit">+</span></div>';
        patched++;
        observeCounter(el.querySelector('.amp-counter-fixed'));
    });

    return patched;
}

function observeCounter(counterEl) {
    if (!counterEl || counterEl.classList.contains('amp-counter-observed')) return;
    counterEl.classList.add('amp-counter-observed');
    
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(counterEl);
                io.unobserve(counterEl);
            }
        });
    }, { threshold: 0.1 });
    
    io.observe(counterEl);
}

function animateCounter(counterEl) {
    const valEl = counterEl.querySelector('.amp-counter-val');
    if (!valEl) return;
    
    const target = parseFloat(counterEl.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    const duration = 1500; // milliseconds
    const startTime = performance.now();
    
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing: easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);
        
        const currentVal = Math.floor(ease * target);
        valEl.textContent = currentVal;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            valEl.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

function swapWatermarkedImages() {
    document.querySelectorAll('img').forEach(img => {
        const anchor = img.closest('a');
        if (anchor && anchor.href) {
            if (anchor.href.includes('dental-clinic-voice-receptionist') && img.getAttribute('data-case-study') !== 'dental') {
                img.src = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800';
                img.removeAttribute('srcset');
                img.setAttribute('data-case-study', 'dental');
                return;
            } else if (anchor.href.includes('real-estate-lead-automation') && img.getAttribute('data-case-study') !== 'realestate') {
                img.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800';
                img.removeAttribute('srcset');
                img.setAttribute('data-case-study', 'realestate');
                return;
            } else if (anchor.href.includes('ecommerce-support-assistant') && img.getAttribute('data-case-study') !== 'ecommerce') {
                img.src = 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800';
                img.removeAttribute('srcset');
                img.setAttribute('data-case-study', 'ecommerce');
                return;
            }
        }

        for (const [key, localSrc] of Object.entries(IMAGE_MAP)) {
            if (img.src.includes(key) && img.getAttribute('data-swapped') !== key) {
                img.src = localSrc;
                img.setAttribute('data-swapped', key);
                break;
            }
        }
    });
}


function swapWatermarkedBackgrounds() {
    document.querySelectorAll('[style*="framerusercontent.com"]').forEach(el => {
        const bg = el.style.backgroundImage;
        if (bg) {
            for (const [key, localSrc] of Object.entries(IMAGE_MAP)) {
                if (bg.includes(key) && el.getAttribute('data-bg-swapped') !== key) {
                    el.style.backgroundImage = `url("${localSrc}")`;
                    el.setAttribute('data-bg-swapped', key);
                    break;
                }
            }
        }
    });
}

function replaceTextBranding(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue;
        let changed = false;
        
        if (text.includes('Altrion')) {
            text = text.replace(/Altrion/g, 'AmpletechAI');
            changed = true;
        }
        if (text.includes('ALTRION')) {
            text = text.replace(/ALTRION/g, 'AMPLETECHAI');
            changed = true;
        }
        
        if (/YEARS IN AI EXCELLENCE/i.test(text)) {
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
        
         

        

        if (text.includes('altrion')) {
            text = text.replace(/altrion/g, 'ampletechai');
            changed = true;
        }
        if (text.includes('AmpleAI')) {
            text = text.replace(/AmpleAI/g, 'AmpletechAI');
            changed = true;
        }
        if (text.includes('AMPLEAI')) {
            text = text.replace(/AMPLEAI/g, 'AMPLETECHAI');
            changed = true;
        }
        if (text.includes('ampleai')) {
            text = text.replace(/ampleai/g, 'ampletechai');
            changed = true;
        }
        
        if (changed) {
            node.nodeValue = text;
        }
    } else {
        if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE' && node.nodeName !== 'IFRAME') {
            for (let child of node.childNodes) {
                replaceTextBranding(child);
            }
        }
    }
}


function updateKochiClock() {
    const clocks = document.querySelectorAll('[data-code-component-plugin-id="84d4c1"]');
    clocks.forEach(el => {
        const text = el.textContent.trim();
        if (/\b\d{1,2}:\d{2}\s*(?:AM|PM)?\b/i.test(text)) {
            const kochiTime = new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000) + (new Date().getTimezoneOffset() * 60 * 1000));
            const dayName = kochiTime.toLocaleDateString('en-US', { weekday: 'long' });
            let hours = kochiTime.getHours();
            const minutes = String(kochiTime.getMinutes()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const timeStr = `${dayName}, ${hours}:${minutes} ${ampm}`;
            
            const targetChild = el.querySelector('div') || el;
            if (targetChild.textContent !== timeStr) {
                targetChild.textContent = timeStr;
            }
        }
    });
}


function initWhatWeBuildInteractions() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const totalSteps = 5;
    let currentStep = 1;

    function getStepYPositions() {
        const line = document.querySelector('.showcase-timeline-line');
        if (!line) return [];
        const lineRect = line.getBoundingClientRect();
        const positions = [];
        for (let step = 1; step <= 5; step++) {
            const item = document.querySelector(`.showcase-step-item[data-step="${step}"]`);
            if (item) {
                const rect = item.getBoundingClientRect();
                const relativeY = (rect.top + rect.height / 2) - lineRect.top;
                positions.push(relativeY);
            } else {
                positions.push(0);
            }
        }
        return positions;
    }

    function getSmoothYForProgress(progress) {
        const positions = getStepYPositions();
        if (positions.length === 0) return 0;
        const scaledProgress = progress * (positions.length - 1);
        const index = Math.floor(scaledProgress);
        const fraction = scaledProgress - index;
        if (index >= positions.length - 1) {
            return positions[positions.length - 1];
        }
        const yStart = positions[index];
        const yEnd = positions[index + 1];
        return yStart + (yEnd - yStart) * fraction;
    }

    // Set initial dot position after a short delay for layout calculation
    setTimeout(() => {
        const progressEl = document.querySelector('.showcase-timeline-progress');
        const dotEl = document.querySelector('.showcase-timeline-dot');
        const positions = getStepYPositions();
        if (positions.length > 0) {
            if (progressEl) progressEl.style.height = `${positions[0]}px`;
            if (dotEl) dotEl.style.transform = `translateY(${positions[0]}px)`;
        }
    }, 100);

    // Timeline mapping scroll scrub to step activation
    const tl = gsap.timeline({
        scrollTrigger: {
            id: "showcase-scroll",
            trigger: ".showcase-scroll-container",
            start: "top top",
            end: "+=3200",
            scrub: 0.3,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
                const step = Math.min(totalSteps, Math.max(1, Math.round(self.progress * (totalSteps - 1)) + 1));
                if (currentStep !== step) {
                    currentStep = step;
                    
                    document.querySelectorAll('.showcase-step-item').forEach(item => {
                        item.classList.toggle('active', parseInt(item.getAttribute('data-step')) === step);
                    });
                    
                    document.querySelectorAll('.showcase-panel').forEach(panel => {
                        panel.classList.toggle('active', parseInt(panel.getAttribute('data-panel')) === step);
                    });
                    
                    document.querySelectorAll('.showcase-dot').forEach(dot => {
                        dot.classList.toggle('active', parseInt(dot.getAttribute('data-dot')) === step);
                    });
                }
                
                // Smoothly update the progress bar and dot position
                const targetY = getSmoothYForProgress(self.progress);
                const progressEl = document.querySelector('.showcase-timeline-progress');
                const dotEl = document.querySelector('.showcase-timeline-dot');
                if (progressEl) {
                    progressEl.style.height = `${targetY}px`;
                }
                if (dotEl) {
                    dotEl.style.transform = `translateY(${targetY}px)`;
                }
            }
        }
    });

    // Click handlers for steps and dots
    document.querySelectorAll('.showcase-step-item').forEach(item => {
        item.addEventListener('click', () => {
            const stepNum = parseInt(item.getAttribute('data-step'));
            const st = ScrollTrigger.getById("showcase-scroll");
            if (st) {
                const targetScroll = st.start + (st.end - st.start) * (stepNum - 1) / (totalSteps - 1);
                if (window.__lenis) {
                    window.__lenis.scrollTo(targetScroll, { duration: 0.8 });
                } else {
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }
            }
        });
    });

    document.querySelectorAll('.showcase-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const dotNum = parseInt(dot.getAttribute('data-dot'));
            const st = ScrollTrigger.getById("showcase-scroll");
            if (st) {
                const targetScroll = st.start + (st.end - st.start) * (dotNum - 1) / (totalSteps - 1);
                if (window.__lenis) {
                    window.__lenis.scrollTo(targetScroll, { duration: 0.8 });
                } else {
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }
            }
        });
    });

    // Refresh ScrollTrigger to align showcase offsets
    ScrollTrigger.refresh();
}

function ensureGradientBeam() {
    // ONLY run on the homepage — skip on all other pages
    const isHomepage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' ||
                       window.location.pathname.endsWith('/index.html');
    if (!isHomepage) return;

    const statsEl = document.querySelector('.framer-1v6c2xt') || document.querySelector('[data-framer-name="Stats"]');
    if (statsEl) {
        let beam = statsEl.querySelector('.framer-bt8dal');
        if (!beam) {
            beam = document.createElement('div');
            beam.className = 'framer-bt8dal';
            beam.setAttribute('data-framer-name', 'Vector');
            beam.style.height = 'auto';
            beam.style.aspectRatio = '5.049019607843137';
            beam.innerHTML = `
                <div style="position:absolute; border-radius:inherit; corner-shape:inherit; top:0; right:0; bottom:0; left:0" data-framer-background-image-wrapper="true">
                    <img decoding="async" width="1030" height="204" src="https://framerusercontent.com/images/Rm9MgzczWnTc9jYB5lgdVxdMXA.png?width=1030&height=204" alt="Vector" style="display:block; width:100%; height:100%; border-radius:inherit; corner-shape:inherit; object-position:center; object-fit:cover">
                </div>
            `;
            statsEl.appendChild(beam);
            console.log('[AmpletechAI] ✓ Gradient beam created and appended to Stats container');
        }
    }
}

function moveStatsBelowCases() {
    // ONLY run on the homepage — skip on all other pages
    const isHomepage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' ||
                       window.location.pathname.endsWith('/index.html');
    if (!isHomepage) return;

    const casesSec = document.querySelector('[data-framer-name="Cases"]') || document.querySelector('.framer-1xaxmqt');
    const statsEl = document.querySelector('.framer-1v6c2xt') || document.querySelector('[data-framer-name="Stats"]');
    if (casesSec && statsEl) {
        const wrapEl = casesSec.querySelector('[data-framer-name="Wrap"]') || casesSec;
        // Check if statsEl is already a direct child of wrapEl and is positioned at the end
        if (statsEl.parentElement !== wrapEl || statsEl.nextSibling !== null) {
            wrapEl.appendChild(statsEl);
            console.log('[AmpletechAI] ✓ Stats container moved below the Case Studies in DOM');
        }
    }
}


/* ─────────────────────────────────────────────────────────
   CUSTOM TECH STACK MARQUEE
   ───────────────────────────────────────────────────────── */
function initTechStackMarquee() {
    const clientsSec = document.querySelector('[data-framer-name="Clients"]');
    if (!clientsSec) return;
    
    // Check if we already injected
    if (document.querySelector('.ample-tech-marquee-wrapper')) return;

    // Hide original contents (except background)
    Array.from(clientsSec.children).forEach(child => {
        if (!child.classList.contains('framer-kvim8p')) { // Check if this is the faint BG wrapper
            child.style.display = 'none';
        }
    });
    
    // Build marquee wrapper
    const marqueeHTML = `
        <div class="ample-tech-marquee-wrapper">
           <div class="ample-tech-header">
               <span class="wdh-label">Our Stack</span>
               <h2>Powered by Industry-Leading AI</h2>
           </div>
           
           <div class="ample-marquee-container">
               <div class="ample-marquee-track">
                   <div class="ample-marquee-content">
                        <span class="tech-item"><img class="tech-logo" src="/assets/openai.svg" alt="OpenAI"> OpenAI</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/supabase.svg" alt="Supabase"> Supabase</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/n8n.svg" alt="n8n"> n8n</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/elevenlabs.svg" alt="ElevenLabs"> ElevenLabs</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/make.svg" alt="Make"> Make.com</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/twilio.svg" alt="Twilio"> Twilio</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/claude.svg" alt="Claude"> Claude</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/whatsapp.svg" alt="WhatsApp"> WhatsApp</span>
                    </div>
                   <!-- Duplicate for infinite scroll -->
                   <div class="ample-marquee-content" aria-hidden="true">
                        <span class="tech-item"><img class="tech-logo" src="/assets/openai.svg" alt="OpenAI"> OpenAI</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/supabase.svg" alt="Supabase"> Supabase</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/n8n.svg" alt="n8n"> n8n</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/elevenlabs.svg" alt="ElevenLabs"> ElevenLabs</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/make.svg" alt="Make"> Make.com</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/twilio.svg" alt="Twilio"> Twilio</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/claude.svg" alt="Claude"> Claude</span>
                        <span class="tech-item"><img class="tech-logo" src="/assets/whatsapp.svg" alt="WhatsApp"> WhatsApp</span>
                    </div>
               </div>
           </div>
        </div>
    `;
    
    clientsSec.insertAdjacentHTML('beforeend', marqueeHTML);
    
    // Ensure section styles accommodate the custom layout
    clientsSec.style.padding = '120px 0';
    clientsSec.style.display = 'flex';
    clientsSec.style.justifyContent = 'center';
    clientsSec.style.alignItems = 'center';
}


/* ─────────────────────────────────────────────────────────
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
            scrub: 1
        }
    });
}


/* ─────────────────────────────────────────────────────────
   FAQ ACCORDION INITIALIZATION
   ───────────────────────────────────────────────────────── */
function initFaqAccordion() {
    const faqAnswers = {
        "What industries does AmpletechAI work with?": "We partner with businesses in healthcare, finance, e-commerce, real estate, and technology—delivering AI solutions tailored to their goals.",
        "How long does it take to implement an AI solution?": "Implementation timelines vary depending on complexity. A standard AI workflow automation might take 2-4 weeks, while a comprehensive enterprise-scale AI integration can take 2-3 months from strategy to full deployment.",
        "Do you offer end-to-end AI consulting?": "Yes, we provide full end-to-end services. This includes initial strategy and auditing, solution design, custom model development, integration into your existing systems, and ongoing support and optimization.",
        "Can small businesses benefit from AI consulting?": "Absolutely. We build scalable AI solutions that help small businesses automate repetitive tasks, improve customer service with voice AI, and reduce operational costs without needing a massive enterprise budget.",
        "What makes AmpletechAI different from other agencies?": "We focus on practical, ROI-driven AI implementations rather than theoretical hype. Our team combines deep technical expertise with business acumen to ensure every AI solution we deliver drives measurable growth and efficiency."
    };

    const faqContainers = document.querySelectorAll('div[name^="FAQ Title"]');
    if (!faqContainers.length) return;

    // Find the right panel answer text element
    const rightPanelContainer = document.querySelector('[data-framer-name="01 Content"] p');
    if (!rightPanelContainer) return;

    const defaultColors = {
        textColor: 'var(--token-53ac5080-809d-430f-8c22-cd6ed2fb990c, rgb(13, 13, 13))',
        iconColor: 'var(--token-53ac5080-809d-430f-8c22-cd6ed2fb990c, rgb(13, 13, 13))'
    };

    const activeColors = {
        textColor: 'var(--token-86429bfd-5f41-491b-a262-970b52647f38, rgb(241, 241, 241))',
        iconColor: 'var(--token-86429bfd-5f41-491b-a262-970b52647f38, rgb(241, 241, 241))'
    };

    function resetAll() {
        faqContainers.forEach(container => {
            container.style.backgroundColor = 'transparent';
            
            const titleEl = container.querySelector('.framer-92l52a');
            const hrIcon = container.querySelector('[data-framer-name="HR"]');
            const vrIcon = container.querySelector('[data-framer-name="VR"]');
            
            const bgTop = container.querySelector('.framer-1c3c615');
            const bgBottom = container.querySelector('.framer-1244sc4');
            
            if (bgTop) {
                bgTop.style.display = 'block';
                bgTop.style.height = '1px';
                bgTop.style.transition = 'height 0.3s ease';
            }
            if (bgBottom) {
                bgBottom.style.display = 'block';
                bgBottom.style.height = '1px';
                bgBottom.style.transition = 'height 0.3s ease';
            }

            if (titleEl) titleEl.style.setProperty('--extracted-tcooor', defaultColors.textColor, 'important');
            if (hrIcon) hrIcon.style.setProperty('background-color', defaultColors.iconColor, 'important');
            if (vrIcon) {
                vrIcon.style.setProperty('background-color', defaultColors.iconColor, 'important');
                vrIcon.style.transform = 'none'; // Plus sign
                vrIcon.style.opacity = '1';
            }
        });
    }

    let activeTitle = null;

    faqContainers.forEach(container => {
        const titleTextEl = container.querySelector('.framer-text');
        if (!titleTextEl) return;
        
        const questionText = titleTextEl.textContent.trim();
        const answerText = faqAnswers[questionText];
        
        if (!answerText) return;

        // Clean up any previously added inline dropdown answers
        const oldAnswerDiv = container.querySelector('.amp-faq-answer');
        if (oldAnswerDiv) oldAnswerDiv.remove();

        // Add mobile inline answer div
        const mobileAnswerDiv = document.createElement('div');
        mobileAnswerDiv.className = 'amp-faq-mobile-answer';
        const mobileAnswerP = document.createElement('p');
        mobileAnswerP.textContent = answerText;
        mobileAnswerDiv.appendChild(mobileAnswerP);
        container.appendChild(mobileAnswerDiv);

        const headerPart = container.querySelector('.framer-bvehib') || container;
        headerPart.style.cursor = 'pointer';

        headerPart.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (activeTitle === questionText) return; // already active

            resetAll();

            activeTitle = questionText;
            rightPanelContainer.textContent = answerText;
            
            // Toggle mobile answer visibility
            document.querySelectorAll('.amp-faq-mobile-answer').forEach(el => el.classList.remove('active'));
            const currentMobileAnswer = container.querySelector('.amp-faq-mobile-answer');
            if (currentMobileAnswer) {
                currentMobileAnswer.classList.add('active');
            }

            // Animate transition slightly
            rightPanelContainer.style.opacity = '0';
            setTimeout(() => {
                rightPanelContainer.style.opacity = '1';
                rightPanelContainer.style.transition = 'opacity 0.3s ease';
            }, 50);

            // Set active styles
            const titleEl = container.querySelector('.framer-92l52a');
            const hrIcon = container.querySelector('[data-framer-name="HR"]');
            const vrIcon = container.querySelector('[data-framer-name="VR"]');
            const bgTop = container.querySelector('.framer-1c3c615');
            const bgBottom = container.querySelector('.framer-1244sc4');

            if (bgTop) bgTop.style.height = '51%';
            if (bgBottom) bgBottom.style.height = '51%';

            if (titleEl) titleEl.style.setProperty('--extracted-tcooor', activeColors.textColor, 'important');
            if (hrIcon) hrIcon.style.setProperty('background-color', activeColors.iconColor, 'important');
            if (vrIcon) {
                vrIcon.style.setProperty('background-color', activeColors.iconColor, 'important');
                vrIcon.style.transform = 'rotate(90deg)'; // Minus sign
                vrIcon.style.transition = 'transform 0.3s ease';
                vrIcon.style.opacity = '1';
            }
        }, true);
    });

    // Make sure the first one is active initially if there's no active title
    setTimeout(() => {
        const firstQuestion = faqContainers[0].querySelector('.framer-text').textContent.trim();
        if (firstQuestion && faqAnswers[firstQuestion]) {
            resetAll();
            activeTitle = firstQuestion;
            rightPanelContainer.textContent = faqAnswers[firstQuestion];
            
            const titleEl = faqContainers[0].querySelector('.framer-92l52a');
            const hrIcon = faqContainers[0].querySelector('[data-framer-name="HR"]');
            const vrIcon = faqContainers[0].querySelector('[data-framer-name="VR"]');
            const bgTop = faqContainers[0].querySelector('.framer-1c3c615');
            const bgBottom = faqContainers[0].querySelector('.framer-1244sc4');
            
            if (bgTop) {
                bgTop.style.height = '51%';
                bgTop.style.transition = 'none'; // instant for initial
            }
            if (bgBottom) {
                bgBottom.style.height = '51%';
                bgBottom.style.transition = 'none'; // instant for initial
            }
            const initialMobileAnswer = faqContainers[0].querySelector('.amp-faq-mobile-answer');
            if (initialMobileAnswer) initialMobileAnswer.classList.add('active');
            
            if (titleEl) titleEl.style.setProperty('--extracted-tcooor', activeColors.textColor, 'important');
            if (hrIcon) hrIcon.style.setProperty('background-color', activeColors.iconColor, 'important');
            if (vrIcon) {
                vrIcon.style.setProperty('background-color', activeColors.iconColor, 'important');
                vrIcon.style.transform = 'rotate(90deg)';
            }
        }
    }, 500);
}

function initRuntimeInterceptors() {
    initFutureStatsAnimation();
    fixAccessibilityDuplications();
    initTeamProgressBars();
    initAboutProjectsStat();
    initFooterUpgrades();
    initTestimonialArrows();
    initCaseStudyMetrics();
    initCustomMetrics();
    initWhyDelayHurtsCounters();
    initFaqAccordion();
    initStatsZoom();
    initTechStackMarquee();
    // Run initial scan
    initHeroCanvas();
    moveStatsBelowCases();
    ensureGradientBeam();
    fixStatsCounters();
    swapWatermarkedImages();
    swapWatermarkedBackgrounds();
                initStatsZoom();
    replaceTextBranding(document.body);
    applyCardHoverClasses();
    patchPricingSection();
    patchRelatedProjectsLinks();
    patchMoreProjectsTableRows();
    removeCaseStudyDateRow();
    updateKochiClock();
    setInterval(updateKochiClock, 10000);
    initWhatWeBuildInteractions();

    // Retry stats replacements after Framer hydration (it renders async)
    const retryDelays = [500, 1500, 3000, 5000];
    retryDelays.forEach(delay => {
        setTimeout(() => {
            initHeroCanvas();
            moveStatsBelowCases();
            ensureGradientBeam();
            const patched = fixStatsCounters();
            swapWatermarkedImages();
            patchRelatedProjectsLinks();
            patchMoreProjectsTableRows();
            removeCaseStudyDateRow();
            initTeamProgressBars();
            initWhyDelayHurtsCounters();
            initTestimonialArrows();
            fixAccessibilityDuplications();
            if (patched) console.log(`[AmpletechAI] ✓ Stats patched after ${delay}ms delay (${patched} elements)`);

        }, delay);
    });

    
    // Track active scrolling to prevent MutationObserver layout thrashing during scroll
    let isScrolling = false;
    let scrollTimeout = null;
    window.addEventListener('scroll', () => {
        isScrolling = true;
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    }, { passive: true });

    // Setup MutationObserver for dynamic updates
    let debounceTimeout = null;
    const observer = new MutationObserver((mutations) => {
        // Skip updates during active scrolling to prevent layout thrashing and ScrollTrigger mismatches
        if (isScrolling) return;

        let hasRelevantMutation = false;
        
        mutations.forEach(m => {
            // Skip mutations inside counters or our own injected structures to prevent loops and lag
            const target = m.target;
            if (target && target.closest && (
                target.closest('.amp-counter-fixed') || 
                target.closest('.as-wrapper') || 
                target.closest('video') ||
                target.closest('.framer-bt8dal') ||
                target.closest('#amp-testimonials-patch')
            )) {
                return;
            }

            if (m.type === 'childList') {
                m.addedNodes.forEach(node => {
                    // Ignore our own added elements to avoid infinite mutation loops
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const el = node;
                        if (el.classList.contains('amp-counter-fixed') || 
                            el.classList.contains('as-wrapper') || 
                            el.classList.contains('framer-bt8dal') ||
                            el.tagName === 'VIDEO' ||
                            el.tagName === 'STYLE') {
                            return;
                        }
                    }
                    replaceTextBranding(node);
                    hasRelevantMutation = true;
                });
            } else if (m.type === 'characterData') {
                replaceTextBranding(m.target);
                hasRelevantMutation = true;
            }
        });
        
        if (hasRelevantMutation) {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                applyCardHoverClasses();
                patchPricingSection();
                initHeroCanvas();
                moveStatsBelowCases();
                ensureGradientBeam();
                fixStatsCounters();
                swapWatermarkedImages();
                patchRelatedProjectsLinks();
                patchMoreProjectsTableRows();
                swapWatermarkedBackgrounds();
                
                // Refresh ScrollTrigger to align offsets after dynamic layout patches
                if (window.ScrollTrigger) {
                    window.ScrollTrigger.refresh();
                }
            }, 150);
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
    
    // Disconnect the observer after 8 seconds once page hydration has fully settled
    setTimeout(() => {
        observer.disconnect();
        console.log('[AmpletechAI] MutationObserver disconnected after settlement');
    }, 8000);
}

/* ─────────────────────────────────────────────────────────
   CLIENTS SECTION BACKGROUND ZOOM (Scroll-driven Zoom)
   ───────────────────────────────────────────────────────── */
function initClientsBgZoom() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const bgImgs = document.querySelectorAll('.framer-beuh1o img');
    const triggerSection = document.querySelector('.framer-x5sepb');

    if (bgImgs.length === 0 || !triggerSection) return;

    bgImgs.forEach(bgImg => {
        gsap.set(bgImg, { transformOrigin: "center center" });

        gsap.fromTo(bgImg, 
            { scale: 1.02 },
            {
                scale: 1.15,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerSection,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            }
        );
    });
    console.log('[AmpleAI] ✓ Clients background zoom initialized');
}

/* ─────────────────────────────────────────────────────────
   TESTIMONIALS SECTION — Single Client Patch (Lumothrive)
   ───────────────────────────────────────────────────────── */
function patchTestimonialsSection() {
    if (!document.getElementById('amp-testimonials-patch')) {
        const style = document.createElement('style');
        style.id = 'amp-testimonials-patch';
        style.textContent = [
            '#testimonials [data-framer-name="Left"],',
            '#testimonials [data-framer-name="Right"],',
            '#testimonials [data-framer-name="Center"] { display:none !important; }',
            '#testimonials [data-framer-name="Testimonial 02"],',
            '#testimonials [data-framer-name="Testimonial 03"],',
            '#testimonials [data-framer-name="Testimonial 04"],',
            '#testimonials [data-framer-name="Testimonial 05"] { display:none; }',
            '#testimonials [data-framer-name^="Avatar 0"],',
            '#testimonials [name^="Avatar 0"] { display:none !important; }',
            '#testimonials .framer-133xo47-container,',
            '#testimonials .framer-1f8p3c1-container,',
            '#testimonials .framer-enqnre-container,',
            '#testimonials .framer-137dy8a-container,',
            '#testimonials .framer-s7hlof-container { height: auto !important; min-height: 380px !important; display: flex !important; flex-direction: column !important; }',
            '#testimonials .framer-dv9xz { height: auto !important; min-height: 380px !important; flex: 1 1 auto !important; display: flex !important; flex-direction: column !important; justify-content: center !important; padding: 40px !important; box-sizing: border-box !important; }'
        ].join('\n');
        document.head.appendChild(style);
    }

    const apply = () => {
        const section = document.querySelector('section[id="testimonials"]');
        if (!section) return;

        const hiddenCards = [
            '[data-framer-name="Testimonial 02"]',
            '[data-framer-name="Testimonial 03"]',
            '[data-framer-name="Testimonial 04"]',
            '[data-framer-name="Testimonial 05"]',
        ];
        hiddenCards.forEach(sel => {
            section.querySelectorAll(sel).forEach(el => {
                const parent = el.parentElement;
                if (parent) {
                    const children = Array.from(parent.children);
                    const index = children.indexOf(el);
                    if (index !== currentTestimonialIndex) {
                        el.style.display = 'none';
                    }
                }
            });
        });

        section.querySelectorAll('[data-framer-name="Testimonial 01"]').forEach(card => {
            // Hide the default top avatar/logo blocks
            const topBlock = card.querySelector('[data-framer-name="Top"]');
            if (topBlock) {
                topBlock.style.display = 'none';
            }
            
            // Hide any default card images to prevent broken avatars, except our custom logo
            card.querySelectorAll('img').forEach(img => {
                if (!img.classList.contains('lumothrive-logo')) {
                    img.style.display = 'none';
                    if (img.parentElement && !img.parentElement.classList.contains('custom-lumothrive-header')) {
                        img.parentElement.style.display = 'none';
                    }
                }
            });

            // Locate the quote text element
            const quoteEl = card.querySelector('p.framer-text') ||
                            card.querySelector('[data-framer-name="Bottom"] .framer-1w1whxo p') ||
                            card.querySelector('[data-framer-name="Bottom"] .framer-text');

            // Ensure custom header exists and is updated inside the same wrapper as the quote
            let brandHeader = card.querySelector('.custom-lumothrive-header');
            if (!brandHeader) {
                brandHeader = document.createElement('div');
                brandHeader.className = 'custom-lumothrive-header';
            }
            
            if (quoteEl && brandHeader.parentNode !== quoteEl.parentNode) {
                quoteEl.parentNode.insertBefore(brandHeader, quoteEl);
            } else if (!quoteEl && !brandHeader.parentNode) {
                card.insertBefore(brandHeader, card.firstChild);
            }
            
            // Set styles for the brand header to align beautifully inside the black container
            brandHeader.style.display = 'flex';
            brandHeader.style.flexDirection = 'column';
            brandHeader.style.alignItems = 'center';
            brandHeader.style.justifyContent = 'center';
            brandHeader.style.gap = '10px';
            brandHeader.style.marginBottom = '24px';
            brandHeader.style.paddingBottom = '16px';
            brandHeader.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            brandHeader.style.width = '100%';

            const starsHtml = Array(5).fill(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFC107" width="18" height="18" style="display:inline-block; margin: 0 2px; filter: drop-shadow(0px 2px 4px rgba(255, 193, 7, 0.2));"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`).join('');

            brandHeader.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                    <img src="/assets/lumothrive.svg" class="lumothrive-logo" style="display: block !important; width: 60px; height: 60px; object-fit: contain; filter: none !important;" alt="Lumothrive" />
                    <span style="font-family: 'Space Grotesk', 'Geist', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 0.08em; text-transform: uppercase;">LUMOTHRIVE</span>
                </div>
                <div style="display: flex; justify-content: center; align-items: center; margin-top: 2px;">
                    ${starsHtml}
                </div>
            `;

            if (quoteEl) {
                quoteEl.textContent = '\u201cThe AI consulting process in AmpletechAI was smooth and transparent. From strategy to implementation, every step was handled with real expertise and a focus on business outcomes.\u201d';
            }

            const nameEl = card.querySelector('[data-framer-name="Profile Info"] h2.framer-text') ||
                           card.querySelector('[data-framer-name="Profile Info"] h2');
            if (nameEl) nameEl.textContent = 'Nevis';

            const titleEl = card.querySelector('[data-framer-name="Job Title"] p.framer-text') ||
                            card.querySelector('[data-framer-name="Job Title"] p');
            if (titleEl) titleEl.textContent = 'Co-Founder, Lumothrive';
        });

        section.querySelectorAll('[data-framer-name="Left"], [data-framer-name="Right"], [data-framer-name="Center"]').forEach(el => {
            el.style.display = 'none';
        });

        for (let i = 1; i <= 5; i++) {
            section.querySelectorAll(`[data-framer-name="Avatar 0${i}"], [name="Avatar 0${i}"]`).forEach(el => {
                el.style.display = 'none';
                const container = el.closest('[class*="container"]');
                if (container) container.style.display = 'none';
            });
        }

        section.querySelectorAll('[data-framer-name="Testimonial 01"]').forEach(card => {
            card.style.margin = '0 auto';
        });

        console.log('[AmpleAI] ✓ Testimonials patched — single Lumothrive client');
    };

    apply();
    setTimeout(apply, 500);
    setTimeout(apply, 1500);
    setTimeout(apply, 3000);
}

/* ─────────────────────────────────────────────────────────
   VOICES OF TRUST BACKGROUND TICKER — Horizontal Scrolling
   ───────────────────────────────────────────────────────── */
function initVoicesTicker() {
    const apply = () => {
        const section = document.querySelector('section[id="testimonials"]');
        if (!section) return;

        const container = document.querySelector('.framer-1d8cjmj');
        if (!container) return;

        if (container.parentElement !== section) {
            section.insertBefore(container, section.firstChild);
        }

        const ul = container.querySelector('ul');
        if (!ul || ul.classList.contains('ample-marquee-ready')) return;

        ul.classList.add('ample-marquee-ready');
        container.style.setProperty('display', 'flex', 'important');

        const children = Array.from(ul.children);
        children.forEach(child => {
            const clone = child.cloneNode(true);
            ul.appendChild(clone);
        });

        console.log('[AmpleAI] ✓ Ticker cloned and moved to section root');
    };

    if (!document.getElementById('ample-marquee-style')) {
        const style = document.createElement('style');
        style.id = 'ample-marquee-style';
        style.textContent = `
            .framer-1d8cjmj {
                position: absolute !important;
                display: flex !important;
                justify-content: flex-start !important;
                overflow: hidden !important;
                width: 100% !important;
                max-width: 100% !important;
                left: 0 !important;
                right: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                z-index: 0 !important;
                transform: none !important;
            }
            .framer-1d8cjmj ul {
                display: flex !important;
                justify-content: flex-start !important;
                flex-direction: row !important;
                width: max-content !important;
                max-width: none !important;
                gap: 100px !important;
                margin: 0 !important;
                padding: 0 !important;
                animation: ample-marquee-scroll 45s linear infinite !important;
                will-change: transform;
            }
            .framer-1d8cjmj .ticker-item {
                flex-shrink: 0 !important;
            }
            .framer-1d8cjmj .framer-8aqped {
                opacity: 1 !important;
            }
            @keyframes ample-marquee-scroll {
                0% {
                    transform: translate3d(0, 0, 0);
                }
                100% {
                    transform: translate3d(-50%, 0, 0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    apply();
    setTimeout(apply, 600);
    setTimeout(apply, 1500);
    setTimeout(apply, 3000);
}

/* ─────────────────────────────────────────────────────────
   PRICING plans — Hide toggle & unused empty bullet points
   ───────────────────────────────────────────────────────── */
function patchPricingSection() {
    const apply = () => {
        const section = document.getElementById('pricing') || 
                        document.querySelector('[data-framer-name*="Pricing" i]') ||
                        document.body;
        if (!section) return;

        const toggles = section.querySelectorAll('[data-framer-name="Toggle"]');
        toggles.forEach(el => {
            el.style.setProperty('display', 'none', 'important');
        });

        const bullets = section.querySelectorAll('[data-framer-name^="SM -"]');
        bullets.forEach(el => {
            const text = (el.innerText || el.textContent || '').trim();
            if (text === '') {
                el.style.setProperty('display', 'none', 'important');
            }
        });
    };

    apply();
    setTimeout(apply, 400);
    setTimeout(apply, 1000);
    setTimeout(apply, 2000);
    setTimeout(apply, 3500);
}

function initTextHighlight() {
    if (!window.gsap || !window.ScrollTrigger) return;
    
    // Find all paragraphs matching our text pattern, being careful with &nbsp;
    const paragraphs = Array.from(document.querySelectorAll('p')).filter(p => {
        const text = p.textContent.toUpperCase().replace(/[\s\xA0]+/g, ' ').trim();
        return text.includes('BUSINESSES INTEGRATE') || text.includes('CORE STRATEGIES');
    });

    if (paragraphs.length === 0) return;

    paragraphs.forEach(p => {
        // Find innermost spans that actually contain text
        const spans = Array.from(p.querySelectorAll('span')).filter(s => s.children.length === 0 && s.textContent.trim().length > 0);
        if (spans.length === 0) return;

        // GSAP scroll trigger for text color
        gsap.to(spans, {
            color: '#ffffff',
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
                trigger: p,
                start: "top 80%",
                end: "bottom 40%",
                scrub: 1,
                invalidateOnRefresh: true
            }
        });
    });
}


/* ─────────────────────────────────────────────────────────
   SKELETON LOADING
   ───────────────────────────────────────────────────────── */
function initSkeletonLoading() {
    const projectCards = document.querySelectorAll('a[href*="/case-studies/"]');
    
    if (projectCards.length === 0) return;

    // Apply loading state immediately
    projectCards.forEach(card => {
        card.classList.add('amp-skeleton-card');
    });

    // Simulate fetch delay
    setTimeout(() => {
        projectCards.forEach(card => {
            card.classList.remove('amp-skeleton-card');
            card.classList.add('amp-loaded');
        });
    }, 1200);
}


/* ─────────────────────────────────────────────────────────
   CUSTOM METRICS REPLACEMENT
   ───────────────────────────────────────────────────────── */
function initCustomMetrics() {
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/index.html');
    if (!isHomepage) return;

    function enforceMetrics() {
        const c1 = document.querySelectorAll('.framer-swwr6r-container');
        const c2 = document.querySelectorAll('.framer-1jfhltq-container');
        const c3 = document.querySelectorAll('.framer-zgu289-container');
        const c4 = document.querySelectorAll('.framer-1pafy54-container');

        function updateContainer(containers, targetNum, suffix, labelStr, dark) {
            containers.forEach(c => {
                const numContainer = c.querySelector('.framer-1mf6hfp');
                const labelContainer = c.querySelector('.framer-1trpgh8');
                const imgEl = c.querySelector('.framer-b3hyug');

                if (numContainer) {
                    const textNode = numContainer.querySelector('h2, h3, p, span');
                    if (textNode && !textNode.classList.contains('custom-metric-applied')) {
                        textNode.classList.add('custom-metric-applied');
                        textNode.innerHTML = '<span class="custom-metric-val" data-target="' + targetNum + '">0</span><span class="custom-metric-suffix">' + suffix + '</span>';
                        textNode.style.fontSize = '48px';
                        textNode.style.lineHeight = '1.1';
                        // Keep animation observer attached
                        observeCustomMetric(c, textNode.querySelector('.custom-metric-val'));
                    }
                }
                if (labelContainer) {
                    const textNode = labelContainer.querySelector('p, span');
                    if (textNode && textNode.textContent !== labelStr) {
                        textNode.textContent = labelStr;
                        textNode.style.fontSize = '18px';
                    }
                }
                if (imgEl) {
                    imgEl.style.display = 'none';
                }
                
                // Set dark mode styles for Container 2
                if (dark) {
                    const cardWrap = c.querySelector('.framer-1my83aw');
                    if (cardWrap && cardWrap.parentElement) {
                        cardWrap.parentElement.style.backgroundColor = 'var(--token-53ac5080-809d-430f-8c22-cd6ed2fb990c, rgb(13, 13, 13))';
                        if(numContainer) numContainer.style.setProperty('--framer-text-color', 'white', 'important');
                        if(labelContainer) labelContainer.style.setProperty('--framer-text-color', 'rgba(255,255,255,0.7)', 'important');
                    }
                }
            });
        }

        updateContainer(c1, 65, '%', 'Automated response', false);
        updateContainer(c2, 45, '%', 'Faster ticket resolution', true);
        updateContainer(c3, 20, '+', 'Net promoter score growth', false);

        c4.forEach(c => c.style.display = 'none');
    }

    const metricObserver = new MutationObserver(() => {
        enforceMetrics();
    });
    
    // Check periodically for hydration
    const intv = setInterval(() => {
        const c1 = document.querySelector('.framer-swwr6r-container');
        if (c1) {
            enforceMetrics();
            metricObserver.observe(document.body, { childList: true, subtree: true });
            clearInterval(intv);
        }
    }, 100);
}

const customMetricIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const valEl = entry.target;
            if (valEl.classList.contains('animated')) return;
            valEl.classList.add('animated');
            
            const rawTarget = valEl.getAttribute('data-target') || '';
            const target = parseFloat(rawTarget.replace(/[^0-9.]/g, '')) || 0;
            const prefix = (rawTarget.match(/^[^\d]*/) || [''])[0];
            const suffix = (rawTarget.match(/[^\d]*$/) || [''])[0];
            
            const duration = 2000;
            const startTime = performance.now();
            function update(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                valEl.textContent = prefix + Math.floor(target * easeOut) + suffix;
                if (progress < 1) requestAnimationFrame(update);
                else valEl.textContent = rawTarget;
            }
            requestAnimationFrame(update);
        }
    });
}, { threshold: 0.1 });


function observeCustomMetric(container, valEl) {
    if (valEl) {
        customMetricIo.observe(valEl);
    }
}




function initCaseStudyMetrics() {
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/index.html');
    if (isHomepage) return;

    let statsData = [];
    if (window.location.pathname.includes('dental-clinic')) {
        statsData = [
            { num: 100, suffix: '%', label: 'Missed calls eliminated' },
            { num: 40, suffix: '+', label: 'Hours saved per week' },
            { num: 25, suffix: '%', label: 'Increase in booked appointments' }
        ];
    } else if (window.location.pathname.includes('ecommerce')) {
        statsData = [
            { num: 85, suffix: '%', label: 'Automated response rate' },
            { num: 40, suffix: '%', label: 'Faster ticket resolution' }
        ];
    } else if (window.location.pathname.includes('real-estate')) {
        statsData = [
            { num: '< 1', suffix: 'm', label: 'Lead response time' },
            { num: '3', suffix: 'x', label: 'Higher lead conversion' },
            { num: 100, suffix: '%', label: 'Inquiries captured instantly' }
        ];

    } else {
        return; // Not a known case study page
    }

    function enforceCaseStudyMetrics() {
        const grid = document.querySelector('.framer-azkep0');
        if (!grid) return;
        
        const variants = grid.querySelectorAll(':scope > .ssr-variant');
        variants.forEach((v, i) => {
            const boxIndex = Math.floor(i / 3);
            const stat = statsData[boxIndex];
            if (!stat) return;
            
            const numContainer = v.querySelector('.framer-8rbnoz-container');
            if (numContainer && !numContainer.classList.contains('custom-metric-applied')) {
                numContainer.classList.add('custom-metric-applied');
                const variant = v.querySelector('.framer-GpCXc');
                const isDark = variant && variant.getAttribute('data-framer-name') && variant.getAttribute('data-framer-name').includes('Dark');
                const textColor = isDark ? 'white' : 'var(--token-53ac5080-809d-430f-8c22-cd6ed2fb990c, rgb(13, 13, 13))';

                numContainer.innerHTML = `
                <div style="position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden; user-select:none; color: ${textColor};">
                    <div style="display:flex; align-items:center; justify-content:center; gap:0.05em; font-family:'TASA Orbiter', sans-serif; font-size:64px; font-weight:700; letter-spacing:-1px; line-height:1.2em;">
                        <span class="custom-metric-val case-study-val" data-target="${stat.num}">0</span><span class="custom-metric-suffix">${stat.suffix}</span>
                    </div>
                </div>`;
                observeCustomMetric(v, numContainer.querySelector('.custom-metric-val'));
            }
            
            const labelContainer = v.querySelector('.framer-1ui5pkj p');
            if (labelContainer && labelContainer.textContent !== stat.label) {
                labelContainer.textContent = stat.label;
            }
        });
    }

    const metricObserver = new MutationObserver(() => {
        enforceCaseStudyMetrics();
    });
    
    const intv = setInterval(() => {
        const grid = document.querySelector('.framer-azkep0');
        if (grid) {
            enforceCaseStudyMetrics();
            metricObserver.observe(grid, { childList: true, subtree: true });
            clearInterval(intv);
        }
    }, 100);
}

/* ── AMPLETECHAI ADDED RUNTIME ACTIONS ── */
function initFutureStatsAnimation() {
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/index.html');
    if (!isHomepage) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const valEl = entry.target;
                if (valEl.classList.contains('animated')) return;
                valEl.classList.add('animated');
                
                const target = parseFloat(valEl.getAttribute('data-target'));
                const duration = 800; // 800ms
                const startTime = performance.now();
                
                function update(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    valEl.textContent = Math.floor(target * easeOut);
                    
                    if (progress < 1) requestAnimationFrame(update);
                    else valEl.textContent = target;
                }
                requestAnimationFrame(update);
                observer.unobserve(valEl);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.future-stat-val').forEach(el => {
        observer.observe(el);
    });
}

function initTeamProgressBars() {
    const isAboutPage = window.location.pathname.includes('about-us');
    if (!isAboutPage) return;

    const cards = document.querySelectorAll('.framer-ywnt0a');
    cards.forEach(card => {
        const text = card.textContent;
        let targetPercent = 0;
        if (text.includes('Deon')) targetPercent = 92;
        else if (text.includes('Basil')) targetPercent = 95;
        else if (text.includes('Sneha')) targetPercent = 88;
        else if (text.includes('Jissmon')) targetPercent = 90;
        
        if (targetPercent === 0) return;

        const progressContainer = card.querySelector('.framer-1jtod8t-container');
        if (!progressContainer) return;
        
        const progressbar = progressContainer.querySelector('[role="progressbar"]');
        if (progressbar) {
            const fills = Array.from(progressbar.children).map(child => child.querySelector('div')).filter(Boolean);
            if (fills.length > 0) {
                // Initialize all fills to 0%
                fills.forEach(fill => {
                    fill.style.width = '0%';
                    fill.style.transition = 'width 1s cubic-bezier(0.16, 1, 0.3, 1)';
                });
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            progressbar.setAttribute('aria-valuenow', targetPercent);
                            progressbar.setAttribute('aria-label', `Progress: ${targetPercent}%`);
                            
                            fills.forEach((fill, i) => {
                                let fillPercent = 0;
                                const segmentMin = i * 10;
                                const segmentMax = segmentMin + 10;
                                if (targetPercent >= segmentMax) {
                                    fillPercent = 100;
                                } else if (targetPercent <= segmentMin) {
                                    fillPercent = 0;
                                } else {
                                    fillPercent = (targetPercent - segmentMin) * 10;
                                }
                                fill.style.width = `${fillPercent}%`;
                            });
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
                
                observer.observe(card);
            }
        }
    });
}


function initAboutProjectsStat() {
    const isAboutPage = window.location.pathname.includes('about-us');
    if (!isAboutPage) return;

    const labelEl = Array.from(document.querySelectorAll('p')).find(p => p.textContent.trim() === 'Projects delivered');
    if (labelEl && !labelEl.classList.contains('projects-stat-applied')) {
        labelEl.classList.add('projects-stat-applied');
        
        const numBox = document.createElement('div');
        numBox.className = 'about-projects-stat-box';
        numBox.innerHTML = '<span class="about-projects-val" data-target="5">0</span><span class="about-projects-suffix">+</span>';
        
        numBox.style.fontSize = '3.5rem';
        numBox.style.fontWeight = '700';
        numBox.style.color = '#ffffff';
        numBox.style.fontFamily = '"TASA Orbiter", sans-serif';
        numBox.style.marginBottom = '8px';
        
        labelEl.parentNode.insertBefore(numBox, labelEl);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const valEl = entry.target.querySelector('.about-projects-val');
                    if (valEl.classList.contains('animated')) return;
                    valEl.classList.add('animated');
                    
                    const target = parseFloat(valEl.getAttribute('data-target'));
                    const duration = 1000;
                    const startTime = performance.now();
                    
                    function update(now) {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        valEl.textContent = Math.floor(target * easeOut);
                        
                        if (progress < 1) requestAnimationFrame(update);
                        else valEl.textContent = target;
                    }
                    requestAnimationFrame(update);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(numBox);
    }
}

function initFooterUpgrades() {
    // 1. Upgrading Social links in footer
    const socialHeaders = Array.from(document.querySelectorAll('p, span, div')).filter(el => {
        return el.textContent.trim() === 'Social' && el.classList.contains('framer-text');
    });
    
    socialHeaders.forEach(header => {
        const column = header.closest('.framer-6snatm') || header.closest('[class*="Social"]') || header.parentElement.parentElement;
        if (!column) return;
        
        const bottom = column.querySelector('.framer-3gtfn6') || column.querySelector('[class*="Bottom"]') || column.children[1];
        if (!bottom) return;
        
        if (bottom.classList.contains('social-upgraded')) return;
        bottom.classList.add('social-upgraded');
        
        bottom.innerHTML = '';
        bottom.style.display = 'flex';
        bottom.style.flexDirection = 'row';
        bottom.style.flexWrap = 'wrap';
        bottom.style.gap = '8px';
        bottom.style.alignItems = 'center';
        bottom.style.marginTop = '16px';
        
        const socials = [
            { 
                label: 'Instagram', 
                url: 'https://www.instagram.com/ample.ai/',
                icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`
            },
            { 
                label: 'Twitter/X', 
                url: 'https://x.com/',
                icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
            },
            { 
                label: 'LinkedIn', 
                url: 'https://www.linkedin.com/',
                icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
            },
            { 
                label: 'YouTube', 
                url: 'https://www.youtube.com/',
                icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
            }
        ];
        
        socials.forEach(s => {
            const link = document.createElement('a');
            link.href = s.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'footer-social-badge';
            link.innerHTML = `${s.icon} <span>${s.label}</span>`;
            bottom.appendChild(link);
        });
    });

    // 2. Upgrading Legal link in footer
    const legalHeaders = Array.from(document.querySelectorAll('p, span, div')).filter(el => {
        return el.textContent.trim() === 'Legal' && el.classList.contains('framer-text');
    });
    
    legalHeaders.forEach(header => {
        const column = header.closest('.framer-j93cv6') || header.closest('[class*="Legal"]') || header.parentElement.parentElement;
        if (!column) return;
        
        const bottom = column.querySelector('.framer-7m7tab') || column.querySelector('[class*="Bottom"]') || column.children[1];
        if (!bottom) return;
        
        if (bottom.classList.contains('legal-upgraded')) return;
        bottom.classList.add('legal-upgraded');
        
        const depth = window.location.pathname.split('/').filter(Boolean).length;
        const prefix = depth > 1 ? '../' : './';
        
        bottom.innerHTML = '';
        bottom.className = 'footer-legal-container';
        
        const copyrightBadge = document.createElement('div');
        copyrightBadge.className = 'footer-legal-badge';
        copyrightBadge.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            <span>© 2026 AmpletechAI Agency</span>
        `;
        bottom.appendChild(copyrightBadge);
        
        const privacyBadge = document.createElement('a');
        privacyBadge.href = prefix + 'legal-pages/privacy-policy.html';
        privacyBadge.className = 'footer-legal-badge link';
        privacyBadge.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span>Privacy Policy</span>
        `;
        bottom.appendChild(privacyBadge);
    });
}


function initTestimonialArrows() {
    const containers = document.querySelectorAll('.framer-f606e8-container');
    if (containers.length === 0) return;
    
    const trackParents = document.querySelectorAll('.framer-ze9bgm');
    if (trackParents.length === 0) return;
    
    const totalTestimonials = trackParents[0].children.length;
    
    // Check if initialized to avoid duplicate click handlers
    if (window.testimonialArrowsInitialized) {
        // Just make sure arrows are present
        containers.forEach(container => {
            if (!container.querySelector('.testimonial-nav-arrows')) {
                injectArrows(container);
            }
        });
        return;
    }
    window.testimonialArrowsInitialized = true;

    containers.forEach(container => {
        if (!container.querySelector('.testimonial-nav-arrows')) {
            injectArrows(container);
        }
    });

    function injectArrows(container) {
        const nav = document.createElement('div');
        nav.className = 'testimonial-nav-arrows';
        
        const disabledAttr = totalTestimonials <= 1 ? 'disabled' : '';
        nav.innerHTML = `
            <button class="testimonial-arrow-btn prev" ${disabledAttr} aria-label="Previous testimonial">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            </button>
            <button class="testimonial-arrow-btn next" ${disabledAttr} aria-label="Next testimonial">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
        `;
        
        container.appendChild(nav);
        
        if (totalTestimonials > 1) {
            const prevBtn = nav.querySelector('.prev');
            const nextBtn = nav.querySelector('.next');
            
            prevBtn.addEventListener('click', () => {
                navigateTestimonials(-1);
            });
            nextBtn.addEventListener('click', () => {
                navigateTestimonials(1);
            });
        }
    }

    function navigateTestimonials(direction) {
        currentTestimonialIndex = (currentTestimonialIndex + direction + totalTestimonials) % totalTestimonials;
        updateTestimonialDisplay();
    }

    function updateTestimonialDisplay() {
        trackParents.forEach(parent => {
            const children = Array.from(parent.children);
            children.forEach((child, index) => {
                if (index === currentTestimonialIndex) {
                    child.style.display = 'block';
                    child.style.opacity = '0';
                    child.style.transition = 'opacity 0.4s ease';
                    // Trigger reflow
                    child.offsetHeight;
                    child.style.opacity = '1';
                } else {
                    child.style.display = 'none';
                    child.style.opacity = '0';
                }
            });
        });
    }

    updateTestimonialDisplay();
}


function initWhyDelayHurtsCounters() {
    const pills = document.querySelectorAll('.wdh-pill');
    if (pills.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pill = entry.target;
                if (pill.classList.contains('animated')) return;
                pill.classList.add('animated');
                
                const target = parseInt(pill.getAttribute('data-target') || '0', 10);
                const duration = 1000;
                const startTime = performance.now();
                
                function update(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    pill.textContent = '+' + Math.floor(target * easeOut) + '%';
                    if (progress < 1) requestAnimationFrame(update);
                    else pill.textContent = '+' + target + '%';
                }
                requestAnimationFrame(update);
                observer.unobserve(pill);
            }
        });
    }, { threshold: 0.1 });
    
    pills.forEach(pill => observer.observe(pill));
}

function looseMatch(text, searchStr) {
    const cleanedText = text.toLowerCase().replace(/[^a-z]/g, '');
    const cleanedSearch = searchStr.toLowerCase().replace(/[^a-z]/g, '');
    return cleanedText.includes(cleanedSearch);
}

function patchRelatedProjectsLinks() {
    document.querySelectorAll('a').forEach(anchor => {
        const text = anchor.textContent || '';
        if (looseMatch(text, 'Lead Followup Automation') || looseMatch(text, 'Lead Followup')) {
            anchor.href = `${getRelativePathPrefix()}case-studies/real-estate-lead-automation.html`;
            anchor.querySelectorAll('img').forEach(img => {
                img.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800';
                img.removeAttribute('srcset');
                img.setAttribute('data-case-study', 'realestate');
            });
        } else if (looseMatch(text, 'AI Support Assistant MVP') || looseMatch(text, 'Support Assistant')) {
            anchor.href = `${getRelativePathPrefix()}case-studies/ecommerce-support-assistant.html`;
            anchor.querySelectorAll('img').forEach(img => {
                img.src = 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800';
                img.removeAttribute('srcset');
                img.setAttribute('data-case-study', 'ecommerce');
            });
        } else if (looseMatch(text, 'AI Voice Receptionist') || looseMatch(text, 'Voice Receptionist')) {
            anchor.href = `${getRelativePathPrefix()}case-studies/dental-clinic-voice-receptionist.html`;
            anchor.querySelectorAll('img').forEach(img => {
                img.src = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800';
                img.removeAttribute('srcset');
                img.setAttribute('data-case-study', 'dental');
            });
        }
    });
}

function patchMoreProjectsTableRows() {
    document.querySelectorAll('a').forEach(anchor => {
        const text = anchor.textContent || '';
        const href = anchor.getAttribute('href') || '';
        
        // Match table rows in the projects table on the homepage
        const isTableRow = (href.includes('case-studies') || href.includes('case-study')) && 
                           text.includes('2026') && 
                           anchor.querySelector('img');
                           
        if (looseMatch(text, 'View full case study') || looseMatch(text, 'View case study') || isTableRow) {
            anchor.querySelectorAll('img').forEach(img => {
                const isViewCaseStudy = looseMatch(text, 'View full case study') || looseMatch(text, 'View case study');
                const src = img.getAttribute('src') || '';
                
                // For table rows, bypass the blacklist check so the thumbnail gets replaced
                if (isTableRow || (isViewCaseStudy && !src.includes('case-study') && !src.includes('realestate') && !src.includes('dental') && !src.includes('ecommerce'))) {
                    img.style.display = 'none';
                    if (isTableRow) {
                        if (!img.parentNode.querySelector('.table-redirect-arrow-wrapper')) {
                            const wrapper = document.createElement('div');
                            wrapper.className = 'table-redirect-arrow-wrapper';
                            wrapper.style.display = 'inline-flex';
                            wrapper.style.alignItems = 'center';
                            wrapper.style.justifyContent = 'center';
                            wrapper.style.width = '14px';
                            wrapper.style.height = '14px';
                            wrapper.style.marginLeft = '8px';
                            wrapper.style.verticalAlign = 'middle';
                            wrapper.innerHTML = `
                                <svg viewBox="0 0 14 14" fill="#0D0D0D" style="width: 14px; height: 14px; display: block; transition: transform 0.2s ease;">
                                  <path d="m11.093 3.637-9.587 9.587L0 11.717 9.587 2.13h-8.08V0h11.717v11.717h-2.13v-8.08Z"></path>
                                </svg>
                            `;
                            img.parentNode.insertBefore(wrapper, img);
                        }
                    } else {
                        if (!img.parentNode.querySelector('.animated-arrow-wrapper')) {
                            const wrapper = document.createElement('div');
                            wrapper.className = 'animated-arrow-wrapper';
                            wrapper.innerHTML = `
                                <svg viewBox="0 0 24 24" class="animated-arrow-svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                  <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            `;
                            img.parentNode.insertBefore(wrapper, img);
                        }
                    }
                }
            });
        }
    });
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        // Register sw.js relative to host root
        navigator.serviceWorker.register('/sw.js')
            .then(reg => {
                console.log('[AmpletechAI] ServiceWorker registered scope:', reg.scope);
                // Auto-reload the page when an update is found and installed
                reg.onupdatefound = () => {
                    const installingWorker = reg.installing;
                    if (installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    console.log('[AmpletechAI] New version installed, reloading page...');
                                    window.location.reload();
                                }
                            }
                        };
                    }
                };
            })
            .catch(err => console.warn('[AmpletechAI] ServiceWorker failed:', err));
    }
}

function fixAccessibilityDuplications() {
    const elements = document.querySelectorAll('span[style*="grid"], span[style*="Grid"]');
    elements.forEach(el => {
        const style = el.getAttribute('style') || '';
        if (style.includes('grid-auto-rows') || style.includes('display:grid') || style.includes('display: grid')) {
            if (el.children.length === 2 && el.children[0].tagName === 'SPAN' && el.children[1].tagName === 'SPAN') {
                const child1 = el.children[0];
                const child2 = el.children[1];
                if (child1.textContent.trim() === child2.textContent.trim() && child1.textContent.trim().length === 1) {
                    child2.setAttribute('aria-hidden', 'true');
                }
            }
        }
    });
}

function removeCaseStudyDateRow() {
    document.querySelectorAll('p').forEach(p => {
        const text = p.textContent || '';
        if (text.trim() === 'Nov 6, 2025' || text.trim() === 'Date:') {
            const row = p.closest('[data-framer-name="Boxed - Desktop"], [data-framer-name="Boxed - Phone"], [data-framer-name="Boxed - Tablet"], .framer-mirVO');
            if (row) {
                row.style.setProperty('display', 'none', 'important');
                row.setAttribute('aria-hidden', 'true');
            } else {
                p.style.setProperty('display', 'none', 'important');
            }
        }
    });
}



