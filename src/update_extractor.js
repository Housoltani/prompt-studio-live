import fs from 'fs';

const extractorPath = './prompt-studio-live/src/components/PromptExtractor.jsx';
let content = fs.readFileSync(extractorPath, 'utf8');

if (!content.includes('useLanguage')) {
  content = content.replace(/import \{ useState \} from 'react';/, "import { useState } from 'react';\nimport { useLanguage } from '../context/LanguageContext';");
  content = content.replace(/export default function PromptExtractor\(\) \{/, "export default function PromptExtractor() {\n  const { t } = useLanguage();");
}

content = content.replace(/>🔄 Prompt Extractor</, ">{t?.promptExtractor?.title || '🔄 Prompt Extractor'}<");
content = content.replace(/>Bild hochladen und Prompt extrahieren\.</, ">{t?.promptExtractor?.subtitle || 'Bild hochladen und Prompt extrahieren.'}<");
content = content.replace(/>Bild hochladen</, ">{t?.promptExtractor?.uploadBtn || 'Bild hochladen'}<");
content = content.replace(/>Extrahieren</, ">{t?.promptExtractor?.extractBtn || 'Extrahieren'}<");
content = content.replace(/>Extrahierter Prompt</, ">{t?.promptExtractor?.resultTitle || 'Extrahierter Prompt'}<");

fs.writeFileSync(extractorPath, content);
