import React, { useState, useEffect } from 'react';
import { X, Search, RefreshCw, Send, Sparkles, Copy, CheckCircle2, Save, Loader2, Link, Zap } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';

export default function ScoutWorkspace({ user, onClose, onHandover }) {
  const [topic, setTopic] = useState('');
  const [isScouting, setIsScouting] = useState(false);
  const [result, setResult] = useState(null);
  const [config, setConfig] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSavingToArchive, setIsSavingToArchive] = useState(false);

  useEffect(() => {
    if (user) loadConfig();
  }, [user]);

  const loadConfig = async () => {
    try {
      const { data } = await supabase
        .from('agent_configurations')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (data) setConfig(data);
    } catch (err) {
      console.error(err);
    }
  };

  const scoutTrends = async () => {
    if (!topic.trim()) return;
    
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey || apiKey === 'dein_echter_openrouter_key') {
      toast.error('Kein API-Schlüssel für OpenRouter gefunden.', {
        style: { background: '#7f1d1d', color: '#fff', border: '1px solid #ef4444' }
      });
      return;
    }

    setIsScouting(true);
    setResult(null);

    const niche = config?.brand_niche || 'Allgemein';
    const systemPrompt = `Du bist ein elitärer Instagram Trend-Scout für die Nische: "${niche}". 
    Der Nutzer gibt dir ein allgemeines Thema oder Suchbegriff. Deine Mission ist es, die 3 aktuellsten, viralsten Content-Formate oder "Hooks" zu diesem Thema zu identifizieren.
    
    Analysiere das Thema "${topic}" und liefere:
    1. Trend #1: Name des Formats + Eine perfekte Hook dafür.
    2. Trend #2: Name des Formats + Eine perfekte Hook dafür.
    3. Trend #3: Name des Formats + Eine perfekte Hook dafür.
    
    Sei präzise, nutze Emojis und formatiere deine Antwort professionell in Markdown (mit ### und **).`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Prompt Studio Live'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Suche nach viralen Mustern für: ${topic}` }
          ]
        })
      });

      if (!response.ok) throw new Error('API Fehler: ' + response.statusText);

      const data = await response.json();
      setResult(data.choices[0].message.content.trim());
      toast.success('Radar-Scan abgeschlossen!', { icon: '📡', style: { background: '#1f2937', color: '#fff' } });
    } catch (err) { 
      console.error(err); 
      toast.error('Der Radar-Scan ist fehlgeschlagen.');
    } finally {
      setIsScouting(false);
    }
  };

  const saveToArchive = async () => {
    if (!result) return;
    setIsSavingToArchive(true);
    try {
      const { error } = await supabase.from('generated_content').insert({
        user_id: user.id,
        agent_id: 'scout',
        prompt: topic,
        content_result: result
      });
      if (error) throw error;
      toast.success('Radar-Bericht archiviert!', { icon: '💾', style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' } });
    } catch (err) {
      toast.error('Fehler bei der Archivierung.');
      console.error(err);
    } finally {
      setIsSavingToArchive(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('In die Zwischenablage kopiert!', { style: { background: '#1f2937', color: '#fff' } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[85vh] flex flex-col bg-gray-900 border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex-none p-4 border-b border-gray-800 bg-gray-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Search size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Der Späher <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">Radar-Station</span>
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                Suchparameter: Nische [{config?.brand_niche || 'Ausstehend'}]
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Workspace Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Input Panel */}
          <div className="w-full md:w-1/3 p-6 flex flex-col border-r border-gray-800 bg-gray-900/50">
            <label className="text-sm font-semibold text-blue-300 mb-2 flex items-center gap-2">
              <Link size={16} /> Such-Thema (Signal)
            </label>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Gib dem Späher ein grobes Thema. Er analysiert die Strömungen und liefert 3 virale Formate/Hooks, die gerade in deiner Nische dominieren.
            </p>
            
            <textarea
              className="flex-1 w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-all"
              placeholder="z.B. Gesunde Snacks fürs Büro, Immobilien-Tipps, KI-Tools..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            
            <button
              onClick={scoutTrends}
              disabled={isScouting || !topic.trim()}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 disabled:shadow-none"
            >
              {isScouting ? (
                <><RefreshCw size={18} className="animate-spin" /> Scanne Netzwerk...</>
              ) : (
                <><Send size={18} /> Signal senden</>
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div className="w-full md:w-2/3 p-6 flex flex-col bg-[#0f1115]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-300">Radar-Bericht</h3>
              <div className="flex gap-2">
                {result && (
                  <>
                    <button 
                      onClick={saveToArchive}
                      disabled={isSavingToArchive}
                      className="flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-900/20 hover:bg-emerald-900/40 px-3 py-1.5 rounded-md transition-colors border border-emerald-500/30 disabled:opacity-50"
                    >
                      {isSavingToArchive ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      {isSavingToArchive ? 'Archiviert...' : 'Im Archiv sichern'}
                    </button>
                    <button 
                      onClick={() => onHandover(result)}
                      className="flex items-center gap-2 text-xs font-medium text-purple-400 hover:text-white bg-purple-900/20 hover:bg-purple-900/40 px-3 py-1.5 rounded-md transition-colors border border-purple-500/30"
                    >
                      <Zap size={14} />
                      Dem Schöpfer übergeben
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-md transition-colors border border-gray-700"
                    >
                      {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copied ? 'Kopiert!' : 'Kopieren'}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-6 overflow-y-auto custom-scrollbar relative">
              {!result && !isScouting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <Search size={48} className="mb-4 opacity-20" />
                  <p>Der Späher wartet auf das Signal.</p>
                </div>
              )}
              
              {isScouting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-400 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                    <Search size={40} className="animate-pulse relative z-10" />
                  </div>
                  <p className="animate-pulse font-medium text-sm">Signal-Echos werden analysiert...</p>
                </div>
              )}

              {result && !isScouting && (
                <div className="prose prose-invert prose-blue max-w-none">
                  {result.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 text-gray-200 leading-relaxed">
                      {line.startsWith('###') ? (
                        <span className="text-lg font-bold text-white block mt-6 mb-3">{line.replace('###', '')}</span>
                      ) : line.startsWith('**') ? (
                        <span className="font-semibold text-blue-300 block mt-4 mb-1">{line.replace(/\*\*/g, '')}</span>
                      ) : line.startsWith('---') ? (
                        <hr className="border-gray-800 my-6" />
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
