import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { soundEngine } from '../utils/SoundEngine';

const initialCategories = [
  {
    id: 'prod',
    title: "Produktivität & Office",
    agents: [
      { id: "super_agent", name: "Super-Agent", icon: "🦸‍♂️", color: "from-blue-500 to-indigo-600", model: "GPT-4 Omni", prompt: "Du bist ein extrem fähiger, allumfassender Super-Agent." },
      { id: "doc_agent", name: "KI-Dokumente", icon: "📄", color: "from-sky-400 to-blue-500", model: "Claude 3.5 Sonnet", prompt: "Du bist ein exzellenter Texter für formelle Dokumente, Briefe und Berichte." },
      { id: "sheet_agent", name: "KI-Tabellen", icon: "📊", color: "from-emerald-400 to-teal-500", model: "GPT-4 Omni", prompt: "Du bist ein Excel- und Google Sheets Experte." }
    ]
  },
  {
    id: 'creative',
    title: "Kreativität & Medien",
    agents: [
      { id: "design_agent", name: "KI-Designer", icon: "✨", color: "from-violet-400 to-purple-500", model: "Claude 3.5 Sonnet", prompt: "Du bist ein UX/UI Design Experte." },
      { id: "clip_agent", name: "Clip-Genie", icon: "✂️", color: "from-red-500 to-rose-600", model: "Kling 3.0", prompt: "Erstelle virale Video-Skripte." }
    ]
  }
];

