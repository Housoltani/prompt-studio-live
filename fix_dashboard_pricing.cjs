const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'components', 'CommandDashboard.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Insert a button into the CommandDashboard header or grid
if (!content.includes('navigate("/app/pricing")')) {
  content = content.replace(
    "import { useLanguage } from '../context/LanguageContext';",
    "import { useLanguage } from '../context/LanguageContext';\nimport { useNavigate } from 'react-router-dom';\nimport { Diamond } from 'lucide-react';"
  );
  
  if (!content.includes('const navigate = useNavigate()')) {
    content = content.replace(
      "const { t } = useLanguage();",
      "const { t } = useLanguage();\n  const navigate = useNavigate();"
    );
  }

  // Find a good place to inject the banner. Let's put it right after the welcome text.
  const findHeader = `<h1 className="text-4xl font-black mb-2">{t.dashboardTitle}</h1>
          <p className="text-slate-400">{t.dashboardSubtitle}</p>`;
  
  const replaceHeader = `<h1 className="text-4xl font-black mb-2">{t.dashboardTitle}</h1>
          <p className="text-slate-400 mb-6">{t.dashboardSubtitle}</p>
          
          <div 
            onClick={() => navigate('/app/pricing')}
            className="w-full md:w-2/3 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/50 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-cyan-400 transition-all group shadow-[0_0_20px_rgba(6,182,212,0.15)] mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Diamond className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">Das Arsenal & Pricing</h3>
                <p className="text-sm text-cyan-200/60">Entdecke die neuen Spezialeinheiten-Pässe und lade Sparks auf.</p>
              </div>
            </div>
            <button className="hidden md:block px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-colors">
              Arsenal öffnen
            </button>
          </div>`;

  if (content.includes(findHeader)) {
    content = content.replace(findHeader, replaceHeader);
    fs.writeFileSync(targetFile, content);
    console.log("Injected pricing banner into CommandDashboard");
  } else {
    console.log("Could not find header in CommandDashboard");
  }
}
