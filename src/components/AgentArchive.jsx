import React, { useState, useEffect } from 'react';
import { X, Database, Trash2, Copy, CheckCircle2, Loader2, Bot } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';

export default function AgentArchive({ user, onClose }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (user) fetchArchive();
  }, [user]);

  const fetchArchive = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch {
      
      toast.error('Fehler beim Laden des Archivs.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      const { error } = await supabase.from('generated_content').delete().eq('id', id);
      if (error) throw error;
      setItems(items.filter(item => item.id !== id));
      toast.success('Eintrag vernichtet.', { icon: '🔥', style: { background: '#1f2937', color: '#fff' } });
    } catch {
      toast.error('Löschen fehlgeschlagen.');
    }
  };

  const copyContent = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Kopiert!', { style: { background: '#1f2937', color: '#fff' } });
  };

  const formatAgentName = (agentId) => {
    if (agentId === 'architect') return 'Der Schöpfer';
    if (agentId === 'scout') return 'Der Späher';
    if (agentId === 'diplomat') return 'Der Diplomat';
    return agentId;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl h-[85vh] flex flex-col bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex-none p-6 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-800 text-gray-300 flex items-center justify-center border border-gray-700 shadow-inner">
              <Database size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                Das Archiv <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full border border-gray-700">Tresorraum</span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">Alle gesicherten Berichte und Kreationen deiner KI-Crew.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#0a0c10] custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
              <Loader2 size={40} className="animate-spin text-gray-600" />
              <p>Entschlüssele Archivdaten...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
              <Database size={64} className="opacity-20 mb-2" />
              <p className="text-lg">Das Archiv ist leer.</p>
              <p className="text-sm">Sichere die Arbeit deiner Agenten, um sie hier zu lagern.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
                  {/* Card Header */}
                  <div className="bg-gray-800/50 px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1.5 ${
                        item.agent_id === 'architect' ? 'bg-purple-900/40 text-purple-400 border border-purple-500/30' : 
                        item.agent_id === 'scout' ? 'bg-blue-900/40 text-blue-400 border border-blue-500/30' : 
                        'bg-gray-800 text-gray-400'
                      }`}>
                        <Bot size={12} /> {formatAgentName(item.agent_id)}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">
                        {new Date(item.created_at).toLocaleString('de-DE')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => copyContent(item.content_result, item.id)}
                        className="p-1.5 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                        title="Kopieren"
                      >
                        {copiedId === item.id ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      </button>
                      <button 
                        onClick={() => deleteItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-400 bg-gray-800 hover:bg-red-900/20 rounded-md transition-colors"
                        title="Vernichten"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  {/* Card Body */}
                  <div className="p-4 flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/4 border-r border-gray-800 pr-4">
                      <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">Ursprüngliches Signal (Prompt)</p>
                      <p className="text-sm text-gray-300 bg-gray-800/30 p-3 rounded-lg border border-gray-800/50 italic">
                        "{item.prompt}"
                      </p>
                    </div>
                    <div className="w-full md:w-3/4">
                      <p className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wider">Ergebnis / Datenstrom</p>
                      <div className="prose prose-sm prose-invert max-w-none max-h-64 overflow-y-auto custom-scrollbar pr-2">
                        {item.content_result.split('\n').map((line, i) => (
                          <p key={i} className="mb-1 text-gray-300">
                            {line.startsWith('###') ? <span className="font-bold text-white block mt-3 mb-1">{line.replace('###', '')}</span> : 
                             line.startsWith('**') ? <span className="font-semibold text-gray-200">{line.replace(/\*\*/g, '')}</span> : line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
