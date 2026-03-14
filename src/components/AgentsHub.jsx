import React from 'react';
import { toast } from 'react-hot-toast';

const categories = [
  {
    title: "Produktivität & Office",
    agents: [
      { name: "Super-Agent", icon: "🦸‍♂️", color: "from-blue-500 to-indigo-600" },
      { name: "KI-Dokumente", icon: "📄", color: "from-sky-400 to-blue-500" },
      { name: "KI-Tabellen", icon: "📊", color: "from-emerald-400 to-teal-500" },
      { name: "Präsentationen", icon: "📽️", color: "from-rose-400 to-red-500" },
      { name: "Besprechungen", icon: "🤝", color: "from-orange-400 to-amber-500" },
    ]
  },
  {
    title: "Kreativität & Medien",
    agents: [
      { name: "KI-Bild", icon: "🖼️", color: "from-pink-500 to-rose-500" },
      { name: "KI-Video", icon: "🎬", color: "from-fuchsia-500 to-purple-600" },
      { name: "KI-Designer", icon: "✨", color: "from-violet-400 to-purple-500" },
      { name: "Audio & Pods", icon: "🎙️", color: "from-yellow-400 to-orange-500" },
      { name: "Clip-Genie", icon: "✂️", color: "from-red-500 to-rose-600" },
    ]
  },
  {
    title: "Entwicklung & Forschung",
    agents: [
      { name: "KI-Entwickler", icon: "💻", color: "from-slate-600 to-slate-800" },
      { name: "Tiefenrecherche", icon: "🔍", color: "from-cyan-500 to-blue-600" },
      { name: "Faktencheck", icon: "✅", color: "from-emerald-500 to-green-600" },
      { name: "Übersetzer", icon: "🌍", color: "from-indigo-400 to-blue-500" },
      { name: "Eigener Agent", icon: "⚙️", color: "from-gray-500 to-slate-600" },
    ]
  }
];

export default function AgentsHub() {
  const handleAgentClick = (name) => {
    toast.success(`System aktiviert: ${name} bootet...`, {
      icon: '🤖',
      style: { background: '#1e293b', color: '#fff' }
    });
  };

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4 pb-12">
      <h2 className="text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 tracking-tight">
        🤖 Agenten Hub
      </h2>
      <p className="text-slate-400 mb-10 text-lg max-w-2xl">
        Dein Kommandozentrum. Wähle einen hochspezialisierten KI-Assistenten für deine nächste Mission. Jeder Agent ist auf sein Fachgebiet trainiert.
      </p>

      <div className="space-y-12">
        {categories.map((cat, idx) => (
          <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <h3 className="text-xl font-bold text-slate-200 mb-6 border-b border-slate-700/50 pb-3 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full inline-block"></span>
              {cat.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {cat.agents.map((agent, aIdx) => (
                <div 
                  key={aIdx} 
                  onClick={() => handleAgentClick(agent.name)}
                  className="glass-card bg-slate-800/40 hover:bg-slate-700/60 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center cursor-pointer group transition-all duration-300 hover:-translate-y-2 border border-slate-700/50 hover:border-blue-500/30"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {agent.icon}
                  </div>
                  <span className="font-bold text-slate-200 text-sm group-hover:text-blue-400 transition-colors">{agent.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
