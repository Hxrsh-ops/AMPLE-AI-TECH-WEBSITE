import fs from 'fs';
import * as cheerio from 'cheerio';

const cases = [
    {
        file: 'case-studies/dental-clinic-voice-receptionist.html',
        stats: [
            { num: 100, suffix: '%', label: 'Missed calls eliminated' },
            { num: 40, suffix: '+', label: 'Hours saved per week' },
            { num: 25, suffix: '%', label: 'Increase in booked appointments' }
        ]
    },
    {
        file: 'case-studies/ecommerce-support-assistant.html',
        stats: [
            { num: 85, suffix: '%', label: 'Automated response rate' },
            { num: 40, suffix: '%', label: 'Faster ticket resolution' },
            { num: 24, suffix: '/7', label: 'Instant order updates' }
        ]
    },
    {
        file: 'case-studies/real-estate-lead-automation.html',
        stats: [
            { num: 1, suffix: 'm', label: 'Lead response time' },
            { num: 60, suffix: '%', label: 'Higher lead conversion' },
            { num: 100, suffix: '%', label: 'Inquiries captured instantly' }
        ]
    }
];

cases.forEach(c => {
    let content = fs.readFileSync(c.file, 'utf8');
    let $ = cheerio.load(content);
    
    const children = $('.framer-azkep0 > .ssr-variant');
    
    children.each((i, el) => {
        const boxIndex = Math.floor(i / 3);
        const stat = c.stats[boxIndex];
        if (!stat) return;
        
        const container = $(el);
        const numContainer = container.find('.framer-8rbnoz-container');
        if (numContainer.length > 0) {
            const variant = container.find('.framer-GpCXc');
            const isDark = variant.attr('data-framer-name') && variant.attr('data-framer-name').includes('Dark');
            const textColor = isDark ? 'white' : 'var(--token-53ac5080-809d-430f-8c22-cd6ed2fb990c, rgb(13, 13, 13))';

            const newHtml = `
            <div style="position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden; user-select:none; color: ${textColor};">
                <div style="display:flex; align-items:center; justify-content:center; gap:0.05em; font-family:'TASA Orbiter', sans-serif; font-size:64px; font-weight:700; letter-spacing:-1px; line-height:1.2em;">
                    <span class="custom-metric-val case-study-val" data-target="${stat.num}">0</span><span class="custom-metric-suffix">${stat.suffix}</span>
                </div>
            </div>`;
            numContainer.html(newHtml);
        }
        
        const labelContainer = container.find('.framer-1ui5pkj');
        if (labelContainer.length > 0) {
            labelContainer.find('p').text(stat.label);
        }
    });
    
    fs.writeFileSync(c.file, $.html());
    console.log('Patched colors', c.file);
});
