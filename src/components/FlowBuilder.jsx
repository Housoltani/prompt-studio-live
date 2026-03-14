import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCredits } from '../context/CreditsContext';

export default function FlowBuilder() {
  const { credits, spendCredits } = useCredits();
  
  const [nodes, setNodes] = useState([
    { id: '1', type: 'text', title: 'GPT-4o (Skript)', desc: 'Generiere ein Hook-Skript für ein 10s Video.', top: 100, left: 40, cost: 0, model: 'openai/gpt-4o' },
    { id: '2', type: 'video', title: 'Kling 3.0 (Render)', desc: 'Nutze {{ node.1.output }} als Prompt.', top: 250, left: 450, cost: 10, model: 'video/kling-3' }
  ]);
  
  const [draggedNode, setDraggedNode] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [executingNodeId, setExecutingNodeId] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const totalCost = nodes.reduce((sum, node) => sum + (node.cost || 0), 0);

  const handlePlay = () => {
    if (nodes.length === 0) {
      toast.error('Der Flow ist leer!');
      return;
    }

    if (!spendCredits(totalCost, 'Flow Ausführung')) {
      return; // Not enough sparks
    }

    setIsExecuting(true);
    setSelectedNodeId(null);
    toast.success('Flow "Viral TikTok" gestartet...', { icon: '⚡' });

    let delay = 0;
    nodes.forEach((node, index) => {
      setTimeout(() => {
        setExecutingNodeId(node.id);
      }, delay);
      delay += 2500; // 2.5 seconds per node simulation
    });

    setTimeout(() => {
      setExecutingNodeId(null);
      setIsExecuting(false);
      toast.success('Workflow erfolgreich abgeschlossen! Asset in Galerie gespeichert.', { 
        icon: '🎬',
        style: { background: '#10b981', color: '#fff' }
      });
    }, delay);
  };

  const handleAddNode = (type) => {
    const newId = Date.now().toString();
    const defaults = {
      text: { title: 'Text AI', emoji: '✍️', cost: 0, model: 'openai/gpt-5-mini' },
      image: { title: 'Bild Generator', emoji: '🖼️', cost: 5, model: 'image/flux' },
      video: { title: 'Video Generator', emoji: '🎬', cost: 10, model: 'video/sora-2' },
      audio: { title: 'Voice Over', emoji: '🔊', cost: 3, model: 'audio/elevenlabs' },
      web: { title: 'Web Search', emoji: '🌐', cost: 1, model: 'tool/brave' },
      condition: { title: 'Condition', emoji: '🔀', cost: 0, model: 'logic/if-else' }
    };
    
    const nodeDef = defaults[type];
    
    setNodes([...nodes, { 
      id: newId, 
      type, 
      title: nodeDef.title, 
      desc: 'Neuer Knoten Input...', 
      top: 150 + (nodes.length * 30), 
      left: 100 + (nodes.length * 50),
      cost: nodeDef.cost,
      model: nodeDef.model
    }]);
    
    toast.success(`${nodeDef.emoji} Knoten hinzugefügt`);
    setSelectedNodeId(newId);
  };

  const handleDragStart = (e, id) => {
    if (isExecuting) return;
    setDraggedNode(id);
    e.dataTransfer.setData('text/plain', '');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedNode || isExecuting) return;
    
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - 128; // Center offset
    const y = e.clientY - canvasRect.top - 64;
    
    setNodes(nodes.map(n => n.id === draggedNode ? { ...n, left: x, top: y } : n));
    setDraggedNode(null);
  };

  const removeNode = (id) => {
    setNodes(nodes.filter(n => n.id !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  const updateSelectedNode = (field, value) => {
    setNodes(nodes.map(n => n.id === selectedNodeId ? { ...n, [field]: value } : n));
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div className="max-w-screen-2xl animate-fade-in mx-auto mt-4 px-4 pb-12 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-end mb-6 shrink-0">
        <div>
          <h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">⚡ Automatisierung (Flows)</h2>
          <p className="text-slate-400 text-sm">Verknüpfe KI-Modelle visuell zu mächtigen Pipelines.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-3 shadow-inner">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Flow Kosten</span>
            <span className="text-lg font-black text-amber-400">⚡ {totalCost}</span>
          </div>
          <button 
            onClick={handlePlay} 
            disabled={isExecuting}
            className={`font-bold py-3 px-8 rounded-xl transition-all flex items-center gap-2 shadow-lg ${
              isExecuting 
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-amber-500/20 hover:scale-105'
            }`}
          >
            {isExecuting ? (
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
            )}
            {isExecuting ? 'Wird ausgeführt...' : 'Flow Starten'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* Left Sidebar: Tools */}
        <div className="w-64 glass-card rounded-3xl p-5 flex flex-col gap-3 shadow-xl border border-slate-700/80 overflow-y-auto custom-scrollbar">
          <h3 className="font-bold text-slate-400 mb-2 uppercase tracking-wider text-xs border-b border-slate-700/50 pb-2">KI Bausteine</h3>
          
          <button onClick={() => handleAddNode('text')} disabled={isExecuting} className="bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-xl p-3 flex items-center gap-3 transition-all hover:-translate-y-1 group text-left disabled:opacity-50">
            <div className="bg-blue-500/20 p-2 rounded-lg text-lg">✍️</div>
            <div>
              <div className="text-sm font-bold text-slate-200">Text & Logik</div>
              <div className="text-[10px] text-slate-500">0 Sparks</div>
            </div>
          </button>

          <button onClick={() => handleAddNode('image')} disabled={isExecuting} className="bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-xl p-3 flex items-center gap-3 transition-all hover:-translate-y-1 group text-left disabled:opacity-50">
            <div className="bg-emerald-500/20 p-2 rounded-lg text-lg">🖼️</div>
            <div>
              <div className="text-sm font-bold text-slate-200">Bild Generator</div>
              <div className="text-[10px] text-emerald-500 font-bold">5 Sparks</div>
            </div>
          </button>

          <button onClick={() => handleAddNode('video')} disabled={isExecuting} className="bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-xl p-3 flex items-center gap-3 transition-all hover:-translate-y-1 group text-left disabled:opacity-50">
            <div className="bg-pink-500/20 p-2 rounded-lg text-lg">🎬</div>
            <div>
              <div className="text-sm font-bold text-slate-200">Video Generator</div>
              <div className="text-[10px] text-pink-500 font-bold">10 Sparks</div>
            </div>
          </button>

          <button onClick={() => handleAddNode('audio')} disabled={isExecuting} className="bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-xl p-3 flex items-center gap-3 transition-all hover:-translate-y-1 group text-left disabled:opacity-50">
            <div className="bg-amber-500/20 p-2 rounded-lg text-lg">🔊</div>
            <div>
              <div className="text-sm font-bold text-slate-200">Voice / Audio</div>
              <div className="text-[10px] text-amber-500 font-bold">3 Sparks</div>
            </div>
          </button>

          <h3 className="font-bold text-slate-400 mt-4 mb-2 uppercase tracking-wider text-xs border-b border-slate-700/50 pb-2">Erweitert</h3>

          <button onClick={() => handleAddNode('web')} disabled={isExecuting} className="bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-xl p-3 flex items-center gap-3 transition-all hover:-translate-y-1 group text-left disabled:opacity-50">
            <div className="bg-cyan-500/20 p-2 rounded-lg text-lg">🌐</div>
            <div>
              <div className="text-sm font-bold text-slate-200">Web Search</div>
              <div className="text-[10px] text-cyan-500 font-bold">1 Spark</div>
            </div>
          </button>

          <button onClick={() => handleAddNode('condition')} disabled={isExecuting} className="bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-xl p-3 flex items-center gap-3 transition-all hover:-translate-y-1 group text-left disabled:opacity-50">
            <div className="bg-purple-500/20 p-2 rounded-lg text-lg">🔀</div>
            <div>
              <div className="text-sm font-bold text-slate-200">If / Else</div>
              <div className="text-[10px] text-slate-500">Logik Knoten</div>
            </div>
          </button>
        </div>

        {/* Center: Canvas Area */}
        <div 
          className="flex-1 glass-panel border border-slate-700/50 rounded-3xl relative overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] bg-slate-900"
          style={{ backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !isExecuting && setSelectedNodeId(null)}
        >
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {nodes.map((node, i) => {
              if (i === 0) return null;
              const prev = nodes[i-1];
              const startX = prev.left + 256; // node width is w-64 (256px)
              const startY = prev.top + 64;   // center y
              const endX = node.left;
              const endY = node.top + 64;
              
              const isFlowing = isExecuting && executingNodeId === node.id;
              
              return (
                <g key={`line-${i}`}>
                  <path 
                    d={`M ${startX} ${startY} C ${startX + 100} ${startY}, ${endX - 100} ${endY}, ${endX} ${endY}`} 
                    fill="none" 
                    stroke={isFlowing ? "#f59e0b" : "rgba(100, 116, 139, 0.3)"} 
                    strokeWidth={isFlowing ? "4" : "2"}
                    strokeDasharray={isFlowing ? "8,8" : "none"}
                    className={isFlowing ? "animate-pulse" : ""} 
                  />
                  {isFlowing && (
                    <circle cx={endX} cy={endY} r="6" fill="#f59e0b" className="animate-ping" />
                  )}
                </g>
              )
            })}
          </svg>

          {/* Render Nodes */}
          {nodes.map((node, i) => {
            const isSelected = selectedNodeId === node.id;
            const isRunning = executingNodeId === node.id;
            const hasRun = isExecuting && nodes.findIndex(n => n.id === executingNodeId) > i;
            
            const colors = {
              text: 'border-blue-500/50 from-blue-900/40 to-slate-900',
              image: 'border-emerald-500/50 from-emerald-900/40 to-slate-900',
              video: 'border-pink-500/50 from-pink-900/40 to-slate-900',
              audio: 'border-amber-500/50 from-amber-900/40 to-slate-900',
              web: 'border-cyan-500/50 from-cyan-900/40 to-slate-900',
              condition: 'border-purple-500/50 from-purple-900/40 to-slate-900'
            };
            
            const dotColor = {
              text: 'bg-blue-500', image: 'bg-emerald-500', video: 'bg-pink-500',
              audio: 'bg-amber-500', web: 'bg-cyan-500', condition: 'bg-purple-500'
            };

            return (
              <div 
                key={node.id}
                draggable={!isExecuting}
                onDragStart={(e) => handleDragStart(e, node.id)}
                onClick={(e) => { e.stopPropagation(); if(!isExecuting) setSelectedNodeId(node.id); }}
                className={`absolute w-64 glass-card border bg-gradient-to-br ${colors[node.type]} rounded-2xl p-5 z-10 
                  ${!isExecuting ? 'cursor-grab active:cursor-grabbing hover:-translate-y-1' : ''} 
                  transition-all duration-300
                  ${isSelected ? 'ring-2 ring-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-105' : 'shadow-xl'}
                  ${isRunning ? 'ring-4 ring-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.6)] animate-pulse scale-105' : ''}
                  ${hasRun ? 'opacity-50 grayscale' : ''}
                `}
                style={{ top: node.top, left: node.left }}
              >
                {/* Delete Button */}
                {!isExecuting && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeNode(node.id); }}
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-400 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity z-20"
                    style={{ opacity: isSelected ? 1 : undefined }}
                  >
                    ×
                  </button>
                )}

                {/* Left Connect Dot */}
                {i > 0 && <div className={`w-3 h-3 ${dotColor[node.type]} rounded-full absolute top-1/2 -left-1.5 transform -translate-y-1/2 shadow-[0_0_10px]`}></div>}
                
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    {isRunning && <svg className="animate-spin w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                    <span className={`text-xs font-bold uppercase tracking-widest ${isRunning ? 'text-amber-400' : 'text-slate-300'}`}>Step {i+1}</span>
                  </div>
                  {node.cost > 0 && <span className="text-[10px] bg-slate-900/80 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">⚡ {node.cost}</span>}
                </div>
                
                <h4 className="font-bold text-slate-100 text-base mb-2 truncate">{node.title}</h4>
                <div className="text-xs text-slate-300 font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-700/50 h-20 overflow-hidden text-ellipsis line-clamp-4">
                  {node.desc}
                </div>
                
                {/* Right Connect Dot */}
                {i < nodes.length - 1 && <div className={`w-3 h-3 ${dotColor[node.type]} rounded-full absolute top-1/2 -right-1.5 transform -translate-y-1/2 shadow-[0_0_10px]`}></div>}
              </div>
            );
          })}
        </div>

        {/* Right Sidebar: Settings Panel (Conditionally rendered) */}
        {selectedNode && !isExecuting && (
          <div className="w-80 glass-card rounded-3xl p-6 flex flex-col gap-5 shadow-xl border border-slate-700/80 animate-slide-left overflow-y-auto custom-scrollbar bg-slate-900/90">
            <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
              <h3 className="font-bold text-white text-lg">Knoten Settings</h3>
              <button onClick={() => setSelectedNodeId(null)} className="text-slate-500 hover:text-white">✕</button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Titel</label>
              <input 
                type="text" 
                value={selectedNode.title}
                onChange={(e) => updateSelectedNode('title', e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Modell (Engine)</label>
              <select 
                value={selectedNode.model}
                onChange={(e) => {
                  const val = e.target.value;
                  let newCost = selectedNode.cost;
                  // Dynamic cost based on selection
                  if(val.includes('sora') || val.includes('kling')) newCost = 10;
                  else if(val.includes('flux') || val.includes('midjourney')) newCost = 5;
                  else if(val.includes('elevenlabs')) newCost = 3;
                  else if(val.includes('gpt') || val.includes('claude')) newCost = 0;
                  
                  updateSelectedNode('model', val);
                  updateSelectedNode('cost', newCost);
                }}
                className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none"
              >
                {selectedNode.type === 'text' && (
                  <>
                    <option value="openai/gpt-4o">GPT-4o (Smart)</option>
                    <option value="openai/gpt-5-mini">GPT 5 mini (Fast)</option>
                    <option value="anthropic/claude-3-opus">Claude 3 Opus</option>
                  </>
                )}
                {selectedNode.type === 'image' && (
                  <>
                    <option value="image/flux">Flux.1 Pro</option>
                    <option value="image/midjourney-v6">Midjourney v6</option>
                    <option value="image/seedream">Seedream v5</option>
                  </>
                )}
                {selectedNode.type === 'video' && (
                  <>
                    <option value="video/sora-2">Sora 2 (OpenAI)</option>
                    <option value="video/kling-3">Kling 3.0 Standard</option>
                    <option value="video/veo-3">Veo 3.1 Fast</option>
                  </>
                )}
                {selectedNode.type === 'audio' && (
                  <>
                    <option value="audio/elevenlabs">ElevenLabs v2</option>
                    <option value="audio/openai-tts">OpenAI TTS</option>
                  </>
                )}
                {selectedNode.type === 'web' && <option value="tool/brave">Brave Search API</option>}
                {selectedNode.type === 'condition' && <option value="logic/if-else">Standard IF/ELSE</option>}
              </select>
              <p className="text-[10px] text-amber-500 mt-1">Kosten: {selectedNode.cost} Sparks pro Ausführung</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Prompt / Input</label>
              <textarea 
                value={selectedNode.desc}
                onChange={(e) => updateSelectedNode('desc', e.target.value)}
                rows={5}
                className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none font-mono"
                placeholder="Gib deinen Prompt oder {{ variables }} ein..."
              />
              <p className="text-[10px] text-slate-500 mt-2">Nutze <code className="bg-slate-800 px-1 rounded text-blue-300">{`{{ node.1.output }}`}</code> um Daten vom vorherigen Knoten zu übernehmen.</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}