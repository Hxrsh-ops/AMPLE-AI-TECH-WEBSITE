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
            { num: 24, suffix: '/7', label: 'Instant order updates' } // Let's use 24 for the animation, then it becomes 24/7
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
    
    // Find all children of .framer-azkep0
    const children = $('.framer-azkep0 > .ssr-variant');
    
    children.each((i, el) => {
        const boxIndex = Math.floor(i / 3);
        const stat = c.stats[boxIndex];
        if (!stat) return;
        
        const container = $(el);
        // Find number container
        const numContainer = container.find('.framer-8rbnoz-container');
        if (numContainer.length > 0) {
            // Replace the contents of the span inside with our animated metric markup
            // The structure is deep, so we can just empty the numContainer and append a simplified version
            // Or better, just find the span that has the number '0' and replace it.
            // But there might be multiple spans.
            // Let's replace the whole framer-8rbnoz-container HTML with a styled text element.
            const newHtml = `
            <div style="position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden; user-select:none">
                <div style="display:flex; align-items:center; justify-content:center; gap:0.05em; font-family:'TASA Orbiter', sans-serif; font-size:64px; font-weight:700; letter-spacing:-1px; line-height:1.2em;">
                    <span class="custom-metric-val case-study-val" data-target="${stat.num}">0</span><span class="custom-metric-suffix">${stat.suffix}</span>
                </div>
            </div>`;
            numContainer.html(newHtml);
        }
        
        // Find label container
        const labelContainer = container.find('.framer-1ui5pkj');
        if (labelContainer.length > 0) {
            labelContainer.find('p').text(stat.label);
        }
    });
    
    fs.writeFileSync(c.file, $.html());
    console.log('Patched', c.file);
});
