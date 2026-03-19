import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useCredits } from '../context/CreditsContext';
import { soundEngine } from '../utils/SoundEngine';

const PERSONAS = [
  { id: 'default', icon: '🤖', name: 'Standard Assistent', prompt: 'Du bist ein hilfreicher KI-Assistent.' },
  { id: 'prompt_engineer', icon: '🎨', name: 'Prompt Engineer', prompt: 'Du bist ein professioneller Prompt-Engineer.' },
  { id: 'seo_expert', icon: '📈', name: 'SEO Copywriter', prompt: 'Du bist ein SEO-Experte.' },
  { id: 'developer', icon: '💻', name: 'Senior Developer', prompt: 'Du bist ein Senior Developer.' },
  { id: 'translator', icon: '🌍', name: 'Profi Übersetzer', prompt: 'Übersetze die Texte präzise und idiomatisch.' },
  { id: 'summarizer', icon: '✂️', name: 'Text Zusammenfasser', prompt: 'Fasse lange Texte auf die wichtigsten Kernaussagen zusammen.' },
  { id: 'data_analyst', icon: '📊', name: 'Data Analyst', prompt: 'Analysiere Daten und erstelle übersichtliche Tabellen.' },
  { id: 'social_media', icon: '📱', name: 'Social Media Manager', prompt: 'Schreibe virale Posts mit passenden Hashtags und Emojis.' }
];

