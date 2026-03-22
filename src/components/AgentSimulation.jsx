import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, ArrowRight, Activity, Zap, Layers, Play } from 'lucide-react';

export default function AgentSimulation() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  const runSimulation = () => {
    setRunning(true);
    setLogs(['[SYSTEM] Initializing Multimodal Chain of Thought...']);
    
    setTimeout(() => setLogs(prev => [...prev, '[AGENT 1] Text-Modell analysiert Anforderung... ✅']), 1000);
    setTimeout(() => setLogs(prev => [...prev, '[AGENT 2] Bild-Generator erstellt visuelle Assets (Midjourney API)... ✅']), 2500);
    setTimeout(() => setLogs(prev => [...prev, '[AGENT 3] Video-Modell animiert Frames (Runway/Sora)... ✅']), 4000);
    setTimeout(() => {
      setLogs(prev => [...prev, '[SYSTEM] Workflow abgeschlossen. 3 Artefakte generiert.']);
      setRunning(false);
    }, 5500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-24 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-8 rounded-3xl border border-blue-500/30 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <h1 className="text-4xl font-black mb-4 flex items-center gap-3">
            <BrainCircuit className="w-10 h-10 text-blue-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Agent Simulation Hub
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg">
            Multimodale Chain of Thought. Verbinde Text-, Bild- und Video-Modelle zu autonomen Workflows und beobachte sie bei der Arbeit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Visual Workflow Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-8 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-blue-300">
                <Layers className="w-5 h-5" /> Workflow Topology
              </h2>
              <button 
                onClick={runSimulation}
                disabled={running}
                className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${running ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25'}`}
              >
                {running ? <Activity className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {running ? 'Simulating...' : 'Run Protocol'}
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-8 bg-gray-900/50 rounded-xl border border-gray-700">
              
              <div className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all ${running ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-gray-700 bg-gray-800'}`}>
                <Zap className={`w-10 h-10 mb-3 ${running ? 'text-blue-400' : 'text-gray-500'}`} />
                <span className="font-bold">Text Agent</span>
                <span className="text-xs text-gray-500 mt-1">GPT-4 / Claude 3</span>
              </div>

              <ArrowRight className={`w-8 h-8 hidden md:block ${running ? 'text-blue-400 animate-pulse' : 'text-gray-600'}`} />
              
              <div className="flex flex-col items-center p-6 rounded-2xl border-2 border-gray-700 bg-gray-800">
                <BrainCircuit className="w-10 h-10 mb-3 text-purple-500" />
                <span className="font-bold">Vision Agent</span>
                <span className="text-xs text-gray-500 mt-1">Midjourney v6</span>
              </div>

              <ArrowRight className="w-8 h-8 hidden md:block text-gray-600" />

              <div className="flex flex-col items-center p-6 rounded-2xl border-2 border-gray-700 bg-gray-800">
                <Cpu className="w-10 h-10 mb-3 text-green-500" />
                <span className="font-bold">Video Agent</span>
                <span className="text-xs text-gray-500 mt-1">Sora / Runway Gen-3</span>
              </div>

            </div>
          </motion.div>

          {/* Terminal Output */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 bg-black border border-gray-800 p-4 rounded-2xl font-mono text-xs flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-gray-500 font-bold">AGENT_TERMINAL</span>
            </div>
            
            <div className="flex-1 space-y-2 text-green-400 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-600">Waiting for execution...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="animate-fade-in">{log}</div>
                ))
              )}
              {running && <div className="animate-pulse">_</div>}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
