import fs from 'fs';

const mainJsPath = 'src/js/main.js';
let content = fs.readFileSync(mainJsPath, 'utf8');

const oldHtml = `                numContainer.innerHTML = \`
                <div style="position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden; user-select:none">
                    <div style="display:flex; align-items:center; justify-content:center; gap:0.05em; font-family:'TASA Orbiter', sans-serif; font-size:64px; font-weight:700; letter-spacing:-1px; line-height:1.2em;">
                        <span class="custom-metric-val case-study-val" data-target="${'${stat.num}'}">0</span><span style="color:var(--framer-text-color, inherit)" class="custom-metric-suffix">${'${stat.suffix}'}</span>
                    </div>
                </div>\`;`;

const newHtml = `                const variant = v.querySelector('.framer-GpCXc');
                const isDark = variant && variant.getAttribute('data-framer-name') && variant.getAttribute('data-framer-name').includes('Dark');
                const textColor = isDark ? 'white' : 'var(--token-53ac5080-809d-430f-8c22-cd6ed2fb990c, rgb(13, 13, 13))';

                numContainer.innerHTML = \`
                <div style="position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden; user-select:none; color: \${textColor};">
                    <div style="display:flex; align-items:center; justify-content:center; gap:0.05em; font-family:'TASA Orbiter', sans-serif; font-size:64px; font-weight:700; letter-spacing:-1px; line-height:1.2em;">
                        <span class="custom-metric-val case-study-val" data-target="\${stat.num}">0</span><span class="custom-metric-suffix">\${stat.suffix}</span>
                    </div>
                </div>\`;`;

if (content.includes('style="color:var(--framer-text-color, inherit)"')) {
    content = content.replace(oldHtml, newHtml);
    fs.writeFileSync(mainJsPath, content);
    console.log('Patched main.js color logic');
} else {
    console.log('Could not find the target string');
}
