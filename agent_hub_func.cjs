const fs = require('fs');
const path = '/Users/houcemsoltani/.openclaw/workspace/prompt-studio-live/src/components/AgentsHub.jsx';
let content = fs.readFileSync(path, 'utf8');

// Add useNavigate and SoundEngine
content = content.replace(
  "import { toast } from 'react-hot-toast';",
  "import { toast } from 'react-hot-toast';\nimport { useNavigate } from 'react-router-dom';\nimport { soundEngine } from '../utils/SoundEngine';"
);

// Define detailed agent configurations
const newCategories = `
const categories = [
  {
    title: "Produktivität & Office",
    agents: [
      { id: "super_agent", name: "Super-Agent", icon: "🦸‍♂️", color: "from-blue-500 to-indigo-600", model: "openai/gpt-4o", prompt: "Du bist ein extrem fähiger, allumfassender Super-Agent. Antworte brillant und präzise." },
      { id: "doc_agent", name: "KI-Dokumente", icon: "📄", color: "from-sky-400 to-blue-500", model: "anthropic/claude-3.5-sonnet", prompt: "Du bist ein exzellenter Texter für formelle Dokumente, Briefe und Berichte." },
      { id: "sheet_agent", name: "KI-Tabellen", icon: "📊", color: "from-emerald-400 to-teal-500", model: "openai/gpt-4o", prompt: "Du bist ein Excel- und Google Sheets Experte. Erstelle komplexe Formeln und Makros." },
      { id: "slide_agent", name: "Präsentationen", icon: "📽️", color: "from-rose-400 to-red-500", model: "anthropic/claude-3.5-sonnet", prompt: "Du schreibst überzeugende und strukturierte Slide-Decks für Präsentationen." },
      { id: "meeting_agent", name: "Besprechungen", icon: "🤝", color: "from-orange-400 to-amber-500", model: "meta-llama/llama-3-8b-instruct:free", prompt: "Du fasst Meeting-Notizen brillant zusammen und erstellst Action-Items." },
    ]
  },
  {
    title: "Kreativität & Medien",
    agents: [
      { id: "image_agent", name: "KI-Bild", icon: "🖼️", color: "from-pink-500 to-rose-500", model: "image/flux", prompt: "" },
      { id: "video_agent", name: "KI-Video", icon: "🎬", color: "from-fuchsia-500 to-purple-600", model: "video/sora-2-t2v", prompt: "" },
      { id: "design_agent", name: "KI-Designer", icon: "✨", color: "from-violet-400 to-purple-500", model: "anthropic/claude-3.5-sonnet", prompt: "Du bist ein UX/UI Design Experte. Kritisiere Interfaces und schlage moderne Layouts vor." },
      { id: "audio_agent", name: "Audio & Pods", icon: "🎙️", color: "from-yellow-400 to-orange-500", model: "audio/elevenlabs", prompt: "" },
      { id: "clip_agent", name: "Clip-Genie", icon: "✂️", color: "from-red-500 to-rose-600", model: "video/kling-3-std-t2v", prompt: "" },
    ]
  },
  {
    title: "Entwicklung & Forschung",
    agents: [
      { id: "dev_agent", name: "KI-Entwickler", icon: "💻", color: "from-slate-600 to-slate-800", model: "openai/gpt-4o", prompt: "Du bist ein Senior Software Developer. Antworte mit exzellentem, sicherem und sauberem Code." },
      { id: "research_agent", name: "Tiefenrecherche", icon: "🔍", color: "from-cyan-500 to-blue-600", model: "deepseek/deepseek-r1", prompt: "Du bist ein Recherche-Agent. Durchsuche Daten akribisch und erstelle wissenschaftlich fundierte Berichte." },
      { id: "fact_agent", name: "Faktencheck", icon: "✅", color: "from-emerald-500 to-green-600", model: "google/gemini-pro-1.5", prompt: "Du bist ein Faktenchecker. Überprüfe alle Aussagen auf Wahrheit und nenne Quellen." },
      { id: "translate_agent", name: "Übersetzer", icon: "🌍", color: "from-indigo-400 to-blue-500", model: "openai/gpt-3.5-turbo", prompt: "Du bist ein simultaner Polyglott-Übersetzer. Übersetze präzise und erhalte den Tonfall." },
      { id: "custom_agent", name: "Eigener Agent", icon: "⚙️", color: "from-gray-500 to-slate-600", model: "openai/gpt-4o", prompt: "Lass uns einen neuen Agenten bauen." },
    ]
  }
];
`;

content = content.replace(/const categories = \[[\s\S]*?\];\n/, newCategories);

// Add useNavigate hook and routing logic
const handleFn = `
  const navigate = useNavigate();

  const handleAgentClick = (agent) => {
    soundEngine.playClick();
    toast.success(\`\${agent.name} bootet...\`, {
      icon: agent.icon,
      style: { background: '#1e293b', color: '#fff', border: '1px solid #3b82f6' }
    });
    
    // Store selected agent in localStorage/state (we use localStorage for simplicity across unmounts)
    localStorage.setItem('activeAgent', JSON.stringify({
      id: agent.id,
      name: agent.name,
      icon: agent.icon,
      model: agent.model,
      prompt: agent.prompt
    }));

    setTimeout(() => {
      navigate('/app/generator'); // Boot into the Live Generator room
    }, 600);
  };
`;
content = content.replace(/  const handleAgentClick = \([\s\S]*?};\n/, handleFn);

// Fix onClick handler to pass the whole agent object
content = content.replace("onClick={() => handleAgentClick(agent.name)}", "onClick={() => handleAgentClick(agent)}");
content = content.replace("onMouseEnter={() => soundEngine.playHover()}", "onMouseEnter={() => soundEngine.playHover()}"); // Add hover sounds
const classLine = "className=\"glass-card bg-slate-800/40 hover:bg-slate-700/60 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center cursor-pointer group transition-all duration-300 hover:-translate-y-2 border border-slate-700/50 hover:border-blue-500/30\"";
const newClassLine = "className=\"glass-card bg-slate-800/40 hover:bg-slate-700/60 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center cursor-pointer group transition-all duration-300 hover:-translate-y-2 border border-slate-700/50 hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]\" onMouseEnter={() => soundEngine.playHover()}";
content = content.replace(classLine, newClassLine);


fs.writeFileSync(path, content);
console.log('AgentsHub upgraded with routing and payloads!');
