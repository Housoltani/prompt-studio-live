const fs = require('fs');
const path = '/Users/houcemsoltani/.openclaw/workspace/prompt-studio-live/src/components/LiveGenerator.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add hook to read the activeAgent on mount
const effectHook = `  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Read Agent from localStorage on mount
  useEffect(() => {
    const savedAgentStr = localStorage.getItem('activeAgent');
    if (savedAgentStr) {
      try {
        const parsed = JSON.parse(savedAgentStr);
        // Inject into Persona list if it's not default
        const customPersona = { id: parsed.id, name: parsed.icon + " " + parsed.name, prompt: parsed.prompt };
        setPersona(customPersona);
        if (parsed.model) setModel(parsed.model);
        
        // Show welcome message
        setMessages([{
          role: 'assistant',
          content: \`\${parsed.icon} \${parsed.name} online und bereit für Kommandos. Wie kann ich helfen?\`,
          modelName: parsed.name
        }]);

        // Cleanup so it doesn't trigger every time we enter the generator via sidebar
        localStorage.removeItem('activeAgent');
      } catch (err) {}
    }
  }, []);`;

content = content.replace(/  \/\/ Auto-scroll to bottom of chat[\s\S]*?\}, \[messages\]\);/, effectHook);

// 2. Hide specific Personas on the fly (since we injected our active agent as the selected Persona)
const personaRender = `              {PERSONAS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPersona(p)}
                  className={\`w-full text-left px-3 py-2 rounded-lg border text-sm transition-all \${persona.id === p.id ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}\`}
                >
                  {p.name}
                </button>
              ))}`;

const customPersonaRender = `              {/* Custom Injected Agent */
                !PERSONAS.find(p => p.id === persona.id) && (
                  <button className="w-full text-left px-3 py-2 rounded-lg border text-sm transition-all bg-emerald-600/20 border-emerald-500 text-emerald-400 font-bold mb-2 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    {persona.name} (Aktiv)
                  </button>
                )
              }
              {PERSONAS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPersona(p)}
                  className={\`w-full text-left px-3 py-2 rounded-lg border text-sm transition-all \${persona.id === p.id ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}\`}
                >
                  {p.name}
                </button>
              ))}`;

content = content.replace(personaRender, customPersonaRender);

// 3. Fix the top title if a specific agent is active
content = content.replace(
  `<h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">✨ Pro Live Generator</h2>`,
  `<h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">{!PERSONAS.find(p => p.id === persona.id) ? persona.name + ' Terminal' : '✨ Pro Live Generator'}</h2>`
);

fs.writeFileSync(path, content);
console.log('LiveGenerator capable of receiving Agent missions!');
