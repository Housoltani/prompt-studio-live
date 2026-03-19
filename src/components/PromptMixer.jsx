import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';

const PROMPT_BLOCKS = {
  Subject: [
    { id: 'sub1', text: 'A futuristic cyborg samurai', icon: '🥷' },
    { id: 'sub2', text: 'A massive glowing crystal monolith', icon: '💎' },
    { id: 'sub3', text: 'An abandoned overgrown train station', icon: '🌿' },
    { id: 'sub4', text: 'A majestic space cruiser floating in orbit', icon: '🚀' },
    { id: 'sub5', text: 'A cyberpunk street vendor cooking noodles', icon: '🍜' }
  ],
  Environment: [
    { id: 'env1', text: 'in a rainy neon-lit alleyway', icon: '🌧️' },
    { id: 'env2', text: 'on the surface of Mars', icon: '🔴' },
    { id: 'env3', text: 'underwater surrounded by glowing coral', icon: '🌊' },
    { id: 'env4', text: 'in a dense enchanted forest', icon: '🌲' }
  ],
  Lighting: [
    { id: 'lit1', text: 'cinematic volumetric lighting', icon: '🎬' },
    { id: 'lit2', text: 'golden hour sunset', icon: '🌅' },
    { id: 'lit3', text: 'harsh neon rim lights', icon: '🟣' },
    { id: 'lit4', text: 'moody low key lighting', icon: '🌑' }
  ],
  Camera: [
    { id: 'cam1', text: 'shot on 35mm lens, depth of field', icon: '📷' },
    { id: 'cam2', text: 'wide angle establishing shot', icon: '🔭' },
    { id: 'cam3', text: 'extreme close up macro', icon: '🔎' },
    { id: 'cam4', text: 'drone FPV shot', icon: '🛸' }
  ],
  Style: [
    { id: 'sty1', text: '8k resolution, highly detailed masterpiece', icon: '✨' },
    { id: 'sty2', text: 'Studio Ghibli anime style', icon: '🌸' },
    { id: 'sty3', text: 'Unreal Engine 5 render, raytracing', icon: '🎮' },
    { id: 'sty4', text: 'watercolor illustration', icon: '🖌️' }
  ]
};

