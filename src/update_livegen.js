import fs from 'fs';

const liveGenPath = './prompt-studio-live/src/components/LiveGenerator.jsx';
let content = fs.readFileSync(liveGenPath, 'utf8');

// Replace the hardcoded persona array with a function
content = content.replace(/const PERSONAS = \[[\s\S]*?\];/, `
const getPersonas = (t) => [
  { id: 'default', icon: '🤖', name: t?.liveGen?.assistant || 'Standard Assistent', prompt: 'Du bist ein hilfreicher KI-Assistent.' },
  { id: 'prompt_engineer', icon: '🎨', name: t?.liveGen?.engineer || 'Prompt Engineer', prompt: 'Du bist ein professioneller Prompt-Engineer.' },
  { id: 'seo_expert', icon: '📈', name: t?.liveGen?.seo || 'SEO Copywriter', prompt: 'Du bist ein SEO-Experte.' },
  { id: 'developer', icon: '💻', name: t?.liveGen?.dev || 'Senior Developer', prompt: 'Du bist ein Senior Developer.' },
  { id: 'translator', icon: '🌍', name: t?.liveGen?.translator || 'Profi Übersetzer', prompt: 'Übersetze die Texte präzise und idiomatisch.' },
  { id: 'summarizer', icon: '✂️', name: t?.liveGen?.summarizer || 'Text Zusammenfasser', prompt: 'Fasse lange Texte auf die wichtigsten Kernaussagen zusammen.' },
  { id: 'data_analyst', icon: '📊', name: t?.liveGen?.analyst || 'Data Analyst', prompt: 'Analysiere Daten und erstelle übersichtliche Tabellen.' },
  { id: 'social_media', icon: '📱', name: t?.liveGen?.social || 'Social Media Manager', prompt: 'Schreibe virale Posts mit passenden Hashtags und Emojis.' }
];
`);

// Inside component, set initial persona using t if possible, or update it
content = content.replace(/const \[persona, setPersona\] = useState\(PERSONAS\[0\]\);/, `const [persona, setPersona] = useState(() => getPersonas()[0]);\n  // Need to update persona array when language changes\n  const personas = getPersonas(t);`);

content = content.replace(/PERSONAS\.map/g, 'personas.map');

// Toasts
content = content.replace(/'Spracherkennung wird von diesem Browser nicht unterstützt\.'/g, `t?.liveGen?.micNotSupported || 'Spracherkennung wird von diesem Browser nicht unterstützt.'`);
content = content.replace(/'Spreche jetzt\...', { icon: '🎙️' }/g, `t?.liveGen?.speakNow || 'Spreche jetzt...', { icon: '🎙️' }`);
content = content.replace(/'Nicht genügend Sparks! Bitte aufladen\.'/g, `t?.liveGen?.creditError || 'Nicht genügend Sparks! Bitte aufladen.'`);
content = content.replace(/'Netzwerkfehler oder ungültige Antwort\.'/g, `t?.liveGen?.reqError || 'Netzwerkfehler oder ungültige Antwort.'`);

// UI elements
content = content.replace(/'📝 Text'/g, `t?.liveGen?.modeText || '📝 Text'`);
content = content.replace(/'🖼️ Bild'/g, `t?.liveGen?.modeImage || '🖼️ Bild'`);
content = content.replace(/'🎥 Video'/g, `t?.liveGen?.modeVideo || '🎥 Video'`);
content = content.replace(/'🎵 Musik'/g, `t?.liveGen?.modeMusic || '🎵 Musik'`);
content = content.replace(/>📝 Text</g, `>{t?.liveGen?.modeText || '📝 Text'}<`);
content = content.replace(/>🖼️ Bild</g, `>{t?.liveGen?.modeImage || '🖼️ Bild'}<`);
content = content.replace(/>🎥 Video</g, `>{t?.liveGen?.modeVideo || '🎥 Video'}<`);
content = content.replace(/>🎵 Musik</g, `>{t?.liveGen?.modeMusic || '🎵 Musik'}<`);
content = content.replace(/>Chat leeren</g, `>{t?.liveGen?.clearChat || 'Chat leeren'}<`);
content = content.replace(/>🎭 Persona</g, `>{t?.liveGen?.personaLabel || '🎭 Persona'}<`);
content = content.replace(/>🤖 Modell</g, `>{t?.liveGen?.modelLabel || '🤖 Modell'}<`);
content = content.replace(/>⚙️ Parameter</g, `>{t?.liveGen?.paramsLabel || '⚙️ Parameter'}<`);
content = content.replace(/>Kreativität \(Temperature\)</g, `>{t?.liveGen?.tempLabel || 'Kreativität (Temperature)'}<`);
content = content.replace(/>Max Tokens</g, `>{t?.liveGen?.tokensLabel || 'Max Tokens'}<`);
content = content.replace(/>🔗 Bild-URL \(optional, für Vision-Modelle\)</g, `>{t?.liveGen?.imgUrlLabel || '🔗 Bild-URL (optional, für Vision-Modelle)'}<`);
content = content.replace(/>Generiert\.\.\.</g, `>{t?.liveGen?.generating || 'Generiert...'}<`);
content = content.replace(/placeholder="Schreibe eine Nachricht oder einen Prompt\.\.\."/g, `placeholder={t?.liveGen?.msgPlaceholder || "Schreibe eine Nachricht oder einen Prompt..."}`);

fs.writeFileSync(liveGenPath, content);
