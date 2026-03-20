import fs from 'fs';

const vids = './prompt-studio-live/src/components/VideoLibrary.jsx';
let contentVids = fs.readFileSync(vids, 'utf8');

if (!contentVids.includes('useLanguage')) {
  contentVids = contentVids.replace(/import \{ toast \} from 'react-hot-toast';/, "import { toast } from 'react-hot-toast';\nimport { useLanguage } from '../context/LanguageContext';");
  contentVids = contentVids.replace(/export default function VideoLibrary\(\) \{/, "export default function VideoLibrary() {\n  const { t } = useLanguage();");
}

contentVids = contentVids.replace(/>🎥 KI Video-Prompts</, ">{t?.vidLib?.title || '🎥 KI Video-Prompts'}<");
contentVids = contentVids.replace(/>Die besten Prompt-Strukturen für Sora, Runway Gen-3 \& Kling\.</, ">{t?.vidLib?.subtitle || 'Die besten Prompt-Strukturen für Sora, Runway Gen-3 & Kling.'}<");
contentVids = contentVids.replace(/placeholder="Suchen \(z\.B\. Cinematic, FPV, Drone\.\.\.\)"/, "placeholder={t?.vidLib?.searchPlaceholder || 'Suchen (z.B. Cinematic, FPV, Drone...)'}");
contentVids = contentVids.replace(/>Favoriten</, ">{t?.vidLib?.favoritesBtn || 'Favoriten'}<");

contentVids = contentVids.replace(/const categories = \['Alle', 'Cinematic', 'Action', 'Nature', 'Abstract', 'Drone FPV'\];/, 
`const categoryKeys = ['All', 'Cinematic', 'Action', 'Nature', 'Abstract', 'Drone'];
  const categories = categoryKeys.map(k => t?.vidLib?.['cat' + k] || k);
  const displayCategory = t?.vidLib?.['cat' + selectedCategory] || selectedCategory;`);

contentVids = contentVids.replace(/selectedCategory === 'Alle'/g, "(selectedCategory === 'Alle' || selectedCategory === 'All' || selectedCategory === 'الكل')");
contentVids = contentVids.replace(/setSelectedCategory\('Alle'\)/g, "setSelectedCategory('Alle')");

fs.writeFileSync(vids, contentVids);


const music = './prompt-studio-live/src/components/MusicLibrary.jsx';
let contentMusic = fs.readFileSync(music, 'utf8');

if (!contentMusic.includes('useLanguage')) {
  contentMusic = contentMusic.replace(/import \{ toast \} from 'react-hot-toast';/, "import { toast } from 'react-hot-toast';\nimport { useLanguage } from '../context/LanguageContext';");
  contentMusic = contentMusic.replace(/export default function MusicLibrary\(\) \{/, "export default function MusicLibrary() {\n  const { t } = useLanguage();");
}

contentMusic = contentMusic.replace(/>🎵 Hit-Labor</, ">{t?.musicLib?.title || '🎵 KI Music-Prompts'}<");
contentMusic = contentMusic.replace(/>Top-Prompts für Suno, Udio \& ElevenLabs\.</, ">{t?.musicLib?.subtitle || 'Top-Prompts für Suno, Udio & ElevenLabs.'}<");
contentMusic = contentMusic.replace(/placeholder="Suchen \(z\.B\. Epic, Synthwave, Lo-Fi\.\.\.\)"/, "placeholder={t?.musicLib?.searchPlaceholder || 'Suchen (z.B. Epic, Synthwave, Lo-Fi...)'}");
contentMusic = contentMusic.replace(/>Favoriten</, ">{t?.musicLib?.favoritesBtn || 'Favoriten'}<");

contentMusic = contentMusic.replace(/const categories = \['Alle', 'Epic', 'Synthwave', 'Lo-Fi', 'Pop', 'Rock', 'Cinematic'\];/, 
`const categoryKeys = ['All', 'Epic', 'Synthwave', 'Lo-Fi', 'Pop', 'Rock', 'Cinematic'];
  const categories = categoryKeys.map(k => t?.musicLib?.['cat' + k] || k);
  const displayCategory = t?.musicLib?.['cat' + selectedCategory] || selectedCategory;`);

contentMusic = contentMusic.replace(/selectedCategory === 'Alle'/g, "(selectedCategory === 'Alle' || selectedCategory === 'All' || selectedCategory === 'الكل')");
contentMusic = contentMusic.replace(/setSelectedCategory\('Alle'\)/g, "setSelectedCategory('Alle')");

fs.writeFileSync(music, contentMusic);


const comm = './prompt-studio-live/src/components/CommunityFeed.jsx';
let contentComm = fs.readFileSync(comm, 'utf8');

if (!contentComm.includes('useLanguage')) {
  contentComm = contentComm.replace(/import \{ toast \} from 'react-hot-toast';/, "import { toast } from 'react-hot-toast';\nimport { useLanguage } from '../context/LanguageContext';");
  contentComm = contentComm.replace(/export default function CommunityFeed\(\) \{/, "export default function CommunityFeed() {\n  const { t } = useLanguage();");
}

contentComm = contentComm.replace(/>🏆 Community Feed</, ">{t?.communityFeed?.title || '🏆 Community Feed'}<");
contentComm = contentComm.replace(/>Die besten Prompts der Community\. Täglich aktualisiert\.</, ">{t?.communityFeed?.subtitle || 'Die besten Prompts der Community. Täglich aktualisiert.'}<");

// categories translation helper
contentComm = contentComm.replace(/const filters = \['🔥 Trending', '✨ Neu', '👑 All Time'\];/, 
`const filterKeys = ['Trending', 'New', 'Top'];
  const filters = filterKeys.map(k => t?.communityFeed?.['filter' + k] || ('🔥 ' + k));`);
contentComm = contentComm.replace(/setFilter\('🔥 Trending'\)/g, "setFilter('🔥 Trending')");
contentComm = contentComm.replace(/filter === '🔥 Trending'/g, "(filter === '🔥 Trending' || filter === '🔥 رائج')");

contentComm = contentComm.replace(/const categories = \['Alle', 'Bilder', 'Videos', 'Musik', 'Text'\];/, 
`const categoryKeys = ['All', 'Images', 'Videos', 'Music', 'Text'];
  const categories = categoryKeys.map(k => t?.communityFeed?.['cat' + k] || k);`);
contentComm = contentComm.replace(/setCategory\('Alle'\)/g, "setCategory('Alle')");
contentComm = contentComm.replace(/category === 'Alle'/g, "(category === 'Alle' || category === 'All' || category === 'الكل')");

fs.writeFileSync(comm, contentComm);

