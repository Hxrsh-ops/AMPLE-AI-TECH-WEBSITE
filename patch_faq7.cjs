const fs = require('fs');
let code = fs.readFileSync('src/js/main.js', 'utf-8');

const regex = /function initFaqAccordion\(\) \{[\s\S]*?\}\s*function initRuntimeInterceptors\(\)/;

const newFaq = `function initFaqAccordion() {
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

        const headerPart = container.querySelector('.framer-bvehib') || container;
        headerPart.style.cursor = 'pointer';

        headerPart.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (activeTitle === questionText) return; // already active

            resetAll();

            activeTitle = questionText;
            rightPanelContainer.textContent = answerText;

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
            
            if (titleEl) titleEl.style.setProperty('--extracted-tcooor', activeColors.textColor, 'important');
            if (hrIcon) hrIcon.style.setProperty('background-color', activeColors.iconColor, 'important');
            if (vrIcon) {
                vrIcon.style.setProperty('background-color', activeColors.iconColor, 'important');
                vrIcon.style.transform = 'rotate(90deg)';
            }
        }
    }, 500);
}

function initRuntimeInterceptors()`;

if (code.match(regex)) {
    code = code.replace(regex, newFaq);
    fs.writeFileSync('src/js/main.js', code);
    console.log('Successfully replaced initFaqAccordion with height 51% logic!');
} else {
    console.log('REGEX DID NOT MATCH!');
}
