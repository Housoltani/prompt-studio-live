import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Type, Wand2, Sparkles, Share2, Clapperboard, Hash } from 'lucide-react';

export default function SocialMediaEngine() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [tone, setTone] = useState('Viral & Energetic');
  const [generatedScript, setGeneratedScript] = useState('');

  const generateScript = () => {
    setGeneratedScript(`[HOOK - 0:00-0:03]\n(Fast zoom in, dynamic text on screen)\n"Stop scrolling! If you care about ${topic || 'this'}, you need to hear this."\n\n[BODY - 0:03-0:15]\n(Quick cuts, B-roll of ${topic || 'the subject'}, text overlays)\n"Did you know that 99% of people get ${topic || 'this'} wrong? The secret is actually leveraging ${tone} strategies to hack the algorithm. Here is the step-by-step breakdown..."\n\n[CALL TO ACTION - 0:15-0:20]\n(Point to screen, text pop-up)\n"Save this video for later and follow for more ${platform} secrets!"\n\n[SUGGESTED HASHTAGS]\n#${topic.replace(/\s+/g, '') || 'viral'} #${platform.toLowerCase()}growth #${tone.split(' ')[0].toLowerCase()} #mindblown`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-24 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-8 rounded-3xl border border-pink-500/30 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <h1 className="text-4xl font-black mb-4 flex items-center gap-3">
            <Share2 className="w-10 h-10 text-pink-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
              Social Media Engine
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg">
            Die ultimative Content-Maschine. Generiere virale Skripte, Hooks und Video-Prompts für TikTok, Reels und Shorts in Sekunden.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <Type className="w-4 h-4 text-pink-400" /> Topic / Nische
              </label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="z.B. KI-Tools für Anfänger"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <Video className="w-4 h-4 text-pink-400" /> Plattform
              </label>
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
              >
                <option>TikTok</option>
                <option>Instagram Reels</option>
                <option>YouTube Shorts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-pink-400" /> Vibe & Tone
              </label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
              >
                <option>Viral & Energetic</option>
                <option>Educational & Calm</option>
                <option>Storytime / Emotional</option>
                <option>Humorous & Satirical</option>
              </select>
            </div>

            <button 
              onClick={generateScript}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-pink-500/25"
            >
              <Sparkles className="w-5 h-5" />
              Viral-Skript Generieren
            </button>
          </motion.div>

          {/* Output */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl flex flex-col"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-pink-300">
              <Clapperboard className="w-5 h-5" /> Director's Output
            </h2>
            
            <div className="flex-1 bg-gray-900/80 rounded-xl border border-gray-700 p-6 font-mono text-sm text-gray-300 whitespace-pre-wrap overflow-y-auto min-h-[300px]">
              {generatedScript ? (
                <div>
                  <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                    <span className="text-pink-400 font-bold">/// SCRIPT_READY</span>
                    <span className="text-xs text-gray-500">FORMAT: {platform.toUpperCase()}</span>
                  </div>
                  {generatedScript}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                  <Hash className="w-12 h-12 opacity-20" />
                  <p>Warte auf Parameter... Generiere dein nächstes virales Meisterwerk.</p>
                </div>
              )}
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
