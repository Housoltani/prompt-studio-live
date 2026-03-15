import React, { useState, useEffect } from 'react';
import { Bot, Search, PenTool, Shield, MessageSquare, Power, Activity, Settings, Database, Webhook } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';
import AgentConfigModal from './AgentConfigModal';
import ArchitectWorkspace from './ArchitectWorkspace';
import ScoutWorkspace from './ScoutWorkspace';
import AgentArchive from './AgentArchive';
import AgentIntegrations from './AgentIntegrations';
import DiplomatWorkspace from './DiplomatWorkspace';
import GuardianWorkspace from './GuardianWorkspace';

const agents = [
  {
    id: 'scout',
    name: 'Der Späher',
    role: 'Trend-Scout',
    icon: Search,
    description: 'Scannt Nischen-Trends und liefert wöchentlich virale Formate und Skripte.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    id: 'architect',
    name: 'Der Schöpfer',
    role: 'Content-Architekt',
    icon: PenTool,
    description: 'Verwandelt rohe Ideen, Videos oder Links in 10 fertige Instagram-Posts.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    id: 'diplomat',
    name: 'Der Diplomat',
    role: 'DM-Closer',
    icon: MessageSquare,
    description: 'Führt authentische Verkaufsgespräche in den DMs und wandelt Follower in Kunden um.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    id: 'guardian',
    name: 'Der Wächter',
    role: 'Community-Schild',
    icon: Shield,
    description: 'Blockiert Toxizität und Spam-Bots sofort und interagiert mit treuen Fans.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  }
];

export default function CommandCenter() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAgents, setActiveAgents] = useState({
    scout: false,
    architect: false,
    diplomat: false,
    guardian: false
  });
  
  // Modals & Workspaces State
  const [selectedAgentForConfig, setSelectedAgentForConfig] = useState(null);
  const [showArchitectWorkspace, setShowArchitectWorkspace] = useState(false);
  const [showScoutWorkspace, setShowScoutWorkspace] = useState(false);
  const [showDiplomatWorkspace, setShowDiplomatWorkspace] = useState(false);
  const [showGuardianWorkspace, setShowGuardianWorkspace] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  
  // Synergy State
  const [architectInitialPrompt, setArchitectInitialPrompt] = useState('');

  useEffect(() => {
    fetchSessionAndConfig();
  }, []);

  const fetchSessionAndConfig = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await loadAgentConfig(session.user.id);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Session Error:', error);
      setIsLoading(false);
    }
  };

  const loadAgentConfig = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('agent_configurations')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Fehler beim Laden der Konfiguration:', error);
      } else if (data) {
        setActiveAgents({
          scout: data.scout_active || false,
          architect: data.architect_active || false,
          diplomat: data.diplomat_active || false,
          guardian: data.guardian_active || false
        });
      }
    } catch (error) {
      console.error('Ladefehler:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAgent = async (id) => {
    if (!user) {
      toast.error('Bitte logge dich ein, um Agenten zu rekrutieren.', {
        style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' }
      });
      return;
    }
    
    const newState = { ...activeAgents, [id]: !activeAgents[id] };
    setActiveAgents(newState);
    
    const dbUpdates = {
      user_id: user.id,
      scout_active: newState.scout,
      architect_active: newState.architect,
      diplomat_active: newState.diplomat,
      guardian_active: newState.guardian,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('agent_configurations')
      .upsert(dbUpdates, { onConflict: 'user_id' });

    if (error) {
      console.error('Fehler beim Speichern:', error);
      toast.error('Verbindung zur Datenbank fehlgeschlagen. Rollback eingeleitet.', {
        style: { background: '#7f1d1d', color: '#fff' }
      });
      setActiveAgents(activeAgents);
    } else {
      const statusText = newState[id] ? 'wurde rekrutiert und ist nun aktiv' : 'wurde deaktiviert';
      const agentName = agents.find(a => a.id === id)?.name || id;
      toast.success(`${agentName} ${statusText}.`, {
        icon: newState[id] ? '🟢' : '⚪',
        style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' }
      });
    }
  };

  const handleSynergyHandover = (trendResult) => {
    setShowScoutWorkspace(false);
    setArchitectInitialPrompt(`Erstelle Postings basierend auf diesen Trends:\n${trendResult}`);
    setShowArchitectWorkspace(true);
    toast.success('Synergie aktiviert: Datenstrom an den Schöpfer übergeben.', {
      icon: '⚡',
      style: { background: '#1f2937', color: '#fff', border: '1px solid #8b5cf6' }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          <p className="text-gray-400">Verbindung zur Zentrale wird hergestellt...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-gray-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Activity className="text-blue-500" />
              Smart Social Suite
            </h1>
            <p className="text-gray-400 mt-2">Rekrutiere deine autonome Instagram-Crew und beherrsche deine Nische.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {user && (
              <>
                <button 
                  onClick={() => setShowIntegrations(true)}
                  className="flex items-center gap-2 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/40 border border-indigo-500/50 px-4 py-2 rounded-lg transition-colors font-bold shadow-lg shadow-indigo-500/10"
                >
                  <Webhook size={16} />
                  Integrationen
                </button>
                <button 
                  onClick={() => setShowArchive(true)}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2 rounded-lg transition-colors font-medium text-gray-300"
                >
                  <Database size={16} />
                  Das Archiv
                </button>
              </>
            )}
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${user ? 'bg-emerald-400' : 'bg-red-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${user ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              </span>
              <span className="text-sm font-medium text-gray-300">
                {user ? 'Signal empfangen (Online)' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Agent Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => {
            const isActive = activeAgents[agent.id];
            const Icon = agent.icon;
            
            return (
              <div 
                key={agent.id} 
                className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                  isActive ? 'border-gray-600 bg-gray-800/80 shadow-lg shadow-black/50' : 'border-gray-800 bg-gray-900/50 opacity-75 hover:opacity-100'
                } p-6 flex flex-col`}
              >
                {/* Config Button (appears on hover) */}
                {isActive && (
                  <button 
                    onClick={() => setSelectedAgentForConfig(agent)}
                    className="absolute top-3 left-3 p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors opacity-0 group-hover:opacity-100 shadow-md border border-gray-700"
                    title="Mission Briefing (Konfigurieren)"
                  >
                    <Settings size={18} />
                  </button>
                )}

                {/* Status Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className={`text-xs font-semibold ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
                    {isActive ? 'AKTIV' : 'STANDBY'}
                  </span>
                </div>

                <div className={`w-12 h-12 mx-auto rounded-lg ${agent.bg} ${agent.color} flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-100 text-center">{agent.name}</h3>
                <p className={`text-sm font-medium ${agent.color} mb-3 text-center`}>{agent.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow text-center">
                  {agent.description}
                </p>

                <button 
                  onClick={() => toggleAgent(agent.id)}
                  className={`mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-colors ${
                    isActive 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  <Power size={16} />
                  {isActive ? 'Deaktivieren' : 'Rekrutieren'}
                </button>

                {isActive && agent.id === 'scout' && (
                  <button 
                    onClick={() => setShowScoutWorkspace(true)}
                    className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 border border-blue-500/50 transition-colors shadow-lg shadow-blue-500/10 text-sm animate-pulse-slow"
                  >
                    <Search size={16} />
                    Zur Radar-Station
                  </button>
                )}
                
                {isActive && agent.id === 'architect' && (
                  <button 
                    onClick={() => setShowArchitectWorkspace(true)}
                    className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold bg-purple-600/20 text-purple-400 hover:bg-purple-600/40 border border-purple-500/50 transition-colors shadow-lg shadow-purple-500/10 text-sm animate-pulse-slow"
                  >
                    <PenTool size={16} />
                    Zum Arbeitsplatz
                  </button>
                )}

                {isActive && agent.id === 'diplomat' && (
                  <button 
                    onClick={() => setShowDiplomatWorkspace(true)}
                    className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/40 border border-emerald-500/50 transition-colors shadow-lg shadow-emerald-500/10 text-sm animate-pulse-slow"
                  >
                    <MessageSquare size={16} />
                    Zum Trainingszentrum
                  </button>
                )}
                
                {isActive && agent.id === 'guardian' && (
                  <button 
                    onClick={() => setShowGuardianWorkspace(true)}
                    className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold bg-orange-600/20 text-orange-400 hover:bg-orange-600/40 border border-orange-500/50 transition-colors shadow-lg shadow-orange-500/10 text-sm animate-pulse-slow"
                  >
                    <Shield size={16} />
                    Schild aktivieren
                  </button>
                )}

                {isActive && (
                  <button 
                    onClick={() => setSelectedAgentForConfig(agent)}
                    className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors text-sm"
                  >
                    <Settings size={14} />
                    Briefing anpassen
                  </button>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Mission Control Panel */}
        <div className="mt-12 bg-gray-800/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Bot className="text-gray-400" />
            Einsatzprotokoll
          </h2>
          {user ? (
            <div className="space-y-3">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 flex items-center justify-between">
                <p className="text-sm text-gray-300">
                  <span className="text-emerald-400 font-semibold">[System]</span> Smart Social Suite initialisiert und mit Supabase-Archiv synchronisiert.
                </p>
                <span className="text-xs text-gray-500">Gerade eben</span>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 flex items-center justify-between">
                <p className="text-sm text-gray-300">
                  <span className="text-blue-400 font-semibold">[Direktive]</span> Wähle einen aktiven Agenten und erstelle sein Mission Briefing (Einstellungen), um die globale KI-Ausrichtung festzulegen.
                </p>
                <span className="text-xs text-gray-500">Gerade eben</span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 text-center">
              <p className="text-gray-400 mb-4">Du musst dich am System authentifizieren, um die Logbücher einzusehen und Agenten zu rekrutieren.</p>
            </div>
          )}
        </div>

      </div>

      {showArchive && (
        <AgentArchive 
          user={user} 
          onClose={() => setShowArchive(false)} 
        />
      )}

      {showIntegrations && (
        <AgentIntegrations 
          user={user} 
          onClose={() => setShowIntegrations(false)} 
        />
      )}

      {showScoutWorkspace && (
        <ScoutWorkspace 
          user={user} 
          onClose={() => setShowScoutWorkspace(false)} 
          onHandover={handleSynergyHandover}
        />
      )}

      {showArchitectWorkspace && (
        <ArchitectWorkspace 
          user={user} 
          initialPrompt={architectInitialPrompt}
          onClose={() => {
            setShowArchitectWorkspace(false);
            setArchitectInitialPrompt(''); // Reset
          }} 
        />
      )}

      {showDiplomatWorkspace && (
        <DiplomatWorkspace 
          user={user} 
          onClose={() => setShowDiplomatWorkspace(false)} 
        />
      )}
      
      {showGuardianWorkspace && (
        <GuardianWorkspace 
          user={user} 
          onClose={() => setShowGuardianWorkspace(false)} 
        />
      )}
      
      {selectedAgentForConfig && (
        <AgentConfigModal 
          agent={selectedAgentForConfig}
          user={user}
          onClose={() => setSelectedAgentForConfig(null)}
          onSaved={() => console.log('Config saved')}
        />
      )}
    </div>
  );
}
