import React, { useState } from 'react';
import { Settings, Play, Mic, Video, Volume2, Maximize, UserCheck, CheckCircle, RefreshCcw, Sliders } from 'lucide-react';

const VoiceAvatarStudio = () => {
  const [activeTab, setActiveTab] = useState('voice');
  const [promptText, setPromptText] = useState('Hallo! Ich bin dein neuer KI-Assistent. Wie kann ich dir heute helfen?');
  const [selectedVoice, setSelectedVoice] = useState('Nova');
  const [emotion, setEmotion] = useState('Neutral');
  const [pacing, setPacing] = useState(50);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult({
        type: activeTab,
        url: '#',
        timestamp: new Date().toLocaleTimeString()
      });
    }, 2000);
  };

  const insertSSML = (tag) => {
    setPromptText((prev) => prev + ` <${tag}></${tag}>`);
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
        <div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 flex items-center gap-3">
            <Mic className="text-purple-400" size={32} />
            Deep Voice & Avatar Studio
          </h2>
          <p className="text-gray-400 mt-2">Generiere hochrealistische KI-Stimmen (ElevenLabs) & Video-Avatare (HeyGen) mit exakter Kontrolle.</p>
        </div>
        <div className="flex bg-white/10 rounded-xl p-1">
          <button 
            onClick={() => setActiveTab('voice')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'voice' ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <Volume2 size={16} /> Deep Voice
          </button>
          <button 
            onClick={() => setActiveTab('avatar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'avatar' ? 'bg-pink-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <UserCheck size={16} /> Video Avatar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Col - Editor */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Settings size={20} className="text-purple-400" />
                Script & Regieanweisungen
              </h3>
              <div className="flex gap-2">
                <button onClick={() => insertSSML('break time="1s"')} className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs text-gray-300">Pause</button>
                <button onClick={() => insertSSML('emphasis level="strong"')} className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs text-gray-300">Betonung</button>
                <button onClick={() => insertSSML('prosody pitch="+10%"')} className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs text-gray-300">Tonhöhe</button>
              </div>
            </div>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono text-sm h-48 resize-none shadow-inner"
              placeholder="Gib hier deinen Text ein. Nutze SSML Tags für präzise Steuerung..."
            />
            
            <div className="mt-6">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold text-white shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <><RefreshCcw className="animate-spin" size={20} /> Generiere...</>
                ) : (
                  <><Play size={20} fill="currentColor" /> {activeTab === 'voice' ? 'Voice generieren' : 'Avatar rendern'}</>
                )}
              </button>
            </div>
          </div>

          {generatedResult && (
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-green-500/30 shadow-xl animate-fade-in">
              <h3 className="text-lg font-bold text-green-400 flex items-center gap-2 mb-4">
                <CheckCircle size={20} />
                Generierung erfolgreich ({generatedResult.timestamp})
              </h3>
              <div className="bg-black/40 rounded-xl p-8 flex flex-col items-center justify-center border border-white/5">
                {activeTab === 'voice' ? (
                  <div className="w-full max-w-md">
                    <div className="flex items-center gap-4 mb-2 text-sm text-gray-400">
                      <Volume2 size={16} /> preview_audio.wav
                    </div>
                    <div className="h-12 bg-white/5 rounded-full w-full overflow-hidden flex items-center px-4 relative">
                      <div className="absolute left-0 top-0 bottom-0 bg-purple-500/20 w-1/3"></div>
                      <div className="flex-1 flex gap-1 items-center justify-center h-4">
                        {[...Array(30)].map((_, i) => (
                          <div key={i} className="w-1 bg-purple-400 rounded-full" style={{ height: `${Math.random() * 100}%` }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-lg aspect-video bg-black rounded-xl border border-white/10 overflow-hidden relative flex items-center justify-center group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" alt="Avatar Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                    <Play size={48} className="absolute text-white/80 group-hover:scale-110 transition-transform" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Col - Settings */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <Sliders size={20} className="text-pink-400" />
              {activeTab === 'voice' ? 'Stimmen-Setup' : 'Avatar-Konfiguration'}
            </h3>
            
            <div className="space-y-5">
              {/* Voice Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Basis-Stimme</label>
                <select 
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                >
                  <option>Nova (Warm, Weiblich)</option>
                  <option>Adam (Tief, Männlich)</option>
                  <option>Rachel (Professionell, Weiblich)</option>
                  <option>Marcus (Ernst, Männlich)</option>
                </select>
              </div>

              {/* Emotion */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Emotion / Stimmung</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Neutral', 'Fröhlich', 'Ernst', 'Traurig', 'Aufgeregt', 'Flüsternd'].map(emo => (
                    <button
                      key={emo}
                      onClick={() => setEmotion(emo)}
                      className={`px-3 py-2 rounded-lg text-sm border transition-all ${emotion === emo ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-black/20 border-white/5 text-gray-400 hover:border-white/20'}`}
                    >
                      {emo}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Sprechtempo</span>
                  <span className="text-purple-400">{pacing}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={pacing} 
                  onChange={(e) => setPacing(e.target.value)}
                  className="w-full accent-purple-500"
                />
              </div>

              {activeTab === 'avatar' && (
                <div className="pt-4 border-t border-white/10">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Kamera-Winkel</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500">
                    <option>Frontal (Close-Up)</option>
                    <option>Frontal (Medium Shot)</option>
                    <option>Leicht Seitlich (Links)</option>
                    <option>Leicht Seitlich (Rechts)</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAvatarStudio;
