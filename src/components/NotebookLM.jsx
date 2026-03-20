import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';

export default function NotebookLM() {
  const { t } = useLanguage();
  const [sources, setSources] = useState([
    { id: 1, name: 'Prompt Engineering Guide.pdf', type: 'pdf', status: 'ready', size: '2.4 MB' },
    { id: 2, name: 'Sora 2 Documentation', type: 'url', status: 'ready', size: '-' }
  ]);
  const [activeTab, setActiveTab] = useState('chat'); // chat, podcast, notes
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Ich habe die 2 Quellen analysiert. Was möchtest du wissen?' }
  ]);
  const [input, setInput] = useState('');
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);

  const handleUpload = () => {
    soundEngine.playClick();
    toast.success('Dokument hochgeladen und zur Analyse eingereiht.');
    setSources([...sources, { id: Date.now(), name: 'Neues_Dokument.pdf', type: 'pdf', status: 'processing', size: '1.1 MB' }]);
    setTimeout(() => {
      setSources(prev => prev.map(s => s.status === 'processing' ? { ...s, status: 'ready' } : s));
      soundEngine.playSuccess();
      toast.success('Analyse abgeschlossen.');
    }, 3000);
  };

  const handleChat = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    soundEngine.playClick();
    const newMsg = { role: 'user', content: input };
    setChatMessages([...chatMessages, newMsg]);
    setInput('');
    
    setTimeout(() => {
      soundEngine.playPop();
      setChatMessages(prev => [...prev, { role: 'assistant', content: `Basierend auf 'Prompt Engineering Guide.pdf' (Seite 14): Hier ist eine strukturierte Antwort zu deiner Frage...` }]);
    }, 1500);
  };

  const handleGeneratePodcast = () => {
    soundEngine.playTransform();
    setIsGeneratingPodcast(true);
    toast('Generiere Audio-Diskussion (Deep Dive)...', { icon: '🎙️' });
    setTimeout(() => {
      setIsGeneratingPodcast(false);
      soundEngine.playSuccess();
      toast.success('Podcast-Episode erfolgreich erstellt!');
      setActiveTab('podcast_player');
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-20 mt-4 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex-shrink-0 flex justify-between items-end mb-2 px-4">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 tracking-tight">
            📚 Notebook LM <span className="text-sm bg-blue-500/20 text-blue-400 px-2 py-1 rounded ml-2 align-middle">Beta</span>
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Lade deine eigenen Dokumente, PDFs oder URLs hoch. Die KI versteht sie komplett, beantwortet Fragen und generiert sogar <b>Audio-Podcasts</b> aus deinen Quellen.
          </p>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0 px-4">
        
        {/* LEFT PANEL: SOURCES */}
        <div className="w-80 glass-panel border border-slate-700/50 rounded-3xl p-6 bg-slate-900/80 flex flex-col flex-shrink-0">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-white">Quellen ({sources.length})</h3>
            <button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
              +
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto flex-1">
            {sources.map(source => (
              <div key={source.id} className="bg-slate-950/50 border border-slate-800 p-3 rounded-xl flex items-start gap-3 hover:border-blue-500/30 transition-colors cursor-pointer group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${source.type === 'pdf' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {source.type === 'pdf' ? '📄' : '🔗'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-200 truncate group-hover:text-blue-400 transition-colors">{source.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">{source.size}</span>
                    {source.status === 'processing' ? (
                      <span className="text-[10px] text-amber-400 flex items-center gap-1"><span className="w-2 h-2 border border-amber-400 border-t-transparent rounded-full animate-spin"></span> Analysiere...</span>
                    ) : (
                      <span className="text-[10px] text-emerald-400">Gelesen</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
             <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-bold rounded-xl transition-colors">
               Quellen verwalten
             </button>
          </div>
        </div>

        {/* RIGHT PANEL: INTERACTION */}
        <div className="flex-1 glass-panel border border-slate-700/50 rounded-3xl bg-slate-900/80 flex flex-col overflow-hidden relative">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/50 p-2 gap-2">
            <button onClick={() => setActiveTab('chat')} className={`px-6 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === 'chat' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              💬 Chat
            </button>
            <button onClick={() => setActiveTab('notes')} className={`px-6 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === 'notes' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              📝 Zusammenfassung
            </button>
            <button onClick={() => setActiveTab('podcast_player')} className={`px-6 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${activeTab === 'podcast_player' ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              🎧 Audio Deep Dive
            </button>
          </div>

          {/* CHAT TAB */}
          {activeTab === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl shadow-lg flex-shrink-0">
                        🤖
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-sm'}`}>
                      <p className="text-[15px] leading-relaxed">{msg.content}</p>
                      {msg.role === 'assistant' && i !== 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-700/50 flex gap-2">
                           <span className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-400 cursor-pointer hover:text-blue-400 border border-slate-700">[1] Prompt Engineering Guide (S. 14)</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-950 border-t border-slate-800">
                <form onSubmit={handleChat} className="relative flex items-center bg-slate-900 rounded-xl border border-slate-700 p-1">
                  <input 
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Stelle eine Frage zu deinen Dokumenten..." 
                    className="flex-1 bg-transparent border-none focus:outline-none text-white px-4 py-3 placeholder-slate-500"
                  />
                  <button type="submit" className="w-10 h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center transition-colors mr-1">
                    ↑
                  </button>
                </form>
              </div>
            </>
          )}

          {/* PODCAST TAB */}
          {activeTab === 'podcast_player' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
               <div className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
                 {/* Visualizer Background */}
                 <div className="absolute inset-0 opacity-20 flex items-end justify-center gap-1 pb-10">
                   {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                     <div key={i} className="w-4 bg-purple-500 rounded-t-sm" style={{ height: `${Math.random() * 60 + 10}%` }}></div>
                   ))}
                 </div>
                 
                 <div className="relative z-10 text-center">
                   <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(147,51,234,0.4)] mb-6">
                     🎙️
                   </div>
                   <h3 className="text-2xl font-black text-white mb-2">Deep Dive: Prompt Engineering & Sora 2</h3>
                   <p className="text-slate-400 mb-8">Zwei KI-Hosts diskutieren deine Dokumente (12:45 Min)</p>
                   
                   {/* Audio Player Controls */}
                   <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex items-center gap-4">
                     <button className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-105 transition-transform">
                       ▶️
                     </button>
                     <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full w-1/3 bg-purple-500"></div>
                     </div>
                     <span className="text-xs font-mono text-slate-400">04:12</span>
                   </div>
                 </div>
               </div>

               <div className="mt-8 text-center">
                 <p className="text-slate-500 mb-4 text-sm">Fehlt eine Information im Podcast?</p>
                 <button onClick={handleGeneratePodcast} disabled={isGeneratingPodcast} className="bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 mx-auto">
                   {isGeneratingPodcast ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span> : '🔄'}
                   {isGeneratingPodcast ? 'Generiere neue Episode...' : 'Podcast neu generieren'}
                 </button>
               </div>
            </div>
          )}

          {/* NOTES TAB */}
          {activeTab === 'notes' && (
            <div className="flex-1 p-8 overflow-y-auto prose prose-invert max-w-none">
               <h2 className="text-slate-200">Zusammenfassung der Quellen</h2>
               <p className="text-slate-400">Automatisch generiertes Briefing basierend auf 2 Dokumenten.</p>
               <hr className="border-slate-800 my-6" />
               <h3>Kernaussagen</h3>
               <ul>
                 <li>Das Geheimnis guter Prompts liegt in der Strukturierung nach dem "Role-Task-Context" Modell.</li>
                 <li>Sora 2 benötigt präzise Kamerabefehle (z.B. "FPV Drone", "Slow Panning"), um Bewegungen physikalisch korrekt zu rendern.</li>
               </ul>
               <button className="mt-4 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm border border-slate-700">📋 In Workspace kopieren</button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
