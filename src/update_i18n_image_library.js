import fs from 'fs';

const i18nPath = './prompt-studio-live/src/i18n.js';
let content = fs.readFileSync(i18nPath, 'utf8');

const deImgLib = `imgLib: {
      title: "🖼️ KI Bild-Prompts",
      subtitle: "Über 5.000 handverlesene Prompts für Midjourney, DALL-E 3 & Stable Diffusion.",
      searchPlaceholder: "Suchen (z.B. Cyberpunk, Portrait...)",
      uploadBtn: "Upload",
      favoritesBtn: "Favoriten",
      catAll: "Alle",
      catPeople: "People",
      catRomance: "Romance",
      cat3D: "3D",
      catCharacter: "Character",
      catDesign: "Design",
      catRealistic: "Realistic",
      catCyberpunk: "Cyberpunk",
      catNature: "Nature",
      catAnime: "Anime",
      catFantasy: "Fantasy",
      catArchitecture: "Architecture",
      catVehicles: "Vehicles",
      catFood: "Food"
    }`;

const enImgLib = `imgLib: {
      title: "🖼️ AI Image Prompts",
      subtitle: "Over 5,000 hand-picked prompts for Midjourney, DALL-E 3 & Stable Diffusion.",
      searchPlaceholder: "Search (e.g. Cyberpunk, Portrait...)",
      uploadBtn: "Upload",
      favoritesBtn: "Favorites",
      catAll: "All",
      catPeople: "People",
      catRomance: "Romance",
      cat3D: "3D",
      catCharacter: "Character",
      catDesign: "Design",
      catRealistic: "Realistic",
      catCyberpunk: "Cyberpunk",
      catNature: "Nature",
      catAnime: "Anime",
      catFantasy: "Fantasy",
      catArchitecture: "Architecture",
      catVehicles: "Vehicles",
      catFood: "Food"
    }`;

const arImgLib = `imgLib: {
      title: "🖼️ تلقينات الصور",
      subtitle: "أكثر من 5000 تلقين مختار بعناية لـ Midjourney و DALL-E 3 و Stable Diffusion.",
      searchPlaceholder: "...بحث (مثال: سايبربانك، صورة شخصية)",
      uploadBtn: "رفع",
      favoritesBtn: "المفضلة",
      catAll: "الكل",
      catPeople: "أشخاص",
      catRomance: "رومانسية",
      cat3D: "ثلاثي الأبعاد",
      catCharacter: "شخصيات",
      catDesign: "تصميم",
      catRealistic: "واقعي",
      catCyberpunk: "سايبربانك",
      catNature: "طبيعة",
      catAnime: "أنيمي",
      catFantasy: "خيال",
      catArchitecture: "هندسة معمارية",
      catVehicles: "مركبات",
      catFood: "طعام"
    }`;

content = content.replace(/de:\s*\{/, 'de: {\n    ' + deImgLib + ',');
content = content.replace(/en:\s*\{/, 'en: {\n    ' + enImgLib + ',');
content = content.replace(/ar:\s*\{/, 'ar: {\n    ' + arImgLib + ',');

fs.writeFileSync(i18nPath, content);
