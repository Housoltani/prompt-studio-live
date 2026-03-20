/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';

export default function FlowBuilder() {
  const { t } = useLanguage();
  const [nodes] = useState([
    { id: 1, type: 'trigger', name: 'User Input (Thema)', provider: 'System', color: 'slate', icon: '📝', desc: 'Wartet auf eine Texteingabe (z.B. "Cyberpunk Stadt").' },
    { id: 2, type: 'action', name: 'Prompt Generator', provider: 'GPT-4o', color: 'blue', icon: '🤖', desc: 'Erweitert das Thema zu einem massiven 8k Midjourney Prompt.' },
    { id: 3, type: 'action', name: 'Bild-Renderer', provider: 'Midjourney v6', color: 'fuchsia', icon: '🎨', desc: 'Generiert ein 16:9 Meisterwerk in fotorealistischer Qualität.' },
    { id: 4, type: 'action', name: 'Video-Animator', provider: 'Kling 3.0', color: 'emerald', icon: '🎥', desc: 'Animiert das generierte Bild mit einem langsamen Kamera-Pan.' }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [cursors, setCursors] = useState({});
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  // Simulated Multiplayer Presence
  React.useEffect(() => {
    if (!isMultiplayer) return;

    // In a real app, this connects to Supabase Channel
    // For demo: randomly simulate teammates moving around
    const mockInterval = setInterval(() => {
      setCursors({
        'user_1': { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, name: 'Sven', color: '#3b82f6' },
        'user_2': { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, name: 'Mia', color: '#10b981' }
      });
    }, 1500);

    return () => clearInterval(mockInterval);
  }, [isMultiplayer]);

  const [activeNode, setActiveNode] = useState(null);
  const [selectedConfigNode, setSelectedConfigNode] = useState(null);

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
        
        
        <div className="flex gap-3">
          {/* Multiplayer Toggle */}
          <button 
            onClick={() => setIsMultiplayer(!isMultiplayer)}
            className={`px-4 py-3 rounded-xl text-sm font-bold border flex items-center gap-2 transition-all shadow-lg ${isMultiplayer ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}`}
          >
            <span className="text-xl">🌍</span> {isMultiplayer ? 'Live Session (3)' : 'Team einladen'}
          </button>

          <button 
            onClick={() => setShowApiModal(true)}
            className="px-6 py-3 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all shadow-lg border border-slate-700 flex items-center gap-2 hover:border-blue-500/50"
          >
            🔌 API Export
          </button>
          <button 
            onClick={runFlow}
            disabled={isRunning}
            className={`px-8 py-3 rounded-xl font-black transition-all shadow-lg flex items-center gap-2 ${isRunning ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/30 hover:scale-105'}`}
          >
            {isRunning ? (
              <><div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div> Sequenz läuft...</>
            ) : (
              <>▶ Flow starten</>
            )}
          </button>
        </div>
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

            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase ml-1 mt-4">Automatisierung & Export</div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-rose-500 transition-all duration-300 flex items-center gap-3 group relative overflow-hidden hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                {/* Animated Scanner Line on Hover */}
                <div className="absolute top-0 bottom-0 left-[-10px] w-1 bg-gradient-to-b from-transparent via-rose-400 to-transparent blur-sm opacity-0 group-hover:opacity-100 group-hover:animate-pulse shadow-[0_0_10px_rgba(244,63,94,1)]"></div>
                <div className="absolute top-0 right-0 w-8 h-8 bg-rose-500/10 rounded-full blur-xl group-hover:scale-150 group-hover:bg-rose-500/20 transition-all duration-500"></div>
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 group-hover:border-rose-400 flex items-center justify-center text-sm font-black shadow-[0_0_10px_rgba(244,63,94,0.3)] transition-all">
                  n8n
                </div>
                <div className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors z-10">n8n Webhook</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-orange-500/50 transition-colors flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-lg font-black font-mono">
                  Z_
                </div>
                <div className="text-sm font-bold text-slate-300 group-hover:text-orange-400 transition-colors">Zapier Action</div>
              </div>
              <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-grab hover:border-purple-500/50 transition-colors flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg">
                  🌐
                </div>
                <div className="text-sm font-bold text-slate-300 group-hover:text-purple-400 transition-colors">Custom REST API</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase ml-1 mt-4">Social Publishing (Auto-Post)</div>
              
              {/* YouTube Shorts Node */}
              <div onClick={() => { setSelectedConfigNode('youtube'); soundEngine.playPop(); }} className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-pointer hover:border-red-500 transition-all duration-300 flex items-center gap-3 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-red-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center text-lg shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  ▶️
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">YouTube Shorts</div>
                  <div className="text-[9px] text-slate-500">Video Upload & Tags</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-red-500 transition-colors"></div>
              </div>

              {/* Instagram Reels Node */}
              <div onClick={() => { setSelectedConfigNode('instagram'); soundEngine.playPop(); }} className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-pointer hover:border-pink-500 transition-all duration-300 flex items-center gap-3 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-tr from-yellow-500/10 via-pink-500/10 to-purple-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-yellow-500/20 via-pink-500/20 to-purple-500/20 text-pink-400 flex items-center justify-center text-lg">
                  📸
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Instagram Reel</div>
                  <div className="text-[9px] text-slate-500">Graph API Posting</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-pink-500 transition-colors"></div>
              </div>

              {/* TikTok Node */}
              <div onClick={() => { setSelectedConfigNode('tiktok'); soundEngine.playPop(); }} className="bg-slate-950/50 border border-slate-700 p-3 rounded-xl cursor-pointer hover:border-cyan-500 transition-all duration-300 flex items-center gap-3 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 text-white flex items-center justify-center text-lg font-bold shadow-[0_0_10px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <span className="text-cyan-400 drop-shadow-[1px_1px_0_#f43f5e]">♪</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">TikTok Upload</div>
                  <div className="text-[9px] text-slate-500">Direct Post & Sound</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-cyan-500 transition-colors"></div>
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

          {/* Social Publisher Config Sidebar (Overlay) */}
          <div className={`absolute top-0 right-0 h-full w-80 bg-slate-900 border-l border-slate-700/50 shadow-2xl transition-transform duration-300 z-50 flex flex-col ${selectedConfigNode ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
              <h3 className="font-bold text-white flex items-center gap-2">
                {selectedConfigNode === 'youtube' && <><span className="text-red-500">▶️</span> YouTube Config</>}
                {selectedConfigNode === 'instagram' && <><span className="text-pink-500">📸</span> Instagram Config</>}
                {selectedConfigNode === 'tiktok' && <><span className="text-cyan-400">♪</span> TikTok Config</>}
              </h3>
              <button 
                onClick={() => { setSelectedConfigNode(null); soundEngine.playPop(); }}
                className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* Account Connection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Account</label>
                <button className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg ${
                  selectedConfigNode === 'youtube' ? 'bg-red-600 hover:bg-red-500 text-white' :
                  selectedConfigNode === 'instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white' :
                  'bg-white hover:bg-gray-100 text-black'
                }`}>
                  {selectedConfigNode === 'youtube' && 'Mit Google verbinden'}
                  {selectedConfigNode === 'instagram' && 'Mit Meta verbinden'}
                  {selectedConfigNode === 'tiktok' && 'Mit TikTok verbinden'}
                </button>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Status: Warte auf Autorisierung
                </div>
              </div>

              {/* Post Settings */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">Post Titel / Caption</label>
                  <textarea 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 h-24 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Generierter Titel wird hier eingefügt..."
                    defaultValue="{{flow.generated_text.title}}"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">Hashtags</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
                    defaultValue="#ai #generated #viral"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">Veröffentlichung</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors">
                    <option value="draft">Als Entwurf speichern</option>
                    <option value="public">Sofort veröffentlichen (Öffentlich)</option>
                    <option value="private">Privat hochladen</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
              <button 
                onClick={() => { 
                  toast.success('Einstellungen gespeichert!'); 
                  setSelectedConfigNode(null);
                  soundEngine.playSuccess();
                }}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-lg"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* API EXPORT MODAL */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowApiModal(false)}></div>
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-2xl w-full relative z-10 shadow-2xl animate-scale-in">
            <button onClick={() => setShowApiModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">🔌</div>
              <div>
                <h3 className="text-2xl font-black text-white">API Endpoint Deployment</h3>
                <p className="text-slate-400 text-sm">Dein Flow ist nun als RESTful API erreichbar.</p>
              </div>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6 font-mono text-sm overflow-x-auto relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => { navigator.clipboard.writeText("curl -X POST https://api.promptstudio.live/v1/flows/execute/flow_7a9b2c \\\n  -H 'Authorization: Bearer YOUR_API_KEY' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"inputs\": {\"prompt\": \"Eine epische Fantasy Landschaft\"}}'"); toast.success("Kopiert!"); }} 
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-md text-xs border border-slate-700"
                >Kopieren</button>
              </div>
              <span className="text-pink-500">curl</span> <span className="text-yellow-300">-X POST</span> <span className="text-emerald-400">https://api.promptstudio.live/v1/flows/execute/flow_7a9b2c</span> \<br/>
              &nbsp;&nbsp;<span className="text-yellow-300">-H</span> <span className="text-blue-300">'Authorization: Bearer YOUR_API_KEY'</span> \<br/>
              &nbsp;&nbsp;<span className="text-yellow-300">-H</span> <span className="text-blue-300">'Content-Type: application/json'</span> \<br/>
              &nbsp;&nbsp;<span className="text-yellow-300">-d</span> <span className="text-blue-300">'{'{'}"inputs": {'{'}"prompt": "Eine epische Fantasy Landschaft"{'}'}{'}'}'</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <p className="text-slate-400 text-xs mb-1 font-bold">RATE LIMIT</p>
                <p className="text-white text-lg">120 Req / Minute</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <p className="text-slate-400 text-xs mb-1 font-bold">KOSTEN PRO CALL</p>
                <p className="text-emerald-400 text-lg">~ 4 Sparks</p>
              </div>
            </div>

            <button onClick={() => setShowApiModal(false)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors">
              Endpunkt verwalten
            </button>
          </div>
        </div>
      )}

    </div>
  );
}