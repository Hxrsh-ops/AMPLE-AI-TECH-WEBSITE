import fs from 'fs';

const mainJsPath = 'src/js/main.js';
let content = fs.readFileSync(mainJsPath, 'utf8');

const patchCode = `
function initCaseStudyMetrics() {
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/index.html');
    if (isHomepage) return;

    // Observe any pre-rendered .case-study-val
    document.querySelectorAll('.case-study-val').forEach(el => {
        observeCustomMetric(null, el);
    });

    // Also observe mutations in case Framer hydrates over it
    // Wait, the HTML is static, so if Framer hydrates, it might overwrite our static HTML with the original Framer content!
    // Oh no, if Framer re-renders, it restores "Automated response"!
}
`;

content = content.replace('function initRuntimeInterceptors() {', 'function initRuntimeInterceptors() {\n    initCaseStudyMetrics();');

content += '\n' + patchCode;
fs.writeFileSync(mainJsPath, content);
console.log('Patched main.js');
