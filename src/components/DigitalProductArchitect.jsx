import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DigitalProductArchitect = () => {
  const [step, setStep] = useState(1);
  const [productType, setProductType] = useState('Print-on-Demand T-Shirts');
  const [theme, setTheme] = useState('Cyberpunk Cats');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setResult({
          title: `Neon Cyberpunk Cat T-Shirt | Retro-Futuristic Aesthetic Apparel | Synthwave Kitty Graphic Tee`,
          seoDesc: `Upgrade your wardrobe with this exclusive Neon Cyberpunk Cat T-Shirt. Featuring a highly detailed, retro-futuristic feline hacker design inspired by synthwave aesthetics. Perfect for gamers, sci-fi fans, and cat lovers alike. Printed on premium, ultra-soft cotton for maximum comfort. Stand out in the neon-lit streets!`,
          prompt: `/imagine prompt: A neon-lit cyberpunk cat hacker wearing futuristic VR goggles and a leather jacket, standing in a rainy Tokyo alleyway, synthwave colors, 8k resolution, highly detailed, vector art style, clean white background for t-shirt design --ar 1:1 --v 6.0`,
          keywords: ['Cyberpunk Cat', 'Synthwave Apparel', 'Retro-Futuristic Tee', 'Gamer Shirt', 'Neon Aesthetic']
        });
        setStep(3);
        toast.success('Produkt-Assets erfolgreich generiert!', { icon: '🎉' });
      }, 2500);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Kopiert!');
  };

  const handleExportMarkdown = () => {
    if (!result) return;
    const markdown = `# Digital Product Listing: ${productType}
## Theme
${theme}

## SEO Title
${result.title}

## SEO Description
${result.seoDesc}

## Midjourney Prompt
\`\`\`
${result.prompt}
\`\`\`

## Keywords / Tags
${result.keywords.join(', ')}
`;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Product_Listing_${theme.replace(/\\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Als Markdown exportiert!');
  };

  return (
    <div className="animate-fade-in p-6 max-w-5xl mx-auto text-slate-200 min-h-screen">
      <Toaster position="bottom-right" />
      
      {/* Header */}
      <div className="mb-12 text-center relative mt-4">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 blur-3xl -z-10 rounded-full h-32 w-3/4 mx-auto top-10"></div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 drop-shadow-lg">
          Digital Product Architect
        </h1>
        <p className="text-lg text-teal-200/70 max-w-2xl mx-auto font-light">
          Dein KI-gestützter Produkt-Konstrukteur. Generiere komplette Listings, SEO-Daten und Midjourney-Prompts in Sekunden.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4 w-full max-w-lg">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-all duration-500 ${step >= 1 ? 'bg-teal-500 text-white shadow-teal-500/50' : 'bg-slate-800 text-slate-500'}`}>1</div>
          <div className={`flex-1 h-1 rounded transition-all duration-500 ${step >= 2 ? 'bg-teal-500' : 'bg-slate-800'}`}></div>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-all duration-500 ${step >= 2 ? 'bg-teal-500 text-white shadow-teal-500/50' : 'bg-slate-800 text-slate-500'}`}>2</div>
          <div className={`flex-1 h-1 rounded transition-all duration-500 ${step >= 3 ? 'bg-teal-500' : 'bg-slate-800'}`}></div>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-all duration-500 ${step === 3 ? 'bg-teal-500 text-white shadow-teal-500/50' : 'bg-slate-800 text-slate-500'}`}>3</div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-teal-500/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(20,184,166,0.1)] transition-all duration-500 relative overflow-hidden">
        
        {/* Glow Effects inside card */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {step === 1 && (
          <div className="animate-fade-in relative z-10">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <span className="text-teal-400">01.</span> Wähle dein Produktformat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {['Print-on-Demand T-Shirts', 'Midjourney Prompt Verkauf', 'Etsy Digital Art Prints', 'Canva Template Bundle'].map(type => (
                <button
                  key={type}
                  onClick={() => setProductType(type)}
                  className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                    productType === type 
                      ? 'bg-teal-900/40 border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.2)]' 
                      : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600'
                  }`}
                >
                  <div className="font-bold text-lg text-slate-200 mb-1">{type}</div>
                  <div className="text-xs text-slate-400">Ideal für passives Einkommen auf Etsy oder Redbubble.</div>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={handleNext} className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-teal-500/40 flex items-center gap-2">
                Weiter <span className="text-xl">→</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in relative z-10">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <span className="text-teal-400">02.</span> Nische & Konzept
            </h2>
            <div className="mb-8 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
              <label className="block text-sm font-semibold text-teal-400 mb-2">Gewähltes Format</label>
              <div className="text-xl text-slate-300 font-medium mb-6">{productType}</div>
              
              <label className="block text-sm font-semibold text-teal-400 mb-2">Thema / Motiv (Worüber geht es?)</label>
              <input 
                type="text" 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="z.B. Cyberpunk Cats, Minimalist Boho Art, Fitness Motivation"
                className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-lg shadow-inner"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white transition-colors">
                ← Zurück
              </button>
              
              <button 
                onClick={handleNext} 
                disabled={isGenerating || !theme}
                className={`font-bold py-4 px-8 rounded-xl transition-all flex items-center gap-2 text-white shadow-lg ${
                  isGenerating 
                    ? 'bg-slate-700 cursor-wait' 
                    : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] hover:-translate-y-1'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Architekt rechnet...
                  </>
                ) : (
                  <>
                    <span className="text-xl">✨</span> Blueprint Generieren
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 3 && result && (
          <div className="animate-fade-in relative z-10">
            <div className="flex justify-between items-center mb-8 border-b border-slate-700/50 pb-6">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <span className="text-teal-400">03.</span> Dein fertiges Produkt-Listing
                </h2>
                <p className="text-slate-400 text-sm mt-1">Bereit zum Kopieren für Etsy, Redbubble oder PromptBase.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleExportMarkdown}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Export Markdown
                </button>
                <button onClick={() => { setStep(1); setResult(null); }} className="text-sm px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-600">
                  Neues Produkt
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Col: Prompt */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-purple-500/30 group">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                      <span>🪄</span> Midjourney Prompt
                    </h3>
                    <button onClick={() => copyToClipboard(result.prompt)} className="text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded">Copy</button>
                  </div>
                  <p className="font-mono text-sm text-slate-300 leading-relaxed break-words">{result.prompt}</p>
                  <button 
                    onClick={() => navigate('/app/generator')}
                    className="w-full mt-4 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 border border-purple-500/50 py-2 rounded-lg text-sm transition-colors"
                  >
                    Im Generator testen →
                  </button>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-cyan-500/30">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                    <span>🏷️</span> SEO Keywords (Tags)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map(kw => (
                      <span key={kw} className="bg-cyan-900/30 text-cyan-300 border border-cyan-800/50 px-2 py-1 rounded text-xs">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Listing Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-teal-500/30">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-teal-500">Optimierter Titel</h3>
                    <button onClick={() => copyToClipboard(result.title)} className="text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded">Copy</button>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-6">{result.title}</h4>
                  
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-teal-500">Conversion Description</h3>
                    <button onClick={() => copyToClipboard(result.seoDesc)} className="text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded">Copy</button>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{result.seoDesc}</p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DigitalProductArchitect;
