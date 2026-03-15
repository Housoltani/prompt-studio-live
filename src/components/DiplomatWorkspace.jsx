import React, { useState, useEffect, useRef } from 'react';
import { X, MessageSquare, RefreshCw, Send, CheckCircle2, Save, Loader2, User } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';

export default function DiplomatWorkspace({ user, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [config, setConfig] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      loadConfig();
      setMessages([
        {
          role: 'assistant',
          content: 'Simulator initialisiert. Ich bin Der Diplomat. Du spielst jetzt einen skeptischen Follower oder Lead. Schreibe mir eine DM (z.B. "Ich will mehr über dein Angebot wissen", "Was kostet das?", "Ist das nur Betrug?"). Lass uns meine Verkaufsfähigkeiten in deiner Nische trainieren.'
        }
      ]);
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConfig = async () => {
    try {
      const { data } = await supabase
        .from('agent_configurations')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (data) setConfig(data);
    } catch (err) {
      console.error(err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey || apiKey === 'dein_echter_openrouter_key') {
      toast.error('Kein API-Schlüssel für OpenRouter gefunden.', { style: { background: '#7f1d1d', color: '#fff' } });
      return;
    }

    const newUserMsg = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, newUserMsg]);
    setInputMessage('');
    setIsTyping(true);

    const niche = config?.brand_niche || 'Allgemein';
    const tone = config?.brand_tone || 'Professional';
    
    const systemPrompt = `Du bist "Der Diplomat", ein hochintelligenter KI-Verkäufer und Community-Manager in Instagram DMs.
    Deine Nische: "${niche}".
    Deine Markenstimme (Tone of Voice): "${tone}".
    
    Dein Ziel: Du führst einen Chat mit einem Follower (der Nutzer spielt diesen). Du sollst:
    1. Authentisch und menschlich wirken.
    2. Seine Zweifel ausräumen.
    3. Ihn subtil zu einer Handlung bringen (Lead-Generierung, Terminbuchung oder Verkauf).
    
    Antworte kurz, knackig und wie in einem echten Instagram-Chat. Nutze gelegentlich Emojis. Lass dich nicht aus der Rolle bringen.`;

    try {
      // API Formatierung: Bereite die bisherigen Nachrichten auf
      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: newUserMsg.content }
      ];

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Prompt Studio Live (Diplomat Simulator)'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini', // Schneller für Chats
          messages: apiMessages
        })
      });

      if (!response.ok) throw new Error('API Fehler');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (err) {
      console.error(err);
      toast.error('Der Diplomat hat die Verbindung verloren.');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-2xl h-[85vh] flex flex-col bg-gray-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex-none p-4 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <MessageSquare size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Der Diplomat <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">Trainingszentrum (DM Simulator)</span>
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                Rolle: Sales Closer | Nische: [{config?.brand_niche || 'Nicht definiert'}]
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#0a0c10] custom-scrollbar space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 flex gap-3 ${
                msg.role === 'user' 
                  ? 'bg-blue-600/20 border border-blue-500/30 text-white rounded-tr-sm' 
                  : 'bg-emerald-900/20 border border-emerald-500/20 text-gray-200 rounded-tl-sm'
              }`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={14} className="text-emerald-400" />
                  </div>
                )}
                <div className="text-sm leading-relaxed prose prose-sm prose-invert">
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i} className="m-0">{line}</p>
                  ))}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-blue-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl rounded-tl-sm p-4 flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Antworte dem Diplomaten..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
            <button
              type="submit"
              disabled={isTyping || !inputMessage.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:opacity-50 text-white p-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/20 disabled:shadow-none flex items-center justify-center"
            >
              <Send size={20} />
            </button>
          </form>
          <p className="text-center text-xs text-gray-500 mt-2">Das ist ein Simulator. Nachrichten werden nicht an echte Nutzer gesendet.</p>
        </div>

      </div>
    </div>
  );
}
