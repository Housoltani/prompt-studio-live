import React, { useState, useEffect } from 'react';
import { X, Webhook, Link as LinkIcon, AlertCircle, Copy, CheckCircle2, Globe, Cpu, Zap, Activity, Video } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AgentIntegrations({ user, onClose }) {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('make'); // 'make', 'zapier', 'native', 'tiktok'

  useEffect(() => {
    if (user) {
      const baseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://prompt-studio-live.api';
      setWebhookUrl(`${baseUrl}/functions/v1/incoming-webhook?uid=${user.id}`);
    }
  }, [user]);

  const copyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Webhook-Brücke kopiert!', { style: { background: '#1f2937', color: '#fff' } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[85vh] flex flex-col bg-gray-900 border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex-none p-6 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shadow-inner">
              <Webhook size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                Einsatz-Integrationen <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">Beta-Uplink</span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">Verbinde die Smart Social Suite mit deinem echten Social Media Account.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#0a0c10]">
          
          {/* Sidebar / Tabs */}
          <div className="w-full md:w-1/4 bg-gray-900/50 border-r border-gray-800 p-4 flex flex-col gap-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-3">Verbindungsprotokolle</h3>
            
            <button 
              onClick={() => setActiveTab('make')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                activeTab === 'make' 
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/50 shadow-md shadow-purple-500/10' 
                  : 'text-gray-400 hover:bg-gray-800 border border-transparent hover:border-gray-700'
              }`}
            >
              <Cpu size={18} /> Make.com (Empfohlen)
            </button>
            
            <button 
              onClick={() => setActiveTab('zapier')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                activeTab === 'zapier' 
                  ? 'bg-orange-600/20 text-orange-400 border border-orange-500/50 shadow-md shadow-orange-500/10' 
                  : 'text-gray-400 hover:bg-gray-800 border border-transparent hover:border-gray-700'
              }`}
            >
              <Zap size={18} /> Zapier
            </button>
            
            <button 
              onClick={() => setActiveTab('tiktok')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                activeTab === 'tiktok' 
                  ? 'bg-pink-600/20 text-pink-400 border border-pink-500/50 shadow-md shadow-pink-500/10' 
                  : 'text-gray-400 hover:bg-gray-800 border border-transparent hover:border-gray-700'
              }`}
            >
              <Video size={18} /> TikTok Integration
            </button>

            <button 
              onClick={() => setActiveTab('native')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                activeTab === 'native' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50 shadow-md shadow-blue-500/10' 
                  : 'text-gray-400 hover:bg-gray-800 border border-transparent hover:border-gray-700'
              }`}
            >
              <Globe size={18} /> Native Meta API
            </button>
          </div>

          {/* Main Panel */}
          <div className="w-full md:w-3/4 p-8 overflow-y-auto custom-scrollbar">
            
            {activeTab === 'make' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Automatisierung via Make.com</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                      Nutze Make.com, um eingehende Instagram-Nachrichten direkt an unsere KI weiterzuleiten. Wir verarbeiten die KI-Logik und senden die perfekte Antwort an Make zurück.
                    </p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                    <Cpu size={32} className="text-purple-400" />
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                  
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <LinkIcon size={16} className="text-indigo-400" /> Dein persönlicher Uplink (Webhook URL)
                  </h4>
                  <p className="text-xs text-gray-500 mb-4">
                    Kopiere diesen Link und füge ihn im "HTTP - Make a request" Modul in Make.com ein.
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <code className="flex-1 bg-black/50 border border-gray-700 rounded-lg p-3 text-sm text-indigo-300 font-mono overflow-x-auto whitespace-nowrap">
                      {webhookUrl}
                    </code>
                    <button 
                      onClick={copyWebhook}
                      className="flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
                    >
                      {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                      {copied ? 'Kopiert!' : 'Kopieren'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'zapier' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                 <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Automatisierung via Zapier</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                      Nutze Zapier "Webhooks by Zapier", um dein Instagram-Konto mit unserer KI-Armee zu verknüpfen.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                    <Zap size={32} className="text-orange-400" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'native' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                 <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Native Meta Graph API</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                      Der offizielle, direkte Weg ohne Drittanbieter.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <Globe size={32} className="text-blue-400" />
                  </div>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center mt-8">
                  <h4 className="text-lg font-bold text-white mb-2">Meta App Review ausstehend</h4>
                  <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
                    Wir haben die native Instagram-Brücke gebaut. Aktuell befindet sich unsere App im "App Review" von Meta.
                  </p>
                  <button disabled className="px-6 py-3 bg-blue-600/30 text-blue-300 font-bold rounded-xl cursor-not-allowed border border-blue-500/20 flex items-center gap-2">
                    <Globe size={18} /> Mit Facebook verbinden (Bald verfügbar)
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'tiktok' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                 <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">TikTok Auto-Responder</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                      Verbinde deine KI-Crew mit deinem TikTok-Profil. Der Wächter kann Kommentare moderieren und der Diplomat antwortet DMs auf TikTok.
                    </p>
                  </div>
                  <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
                    <Video size={32} className="text-pink-400" />
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 relative overflow-hidden mt-6">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <LinkIcon size={16} className="text-pink-400" /> TikTok Webhook Payload
                  </h4>
                  <p className="text-xs text-gray-500 mb-4">
                    Kopiere diesen Link und füge ihn in deinem Make.com TikTok-Modul ("Watch Comments") ein. Das System erkennt die Herkunft der Plattform.
                  </p>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 bg-black/50 border border-gray-700 rounded-lg p-3 text-sm text-pink-300 font-mono overflow-x-auto whitespace-nowrap">
                      {webhookUrl}&platform=tiktok
                    </code>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(webhookUrl + '&platform=tiktok');
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                        toast.success('TikTok-Brücke kopiert!', { style: { background: '#1f2937', color: '#fff' } });
                      }}
                      className="flex items-center gap-2 px-4 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-pink-500/20"
                    >
                      {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                      {copied ? 'Kopiert!' : 'Kopieren'}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
