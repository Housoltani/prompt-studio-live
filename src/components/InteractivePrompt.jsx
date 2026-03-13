import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function InteractivePrompt({ template, title }) {
  const [variables, setVariables] = useState({});
  const [copied, setCopied] = useState(false);

  // Finde alle Wörter in eckigen Klammern, z.B. [ZIELGRUPPE]
  useEffect(() => {
    const regex = /\[([^\]]+)\]/g;
    const matches = [...template.matchAll(regex)];
    const initialVars = {};
    matches.forEach(match => {
      initialVars[match[1]] = ''; // Initialer leerer Wert
    });
    setVariables(initialVars);
  }, [template]);

  const handleVarChange = (key, value) => {
    setVariables(prev => ({ ...prev, [key]: value }));
  };

  // Generiere den finalen Prompt in Echtzeit
  const getFinalPrompt = () => {
    let finalPrompt = template;
    Object.keys(variables).forEach(key => {
      const val = variables[key];
      // Wenn der Nutzer etwas eingibt, ersetze den Platzhalter. Sonst lass die Klammer stehen.
      if (val.trim() !== '') {
        finalPrompt = finalPrompt.replace(new RegExp(`\\[${key}\\]`, 'g'), val);
      }
    });
    return finalPrompt;
  };

  const copyPrompt = () => {
    const final = getFinalPrompt();
    navigator.clipboard.writeText(final);
    toast.success('Prompt kopiert!', {
      style: {
        borderRadius: '10px',
        background: '#1e293b',
        color: '#f8fafc',
        border: '1px solid #334155',
      },
      iconTheme: { primary: '#34d399', secondary: '#1e293b' },
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const finalPrompt = getFinalPrompt();
  const hasVariables = Object.keys(variables).length > 0;

  return (
    <div className="flex flex-col gap-3 mt-4 animate-fade-in">
      
      {/* Eingabefelder für gefundene Variablen */}
      {hasVariables && (
        <div className="grid grid-cols-2 gap-2 p-3 bg-slate-900/50 rounded-lg border border-blue-500/30">
          {Object.keys(variables).map(key => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{key}</label>
              <input 
                type="text" 
                placeholder={`Dein(e) ${key}...`}
                value={variables[key]}
                onChange={(e) => handleVarChange(key, e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
              />
            </div>
          ))}
        </div>
      )}

      {/* Live Preview des Prompts */}
      <div className="relative group/prompt">
        <div className="absolute top-2 right-2 opacity-0 group-hover/prompt:opacity-100 transition-opacity">
          <button 
            onClick={copyPrompt}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
          >
            {copied ? (
              <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Kopiert</>
            ) : (
              <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg> Kopieren</>
            )}
          </button>
        </div>
        <textarea 
          readOnly 
          value={finalPrompt}
          className="w-full h-24 bg-slate-950/50 border border-slate-700/50 rounded-lg p-3 pr-24 text-slate-300 font-mono text-xs leading-relaxed resize-none focus:outline-none"
        />
      </div>
    </div>
  );
}