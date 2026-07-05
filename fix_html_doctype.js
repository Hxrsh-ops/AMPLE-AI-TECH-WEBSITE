import fs from 'fs';

function fixDoctype(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace('<!DOCTYPE >', '<!DOCTYPE html>');
    fs.writeFileSync(file, content);
}

fixDoctype('index.html');
fixDoctype('case-studies.html');
fixDoctype('case-studies/dental-clinic-voice-receptionist.html');
fixDoctype('case-studies/ecommerce-support-assistant.html');
fixDoctype('case-studies/real-estate-lead-automation.html');
