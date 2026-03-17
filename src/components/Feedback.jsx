import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function Feedback() {
  const [activeTab, setActiveTab] = useState('roadmap'); // 'roadmap' or 'submit'
  
  // Form State
  const [feedbackType, setFeedbackType] = useState('idea');
  const [message, setMessage] = useState('');
  const [includeDiagnostics, setIncludeDiagnostics] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Roadmap Data
  const [roadmapItems, setRoadmapItems] = useState([
    { id: 1, title: 'Midjourney V6.1 Integration', desc: 'Direkte Anbindung an die neue Midjourney API für nahtlose Bildgenerierung.', votes: 342, status: 'planned' },
    { id: 2, title: 'Suno v3 Support im Music Lab', desc: 'Erweiterte Metatags und neue Audio-Modelle für die Musikbibliothek.', votes: 215, status: 'in-progress' },
    { id: 3, title: 'Export nach Notion / Obsidian', desc: 'Ein-Klick-Export von Prompt-Workflows in gängige Notiz-Tools.', votes: 189, status: 'under-review' },
    { id: 4, title: 'Kling Video API', desc: 'Integration des Kling Modells in den Universal Live Generator.', votes: 156, status: 'planned' },
    { id: 5, title: 'Dark/Light Theme Switch', desc: 'Optionales helles Design für Arbeiten bei Tageslicht.', votes: 45, status: 'completed' },
  ]);

  const [systemInfo, setSystemInfo] = useState({});

  useEffect(() => {
    // Gather system diagnostics
    setSystemInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screen: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      time: new Date().toISOString(),
    });
  }, []);

  const handleVote = (id) => {
    setRoadmapItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, votes: item.votes + 1 };
      }
      return item;
    }).sort((a, b) => b.votes - a.votes));
    toast.success('Stimme registriert! 🚀');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Bitte gib eine Nachricht ein.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate webhook/API call
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage('');
      toast.success('Transmission erfolgreich! Danke für dein Feedback. 📡');
      setActiveTab('roadmap');
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'planned': return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-2 py-0.5 rounded text-xs font-bold">Geplant</span>;
      case 'in-progress': return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/50 px-2 py-0.5 rounded text-xs font-bold">In Arbeit</span>;
      case 'under-review': return <span className="bg-purple-500/20 text-purple-400 border border-purple-500/50 px-2 py-0.5 rounded text-xs font-bold">Prüfung</span>;
      case 'completed': return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-2 py-0.5 rounded text-xs font-bold">Abgeschlossen</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden border border-slate-700/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
              Kommando <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Feedback</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Die Matrix wächst mit deinen Daten. Sende Fehlerprotokolle, teile deine Visionen oder stimme für die nächsten Upgrades ab.
            </p>
          </div>
          
          {/* Sub-Nav */}
          <div className="flex bg-slate-900/50 p-1.5 rounded-xl border border-slate-700/50">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'roadmap' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              🗺️ Roadmap & Voting
            </button>
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'submit' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              📡 Direkt-Übertragung
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'roadmap' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-700/50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-2xl">🗳️</span> Feature Voting Board
            </h2>
            <button 
              onClick={() => { setActiveTab('submit'); setFeedbackType('idea'); }}
              className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-bold transition-colors border border-slate-600"
            >
              + Eigene Idee einreichen
            </button>
          </div>
          
          <div className="space-y-4">
            {roadmapItems.map(item => (
              <div key={item.id} className="flex items-start gap-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-colors group">
                <div className="flex flex-col items-center justify-center bg-slate-800 p-3 rounded-xl min-w-[70px] border border-slate-700">
                  <button 
                    onClick={() => handleVote(item.id)}
                    className="text-slate-400 hover:text-blue-400 transition-colors mb-1"
                    title="Upvote"
                  >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <span className="text-white font-black text-lg">{item.votes}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'submit' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">📝</span> Transmission konfigurieren
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Selection */}
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setFeedbackType('bug')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                    feedbackType === 'bug' 
                      ? 'bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-2xl">🐛</span>
                  <span className="font-bold text-sm">Bug gefunden</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('idea')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                    feedbackType === 'idea' 
                      ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-2xl">💡</span>
                  <span className="font-bold text-sm">Neue Idee</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('praise')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                    feedbackType === 'praise' 
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-2xl">❤️</span>
                  <span className="font-bold text-sm">Lob & Feedback</span>
                </button>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Deine Nachricht</label>
                <textarea 
                  rows="5" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={feedbackType === 'bug' ? "Beschreibe den Fehler... Wo ist er aufgetreten? Was hast du vorher gemacht?" : "Beschreibe deine Idee oder dein Feedback..."}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              {/* Screenshot Upload (Mock) */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Visuals (Optional)</label>
                <div className="border-2 border-dashed border-slate-700 hover:border-blue-500/50 bg-slate-800/30 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                  <svg className="w-10 h-10 text-slate-500 group-hover:text-blue-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-300 font-bold mb-1">Screenshot hochladen</span>
                  <span className="text-slate-500 text-xs">Drag & Drop oder Klicken (JPG, PNG, max. 5MB)</span>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-lg rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Übertragung läuft...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Daten-Paket absenden
                  </>
                )}
              </button>
            </form>
          </div>

          {/* System Diagnostics Sidebar */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/50 h-fit">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-700/50 pb-3">
              <span className="text-xl">⚙️</span> System-Diagnose
            </h3>
            
            <div className="mb-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    checked={includeDiagnostics}
                    onChange={(e) => setIncludeDiagnostics(e.target.checked)}
                    className="sr-only" 
                  />
                  <div className={`w-5 h-5 rounded border ${includeDiagnostics ? 'bg-blue-600 border-blue-600' : 'bg-slate-800 border-slate-600 group-hover:border-blue-500'} transition-colors flex items-center justify-center`}>
                    {includeDiagnostics && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                </div>
                <div className="flex-1 -mt-0.5">
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors block mb-1">Diagnose-Daten anhängen</span>
                  <span className="text-xs text-slate-500 leading-tight block">Hilft dem Dev-Team, Bugs schneller zu reproduzieren. (Empfohlen)</span>
                </div>
              </label>
            </div>

            <div className={`space-y-3 p-4 bg-slate-900/50 rounded-xl border border-slate-800 transition-opacity ${includeDiagnostics ? 'opacity-100' : 'opacity-30'}`}>
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 block mb-1">Plattform</span>
                <span className="text-xs text-slate-300 font-mono">{systemInfo.platform || 'Unbekannt'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 block mb-1">Auflösung</span>
                <span className="text-xs text-slate-300 font-mono">{systemInfo.screen}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 block mb-1">Sprache</span>
                <span className="text-xs text-slate-300 font-mono">{systemInfo.language}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 block mb-1">Browser (User Agent)</span>
                <span className="text-[10px] text-slate-400 font-mono leading-tight block break-words">
                  {systemInfo.userAgent}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
