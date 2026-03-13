import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function PromptExtractor() {
  const [image, setImage] = useState(null);
  const [extractedPrompt, setExtractedPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  // Bild in Base64 umwandeln
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // Limit 5MB
        toast.error('Bild ist zu groß! Maximal 5MB erlaubt.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setExtractedPrompt(''); // Reset vorherigen Prompt
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload({ target: { files: e.dataTransfer.files } });
      e.dataTransfer.clearData();
    }
  };

  const extractPrompt = async () => {
    if (!image) {
      toast.error('Bitte lade zuerst ein Bild hoch!');
      return;
    }

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      toast.error('API Key fehlt! Bitte in der .env Datei als VITE_OPENAI_API_KEY eintragen.');
      return;
    }

    setLoading(true);
    setExtractedPrompt('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: [
                { 
                  type: 'text', 
                  text: 'Du bist ein Experte für Midjourney Prompt Engineering. Analysiere dieses Bild im Detail und erstelle einen exakten, professionellen Midjourney-Prompt (auf Englisch) dafür. Beschreibe das Hauptmotiv, den Hintergrund, den Kunststil, die Beleuchtung, die Kameraperspektive und nenne relevante Künstler oder Engines (wie Unreal Engine 5, 8k, Octane Render). Gib NUR den Prompt zurück, keine Einleitung oder Erklärung.' 
                },
                { 
                  type: 'image_url', 
                  image_url: { url: image } 
                }
              ]
            }
          ],
          max_tokens: 300,
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setExtractedPrompt(data.choices[0].message.content);
        toast.success('Prompt erfolgreich extrahiert!');
      } else {
        toast.error(`Fehler: ${data.error?.message || 'Unbekannter Fehler'}`);
      }
    } catch (error) {
      toast.error('Verbindungsfehler zur OpenAI API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl animate-fade-in mx-auto mt-4">
      <h2 className="text-3xl font-bold mb-2">🔄 Prompt Extractor</h2>
      <p className="text-slate-400 mb-8">Lade ein Bild hoch und GPT-4o generiert dir den perfekten Midjourney-Prompt dafür.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Upload Zone */}
        <div 
          className="border-2 border-dashed border-slate-600 rounded-2xl bg-slate-800/50 p-8 flex flex-col items-center justify-center min-h-[400px] text-center transition-colors hover:bg-slate-800/80 hover:border-blue-500 cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('image-upload').click()}
        >
          <input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageUpload} 
          />
          
          {image ? (
            <div className="relative w-full h-full flex flex-col items-center">
              <img src={image} alt="Upload Preview" className="max-h-64 object-contain rounded-xl mb-4 shadow-xl border border-slate-700" />
              <button 
                onClick={(e) => { e.stopPropagation(); setImage(null); setExtractedPrompt(''); }}
                className="text-xs text-red-400 font-bold hover:text-red-300 transition-colors uppercase tracking-wider"
              >
                Anderes Bild wählen
              </button>
            </div>
          ) : (
            <>
              <svg className="w-16 h-16 text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              <h3 className="text-lg font-bold text-slate-300 mb-2">Drag & Drop dein Bild hier</h3>
              <p className="text-sm text-slate-500">oder klicke zum Auswählen (JPG, PNG, max. 5MB)</p>
            </>
          )}
        </div>

        {/* Result Zone */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex-grow flex flex-col">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-700 pb-4">
              Reverse Engineering <span className="text-emerald-400">KI</span>
            </h3>

            {/* Action Button */}
            <button 
              onClick={extractPrompt}
              disabled={loading || !image}
              className={`w-full flex justify-center items-center gap-2 px-6 py-4 rounded-xl font-bold text-white transition-colors text-lg shadow-lg ${loading || !image ? 'bg-indigo-600/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
            >
              {loading ? (
                <><svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Analysiere Bild...</>
              ) : (
                <><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg> Prompt Extrahieren</>
              )}
            </button>

            {/* Output */}
            {extractedPrompt && (
              <div className="mt-6 animate-fade-in flex flex-col flex-grow">
                <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-4 flex-grow relative group">
                  <textarea 
                    readOnly
                    value={extractedPrompt}
                    className="w-full h-full min-h-[150px] bg-transparent text-slate-200 font-mono text-sm leading-relaxed resize-none focus:outline-none"
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(extractedPrompt);
                      toast.success('Prompt kopiert!');
                    }}
                    className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded text-xs transition-colors shadow-lg"
                  >
                    Kopieren
                  </button>
                </div>
              </div>
            )}
            {!extractedPrompt && !loading && (
              <div className="flex-grow flex items-center justify-center text-slate-500 text-sm mt-6 text-center italic">
                Lade ein Bild hoch und klicke auf "Prompt Extrahieren", um die Magie zu starten.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}