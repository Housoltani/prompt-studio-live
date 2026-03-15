import React, { useState, useEffect } from 'react';
import { X, Wand2, PenTool, RefreshCw, Send, Sparkles, Copy, CheckCircle2, Save, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';

export default function ArchitectWorkspace({ user, onClose, initialPrompt }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [config, setConfig] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSavingToArchive, setIsSavingToArchive] = useState(false);

  useEffect(() => {
    if (user) loadConfig();
  }, [user]);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const loadConfig = async () => {
    try {
      const { data } = await supabase
        .from('agent_configurations')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (data) setConfig(data);
     } catch (err) { console.error(err); 
      
    }
  };

  const generateContent = async () => {
    if (!prompt.trim()) return;
    
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey || apiKey === 'dein_echter_openrouter_key') {
      toast.error('System-Warnung: Kein API-Schlüssel für OpenRouter gefunden. Bitte in der .env hinterlegen.', {
        style: { background: '#7f1d1d', color: '#fff', border: '1px solid #ef4444' },
        duration: 5000
      });
      return;
    }

    setIsGenerating(true);
    setResult(null);

    // Bilde den System-Prompt aus der Supabase Konfiguration
    const niche = config?.brand_niche || 'Allgemein';
    const tone = config?.brand_tone || 'Professional';
    const goal = config?.brand_goal || 'Engagement';

    const systemPrompt = `Du bist ein hochkarätiger Instagram Content-Architekt für die Nische: "${niche}". 
    Dein Tone of Voice ist: "${tone}". 
    Dein primäres Ziel mit diesem Post ist: "${goal}".
    
    Generiere basierend auf der Idee des Nutzers Folgendes:
    1. Ein komplettes Instagram-Karussell (Slide für Slide Text).
    2. Ein passendes Reel-Skript (Hook, Body, Call to Action).
    
    Nutze Emojis, starke Hooks und formatiere deine Antwort sauber und professionell in Markdown (mit ### und **).`;

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
          model: 'openai/gpt-4o', // Wir rüsten ihn mit einem mächtigen Kern aus
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('API-Kommunikation fehlgeschlagen: ' + response.statusText);
      }

      const data = await response.json();
      const generatedText = data.choices[0].message.content;

      setResult(generatedText.trim());
      toast.success('Inhalt erfolgreich geschmiedet!', { icon: '✨', style: { background: '#1f2937', color: '#fff' } });
    } catch (err) { 
      console.error(err); 
      toast.error('Generierung fehlgeschlagen. Überprüfe die Netzwerkverbindung und deinen API-Key.', {
        style: { background: '#7f1d1d', color: '#fff' }
      });
    } finally {
      setIsGenerating(false);
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

  const saveToArchive = async () => {
    if (!result) return;
    setIsSavingToArchive(true);
    try {
      const { error } = await supabase.from('generated_content').insert({
        user_id: user.id,
        agent_id: 'architect',
        prompt: prompt,
        content_result: result
      });
      if (error) throw error;
      toast.success('Sicher im Archiv verstaut!', { icon: '💾', style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' } });
    } catch (err) {
      toast.error('Fehler bei der Archivierung.');
      console.error(err);
    } finally {
      setIsSavingToArchive(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[85vh] flex flex-col bg-gray-900 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex-none p-4 border-b border-gray-800 bg-gray-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Wand2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Der Schöpfer <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">Arbeitsplatz</span>
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                System-Parameter geladen: Nische [{config?.brand_niche || 'Ausstehend'}], Tone [{config?.brand_tone || 'Standard'}]
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
            <label className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
              <Sparkles size={16} /> Deine Roh-Idee
            </label>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Gib dem Schöpfer ein Thema, einen Link oder eine grobe Idee. Er transformiert sie automatisch in ein fertiges Karussell und Reel-Skript.
            </p>
            
            <textarea
              className="flex-1 w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none transition-all"
              placeholder="z.B. Erkläre in 3 Schritten, wie man effektiv Muskeln aufbaut, auch wenn man wenig Zeit hat..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <button
              onClick={generateContent}
              disabled={isGenerating || !prompt.trim()}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20 disabled:shadow-none"
            >
              {isGenerating ? (
                <><RefreshCw size={18} className="animate-spin" /> Schmiede Content...</>
              ) : (
                <><Send size={18} /> Transformieren</>
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div className="w-full md:w-2/3 p-6 flex flex-col bg-[#0f1115]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-300">Generierter Content</h3>
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
              {!result && !isGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <PenTool size={48} className="mb-4 opacity-20" />
                  <p>Der Schöpfer wartet auf deine Direktiven.</p>
                </div>
              )}
              
              {isGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-400 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"></div>
                    <Wand2 size={40} className="animate-pulse relative z-10" />
                  </div>
                  <p className="animate-pulse font-medium text-sm">Architektur-Parameter werden berechnet...</p>
                </div>
              )}

              {result && !isGenerating && (
                <div className="prose prose-invert prose-purple max-w-none">
                  {result.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 text-gray-200 leading-relaxed">
                      {line.startsWith('###') ? (
                        <span className="text-lg font-bold text-white block mt-6 mb-3">{line.replace('###', '')}</span>
                      ) : line.startsWith('**') ? (
                        <span className="font-semibold text-purple-300 block mt-4 mb-1">{line.replace(/\*\*/g, '')}</span>
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
