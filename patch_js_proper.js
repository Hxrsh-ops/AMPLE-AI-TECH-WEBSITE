import fs from 'fs';

const mainJsPath = 'src/js/main.js';
let content = fs.readFileSync(mainJsPath, 'utf8');

// Replace the previous patchCode
content = content.replace(/function initCaseStudyMetrics\(\) \{[\s\S]*?\}\n/, '');

const patchCode = `
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
            { num: 40, suffix: '%', label: 'Faster ticket resolution' },
            { num: 24, suffix: '/7', label: 'Instant order updates' }
        ];
    } else if (window.location.pathname.includes('real-estate')) {
        statsData = [
            { num: 1, suffix: 'm', label: 'Lead response time' },
            { num: 60, suffix: '%', label: 'Higher lead conversion' },
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
                numContainer.innerHTML = \`
                <div style="position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden; user-select:none">
                    <div style="display:flex; align-items:center; justify-content:center; gap:0.05em; font-family:'TASA Orbiter', sans-serif; font-size:64px; font-weight:700; letter-spacing:-1px; line-height:1.2em;">
                        <span class="custom-metric-val case-study-val" data-target="\${stat.num}">0</span><span style="color:var(--framer-text-color, inherit)" class="custom-metric-suffix">\${stat.suffix}</span>
                    </div>
                </div>\`;
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
`;

content += '\n' + patchCode;
fs.writeFileSync(mainJsPath, content);
console.log('Patched main.js with robust React hydration override');
