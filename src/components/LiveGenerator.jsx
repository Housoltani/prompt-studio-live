import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const PERSONAS = [
  { id: 'default', name: 'Standard Assistent', prompt: 'Du bist ein hilfreicher KI-Assistent.' },
  { id: 'prompt_engineer', name: 'Profi Prompt Engineer', prompt: 'Du bist ein professioneller Prompt-Engineer für Bildgeneratoren (Midjourney, DALL-E). Antworte ausschließlich mit extrem detaillierten englischen Prompts inkl. Keywords für Lighting, Camera, Style und Mood.' },
  { id: 'seo_expert', name: 'SEO Copywriter', prompt: 'Du bist ein erfahrener SEO-Experte und Copywriter. Schreibe hochkonvertierende, strukturierte Texte mit LSI-Keywords, die menschlich klingen und direkt für Google optimiert sind.' },
  { id: 'developer', name: 'Senior Developer', prompt: 'Du bist ein Senior Software Developer. Antworte präzise, liefere sauberen, gut kommentierten Code und erkläre komplexe Konzepte einfach. Vermeide unnötigen Smalltalk.' }
];

export default function LiveGenerator() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('openai/gpt-3.5-turbo');
  const [persona, setPersona] = useState(PERSONAS[0]);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(''); // Multimodal
  
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleGenerate = async () => {
    if (!input.trim() && !imageUrl) {
      toast.error('Bitte gib einen Prompt oder ein Bild ein!');
      return;
    }

    const userMessage = { 
      role: 'user', 
      content: input,
      image: imageUrl || null
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setImageUrl('');
    setLoading(true);

    // Video & Audio Simulation
    if (model.startsWith('video/') || model.startsWith('audio/')) {
      setTimeout(() => {
        const isVideo = model.startsWith('video/');
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: isVideo ? 'Hier ist dein generiertes Video:' : 'Hier ist dein generierter Audio-Track:',
          generatedVideo: isVideo ? 'https://cdn.pixabay.com/video/2020/05/25/40131-424813350_large.mp4' : null,
          generatedAudio: !isVideo ? 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' : null,
          modelName: model.split('/')[1].toUpperCase().replace('-', ' ')
        }]);
        setLoading(false);
        toast.success(isVideo ? 'Video erfolgreich generiert!' : 'Audio erfolgreich generiert!', { icon: isVideo ? '🎬' : '🎵' });
      }, 2500);
      return;
    }

    // Echte Bild-Generierung (über Pollinations AI API für Demo)
    if (model.startsWith('image/')) {
      setTimeout(() => {
        const encodedPrompt = encodeURIComponent(userMessage.content || 'A beautiful futuristic landscape');
        const seed = Math.floor(Math.random() * 100000);
        const generatedImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?nologo=true&seed=${seed}`;
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Hier ist dein generiertes Bild:',
          generatedImage: generatedImageUrl,
          modelName: model.replace('image/', '').toUpperCase()
        }]);
        setLoading(false);
        toast.success('Bild erfolgreich generiert!', { icon: '🎨' });
      }, 1500);
      return;
    }

    // Reguläre Text-Generierung über OpenRouter
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      toast.error('API Key fehlt! Bitte in der .env Datei als VITE_OPENROUTER_API_KEY eintragen.');
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Fehler: VITE_OPENROUTER_API_KEY fehlt in der .env Datei.', error: true }]);
      setLoading(false);
      return;
    }

    try {
      // Baue die Chat-Historie für die API auf
      const apiMessages = [
        { role: 'system', content: persona.prompt },
        ...messages.map(m => ({
          role: m.role,
          content: m.image ? [
            { type: 'text', text: m.content || 'Beschreibe dieses Bild.' },
            { type: 'image_url', image_url: { url: m.image } }
          ] : m.content
        })),
        {
          role: 'user',
          content: userMessage.image ? [
            { type: 'text', text: userMessage.content || 'Beschreibe dieses Bild.' },
            { type: 'image_url', image_url: { url: userMessage.image } }
          ] : userMessage.content
        }
      ];

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Prompt Studio Live'
        },
        body: JSON.stringify({
          model: model,
          messages: apiMessages,
          temperature: parseFloat(temperature),
          max_tokens: parseInt(maxTokens)
        })
      });

      const data = await response.json();
      
      if (response.ok && data.choices) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.choices[0].message.content,
          modelName: data.model || model
        }]);
      } else {
        const errMsg = data.error?.message || 'Unbekannter Fehler';
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ API Fehler: ${errMsg}`, error: true }]);
        toast.error('Fehler bei der Generierung');
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Verbindungsfehler zur KI-API.', error: true }]);
      toast.error('Netzwerkfehler');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const handleClear = () => {
    setMessages([]);
    toast.success('Chat-Historie gelöscht.');
  };

  return (
    <div className="max-w-6xl animate-fade-in mx-auto mt-4 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">✨ Pro Live Generator</h2>
          <p className="text-slate-400">Nutze Multimodale KI, Personas, Parameter & echte Bild-Generierung in Echtzeit.</p>
        </div>
        {messages.length > 0 && (
          <button onClick={handleClear} className="text-sm text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Chat leeren
          </button>
        )}
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        
        {/* LInke Spalte: Chat Bereich */}
        <div className="flex-1 glass-card border border-slate-700/50 rounded-3xl flex flex-col overflow-hidden bg-slate-900/80">
          
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-3xl mb-2">🤖</div>
                <p>Der Generator ist bereit. Wähle deine Einstellungen und starte den Chat.</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.role === 'user' 
                      ? 'bg-blue-600/20 border border-blue-500/30 text-blue-50' 
                      : msg.error 
                        ? 'bg-red-900/20 border border-red-500/30 text-red-200'
                        : 'bg-slate-800 border border-slate-700 text-slate-200'
                  }`}>
                    
                    {/* Role Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{msg.role === 'user' ? '👤' : '🤖'}</span>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                        {msg.role === 'user' ? 'Du' : msg.modelName || 'Assistant'}
                      </span>
                    </div>

                    {/* Content */}
                    {msg.image && (
                      <img src={msg.image} alt="User Upload" className="max-w-xs rounded-lg border border-slate-600 mb-3 shadow-lg" />
                    )}
                    {msg.content && (
                      <div className="whitespace-pre-wrap leading-relaxed text-sm font-sans">{msg.content}</div>
                    )}
                    {msg.generatedImage && (
                      <img src={msg.generatedImage} alt="AI Generated" className="mt-3 w-full max-w-md rounded-xl border border-slate-600 shadow-2xl" />
                    )}
                    {msg.generatedVideo && (
                      <div className="mt-3 w-full max-w-md rounded-xl overflow-hidden border border-slate-600 shadow-2xl">
                        <video src={msg.generatedVideo} controls autoPlay loop className="w-full bg-black" />
                      </div>
                    )}
                    {msg.generatedAudio && (
                      <div className="mt-3 w-full max-w-md rounded-xl p-3 bg-slate-900 border border-slate-600 shadow-2xl">
                        <audio src={msg.generatedAudio} controls className="w-full" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex gap-2 items-center text-slate-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900 border-t border-slate-800">
            {imageUrl && (
              <div className="mb-2 relative inline-block">
                <img src={imageUrl} alt="Preview" className="h-16 rounded border border-slate-700" />
                <button onClick={() => setImageUrl('')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
              </div>
            )}
            <div className="flex items-end gap-2 bg-slate-800 rounded-2xl p-2 border border-slate-700 focus-within:border-blue-500/50 transition-colors">
              <button 
                onClick={() => {
                  const url = prompt("Gib die URL eines Bildes ein (z.B. https://example.com/image.jpg):");
                  if (url) setImageUrl(url);
                }}
                className="p-3 text-slate-400 hover:text-blue-400 transition-colors rounded-xl hover:bg-slate-700/50"
                title="Bild-URL anhängen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </button>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Schreibe deinen Prompt... (Shift+Enter für neue Zeile)"
                className="flex-1 bg-transparent text-white p-2 max-h-32 focus:outline-none resize-none custom-scrollbar"
                rows={1}
              />
              <button 
                onClick={handleGenerate}
                disabled={loading || (!input.trim() && !imageUrl)}
                className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors disabled:opacity-50 shadow-lg shadow-blue-500/20"
              >
                <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Rechte Spalte: Einstellungen */}
        <div className="w-80 glass-card border border-slate-700/50 rounded-3xl p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar bg-slate-900/80">
          <h3 className="font-bold text-slate-200 uppercase tracking-wider text-xs border-b border-slate-700/50 pb-2">Kontrollzentrum</h3>
          
          {/* Modell */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">KI-Modell</label>
            <select 
              value={model} 
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 custom-scrollbar"
            >
              <optgroup label="OpenAI (ChatGPT)">
                <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="openai/gpt-4o-mini">GPT-4o Mini</option>
                <option value="openai/gpt-4o">GPT-4o (Omni)</option>
                <option value="openai/gpt-4-turbo">GPT-4 Turbo</option>
              </optgroup>
              <optgroup label="Anthropic (Claude)">
                <option value="anthropic/claude-3-haiku">Claude 3 Haiku</option>
                <option value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet</option>
                <option value="anthropic/claude-3-opus">Claude 3 Opus</option>
              </optgroup>
              <optgroup label="Google">
                <option value="google/gemma-2-9b-it:free">Gemma 2 (9B) - Free</option>
                <option value="google/gemini-flash-1.5">Gemini 1.5 Flash</option>
                <option value="google/gemini-pro-1.5">Gemini 1.5 Pro</option>
              </optgroup>
              <optgroup label="Meta (Llama)">
                <option value="meta-llama/llama-3-8b-instruct:free">Llama 3 (8B) - Free</option>
                <option value="meta-llama/llama-3-70b-instruct">Llama 3 (70B)</option>
              </optgroup>
              <optgroup label="Mistral & Open Source">
                <option value="mistralai/mistral-7b-instruct:free">Mistral 7B - Free</option>
                <option value="mistralai/mixtral-8x22b-instruct">Mixtral 8x22B</option>
                <option value="cohere/command-r-plus">Cohere Command R+</option>
                <option value="databricks/dbrx-instruct">Databricks DBRX</option>
                <option value="qwen/qwen-2-72b-instruct">Qwen 2 (72B)</option>
                <option value="microsoft/wizardlm-2-8x22b">WizardLM-2</option>
                <option value="nousresearch/nous-hermes-2-mixtral-8x7b-dpo">Nous Hermes 2</option>
              </optgroup>
              <optgroup label="🎨 Bild Generatoren">
                <option value="image/flux">Flux.1 (High Quality)</option>
                <option value="image/sdxl">Stable Diffusion XL</option>
                <option value="image/dall-e-3">DALL-E 3</option>
                <option value="image/midjourney-v6">Midjourney v6 (API)</option>
                <option value="image/leonardo-phoenix">Leonardo Phoenix</option>
              </optgroup>
              <optgroup label="🎬 Video Generatoren">
                <option value="video/runway-gen3">Runway Gen-3 Alpha</option>
                <option value="video/sora">OpenAI Sora</option>
                <option value="video/kling">Kling AI</option>
                <option value="video/luma-dream-machine">Luma Dream Machine</option>
              </optgroup>
              <optgroup label="🎵 Audio & Voice">
                <option value="audio/suno-v3">Suno v3 (Musik)</option>
                <option value="audio/udio">Udio (Musik)</option>
                <option value="audio/elevenlabs">ElevenLabs (Voice)</option>
                <option value="audio/playht">PlayHT (Voice)</option>
              </optgroup>
            </select>
          </div>

          {/* Persona */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">Experten Persona</label>
            <div className="space-y-2">
              {PERSONAS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPersona(p)}
                  className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-all ${persona.id === p.id ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2 italic bg-slate-950/50 p-2 rounded border border-slate-800">{persona.prompt}</p>
          </div>

          {/* Slider: Temperatur */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold text-slate-400">Kreativität (Temperatur)</label>
              <span className="text-xs font-bold text-blue-400">{temperature}</span>
            </div>
            <input 
              type="range" 
              min="0" max="2" step="0.1" 
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Präzise (0.0)</span>
              <span>Kreativ (2.0)</span>
            </div>
          </div>

          {/* Slider: Max Tokens */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold text-slate-400">Länge (Max Tokens)</label>
              <span className="text-xs font-bold text-blue-400">{maxTokens}</span>
            </div>
            <input 
              type="range" 
              min="100" max="4000" step="100" 
              value={maxTokens}
              onChange={(e) => setMaxTokens(e.target.value)}
              className="w-full accent-blue-500"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
