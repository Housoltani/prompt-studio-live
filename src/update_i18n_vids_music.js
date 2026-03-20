import fs from 'fs';

const i18nPath = './prompt-studio-live/src/i18n.js';
let content = fs.readFileSync(i18nPath, 'utf8');

const deAdditions = `vidLib: {
      title: "🎥 KI Video-Prompts",
      subtitle: "Die besten Prompt-Strukturen für Sora, Runway Gen-3 & Kling.",
      searchPlaceholder: "Suchen (z.B. Cinematic, FPV, Drone...)",
      uploadBtn: "Upload",
      favoritesBtn: "Favoriten",
      catAll: "Alle",
      catCinematic: "Cinematic",
      catAction: "Action",
      catNature: "Nature",
      catAbstract: "Abstract",
      catDrone: "Drone FPV"
    },
    musicLib: {
      title: "🎵 KI Music-Prompts",
      subtitle: "Top-Prompts für Suno, Udio & ElevenLabs.",
      searchPlaceholder: "Suchen (z.B. Epic, Synthwave, Lo-Fi...)",
      uploadBtn: "Upload",
      favoritesBtn: "Favoriten",
      catAll: "Alle",
      catEpic: "Epic",
      catSynthwave: "Synthwave",
      catLoFi: "Lo-Fi",
      catPop: "Pop",
      catRock: "Rock",
      catCinematic: "Cinematic"
    },
    communityFeed: {
      title: "🏆 Community Feed",
      subtitle: "Die besten Prompts der Community. Täglich aktualisiert.",
      filterTrending: "🔥 Trending",
      filterNew: "✨ Neu",
      filterTop: "👑 All Time",
      catAll: "Alle",
      catImages: "Bilder",
      catVideos: "Videos",
      catMusic: "Musik",
      catText: "Text",
      copySuccess: "Prompt kopiert!"
    }`;

const enAdditions = `vidLib: {
      title: "🎥 AI Video Prompts",
      subtitle: "The best prompt structures for Sora, Runway Gen-3 & Kling.",
      searchPlaceholder: "Search (e.g. Cinematic, FPV, Drone...)",
      uploadBtn: "Upload",
      favoritesBtn: "Favorites",
      catAll: "All",
      catCinematic: "Cinematic",
      catAction: "Action",
      catNature: "Nature",
      catAbstract: "Abstract",
      catDrone: "Drone FPV"
    },
    musicLib: {
      title: "🎵 AI Music Prompts",
      subtitle: "Top prompts for Suno, Udio & ElevenLabs.",
      searchPlaceholder: "Search (e.g. Epic, Synthwave, Lo-Fi...)",
      uploadBtn: "Upload",
      favoritesBtn: "Favorites",
      catAll: "All",
      catEpic: "Epic",
      catSynthwave: "Synthwave",
      catLoFi: "Lo-Fi",
      catPop: "Pop",
      catRock: "Rock",
      catCinematic: "Cinematic"
    },
    communityFeed: {
      title: "🏆 Community Feed",
      subtitle: "The best prompts from the community. Updated daily.",
      filterTrending: "🔥 Trending",
      filterNew: "✨ New",
      filterTop: "👑 All Time",
      catAll: "All",
      catImages: "Images",
      catVideos: "Videos",
      catMusic: "Music",
      catText: "Text",
      copySuccess: "Prompt copied!"
    }`;

const arAdditions = `vidLib: {
      title: "🎥 تلقينات الفيديو",
      subtitle: "أفضل هياكل التلقين لـ Sora و Runway Gen-3 و Kling.",
      searchPlaceholder: "...بحث (مثال: سينمائي، طائرة بدون طيار)",
      uploadBtn: "رفع",
      favoritesBtn: "المفضلة",
      catAll: "الكل",
      catCinematic: "سينمائي",
      catAction: "حركة",
      catNature: "طبيعة",
      catAbstract: "تجريدي",
      catDrone: "طائرة مسيرة"
    },
    musicLib: {
      title: "🎵 تلقينات الموسيقى",
      subtitle: ".ElevenLabs و Udio و Suno أفضل التلقينات لـ",
      searchPlaceholder: "...بحث (مثال: ملحمي، لو-في)",
      uploadBtn: "رفع",
      favoritesBtn: "المفضلة",
      catAll: "الكل",
      catEpic: "ملحمي",
      catSynthwave: "سينثويف",
      catLoFi: "لو-في",
      catPop: "بوب",
      catRock: "روك",
      catCinematic: "سينمائي"
    },
    communityFeed: {
      title: "🏆 مجتمع",
      subtitle: "أفضل التلقينات من المجتمع. يتم تحديثها يوميا.",
      filterTrending: "🔥 رائج",
      filterNew: "✨ جديد",
      filterTop: "👑 الأفضل",
      catAll: "الكل",
      catImages: "صور",
      catVideos: "فيديو",
      catMusic: "موسيقى",
      catText: "نص",
      copySuccess: "تم النسخ!"
    }`;

content = content.replace(/de:\s*\{/, 'de: {\n    ' + deAdditions + ',');
content = content.replace(/en:\s*\{/, 'en: {\n    ' + enAdditions + ',');
content = content.replace(/ar:\s*\{/, 'ar: {\n    ' + arAdditions + ',');

fs.writeFileSync(i18nPath, content);
