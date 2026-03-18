import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';
import { useCredits } from '../context/CreditsContext';

export default function Studio() {
  const { credits } = useCredits();
  const [activeTab, setActiveTab] = useState('images'); // images, videos, music, prompts
  const [activeFolder, setActiveFolder] = useState('All'); // All, Favorites, Client A...
  const [searchQuery, setSearchQuery] = useState('');
  
  // View states
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [selectedItems, setSelectedItems] = useState([]);

  // Mock Folders
  const folders = [
    { id: 'all', name: 'Alle Dateien', icon: '📂', count: 124 },
    { id: 'fav', name: 'Favoriten', icon: '⭐', count: 28 },
    { id: 'arch', name: 'Architektur', icon: '🏛️', count: 45 },
    { id: 'char', name: 'Charaktere', icon: '👤', count: 32 },
    { id: 'social', name: 'Social Media', icon: '📱', count: 19 }
  ];

  // Mock Storage Stats
  const storageUsed = 2.4;
  const storageTotal = 10;
  const storagePercent = (storageUsed / storageTotal) * 100;

  // Mock Files Data
  const [files, setFiles] = useState([
    { id: 1, type: 'image', name: 'Cyberpunk_City_01.png', url: 'https://picsum.photos/seed/cyber/800/600', size: '2.4 MB', date: 'Heute', prompt: 'Neon city at night...', model: 'Midjourney v6' },
    { id: 2, type: 'image', name: 'Portrait_Cinematic.jpg', url: 'https://picsum.photos/seed/portrait/800/600', size: '1.8 MB', date: 'Gestern', prompt: 'Close up portrait of...', model: 'Nano Banana Pro' },
    { id: 3, type: 'video', name: 'Drone_Volcano.mp4', url: 'https://cdn.pixabay.com/video/2020/05/25/40131-424813350_large.mp4', size: '12.5 MB', date: 'Gestern', prompt: 'FPV drone flying over...', model: 'Sora 2' },
    { id: 4, type: 'prompt', name: 'SEO Master Template', url: '', size: '2 KB', date: '15. März', prompt: 'Act as an SEO expert...', model: 'GPT-4o' },
    { id: 5, type: 'image', name: 'Logo_Startup.png', url: 'https://picsum.photos/seed/logo/800/600', size: '0.5 MB', date: '12. März', prompt: 'Minimalist vector logo...', model: 'Midjourney v6' },
    { id: 6, type: 'music', name: 'Synthwave_Beat.mp3', url: '', size: '4.2 MB', date: '10. März', prompt: '[Intro] fast synth...', model: 'Suno v3.5' },
  ]);

  const toggleSelect = (id) => {
    soundEngine.playPop();
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    soundEngine.playPop();
    if (selectedItems.length === filteredFiles.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredFiles.map(f => f.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    soundEngine.playClick();
    setFiles(files.filter(f => !selectedItems.includes(f.id)));
    setSelectedItems([]);
    toast.success('Elemente gelöscht', { icon: '🗑️' });
  };

  const handleDownloadSelected = () => {
    if (selectedItems.length === 0) return;
    soundEngine.playSuccess();
    toast.success('Download vorbereitet...', { icon: '⬇️' });
    setSelectedItems([]);
  };

  // Filter logic
  const filteredFiles = files.filter(f => {
    if (activeTab !== 'all' && f.type !== activeTab) {
      if (activeTab === 'images' && f.type !== 'image') return false;
      if (activeTab === 'videos' && f.type !== 'video') return false;
      if (activeTab === 'music' && f.type !== 'music') return false;
      if (activeTab === 'prompts' && f.type !== 'prompt') return false;
    }
    if (searchQuery && !f.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4 px-4 pb-12 h-full min-h-[calc(100vh-120px)] flex flex-col">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tight">
            📂 Mein Workspace
          </h2>
          <p className="text-slate-400 text-lg">Dein privates Cloud-Archiv für Prompts, Bilder, Videos und Musik.</p>
        </div>

        {/* Global Search & Actions */}
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            <input 
              type="text" 
              placeholder="Dateien durchsuchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 whitespace-nowrap">
            <span className="text-lg">+</span> Hochladen
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* LEFT SIDEBAR: FOLDERS & STORAGE */}
        <div className="w-full lg:w-64 flex flex-col gap-6 flex-shrink-0">
          
          {/* Folders List */}
          <div className="glass-panel rounded-3xl p-5 border border-slate-700/50 bg-slate-900/80">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Verzeichnisse</h3>
            <div className="space-y-1">
              {folders.map(folder => (
                <button 
                  key={folder.id}
                  onClick={() => { setActiveFolder(folder.name); soundEngine.playPop(); }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${activeFolder === folder.name ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{folder.icon}</span>
                    <span className="text-sm font-bold">{folder.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeFolder === folder.name ? 'bg-white/20' : 'bg-slate-800'}`}>
                    {folder.count}
                  </span>
                </button>
              ))}
            </div>
            
            <button className="w-full mt-4 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-400 p-2 border border-dashed border-slate-700 hover:border-blue-500/50 rounded-xl transition-all justify-center">
              + Neuer Ordner
            </button>
          </div>

          {/* Storage Widget */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-700/50 bg-slate-900/80 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              ☁️ Cloud Speicher
            </h3>
            <div className="mb-2 flex justify-between items-end">
              <span className="text-2xl font-black text-white">{storageUsed} GB</span>
              <span className="text-xs text-slate-400 font-bold mb-1">von {storageTotal} GB</span>
            </div>
            
            <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                style={{ width: `${storagePercent}%` }}
              ></div>
            </div>
            
            <button className="w-full text-xs font-bold bg-slate-800 hover:bg-slate-700 text-blue-400 py-2 rounded-lg transition-colors border border-slate-700">
              Speicherplatz erweitern
            </button>
          </div>

        </div>

        {/* RIGHT AREA: FILES BROWSER */}
        <div className="flex-1 glass-card border border-slate-700/50 rounded-3xl bg-slate-950/50 flex flex-col overflow-hidden">
          
          {/* Top Toolbar */}
          <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 backdrop-blur-md">
            
            {/* File Type Tabs */}
            <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800">
              {['images', 'videos', 'music', 'prompts'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSelectedItems([]); soundEngine.playPop(); }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-colors ${activeTab === tab ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab === 'images' ? '🖼️ Bilder' : tab === 'videos' ? '🎥 Videos' : tab === 'music' ? '🎵 Audio' : '📝 Prompts'}
                </button>
              ))}
            </div>

            {/* Selection Actions & View Toggle */}
            <div className="flex items-center gap-3">
              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2 animate-fade-in bg-blue-900/30 border border-blue-500/30 px-3 py-1.5 rounded-xl">
                  <span className="text-xs font-bold text-blue-400">{selectedItems.length} ausgewählt</span>
                  <div className="w-px h-4 bg-slate-700 mx-1"></div>
                  <button onClick={handleDownloadSelected} className="text-slate-400 hover:text-white" title="Herunterladen">⬇️</button>
                  <button onClick={handleDeleteSelected} className="text-red-400 hover:text-red-300" title="Löschen">🗑️</button>
                </div>
              )}
              
              <div className="flex border border-slate-700 rounded-lg overflow-hidden">
                <button 
                  onClick={() => { setViewMode('grid'); soundEngine.playPop(); }}
                  className={`p-1.5 ${viewMode === 'grid' ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 hover:text-slate-300'}`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                </button>
                <button 
                  onClick={() => { setViewMode('list'); soundEngine.playPop(); }}
                  className={`p-1.5 ${viewMode === 'list' ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 hover:text-slate-300'}`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* List Header */}
            {viewMode === 'list' && filteredFiles.length > 0 && (
              <div className="grid grid-cols-12 gap-4 px-4 pb-2 mb-2 border-b border-slate-800 text-xs font-black text-slate-500 uppercase tracking-widest">
                <div className="col-span-1 flex items-center">
                  <input type="checkbox" onChange={handleSelectAll} checked={selectedItems.length === filteredFiles.length && filteredFiles.length > 0} className="w-4 h-4 rounded bg-slate-900 border-slate-700" />
                </div>
                <div className="col-span-5">Name</div>
                <div className="col-span-3">Modell</div>
                <div className="col-span-2 text-right">Größe</div>
                <div className="col-span-1"></div>
              </div>
            )}

            {filteredFiles.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <div className="text-6xl mb-4 opacity-50">📂</div>
                <h3 className="text-xl font-bold text-white mb-2">Keine Dateien gefunden</h3>
                <p>In diesem Verzeichnis liegen noch keine {activeTab === 'images' ? 'Bilder' : activeTab === 'videos' ? 'Videos' : activeTab === 'music' ? 'Audio-Dateien' : 'Prompts'}.</p>
                <button className="mt-6 px-6 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold hover:bg-slate-700 transition-colors">
                  Zum Live Generator wechseln
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "flex flex-col gap-2"}>
                
                {filteredFiles.map(file => {
                  const isSelected = selectedItems.includes(file.id);
                  
                  if (viewMode === 'grid') {
                    return (
                      <div 
                        key={file.id} 
                        onClick={() => toggleSelect(file.id)}
                        className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer ${isSelected ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-slate-700/50 hover:border-slate-500'}`}
                      >
                        {/* Checkbox Overlay */}
                        <div className={`absolute top-3 left-3 z-20 w-5 h-5 rounded flex items-center justify-center transition-all ${isSelected ? 'bg-blue-500 border-blue-500 opacity-100' : 'bg-black/50 border border-white/50 opacity-0 group-hover:opacity-100'}`}>
                          {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                        </div>

                        {/* File Preview */}
                        <div className="aspect-[4/3] bg-slate-800 relative">
                          {file.type === 'image' && <img src={file.url} alt={file.name} className="w-full h-full object-cover" />}
                          {file.type === 'video' && (
                            <>
                              <video src={file.url} className="w-full h-full object-cover"></video>
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white pl-1 shadow-lg">▶</div>
                              </div>
                              <span className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-bold text-white border border-slate-700">0:05</span>
                            </>
                          )}
                          {(file.type === 'prompt' || file.type === 'music') && (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700/50">
                              <span className="text-4xl mb-2">{file.type === 'prompt' ? '📝' : '🎵'}</span>
                              <span className="text-[10px] text-slate-400 font-mono text-center px-4 line-clamp-2">{file.prompt}</span>
                            </div>
                          )}
                        </div>

                        {/* File Info */}
                        <div className="p-3 bg-slate-900/90 backdrop-blur-sm">
                          <h4 className="text-sm font-bold text-white truncate mb-1">{file.name}</h4>
                          <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                            <span>{file.model}</span>
                            <span>{file.size}</span>
                          </div>
                        </div>

                        {/* Hover Actions */}
                        <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => { e.stopPropagation(); }} className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur text-white flex items-center justify-center hover:bg-black/80">
                            ⬇️
                          </button>
                        </div>
                      </div>
                    );
                  }

                  // LIST VIEW
                  return (
                    <div 
                      key={file.id} 
                      onClick={() => toggleSelect(file.id)}
                      className={`grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-xl border transition-all cursor-pointer ${isSelected ? 'border-blue-500 bg-blue-900/10' : 'border-slate-800/50 hover:bg-slate-800/30'}`}
                    >
                      <div className="col-span-1">
                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${isSelected ? 'bg-blue-500 border-blue-500' : 'bg-slate-900 border border-slate-600'}`}>
                          {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                      </div>
                      
                      <div className="col-span-5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex-shrink-0 overflow-hidden flex items-center justify-center text-xl">
                          {file.type === 'image' && <img src={file.url} className="w-full h-full object-cover" />}
                          {file.type === 'video' && '🎥'}
                          {file.type === 'prompt' && '📝'}
                          {file.type === 'music' && '🎵'}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white truncate">{file.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono truncate">{file.prompt}</div>
                        </div>
                      </div>
                      
                      <div className="col-span-3 text-xs text-slate-400 font-bold">
                        <span className="bg-slate-900 border border-slate-700 px-2 py-1 rounded-md">{file.model}</span>
                      </div>
                      
                      <div className="col-span-2 text-right text-xs text-slate-400 font-mono">
                        {file.size}
                      </div>

                      <div className="col-span-1 flex justify-end">
                        <button className="text-slate-500 hover:text-white p-1">⋮</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}