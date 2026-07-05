const fs = require('fs');
let js = fs.readFileSync('src/js/main.js', 'utf8');

// Revert the incorrect injection in click handler
const wrongClickStr = `            const initialMobileAnswer = faqContainers[0].querySelector('.amp-faq-mobile-answer');
            if (initialMobileAnswer) initialMobileAnswer.classList.add('active');

            if (titleEl) titleEl.style.setProperty('--extracted-tcooor', activeColors.textColor, 'important');
            if (hrIcon) hrIcon.style.setProperty('background-color', activeColors.iconColor, 'important');`;

const correctClickStr = `            if (titleEl) titleEl.style.setProperty('--extracted-tcooor', activeColors.textColor, 'important');
            if (hrIcon) hrIcon.style.setProperty('background-color', activeColors.iconColor, 'important');`;

js = js.replace(wrongClickStr, correctClickStr);

// Add the initial active setup at the end of initFaqAccordion
const initialSetupTarget = `            if (bgBottom) {
                bgBottom.style.height = '51%';
                bgBottom.style.transition = 'none'; // instant for initial
            }`;

const initialSetupReplacement = `            if (bgBottom) {
                bgBottom.style.height = '51%';
                bgBottom.style.transition = 'none'; // instant for initial
            }
            const initialMobileAnswer = faqContainers[0].querySelector('.amp-faq-mobile-answer');
            if (initialMobileAnswer) initialMobileAnswer.classList.add('active');`;

js = js.replace(initialSetupTarget, initialSetupReplacement);

fs.writeFileSync('src/js/main.js', js);
console.log("Patched main.js again");
