const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

const oldGlobe = `<button 
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
             </button>`;

const newGlobe = `<div className="hidden md:flex relative group">
                <button 
                  onClick={() => {
                    if (lang === 'de') setLang('en');
                    else if (lang === 'en') setLang('ar');
                    else setLang('de');
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all shadow-lg overflow-hidden"
                  title="Sprache wechseln"
                >
                  <span className="text-xl group-hover:rotate-[360deg] transition-transform duration-700">🔮</span>
                </button>
                <div className="absolute -top-1 -right-1 bg-gradient-to-tr from-fuchsia-600 to-purple-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase shadow-lg border border-white/20">
                  {lang}
                </div>
              </div>`;

content = content.replace(oldGlobe, newGlobe);
fs.writeFileSync(appPath, content);
console.log('Fixed globe button with relative wrapper and cool icon!');
