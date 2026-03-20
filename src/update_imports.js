import fs from 'fs';

let contentMixer = fs.readFileSync('./prompt-studio-live/src/components/PromptMixer.jsx', 'utf8');
contentMixer = contentMixer.replace(/import \{ toast \} from 'react-hot-toast';/, "import { toast } from 'react-hot-toast';\nimport { useLanguage } from '../context/LanguageContext';");
fs.writeFileSync('./prompt-studio-live/src/components/PromptMixer.jsx', contentMixer);

let contentExt = fs.readFileSync('./prompt-studio-live/src/components/PromptExtractor.jsx', 'utf8');
contentExt = contentExt.replace(/import \{ toast \} from 'react-hot-toast';/, "import { toast } from 'react-hot-toast';\nimport { useLanguage } from '../context/LanguageContext';");
fs.writeFileSync('./prompt-studio-live/src/components/PromptExtractor.jsx', contentExt);
