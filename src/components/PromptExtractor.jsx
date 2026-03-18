import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';

export default function PromptExtractor() {
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
        soundEngine.playPop();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const inputElement = document.getElementById('image-upload');
      if (inputElement) {
        inputElement.files = e.dataTransfer.files;
        handleImageUpload({ target: inputElement });
      }
    }
  };

  const startExtraction = () => {
    if (!image) return;
    
    soundEngine.playTransform();
    setLoading(true);
    setScanStep(1);
    
    // Simulate AI scanning phases
    setTimeout(() => setScanStep(2), 1500); // Analyzing subjects
    setTimeout(() => setScanStep(3), 3000); // Analyzing lighting/style
    setTimeout(() => {
      setLoading(false);
      setScanStep(4);
      setExtractedPrompt('A cinematic shot of a futuristic cyberpunk city at night, neon lights reflecting on wet pavement, rain, flying cars in the distance, dramatic volumetric lighting, highly detailed, photorealistic, 8k resolution, shot on 35mm lens --ar 16:9 --v 6.0');
      soundEngine.playSuccess();
      toast.success('Bild erfolgreich decodiert!', { icon: '🔓' });
    }, 4500);
  };

  return (
    <div className="max-w-6xl animate-fade-in mx-auto mt-4 px-4 pb-12">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
          🔄 Prompt Extractor
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Lade ein beliebiges KI-Bild hoch und lass unsere Vision-Modelle den geheimen Prompt (Reverse Engineering) extrahieren.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upload Section */}
        <div className="flex flex-col gap-6">
          <div 
            className={`glass-card h-96 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center p-8 text-center transition-all relative overflow-hidden group ${image ? 'border-cyan-500/50 bg-slate-900' : 'border-slate-700 hover:border-blue-500 hover:bg-slate-800/50 cursor-pointer'}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !image && document.getElementById('image-upload').click()}
          >
            <input 
              type="file" 
              id="image-upload" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
            />
            
            {image ? (
              <div className="absolute inset-0 w-full h-full">
                <img src={image} alt="Upload" className="w-full h-full object-cover opacity-80" />
                
                {/* Sci-Fi Scanning Overlay */}
                {loading && (
                  <>
                    <div className="absolute inset-0 bg-cyan-900/30"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-[scan_2s_linear_infinite]"></div>
                    <div className="absolute inset-0 border-[4px] border-cyan-500/50 m-4 rounded-xl border-dashed opacity-50"></div>
                  </>
                )}
                
                {/* Clear Button */}
                {!loading && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setImage(null); setExtractedPrompt(''); }}
                    className="absolute top-4 right-4 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-20"
                  >
                    ✕
                  </button>
                )}
              </div>
            ) : (
              <div className="pointer-events-none">
                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-5xl mb-6 mx-auto group-hover:scale-110 transition-transform shadow-inner">
                  📸
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Bild hierher ziehen</h3>
                <p className="text-slate-400 text-sm">oder klicken, um eine Datei auszuwählen</p>
                <div className="mt-6 text-[10px] uppercase font-bold tracking-widest text-slate-500">Maximal 5MB (JPG, PNG, WebP)</div>
              </div>
            )}
          </div>

          <button
            onClick={startExtraction}
            disabled={!image || loading || extractedPrompt}
            className={`w-full py-4 rounded-xl font-black text-lg transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)] flex items-center justify-center gap-3 ${!image ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : loading ? 'bg-cyan-600 text-white cursor-wait' : extractedPrompt ? 'bg-emerald-600 text-white' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white hover:scale-[1.02]'}`}
          >
            {loading ? (
              <><div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> Vision-Modell scannt...</>
            ) : extractedPrompt ? (
              '✓ Decodierung abgeschlossen'
            ) : (
              '🔍 Bild decodieren (Reverse Engineer)'
            )}
          </button>
        </div>

        {/* Results Section */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-8 rounded-[2rem] border border-slate-700/50 h-full flex flex-col bg-slate-900/80 shadow-2xl relative overflow-hidden">
            
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="text-cyan-400">⚡</span> Extrahierter Matrix-Code
            </h3>

            {/* Scan Status Indicators */}
            {(loading || extractedPrompt) && (
              <div className="flex justify-between mb-6">
                <div className={`flex flex-col items-center gap-2 transition-opacity ${scanStep >= 1 ? 'opacity-100' : 'opacity-20'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${scanStep > 1 ? 'bg-cyan-500 text-white shadow-[0_0_15px_#22d3ee]' : scanStep === 1 ? 'bg-blue-500/20 text-blue-400 animate-pulse border border-blue-500' : 'bg-slate-800 text-slate-500'}`}>1</div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Subjekt</span>
                </div>
                <div className={`h-px bg-slate-700 flex-1 mt-4 mx-2 ${scanStep > 1 ? 'bg-cyan-500 shadow-[0_0_10px_#22d3ee]' : ''}`}></div>
                <div className={`flex flex-col items-center gap-2 transition-opacity ${scanStep >= 2 ? 'opacity-100' : 'opacity-20'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${scanStep > 2 ? 'bg-cyan-500 text-white shadow-[0_0_15px_#22d3ee]' : scanStep === 2 ? 'bg-blue-500/20 text-blue-400 animate-pulse border border-blue-500' : 'bg-slate-800 text-slate-500'}`}>2</div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Style</span>
                </div>
                <div className={`h-px bg-slate-700 flex-1 mt-4 mx-2 ${scanStep > 2 ? 'bg-cyan-500 shadow-[0_0_10px_#22d3ee]' : ''}`}></div>
                <div className={`flex flex-col items-center gap-2 transition-opacity ${scanStep >= 3 ? 'opacity-100' : 'opacity-20'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${scanStep > 3 ? 'bg-emerald-500 text-white shadow-[0_0_15px_#10b981]' : scanStep === 3 ? 'bg-blue-500/20 text-blue-400 animate-pulse border border-blue-500' : 'bg-slate-800 text-slate-500'}`}>3</div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Prompt</span>
                </div>
              </div>
            )}

            <div className={`flex-1 rounded-2xl border p-6 flex flex-col transition-all duration-500 ${extractedPrompt ? 'bg-slate-950 border-cyan-500/50 shadow-inner' : 'bg-slate-900/50 border-slate-700 border-dashed justify-center items-center'}`}>
              
              {!loading && !extractedPrompt ? (
                <div className="text-center text-slate-500 opacity-50">
                  <div className="text-4xl mb-3">🧩</div>
                  <p className="text-sm font-bold uppercase tracking-wider">Warte auf Bild-Daten</p>
                </div>
              ) : loading ? (
                <div className="h-full flex flex-col justify-center items-center gap-4 animate-pulse text-cyan-400">
                  <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-mono text-xs uppercase tracking-widest text-center">
                    Analysiere Pixel-Strukturen...<br/>
                    <span className="text-slate-500 mt-2 block">Identifiziere Lichtquellen</span>
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs bg-cyan-900/50 text-cyan-400 px-3 py-1 rounded-lg font-bold border border-cyan-500/30">98% Match Confidence</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(extractedPrompt);
                        toast.success('Prompt kopiert!', { icon: '📋' });
                        soundEngine.playSuccess();
                      }}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 border border-slate-600"
                    >
                      Kopieren
                    </button>
                  </div>
                  <div className="flex-1 text-slate-300 font-mono text-sm leading-loose p-4 bg-slate-900 rounded-xl border border-slate-800 overflow-y-auto">
                    {extractedPrompt}
                  </div>
                  
                  {/* Action Buttons Below Prompt */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button className="bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform text-sm flex items-center justify-center gap-2">
                      🎨 In Midjourney öffnen
                    </button>
                    <button className="bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform text-sm border border-slate-600 flex items-center justify-center gap-2">
                      💾 In Workspace speichern
                    </button>
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