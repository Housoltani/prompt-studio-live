import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';
import { useCredits } from '../context/CreditsContext';

export default function Studio() {
  const { credits } = useCredits();
  const [activeTab, setActiveTab] = useState('timeline'); // grid, timeline
  const [activeFolder, setActiveFolder] = useState('All'); 
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mocks
  const [files, setFiles] = useState([
    { id: 1, type: 'video', name: 'Drone_Volcano.mp4', url: 'https://cdn.pixabay.com/video/2020/05/25/40131-424813350_large.mp4', duration: '0:15', track: 'v1', start: 0 },
    { id: 2, type: 'music', name: 'Synthwave_Beat.mp3', url: '', duration: '0:30', track: 'a1', start: 0 },
    { id: 3, type: 'video', name: 'Cyberpunk_Drive.mp4', url: 'https://cdn.pixabay.com/video/2023/10/22/186001-876939981_large.mp4', duration: '0:10', track: 'v1', start: 15 }
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    soundEngine.playClick();
  };

  const exportVideo = () => {
    soundEngine.playTransform();
    toast('Rendere Video-Projekt (1080p)...', { icon: '🎬' });
    setTimeout(() => {
      soundEngine.playSuccess();
      toast.success('Video erfolgreich als MP4 exportiert!');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-20 mt-4 h-[calc(100vh-100px)] flex flex-col px-4">
      {/* HEADER */}
      <div className="flex-shrink-0 flex justify-between items-end mb-2">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-2 tracking-tight">
            🎬 Studio Pro
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Dein Multimedialer Workspace. Verwalte generierte Dateien oder wechsle in den Timeline-Editor, um Videos und KI-Musik zu verschmelzen.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('grid')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === 'grid' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
            📂 Dateien
          </button>
          <button onClick={() => setActiveTab('timeline')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === 'timeline' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
            🎞️ Timeline Editor
          </button>
        </div>
      </div>

      {activeTab === 'grid' ? (
        <div className="flex-1 flex items-center justify-center bg-slate-900/50 border border-slate-800 rounded-3xl">
          <p className="text-slate-500 text-lg">Datei-Explorer (Hier liegen deine Bilder und Videos).</p>
        </div>
      ) : (
        <div className="flex flex-col flex-1 gap-4 min-h-0">
          {/* PREVIEW MONITOR */}
          <div className="h-[40vh] bg-black border border-slate-700 rounded-3xl flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
               <img src="https://picsum.photos/seed/cyber/1280/720" className="w-full h-full object-cover blur-sm" />
            </div>
            
            {/* Player Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-2 rounded-2xl flex items-center gap-4 z-10 shadow-2xl">
              <button className="text-slate-400 hover:text-white">⏮</button>
              <button onClick={togglePlay} className="w-10 h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center text-xl shadow-lg transition-transform hover:scale-105">
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button className="text-slate-400 hover:text-white">⏭</button>
              <div className="w-48 h-2 bg-slate-800 rounded-full relative cursor-pointer">
                <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={{ width: '35%' }}></div>
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md" style={{ left: '35%' }}></div>
              </div>
              <span className="text-xs font-mono text-slate-300">00:15 / 00:45</span>
            </div>

            <button onClick={exportVideo} className="absolute top-4 right-4 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2">
              ⬇️ Export MP4
            </button>
          </div>

          {/* TIMELINE TRACKS */}
          <div className="flex-1 bg-slate-900/80 border border-slate-700 rounded-3xl p-4 flex flex-col gap-2 overflow-y-auto relative">
            
            {/* Playhead Line */}
            <div className="absolute top-0 bottom-0 w-px bg-red-500 z-20 pointer-events-none" style={{ left: '35%' }}>
              <div className="w-3 h-3 bg-red-500 rounded-full absolute -top-1 -left-1"></div>
            </div>

            {/* Time Ruler */}
            <div className="h-6 border-b border-slate-800 flex items-end px-20 text-[10px] text-slate-500 font-mono">
               <span className="w-20">00:00</span>
               <span className="w-20">00:05</span>
               <span className="w-20">00:10</span>
               <span className="w-20 text-red-400">00:15</span>
               <span className="w-20">00:20</span>
               <span className="w-20">00:25</span>
               <span className="w-20">00:30</span>
            </div>

            {/* Video Track 1 */}
            <div className="h-16 bg-slate-950/50 rounded-xl border border-slate-800 flex items-center px-4 gap-4">
              <div className="w-16 flex-shrink-0 text-xs font-bold text-slate-400 border-r border-slate-800 h-full flex items-center">🎥 V1</div>
              <div className="flex-1 relative h-10">
                <div className="absolute top-0 bottom-0 left-0 w-32 bg-blue-600/40 border border-blue-500 rounded-md p-1 overflow-hidden group cursor-ew-resize">
                  <div className="text-[10px] text-white font-bold truncate">Drone_Volcano.mp4</div>
                  <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="absolute top-0 bottom-0 left-32 w-24 bg-blue-600/40 border border-blue-500 rounded-md p-1 overflow-hidden group cursor-ew-resize">
                  <div className="text-[10px] text-white font-bold truncate">Cyberpunk_Drive.mp4</div>
                </div>
              </div>
            </div>

            {/* Audio Track 1 */}
            <div className="h-16 bg-slate-950/50 rounded-xl border border-slate-800 flex items-center px-4 gap-4">
              <div className="w-16 flex-shrink-0 text-xs font-bold text-slate-400 border-r border-slate-800 h-full flex items-center">🎵 A1</div>
              <div className="flex-1 relative h-10">
                <div className="absolute top-0 bottom-0 left-0 w-64 bg-purple-600/40 border border-purple-500 rounded-md p-1 overflow-hidden group cursor-ew-resize flex items-center">
                  {/* Fake Audio Waveform */}
                  <div className="w-full h-6 flex items-center gap-0.5 opacity-50">
                    {[...Array(40)].map((_, i) => (
                      <div key={i} className="flex-1 bg-purple-400 rounded-full" style={{ height: `${Math.random() * 100}%` }}></div>
                    ))}
                  </div>
                  <div className="absolute inset-x-2 top-1 text-[10px] text-white font-bold truncate z-10 drop-shadow-md">Synthwave_Beat.mp3</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
