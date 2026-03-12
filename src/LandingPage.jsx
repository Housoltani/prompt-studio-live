import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">P</div>
            <span className="font-bold text-xl tracking-tight">Prompt Studio<span className="text-blue-400">.</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pro" className="hover:text-white transition-colors">Pro Version</a>
            <a href="#blog" className="hover:text-white transition-colors">Blog</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/app" className="hidden md:block text-sm font-bold text-slate-300 hover:text-white transition-colors">Einloggen</Link>
            <Link to="/app" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2.5 px-5 rounded-full transition-all shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 hover:-translate-y-0.5">
              App öffnen ➔
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center relative">
          
          {/* Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-blue-400 mb-8 mt-12">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Neu: Der KI Prompt Mixer ist jetzt live!
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Der ultimative Hub für <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              perfekte KI-Prompts.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Hör auf, mit der KI wie mit Google zu reden. Entdecke tausende erprobte Prompts für Midjourney, Sora, Suno und ChatGPT. Generiere, mixe und teile mit der Community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/app" className="w-full sm:w-auto bg-white text-slate-950 font-extrabold py-4 px-8 rounded-full text-lg hover:bg-slate-200 transition-transform hover:scale-105 shadow-xl shadow-white/10">
              Kostenlos starten
            </Link>
            <a href="#features" className="w-full sm:w-auto bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors">
              Features ansehen
            </a>
          </div>
          <p className="text-slate-500 text-sm mt-4">Keine Kreditkarte erforderlich. Direkt im Browser starten.</p>

          {/* Dashboard Preview Image/Mockup */}
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-sm">
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video relative flex items-center justify-center">
                {/* Fake App UI Preview */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="z-10 text-center">
                  <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-blue-500/30">
                    <svg className="w-10 h-10 text-blue-400 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white shadow-black drop-shadow-md">Sieh dir die Plattform in Aktion an</h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Alles, was du für die KI-Revolution brauchst</h2>
            <p className="text-slate-400">Ein Werkzeugkasten, der dich sofort produktiver macht.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 transition-colors">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🎛️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Prompt Mixer</h3>
              <p className="text-slate-400 leading-relaxed">Baue hochkomplexe Prompts wie Lego-Steine zusammen. Keine technischen Vorkenntnisse nötig.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/50 transition-colors">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Bild-zu-Text Extractor</h3>
              <p className="text-slate-400 leading-relaxed">Lade ein beliebiges Bild hoch und unsere KI generiert dir exakt den Prompt, den du zum Nachbauen brauchst.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-purple-500/50 transition-colors">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Community & Likes</h3>
              <p className="text-slate-400 leading-relaxed">Entdecke die besten Prompts anderer Nutzer, speichere deine Favoriten und teile deine eigenen Meisterwerke.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO / Blog Teaser Section */}
      <section id="blog" className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">KI News & Updates</h2>
              <p className="text-slate-400">Bleib auf dem neuesten Stand der Technik.</p>
            </div>
            <button className="hidden md:block text-blue-400 hover:text-blue-300 font-bold">Alle Artikel ➔</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden mb-4 border border-slate-800">
                <div className="h-64 bg-slate-800 bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <span className="text-blue-400 text-sm font-bold tracking-wider uppercase mb-2 block">Midjourney v6</span>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Wie man hyperrealistische Porträts in v6 erstellt</h3>
              <p className="text-slate-400 line-clamp-2">Ein tiefgehender Guide über Kamera-Linsen, Beleuchtung und die neuen Text-Rendering Fähigkeiten des Updates.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden mb-4 border border-slate-800">
                <div className="h-64 bg-slate-800 bg-[url('https://images.unsplash.com/photo-1684369175836-81e3a6a9b407?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <span className="text-emerald-400 text-sm font-bold tracking-wider uppercase mb-2 block">Sora & Video</span>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Der Aufstieg von KI-generierten Filmen</h3>
              <p className="text-slate-400 line-clamp-2">Warum OpenAI Sora die Filmindustrie für immer verändern wird und wie du dich darauf vorbereitest.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>© 2026 Prompt Studio. Gebaut für die Zukunft.</p>
      </footer>
    </div>
  )
}