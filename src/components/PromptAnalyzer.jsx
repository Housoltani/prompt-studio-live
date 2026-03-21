import React, { useState } from 'react';

export default function PromptAnalyzer() {
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);

  const analyzePrompt = () => {
    if (!prompt.trim()) return;
    setIsAnalyzing(true);
    setResults(null);
    setScanProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        clearInterval(interval);
        setScanProgress(100);
        setTimeout(() => {
          setIsAnalyzing(false);
          const score = Math.min(Math.max(prompt.length / 2 + Math.random() * 20, 30), 95).toFixed(0);
          
          setResults({
            score,
            strengths: [
              "Gute Grundidee erkannt.",
              prompt.includes('4k') || prompt.includes('hd') ? "Qualitäts-Tags vorhanden." : "Direkte Formulierung."
            ],
            weaknesses: [
              prompt.length < 50 ? "Sehr kurz, lässt der KI zu viel Spielraum." : "Könnte spezifischere Stil-Angaben vertragen.",
              "Fehlende Angaben zu Licht und Perspektive."
            ],
            proVersion: prompt.length > 20 
              ? `${prompt}, cinematic lighting, 8k resolution, highly detailed, photorealistic, epic composition, trending on artstation --ar 16:9 --v 6.0`
              : "A photorealistic and highly detailed scene of your concept, with dramatic cinematic lighting, shot on 35mm lens, 8k resolution, award-winning photography --ar 16:9"
          });
        }, 500);
      } else {
        setScanProgress(progress);
      }
    }, 200);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center gap-3">
            <span className="text-4xl">🔍</span> Prompt-Röntgenblick
          </h2>
          <p className="text-slate-400 mt-2">Analysiere und optimiere deine Prompts für maximale Performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-xl">
          <label className="block text-sm font-medium text-slate-300 mb-2">Dein Prompt</label>
          <textarea
            className="w-full h-48 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            placeholder="Füge hier deinen Prompt ein..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={analyzePrompt}
            disabled={isAnalyzing || !prompt.trim()}
            className="mt-4 w-full relative overflow-hidden group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Scanne Struktur... {scanProgress}%
              </span>
            ) : (
              "Prompt Analysieren"
            )}
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-xl relative overflow-hidden min-h-[400px]">
          {!results && !isAnalyzing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
              <p>Warte auf Input...</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 z-10 backdrop-blur-sm">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
                <div className="absolute inset-4 rounded-full border-4 border-blue-500 border-b-transparent animate-[spin_1s_linear_reverse_infinite]"></div>
                <div className="text-2xl font-bold text-cyan-400">{scanProgress}%</div>
              </div>
              <p className="mt-4 text-cyan-400 font-mono animate-pulse">Analysiere semantische Dichte...</p>
            </div>
          )}

          {results && (
            <div className="h-full flex flex-col animate-fade-in space-y-6">
              <div className="flex items-center gap-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-700"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={results.score > 80 ? "text-emerald-500" : results.score > 50 ? "text-amber-500" : "text-red-500"}
                      strokeWidth="3"
                      strokeDasharray={`${results.score}, 100`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-xl font-bold text-white">{results.score}%</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Prompt Score</h3>
                  <p className="text-slate-400 text-sm">
                    {results.score > 80 ? "Hervorragendes Potenzial!" : results.score > 50 ? "Solide, aber verbesserungswürdig." : "Benötigt dringend Optimierung."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4">
                  <h4 className="text-emerald-400 font-bold mb-2">Stärken</h4>
                  <ul className="text-sm text-emerald-100 space-y-1 list-disc list-inside">
                    {results.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div className="bg-rose-900/20 border border-rose-500/20 rounded-xl p-4">
                  <h4 className="text-rose-400 font-bold mb-2">Schwächen</h4>
                  <ul className="text-sm text-rose-100 space-y-1 list-disc list-inside">
                    {results.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-blue-400 font-bold">✨ Pro-Version</h4>
                </div>
                <div className="text-sm text-blue-100 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 break-words">
                  {results.proVersion}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
