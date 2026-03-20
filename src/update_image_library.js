import fs from 'fs';

const path = './prompt-studio-live/src/components/ImageLibrary.jsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('useLanguage')) {
  content = content.replace(/import \{ toast \} from 'react-hot-toast';/, "import { toast } from 'react-hot-toast';\nimport { useLanguage } from '../context/LanguageContext';");
  content = content.replace(/export default function ImageLibrary\(\) \{/, "export default function ImageLibrary() {\n  const { t } = useLanguage();");
}

content = content.replace(/>🖼️ KI Bild-Prompts</, ">{t?.imgLib?.title || '🖼️ KI Bild-Prompts'}<");
content = content.replace(/>Über 5\.000 handverlesene Prompts für Midjourney, DALL-E 3 \& Stable Diffusion\.</, ">{t?.imgLib?.subtitle || 'Über 5.000 handverlesene Prompts für Midjourney, DALL-E 3 & Stable Diffusion.'}<");
content = content.replace(/placeholder="Suchen \(z\.B\. Cyberpunk, Portrait\.\.\.\)"/, "placeholder={t?.imgLib?.searchPlaceholder || 'Suchen (z.B. Cyberpunk, Portrait...)'}");
content = content.replace(/>Favoriten</, ">{t?.imgLib?.favoritesBtn || 'Favoriten'}<");

// categories translation helper
content = content.replace(/const categories = \['Alle', 'People', 'Romance', '3D', 'Character', 'Design', 'Realistic', 'Cyberpunk', 'Nature', 'Anime', 'Fantasy', 'Architecture', 'Vehicles', 'Food'\];/, 
`const categoryKeys = ['All', 'People', 'Romance', '3D', 'Character', 'Design', 'Realistic', 'Cyberpunk', 'Nature', 'Anime', 'Fantasy', 'Architecture', 'Vehicles', 'Food'];
  const categories = categoryKeys.map(k => t?.imgLib?.['cat' + k] || k);
  
  // Update state when language changes, maybe simple fallback
  const displayCategory = t?.imgLib?.['cat' + selectedCategory] || selectedCategory;`);

content = content.replace(/selectedCategory === 'Alle'/g, "(selectedCategory === 'Alle' || selectedCategory === 'All' || selectedCategory === 'الكل')");
content = content.replace(/setSelectedCategory\('Alle'\)/g, "setSelectedCategory('Alle')");

fs.writeFileSync(path, content);