export default function PromptMixer() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Subject');
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [aspectRatio, setAspectRatio] = useState('--ar 16:9');
  const [engine, setEngine] = useState('--v 6.0');

  const handleAddBlock = (block) => {
    soundEngine.playPop();
    // check if already added
    if (selectedBlocks.find(b => b.id === block.id)) {
      setSelectedBlocks(selectedBlocks.filter(b => b.id !== block.id));
    } else {
      setSelectedBlocks([...selectedBlocks, block]);
    }
  };

  const handleRemoveBlock = (id) => {
    soundEngine.playPop();
    setSelectedBlocks(selectedBlocks.filter(b => b.id !== id));
  };

  const generateFinalPrompt = () => {
    const core = selectedBlocks.map(b => b.text).join(', ');
    if (!core) return '';
    return `/imagine prompt: ${core} ${aspectRatio} ${engine} --stylize 250`;
  };

  const finalPrompt = generateFinalPrompt();

  const handleCopy = () => {
    if (!finalPrompt) return;
    navigator.clipboard.writeText(finalPrompt);
    soundEngine.playSuccess();
    toast.success('Mix kopiert!', { icon: '📋' });
  };

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4 px-4 pb-20 h-full min-h-[calc(100vh-120px)] flex flex-col">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 tracking-tight">
            🎛️ Prompt Mixer
          </h2>
          <p className="text-slate-400 text-lg">Konstruiere Meisterwerke Block für Block. Perfekt für Midjourney & DALL-E.</p>
        </div>
        <button 
          onClick={() => { setSelectedBlocks([]); soundEngine.playPop(); }}
          className="text-sm font-bold bg-slate-800 text-slate-400 px-4 py-2 rounded-xl border border-slate-700 hover:text-white hover:border-slate-500 transition-colors"
        >
          Mixer leeren
        </button>
      </div>

      {/* THE CONSOLE (Result Area) */}
      <div className="glass-panel p-6 rounded-[2rem] border-2 border-emerald-500/30 bg-slate-900/80 shadow-[0_0_40px_rgba(16,185,129,0.15)] mb-8 relative overflow-hidden flex-shrink-0">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-teal-600 shadow-[0_0_15px_#34d399]"></div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
            Output Console
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-colors" title="Settings">⚙️</button>
            <button 
              onClick={handleCopy}
              disabled={!finalPrompt}
              className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-all shadow-lg flex items-center gap-2 ${finalPrompt ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
            >
              📋 Kopieren
            </button>
          </div>
        </div>

        <div className="w-full min-h-[100px] bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-sm leading-loose text-slate-300 break-words shadow-inner flex flex-wrap items-center gap-2">
          {!finalPrompt ? (
            <span className="text-slate-600 animate-pulse">Wähle Blöcke aus der Bibliothek aus, um den Prompt zu generieren...</span>
          ) : (
            <>
              <span className="text-blue-400 font-bold">/imagine prompt:</span>
              {selectedBlocks.map((block, idx) => (
                <span key={block.id} className="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-white inline-flex items-center gap-1 hover:bg-slate-700 transition-colors cursor-pointer" onClick={() => handleRemoveBlock(block.id)}>
                  <span className="opacity-50 text-xs">{block.icon}</span> {block.text}
                  <span className="text-slate-500 ml-1 hover:text-red-400">×</span>
                  {idx < selectedBlocks.length - 1 && <span className="text-slate-600 ml-1">,</span>}
                </span>
              ))}
              <span className="text-emerald-400 font-bold bg-emerald-900/30 border border-emerald-500/30 px-2 py-0.5 rounded ml-1">{aspectRatio}</span>
              <span className="text-fuchsia-400 font-bold bg-fuchsia-900/30 border border-fuchsia-500/30 px-2 py-0.5 rounded ml-1">{engine}</span>
              <span className="text-amber-400 font-bold bg-amber-900/30 border border-amber-500/30 px-2 py-0.5 rounded ml-1">--stylize 250</span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* CATEGORY SELECTOR */}
        <div className="w-full lg:w-64 glass-card border border-slate-700/50 rounded-3xl p-5 bg-slate-900/80 flex flex-col gap-2 flex-shrink-0">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 px-2">Kategorien</h3>
          
          {Object.keys(PROMPT_BLOCKS).map(cat => (
            <button 
              key={cat}
              onClick={() => { setActiveCategory(cat); soundEngine.playPop(); }}
              className={`w-full flex items-center justify-between p-3 rounded-xl font-bold transition-all ${activeCategory === cat ? 'bg-slate-800 text-white shadow-md border border-slate-600' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {cat === 'Subject' ? '🎯' : cat === 'Environment' ? '🌍' : cat === 'Lighting' ? '💡' : cat === 'Camera' ? '📷' : '🎨'}
                </span>
                {cat}
              </div>
              <span className="text-[10px] bg-slate-950 px-2 py-1 rounded border border-slate-800">
                {PROMPT_BLOCKS[cat].length}
              </span>
            </button>
          ))}

          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mt-6 mb-2 px-2">Parameter</h3>
          
          <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl mb-2">
            <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Aspect Ratio</div>
            <div className="grid grid-cols-2 gap-1.5">
              {['--ar 16:9', '--ar 9:16', '--ar 1:1', '--ar 4:5'].map(ar => (
                <button key={ar} onClick={() => { setAspectRatio(ar); soundEngine.playPop(); }} className={`text-[10px] py-1 rounded font-bold transition-colors ${aspectRatio === ar ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                  {ar.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Engine Version</div>
            <div className="grid grid-cols-2 gap-1.5">
              {['--v 6.0', '--v 5.2', '--niji 6', '--style raw'].map(eng => (
                <button key={eng} onClick={() => { setEngine(eng); soundEngine.playPop(); }} className={`text-[10px] py-1 rounded font-bold transition-colors ${engine === eng ? 'bg-fuchsia-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                  {eng.replace('--', '')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BLOCKS LIBRARY */}
        <div className="flex-1 glass-card border border-slate-700/50 rounded-3xl bg-slate-900/50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6 border-b border-slate-800/50 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">⚡</span> Bausteine: {activeCategory}
            </h3>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              {selectedBlocks.filter(b => PROMPT_BLOCKS[activeCategory].find(catBlock => catBlock.id === b.id)).length} Ausgewählt
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {PROMPT_BLOCKS[activeCategory].map(block => {
              const isSelected = selectedBlocks.find(b => b.id === block.id);
              return (
                <div 
                  key={block.id}
                  onClick={() => handleAddBlock(block)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 group flex items-start gap-4 border-2 ${isSelected ? 'bg-emerald-900/20 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)] transform scale-[1.02]' : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-colors ${isSelected ? 'bg-emerald-500/20' : 'bg-slate-900 group-hover:bg-slate-800'}`}>
                    {block.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold leading-snug transition-colors ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                      {block.text}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-600 group-hover:border-slate-400'}`}>
                      {isSelected && <span className="text-xs font-black">✓</span>}
                      {!isSelected && <span className="text-xs font-black text-slate-600 group-hover:text-slate-400">+</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add custom block */}
          <div className="mt-8 pt-6 border-t border-slate-800/50">
            <div className="flex gap-3 max-w-xl">
              <input type="text" placeholder="Eigener Baustein (z.B. 'Cybernetic eye')..." className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" />
              <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl border border-slate-600 transition-colors flex items-center gap-2">
                <span>+</span> Hinzufügen
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}