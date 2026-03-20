import fs from 'fs';

const filePath = './prompt-studio-live/src/i18n.js';
let content = fs.readFileSync(filePath, 'utf8');

// The original App.jsx used hardcoded categories that I replaced with t.categories?.[category] || category.
// However, the object is generated in App.jsx as:
// const cat = tab.category || 'MENÜ';
// which translates to keys like 'KREATION & GENERATOREN'.
