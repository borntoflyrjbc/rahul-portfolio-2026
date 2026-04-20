const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/aspect:"aspect-video"/g, 'aspect:"horizontal"');
code = code.replace(/aspect:"aspect-\[9\/16\]"/g, 'aspect:"vertical"');

fs.writeFileSync('src/App.tsx', code);
