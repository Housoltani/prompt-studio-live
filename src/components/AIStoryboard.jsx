import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AIStoryboard() {
  const [scenes, setScenes] = useState([
    { id: 1, setting: '', action: '', camera: '', dialogue: '', duration: 5, transitionToNext: 'Cut', sketchUrl: '' }
  ]);
  const [selectedSceneId, setSelectedSceneId] = useState(1);

  const addScene = () => {
    const newId = scenes.length > 0 ? Math.max(...scenes.map(s => s.id)) + 1 : 1;
    setScenes([...scenes, { id: newId, setting: '', action: '', camera: '', dialogue: '', duration: 5, transitionToNext: 'Cut', sketchUrl: '' }]);
    setSelectedSceneId(newId);
  };

  const removeScene = (id, e) => {
    e.stopPropagation();
    if (scenes.length === 1) return toast.error('Mindestens eine Szene erforderlich.');
    const updated = scenes.filter(s => s.id !== id);
    setScenes(updated);
    if (selectedSceneId === id) setSelectedSceneId(updated[0].id);
  };

  const updateScene = (field, value) => {
    setScenes(scenes.map(s => s.id === selectedSceneId ? { ...s, [field]: value } : s));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const generateMasterPrompt = (isExport = false) => {
    let masterPrompt = "🎬 [MEGA-PROMPT SEQUENCE]:\n\n";
    let currentTime = 0;

    scenes.forEach((s, idx) => {
      const startTime = formatTime(currentTime);
      currentTime += Number(s.duration) || 0;
      const endTime = formatTime(currentTime);

      masterPrompt += `--- SCENE ${idx + 1} [${startTime} - ${endTime}] ---\n`;
      if (s.setting) masterPrompt += `📍 Setting/Location: ${s.setting}\n`;
      if (s.action) masterPrompt += `👥 Characters/Action: ${s.action}\n`;
      if (s.camera) masterPrompt += `🎥 Camera & Lighting: ${s.camera}\n`;
      if (s.dialogue) masterPrompt += `💬 Dialogue/VO: ${s.dialogue}\n`;
      
      if (idx < scenes.length - 1) {
        masterPrompt += `\n🔄 TRANSITION: ${s.transitionToNext || 'Cut'}\n\n`;
      } else {
        masterPrompt += "\n";
      }
    });

    if (isExport) {
        return masterPrompt;
    }

    navigator.clipboard.writeText(masterPrompt);
    toast.success('Master Prompt in die Zwischenablage kopiert!', {
      style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
    });
  };

  const exportStoryboard = () => {
    const content = generateMasterPrompt(true);
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Storyboard_Export.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Storyboard als Markdown exportiert!');
  };

  const generateSketch = (sceneId) => {
    setScenes(scenes.map(s => {
      if (s.id === sceneId) {
        const promptText = `${s.setting} ${s.action} ${s.camera}`.trim() || 'cinematic storyboard sketch';
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=512&height=288&nologo=true&seed=${Math.floor(Math.random() * 1000000)}`;
        return { ...s, sketchUrl: url };
      }
      return s;
    }));
    toast.success('Sketch wird geladen...');
  };

  const selectedScene = scenes.find(s => s.id === selectedSceneId) || scenes[0];
  const totalDuration = scenes.reduce((acc, s) => acc + (Number(s.duration) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto animate-fade-in space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl p-8 glass-panel border border-fuchsia-500/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🎬</span>
            <div>
              <h1 className="text-3xl font-black text-gradient from-fuchsia-400 to-purple-500 uppercase tracking-widest">
                AI Storyboard Studio
              </h1>
              <p className="text-slate-400 font-medium">
                Autobot Command Center — Baue deine visuelle Narrative Panel für Panel.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Timeline Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel p-4 rounded-2xl border border-slate-700/50 h-[800px] overflow-y-auto flex flex-col relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest">
                Sequenz ({scenes.length}) • {formatTime(totalDuration)}
              </h2>
              <button 
                onClick={addScene}
                className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-sm font-bold uppercase tracking-wider"
                title="Szene hinzufügen"
              >
                + Neu
              </button>
            </div>

            <div className="flex-1 space-y-3">
              {scenes.map((scene, idx) => (
                <div key={scene.id}>
                  <div 
                    onClick={() => setSelectedSceneId(scene.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border group relative ${
                      selectedSceneId === scene.id 
                      ? 'bg-fuchsia-600/20 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.2)]' 
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-slate-400">Szene {idx + 1} • {scene.duration}s</span>
                      <button 
                        onClick={(e) => removeScene(scene.id, e)}
                        className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="text-sm text-slate-300 font-medium truncate">
                      {scene.setting || 'Neue Szene...'}
                    </div>
                  </div>
                  {/* Transition indicator in sidebar */}
                  {idx < scenes.length - 1 && (
                    <div className="text-center py-1">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        ↓ {scene.transitionToNext || 'Cut'} ↓
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-col gap-3">
              <button 
                onClick={() => generateMasterPrompt(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold uppercase tracking-wider hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] flex items-center justify-center gap-2"
              >
                <span>🚀</span> Master Prompt
              </button>
              <button 
                onClick={exportStoryboard}
                className="w-full py-3 rounded-xl bg-slate-800 text-slate-300 font-bold uppercase tracking-wider hover:bg-slate-700 transition-all border border-slate-700 hover:border-slate-500 flex items-center justify-center gap-2"
              >
                <span>📄</span> Export Markdown
              </button>
            </div>
          </div>
        </div>

        {/* Scene Editor */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-fuchsia-500/20 relative">
             <div className="absolute -inset-[1px] bg-gradient-to-r from-fuchsia-500/30 to-purple-500/30 rounded-2xl opacity-20 blur-sm pointer-events-none"></div>
             <div className="relative">
                <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center text-sm border border-fuchsia-500/50">
                    {scenes.findIndex(s => s.id === selectedSceneId) + 1}
                  </span>
                  Szene bearbeiten
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Duration */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span>⏱️</span> Duration (Seconds)
                    </label>
                    <input 
                      type="number"
                      min="1"
                      value={selectedScene.duration || ''}
                      onChange={(e) => updateScene('duration', parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all"
                    />
                  </div>

                  {/* Transition */}
                  {scenes.findIndex(s => s.id === selectedSceneId) < scenes.length - 1 && (
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <span>🔀</span> Transition to Next Scene
                        </label>
                        <select 
                          value={selectedScene.transitionToNext || 'Cut'}
                          onChange={(e) => updateScene('transitionToNext', e.target.value)}
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all appearance-none"
                        >
                          <option value="Cut">Cut</option>
                          <option value="Crossfade">Crossfade / Dissolve</option>
                          <option value="Fade to Black">Fade to Black</option>
                          <option value="Wipe">Wipe</option>
                          <option value="Morph">Morph</option>
                          <option value="Match Cut">Match Cut</option>
                        </select>
                      </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Visual AI Sketch */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <span>🖼️</span> Visual AI Sketch
                        </label>
                        <button 
                          onClick={() => generateSketch(selectedScene.id)}
                          className="text-xs bg-fuchsia-600/20 hover:bg-fuchsia-600/40 text-fuchsia-400 px-3 py-1.5 rounded-lg transition-colors border border-fuchsia-500/30 font-bold uppercase tracking-wider"
                        >
                          Generate Sketch
                        </button>
                    </div>
                    {selectedScene.sketchUrl ? (
                        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900/50 flex justify-center">
                            <img src={selectedScene.sketchUrl} alt="Scene Sketch" className="h-64 object-cover" />
                        </div>
                    ) : (
                        <div className="w-full h-32 bg-slate-900/50 border border-slate-700 border-dashed rounded-xl flex items-center justify-center text-slate-500 text-sm">
                            Klicke auf "Generate Sketch" um ein Placeholder-Bild zu erstellen
                        </div>
                    )}
                  </div>

                  {/* Setting */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span>📍</span> Setting / Location
                    </label>
                    <textarea 
                      value={selectedScene.setting}
                      onChange={(e) => updateScene('setting', e.target.value)}
                      placeholder="Z.B. Neon-beleuchtete Cyberpunk-Gasse, strömender Regen, nasser Asphalt..."
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all resize-none h-20"
                    />
                  </div>

                  {/* Characters / Action */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span>👥</span> Characters / Action
                    </label>
                    <textarea 
                      value={selectedScene.action}
                      onChange={(e) => updateScene('action', e.target.value)}
                      placeholder="Z.B. Ein vermummter Hacker läuft schnell davon und schaut sich nervös um..."
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all resize-none h-20"
                    />
                  </div>

                  {/* Camera / Lighting */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span>🎥</span> Camera Angle & Lighting
                    </label>
                    <textarea 
                      value={selectedScene.camera}
                      onChange={(e) => updateScene('camera', e.target.value)}
                      placeholder="Z.B. Low angle shot, cinematic lighting, anamorphic lens flare, rim light..."
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all resize-none h-20"
                    />
                  </div>

                  {/* Dialogue / Voiceover */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span>💬</span> Dialogue / Voiceover (Optional)
                    </label>
                    <textarea 
                      value={selectedScene.dialogue}
                      onChange={(e) => updateScene('dialogue', e.target.value)}
                      placeholder="Z.B. [VOICE OVER]: 'Sie sagten, die Matrix sei undurchdringlich...'"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all resize-none h-20"
                    />
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
