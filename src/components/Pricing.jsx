import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Layers, Shield, Check, ShoppingCart, Plus, Sparkles, Video, Code, Palette, Briefcase } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('passes'); // 'passes', 'alacarte', 'sparks'
  const [isYearly, setIsYearly] = useState(true);
  const [selectedModules, setSelectedModules] = useState([]);

  const modules = [
    { id: 'cinema', name: 'Cinema Studio Pro', price: 4, icon: <Video className="w-5 h-5" />, color: 'cyan' },
    { id: 'social', name: 'Social Media Engine', price: 3, icon: <Sparkles className="w-5 h-5" />, color: 'pink' },
    { id: 'agency', name: 'AI Agency Blueprint', price: 7, icon: <Briefcase className="w-5 h-5" />, color: 'amber' },
    { id: 'dev', name: 'Dev Architect', price: 6, icon: <Code className="w-5 h-5" />, color: 'blue' },
    { id: 'assets', name: 'Asset Lab', price: 3, icon: <Palette className="w-5 h-5" />, color: 'purple' },
  ];

  const toggleModule = (id) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const calculateAlacarteTotal = () => {
    return selectedModules.reduce((total, id) => {
      const mod = modules.find(m => m.id === id);
      return total + (mod ? mod.price : 0);
    }, 0);
  };

  const handleCheckout = (planName) => {
    toast.success(`Sichere Verbindung zum Zahlungs-Gateway für ${planName}...`, { icon: '🔒', style: { background: '#1e293b', color: '#fff' } });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 pb-24 font-sans selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
          >
            Das Ultimative Arsenal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Wähle deine Strategie: Bezahle nur pro Einsatz, stelle dir deine eigene Ausrüstung zusammen oder kommandiere die gesamte Plattform.
          </motion.p>
        </div>

        {/* Tactical Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900/80 p-1.5 rounded-2xl border border-gray-800 flex flex-wrap md:flex-nowrap gap-2 shadow-2xl backdrop-blur-xl">
            <button 
              onClick={() => setActiveTab('passes')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'passes' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            >
              <Shield className="w-5 h-5" />
              Spezialeinheiten (Pässe)
            </button>
            <button 
              onClick={() => setActiveTab('alacarte')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'alacarte' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            >
              <Layers className="w-5 h-5" />
              A-la-Carte (Modular)
            </button>
            <button 
              onClick={() => setActiveTab('sparks')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'sparks' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            >
              <Zap className="w-5 h-5" />
              Energon (Pay-per-Use)
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: PASSES */}
          {activeTab === 'passes' && (
            <motion.div 
              key="passes"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="flex justify-center mb-8">
                <div className="bg-gray-900 p-1 rounded-full border border-gray-800 flex">
                  <button onClick={() => setIsYearly(false)} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!isYearly ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}>Monatlich</button>
                  <button onClick={() => setIsYearly(true)} className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isYearly ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}>Jährlich <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full">-20%</span></button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {/* Creator Pass */}
                <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
                  <h3 className="text-2xl font-bold text-white mb-2">Creator Pass</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10">Perfekt für Content Creator, Filmemacher und Social Media Manager.</p>
                  <div className="mb-6">
                    <span className="text-4xl font-black">${isYearly ? '12' : '15'}</span>
                    <span className="text-gray-500"> / Monat</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-pink-500" /> Alle Kreativ-Studios unbegrenzt (Cinema, Social, Voice)</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-pink-500" /> 500 Sparks ⚡ pro Monat gratis</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-pink-500" /> Zugang zum Marktplatz (Kaufen/Verkaufen)</li>
                  </ul>
                  <button onClick={() => handleCheckout('Creator Pass')} className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold transition-all border border-gray-700">Creator Pass wählen</button>
                </div>

                {/* Architect Pass */}
                <div className="bg-gradient-to-b from-blue-900/20 to-gray-900/50 border border-blue-500/30 p-8 rounded-3xl relative overflow-hidden flex flex-col transform md:-translate-y-4 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                  <div className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full w-max mb-4 border border-blue-500/30">Beliebteste Taktik</div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">Architect Pass</h3>
                  <p className="text-blue-200/60 text-sm mb-6 h-10">Für Agenturinhaber, Developer und System-Architekten.</p>
                  <div className="mb-6">
                    <span className="text-4xl font-black">${isYearly ? '29' : '39'}</span>
                    <span className="text-gray-500"> / Monat</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> Alle Business-Module (FlowBuilder, Dev Architect)</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> Voller Zugriff auf den Agency Blueprint</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> 1.500 Sparks ⚡ pro Monat gratis</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-blue-400" /> Priority API-Nexus Routing</li>
                  </ul>
                  <button onClick={() => handleCheckout('Architect Pass')} className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25">Architect Pass wählen</button>
                </div>

                {/* Prime Pass */}
                <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                  <h3 className="text-2xl font-bold text-white mb-2">Prime Pass</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10">Der Matrix-Schlüssel. Alles freigeschaltet. Keine Limits.</p>
                  <div className="mb-6">
                    <span className="text-4xl font-black">${isYearly ? '49' : '59'}</span>
                    <span className="text-gray-500"> / Monat</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-purple-500" /> <span className="font-bold text-white">Vollzugriff auf alle 30+ Module</span></li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-purple-500" /> 5.000 Sparks ⚡ pro Monat gratis</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-purple-500" /> Eigener Sub-Agent im Hub</li>
                  </ul>
                  <button onClick={() => handleCheckout('Prime Pass')} className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold transition-all border border-gray-700">Prime Pass wählen</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: A LA CARTE */}
          {activeTab === 'alacarte' && (
            <motion.div 
              key="alacarte"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl mb-6">
                  <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2"><Layers className="w-5 h-5" /> Dein Modul-Arsenal</h2>
                  <p className="text-sm text-gray-400 mt-2">Warum für das ganze Schiff bezahlen, wenn du nur die Laserkanonen brauchst? Schalte Module einzeln und dauerhaft für deinen Account frei.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modules.map(mod => (
                    <div 
                      key={mod.id} 
                      onClick={() => toggleModule(mod.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${selectedModules.includes(mod.id) ? `bg-${mod.color}-900/20 border-${mod.color}-500 shadow-[0_0_15px_rgba(var(--${mod.color}-500),0.2)]` : 'bg-gray-900 border-gray-800 hover:border-gray-700'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${selectedModules.includes(mod.id) ? `bg-${mod.color}-500/20 text-${mod.color}-400` : 'bg-gray-800 text-gray-400'}`}>
                          {mod.icon}
                        </div>
                        <div>
                          <div className={`font-bold ${selectedModules.includes(mod.id) ? 'text-white' : 'text-gray-300'}`}>{mod.name}</div>
                          <div className="text-xs text-gray-500">Unbegrenzter Zugriff</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg text-white">${mod.price}</span>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${selectedModules.includes(mod.id) ? 'bg-cyan-500 border-cyan-400 text-white' : 'border-gray-600 text-transparent'}`}>
                          <Check className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* A-La-Carte Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl sticky top-24">
                  <h3 className="text-xl font-bold mb-6 border-b border-gray-800 pb-4">Dein Arsenal</h3>
                  
                  {selectedModules.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 flex flex-col items-center gap-2">
                      <Plus className="w-8 h-8 opacity-20" />
                      <p className="text-sm">Wähle Module aus der Liste, um dein Arsenal zu füllen.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 mb-8">
                      {selectedModules.map(id => {
                        const m = modules.find(x => x.id === id);
                        return (
                          <div key={id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-300 flex items-center gap-2">{m.icon} {m.name}</span>
                            <span className="text-white font-mono">${m.price}/m</span>
                          </div>
                        );
                      })}
                      <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                        <span className="text-gray-400">Plattform-Basis</span>
                        <span className="text-green-400 font-bold">Kostenlos</span>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-800 pt-6 mb-6">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-gray-400 font-bold">Total (Monatlich)</span>
                      <span className="text-3xl font-black text-cyan-400">${calculateAlacarteTotal()}</span>
                    </div>
                  </div>

                  <button 
                    disabled={selectedModules.length === 0}
                    onClick={() => handleCheckout('Custom Arsenal')}
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Arsenal aktivieren
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SPARKS (PAY PER USE) */}
          {activeTab === 'sparks' && (
            <motion.div 
              key="sparks"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="text-center max-w-2xl mx-auto mb-12 bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl">
                <Zap className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-amber-400 mb-2">Die absolute Freiheit</h2>
                <p className="text-gray-300 text-sm">Kein Abo. Keine versteckten Kosten. Du behältst Zugriff auf <span className="text-white font-bold">alle 30+ Module</span>. Jedes Mal, wenn du den KI-Zündschlüssel drückst oder ein komplexes Tool nutzt, wird eine minimale Menge Energon (Sparks ⚡) abgezogen. Lade nur auf, was du verbrauchst.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900 border border-gray-800 hover:border-amber-500/50 p-6 rounded-3xl transition-all cursor-pointer group text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8 text-gray-400 group-hover:text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Scout Pack</h3>
                  <div className="text-2xl font-black text-amber-500 mb-4">500 ⚡</div>
                  <div className="text-3xl font-bold text-white mb-6">$5</div>
                  <button onClick={() => handleCheckout('500 Sparks')} className="w-full py-3 bg-gray-800 group-hover:bg-amber-500 group-hover:text-black text-white rounded-xl font-bold transition-all">Aufladen</button>
                </div>

                <div className="bg-gray-900 border border-amber-500/50 p-6 rounded-3xl transition-all cursor-pointer group text-center relative shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Warrior Pack</h3>
                  <div className="text-2xl font-black text-amber-500 mb-4">2.500 ⚡</div>
                  <div className="text-3xl font-bold text-white mb-6">$19 <span className="text-sm text-green-400 font-normal">+10% Bonus</span></div>
                  <button onClick={() => handleCheckout('2500 Sparks')} className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-500/25">Aufladen</button>
                </div>

                <div className="bg-gray-900 border border-gray-800 hover:border-amber-500/50 p-6 rounded-3xl transition-all cursor-pointer group text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8 text-orange-400 group-hover:text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Matrix Pack</h3>
                  <div className="text-2xl font-black text-amber-500 mb-4">10.000 ⚡</div>
                  <div className="text-3xl font-bold text-white mb-6">$49 <span className="text-sm text-green-400 font-normal">+25% Bonus</span></div>
                  <button onClick={() => handleCheckout('10000 Sparks')} className="w-full py-3 bg-gray-800 group-hover:bg-amber-500 group-hover:text-black text-white rounded-xl font-bold transition-all">Aufladen</button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
