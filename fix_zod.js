const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib/api-zod/src/generated/api.ts');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/zod\.int\(\)/g, 'zod.number().int()');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed zod.int() in api.ts');
