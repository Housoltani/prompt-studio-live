const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Remove Language Switcher from the bottom
content = content.replace(
  /\{\/\* --- LANGUAGE SWITCHER ---\[\s\S]*?<\/div>\s*<\/div>/,
  `</div>`
);

// Fallback if regex misses
const langSwitcherBlock = `{/* --- LANGUAGE SWITCHER --- */}
        <div className="mt-8 border-t border-slate-700/50 pt-4 flex justify-between gap-2">
          <button onClick={() => setLang('de')} className={\`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors \${lang === 'de' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}\`}>DE</button>
          <button onClick={() => setLang('en')} className={\`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors \${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}\`}>EN</button>
          <button onClick={() => setLang('ar')} className={\`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors \${lang === 'ar' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}\`}>AR</button>
        </div>`;
content = content.replace(langSwitcherBlock, '');

// 2. Add the globe to the Global Header
const globeIconHTML = `
             {/* Desktop Language Switcher (Globe) */}
             <button 
                onClick={() => {
                  if (lang === 'de') setLang('en');
                  else if (lang === 'en') setLang('ar');
                  else setLang('de');
                }}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all group shadow-lg"
                title="Sprache wechseln"
             >
               <span className="text-lg group-hover:rotate-180 transition-transform duration-500">🌍</span>
               <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase shadow-md">{lang}</span>
             </button>
`;

const headerInjectTarget = `<div className="flex items-center gap-4">`;
content = content.replace(headerInjectTarget, headerInjectTarget + globeIconHTML);

// 3. Change some colors (e.g., bg-slate-900 -> bg-[#0a0a0a], text-gradient to purple/cyan)
content = content.replace(/from-blue-400 via-indigo-400 to-emerald-400/g, 'from-purple-400 via-fuchsia-400 to-cyan-400');
content = content.replace(/bg-blue-600/g, 'bg-purple-600');
content = content.replace(/text-blue-400/g, 'text-purple-400');
content = content.replace(/ring-blue-500/g, 'ring-purple-500');
content = content.replace(/border-blue-500/g, 'border-purple-500');

fs.writeFileSync(appPath, content);
console.log('App.jsx updated!');
