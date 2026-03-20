import fs from 'fs';

const path = './prompt-studio-live/src/components/ModelCompare.jsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('useLanguage')) {
  content = content.replace(/import \{ useCredits \} from '\.\.\/context\/CreditsContext';/, "import { useCredits } from '../context/CreditsContext';\nimport { useLanguage } from '../context/LanguageContext';");
  content = content.replace(/export default function ModelCompare\(\) \{/, "export default function ModelCompare() {\n  const { t } = useLanguage();");
}

content = content.replace(/toast\.error\('Prompt fehlt!'\)/g, "toast.error(t?.modelCompare?.missingPrompt || 'Prompt fehlt!')");
content = content.replace(/'Beide KI-Systeme initiieren Rendering\.\.\.'/g, "t?.modelCompare?.initText || 'Beide KI-Systeme initiieren Rendering...'");
content = content.replace(/ist fertig!'\)/g, " ${(t?.modelCompare?.doneText || 'ist fertig!')}`)");
content = content.replace(/>⚖️ Modell-Vergleich</g, ">{t?.modelCompare?.title || '⚖️ Modell-Vergleich'}<");
content = content.replace(/>Gleicher Prompt, unterschiedliche KIs\. Wer liefert das beste Ergebnis\?</g, ">{t?.modelCompare?.subtitle || 'Gleicher Prompt, unterschiedliche KIs. Wer liefert das beste Ergebnis?'}<");
content = content.replace(/>Dein Universal-Prompt</g, ">{t?.modelCompare?.promptLabel || 'Dein Universal-Prompt'}<");
content = content.replace(/>🚀 Splitt-Screen Render starten \(15 Sparks\)</g, ">{t?.modelCompare?.compareBtn || '🚀 Splitt-Screen Render starten (15 Sparks)'}<");
content = content.replace(/>🤖 Modell A</g, ">{t?.modelCompare?.modelALabel || '🤖 Modell A'}<");
content = content.replace(/>🤖 Modell B</g, ">{t?.modelCompare?.modelBLabel || '🤖 Modell B'}<");
content = content.replace(/>Warte auf Render\.\.\.</g, ">{t?.modelCompare?.waitingText || 'Warte auf Render...'}<");

fs.writeFileSync(path, content);
