const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const newSectionHtml = `
<section id="why-delay-hurts" style="background-color: #0d0d0d; color: #ffffff; padding: 120px 5%; font-family: 'Geist', sans-serif; position: relative; overflow: hidden; width: 100%;">
  <style>
    .wdh-grid { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: space-evenly; pointer-events: none; z-index: 0; }
    .wdh-grid-line { width: 1px; height: 100%; background-color: rgba(255,255,255,0.04); }
    .wdh-container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
    .wdh-header { margin-bottom: 100px; }
    .wdh-label { font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #a3a3a3; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; font-family: 'JetBrains Mono', monospace; }
    .wdh-label::before { content: ''; display: block; width: 6px; height: 6px; border-radius: 50%; background-color: #a3a3a3; }
    .wdh-title { font-size: clamp(40px, 6vw, 72px); line-height: 1.05; font-weight: 700; max-width: 900px; letter-spacing: -0.03em; margin: 0; }
    .wdh-title span { color: #666; }
    .wdh-row { display: flex; align-items: center; justify-content: space-between; padding: 40px 0; border-top: 1px solid rgba(255,255,255,0.08); position: relative; cursor: default; }
    .wdh-row:last-child { border-bottom: 1px solid rgba(255,255,255,0.08); }
    .wdh-row-left { display: flex; align-items: center; gap: 20px; color: #fff; width: 40%; }
    .wdh-row-left span.number { color: #a3a3a3; font-family: 'JetBrains Mono', monospace; font-size: 14px; }
    .wdh-row-left span.text { font-weight: 600; font-family: 'Geist', sans-serif; font-size: 18px; letter-spacing: 0.5px; }
    .wdh-pill-container { position: absolute; left: 40%; right: 20%; height: 100%; display: flex; align-items: center; pointer-events: none; }
    .wdh-pill { background-color: #ffffff; color: #000000; font-weight: 700; font-size: 28px; padding: 12px 36px; border-radius: 50px; position: absolute; transform: translateX(-50%); letter-spacing: -1px; }
    .wdh-row-right { font-family: 'JetBrains Mono', monospace; font-size: 14px; color: #a3a3a3; width: 20%; text-align: right; }
    
    /* Animations */
    .wdh-fade-up { opacity: 0; transform: translateY(40px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
    .wdh-visible .wdh-fade-up { opacity: 1; transform: translateY(0); }
    
    .wdh-row { transition: background-color 0.4s ease; margin: 0 -24px; padding-left: 24px; padding-right: 24px; border-radius: 12px; }
    .wdh-row:hover { background-color: rgba(255,255,255,0.03); }
    .wdh-pill { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.5); pointer-events: auto; }
    .wdh-row:hover .wdh-pill { transform: translateX(-50%) scale(1.08); box-shadow: 0 15px 40px rgba(0,0,0,0.7); }

    @media (max-width: 900px) {
      .wdh-pill-container { position: relative; left: 0; right: 0; height: auto; transform: none; margin: 20px 0; justify-content: flex-start; }
      .wdh-pill { position: relative; left: 0 !important; transform: none !important; padding: 10px 24px; font-size: 20px; }
      .wdh-row { flex-direction: column; align-items: flex-start; padding: 30px 20px; }
      .wdh-row-left { width: 100%; }
      .wdh-row-right { width: 100%; text-align: left; margin-top: 10px; }
      .wdh-row:hover .wdh-pill { transform: scale(1.05) !important; }
    }
  </style>

  <div class="wdh-grid">
    <div class="wdh-grid-line"></div>
    <div class="wdh-grid-line"></div>
    <div class="wdh-grid-line"></div>
    <div class="wdh-grid-line"></div>
  </div>

  <div class="wdh-container" id="wdh-content">
    <div class="wdh-header wdh-fade-up" style="transition-delay: 0.1s;">
      <div class="wdh-label">WHY DELAY HURTS</div>
      <h2 class="wdh-title">THE LONGER YOU WAIT, THE<br>MORE EXPENSIVE IT BECOMES<br><span>TO CATCH UP.</span></h2>
    </div>

    <div class="wdh-list">
      <div class="wdh-row wdh-fade-up" style="transition-delay: 0.2s;">
        <div class="wdh-row-left"><span class="number">01/</span> <span class="text">OPERATIONAL TASKS STAY MANUAL</span></div>
        <div class="wdh-pill-container"><div class="wdh-pill" style="left: 85%;">+83%</div></div>
        <div class="wdh-row-right">/WORKLOAD</div>
      </div>
      <div class="wdh-row wdh-fade-up" style="transition-delay: 0.3s;">
        <div class="wdh-row-left"><span class="number">02/</span> <span class="text">COMPETITORS MOVE FASTER</span></div>
        <div class="wdh-pill-container"><div class="wdh-pill" style="left: 30%;">+55%</div></div>
        <div class="wdh-row-right">/GROWTH</div>
      </div>
      <div class="wdh-row wdh-fade-up" style="transition-delay: 0.4s;">
        <div class="wdh-row-left"><span class="number">03/</span> <span class="text">MISSED AUTOMATION OPPORTUNITIES</span></div>
        <div class="wdh-pill-container"><div class="wdh-pill" style="left: 60%;">+66%</div></div>
        <div class="wdh-row-right">/OPPORTUNITIES</div>
      </div>
      <div class="wdh-row wdh-fade-up" style="transition-delay: 0.5s;">
        <div class="wdh-row-left"><span class="number">04/</span> <span class="text">TIME WASTED ON REPETITIVE WORK</span></div>
        <div class="wdh-pill-container"><div class="wdh-pill" style="left: 10%;">+32%</div></div>
        <div class="wdh-row-right">/TIME</div>
      </div>
    </div>
  </div>

  <script>
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('wdh-visible');
          }
        });
      }, { threshold: 0.1 });
      
      const content = document.getElementById('wdh-content');
      if (content) observer.observe(content);
    }, 500);
  </script>
</section>
`;

const teamSection = $('section[data-framer-name="Team"]');
if (teamSection.length > 0) {
  teamSection.replaceWith(newSectionHtml);
  fs.writeFileSync('index.html', $.html());
  console.log("Successfully replaced Team section with Why Delay Hurts section.");
} else {
  console.error("Team section not found!");
}
