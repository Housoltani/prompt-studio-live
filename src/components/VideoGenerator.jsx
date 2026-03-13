import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('runway-gen3');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error('Bitte beschreibe dein Video!');
      return;
    }

    setLoading(true);
    setProgress(0);
    setVideoUrl(null);

    // Da Video-APIs (Runway, Luma, Leonardo) asynchron sind und oft Minuten dauern,
    // simulieren wir hier den Ladevorgang für das UI-Erlebnis.
    // In einer echten App würde hier der API-Call zu Replicate, Leonardo oder Runway erfolgen.
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          // Platzhalter-Video nach "erfolgreicher" Generierung (Royalty Free)
          setVideoUrl('https://cdn.pixabay.com/video/2020/05/25/40131-424813350_large.mp4');
          toast.success('Video erfolgreich generiert!');
        }, 500);
      } else {
        setProgress(currentProgress);
      }
    }, 800);
  };

  return (
    <div className="max-w-5xl animate-fade-in mx-auto mt-4">
      <h2 className="text-3xl font-bold mb-2 text-gradient from-purple-400 to-pink-500">🎥 KI Video Generator</h2>
      <p className="text-slate-400 mb-8">Erstelle atemberaubende Videos aus Text mit den stärksten Video-Modellen der Welt.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Settings Panel */}
        <div className="lg:col-span-1 glass-panel rounded-3xl p-6 flex flex-col gap-6 h-fit">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Video Modell</label>
            <select 
              value={model} 
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 shadow-inner"
            >
              <option value="runway-gen3">Runway Gen-3 Alpha</option>
              <option value="luma-dream">Luma Dream Machine</option>
              <option value="kling-ai">Kling AI</option>
              <option value="leonardo-motion">Leonardo Motion (Leo 3)</option>
              <option value="sora" disabled>OpenAI Sora (Coming Soon)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Seitenverhältnis</label>
            <div className="grid grid-cols-2 gap-2">
              {['16:9', '9:16', '1:1', '21:9'].map(ratio => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-2 rounded-lg text-sm font-bold transition-all ${aspectRatio === ratio ? 'bg-purple-600 text-white shadow-[0_0_15px_-3px_rgba(147,51,234,0.5)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Kamera-Bewegung</label>
            <input type="range" min="1" max="10" defaultValue="5" className="w-full accent-purple-500" />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 uppercase font-bold">
              <span>Statisch</span>
              <span>Dynamisch</span>
            </div>
          </div>
        </div>

        {/* Prompt & Preview Panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-panel rounded-3xl p-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Beschreibe dein Video im Detail (z.B. Cinematic drone shot of a neon cyberpunk city at night, rain falling, 8k resolution...)"
              className="w-full h-32 bg-transparent p-5 text-white placeholder-slate-500 focus:outline-none resize-none relative z-10"
            />
            <div className="flex justify-end p-3 relative z-10 border-t border-slate-700/50">
              <button 
                onClick={handleGenerate}
                disabled={loading}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${loading ? 'bg-purple-600/50 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-[0_0_20px_-5px_rgba(236,72,153,0.5)]'}`}
              >
                {loading ? 'Generiere...' : '🎬 Video Generieren'}
              </button>
            </div>
          </div>

          {/* Player / Status Area */}
          <div className="glass-panel rounded-3xl p-6 min-h-[350px] flex flex-col items-center justify-center border border-slate-700/50 relative overflow-hidden group">
            {loading ? (
              <div className="w-full max-w-md flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-purple-500 animate-spin mb-4"></div>
                <h3 className="text-lg font-bold text-slate-200">Rendere Video in der Cloud...</h3>
                <p className="text-sm text-slate-400 text-center">Video-Modelle wie {model} benötigen viel Rechenleistung. Das kann einen Moment dauern.</p>
                
                {/* Progress Bar */}
                <div className="w-full h-3 bg-slate-800 rounded-full mt-4 overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-purple-400">{progress}% abgeschlossen</span>
              </div>
            ) : videoUrl ? (
              <div className="w-full h-full flex flex-col items-center">
                <video 
                  src={videoUrl} 
                  controls 
                  autoPlay 
                  loop 
                  className="w-full h-auto max-h-[400px] rounded-xl shadow-2xl border border-slate-700"
                ></video>
                <div className="mt-4 flex gap-4 w-full justify-center">
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download MP4
                  </button>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition-colors shadow-[0_0_15px_-3px_rgba(147,51,234,0.4)]">
                    Veröffentlichen
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-500">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <p className="font-bold">Kein Video generiert</p>
                <p className="text-sm mt-1">Deine Kreation erscheint hier.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}