const fs = require('fs');

let code = fs.readFileSync('src/js/main.js', 'utf-8');

const marqueeFunc = `
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
    const marqueeHTML = \`
        <div class="ample-tech-marquee-wrapper">
           <div class="ample-tech-header">
               <span class="wdh-label">Our Stack</span>
               <h2>Powered by Industry-Leading AI</h2>
           </div>
           
           <div class="ample-marquee-container">
               <div class="ample-marquee-track">
                   <div class="ample-marquee-content">
                       <span class="tech-item"><span class="tech-icon">⌘</span> OpenAI</span>
                       <span class="tech-item"><span class="tech-icon">⚡</span> Supabase</span>
                       <span class="tech-item"><span class="tech-icon">∞</span> n8n</span>
                       <span class="tech-item"><span class="tech-icon">🎙️</span> ElevenLabs</span>
                       <span class="tech-item"><span class="tech-icon">△</span> Vercel</span>
                       <span class="tech-item"><span class="tech-icon">☁️</span> Google Cloud</span>
                       <span class="tech-item"><span class="tech-icon">A</span> Anthropic</span>
                       <span class="tech-item"><span class="tech-icon">❋</span> Stripe</span>
                   </div>
                   <!-- Duplicate for infinite scroll -->
                   <div class="ample-marquee-content" aria-hidden="true">
                       <span class="tech-item"><span class="tech-icon">⌘</span> OpenAI</span>
                       <span class="tech-item"><span class="tech-icon">⚡</span> Supabase</span>
                       <span class="tech-item"><span class="tech-icon">∞</span> n8n</span>
                       <span class="tech-item"><span class="tech-icon">🎙️</span> ElevenLabs</span>
                       <span class="tech-item"><span class="tech-icon">△</span> Vercel</span>
                       <span class="tech-item"><span class="tech-icon">☁️</span> Google Cloud</span>
                       <span class="tech-item"><span class="tech-icon">A</span> Anthropic</span>
                       <span class="tech-item"><span class="tech-icon">❋</span> Stripe</span>
                   </div>
               </div>
           </div>
        </div>
    \`;
    
    clientsSec.insertAdjacentHTML('beforeend', marqueeHTML);
    
    // Ensure section styles accommodate the custom layout
    clientsSec.style.padding = '120px 0';
    clientsSec.style.display = 'flex';
    clientsSec.style.justifyContent = 'center';
    clientsSec.style.alignItems = 'center';
}
`;

// Insert the function definition
code = code.replace('function initRuntimeInterceptors() {', marqueeFunc + '\nfunction initRuntimeInterceptors() {');

// Call the function
code = code.replace('initCustomMetrics();', 'initCustomMetrics();\n    initTechStackMarquee();');

fs.writeFileSync('src/js/main.js', code);
console.log('Patched main.js with Tech Stack Marquee!');
