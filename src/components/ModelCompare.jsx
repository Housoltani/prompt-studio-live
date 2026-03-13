import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ModelCompare() {
  const [prompt, setPrompt] = useState('Erkläre Quantenphysik in einem Satz für einen 5-Jährigen.');
  const [modelA, setModelA] = useState('openai/gpt-4o');
  const [modelB, setModelB] = useState('anthropic/claude-3.5-sonnet');
  const [resultA, setResultA] = useState('');
  const [resultB, setResultB] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!prompt.trim()) return toast.error('Prompt fehlt!');
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) return toast.error('API Key fehlt!');

    setLoading(true);
    setResultA('');
    setResultB('');

    const fetchModel = async (model, setter) => {
      try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'http://localhost:5173',
            'X-Title': 'Prompt Studio Live'
          },
          body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }] })
        });
        const data = await res.json();
        if (res.ok) setter(data.choices[0].message.content);
        else setter(`Fehler: ${data.error?.message}`);
      } catch (e) {
        setter('Verbindungsfehler.');
      }
    };

    await Promise.all([
      fetchModel(modelA, setResultA),
      fetchModel(modelB, setResultB)
    ]);
    
    setLoading(false);
    toast.success('Vergleich abgeschlossen!');
  };

  const modelOptions = (
    <>
      <option value="openai/gpt-4o">GPT-4o</option>
      <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
      <option value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet</option>
      <option value="google/gemini-pro-1.5">Gemini 1.5 Pro</option>
      <option value="meta-llama/llama-3-70b-instruct">Llama 3 (70B)</option>
    </>
  );

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4">
      <h2 className="text-3xl font-bold mb-2 text-gradient from-blue-400 to-indigo-400">⚖️ A/B Modell-Vergleich</h2>
      <p className="text-slate-400 mb-8">Lass zwei KIs gegeneinander antreten und vergleiche ihre Antworten in Echtzeit.</p>

      <div className="glass-panel rounded-3xl p-6 mb-8">
        <textarea 
          value={prompt} onChange={(e) => setPrompt(e.target.value)}
          placeholder="Dein Prompt für beide Modelle..."
          className="w-full h-24 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:border-indigo-500 transition-colors resize-none mb-4"
        />
        <button onClick={handleCompare} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg transition-colors">
          {loading ? 'KIs denken nach...' : '🚀 Kampf Starten'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model A */}
        <div className="glass-card rounded-3xl p-6 flex flex-col h-full">
          <select value={modelA} onChange={(e) => setModelA(e.target.value)} className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm mb-4">
            {modelOptions}
          </select>
          <div className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-slate-300 min-h-[200px] whitespace-pre-wrap">
            {loading ? <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-2 bg-slate-700 rounded"></div><div className="h-2 bg-slate-700 rounded w-5/6"></div></div></div> : resultA}
          </div>
        </div>

        {/* Model B */}
        <div className="glass-card rounded-3xl p-6 flex flex-col h-full">
          <select value={modelB} onChange={(e) => setModelB(e.target.value)} className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm mb-4">
            {modelOptions}
          </select>
          <div className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-slate-300 min-h-[200px] whitespace-pre-wrap">
            {loading ? <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-2 bg-slate-700 rounded"></div><div className="h-2 bg-slate-700 rounded w-5/6"></div></div></div> : resultB}
          </div>
        </div>
      </div>
    </div>
  );
}