import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  // Navbar blur effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* Ambient Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-white to-slate-400 rounded-xl flex items-center justify-center font-black text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              P
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">Prompt Studio<span className="text-blue-500">.</span></span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-md">
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</a>
            <a href="#blog" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Blog</a>
          </div>

          <div className="flex items-center gap-5">
            <Link to="/app" className="hidden md:block text-sm font-semibold text-slate-300 hover:text-white transition-colors">Login</Link>
            <Link to="/app" className="bg-white hover:bg-slate-200 text-black text-sm font-bold py-2.5 px-6 rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105">
              Launch App ➔
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-40 pb-24 px-6 z-10 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="max-w-5xl mx-auto text-center relative">
          
          <Link to="/app" className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white mb-10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300">Prompt Studio Pro ist da.</span>
            <span className="text-blue-400 font-bold">Entdecken &rarr;</span>
          </Link>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 pb-2">
            Der Blueprint für <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              echte KI-Magie.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Schluss mit mittelmäßigen Ergebnissen. Nutze den Baukasten der Profis, um atemberaubende Bilder, Videos und Texte in Sekunden zu generieren.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/app" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 px-10 rounded-full text-lg transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:-translate-y-1">
              Kostenlos starten
            </Link>
            <a href="#features" className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-5 px-10 rounded-full text-lg transition-all backdrop-blur-md">
              Wie es funktioniert
            </a>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="flex -space-x-4">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className={`w-12 h-12 rounded-full border-2 border-[#050505] bg-slate-800 flex items-center justify-center text-xl z-${10-i} shadow-lg`}>
                  {['👨‍💻','👩‍🎨','📸','🎬','🚀'][i-1]}
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-sm font-medium">Vertraut von über <span className="text-white font-bold">10.000+</span> Creatorn & Entwicklern.</p>
          </div>
        </div>
      </main>

      {/* Floating App Preview Dashboard */}
      <section className="relative z-20 px-6 -mt-10 pb-32 max-w-7xl mx-auto perspective-1000">
        <div className="rounded-3xl border border-white/10 bg-[#0a0a0a]/80 p-2 shadow-[0_0_100px_rgba(0,0,0,1)] backdrop-blur-xl transform rotate-x-[5deg] hover:rotate-x-0 transition-transform duration-700">
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#0f0f0f] relative flex items-center justify-center min-h-[400px] md:min-h-[600px]">
            {/* Fake Dashboard UI UI */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-[#050505] flex">
              {/* Sidebar Mock */}
              <div className="w-64 border-r border-white/5 p-6 hidden md:block">
                <div className="w-32 h-6 bg-white/10 rounded-full mb-10"></div>
                <div className="space-y-4">
                  <div className="w-full h-10 bg-blue-500/20 rounded-lg"></div>
                  <div className="w-full h-10 bg-white/5 rounded-lg"></div>
                  <div className="w-full h-10 bg-white/5 rounded-lg"></div>
                </div>
              </div>
              {/* Main Content Mock */}
              <div className="flex-1 p-8">
                <div className="w-48 h-8 bg-white/10 rounded-full mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-xl h-64 relative overflow-hidden">
                      <div className={`absolute inset-0 opacity-50 bg-gradient-to-br ${i===1 ? 'from-purple-500 to-blue-500' : i===2 ? 'from-emerald-500 to-teal-500' : 'from-orange-500 to-red-500'}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Overlay Play Button */}
            <div className="z-10 bg-white/10 p-6 rounded-full backdrop-blur-xl border border-white/20 cursor-pointer hover:bg-white/20 transition-all hover:scale-110 shadow-2xl">
              <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid - Apple Style */}
      <section id="features" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 md:w-2/3">
            <h2 className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-3">Die Werkzeuge</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Alles an einem Ort.<br/>Nichts, was dich aufhält.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-colors group">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/30 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎛️</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Prompt Mixer</h4>
              <p className="text-slate-400 text-lg leading-relaxed">
                Baue hochkomplexe Anweisungen visuell zusammen. Wähle Kamera, Licht und Stil durch einfaches Klicken. Der Code schreibt sich von selbst.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-colors group">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-8 border border-purple-500/30 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🔄</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Reverse Extractor</h4>
              <p className="text-slate-400 text-lg leading-relaxed">
                Lade ein Referenzbild hoch. Unsere Vision-KI analysiert es und generiert den exakten Midjourney-Prompt, um den Stil zu klonen.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-colors group">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <span className="text-3xl">⚖️</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">A/B Modell-Vergleich</h4>
              <p className="text-slate-400 text-lg leading-relaxed">
                Beende das Raten. Teste denselben Prompt gleichzeitig in Midjourney v6, DALL-E 3 und Stable Diffusion.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-colors group">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-8 border border-orange-500/30 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏆</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Community Hub</h4>
              <p className="text-slate-400 text-lg leading-relaxed">
                Lerne von den Besten. Entdecke tägliche Trending-Prompts, speichere Favoriten in deinem Profil und teile deine eigenen Kreationen.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* NEW: PRICING SECTION */}
      <section id="pricing" className="py-32 relative z-10 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Wähle dein Level.</h2>
            <p className="text-slate-400 text-lg">Einfache, transparente Preise. Kein Abo-Zwang.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Free Tier */}
            <div className="bg-[#050505] border border-white/10 rounded-3xl p-10 flex flex-col relative overflow-hidden">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <p className="text-slate-400 mb-8">Für den Einstieg in die KI-Welt.</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-white">0€</span>
                <span className="text-slate-500 font-medium"> / für immer</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Zugriff auf 500+ Basis Prompts
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  KI für Anfänger Tutorials
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Community Lesezugriff
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  Kein Prompt Extractor
                </li>
              </ul>
              <Link to="/app" className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-colors text-center">
                Kostenlos Account erstellen
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-gradient-to-b from-blue-900/40 to-[#050505] border border-blue-500/50 rounded-3xl p-10 flex flex-col relative overflow-hidden transform md:-translate-y-4 shadow-[0_0_50px_rgba(37,99,235,0.15)]">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-emerald-400"></div>
              <div className="absolute top-8 right-8 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">BELIEBTESTE</div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-blue-200 mb-8">Für professionelle Creator & Teams.</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-white">12€</span>
                <span className="text-slate-500 font-medium"> / Monat</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Alles aus dem Starter Plan
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Unbegrenzter Prompt Extractor (Vision AI)
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Prompt Mixer & A/B Vergleich
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Cloud Sync für deine Favoriten
                </li>
              </ul>
              <Link to="/app" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1 text-center">
                7 Tage kostenlos testen
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] py-16 border-t border-white/5 text-center">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-black mx-auto mb-6">
          P
        </div>
        <p className="text-slate-500 text-sm font-medium mb-4">© 2026 Prompt Studio. Gebaut für die nächste Generation.</p>
        <div className="flex justify-center gap-6 text-sm text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Impressum</a>
          <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
          <a href="#" className="hover:text-white transition-colors">AGB</a>
        </div>
      </footer>
    </div>
  )
}