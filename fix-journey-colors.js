const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components', 'journey');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Text colors
  content = content.replace(/text-white\/([0-9]+)/g, 'text-zinc-600 dark:text-white/$1');
  content = content.replace(/text-white(?!\/)/g, 'text-zinc-900 dark:text-white');
  
  // Borders
  content = content.replace(/border-white\/([0-9]+)/g, 'border-black/$1 dark:border-white/$1');
  
  // Backgrounds
  content = content.replace(/bg-white\/([0-9.]+)/g, 'bg-black/$1 dark:bg-white/$1');
  
  // Prose
  content = content.replace(/prose-invert/g, 'dark:prose-invert');

  // Fix up specific cases
  content = content.replace(/dark:text-white\/(\d+) text-zinc-900 dark:text-white/g, 'text-zinc-900 dark:text-white/$1');
  
  fs.writeFileSync(filePath, content);
}
console.log("Updated journey components to support light mode.");
