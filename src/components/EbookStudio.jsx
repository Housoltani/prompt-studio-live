import React, { useState } from 'react';
import { BookOpen, Sparkles, PenTool, LayoutTemplate, ShoppingCart, CheckCircle2, ChevronRight, Wand2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const StepIndicator = ({ step, currentStep, title, icon }) => {
  const IconComponent = icon;
  const isActive = currentStep >= step;
  return (
    <div className={`flex flex-col items-center gap-2 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
        currentStep > step ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 
        currentStep === step ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/30' : 
        'bg-gray-800 border-gray-700 text-gray-500'
      }`}>
        {currentStep > step ? <CheckCircle2 size={20} /> : <IconComponent size={20} />}
      </div>
      <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>{title}</span>
    </div>
  );
};

export default function EbookStudio() {
  const [currentStep, setCurrentStep] = useState(1);
  const [niche, setNiche] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [bookData, setBookData] = useState({
    titles: [],
    chapters: [],
    selectedTitle: '',
    coverPrompt: '',
    salesCopy: ''
  });

  const generateStructure = async () => {
    if (!niche) return;
    
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey || apiKey === 'dein_echter_openrouter_key') {
      toast.error('Kein API-Schlüssel für OpenRouter gefunden.', { style: { background: '#7f1d1d', color: '#fff' } });
      return;
    }

    setIsGenerating(true);
    
    const systemPrompt = `Du bist ein erstklassiger Verlagslektor und Ghostwriter-Architekt. Der Nutzer gibt dir eine Nische für ein neues E-Book.
    Deine Aufgabe:
    1. Generiere exakt 3 psychologisch perfekte Bestseller-Titel (kurz, prägnant, nutzenorientiert).
    2. Generiere ein strukturiertes Inhaltsverzeichnis mit 6-8 starken Kapiteln.
    
    WICHTIG: Antworte AUSSCHLIESSLICH in diesem JSON Format, kein anderer Text davor oder danach:
    {
      "titles": ["Titel 1", "Titel 2", "Titel 3"],
      "chapters": ["Kapitel 1:...", "Kapitel 2:...", "..."]
    }`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Prompt Studio Live (Publishing Hub)'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o',
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Die E-Book Nische lautet: ${niche}` }
          ]
        })
      });

      if (!response.ok) throw new Error('API Fehler');

      const data = await response.json();
      const parsed = JSON.parse(data.choices[0].message.content);
      
      setBookData({
        ...bookData,
        titles: parsed.titles,
        selectedTitle: parsed.titles[0],
        chapters: parsed.chapters
      });
      setCurrentStep(2);
      toast.success('Bestseller-Struktur wurde geschmiedet!', { icon: '🧠', style: { background: '#1f2937', color: '#fff' } });
    } catch (err) {
      console.error(err);
      toast.error('Generierung fehlgeschlagen.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCover = async () => {
    setIsGenerating(true);
    
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const systemPrompt = `Du bist ein meisterhafter Midjourney v6 Prompt Engineer für E-Book Cover.
    Der Buchtitel lautet: "${bookData.selectedTitle}".
    Die Nische ist: "${niche}".
    
    Erstelle EINEN einzigen, perfekten, englischen Midjourney-Prompt für dieses Buchcover.
    Der Prompt muss so aufgebaut sein:
    "Minimalist ebook cover for a book about [Thema/Feeling], featuring [Hauptmotiv/Symbol], [Farbpalette], cinematic lighting, ultra-sharp 8k resolution, modern corporate aesthetic --ar 2:3 --v 6.0"
    
    Kein Intro, kein Outro. Nur der rohe Prompt.`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [{ role: 'user', content: systemPrompt }]
        })
      });

      const data = await response.json();
      setBookData({
        ...bookData,
        coverPrompt: data.choices[0].message.content.trim().replace(/['"]/g, '')
      });
      setCurrentStep(3);
    } catch (err) {
      console.error(err);
      toast.error('Cover-Prompt fehlgeschlagen.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSalesPage = async () => {
    setIsGenerating(true);
    
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const systemPrompt = `Du bist ein Elite-Copywriter für digitale Produkte. 
    Das E-Book heißt: "${bookData.selectedTitle}".
    Die Zielgruppe/Nische: "${niche}".
    Die Struktur (Inhalt): ${bookData.chapters.join(', ')}.
    
    Schreibe eine kurze, extrem hochkonvertierende Verkaufsseite (Sales Copy) für Digistore24 oder Gumroad.
    - Starke Hook am Anfang (Pain-Point der Zielgruppe).
    - Kurz die Lösung erklären (das Buch).
    - 3-5 starke Bulletpoints (Nutzen, nicht Features).
    - Call to Action am Ende.
    
    Nutze Emojis und Markdown (**Fett**, ### Überschriften).`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o',
          messages: [{ role: 'user', content: systemPrompt }]
        })
      });

      const data = await response.json();
      setBookData({
        ...bookData,
        salesCopy: data.choices[0].message.content.trim()
      });
      setCurrentStep(4);
      toast.success('Verkaufsmaschine ist online!', { icon: '💰', style: { background: '#1f2937', color: '#fff' } });
    } catch (err) {
      console.error(err);
      toast.error('Sales-Copy fehlgeschlagen.');
    } finally {
      setIsGenerating(false);
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b border-gray-800 pb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 mb-4">
            <BookOpen size={32} className="text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Publishing Hub</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Vom ersten Gedanken bis zum fertigen digitalen Produkt in Rekordzeit. Unsere KI formt deine Idee in ein verkaufsfertiges Meisterwerk.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-4 md:gap-12 mb-16">
          <StepIndicator step={1} currentStep={currentStep} title="Architektur" icon={Sparkles} />
          <div className={`h-0.5 w-12 md:w-24 ${currentStep > 1 ? 'bg-emerald-500/50' : 'bg-gray-800'}`}></div>
          <StepIndicator step={2} currentStep={currentStep} title="Inhalt" icon={PenTool} />
          <div className={`h-0.5 w-12 md:w-24 ${currentStep > 2 ? 'bg-emerald-500/50' : 'bg-gray-800'}`}></div>
          <StepIndicator step={3} currentStep={currentStep} title="Design" icon={LayoutTemplate} />
          <div className={`h-0.5 w-12 md:w-24 ${currentStep > 3 ? 'bg-emerald-500/50' : 'bg-gray-800'}`}></div>
          <StepIndicator step={4} currentStep={currentStep} title="Verkauf" icon={ShoppingCart} />
        </div>

        {/* Workspace Area */}
        <div className="bg-gray-800/40 border border-gray-800 rounded-3xl p-8 min-h-[400px]">
          
          {/* Step 1: Architektur */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold mb-4">Definiere deine Nische</h2>
              <p className="text-gray-400 mb-8">Worüber soll dein E-Book handeln? Sei spezifisch, um ein kaufkräftiges Publikum anzuziehen.</p>
              
              <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 mb-8">
                <input 
                  type="text" 
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="z.B. Zeitmanagement für junge Eltern, SEO für Immobilienmakler..."
                  className="w-full bg-black/50 border border-gray-700 rounded-xl p-4 text-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-center mb-4"
                />
                <button 
                  onClick={generateStructure}
                  disabled={!niche.trim() || isGenerating}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  {isGenerating ? <><RefreshCw className="animate-spin" /> Analysiere Marktdaten...</> : <><Wand2 /> Struktur erschaffen</>}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Inhalt */}
          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Die Struktur steht.</h2>
                <button 
                  onClick={generateCover}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all flex items-center gap-2"
                >
                  Zum Design <ChevronRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-gray-500 uppercase tracking-wider text-xs font-bold mb-4">Titel-Vorschläge (Bestseller-Format)</h3>
                  <div className="space-y-3">
                    {bookData.titles.map((title, i) => (
                      <div 
                        key={i} 
                        onClick={() => setBookData({...bookData, selectedTitle: title})}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${bookData.selectedTitle === title ? 'bg-indigo-900/30 border-indigo-500 text-indigo-300' : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'}`}
                      >
                        {title}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-gray-500 uppercase tracking-wider text-xs font-bold mb-4">Inhaltsverzeichnis</h3>
                  <div className="space-y-3">
                    {bookData.chapters.map((chapter, i) => (
                      <div key={i} className="p-3 bg-gray-800/50 border border-gray-800 rounded-lg text-gray-300 text-sm">
                        {chapter}
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-all font-medium text-sm flex items-center justify-center gap-2">
                    <PenTool size={16} /> KI-Ghostwriter starten (Beta)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Design */}
          {currentStep === 3 && (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-8">
               <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Das Cover-Design.</h2>
                <button 
                  onClick={generateSalesPage}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-all flex items-center gap-2"
                >
                  Zum Verkaufsraum <ChevronRight size={18} />
                </button>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-pink-500/20">
                  <LayoutTemplate size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Midjourney / DALL-E Prompt</h3>
                <p className="text-gray-400 text-sm mb-6">Kopiere diesen Prompt in einen KI-Bildgenerator deiner Wahl, um ein hochprofessionelles E-Book Cover zu generieren.</p>
                
                <div className="bg-black/50 border border-gray-700 rounded-xl p-4 text-left relative group">
                  <code className="text-pink-300 font-mono text-sm leading-relaxed block pr-12">
                    {bookData.coverPrompt}
                  </code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(bookData.coverPrompt);
                      toast.success('Prompt kopiert!');
                    }}
                    className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-md transition-colors border border-gray-700"
                  >
                    <Copy size={16} />
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800">
                  <h4 className="font-bold text-gray-300 mb-2">Canva Integration</h4>
                  <p className="text-sm text-gray-500">Lade das generierte Bild in Canva hoch. Verwende für den Titel "{bookData.selectedTitle}" die Schriftart <span className="text-white font-bold">"Montserrat"</span> (Bold) in Weiß.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Verkauf */}
          {currentStep === 4 && (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-8">
               <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 mb-4">
                  <ShoppingCart size={32} />
                </div>
                <h2 className="text-3xl font-bold mb-2">Bereit für den Launch.</h2>
                <p className="text-gray-400">Dein digitales Produkt ist bereit für den Markt.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-900 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                  <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2"><Sparkles size={18} /> Sales Copy (Landingpage Text)</h3>
                  <div className="bg-black/50 border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-300 text-sm whitespace-pre-wrap">{bookData.salesCopy}</p>
                  </div>
                  <button className="mt-4 w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-all font-medium text-sm flex items-center justify-center gap-2">
                    <Copy size={16} /> Text kopieren
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-300 mb-2">Nächste Schritte</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" /> Erstelle einen Account bei Digistore24 oder Gumroad.</li>
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" /> Lade dein PDF-Ebook dort hoch.</li>
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" /> Kopiere die Sales Copy in die Produktbeschreibung.</li>
                    </ul>
                  </div>
                  
                  <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-emerald-500/20">
                    Neues Projekt starten
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
