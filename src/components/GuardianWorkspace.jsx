import React, { useState, useEffect } from 'react';
import { X, Shield, RefreshCw, Send, Sparkles, Copy, CheckCircle2, MessageSquare } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';

export default function GuardianWorkspace({ user, onClose }) {
  const [comment, setComment] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [config, setConfig] = useState(null);

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

  const analyzeComment = async () => {
    if (!comment.trim()) return;
    
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey || apiKey === 'dein_echter_openrouter_key') {
      toast.error('Kein API-Schlüssel für OpenRouter gefunden.', {
        style: { background: '#7f1d1d', color: '#fff', border: '1px solid #ef4444' }
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    const niche = config?.brand_niche || 'Allgemein';
    const tone = config?.brand_tone || 'Professional';
    
    const systemPrompt = `Du bist "Der Wächter", ein extrem präziser und loyaler KI-Moderator für einen Instagram-Account in der Nische: "${niche}".
    Deine Markenstimme für Antworten ist: "${tone}".

    Deine Mission: Analysiere den folgenden Instagram-Kommentar, den der Nutzer erhält.
    Schritt 1 (Klassifizierung): Bewerte den Kommentar strikt in eine der drei Kategorien:
    - [TOXISCH/SPAM]: Hate Speech, offensichtliche Bots ("Promote it on...", "DM for collab"), Beleidigungen.
    - [KRITISCH]: Legitimer Kunde, der sich beschwert oder frustriert ist (muss mit Samthandschuhen angefasst werden).
    - [POSITIV/NEUTRAL]: Normale Interaktion, echtes Interesse, Kompliment oder Fragen zum Content.
    
    Schritt 2 (Aktion): 
    - Wenn TOXISCH/SPAM: Gib den strikten Befehl "AKTION: LÖSCHEN/BLOCKIEREN" aus und erkläre in einem Satz, warum.
    - Wenn KRITISCH: Schreibe eine deeskalierende, hochprofessionelle Antwort im Tone of Voice der Marke, die das Problem online klärt oder in die DMs verlagert.
    - Wenn POSITIV/NEUTRAL: Schreibe eine sympathische, markengerechte Antwort, die das Engagement (die Unterhaltung) am Laufen hält (z.B. mit einer netten Gegenfrage).
    
    Formatiere das Ergebnis in Markdown (mit ### und **). Beginne immer mit der Klassifizierung.`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Prompt Studio Live (Wächter)'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Analysiere diesen Kommentar: "${comment}"` }
          ]
        })
      });

      if (!response.ok) throw new Error('API Fehler: ' + response.statusText);

      const data = await response.json();
      setResult(data.choices[0].message.content.trim());
      toast.success('Bedrohungsanalyse abgeschlossen.', { icon: '🛡️', style: { background: '#1f2937', color: '#fff' } });
    } catch (err) { 
      console.error(err); 
      toast.error('Die Scanner des Wächters sind ausgefallen.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (resText) => {
    if (!resText) return null;
    const lower = resText.toLowerCase();
    if (lower.includes('[toxisch') || lower.includes('[spam')) return <Shield size={32} className="text-red-500 mb-4" />;
    if (lower.includes('[kritisch')) return <Shield size={32} className="text-orange-500 mb-4" />;
    return <Shield size={32} className="text-emerald-500 mb-4" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[85vh] flex flex-col bg-gray-900 border border-orange-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex-none p-4 border-b border-gray-800 bg-gray-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Der Wächter <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-500/30">Community-Schild</span>
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                Protokoll: Spam-Filter & Deeskalation | Tone: [{config?.brand_tone || 'Standard'}]
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
            <label className="text-sm font-semibold text-orange-300 mb-2 flex items-center gap-2">
              <MessageSquare size={16} /> Eingehender Kommentar
            </label>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Füge hier einen Kommentar deiner Community ein. Der Wächter analysiert die Intention, blockt Trolle ab und formuliert die perfekte, deeskalierende Antwort für dich.
            </p>
            
            <textarea
              className="flex-1 w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none transition-all"
              placeholder="z.B. 'DM it to @mega_promotions_hub' ODER 'Euer Service ist der letzte Müll!' ODER 'Tolles Reel, wo gibt es den Link?'"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            
            <button
              onClick={analyzeComment}
              disabled={isAnalyzing || !comment.trim()}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 disabled:shadow-none"
            >
              {isAnalyzing ? (
                <><RefreshCw size={18} className="animate-spin" /> Analysiere... </>
              ) : (
                <><Shield size={18} /> Scannen & Reagieren</>
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div className="w-full md:w-2/3 p-6 flex flex-col bg-[#0f1115]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-300">Analyse & Handlungsbefehl</h3>
              {result && (
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    toast.success('Kopiert!', { style: { background: '#1f2937', color: '#fff' } });
                  }}
                  className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-md transition-colors border border-gray-700"
                >
                  <Copy size={14} /> Kopieren
                </button>
              )}
            </div>

            <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-6 overflow-y-auto custom-scrollbar relative">
              {!result && !isAnalyzing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <Shield size={48} className="mb-4 opacity-20" />
                  <p>Die Verteidigungssysteme sind online.</p>
                </div>
              )}
              
              {isAnalyzing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-orange-400 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full"></div>
                    <Shield size={40} className="animate-pulse relative z-10" />
                  </div>
                  <p className="animate-pulse font-medium text-sm">Gleiche Bedrohungsmuster ab...</p>
                </div>
              )}

              {result && !isAnalyzing && (
                <div className="flex flex-col h-full">
                  <div className="flex justify-center">
                    {getStatusIcon(result)}
                  </div>
                  <div className="prose prose-invert prose-orange max-w-none">
                    {result.split('\n').map((line, i) => (
                      <p key={i} className="mb-2 text-gray-200 leading-relaxed">
                        {line.startsWith('###') ? (
                          <span className="text-lg font-bold text-white block mt-6 mb-3">{line.replace('###', '')}</span>
                        ) : line.startsWith('**') ? (
                          <span className="font-semibold text-orange-300 block mt-4 mb-1">{line.replace(/\*\*/g, '')}</span>
                        ) : line.startsWith('AKTION:') || line.startsWith('**AKTION:**') ? (
                          <span className="font-bold text-red-400 block p-3 bg-red-900/20 border border-red-500/30 rounded-lg my-3">{line}</span>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
