import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function FlowBuilder() {
  const [nodes, setNodes] = useState([
    { id: '1', type: 'text', title: 'GPT-4o (Idee)', desc: 'Generiere ein Hook-Skript für ein 10s Video über Kaffeebohnen.', top: 100, left: 40 },
    { id: '2', type: 'video', title: 'Runway Gen-3', desc: '{{ node.1.output }}', top: 250, left: 450 }
  ]);
  const [draggedNode, setDraggedNode] = useState(null);

  const handlePlay = () => {
    toast.success('Flow "Viral TikTok" wird ausgeführt...', {
      icon: '⚡',
      style: { background: '#1e293b', color: '#fff' }
    });
    setTimeout(() => {
      toast.success('Video erfolgreich gerendert und gespeichert!', {
        icon: '🎬',
        style: { background: '#10b981', color: '#fff' }
      });
    }, 2500);
  };

  const handleAddNode = (type) => {
    const newId = (nodes.length + 1).toString();
    const titles = { text: 'Claude 3 (Text)', image: 'Midjourney (Bild)', video: 'Sora (Video)', audio: 'ElevenLabs (Voice)' };
    const emojis = { text: '✍️', image: '🖼️', video: '🎬', audio: '🔊' };
    
    setNodes([...nodes, { 
      id: newId, 
      type, 
      title: titles[type], 
      desc: 'Neuer Knoten Input...', 
      top: 150 + (nodes.length * 50), 
      left: 100 + (nodes.length * 50) 
    }]);
    
    toast.success(`${emojis[type]} Knoten hinzugefügt`);
  };

  // Drag and drop for canvas
  const handleDragStart = (e, id) => {
    setDraggedNode(id);
    // Needed for Firefox
    e.dataTransfer.setData('text/plain', '');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedNode) return;
    
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - 100; // Offset for center
    const y = e.clientY - canvasRect.top - 50;
    
    setNodes(nodes.map(n => n.id === draggedNode ? { ...n, left: x, top: y } : n));
    setDraggedNode(null);
  };

  const removeNode = (id) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4">
      <h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">⚡ Prompt Chains & Automatisierung</h2>
      <p className="text-slate-400 mb-8 text-lg">Verknüpfe KI-Modelle wie Puzzleteile. Baue vollautomatische Workflows.</p>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Sidebar */}
        <div className="w-full lg:w-72 glass-panel rounded-3xl p-6 flex flex-col gap-4 shadow-xl border border-slate-700">
          <h3 className="font-bold text-slate-300 mb-2 uppercase tracking-wider text-xs">Werkzeugkasten</h3>
          <button onClick={() => handleAddNode('text')} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02] shadow-md group">
            <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/40 transition-colors"><span className="text-xl">✍️</span></div>
            <span className="text-sm font-bold text-slate-200">Text Generator</span>
          </button>
          <button onClick={() => handleAddNode('image')} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02] shadow-md group">
            <div className="bg-emerald-500/20 p-2 rounded-lg group-hover:bg-emerald-500/40 transition-colors"><span className="text-xl">🖼️</span></div>
            <span className="text-sm font-bold text-slate-200">Bild Generator</span>
          </button>
          <button onClick={() => handleAddNode('video')} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02] shadow-md group">
            <div className="bg-pink-500/20 p-2 rounded-lg group-hover:bg-pink-500/40 transition-colors"><span className="text-xl">🎬</span></div>
            <span className="text-sm font-bold text-slate-200">Video Generator</span>
          </button>
          <button onClick={() => handleAddNode('audio')} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02] shadow-md group">
            <div className="bg-amber-500/20 p-2 rounded-lg group-hover:bg-amber-500/40 transition-colors"><span className="text-xl">🔊</span></div>
            <span className="text-sm font-bold text-slate-200">Voice Over</span>
          </button>
        </div>

        {/* Canvas Area */}
        <div 
          className="flex-1 w-full glass-card border border-slate-700/50 rounded-3xl p-8 relative min-h-[600px] overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"
          style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          
          <div className="absolute top-6 right-6 flex gap-4 z-20">
            <button className="bg-slate-800/80 backdrop-blur hover:bg-slate-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg transition-colors border border-slate-600 text-sm">Speichern</button>
            <button onClick={handlePlay} className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-2.5 px-6 rounded-xl shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.7)] transition-all flex items-center gap-2 text-sm hover:scale-105">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
              Flow Ausführen
            </button>
          </div>

          <h3 className="absolute top-6 left-6 font-bold text-slate-400 uppercase tracking-wider text-xs bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">Aktiver Flow: Viral TikTok</h3>

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {nodes.map((node, i) => {
              if (i === 0) return null; // Connect to previous
              const prev = nodes[i-1];
              const startX = prev.left + 256; // 64rem width approx
              const startY = prev.top + 50;
              const endX = node.left;
              const endY = node.top + 50;
              return (
                <path 
                  key={`line-${i}`}
                  d={`M ${startX} ${startY} C ${startX + 50} ${startY}, ${endX - 50} ${endY}, ${endX} ${endY}`} 
                  fill="none" 
                  stroke="rgba(99, 102, 241, 0.4)" 
                  strokeWidth="3" 
                  strokeDasharray="5,5" 
                  className="animate-pulse" 
                />
              )
            })}
          </svg>

          {/* Render Nodes */}
          {nodes.map((node, i) => {
            const colors = {
              text: 'border-blue-500/50 from-blue-900/40 to-slate-900',
              image: 'border-emerald-500/50 from-emerald-900/40 to-slate-900',
              video: 'border-pink-500/50 from-pink-900/40 to-slate-900',
              audio: 'border-amber-500/50 from-amber-900/40 to-slate-900'
            };
            const dotColor = {
              text: 'bg-blue-500 shadow-blue-500',
              image: 'bg-emerald-500 shadow-emerald-500',
              video: 'bg-pink-500 shadow-pink-500',
              audio: 'bg-amber-500 shadow-amber-500'
            };

            return (
              <div 
                key={node.id}
                draggable
                onDragStart={(e) => handleDragStart(e, node.id)}
                className={`absolute w-64 glass-panel border bg-gradient-to-br ${colors[node.type]} rounded-2xl p-5 shadow-2xl z-10 cursor-grab active:cursor-grabbing hover:shadow-3xl transition-shadow`}
                style={{ top: node.top, left: node.left }}
              >
                {/* Delete Button */}
                <button 
                  onClick={() => removeNode(node.id)}
                  className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity"
                  style={{ opacity: 1 }} // Always show for better UX in this demo
                >
                  ×
                </button>

                {i > 0 && (
                  <div className={`w-3 h-3 ${dotColor[node.type]} rounded-full absolute top-1/2 -left-1.5 transform -translate-y-1/2 shadow-[0_0_10px]`}></div>
                )}
                
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-xs font-bold uppercase tracking-widest ${node.type === 'text' ? 'text-blue-400' : node.type === 'video' ? 'text-pink-400' : node.type === 'image' ? 'text-emerald-400' : 'text-amber-400'}`}>Step {i+1}</span>
                  <span className="text-lg opacity-80">☰</span>
                </div>
                
                <h4 className="font-bold text-slate-100 text-base mb-2">{node.title}</h4>
                <div className="text-xs text-slate-300 font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-700/50 h-20 overflow-y-auto custom-scrollbar">
                  {node.desc}
                </div>
                
                {i < nodes.length - 1 && (
                  <div className={`w-3 h-3 ${dotColor[node.type]} rounded-full absolute top-1/2 -right-1.5 transform -translate-y-1/2 shadow-[0_0_10px]`}></div>
                )}
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}
