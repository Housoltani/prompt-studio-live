import React, { useState } from 'react';

export default function AIAcademy() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeTerm, setActiveTerm] = useState(null);
  const [simStep, setSimStep] = useState(0);
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator', 'dictionary', 'masterclass'

  const simSteps = [
    {
      label: 'Basis',
      prompt: 'Ein Astronaut',
      addition: '',
      desc: 'Der Grundbaustein. Die KI weiß nur das Subjekt und muss den Rest erraten.',
      img: 'https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&q=80&w=1200'
    },
    {
      label: '+ Umgebung',
      prompt: 'Ein Astronaut',
      addition: ', auf dem Mars, rote Dünen, Sternenhimmel',
      desc: 'Jetzt geben wir Kontext. Die KI weiß nun, wo sich das Subjekt befindet.',
      img: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1200'
    },
    {
      label: '+ Stil & Licht',
      prompt: 'Ein Astronaut, auf dem Mars, rote Dünen, Sternenhimmel',
      addition: ', Cinematic Lighting, 8k, Unreal Engine 5, Meisterwerk',
      desc: 'Das Finale. Wir kontrollieren die Qualität, das Licht und die "Kamera".',
      img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  const lexicon = [
    { id: 'prompt', term: 'Prompt', def: 'Deine Anweisung an die KI. Je genauer du bist, desto besser das Ergebnis. Stell dir vor, du bestellst bei einem sehr wörtlichen Kellner.' },
    { id: 'seed', term: 'Seed', def: 'Die Startnummer eines Bildes. Wenn du denselben Seed und denselben Prompt nutzt, erhältst du fast exakt dasselbe Bild nochmal.' },
    { id: 'token', term: 'Token', def: 'KI-Währung für Text. Ein Token ist etwa ein dreiviertel Wort. Ein "Max Tokens" Wert begrenzt, wie lang die KI antworten darf.' },
    { id: 'lora', term: 'LoRA', def: 'Eine Mini-Erweiterung für die KI. Als würdest du ihr ein Buch über einen bestimmten Stil (z.B. Anime oder Aquarell) zum schnellen Auswendiglernen geben.' },
    { id: 'upscale', term: 'Upscale', def: 'Das Hochrechnen eines Bildes. Die KI macht das Bild schärfer und größer, erfindet dabei oft noch winzige Details hinzu.' },
    { id: 'aspect', term: 'Aspect Ratio', def: 'Das Seitenverhältnis (z.B. 16:9 für TV, 9:16 für TikTok, 1:1 für Instagram). Steuert, ob das Bild hochkant oder quer wird.' },
    { id: 'cfg', term: 'CFG Scale', def: 'Wie streng sich die KI an deinen Text hält. Hoher Wert = strikt nach Text, niedriger Wert = die KI wird kreativ und ignoriert dich etwas.' },
    { id: 'render', term: 'Render Engine', def: 'Wörter wie "Unreal Engine 5" oder "Octane Render" im Prompt zwingen die KI, das Bild extrem realistisch wie ein modernes Videospiel aussehen zu lassen.' }
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4 pb-20">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden border border-slate-700/50 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
              Prompt <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Academy</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Dein Trainingszentrum für KI-Kommunikation. Vom grundlegenden Vokabular bis zu fortgeschrittenen Masterclass-Techniken.
            </p>
          </div>
          
          {/* Sub-Nav */}
          <div className="flex bg-slate-900/50 p-1.5 rounded-xl border border-slate-700/50 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`whitespace-nowrap px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'simulator' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              🎮 Prompt Simulator
            </button>
            <button
              onClick={() => setActiveTab('dictionary')}
              className={`whitespace-nowrap px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'dictionary' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              📖 Cyber-Lexikon
            </button>
            <button
              onClick={() => setActiveTab('masterclass')}
              className={`whitespace-nowrap px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'masterclass' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-900/50' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              🏆 Masterclass
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'simulator' && (
        <div className="space-y-16 animate-fade-in">
          {/* Sektion 1: Vorher-Nachher Hologramm */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              Das Vorher-Nachher Hologramm
            </h2>
            <p className="text-slate-400 mb-6">Bewege den Slider, um den direkten Einfluss eines professionellen Prompts auf ein Basis-Bild zu sehen. Der Unterschied ist gewaltig.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
              
              {/* Prompt Infos Links */}
              <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
                <div className={`p-5 rounded-xl transition-all duration-300 ${sliderPos > 50 ? 'bg-slate-800/50 opacity-50' : 'bg-slate-700 border-l-4 border-red-500 shadow-lg'}`}>
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Anfänger-Prompt</div>
                  <p className="text-white font-mono text-sm">"ein rotes auto in der stadt"</p>
                  <div className="mt-3 text-slate-400 text-xs">Langweilig, flach, überlässt der KI zu viele Entscheidungen.</div>
                </div>
                
                <div className={`p-5 rounded-xl transition-all duration-300 ${sliderPos <= 50 ? 'bg-slate-800/50 opacity-50' : 'bg-slate-700 border-l-4 border-emerald-500 shadow-lg'}`}>
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Prime-Prompt</div>
                  <p className="text-white font-mono text-sm text-emerald-100">"Cinematic shot of a futuristic neon red sports car speeding through a dark cyberpunk city, rain reflections, volumetric lighting, 8k resolution, Unreal Engine 5 render --ar 16:9"</p>
                  <div className="mt-3 text-slate-400 text-xs">Kontrolliert Licht, Stimmung, Stil, Auflösung und Format.</div>
                </div>
              </div>

              {/* Der interaktive Slider Rechts */}
              <div className="lg:col-span-8">
                <div 
                  className="relative w-full aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none shadow-2xl border-2 border-slate-600 bg-slate-900"
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                >
                  {/* Anfänger Bild (Hintergrund) */}
                  <img 
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" 
                    alt="Boring Car" 
                    className="absolute top-0 left-0 w-full h-full object-cover filter brightness-75 sepia-[0.2]"
                    draggable="false"
                  />
                  
                  {/* Prime Bild (Vordergrund, mit Clip-Path) */}
                  <div 
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?auto=format&fit=crop&q=80&w=1200" 
                      alt="Cyberpunk Car" 
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>

                  {/* Slider Linie & Handle */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"
                    style={{ left: `calc(${sliderPos}% - 2px)` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" /></svg>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-4 left-4 bg-red-500/80 text-white text-xs font-bold px-3 py-1 rounded backdrop-blur-sm z-0">Vorher</div>
                  <div className="absolute top-4 right-4 bg-emerald-500/80 text-white text-xs font-bold px-3 py-1 rounded backdrop-blur-sm z-20">Nachher</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sektion 1.5: Schritt-für-Schritt Simulator */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              Die Prompt-Evolution (Simulator)
            </h2>
            <p className="text-slate-400 mb-6">Erlebe interaktiv, wie ein Meisterwerk entsteht, indem wir den Prompt Schicht für Schicht aufbauen.</p>
            
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-center">
              
              {/* Steuerung & Text links */}
              <div className="flex-1 w-full space-y-6">
                {/* Progress / Tabs */}
                <div className="flex gap-2 mb-8 bg-slate-900/50 p-1.5 rounded-xl border border-slate-700/50">
                  {simSteps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSimStep(idx)}
                      className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${simStep === idx ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
                    >
                      {idx + 1}. {step.label}
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Dein Aktueller Prompt</h3>
                  <p className="font-mono text-lg text-white leading-relaxed">
                    {simStep === 0 && <span className="text-white">{simSteps[0].prompt}</span>}
                    {simStep === 1 && <><span className="text-slate-400">{simSteps[1].prompt}</span><span className="text-emerald-400 animate-fade-in font-bold">{simSteps[1].addition}</span></>}
                    {simStep === 2 && <><span className="text-slate-400">{simSteps[2].prompt}</span><span className="text-emerald-400 animate-fade-in font-bold">{simSteps[2].addition}</span></>}
                  </p>
                </div>

                <div className="bg-indigo-900/20 border border-indigo-500/20 p-5 rounded-xl">
                  <h4 className="text-indigo-300 font-bold mb-1 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Was passiert hier?
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{simSteps[simStep].desc}</p>
                </div>
                
                <button 
                  onClick={() => setSimStep(prev => (prev < 2 ? prev + 1 : 0))}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex justify-center items-center gap-2"
                >
                  {simStep < 2 ? 'Nächste Schicht hinzufügen' : 'Simulation neu starten'}
                  {simStep < 2 && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                </button>
              </div>

              {/* Bild rechts */}
              <div className="w-full lg:w-[45%] aspect-square lg:aspect-[4/5] bg-slate-900 rounded-2xl border-4 border-slate-800 shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-slate-900 animate-pulse z-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <img 
                  key={simStep} 
                  src={simSteps[simStep].img} 
                  alt="Prompt Result" 
                  className="absolute inset-0 w-full h-full object-cover z-10 animate-fade-in transition-transform duration-700 group-hover:scale-105"
                />
                {/* Status Overlay */}
                <div className="absolute top-4 right-4 z-20 bg-slate-900/80 backdrop-blur text-white text-xs font-mono py-1 px-2 rounded border border-slate-700">
                  Generierung v{simStep + 1}.0
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {activeTab === 'dictionary' && (
        <div className="animate-fade-in">
          {/* Sektion 2: Cyber-Lexikon */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              Das Anti-Jargon Wörterbuch
            </h2>
            <p className="text-slate-400 mb-6">Klicke auf die Datenkarten, um die wichtigsten Begriffe ohne Fachchinesisch zu verstehen.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lexicon.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setActiveTerm(activeTerm === item.id ? null : item.id)}
                  className={`cursor-pointer perspective-1000 min-h-[160px] relative transition-all duration-300 ${activeTerm === item.id ? 'z-10 scale-105' : 'hover:scale-105'}`}
                >
                  <div className={`w-full h-full absolute top-0 left-0 transition-all duration-500 preserve-3d ${activeTerm === item.id ? 'rotate-y-180' : ''}`}>
                    
                    {/* Front (Term) */}
                    <div className="absolute w-full h-full backface-hidden bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg">
                      <span className="text-indigo-400 mb-2 opacity-50 text-3xl">{item.id === 'prompt' ? '📝' : item.id === 'seed' ? '🌱' : item.id === 'token' ? '🪙' : item.id === 'lora' ? '🧩' : item.id === 'upscale' ? '🔍' : item.id === 'aspect' ? '📐' : item.id === 'cfg' ? '⚖️' : '🎮'}</span>
                      <h3 className="text-xl font-bold text-white text-center">{item.term}</h3>
                      <p className="text-xs text-slate-500 mt-4 absolute bottom-4">Klicken zum Entschlüsseln</p>
                    </div>
                    
                    {/* Back (Definition) */}
                    <div className="absolute w-full h-full backface-hidden bg-indigo-900 border border-indigo-500 rounded-xl p-5 flex flex-col items-center justify-center shadow-xl rotate-y-180 overflow-y-auto">
                      <h4 className="text-xs font-bold text-indigo-300 uppercase mb-2 w-full border-b border-indigo-500/50 pb-1">{item.term}</h4>
                      <p className="text-sm text-indigo-50 text-left w-full leading-relaxed">{item.def}</p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'masterclass' && (
        <div className="animate-fade-in space-y-8">
          <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-3xl p-8 relative overflow-hidden">
            <h2 className="text-3xl font-extrabold text-white mb-4 flex items-center gap-3">
              <span className="text-4xl">🏆</span> Die Architektur des perfekten Prompts
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-3xl">
              Professionelle KI-Künstler schreiben keine Fließtexte. Sie strukturieren ihre Prompts wie Programmiercode. Hier ist die goldene Formel, die in 90% aller Fälle zum Meisterwerk führt.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700/50 relative group hover:-translate-y-1 transition-transform">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-black shadow-lg">1</div>
                <h3 className="text-blue-400 font-bold mb-2 mt-2">Subjekt</h3>
                <p className="text-sm text-slate-400">Das Hauptmotiv. Wer oder was ist es? (z.B. "Eine junge Cyberpunk-Kriegerin")</p>
              </div>
              
              <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700/50 relative group hover:-translate-y-1 transition-transform">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-black shadow-lg">2</div>
                <h3 className="text-purple-400 font-bold mb-2 mt-2">Aktion / Pose</h3>
                <p className="text-sm text-slate-400">Was macht das Motiv? (z.B. "schaut ernst in die Kamera, hält ein Katana")</p>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700/50 relative group hover:-translate-y-1 transition-transform">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-black shadow-lg">3</div>
                <h3 className="text-emerald-400 font-bold mb-2 mt-2">Umgebung</h3>
                <p className="text-sm text-slate-400">Der Hintergrund. (z.B. "verregnete Neon-Straße in Tokyo, Nacht")</p>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700/50 relative group hover:-translate-y-1 transition-transform">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-black shadow-lg">4</div>
                <h3 className="text-amber-400 font-bold mb-2 mt-2">Stil / Medium</h3>
                <p className="text-sm text-slate-400">Wie wurde es gemacht? (z.B. "Ölgemälde, Anime-Stil, 35mm Fotografie")</p>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700/50 relative group hover:-translate-y-1 transition-transform">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-black shadow-lg">5</div>
                <h3 className="text-red-400 font-bold mb-2 mt-2">Licht & Qualität</h3>
                <p className="text-sm text-slate-400">Der Feinschliff. (z.B. "Volumetrisches Licht, 8k, Meisterwerk")</p>
              </div>
            </div>

            <div className="mt-8 bg-black/40 p-6 rounded-2xl border border-white/10 font-mono text-sm shadow-inner">
              <div className="text-slate-500 mb-2">// Der zusammengebaute Master-Prompt:</div>
              <span className="text-blue-400">A young cyberpunk female warrior,</span>{' '}
              <span className="text-purple-400">looking seriously at the camera holding a glowing katana,</span>{' '}
              <span className="text-emerald-400">rainy neon street in Tokyo at night,</span>{' '}
              <span className="text-amber-400">cinematic 35mm photography,</span>{' '}
              <span className="text-red-400">volumetric lighting, 8k resolution, masterpiece --ar 16:9</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-red-400">❌</span> Anfängerfehler
              </h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50"><span className="text-red-400 font-bold">1.</span> <span>Zu viel Grammatik. "Bitte zeichne mir ein Bild von einem Hund der sitzt." → Besser: "Hund, sitzend, Fotografie"</span></li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50"><span className="text-red-400 font-bold">2.</span> <span>Widersprüche. "Fotorealistisch" und "Cartoon" im selben Prompt verwirrt die KI drastisch.</span></li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50"><span className="text-red-400 font-bold">3.</span> <span>Negative Wörter. Sag nicht was du NICHT willst ("keine Brille"). Nutze dafür das "Negative Prompt" Feld.</span></li>
              </ul>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-amber-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">💡</span> Pro-Tipps
              </h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20"><span className="text-amber-400 font-bold">Gewichtung:</span> <span>Nutze Klammern, um Wörter wichtiger zu machen: <code className="bg-black/30 px-1 rounded text-amber-300">(rote Augen:1.5)</code></span></li>
                <li className="flex items-start gap-3 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20"><span className="text-amber-400 font-bold">Kamera-Winkel:</span> <span>Begriffe wie "low angle shot" oder "bird's eye view" verändern die gesamte Dynamik sofort.</span></li>
                <li className="flex items-start gap-3 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20"><span className="text-amber-400 font-bold">Künstler zitieren:</span> <span>"in the style of Greg Rutkowski" gibt der KI sofort eine extrem starke, einheitliche visuelle Richtung.</span></li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
