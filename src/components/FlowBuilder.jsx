import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';

export default function FlowBuilder() {
  const [nodes, setNodes] = useState([
    { id: 1, type: 'trigger', name: 'User Input (Thema)', provider: 'System', color: 'slate', icon: '📝', desc: 'Wartet auf eine Texteingabe (z.B. "Cyberpunk Stadt").' },
    { id: 2, type: 'action', name: 'Prompt Generator', provider: 'GPT-4o', color: 'blue', icon: '🤖', desc: 'Erweitert das Thema zu einem massiven 8k Midjourney Prompt.' },
    { id: 3, type: 'action', name: 'Bild-Renderer', provider: 'Midjourney v6', color: 'fuchsia', icon: '🎨', desc: 'Generiert ein 16:9 Meisterwerk in fotorealistischer Qualität.' },
    { id: 4, type: 'action', name: 'Video-Animator', provider: 'Kling 3.0', color: 'emerald', icon: '🎥', desc: 'Animiert das generierte Bild mit einem langsamen Kamera-Pan.' }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

  const runFlow = () => {
    soundEngine.playTransform();
    setIsRunning(true);
    setActiveNode(1);
    toast('Flow-Sequenz initiiert...', { icon: '⚡' });

    let currentStep = 1;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= nodes.length) {
        soundEngine.playSuccess();
        setActiveNode(currentStep);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
          setActiveNode(null);
          soundEngine.playSuccess();
          toast.success('Workflow erfolgreich beendet! Video gespeichert.', { duration: 4000 });
        }, 1000);
      }
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-20 mt-4 h-[calc(100vh-100px)] flex flex-col">
      
      {/* HEADER */}
      <div className="flex-shrink-0 flex justify-between items-end mb-2 px-4">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-2 tracking-tight">
            ⚡ Flow Builder
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Verkette KI-Modelle zu automatisierten Pipelines. Vom einfachen Text-Prompt bis zum fertigen Video-Clip mit nur einem Klick.
          </p>
        </div>
        <button 
          onClick={runFlow}
          disabled={isRunning}
          className={`px-8 py-3 rounded-xl font-black transition-all shadow-lg flex items-center gap-2 ${isRunning ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/30 hover:scale-105'}`}
        >
          {isRunning ? (
            <><div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div> Sequenz läuft...</>
          ) : (
            <><span className="text-xl">▶</span> Flow ausführen</>
          )}
        </button>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* LEFT TOOLBAR (AVAILABLE MODELS) */}
        <div className="w-72 glass-panel border border-slate-700/50 rounded-3xl p-6 bg-slate-900/80 flex flex-col overflow-y-auto hidden md:flex">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Modell-Bibliothek</h3>
          
          <div className="space-y-4 pb-4">
            
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase ml-1">Text & Logik</div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-blue-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">✨</div>
                <div className="text-sm font-bold text-slate-300">GPT 5 mini</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-blue-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">✨</div>
                <div className="text-sm font-bold text-slate-300">GPT 4.1</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-indigo-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-lg">🐳</div>
                <div className="text-sm font-bold text-slate-300">DeepSeek V3.2 Speciale</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-indigo-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-lg">🐳</div>
                <div className="text-sm font-bold text-slate-300">DeepSeek V3.2</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-indigo-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-lg">🐳</div>
                <div className="text-sm font-bold text-slate-300">DeepSeek R1</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-slate-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-500/20 text-slate-400 flex items-center justify-center text-lg">∅</div>
                <div className="text-sm font-bold text-slate-300">Grok 4</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-slate-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-500/20 text-slate-400 flex items-center justify-center text-lg">∅</div>
                <div className="text-sm font-bold text-slate-300">Grok 4.1 Fast</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-yellow-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-lg">〰️</div>
                <div className="text-sm font-bold text-slate-300">MiniMax M2.5</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-purple-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg">🌑</div>
                <div className="text-sm font-bold text-slate-300">Kimi K2.5</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-blue-400/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-400/20 text-blue-400 flex items-center justify-center text-lg">🤖</div>
                <div className="text-sm font-bold text-slate-300">GPT OSS 120B</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase ml-1 mt-4">Bild-Generatoren</div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-pink-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-lg">✨</div>
                <div className="text-sm font-bold text-slate-300">Nano Banana 2</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-pink-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-lg">🍌</div>
                <div className="text-sm font-bold text-slate-300">Nano Banana Pro</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-emerald-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">📊</div>
                <div className="text-sm font-bold text-slate-300">Seedream V5.0 Lite</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-red-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-lg">💃</div>
                <div className="text-sm font-bold text-slate-300">Seedance 2.0</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-pink-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-lg">✨</div>
                <div className="text-sm font-bold text-slate-300">Nano Banana 1 (Flash)</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-blue-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">🤖</div>
                <div className="text-sm font-bold text-slate-300">GPT Image 1.5</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-emerald-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">📊</div>
                <div className="text-sm font-bold text-slate-300">Seedream v4.5</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-blue-400/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-400/20 text-blue-400 flex items-center justify-center text-lg">✨</div>
                <div className="text-sm font-bold text-slate-300">Gemini 3.1 Pro</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-blue-400/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-400/20 text-blue-400 flex items-center justify-center text-lg">✨</div>
                <div className="text-sm font-bold text-slate-300">Gemini 3 Flash</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-blue-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">🤖</div>
                <div className="text-sm font-bold text-slate-300">GPT 5.4</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-blue-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">🤖</div>
                <div className="text-sm font-bold text-slate-300">GPT 5.2 Pro</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase ml-1 mt-4">Video-Engines</div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-blue-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">🔵</div>
                <div className="text-sm font-bold text-slate-300">Kling 3.0 Standard</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-blue-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">🔵</div>
                <div className="text-sm font-bold text-slate-300">Kling V2.6 Pro</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-red-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-lg">💃</div>
                <div className="text-sm font-bold text-slate-300">Seedance 2.0</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-indigo-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-lg">✡️</div>
                <div className="text-sm font-bold text-slate-300">Wan V2.6</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-teal-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-lg">🌀</div>
                <div className="text-sm font-bold text-slate-300">Veo 3.1</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-blue-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">🤖</div>
                <div className="text-sm font-bold text-slate-300">Sora 2</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase ml-1 mt-4">Audio & Musik</div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-emerald-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">🎵</div>
                <div className="text-sm font-bold text-slate-300">Suno v3.5 / v3</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-purple-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg">🎵</div>
                <div className="text-sm font-bold text-slate-300">Udio</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-slate-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-500/20 text-slate-400 flex items-center justify-center text-lg">🎙️</div>
                <div className="text-sm font-bold text-slate-300">ElevenLabs</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-indigo-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-lg">🔊</div>
                <div className="text-sm font-bold text-slate-300">Stable Audio</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase ml-1 mt-4">Utilities & Tools</div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-amber-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg">🔍</div>
                <div className="text-sm font-bold text-slate-300">Web Scraper / Search</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-emerald-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">🔄</div>
                <div className="text-sm font-bold text-slate-300">Prompt Extractor</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-fuchsia-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center text-lg">⬆️</div>
                <div className="text-sm font-bold text-slate-300">Upscaler (4x / 8x)</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-pink-500/50 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-lg">✂️</div>
                <div className="text-sm font-bold text-slate-300">Background Remover</div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT CANVAS (FLOW EDITOR) */}
        <div className="flex-1 glass-card border border-slate-700/50 rounded-3xl bg-slate-950/50 relative overflow-hidden flex justify-center py-10">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col gap-2">
            
            {nodes.map((node, index) => {
              const isActive = activeNode === node.id;
              const isPast = activeNode > node.id;
              
              let colorClass = 'border-slate-700 bg-slate-900/80';
              let glowClass = '';
              
              if (isActive) {
                if (node.color === 'blue') { colorClass = 'border-blue-500 bg-blue-900/20'; glowClass = 'shadow-[0_0_30px_rgba(59,130,246,0.3)]'; }
                if (node.color === 'fuchsia') { colorClass = 'border-fuchsia-500 bg-fuchsia-900/20'; glowClass = 'shadow-[0_0_30px_rgba(217,70,239,0.3)]'; }
                if (node.color === 'emerald') { colorClass = 'border-emerald-500 bg-emerald-900/20'; glowClass = 'shadow-[0_0_30px_rgba(16,185,129,0.3)]'; }
                if (node.color === 'slate') { colorClass = 'border-slate-400 bg-slate-800'; glowClass = 'shadow-[0_0_30px_rgba(148,163,184,0.3)]'; }
              } else if (isPast) {
                colorClass = 'border-emerald-500/50 bg-emerald-900/10 opacity-70';
              }

              return (
                <div key={node.id} className="relative flex flex-col items-center group">
                  
                  {/* The Node Block */}
                  <div className={`w-full p-5 rounded-2xl border-2 transition-all duration-500 flex items-center gap-5 ${colorClass} ${glowClass} relative z-10 cursor-pointer hover:scale-[1.02]`}>
                    
                    {/* Status Icon */}
                    <div className="absolute -left-3 -top-3">
                       {isPast && <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-lg">✓</div>}
                       {isActive && <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs shadow-lg animate-bounce">⚡</div>}
                    </div>

                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 ${isActive ? 'bg-slate-800' : 'bg-slate-800/50'}`}>
                      {node.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-bold text-white">{node.name}</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950/80 px-2 py-1 rounded text-slate-400 border border-slate-800">
                          {node.provider}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">{node.desc}</p>
                    </div>

                    {/* Settings Cog */}
                    <button className="text-slate-600 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </button>
                  </div>

                  {/* Connecting Line */}
                  {index < nodes.length - 1 && (
                    <div className="h-10 w-1 bg-slate-700/50 relative">
                      {/* Flow Animation Dot */}
                      {(isActive || isPast) && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399] animate-[slide-down_2s_linear_infinite]"></div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Add Node Button */}
            <div className="mt-4 flex justify-center">
              <button className="w-12 h-12 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-500 hover:text-white hover:border-blue-500 hover:bg-blue-500/20 transition-all text-2xl group">
                <span className="group-hover:scale-125 transition-transform">+</span>
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}