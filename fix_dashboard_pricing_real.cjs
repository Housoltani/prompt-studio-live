const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'components', 'CommandDashboard.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Inject the big glowing Arsenal banner directly into the home screen
const searchFor = `Dein System ist bereit. Du hast <span className="text-amber-400 font-bold">{credits} Sparks</span> zur Verfügung. Was erschaffen wir heute?
          </p>
        </div>
      </div>`;

const replaceWith = `Dein System ist bereit. Du hast <span className="text-amber-400 font-bold">{credits} Sparks</span> zur Verfügung. Was erschaffen wir heute?
          </p>
          
          <Link to="/app/pricing" className="mt-8 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 hover:border-amber-400 p-6 rounded-3xl flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01] shadow-[0_0_30px_rgba(245,158,11,0.2)] block relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all"></div>
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                💎
              </div>
              <div>
                <h3 className="text-2xl font-black text-amber-400 mb-1">Das Ultimative Arsenal (Pricing)</h3>
                <p className="text-slate-300">Wähle deine Spezialeinheit oder lade neues Energon (Sparks) auf.</p>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold transition-colors">
              Arsenal öffnen
            </div>
          </Link>
        </div>
      </div>`;

content = content.replace(searchFor, replaceWith);
fs.writeFileSync(targetFile, content);
console.log('Injected Pricing Banner into CommandDashboard');
