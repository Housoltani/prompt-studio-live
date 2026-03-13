import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function LiveGenerator() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('openai/gpt-3.5-turbo');
  const [result, setResult] = useState(null); // Geändert zu null, da es Text oder Video sein kann
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Bitte gib einen Prompt ein!');
      return;
    }

    setLoading(true);
    setResult(null);

    // Sonderbehandlung für Video-Modelle (Simulation)
    if (model.startsWith('video/')) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        if (progress >= 100) {
          clearInterval(interval);
          setResult({
            type: 'video',
            url: 'https://cdn.pixabay.com/video/2020/05/25/40131-424813350_large.mp4',
            modelName: model.split('/')[1].replace('-', ' ').toUpperCase()
          });
          setLoading(false);
          toast.success('Video erfolgreich generiert!');
        }
      }, 500);
      return;
    }

    // Reguläre Text-Generierung über OpenRouter
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      toast.error('API Key fehlt! Bitte in der .env Datei als VITE_OPENROUTER_API_KEY eintragen.');
      setLoading(false);
      return;
    }

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
          model: model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({ type: 'text', content: data.choices[0].message.content });
        toast.success('Generierung erfolgreich!');
      } else {
        toast.error(`Fehler: ${data.error?.message || 'Unbekannter Fehler'}`);
      }
    } catch (error) {
      toast.error('Verbindungsfehler zur API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl animate-fade-in mx-auto mt-4">
      <h2 className="text-3xl font-bold mb-2">✨ Live Generator</h2>
      <p className="text-slate-400 mb-8">Teste deine Text-Prompts live mit den neuesten Modellen direkt im Studio.</p>

      <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-col gap-6">
        
        {/* Einstellungen */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Modell:</label>
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 min-w-[200px]"
          >
            <optgroup label="OpenAI">
              <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo (Schnell)</option>
              <option value="openai/gpt-4o">GPT-4o (Smart)</option>
            </optgroup>
            <optgroup label="Anthropic">
              <option value="anthropic/claude-3-haiku">Claude 3 Haiku (Schnell)</option>
              <option value="anthropic/claude-3-opus">Claude 3 Opus (Kreativ)</option>
              <option value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet (Smart)</option>
            </optgroup>
            <optgroup label="Google">
              <option value="google/gemini-pro-1.5">Gemini 1.5 Pro</option>
              <option value="google/gemini-flash-1.5">Gemini 1.5 Flash</option>
            </optgroup>
            <optgroup label="Open-Source">
              <option value="meta-llama/llama-3-8b-instruct:free">Llama 3 (8B) - Gratis</option>
              <option value="meta-llama/llama-3-70b-instruct">Llama 3 (70B)</option>
              <option value="mistralai/mixtral-8x7b-instruct">Mixtral 8x7B</option>
            </optgroup>
            <optgroup label="Video-Generierung (Preview)">
              <option value="video/runway-gen3">Runway Gen-3 Alpha</option>
              <option value="video/leonardo-motion">Leonardo Motion (Leo 3)</option>
              <option value="video/luma-dream">Luma Dream Machine</option>
              <option value="video/sora">OpenAI Sora</option>
              <option value="video/google-veo">Google Veo (Gemini Video)</option>
            </optgroup>
          </select>
        </div>

        {/* Input */}
        <div>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Schreibe deinen Prompt hier hinein..."
            className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-colors ${loading ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            {loading ? (
              <><svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Generiere...</>
            ) : (
              <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Generieren</>
            )}
          </button>
        </div>

        {/* Result Area */}
        {result && (
          <div className="mt-4 animate-fade-in relative group">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">Ergebnis</h3>
            <div className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-6 text-slate-200 whitespace-pre-wrap leading-relaxed overflow-hidden">
              
              {result.type === 'text' && result.content}
              
              {result.type === 'video' && (
                <div className="flex flex-col items-center">
                  <div className="w-full relative rounded-lg overflow-hidden border border-slate-700 shadow-xl mb-4">
                    <video src={result.url} controls autoPlay loop className="w-full h-auto max-h-[400px] bg-black"></video>
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-emerald-400">
                      Generiert mit {result.modelName}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold transition-colors shadow-lg">
                    Video Herunterladen
                  </button>
                </div>
              )}

            </div>
            
            {result.type === 'text' && (
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(result.content);
                  toast.success('Ergebnis kopiert!');
                }}
                className="absolute top-10 right-4 opacity-0 group-hover:opacity-100 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded text-xs transition-opacity shadow-lg"
              >
                Kopieren
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}