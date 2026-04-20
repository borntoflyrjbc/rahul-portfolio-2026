import fs from 'fs';
const contents = fs.readFileSync('src/App.tsx', 'utf8');
const newContents = contents.replace(/, aspect: "aspect-\[4\/5\]"/g, '');
fs.writeFileSync('src/App.tsx', newContents);
console.log('Removed all');
