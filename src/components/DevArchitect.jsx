import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Terminal, Settings, Send, Bot, User, Slider, Code, Cpu, Shield, Globe, FolderCode, PlaySquare, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const DevArchitect = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Developer Agent initialisiert. Verbindung zum Mainframe steht. Wie kann ich dir bei deiner Architektur oder dem Code helfen?', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');
  
  // Right Sidebar Settings
  const [model, setModel] = useState('gpt-4-turbo');
  const [role, setRole] = useState('Senior Fullstack Engineer');
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(2000);
  
  // Tools
  const [tools, setTools] = useState({
    webSearch: true,
    codeInterpreter: true,
    readRepository: false,
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newUserMsg = { role: 'user', content: input, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    
    // Simulate thinking and response
    setTimeout(() => {
      const aiResponse = { 
        role: 'assistant', 
        content: `Als **${role}** analysiere ich deine Anfrage (Temperatur: ${temperature}).\n\n\`\`\`javascript\n// Analysiere Logik basierend auf deinen Vorgaben...\nconsole.log("Verarbeite Architektur-Design");\n\`\`\`\n\nDas ist ein Dummy-Response vom Developer Agent. Hier wird später die echte KI-Anbindung (z.B. GPT-4 oder Claude) integriert, die dir echten Code liefert!`, 
        timestamp: new Date().toLocaleTimeString() 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleClear = () => {
    setMessages([{ role: 'system', content: 'Workspace zurückgesetzt. Developer Agent ist bereit für neue Instruktionen.', timestamp: new Date().toLocaleTimeString() }]);
    toast.success('Chat-Historie gelöscht.');
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6 animate-fade-in text-white p-2">
      
      {/* LEFT: MAIN CHAT WORKSPACE */}
      <div className="flex-1 flex flex-col bg-gray-900/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 shadow-2xl overflow-hidden relative">
        {/* Chat Header */}
        <div className="bg-emerald-900/30 p-4 border-b border-emerald-500/20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Terminal className="text-emerald-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-300">Developer Agent Workspace</h2>
              <p className="text-xs text-gray-400">Status: <span className="text-emerald-400">Online</span> • Rolle: {role}</p>
            </div>
          </div>
          <button onClick={handleClear} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors" title="Workspace leeren">
            <Trash2 size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role !== 'user' && (
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 flex-shrink-0 mt-1">
                  {msg.role === 'system' ? <Cpu size={20} className="text-emerald-400" /> : <Bot size={20} className="text-emerald-300" />}
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-md ${msg.role === 'user' ? 'bg-blue-600/20 border border-blue-500/30 rounded-tr-none' : 'bg-gray-800/60 border border-white/5 rounded-tl-none'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {msg.role === 'user' ? 'Du' : msg.role === 'system' ? 'System' : 'Agent'}
                  </span>
                  <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
                </div>
                
                {/* Simple Markdown Renderer for Code Blocks */}
                <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {msg.content.split('```').map((part, index) => {
                    if (index % 2 !== 0) {
                      // It's a code block
                      const lines = part.split('\n');
                      const lang = lines[0].trim();
                      const code = lines.slice(1).join('\n');
                      return (
                        <div key={index} className="my-3 rounded-lg overflow-hidden border border-white/10 bg-[#0d1117]">
                          <div className="bg-[#161b22] px-3 py-1.5 text-xs text-gray-400 border-b border-white/5 flex justify-between items-center">
                            <span className="font-mono uppercase text-[10px]">{lang || 'code'}</span>
                            <div className="flex gap-1.5">
                               <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                            </div>
                          </div>
                          <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto selection:bg-emerald-500/30">
                            {code}
                          </pre>
                        </div>
                      );
                    }
                    return <span key={index}>{part}</span>;
                  })}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 flex-shrink-0 mt-1">
                  <User size={20} className="text-blue-400" />
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-900/80 border-t border-emerald-500/20 z-10 relative">
          <div className="relative flex items-end gap-2 bg-gray-800 rounded-xl border border-white/10 p-2 focus-within:border-emerald-500/50 transition-colors shadow-inner">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Beschreibe dein Architektur-Problem, füge Code ein oder fordere ein Refactoring..."
              className="w-full bg-transparent text-white p-2 resize-none max-h-40 min-h-[50px] outline-none text-sm placeholder-gray-500 font-mono"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 p-3 rounded-lg text-white transition-all flex-shrink-0 shadow-lg shadow-emerald-500/20 mb-1 mr-1"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 text-center text-[10px] text-gray-500 font-mono">
            Tipp: Nutze Shift + Enter für Zeilenumbrüche. Der Agent unterstützt Markdown-Codeblöcke.
          </div>
        </div>
      </div>

      {/* RIGHT: AGENT CONTROL CENTER */}
      <div className="w-full md:w-[320px] flex flex-col gap-4">
        
        {/* Settings Panel */}
        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/5 p-5 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Settings size={18} className="text-emerald-400" /> Agent Settings
          </h3>
          
          <div className="space-y-5">
            {/* Model Selection */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Gehirn (Modell)</label>
              <select 
                value={model} 
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-gray-800 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 outline-none appearance-none cursor-pointer"
              >
                <option value="gpt-4-turbo">GPT-4 Turbo (Smart & Fast)</option>
                <option value="claude-3-opus">Claude 3 Opus (Architect)</option>
                <option value="gemini-1.5-pro">Gemini 1.5 Pro (Context Heavy)</option>
                <option value="qwen-coder">Qwen 2.5 Coder (Open Source)</option>
              </select>
            </div>

            {/* Role / System Prompt */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Agenten-Rolle</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-gray-800 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 outline-none appearance-none cursor-pointer"
              >
                <option value="Senior Fullstack Engineer">Senior Fullstack Engineer</option>
                <option value="DevOps & Cloud Architect">DevOps & Cloud Architect</option>
                <option value="Frontend UI/UX Expert">Frontend UI/UX Experte</option>
                <option value="Security & Pentester">Security & Pentester</option>
                <option value="Database Administrator">Database Administrator (DBA)</option>
              </select>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Slider size={12} /> Kreativität (Temp)
                </label>
                <span className="text-xs font-mono text-emerald-400">{temperature.toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                min="0" max="1" step="0.1" 
                value={temperature} 
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>Strikt (Code)</span>
                <span>Kreativ (Ideen)</span>
              </div>
            </div>

            {/* Max Tokens Slider */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center mt-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Max Antwort-Länge</label>
                <span className="text-xs font-mono text-emerald-400">{maxTokens} tk</span>
              </div>
              <input 
                type="range" 
                min="500" max="8000" step="500" 
                value={maxTokens} 
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Tools Panel */}
        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/5 p-5 shadow-xl flex-1">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Code size={18} className="text-emerald-400" /> Aktive Werkzeuge
          </h3>
          
          <div className="space-y-3">
            {[
              { id: 'webSearch', label: 'Web-Suche (Docs)', icon: <Globe size={16} />, desc: 'Aktuelle Doku lesen' },
              { id: 'codeInterpreter', label: 'Code Interpreter', icon: <PlaySquare size={16} />, desc: 'Code lokal ausführen' },
              { id: 'readRepository', label: 'Repo-Zugriff', icon: <FolderCode size={16} />, desc: 'Gesamte Codebasis lesen' }
            ].map(tool => (
              <div 
                key={tool.id} 
                onClick={() => setTools({...tools, [tool.id]: !tools[tool.id]})}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${tools[tool.id] ? 'bg-emerald-900/20 border-emerald-500/30 shadow-sm shadow-emerald-500/10' : 'bg-gray-800/50 border-white/5 hover:bg-gray-800'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-md ${tools[tool.id] ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                    {tool.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-200">{tool.label}</div>
                    <div className="text-[10px] text-gray-500">{tool.desc}</div>
                  </div>
                </div>
                <div className={`w-9 h-5 rounded-full relative transition-colors ${tools[tool.id] ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                  <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all shadow-sm ${tools[tool.id] ? 'left-[19px]' : 'left-[3px]'}`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 bg-blue-900/20 border border-blue-500/30 rounded-xl">
             <h4 className="text-xs font-bold text-blue-400 flex items-center gap-1 mb-1">
                <Shield size={12} /> Privacy Notice
             </h4>
             <p className="text-[10px] text-gray-400 leading-tight">
                Der Developer Agent liest nur Code-Schnipsel, die du explizit einfügst, es sei denn, "Repo-Zugriff" ist aktiviert.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DevArchitect;
