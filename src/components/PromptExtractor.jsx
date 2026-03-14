import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCredits } from '../context/CreditsContext';

export default function PromptExtractor() {
  const { spendCredits } = useCredits();
  const [image, setImage] = useState(null);
  const [extractedPrompt, setExtractedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        toast.error('Bild ist zu groß! Maximal 5MB erlaubt.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setExtractedPrompt(''); 
        setScanStep(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload({ target: { files: e.dataTransfer.files } });
      e.dataTransfer.clearData();
    }
  };

  const extractPrompt = () => {
    if (!image) {
      toast.error('Bitte lade zuerst ein Bild hoch!');
      return;
    }
    
    // Premium Feature Cost
    if (!spendCredits(5, 'Image Reverse Engineering')) return;

    setLoading(true);
    setExtractedPrompt('');
    setScanStep(1);

    // Simulate Vision AI Analysis
    setTimeout(() => setScanStep(2), 1500); // Scanne Style
    setTimeout(() => setScanStep(3), 3000); // Scanne Lighting/Camera
    setTimeout(() => {
      setExtractedPrompt('A stunning, hyper-realistic portrait of a cyberpunk hacker in a neon-drenched Tokyo alleyway. Vivid magenta and cyan lighting reflecting off rain-slicked pavement. Shot on 35mm lens, cinematic depth of field, 8k resolution, Unreal Engine 5 render, highly detailed, octane render, masterpiece --ar 16:9 --v 6.0');
      setLoading(false);
      setScanStep(4);
      toast.success('Vision Analyse abgeschlossen!', { icon: '👁️' });
    }, 4500);
  };

  return (
    <div className="max-w-6xl animate-fade-in mx-auto mt-4 px-4 pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600 tracking-tight">🔄 Reverse Engineering</h2>
          <p className="text-slate-400 text-lg">Lade ein Kunstwerk hoch. Unsere Vision-KI extrahiert den perfekten Text-Prompt.</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-3 shadow-inner">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kosten</span>
           <span className="text-lg font-black text-amber-400">⚡ 5</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
        
        {/* Upload Zone (Left) */}
        <div 
          className={`glass-panel border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center p-8 text-center transition-all cursor-pointer relative overflow-hidden ${
            image ? 'border-emerald-500/50 bg-slate-900' : 'border-slate-600 hover:border-emerald-500 hover:bg-slate-800/50'
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !loading && document.getElementById('image-upload').click()}
        >
          <input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageUpload} 
            disabled={loading}
          />
          
          {image ? (
            <div className="relative w-full h-full flex items-center justify-center group">
              <img src={image} alt="Upload Preview" className={`max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-all ${loading ? 'brightness-50' : ''}`} />
              
              {/* Scanning Overlay Effect */}
              {loading && (
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="w-full h-1 bg-emerald-400 shadow-[0_0_20px_#34d399] absolute top-0 animate-[scan_2s_ease-in-out_infinite]"></div>
                </div>
              )}

              {!loading && (
                 <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl backdrop-blur-sm">
                   <span className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-lg shadow-lg">Neues Bild hochladen</span>
                 </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center animate-fade-in">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner border border-slate-700">
                📥
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-2">Drop Target</h3>
              <p className="text-slate-500">Ziehe ein Bild hierher oder klicke zum Upload.</p>
              <div className="flex gap-2 mt-6">
                <span className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded">JPG</span>
                <span className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded">PNG</span>
                <span className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded">WEBP</span>
              </div>
            </div>
          )}
        </div>

        {/* Result & Scan Zone (Right) */}
        <div className="glass-card rounded-[2rem] p-8 flex flex-col border border-slate-700/50 relative">
          
          <div className="flex justify-between items-center border-b border-slate-700/50 pb-4 mb-6">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <span className="text-emerald-400">👁️</span> Vision Analysis
            </h3>
            <div className="flex gap-1">
              <div className={`w-2 h-2 rounded-full ${scanStep >= 1 ? 'bg-emerald-500 shadow-[0_0_10px_#34d399]' : 'bg-slate-700'}`}></div>
              <div className={`w-2 h-2 rounded-full ${scanStep >= 2 ? 'bg-emerald-500 shadow-[0_0_10px_#34d399]' : 'bg-slate-700'}`}></div>
              <div className={`w-2 h-2 rounded-full ${scanStep >= 3 ? 'bg-emerald-500 shadow-[0_0_10px_#34d399]' : 'bg-slate-700'}`}></div>
              <div className={`w-2 h-2 rounded-full ${scanStep >= 4 ? 'bg-emerald-500 shadow-[0_0_10px_#34d399]' : 'bg-slate-700'}`}></div>
            </div>
          </div>

          {!image ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-50">
              <span className="text-6xl mb-4">🔍</span>
              <p>Warte auf visuelle Daten...</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              
              {/* Status Output Console */}
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-6 h-32 font-mono text-sm overflow-hidden flex flex-col justify-end relative shadow-inner">
                {!loading && scanStep === 0 && <div className="text-slate-500">System bereit. Warte auf Startbefehl.</div>}
                
                {loading && (
                  <div className="space-y-2 text-emerald-400">
                    <div className="flex items-center gap-2"><span className="animate-pulse">_</span> Initiating neural scan...</div>
                    {scanStep >= 2 && <div className="animate-fade-in text-blue-400">» Detecting primary subject & style...</div>}
                    {scanStep >= 3 && <div className="animate-fade-in text-purple-400">» Extracting lighting and camera metadata...</div>}
                  </div>
                )}
                
                {scanStep === 4 && (
                  <div className="text-emerald-400 font-bold">» Scan complete. Prompt synthesized.</div>
                )}
              </div>

              {/* Action Button */}
              {scanStep === 0 && (
                <button 
                  onClick={extractPrompt}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg mb-6"
                >
                  <span>🚀</span> Extrahieren (⚡ 5 Sparks)
                </button>
              )}

              {/* The Result Prompt */}
              {scanStep === 4 && (
                <div className="flex-1 flex flex-col animate-slide-up">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Generierter Prompt</h4>
                  <div className="flex-1 bg-slate-800/50 border border-emerald-500/30 rounded-xl p-4 relative group">
                    <textarea 
                      readOnly
                      value={extractedPrompt}
                      className="w-full h-full bg-transparent text-white font-mono text-sm resize-none focus:outline-none custom-scrollbar"
                    />
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(extractedPrompt);
                        toast.success('Prompt kopiert!', { icon: '📋' });
                      }}
                      className="absolute bottom-4 right-4 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-emerald-500/20"
                    >
                      Kopieren
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}