export default function LiveGenerator() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('openai/gpt-3.5-turbo');
  const [generationMode, setGenerationMode] = useState('text'); // text, image, video, music
  const [persona, setPersona] = useState(PERSONAS[0]);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(''); // Multimodal Input
  const [isListening, setIsListening] = useState(false);
  
  const chatEndRef = useRef(null);
  const { spendCredits, credits } = useCredits();
  const { t, lang } = useLanguage();

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Spracherkennung wird von diesem Browser nicht unterstützt.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onstart = () => {
      soundEngine.playClick();
      setIsListening(true);
      toast('Spreche jetzt...', { icon: '🎙️' });
    };
    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
      }
      if (finalTranscript) setInput(prev => prev + finalTranscript + ' ');
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => {
      soundEngine.playClick();
      setIsListening(false);
    };
    recognition.start();
  };

  const handleClear = () => {
    soundEngine.playPop();
    setMessages([]);
    setInput('');
    setImageUrl('');
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    let cost = 1;
    if (generationMode === 'image') cost = 3;
    if (generationMode === 'video') cost = 10;
    if (generationMode === 'music') cost = 5;

    if (credits < cost) {
      toast.error(`Nicht genügend Sparks! (${cost} benötigt)`);
      return;
    }

    const userMsg = { id: Date.now(), role: 'user', content: input, image: imageUrl };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setImageUrl('');
    setLoading(true);
    soundEngine.playClick();

    try {
      const success = await spendCredits(cost);
      if (!success) {
        setLoading(false);
        return;
      }

      if (generationMode === 'text') {
        setTimeout(() => {
          let reply = "Das ist eine simulierte KI-Antwort im Textmodus. In Produktion wäre hier die API angebunden.";
          if (model.includes('gpt-4')) reply = "Ich analysiere das komplex... " + reply;
          if (persona.id === 'prompt_engineer') reply = "A highly detailed masterpiece, 8k resolution, cinematic lighting, photorealistic --ar 16:9 --v 6.0";
          if (persona.id === 'developer') reply = "```javascript\nfunction helloWorld() {\n  console.log('Hello Live Generator!');\n}\n```";
          
          setMessages(prev => [...prev, { id: Date.now(), role: 'assistant', content: reply }]);
          setLoading(false);
          soundEngine.playSuccess();
        }, 1500);
      } else if (generationMode === 'image') {
        setTimeout(() => {
          const imgSeed = Math.floor(Math.random() * 10000);
          setMessages(prev => [...prev, { 
            id: Date.now(), 
            role: 'assistant', 
            content: "Bild erfolgreich generiert!",
            generatedImage: `https://picsum.photos/seed/${imgSeed}/512/512`
          }]);
          setLoading(false);
          soundEngine.playSuccess();
          toast.success('Bild fertiggestellt!');
        }, 3000);
      } else if (generationMode === 'video') {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            id: Date.now(), 
            role: 'assistant', 
            content: "Video-Rendern abgeschlossen. Dein Clip ist bereit.",
            generatedVideo: 'https://cdn.pixabay.com/video/2020/05/25/40131-424813350_large.mp4'
          }]);
          setLoading(false);
          soundEngine.playSuccess();
          toast.success('Video gerendert!');
        }, 5000);
      } else if (generationMode === 'music') {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            id: Date.now(), 
            role: 'assistant', 
            content: "Metatags und Lyrics verarbeitet. KI-Track generiert.",
            generatedAudio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
          }]);
          setLoading(false);
          soundEngine.playSuccess();
          toast.success('Song produziert!');
        }, 4000);
      }
    } catch (err) {
      toast.error('Fehler bei der Generierung.');
      setLoading(false);
    }
  };

  const renderMessageContent = (msg) => {
    return (
      <div className="flex flex-col gap-3">
        <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.content}</p>
        
        {/* User Image Input */}
        {msg.image && (
          <img src={msg.image} alt="User Upload" className="max-w-xs rounded-xl shadow-md border border-slate-700/50" />
        )}
        
        {/* GENERATED MULTIMEDIA */}
        {msg.generatedImage && (
          <div className="mt-2 rounded-xl overflow-hidden border border-slate-600 shadow-xl max-w-sm">
            <img src={msg.generatedImage} alt="KI Generiert" className="w-full h-auto" />
            <div className="bg-slate-800 p-2 text-xs text-center font-semibold text-pink-400">🖼️ DALL-E / Midjourney</div>
          </div>
        )}
        {msg.generatedVideo && (
          <div className="mt-2 rounded-xl overflow-hidden border border-slate-600 shadow-xl max-w-sm">
            <video src={msg.generatedVideo} controls autoPlay loop className="w-full h-auto bg-black" />
            <div className="bg-slate-800 p-2 text-xs text-center font-semibold text-red-400">🎥 Runway / Sora</div>
          </div>
        )}
        {msg.generatedAudio && (
          <div className="mt-2 rounded-xl overflow-hidden border border-slate-600 shadow-xl max-w-sm bg-slate-800 p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-2xl">🎵</span>
              </div>
              <div>
                <div className="font-bold text-emerald-400">KI Hit-Track</div>
                <div className="text-xs text-slate-400">Suno / Udio Generierung</div>
              </div>
            </div>
            <audio src={msg.generatedAudio} controls className="w-full h-10" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl animate-fade-in mx-auto mt-4 h-full min-h-[calc(100vh-120px)] flex flex-col">
      
      {/* GLOBAL MODE SWITCHER */}
      <div className="flex justify-center mb-6">
        <div className="bg-slate-800/80 backdrop-blur-md p-1.5 rounded-2xl flex flex-wrap justify-center gap-2 border border-slate-700/50 shadow-xl">
          <button 
            onClick={() => { setGenerationMode('text'); soundEngine.playPop(); }}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${generationMode === 'text' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 scale-105' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
          >
            💬 Chat & Text
          </button>
          <button 
            onClick={() => { setGenerationMode('image'); soundEngine.playPop(); }}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${generationMode === 'image' ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/20 scale-105' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
          >
            🖼️ KI Bild
          </button>
          <button 
            onClick={() => { setGenerationMode('video'); soundEngine.playPop(); }}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${generationMode === 'video' ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/20 scale-105' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
          >
            🎥 KI Video
          </button>
          <button 
            onClick={() => { setGenerationMode('music'); soundEngine.playPop(); }}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${generationMode === 'music' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 scale-105' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
          >
            🎵 KI Musik
          </button>
        </div>
      </div>

      <div className="flex justify-between items-end mb-4 px-2">
        <div>
          <h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">✨ Universal Live Studio</h2>
          <p className="text-slate-400">Nutze Multimodale KI, kopiere Prompts aus der Bibliothek und erschaffe Kunstwerke.</p>
        </div>
        {messages.length > 0 && (
          <button onClick={handleClear} className="text-sm font-semibold px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:text-red-400 transition-colors flex items-center gap-2 shadow-inner border border-slate-700 hover:border-red-500/50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Studio leeren
          </button>
        )}
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Linke Spalte: Chat Bereich */}
        <div className="flex-1 min-h-[600px] glass-card border border-slate-700/50 rounded-3xl flex flex-col overflow-hidden bg-slate-900/80 shadow-2xl relative">
          
          {/* Cost Indicator Badge */}
          <div className="absolute top-4 left-4 z-10 bg-slate-800/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2 shadow-lg">
            <span className="text-amber-400 text-lg">⚡</span>
            <span className="text-slate-300 font-medium text-sm">
              Kosten: {generationMode === 'text' ? '1' : generationMode === 'image' ? '3' : generationMode === 'music' ? '5' : '10'} Sparks
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide pt-16">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-6">
                <div className="w-32 h-32 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 shadow-inner">
                  <span className="text-6xl opacity-50">
                    {generationMode === 'text' ? '💬' : generationMode === 'image' ? '🖼️' : generationMode === 'video' ? '🎥' : '🎵'}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-xl font-medium text-slate-400 mb-2">Das Studio ist bereit.</p>
                  <p className="text-sm max-w-md">
                    {generationMode === 'text' ? 'Stelle eine Frage, schreibe Code oder lass dir einen perfekten Text verfassen.' : 
                     generationMode === 'image' ? 'Füge einen Prompt aus der Bild-Bibliothek ein, um ein hochauflösendes Rendering zu starten.' : 
                     generationMode === 'video' ? 'Beschreibe eine Kamerafahrt oder Szene, um einen cineastischen Videoclip zu generieren.' : 
                     'Füge Song-Strukturen und Lyrics aus dem Hit-Labor ein, um einen kompletten Audiotrack zu produzieren.'}
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                  {msg.role === 'assistant' && (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 shadow-lg border ${
                      generationMode === 'text' ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-indigo-400/30' :
                      generationMode === 'image' ? 'bg-gradient-to-br from-pink-500 to-rose-600 border-pink-400/30' :
                      generationMode === 'video' ? 'bg-gradient-to-br from-red-500 to-orange-600 border-orange-400/30' :
                      'bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400/30'
                    }`}>
                      <span className="text-white text-sm font-bold shadow-sm">AI</span>
                    </div>
                  )}
                  <div className={`p-4 rounded-2xl max-w-[85%] shadow-md border ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-br-none border-slate-600/50' 
                      : 'bg-slate-800/80 backdrop-blur-md text-slate-200 rounded-bl-none border-slate-700/50'
                  }`}>
                    {renderMessageContent(msg)}
                  </div>
                </div>
              ))
            )}
            
            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-lg border ${
                  generationMode === 'text' ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-indigo-400/30' :
                  generationMode === 'image' ? 'bg-gradient-to-br from-pink-500 to-rose-600 border-pink-400/30' :
                  generationMode === 'video' ? 'bg-gradient-to-br from-red-500 to-orange-600 border-orange-400/30' :
                  'bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400/30'
                }`}>
                  <span className="text-white text-sm font-bold animate-pulse">AI</span>
                </div>
                <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl rounded-bl-none p-4 flex items-center gap-3 border border-slate-700/50 shadow-md">
                  <div className="flex gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full animate-bounce ${
                      generationMode === 'text' ? 'bg-blue-500' : generationMode === 'image' ? 'bg-pink-500' : generationMode === 'video' ? 'bg-red-500' : 'bg-emerald-500'
                    }`}></div>
                    <div className={`w-2.5 h-2.5 rounded-full animate-bounce ${
                      generationMode === 'text' ? 'bg-blue-500' : generationMode === 'image' ? 'bg-pink-500' : generationMode === 'video' ? 'bg-red-500' : 'bg-emerald-500'
                    }`} style={{ animationDelay: '0.2s' }}></div>
                    <div className={`w-2.5 h-2.5 rounded-full animate-bounce ${
                      generationMode === 'text' ? 'bg-blue-500' : generationMode === 'image' ? 'bg-pink-500' : generationMode === 'video' ? 'bg-red-500' : 'bg-emerald-500'
                    }`} style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-slate-400 text-sm italic">
                    {generationMode === 'text' ? 'Denkt nach...' : generationMode === 'image' ? 'Rendert Pixel...' : generationMode === 'video' ? 'Rendert Frames...' : 'Komponiert Song...'}
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} className="h-4" />
          </div>

          <div className="p-4 bg-slate-900/90 border-t border-slate-700/50 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-slate-950 rounded-2xl p-2 border border-slate-700/50 shadow-inner">
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder={
                    generationMode === 'text' ? 'Schreibe deine Nachricht...' :
                    generationMode === 'image' ? 'Füge den kopierten Bild-Prompt hier ein...' :
                    generationMode === 'video' ? 'Füge die Kamerabefehle und Prompts hier ein...' :
                    'Füge die Songstruktur und Lyrics hier ein...'
                  }
                  className="w-full bg-transparent text-white placeholder-slate-500 resize-none outline-none py-3 px-4 max-h-32 min-h-[56px] scrollbar-hide text-[15px]"
                  rows={input.split('\n').length > 1 ? Math.min(input.split('\n').length, 5) : 1}
                />
              </div>

              {/* Attach Image Button (Visual Only) */}
              {(generationMode === 'text' || generationMode === 'image') && (
                <button type="button" className="p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors mb-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                </button>
              )}

              {/* Mic Button */}
              <button 
                type="button" 
                onClick={startListening}
                className={`p-3 rounded-xl transition-all mb-1 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
              </button>

              <button 
                type="submit" 
                disabled={!input.trim() || loading}
                className={`p-3 rounded-xl transition-all mb-1 font-bold shadow-lg ${
                  !input.trim() || loading 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : generationMode === 'text' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-blue-500/25'
                    : generationMode === 'image' ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:shadow-pink-500/25'
                    : generationMode === 'video' ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white hover:shadow-red-500/25'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-emerald-500/25'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Enter = Senden • Shift+Enter = Zeilenumbruch</span>
            </div>
          </div>
        </div>

        {/* Rechte Spalte: Settings */}
        <div className="w-80 flex flex-col gap-6">
          <div className="glass-panel p-5 rounded-3xl border border-slate-700/50 shadow-xl bg-slate-900/80">
            <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="text-lg">⚙️</span> {generationMode === 'text' ? 'Text' : generationMode === 'image' ? 'Bild' : generationMode === 'video' ? 'Video' : 'Audio'} Settings
            </h3>
            
            {generationMode === 'text' && (
              <>
                <div className="mb-5">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-2 block">KI Modell</label>
                  <select 
                    value={model} 
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:border-blue-500 outline-none"
                  >
                    <option value="gpt-5-mini">✨ GPT 5 mini</option>
                    <option value="gpt-4.1">✨ GPT 4.1</option>
                    <option value="deepseek-v3.2-special">🐳 DeepSeek V3.2 Speciale</option>
                    <option value="deepseek-v3.2">🐳 DeepSeek V3.2</option>
                    <option value="deepseek-r1">🐳 DeepSeek R1</option>
                    <option value="grok-4">∅ Grok 4</option>
                    <option value="grok-4.1-fast">∅ Grok 4.1 Fast</option>
                    <option value="minimax-m2.5">〰️ MiniMax M2.5</option>
                    <option value="kimi-k2.5">🌑 Kimi K2.5</option>
                    <option value="gpt-oss-120b">🤖 GPT OSS 120B</option>
                  </select>
                </div>
                
                <div className="mb-5">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-2 block">Persona (Rolle)</label>
                  <div className="grid grid-cols-1 gap-2">
                    {PERSONAS.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { setPersona(p); soundEngine.playPop(); }}
                        className={`text-left p-2.5 rounded-xl border text-xs flex items-center gap-2 transition-all ${
                          persona.id === p.id 
                            ? 'bg-blue-500/20 border-blue-500 text-white font-bold shadow-inner' 
                            : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                        }`}
                      >
                        <span className="text-base">{p.icon}</span> {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <label className="text-xs text-slate-400 font-bold uppercase">Kreativität (Temp)</label>
                    <span className="text-xs text-blue-400 font-bold">{temperature}</span>
                  </div>
                  <input 
                    type="range" min="0" max="2" step="0.1" 
                    value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-blue-500" 
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>Präzise</span>
                    <span>Kreativ</span>
                  </div>
                </div>
              
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Output Format</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-blue-500">
                    <option>Standard Text</option>
                    <option>Bulletpoints (Liste)</option>
                    <option>Markdown Tabelle</option>
                    <option>JSON / Code Snippet</option>
                    <option>Blog Artikel (SEO)</option>
                    <option>Schritt-für-Schritt Anleitung</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Tonfall (Tone of Voice)</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-blue-500">
                    <option>Neutral & Objektiv</option>
                    <option>Professionell & Seriös</option>
                    <option>Locker & Humorvoll</option>
                    <option>Empathisch & Motivierend</option>
                    <option>Sarkastisch & Zynisch</option>
                    <option>Akademisch & Komplex</option>
                  </select>
                </div>
              </>
            )}


            {generationMode === 'image' && (
              <>
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Bild Generator</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-pink-500">
                    <option>✨ Nano Banana 2</option>
                    <option>✨ Nano Banana Pro (🍌 Pro)</option>
                    <option>📊 Seedream V5.0 Lite</option>
                    <option>💃 Seedance 2.0</option>
                    <option>✨ Nano Banana 1 (🍌 Flash)</option>
                    <option>🤖 GPT Image 1.5</option>
                    <option>📊 Seedream v4.5</option>
                    <option>✨ Gemini 3.1 Pro Preview</option>
                    <option>✨ Gemini 3 Flash Preview</option>
                    <option>✨ Gemini 2.5 Pro</option>
                    <option>🤖 GPT 5.4</option>
                    <option>🤖 GPT 5.2 Pro</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Format (Aspect Ratio)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['1:1 (Square)', '16:9 (Landscape)', '9:16 (Reel)', '4:5 (Portrait)'].map(ratio => (
                      <button key={ratio} className="p-2 rounded-lg bg-slate-950 border border-slate-700 text-[10px] text-slate-300 hover:border-pink-500 transition-colors font-medium">
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Kunst-Stil (Art Style)</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-pink-500">
                    <option>Photorealistic (Raw)</option>
                    <option>Anime / Manga (Niji)</option>
                    <option>3D Render (Pixar / Disney)</option>
                    <option>Cinematic / Movie Still</option>
                    <option>Cyberpunk / Sci-Fi</option>
                    <option>Watercolor Illustration</option>
                    <option>Minimalist Vector / Logo</option>
                    <option>Studio Photography</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Licht & Atmosphäre</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-pink-500">
                    <option>Cinematic Lighting</option>
                    <option>Golden Hour / Sunset</option>
                    <option>Volumetric Fog (Neblig)</option>
                    <option>Neon Rim Lighting</option>
                    <option>Soft Studio Softbox</option>
                    <option>Moody / Dark</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Render Engine / Qualität</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-pink-500">
                    <option>8k Resolution, Masterpiece</option>
                    <option>Unreal Engine 5 Render</option>
                    <option>Octane Render</option>
                    <option>35mm Film Photography</option>
                    <option>Polaroid Vintage Look</option>
                  </select>
                </div>
              </>
            )}
{generationMode === 'video' && (
              <>
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Video Engine</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-red-500">
                    <option>🔵 Kling 3.0 Standard | Text-to-video</option>
                    <option>💃 Seedance 2.0 | AI Dance Video</option>
                    <option>🔵 Kling V2.6 Pro | Image-to-video</option>
                    <option>🔵 Kling 3.0 Standard | Image-to-video</option>
                    <option>🔵 Kling V2.6 Pro | Text-to-video</option>
                    <option>✡️ Wan V2.6 | Image-to-video</option>
                    <option>✡️ Wan V2.6 | Text-to-video</option>
                    <option>🌀 Veo 3.1 Fast | Image-to-video</option>
                    <option>🌀 Veo 3.1 | Image-to-video</option>
                    <option>🌀 Veo 3.1 | Text-to-video</option>
                    <option>🌀 Veo 3.1 Fast | Text-to-video</option>
                    <option>🤖 Sora 2 | Text-to-video</option>
                    <option>🤖 Sora 2 | Image-to-video</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Format (Größe)</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-red-500">
                    <option>16:9 (Landscape / YouTube)</option>
                    <option>9:16 (Portrait / Reels)</option>
                    <option>1:1 (Square)</option>
                    <option>21:9 (Cinematic Widescreen)</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Einstellung (Position)</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-red-500">
                    <option>Medium Shot (Halbfigur)</option>
                    <option>Close-Up (Nahaufnahme)</option>
                    <option>Extreme Close-Up (Detail)</option>
                    <option>Full Shot (Totale)</option>
                    <option>Wide/Establishing Shot (Panorama)</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Kamera-Winkel</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-red-500">
                    <option>Eye Level (Augenhöhe)</option>
                    <option>Low Angle (Froschperspektive)</option>
                    <option>High Angle (Vogelperspektive)</option>
                    <option>Over the Shoulder (OTS)</option>
                    <option>Dutch Angle (Gekippt)</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Kamera-Bewegung</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-red-500">
                    <option>Automatisch (KI)</option>
                    <option>Static / Locked-off</option>
                    <option>Pan (Links/Rechts schwenken)</option>
                    <option>Tilt (Hoch/Runter schwenken)</option>
                    <option>Zoom In / Push In</option>
                    <option>Dolly Zoom (Vertigo)</option>
                    <option>Tracking Shot (Verfolgung)</option>
                    <option>FPV Drohne (Rasant)</option>
                    <option>Handheld (Verwackelt)</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Licht (Lighting)</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-red-500">
                    <option>Cinematic Lighting</option>
                    <option>Golden Hour (Sonnenuntergang)</option>
                    <option>Neon / Cyberpunk</option>
                    <option>Natural Daylight</option>
                    <option>Moody / Low Key</option>
                    <option>Studio Lighting</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Dauer</label>
                  <div className="flex gap-2">
                    <button className="flex-1 p-2 rounded-lg bg-red-500/20 border border-red-500 text-xs text-white font-medium">5s</button>
                    <button className="flex-1 p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-400">10s</button>
                    <button className="flex-1 p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-400">15s</button>
                  </div>
                </div>
              </>
            )}

            {generationMode === 'music' && (
              <>
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Musik Engine</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-500">
                    <option>Suno v3.5 (Hit-Quality)</option>
                    <option>Suno v3 (Fast)</option>
                    <option>Udio (High Fidelity)</option>
                    <option>ElevenLabs Music</option>
                    <option>Stable Audio</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Genre (Musikstil)</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-500">
                    <option>Synthwave / Retro 80s</option>
                    <option>Modern Pop Hit</option>
                    <option>Lofi Hip-Hop / Chillhop</option>
                    <option>Epic Cinematic Orchestral</option>
                    <option>Hard Rock / Heavy Metal</option>
                    <option>EDM / Big Room House</option>
                    <option>R&B / Smooth Soul</option>
                    <option>Country / Acoustic</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Stimmung (Mood)</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-500">
                    <option>Epic & Uplifting</option>
                    <option>Dark & Aggressive</option>
                    <option>Sad & Melancholic</option>
                    <option>Chill & Relaxing</option>
                    <option>Romantic & Smooth</option>
                    <option>Energetic & Fast</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Vocals (Stimmen)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500 text-[10px] text-white font-medium">Männlich</button>
                    <button className="p-2 rounded-lg bg-slate-950 border border-slate-700 text-[10px] text-slate-400 hover:border-emerald-500">Weiblich</button>
                    <button className="p-2 rounded-lg bg-slate-950 border border-slate-700 text-[10px] text-slate-400 hover:border-emerald-500">Duett</button>
                    <button className="p-2 rounded-lg bg-slate-950 border border-slate-700 text-[10px] text-slate-400 hover:border-emerald-500">Instrumental</button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-slate-400 font-bold uppercase mb-1.5 block">Länge (Extension)</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-500">
                    <option>Vollständiger Song (Bis 4:00 Min)</option>
                    <option>Snippet / Intro (0:30 Min)</option>
                    <option>Extend (Song verlängern)</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="glass-panel p-5 rounded-3xl border border-slate-700/50 shadow-xl bg-slate-900/80">
            <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider mb-3">🔥 Pro Tipp</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {generationMode === 'text' ? 'Wechsle die Persona, um maßgeschneiderte SEO-Texte, Code oder extrem detaillierte Prompts zu generieren.' :
               generationMode === 'image' ? 'Kopiere dir fertige Prompts aus der "Bild-Prompts" Bibliothek in der Seitenleiste für die besten Resultate.' :
               generationMode === 'video' ? 'Videos benötigen mehr Renderzeit und verbrauchen 10 Sparks. Fasse deine Kamera-Bewegungen am Ende des Prompts zusammen.' :
               'Nutze Metatags wie [Intro], [Verse], [Chorus] und [Guitar Solo], damit die Musik-KI die Struktur versteht. Du findest fertige Song-Gerüste im Hit-Labor!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
