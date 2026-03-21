import React, { useState } from 'react';
import { Code, Terminal, Layers, Play, Settings, Monitor, Database, GitBranch, Cpu, Briefcase, ChevronRight, UserCheck } from 'lucide-react';

const DevArchitect = () => {
  const [architecture, setArchitecture] = useState('Next.js Fullstack');
  const [database, setDatabase] = useState('PostgreSQL');
  const [auth, setAuth] = useState('Supabase Auth');
  const [styling, setStyling] = useState('Tailwind CSS');
  const [taskType, setTaskType] = useState('Scaffold');
  const [customInstructions, setCustomInstructions] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const generateCodePrompt = () => {
    const prompt = `Aktiere als Senior Software Architect und Fullstack Developer.

## TECHNOLOGIE-STACK:
- Frontend/Framework: ${architecture}
- Datenbank: ${database}
- Authentifizierung: ${auth}
- Styling: ${styling}

## AUFGABE (${taskType}):
${taskType === 'Scaffold' ? 'Erstelle die Boilerplate und Ordnerstruktur für ein skalierbares Projekt mit diesen Technologien.' : 
 taskType === 'Refactor' ? 'Analysiere den folgenden Code, identifiziere Code Smells und refaktoriere ihn nach SOLID-Prinzipien.' :
 'Schreibe einen Unit-Test für die Hauptkomponente unter Verwendung der gängigen Test-Frameworks für diesen Stack.'}

## ZUSÄTZLICHE ANWEISUNGEN:
${customInstructions || 'Keine speziellen Anweisungen.'}

## OUTPUT-FORMAT:
Bitte liefere strukturierten Code (in Markdown Code-Blöcken) und kurze, prägnante Erklärungen zu Architektur-Entscheidungen. Vermeide unnötiges Füllwort-Blabla.`;
    
    setGeneratedPrompt(prompt);
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/20 shadow-2xl">
        <div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center gap-3">
            <Terminal className="text-emerald-400" size={32} />
            Dev Architect & Code Copilot
          </h2>
          <p className="text-gray-400 mt-2">Präzise Prompts für komplexe Architektur-Entscheidungen, Refactoring und Code-Generierung.</p>
        </div>
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          <Code className="text-emerald-400" size={24} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col - Config */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-400 border-b border-white/10 pb-3">
              <Layers size={20} /> Stack Konfiguration
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                  <Monitor size={14} /> Framework
                </label>
                <select value={architecture} onChange={e => setArchitecture(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-emerald-500 outline-none">
                  <option>Next.js Fullstack (App Router)</option>
                  <option>React SPA (Vite)</option>
                  <option>Vue 3 / Nuxt</option>
                  <option>SvelteKit</option>
                  <option>Node.js / Express API</option>
                  <option>Python / FastAPI</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                  <Database size={14} /> Datenbank
                </label>
                <select value={database} onChange={e => setDatabase(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-emerald-500 outline-none">
                  <option>PostgreSQL (Prisma)</option>
                  <option>MongoDB (Mongoose)</option>
                  <option>Supabase DB</option>
                  <option>Firebase Firestore</option>
                  <option>Keine Datenbank</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                  <UserCheck size={14} /> Authentifizierung
                </label>
                <select value={auth} onChange={e => setAuth(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-emerald-500 outline-none">
                  <option>Supabase Auth</option>
                  <option>NextAuth / Auth.js</option>
                  <option>Clerk</option>
                  <option>Firebase Auth</option>
                  <option>Custom JWT</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                  <Settings size={14} /> Styling
                </label>
                <select value={styling} onChange={e => setStyling(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-emerald-500 outline-none">
                  <option>Tailwind CSS</option>
                  <option>CSS Modules</option>
                  <option>Styled Components</option>
                  <option>Sass/SCSS</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-cyan-400 border-b border-white/10 pb-3">
              <Cpu size={20} /> Aufgaben-Typ
            </h3>
            <div className="flex flex-col gap-2">
              {['Scaffold', 'Refactor', 'Testing', 'Security Audit', 'Performance Opt'].map(task => (
                <button
                  key={task}
                  onClick={() => setTaskType(task)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium text-left flex items-center justify-between transition-all ${taskType === task ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/50 text-emerald-300' : 'bg-black/30 border border-white/5 text-gray-400 hover:border-white/20 hover:text-white'}`}
                >
                  <span className="flex items-center gap-2"><Briefcase size={16} /> {task}</span>
                  {taskType === task && <ChevronRight size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col - Editor & Output */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col h-full">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Terminal size={20} className="text-emerald-400" />
              Spezifische Anweisungen & Logik
            </h3>
            
            <textarea
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className="w-full flex-1 min-h-[120px] bg-black/60 border border-white/10 rounded-xl p-4 text-emerald-50/90 font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-y shadow-inner mb-4"
              placeholder="// Beschreibe spezifische Features, z.B.: 'Integriere Stripe für Subscriptions' oder füge Code ein, der refaktoriert werden soll..."
            />

            <button 
              onClick={generateCodePrompt}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 rounded-xl font-bold text-white shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              <GitBranch size={20} /> Master-Prompt Generieren
            </button>

            {generatedPrompt && (
              <div className="mt-6 animate-fade-in relative group">
                <div className="absolute -top-3 left-4 bg-emerald-600 text-xs px-2 py-1 rounded-md font-bold">Generierter Prompt</div>
                <div className="bg-[#1e1e1e] rounded-xl border border-white/10 overflow-hidden">
                  <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-400 ml-2 font-mono">prompt.md</span>
                  </div>
                  <pre className="p-4 text-sm font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {generatedPrompt}
                  </pre>
                </div>
                <div className="absolute top-12 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 p-2 rounded-lg text-white"
                  >
                    Kopieren
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevArchitect;
