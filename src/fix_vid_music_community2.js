import fs from 'fs';

const vids = './prompt-studio-live/src/components/VideoLibrary.jsx';
let cv = fs.readFileSync(vids, 'utf8');
cv = cv.replace(/placeholder="Suchen \(z\.B\. Cinematic, FPV, Drone\.\.\.\)"/, "placeholder={t?.vidLib?.searchPlaceholder || 'Suchen (z.B. Cinematic, FPV, Drone...)'}");
fs.writeFileSync(vids, cv);

const music = './prompt-studio-live/src/components/MusicLibrary.jsx';
let cm = fs.readFileSync(music, 'utf8');
cm = cm.replace(/placeholder="Suchen \(z\.B\. Epic, Synthwave, Lo-Fi\.\.\.\)"/, "placeholder={t?.musicLib?.searchPlaceholder || 'Suchen (z.B. Epic, Synthwave, Lo-Fi...)'}");
fs.writeFileSync(music, cm);

