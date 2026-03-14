import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  const [selectedCredits, setSelectedCredits] = useState('16500');
  const [showCheckout, setShowCheckout] = useState(false);

  const getPrice = () => {
    if (selectedCredits === '16500') return isYearly ? '11' : '19';
    if (selectedCredits === '30000') return isYearly ? '24' : '34';
    if (selectedCredits === 'unlimited') return isYearly ? '49' : '69';
    return '11';
  };

  const getPlanName = () => {
    if (selectedCredits === '16500') return 'Pro Creator';
    if (selectedCredits === '30000') return 'Studio Elite';
    if (selectedCredits === 'unlimited') return 'Overdrive';
    return 'Pro Creator';
  };

  const handleUpgrade = () => {
    setShowCheckout(true);
  };

  const processPayment = (method) => {
    toast.success(`Zahlung via ${method} wird autorisiert...`, { icon: '🔄', duration: 2000 });
    setTimeout(() => {
      toast.success(`Willkommen im ${getPlanName()} Tier!`, { icon: '🚀', duration: 3000 });
      setShowCheckout(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl animate-fade-in mx-auto mt-10 p-4 flex flex-col items-center">
      
      <h1 className="text-4xl md:text-5xl font-black mb-8 text-center text-white tracking-tight">
        Finde deinen perfekten <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">KI Plan</span>
      </h1>

      {/* Model Bar */}
      <div className="flex flex-wrap justify-center gap-6 mb-12 text-slate-400 text-sm font-bold items-center">
        <span className="flex items-center gap-2"><span className="text-white text-lg">⚙️</span> Sora 2</span>
        <span className="flex items-center gap-2"><span className="text-blue-500 text-lg">🌀</span> Veo 3.1</span>
        <span className="flex items-center gap-2"><span className="text-yellow-400 text-lg">🍌</span> Nano Banana</span>
        <span className="flex items-center gap-2"><span className="text-red-400 text-lg">⭕</span> Kling 3.0</span>
        <span className="flex items-center gap-2"><span className="text-purple-400 text-lg">📊</span> Seedream</span>
        <span className="flex items-center gap-2"><span className="text-emerald-400 text-lg">🔺</span> Flux.1</span>
      </div>

      {/* Pricing Card */}
      <div className="glass-card rounded-[2.5rem] p-10 w-full max-w-md border border-slate-700/50 bg-slate-900/80 shadow-2xl relative">
        <h2 className="text-2xl font-bold text-white mb-6">{getPlanName()}</h2>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-6xl font-black text-white">{getPrice()}</span>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-300">99</span>
            <span className="text-slate-500 text-sm">€ / Monat</span>
          </div>
        </div>
        
        <p className="text-slate-500 text-sm mb-6">{isYearly ? 'Jährliche Abrechnung' : 'Monatliche Abrechnung'}</p>

        {/* Toggle */}
        <div className="flex items-center gap-3 mb-8 bg-slate-800 w-max px-4 py-2 rounded-full border border-slate-700">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
            />
            <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
          <span className="text-sm font-bold text-slate-300">Jährlich</span>
          <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full uppercase tracking-wider">Save 40%</span>
        </div>

        {/* Credit Dropdown */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-400 mb-3">Wähle deine monatlichen Sparks ⚡:</label>
          <div className="relative">
            <select 
              value={selectedCredits}
              onChange={(e) => setSelectedCredits(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 text-white rounded-2xl px-4 py-4 appearance-none focus:outline-none focus:border-amber-500 shadow-inner text-lg font-bold"
            >
              <option value="16500">16,500 Sparks</option>
              <option value="30000">30,000 Sparks</option>
              <option value="unlimited">Unendlich (Overdrive)</option>
            </select>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-500 ml-2">
            {selectedCredits === '16500' && '~103 Videos / ~1650 Bilder / ~3 Stunden Audio'}
            {selectedCredits === '30000' && '~200 Videos / ~3000 Bilder / ~6 Stunden Audio'}
            {selectedCredits === 'unlimited' && 'Generiere grenzenlos Premium-Inhalte'}
          </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleUpgrade}
          className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-900 font-black text-lg py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transform hover:-translate-y-1"
        >
          Get Started
        </button>

        {/* Includes */}
        <div className="mt-8 border-t border-slate-700/50 pt-6">
          <button className="flex items-center justify-between w-full text-sm font-bold text-slate-300">
            Plan beinhaltet
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Zugang zu Sora 2 & Kling 3.0</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Kommerzielle Nutzungslizenz</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Keine Werbung</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Priorisierte API Warteschlange</li>
          </ul>
        </div>

      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card rounded-3xl p-8 max-w-sm w-full border border-slate-700 shadow-2xl relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-black text-white">Checkout</h3>
              <p className="text-sm text-slate-400 mt-1">Upgrade auf {getPlanName()}</p>
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 mt-2">
                {getPrice()},99 € <span className="text-sm text-slate-500 font-bold">/ {isYearly ? 'Jahr' : 'Monat'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Zahlungsmethode wählen</p>
              
              <button onClick={() => processPayment('Apple Pay')} className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-3 px-4 rounded-xl hover:bg-slate-200 transition-colors shadow-sm">
                <span className="text-xl"></span> Apple Pay
              </button>

              <button onClick={() => processPayment('Google Pay')} className="w-full flex items-center justify-center gap-3 bg-slate-800 border border-slate-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-slate-700 transition-colors shadow-sm">
                <span className="text-xl">🤖</span> Google Pay
              </button>

              <button onClick={() => processPayment('PayPal')} className="w-full flex items-center justify-center gap-3 bg-[#00457C] hover:bg-[#003666] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm">
                <span className="text-xl font-serif italic text-[#0079C1]">P</span> PayPal
              </button>

              <button onClick={() => processPayment('Kreditkarte')} className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm">
                <span className="text-xl">💳</span> Visa / Mastercard
              </button>

              <button onClick={() => processPayment('Klarna')} className="w-full flex items-center justify-center gap-3 bg-[#FFA8C5] hover:bg-[#ff8fb3] text-black font-bold py-3 px-4 rounded-xl transition-colors shadow-sm">
                <span className="text-xl font-serif">K.</span> Klarna (Pay Later)
              </button>

              <button onClick={() => processPayment('Crypto')} className="w-full flex items-center justify-center gap-3 bg-slate-900 border border-emerald-500/30 hover:border-emerald-500/80 text-emerald-400 font-bold py-3 px-4 rounded-xl transition-colors shadow-sm">
                <span className="text-xl">💎</span> Web3 / Crypto (USDC)
              </button>
            </div>
            
            <p className="text-center text-xs text-slate-500 mt-6 flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Sichere 256-Bit SSL Verschlüsselung
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
