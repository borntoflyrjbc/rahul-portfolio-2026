import fs from 'fs';
const contents = fs.readFileSync('src/App.tsx', 'utf8');
const count = (contents.match(/aspect-\[4\/5\]/g) || []).length;
console.log(count);
