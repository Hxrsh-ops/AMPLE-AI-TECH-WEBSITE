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
        bgTop: '0',
        bgBottom: '0',
        textColor: 'var(--token-53ac5080-809d-430f-8c22-cd6ed2fb990c, rgb(13, 13, 13))',
        iconColor: 'var(--token-53ac5080-809d-430f-8c22-cd6ed2fb990c, rgb(13, 13, 13))'
    };

    const activeColors = {
        bgTop: '1',
        bgBottom: '1',
        textColor: 'var(--token-86429bfd-5f41-491b-a262-970b52647f38, rgb(241, 241, 241))',
        iconColor: 'var(--token-86429bfd-5f41-491b-a262-970b52647f38, rgb(241, 241, 241))'
    };

    function resetAll() {
        faqContainers.forEach(container => {
            const titleEl = container.querySelector('.framer-92l52a');
            const hrIcon = container.querySelector('[data-framer-name="HR"]');
            const vrIcon = container.querySelector('[data-framer-name="VR"]');
            const bgTop = container.querySelector('.framer-1c3c615');
            const bgBottom = container.querySelector('.framer-1244sc4');

            if (titleEl) titleEl.style.setProperty('--extracted-tcooor', defaultColors.textColor, 'important');
            if (hrIcon) hrIcon.style.backgroundColor = defaultColors.iconColor;
            if (vrIcon) {
                vrIcon.style.backgroundColor = defaultColors.iconColor;
                vrIcon.style.transform = 'none'; // Plus sign
                vrIcon.style.opacity = '1';
            }
            if (bgTop) bgTop.style.opacity = defaultColors.bgTop;
            if (bgBottom) bgBottom.style.opacity = defaultColors.bgBottom;
        });
    }

    let activeTitle = null;

    faqContainers.forEach(container => {
        const titleTextEl = container.querySelector('.framer-text');
        if (!titleTextEl) return;
        
        const questionText = titleTextEl.textContent.trim();
        const answerText = faqAnswers[questionText];
        
        if (!answerText) return;

        // Clean up any previously added inline dropdown answers (if they exist from older scripts)
        const oldAnswerDiv = container.querySelector('.amp-faq-answer');
        if (oldAnswerDiv) oldAnswerDiv.remove();
        
        // Remove old click handlers added by framer? No, we will capture event.
        const headerPart = container.querySelector('.framer-bvehib') || container;
        headerPart.style.cursor = 'pointer';
        
        // We capture bubble events to prevent Framer from messing with variants
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

            if (titleEl) titleEl.style.setProperty('--extracted-tcooor', activeColors.textColor, 'important');
            if (hrIcon) hrIcon.style.backgroundColor = activeColors.iconColor;
            if (vrIcon) {
                vrIcon.style.backgroundColor = activeColors.iconColor;
                vrIcon.style.transform = 'rotate(90deg)'; // Minus sign
            }
            if (bgTop) bgTop.style.opacity = activeColors.bgTop;
            if (bgBottom) bgBottom.style.opacity = activeColors.bgBottom;
        }, true); // useCapture to intercept before Framer
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
            
            if (titleEl) titleEl.style.setProperty('--extracted-tcooor', activeColors.textColor, 'important');
            if (hrIcon) hrIcon.style.backgroundColor = activeColors.iconColor;
            if (vrIcon) {
                vrIcon.style.backgroundColor = activeColors.iconColor;
                vrIcon.style.transform = 'rotate(90deg)';
            }
            if (bgTop) bgTop.style.opacity = activeColors.bgTop;
            if (bgBottom) bgBottom.style.opacity = activeColors.bgBottom;
        }
    }, 500);
}

function initRuntimeInterceptors()`;

if (code.match(regex)) {
    code = code.replace(regex, newFaq);
    fs.writeFileSync('src/js/main.js', code);
    console.log('Successfully replaced initFaqAccordion!');
} else {
    console.log('REGEX DID NOT MATCH!');
}
