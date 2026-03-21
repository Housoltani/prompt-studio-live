import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function AssetLab() {
  const [prompt, setPrompt] = useState('');
  const [assetType, setAssetType] = useState('3d_model');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = () => {
    if (!prompt) {
      toast.error('Bitte beschreibe dein Asset.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Asset erfolgreich generiert!');
    }, 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-8 animate-fade-in mt-4 pb-20"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2 tracking-tight">
            🧊 Das 3D & Asset Labor
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Generiere 3D-Modelle, Texturen und Game Assets in Sekundenbruchteilen mit holografischer Vorschau.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel border border-slate-700/50 rounded-3xl p-6 bg-slate-900/60 backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Was möchtest du erschaffen?</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="z.B. Ein futuristisches Cyberpunk-Schwert mit leuchtenden Neon-Details..."
                className="w-full h-32 bg-slate-950/50 border border-slate-700 rounded-2xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all shadow-inner"
              />
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setAssetType('3d_model')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${assetType === '3d_model' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'}`}
              >
                🧊 3D Modell
              </button>
              <button 
                onClick={() => setAssetType('texture')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${assetType === 'texture' ? 'bg-pink-600/20 text-pink-400 border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'}`}
              >
                🎨 Textur
              </button>
              <button 
                onClick={() => setAssetType('sprite')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${assetType === 'sprite' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'}`}
              >
                👾 2D Sprite
              </button>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 relative overflow-hidden ${isGenerating ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]'}`}
            >
              {isGenerating ? (
                <><div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div> Generiere...</>
              ) : (
                <>✨ Asset Generieren</>
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel border border-slate-700/50 rounded-3xl p-6 bg-slate-900/60 backdrop-blur-md relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent rounded-3xl"></div>
          
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Holografische Vorschau</h3>
          
          <div className="aspect-square bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
             {/* Holographic grid and scanning effect */}
             <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 animate-[slide-down_3s_linear_infinite]"></div>
             
             {isGenerating ? (
               <div className="relative">
                 <div className="w-32 h-32 border-4 border-purple-500/30 rounded-full animate-spin absolute inset-0 border-t-purple-500"></div>
                 <div className="w-32 h-32 border-4 border-pink-500/20 rounded-full animate-spin absolute inset-0 border-b-pink-500" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
                 <div className="absolute inset-0 flex items-center justify-center text-4xl animate-pulse text-purple-400">🧊</div>
               </div>
             ) : (
               <div className="text-center text-slate-500">
                 <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-500 group-hover:text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">✨</div>
                 <p className="text-sm">Warte auf Generierung...</p>
               </div>
             )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
