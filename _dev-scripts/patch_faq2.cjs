const fs = require('fs');
let js = fs.readFileSync('src/js/main.js', 'utf8');

const targetFunctionStr = `        // Clean up any previously added inline dropdown answers
        const oldAnswerDiv = container.querySelector('.amp-faq-answer');
        if (oldAnswerDiv) oldAnswerDiv.remove();`;

const newFunctionStr = `        // Clean up any previously added inline dropdown answers
        const oldAnswerDiv = container.querySelector('.amp-faq-answer');
        if (oldAnswerDiv) oldAnswerDiv.remove();

        // Add mobile inline answer div
        const mobileAnswerDiv = document.createElement('div');
        mobileAnswerDiv.className = 'amp-faq-mobile-answer';
        const mobileAnswerP = document.createElement('p');
        mobileAnswerP.textContent = answerText;
        mobileAnswerDiv.appendChild(mobileAnswerP);
        container.appendChild(mobileAnswerDiv);`;

js = js.replace(targetFunctionStr, newFunctionStr);

const targetClickStr = `            rightPanelContainer.textContent = answerText;

            // Animate transition slightly`;

const newClickStr = `            rightPanelContainer.textContent = answerText;
            
            // Toggle mobile answer visibility
            document.querySelectorAll('.amp-faq-mobile-answer').forEach(el => el.classList.remove('active'));
            const currentMobileAnswer = container.querySelector('.amp-faq-mobile-answer');
            if (currentMobileAnswer) {
                currentMobileAnswer.classList.add('active');
            }

            // Animate transition slightly`;

js = js.replace(targetClickStr, newClickStr);

// Also need to handle the initial state
const targetInitStr = `            if (titleEl) titleEl.style.setProperty('--extracted-tcooor', activeColors.textColor, 'important');
            if (hrIcon) hrIcon.style.setProperty('background-color', activeColors.iconColor, 'important');`;

const newInitStr = `            const initialMobileAnswer = faqContainers[0].querySelector('.amp-faq-mobile-answer');
            if (initialMobileAnswer) initialMobileAnswer.classList.add('active');

            if (titleEl) titleEl.style.setProperty('--extracted-tcooor', activeColors.textColor, 'important');
            if (hrIcon) hrIcon.style.setProperty('background-color', activeColors.iconColor, 'important');`;

js = js.replace(targetInitStr, newInitStr);

fs.writeFileSync('src/js/main.js', js);
console.log("Patched main.js");