export default function AgentsHub() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(initialCategories);
  const [activeTab, setActiveTab] = useState('hub'); // 'hub' or 'factory'
  const [searchQuery, setSearchQuery] = useState('');

  // Factory State
  const [newAgent, setNewAgent] = useState({
    name: '',
    icon: '🤖',
    model: 'GPT-4 Omni',
    prompt: '',
    color: 'from-fuchsia-500 to-purple-600'
  });

  const handleLaunchAgent = (agent) => {
    soundEngine.playTransform();
    toast.success(`Uplink zu Agent "${agent.name}" etabliert!`, { icon: agent.icon });
    // Navigate to Live Generator with this persona pre-selected (mocked via state/URL param in a real app)
    setTimeout(() => navigate('/app/generator'), 800);
  };

  const handleCreateAgent = (e) => {
    e.preventDefault();
    if (!newAgent.name || !newAgent.prompt) {
      toast.error('Name und System-Prompt sind erforderlich!');
      return;
    }
    
    soundEngine.playSuccess();
    
    // Add to a "My Agents" category
    const customAgent = { ...newAgent, id: 'custom_' + Date.now() };
    
    setCategories(prev => {
      const myCat = prev.find(c => c.id === 'custom');
      if (myCat) {
        return prev.map(c => c.id === 'custom' ? { ...c, agents: [...c.agents, customAgent] } : c);
      } else {
        return [{ id: 'custom', title: 'Meine Agenten (Custom)', agents: [customAgent] }, ...prev];
      }
    });

    toast.success(`Agent "${newAgent.name}" erfolgreich erschaffen!`, { icon: '✨' });
    setNewAgent({ name: '', icon: '🤖', model: 'GPT-4 Omni', prompt: '', color: 'from-fuchsia-500 to-purple-600' });
    setActiveTab('hub');
  };

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4 px-4 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <div className="inline-block bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            Digitales Personal
          </div>
          <h2 className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tight">
            🤖 Agenten Hub
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Heuere hochspezialisierte KI-Mitarbeiter an oder konstruiere eigene autonome Agenten für deine Workflows.
          </p>
        </div>
        
        {/* Toggle Mode */}
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-700 shadow-inner">
          <button 
            onClick={() => { setActiveTab('hub'); soundEngine.playPop(); }}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'hub' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            🏢 Agenten Basis
          </button>
          <button 
            onClick={() => { setActiveTab('factory'); soundEngine.playPop(); }}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'factory' ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            <span>⚡</span> Agenten-Fabrik
          </button>
        </div>
      </div>

      {activeTab === 'hub' ? (
        <div className="animate-fade-in">
          {/* SEARCH */}
          <div className="relative max-w-xl mb-10">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">🔍</span>
            <input 
              type="text" 
              placeholder="Agenten durchsuchen (z.B. 'SEO', 'Design')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-blue-500 shadow-2xl transition-all"
            />
          </div>

          {/* CATEGORIES & AGENTS */}
          <div className="space-y-12">
            {categories.map((category) => {
              const filteredAgents = category.agents.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.prompt.toLowerCase().includes(searchQuery.toLowerCase()));
              if (filteredAgents.length === 0) return null;

              return (
                <div key={category.id} className="relative">
                  <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                    {category.title}
                    <div className="h-px bg-slate-800 flex-1 ml-4"></div>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAgents.map((agent) => (
                      <div 
                        key={agent.id} 
                        onClick={() => handleLaunchAgent(agent)}
                        className="glass-card p-6 rounded-[2rem] border border-slate-700/50 hover:border-blue-500/50 hover:-translate-y-1 transition-all cursor-pointer group bg-slate-900/60 relative overflow-hidden"
                      >
                        {/* Hover Glow */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${agent.color} rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity`}></div>
                        
                        <div className="flex items-start justify-between mb-4 relative z-10">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                            {agent.icon}
                          </div>
                          <span className="bg-slate-950/80 text-slate-400 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-slate-800">
                            {agent.model.split(' ')[0]}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-white mb-2 relative z-10 group-hover:text-blue-400 transition-colors">{agent.name}</h4>
                        <p className="text-sm text-slate-400 line-clamp-2 relative z-10">{agent.prompt}</p>
                        
                        <div className="mt-6 flex items-center justify-between border-t border-slate-800/50 pt-4 relative z-10">
                          <span className="text-xs font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            Uplink starten <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* FACTORY MODE */
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <div className="glass-panel p-8 rounded-[2rem] border border-fuchsia-500/30 bg-slate-900/80 shadow-[0_0_40px_rgba(217,70,239,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <h3 className="text-2xl font-black text-white mb-6">Agenten-Parameter</h3>
            
            <form onSubmit={handleCreateAgent} className="space-y-6 relative z-10">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Avatar</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={newAgent.icon}
                      onChange={(e) => setNewAgent({...newAgent, icon: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 text-center text-2xl focus:border-fuchsia-500 outline-none"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Agenten Name</label>
                  <input 
                    type="text" 
                    placeholder="z.B. Code-Ninja 3000"
                    value={newAgent.name}
                    onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 text-white focus:border-fuchsia-500 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Basis Modell (Gehirn)</label>
                <select 
                  value={newAgent.model}
                  onChange={(e) => setNewAgent({...newAgent, model: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 text-white focus:border-fuchsia-500 outline-none text-sm appearance-none"
                >
                  <option>GPT-4 Omni</option>
                  <option>Claude 3.5 Sonnet</option>
                  <option>DeepSeek V3</option>
                  <option>Kimi K2.5</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex justify-between">
                  System-Prompt (Persönlichkeit)
                  <span className="text-fuchsia-400">Der wichtigste Teil</span>
                </label>
                <textarea 
                  placeholder="Du bist ein Experte für... Deine Aufgabe ist es... Antworte immer im Format..."
                  value={newAgent.prompt}
                  onChange={(e) => setNewAgent({...newAgent, prompt: e.target.value})}
                  className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 focus:border-fuchsia-500 outline-none text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Energie-Signatur (Farbe)</label>
                <div className="flex gap-3">
                  {['from-fuchsia-500 to-purple-600', 'from-blue-500 to-cyan-500', 'from-emerald-400 to-teal-500', 'from-orange-400 to-red-500'].map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewAgent({...newAgent, color})}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} transition-transform ${newAgent.color === color ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-50 hover:opacity-100'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2"
                >
                  <span className="text-xl">⚡</span> Agent konstruieren
                </button>
              </div>
            </form>
          </div>

          {/* LIVE PREVIEW */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8">Live ID-Karte Vorschau</div>
            
            <div className="glass-card p-6 rounded-[2rem] border border-fuchsia-500/50 shadow-[0_0_50px_rgba(217,70,239,0.2)] bg-slate-900/60 relative overflow-hidden w-full max-w-sm transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${newAgent.color} rounded-full blur-[60px] opacity-40 animate-pulse`}></div>
              
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${newAgent.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {newAgent.icon || '🤖'}
                </div>
                <span className="bg-slate-950/80 text-slate-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md border border-slate-800 shadow-inner">
                  {newAgent.model.split(' ')[0]}
                </span>
              </div>
              
              <h4 className="text-xl font-bold text-white mb-2 relative z-10">{newAgent.name || 'Unbenannter Agent'}</h4>
              <p className="text-sm text-slate-400 relative z-10 min-h-[40px]">
                {newAgent.prompt ? (newAgent.prompt.length > 80 ? newAgent.prompt.substring(0, 80) + '...' : newAgent.prompt) : 'Die Persönlichkeit und Aufgaben dieses Agenten werden hier angezeigt.'}
              </p>
              
              <div className="mt-6 pt-4 border-t border-slate-800/50 relative z-10 flex justify-between items-center">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                </div>
                <span className="text-xs font-bold text-fuchsia-400 flex items-center gap-1">
                  Bereit für Konstruktion
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}