import fs from 'fs';

const vids = './prompt-studio-live/src/components/VideoLibrary.jsx';
let cv = fs.readFileSync(vids, 'utf8');

cv = cv.replace(/>\s*🎥 Video-Prompts Bibliothek\s*</, ">{t?.vidLib?.title || '🎥 Video-Prompts Bibliothek'}<");
cv = cv.replace(/>\s*Entdecke die besten Kamerafahrten, Animationen und Prompts für Sora, Runway Gen-3, Kling und Luma\.\s*</, ">{t?.vidLib?.subtitle || 'Entdecke die besten Kamerafahrten, Animationen und Prompts für Sora, Runway Gen-3, Kling und Luma.'}<");

fs.writeFileSync(vids, cv);

const music = './prompt-studio-live/src/components/MusicLibrary.jsx';
let cm = fs.readFileSync(music, 'utf8');

cm = cm.replace(/>\s*🎵 Hit-Labor \(Musik-Prompts\)\s*</, ">{t?.musicLib?.title || '🎵 Hit-Labor (Musik-Prompts)'}<");
cm = cm.replace(/>\s*Kopiere perfekte Song-Strukturen, Metatags und Lyrics für Suno, Udio und andere KI-Musik-Generatoren\.\s*</, ">{t?.musicLib?.subtitle || 'Kopiere perfekte Song-Strukturen, Metatags und Lyrics für Suno, Udio und andere KI-Musik-Generatoren.'}<");

fs.writeFileSync(music, cm);


const comm = './prompt-studio-live/src/components/CommunityFeed.jsx';
let cc = fs.readFileSync(comm, 'utf8');

cc = cc.replace(/Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Feed<\/span>/, "{t?.communityFeed?.title || 'Community Feed'}");
cc = cc.replace(/>\s*Die globale Galerie\. Entdecke die besten Prompts der Community, sammle Inspirationen und verdiene Sparks für deine eigenen Meisterwerke\.\s*</, ">{t?.communityFeed?.subtitle || 'Die globale Galerie. Entdecke die besten Prompts der Community, sammle Inspirationen und verdiene Sparks für deine eigenen Meisterwerke.'}<");

fs.writeFileSync(comm, cc);
