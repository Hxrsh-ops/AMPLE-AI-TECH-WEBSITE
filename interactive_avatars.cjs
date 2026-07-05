const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

$('.amp-premium-avatar').each(function() {
    let initialsNode = $(this).find('.amp-premium-initials');
    let initials = initialsNode.text().trim();
    if (!initials || initials.length === 0) initials = "AA";
    
    let newHtml = `
        <div class="amp-premium-grid"></div>
        <div class="amp-premium-orb"></div>
        <div class="amp-premium-initials">${initials}</div>
        <div class="amp-premium-border"></div>
    `;
    $(this).html(newHtml);
    $(this).removeAttr('style');
});

const styleBlock = `
<style id="amp-premium-avatar-styles">
    .amp-premium-avatar {
        --mouse-x: 50%;
        --mouse-y: 50%;
        width: 100%;
        height: 100%;
        position: relative;
        background: linear-gradient(135deg, #0a0a0a 0%, #030303 100%);
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
    }
    
    .amp-premium-border {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.05);
        pointer-events: none;
        z-index: 5;
        transition: all 0.6s ease;
    }

    .amp-premium-avatar:hover .amp-premium-border {
        border-color: rgba(255,255,255,0.2);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
    }
    
    .amp-premium-grid {
        position: absolute;
        top: -10%; left: -10%; right: -10%; bottom: -10%;
        background-image: 
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
        background-size: 24px 24px;
        background-position: center;
        z-index: 1;
        mask-image: radial-gradient(circle at var(--mouse-x) var(--mouse-y), black 10%, transparent 60%);
        -webkit-mask-image: radial-gradient(circle at var(--mouse-x) var(--mouse-y), black 10%, transparent 60%);
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .amp-premium-orb {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        width: 100%; height: 100%;
        background: radial-gradient(circle 100px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.08) 0%, transparent 70%);
        z-index: 2;
        transition: background 0.4s ease;
        pointer-events: none;
    }
    
    .amp-premium-avatar:hover .amp-premium-orb {
        background: radial-gradient(circle 160px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.18) 0%, transparent 70%);
    }
    
    .amp-premium-initials {
        position: relative;
        z-index: 3;
        color: #ffffff;
        font-family: "TASA Orbiter", "TASA Orbiter Placeholder", sans-serif;
        font-size: 60px;
        font-weight: 700;
        letter-spacing: -2px;
        text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.2);
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
    }

    .amp-premium-avatar:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.8);
    }
    
    .amp-premium-avatar:hover .amp-premium-grid {
        transform: scale(1.05);
    }
    
    .amp-premium-avatar:hover .amp-premium-initials {
        transform: scale(1.1);
        letter-spacing: 2px;
        text-shadow: 0px 0px 30px rgba(255, 255, 255, 0.6);
    }
</style>

<script id="amp-premium-avatar-script">
    document.addEventListener('DOMContentLoaded', () => {
        const avatars = document.querySelectorAll('.amp-premium-avatar');
        avatars.forEach(avatar => {
            avatar.addEventListener('mousemove', (e) => {
                const rect = avatar.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                avatar.style.setProperty('--mouse-x', x + 'px');
                avatar.style.setProperty('--mouse-y', y + 'px');
            });
            avatar.addEventListener('mouseleave', () => {
                avatar.style.setProperty('--mouse-x', '50%');
                avatar.style.setProperty('--mouse-y', '50%');
            });
        });
    });
</script>
`;

$('#amp-premium-avatar-styles').remove();
$('#amp-premium-avatar-script').remove();
$('body').append(styleBlock);

fs.writeFileSync('about-us.html', $.html());
console.log("Interactive premium effects applied.");
