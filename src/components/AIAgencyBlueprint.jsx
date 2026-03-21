import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const AIAgencyBlueprint = () => {
  const [skills, setSkills] = useState({
    Video: false,
    Voice: false,
    Images: false,
    Copywriting: false
  });
  const [niche, setNiche] = useState('Real Estate');
  const [generated, setGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSkill = (skill) => {
    setSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
  };

  const handleGenerate = () => {
    const activeSkills = Object.values(skills).filter(Boolean).length;
    if (activeSkills === 0) {
      toast.error('Bitte wähle mindestens einen KI-Skill aus.');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setGenerated(true);
      toast.success('Blueprint generiert!');
    }, 1500);
  };

  const selectedSkillsArr = Object.entries(skills).filter(([_, v]) => v).map(([k]) => k);
  const skillString = selectedSkillsArr.join(' & ');

  return (
    <div className="animate-fade-in p-6 max-w-7xl mx-auto text-slate-200 min-h-screen">
      <Toaster position="bottom-right" />
      
      {/* Header */}
      <div className="mb-12 text-center relative mt-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-3xl -z-10 rounded-full h-32 w-3/4 mx-auto top-10"></div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 drop-shadow-lg">
          AI Agency Blueprint
        </h1>
        <p className="text-lg text-indigo-200/70 max-w-2xl mx-auto font-light">
          Wähle deine Superkräfte. Generiere unwiderstehliche Freelance-Gigs, Pricing-Tiers und Cold-Outreach Skripte auf Knopfdruck.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Configurator */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-slate-900/60 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(79,70,229,0.1)]">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-indigo-300">
              <span className="text-2xl">⚡</span> Deine KI-Skills
            </h2>
            
            <div className="space-y-4">
              {['Video', 'Voice', 'Images', 'Copywriting'].map(skill => (
                <label key={skill} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                  skills[skill] 
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                    : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800'
                }`}>
                  <span className={`font-semibold ${skills[skill] ? 'text-indigo-300' : 'text-slate-400'}`}>
                    AI {skill}
                  </span>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${skills[skill] ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${skills[skill] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                  <input type="checkbox" className="hidden" checked={skills[skill]} onChange={() => toggleSkill(skill)} />
                </label>
              ))}
            </div>

            <div className="mt-8 mb-4">
              <label className="text-sm font-semibold text-indigo-300 block mb-2">Zielgruppe / Nische</label>
              <select 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-3 text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
              >
                <option>Real Estate (Immobilien)</option>
                <option>E-Commerce & Dropshipping</option>
                <option>Fitness Coaches</option>
                <option>SaaS Startups</option>
                <option>Lokale Restaurants</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isLoading}
              className={`w-full py-4 mt-6 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading 
                  ? 'bg-slate-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:-translate-y-1'
              }`}
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                '🚀 Blueprint Generieren'
              )}
            </button>
          </div>
          
        </div>

        {/* Right Col: Output */}
        <div className="lg:col-span-8">
          {!generated && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center bg-slate-900/30 border border-slate-800 border-dashed rounded-3xl p-12 text-center text-slate-500 min-h-[500px]">
              <div className="text-6xl mb-6 opacity-50">🤖</div>
              <h3 className="text-2xl font-bold mb-2">Warte auf Konfiguration...</h3>
              <p>Wähle links deine Skills und generiere deinen perfekten Agency-Pitch.</p>
            </div>
          )}

          {isLoading && (
            <div className="h-full flex flex-col items-center justify-center bg-slate-900/50 border border-indigo-500/30 rounded-3xl p-12 min-h-[500px]">
              <div className="relative">
                <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-indigo-500"></div>
                <div className="absolute inset-0 flex items-center justify-center text-3xl">✨</div>
              </div>
              <p className="mt-8 text-indigo-400 font-medium animate-pulse">Analysiere Markt für {niche}...</p>
            </div>
          )}

          {generated && !isLoading && (
            <div className="space-y-6 animate-fade-in-up">
              
              {/* Gig Title */}
              <div className="bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">Gig Titel (Fiverr / Upwork)</h3>
                <h2 className="text-2xl font-bold text-white">
                  I will create high-converting {skillString} assets for your {niche} business using Advanced AI
                </h2>
              </div>

              {/* Pricing Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Starter (Basic)', price: '$99', desc: 'Perfect for testing the waters.', features: ['1 AI Asset', 'Basic Prompting', '2 Revisions'] },
                  { title: 'Growth (Standard)', price: '$299', desc: 'Most popular for growing brands.', features: ['3 AI Assets', 'Advanced Workflows', 'Commercial Rights', '5 Revisions'], glow: true },
                  { title: 'Scale (Premium)', price: '$699', desc: 'Full AI Agency takeover.', features: ['10 AI Assets', 'Custom AI Model Training', 'Full Copyrights', 'Unlimited Revisions', 'Priority Support'] },
                ].map((tier, idx) => (
                  <div key={idx} className={`bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border ${tier.glow ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-slate-700/50'}`}>
                    {tier.glow && <div className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold mb-2">Bestseller</div>}
                    <h4 className="text-lg font-bold text-white mb-1">{tier.title}</h4>
                    <div className="text-3xl font-black text-slate-200 mb-2">{tier.price}</div>
                    <p className="text-sm text-slate-400 mb-6">{tier.desc}</p>
                    <ul className="space-y-2">
                      {tier.features.map((f, i) => (
                        <li key={i} className="text-sm flex items-center gap-2 text-slate-300">
                          <span className="text-emerald-500">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Outreach Email */}
              <div className="bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 relative group">
                <button className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded text-xs transition-colors"
                  onClick={() => toast.success('Kopiert!')}>
                  Copy
                </button>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-4">Cold Outreach Template (E-Mail / LinkedIn)</h3>
                <div className="font-mono text-sm text-slate-300 whitespace-pre-wrap">
{`Subject: Quick question about [Company Name]'s ${niche} strategy

Hi [First Name],

I've been following [Company Name] and love your recent work. I noticed an opportunity where you could significantly cut costs while speeding up production.

I run an AI creative studio specializing in ${skillString} for ${niche} brands. We use cutting-edge AI to produce assets that convert 3x higher than traditional methods, at a fraction of the time.

Would you be open to a 5-minute chat next Tuesday to see if this could be a fit for your upcoming campaigns?

Best,
[Your Name]`}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AIAgencyBlueprint;
