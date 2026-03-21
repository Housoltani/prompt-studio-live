import React, { useState } from 'react';
import { GitBranch, GitMerge, GitCommit, GitPullRequest, Clock, CheckCircle2, Copy, Trash2, ArrowRightLeft, FileCode2, History } from 'lucide-react';

const PromptVersioning = () => {
  const [basePrompt, setBasePrompt] = useState('Generiere ein Bild von einer Stadt.');
  const [branches, setBranches] = useState([
    { id: 'main', name: 'main', prompt: 'Generiere ein Bild von einer Stadt im Cyberpunk Stil.', createdAt: '10:00' },
    { id: 'feat/steampunk', name: 'feat/steampunk', prompt: 'Generiere ein Bild von einer Stadt im Steampunk Stil mit vielen Zahnrädern.', createdAt: '10:15' }
  ]);
  const [activeBranchId, setActiveBranchId] = useState('main');
  const [newBranchName, setNewBranchName] = useState('');
  
  const activeBranch = branches.find(b => b.id === activeBranchId);

  const createBranch = () => {
    if(!newBranchName) return;
    const newBranch = {
      id: `feat/${newBranchName.toLowerCase().replace(/\\s+/g, '-')}`,
      name: `feat/${newBranchName}`,
      prompt: activeBranch.prompt,
      createdAt: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    setBranches([...branches, newBranch]);
    setActiveBranchId(newBranch.id);
    setNewBranchName('');
  };

  const updateActiveBranchPrompt = (newText) => {
    setBranches(branches.map(b => b.id === activeBranchId ? { ...b, prompt: newText } : b));
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-900/40 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20 shadow-2xl">
        <div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center gap-3">
            <GitBranch className="text-blue-400" size={32} />
            Prompt-Versionskontrolle
          </h2>
          <p className="text-gray-400 mt-2">Das "Git für Prompts": Erstelle Branches für verschiedene Stile, teste A/B und speichere die besten Iterationen.</p>
        </div>
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <History className="text-blue-400" size={24} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col - Timeline & Branches */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-blue-900/20 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl h-full">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-400 border-b border-white/10 pb-3">
              <GitPullRequest size={20} /> Branches & Timeline
            </h3>

            <div className="mb-6 flex gap-2">
              <input 
                type="text" 
                placeholder="Neuer Branch Name..." 
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
              />
              <button 
                onClick={createBranch}
                className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg text-white font-medium flex items-center justify-center transition-all"
              >
                +
              </button>
            </div>

            <div className="relative pl-6 border-l-2 border-white/10 space-y-8">
              {branches.map((branch, index) => (
                <div key={branch.id} className="relative">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[31px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 ${activeBranchId === branch.id ? 'bg-blue-500 border-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gray-800 border-gray-500'}`}></div>
                  
                  {/* Branch Card */}
                  <div 
                    onClick={() => setActiveBranchId(branch.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${activeBranchId === branch.id ? 'bg-blue-500/20 border-blue-500/50' : 'bg-black/30 border-white/5 hover:bg-black/50 hover:border-white/20'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-sm font-bold flex items-center gap-2">
                        <GitCommit size={14} className={activeBranchId === branch.id ? 'text-blue-400' : 'text-gray-400'} />
                        {branch.name}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={10} /> {branch.createdAt}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">{branch.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col - Editor & Compare */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-blue-900/20 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FileCode2 size={20} className="text-blue-400" />
                Aktiver Branch: <span className="font-mono text-blue-300 bg-blue-900/50 px-2 py-1 rounded">{activeBranch?.name}</span>
              </h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-all text-gray-300">
                  <ArrowRightLeft size={14} /> Compare
                </button>
                <button className="flex items-center gap-1 text-xs bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 px-3 py-1.5 rounded-lg transition-all">
                  <GitMerge size={14} /> Merge to Main
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Prompt Editor</label>
                <textarea
                  value={activeBranch?.prompt || ''}
                  onChange={(e) => updateActiveBranchPrompt(e.target.value)}
                  className="w-full h-40 bg-black/60 border border-white/10 rounded-xl p-4 text-blue-50 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-y shadow-inner"
                  placeholder="Dein Prompt für diesen Branch..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-bold text-white shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} /> Änderungen Speichern (Commit)
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(activeBranch?.prompt || '')}
                  className="px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-white transition-all flex items-center justify-center gap-2"
                >
                  <Copy size={18} /> Kopieren
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Stats or Compare View Placeholder */}
          <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-full border border-blue-500/30">
                <GitBranch className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Aktive Branches</p>
                <p className="text-2xl font-bold text-white">{branches.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/20 rounded-full border border-indigo-500/30">
                <History className="text-indigo-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Letzter Commit</p>
                <p className="text-xl font-bold text-white">Vor 2 Minuten</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptVersioning;
