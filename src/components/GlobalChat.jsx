import React, { useState, useRef, useEffect } from 'react';
import { soundEngine } from '../utils/SoundEngine';

export default function GlobalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState('copilot'); // 'copilot' or 'nexus'
  const [activeChannel, setActiveChannel] = useState('global');
  
  // Copilot State
  const [copilotMessages, setCopilotMessages] = useState([
    { id: 1, role: 'assistant', text: 'Hallo Commander! Ich bin Spark, dein KI-Copilot. Wie kann ich dir heute bei deinen Prompts oder der Navigation helfen?' }
  ]);
  const [copilotInput, setCopilotInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const copilotEndRef = useRef(null);

  // Nexus State (Mock Data)
  const [nexusMessages, setNexusMessages] = useState([
    { id: 1, channel: 'global', user: 'CyberPunk99', avatar: '🥷', text: 'Hat jemand schon Kling 3.0 für Anime-Style getestet?', time: '10:42' },
    { id: 2, channel: 'global', user: 'ArtDirector', avatar: '🎨', text: 'Ja, funktioniert super! Du musst nur "--style raw" weglassen.', time: '10:45' },
    { id: 3, channel: 'prompt-hilfe', user: 'Newbie', avatar: '🐣', text: 'Wie bekomme ich konsistente Gesichter in Midjourney hin?', time: '09:15' },
    { id: 4, channel: 'showcase', user: 'NeonDreams', avatar: '✨', text: 'Checkt mein neues Video im Community Feed ab! 🔥', time: '11:00' }
  ]);
  const [nexusInput, setNexusInput] = useState('');
  const nexusEndRef = useRef(null);

  const toggleChat = () => {
    soundEngine.playPop();
    setIsOpen(!isOpen);
  };

  const handleCopilotSubmit = (e) => {
    e.preventDefault();
    if (!copilotInput.trim()) return;
    
    soundEngine.playClick();
    const newUserMsg = { id: Date.now(), role: 'user', text: copilotInput };
    setCopilotMessages(prev => [...prev, newUserMsg]);
    setCopilotInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let reply = "Verstanden. Ich durchsuche die Datenbank...";
      if (newUserMsg.text.toLowerCase().includes('midjourney')) reply = "Für Midjourney empfehle ich, Parameter wie --ar 16:9 und --v 6.0 ans Ende des Prompts zu setzen.";
      if (newUserMsg.text.toLowerCase().includes('video')) reply = "Die Video-Engine Kling 3.0 findest du im 'Live Generator'. Denke daran, Kamera-Befehle wie 'pan right' zu nutzen.";
      
      setCopilotMessages(prev => [...prev, { id: Date.now(), role: 'assistant', text: reply }]);
      setIsTyping(false);
      soundEngine.playSuccess();
    }, 1500);
  };

  const handleNexusSubmit = (e) => {
    e.preventDefault();
    if (!nexusInput.trim()) return;
    
    soundEngine.playClick();
    const newMsg = {
      id: Date.now(),
      channel: activeChannel,
      user: 'You',
      avatar: '👤',
      text: nexusInput,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setNexusMessages(prev => [...prev, newMsg]);
    setNexusInput('');
  };

  // Auto-scroll
  useEffect(() => {
    if (activeMode === 'copilot') copilotEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (activeMode === 'nexus') nexusEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [copilotMessages, nexusMessages, activeMode, isOpen, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="w-[380px] h-[600px] max-h-[80vh] bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-2xl mb-4 flex flex-col overflow-hidden animate-slide-up transform origin-bottom-right">
          
          {/* Header & Tabs */}
          <div className="bg-slate-950 border-b border-slate-800 p-3 flex flex-col gap-3">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                {activeMode === 'copilot' ? '🤖 Spark Copilot' : '🌐 Creator Nexus'}
              </h3>
              <button onClick={toggleChat} className="text-slate-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
              <button 
                onClick={() => { setActiveMode('copilot'); soundEngine.playPop(); }}
                className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-colors ${activeMode === 'copilot' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                🤖 Support Bot
              </button>
              <button 
                onClick={() => { setActiveMode('nexus'); soundEngine.playPop(); }}
                className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-colors ${activeMode === 'nexus' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                💬 Community Lounge
              </button>
            </div>
          </div>

          {/* ----------------- COPILOT MODE ----------------- */}
          {activeMode === 'copilot' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gradient-to-b from-slate-900 to-slate-950">
                {copilotMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center mr-2 flex-shrink-0 text-sm">🤖</div>
                    )}
                    <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-900/20' 
                        : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center mr-2 text-sm animate-pulse">🤖</div>
                    <div className="bg-slate-800 rounded-2xl rounded-bl-none p-3 border border-slate-700 flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                )}
                <div ref={copilotEndRef} />
              </div>
              <form onSubmit={handleCopilotSubmit} className="p-3 border-t border-slate-800 bg-slate-950">
                <div className="relative">
                  <input 
                    type="text" 
                    value={copilotInput}
                    onChange={(e) => setCopilotInput(e.target.value)}
                    placeholder="Frag Spark um Hilfe..." 
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:border-blue-500 outline-none"
                  />
                  <button type="submit" disabled={!copilotInput.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400 disabled:opacity-50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ----------------- NEXUS MODE ----------------- */}
          {activeMode === 'nexus' && (
            <div className="flex-1 flex flex-col min-h-0 bg-slate-900">
              {/* Channels Row */}
              <div className="flex gap-2 p-2 overflow-x-auto border-b border-slate-800 scrollbar-hide bg-slate-950/50">
                {['global', 'prompt-hilfe', 'showcase'].map(ch => (
                  <button 
                    key={ch}
                    onClick={() => { setActiveChannel(ch); soundEngine.playPop(); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${activeChannel === ch ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
                  >
                    # {ch}
                  </button>
                ))}
              </div>

              {/* Chat Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center text-xs text-slate-600 font-bold uppercase mb-4 py-2 border-b border-slate-800/50">
                  Willkommen im #{activeChannel}
                </div>
                {nexusMessages.filter(m => m.channel === activeChannel).map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-sm">
                      {msg.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-sm text-indigo-300">{msg.user}</span>
                        <span className="text-[10px] text-slate-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-slate-300 mt-0.5 leading-snug">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={nexusEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleNexusSubmit} className="p-3 border-t border-slate-800 bg-slate-950">
                <div className="relative">
                  <input 
                    type="text" 
                    value={nexusInput}
                    onChange={(e) => setNexusInput(e.target.value)}
                    placeholder={`Nachricht an #${activeChannel}...`} 
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:border-indigo-500 outline-none"
                  />
                  <button type="submit" disabled={!nexusInput.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-400 disabled:opacity-50">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button 
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-transform hover:scale-110 ${isOpen ? 'bg-slate-800 text-slate-400 border border-slate-600' : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'}`}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Unread Badge (Mock) */}
      {!isOpen && (
        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
      )}
    </div>
  );
}