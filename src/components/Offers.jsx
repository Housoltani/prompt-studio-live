import React from 'react';
import { toast } from 'react-hot-toast';

export default function Offers() {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Gutscheincode ${code} kopiert!`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-4 pb-12 animate-fade-in">
      {/* HEADER */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          🎁 Angebote des Monats
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Sichere dir exklusive Rabatte auf Prompts, Credits und Partner-Tools. Diese Deals werden monatlich aktualisiert!
        </p>
      </div>

      {/* OFFERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        
        {/* Offer 1 */}
        <div className="glass-card rounded-3xl p-6 border border-yellow-500/30 bg-slate-900/80 relative overflow-hidden group hover:border-yellow-500 transition-all duration-300">
          <div className="absolute top-0 right-0 bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-xl z-10">HOT DEAL</div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl mb-4 shadow-lg">⚡</div>
          <h3 className="text-xl font-bold text-white mb-2">500 Sparks Bonus</h3>
          <p className="text-slate-400 text-sm mb-6 h-12">Erhalte 500 Sparks zusätzlich bei deinem nächsten Auflade-Vorgang.</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-950 border border-slate-700 rounded-xl flex items-center justify-center font-mono text-yellow-400 font-bold tracking-wider">
              SPARKS500
            </div>
            <button 
              onClick={() => handleCopyCode('SPARKS500')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-semibold"
            >
              Kopieren
            </button>
          </div>
        </div>

        {/* Offer 2 */}
        <div className="glass-card rounded-3xl p-6 border border-indigo-500/30 bg-slate-900/80 relative overflow-hidden group hover:border-indigo-500 transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-3xl mb-4 shadow-lg">🤖</div>
          <h3 className="text-xl font-bold text-white mb-2">Midjourney Masterclass</h3>
          <p className="text-slate-400 text-sm mb-6 h-12">20% Rabatt auf den Premium Video-Kurs unserer Partner.</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-950 border border-slate-700 rounded-xl flex items-center justify-center font-mono text-indigo-400 font-bold tracking-wider">
              MJPRO20
            </div>
            <button 
              onClick={() => handleCopyCode('MJPRO20')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-semibold"
            >
              Kopieren
            </button>
          </div>
        </div>

        {/* Offer 3 */}
        <div className="glass-card rounded-3xl p-6 border border-emerald-500/30 bg-slate-900/80 relative overflow-hidden group hover:border-emerald-500 transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-3xl mb-4 shadow-lg">💰</div>
          <h3 className="text-xl font-bold text-white mb-2">Marktplatz Rabatt</h3>
          <p className="text-slate-400 text-sm mb-6 h-12">-10% auf alle Prompts im Community Marktplatz am Wochenende.</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-950 border border-slate-700 rounded-xl flex items-center justify-center font-mono text-emerald-400 font-bold tracking-wider">
              WEEKEND10
            </div>
            <button 
              onClick={() => handleCopyCode('WEEKEND10')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-semibold"
            >
              Kopieren
            </button>
          </div>
        </div>

      </div>

      {/* SOCIAL MEDIA SECTION */}
      <div className="mt-12 bg-slate-900/80 border border-slate-700/50 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden glass-card">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <h2 className="text-3xl font-extrabold mb-4 text-white">
          Folge unserer <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Prompt Video Seite</span>
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">
          Tägliche KI-Hacks, atemberaubende Sora & Kling Videos und virale Prompts direkt in deinem Feed. Werde Teil der Community!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          
          {/* YouTube */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-4 bg-slate-950 border border-slate-700 rounded-2xl hover:border-red-500 hover:bg-red-500/10 transition-all group">
            <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </div>
            <div className="text-left">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Abonnieren</div>
              <div className="text-white font-bold">YouTube</div>
            </div>
          </a>

          {/* TikTok */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-4 bg-slate-950 border border-slate-700 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/10 transition-all group">
            <div className="w-10 h-10 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.97-1.587 4.6 4.6 0 0 1-1.127-3.099H10.6v14.127a3.834 3.834 0 0 1-3.834 3.834c-2.112 0-3.834-1.722-3.834-3.834s1.722-3.834 3.834-3.834a3.81 3.81 0 0 1 2.368.83v-3.792a7.618 7.618 0 0 0-2.368-.38c-4.223 0-7.668 3.445-7.668 7.668S5.867 24 10.09 24s7.668-3.445 7.668-7.668v-7.143a8.553 8.553 0 0 0 4.298 1.15V6.65a4.576 4.576 0 0 1-2.467-.004z"/></svg>
            </div>
            <div className="text-left">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Folgen auf</div>
              <div className="text-white font-bold">TikTok</div>
            </div>
          </a>

          {/* Instagram */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-4 bg-slate-950 border border-slate-700 rounded-2xl hover:border-pink-500 hover:bg-pink-500/10 transition-all group">
            <div className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </div>
            <div className="text-left">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Folgen auf</div>
              <div className="text-white font-bold">Instagram</div>
            </div>
          </a>

          {/* Facebook */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-4 bg-slate-950 border border-slate-700 rounded-2xl hover:border-blue-600 hover:bg-blue-600/10 transition-all group">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </div>
            <div className="text-left">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Liken auf</div>
              <div className="text-white font-bold">Facebook</div>
            </div>
          </a>

        </div>
      </div>
    </div>
  );
}