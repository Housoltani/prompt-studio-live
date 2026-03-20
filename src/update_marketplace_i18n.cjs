const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'i18n.js');
let content = fs.readFileSync(targetPath, 'utf8');

if (!content.includes('marketplace: {')) {
  // We need to inject marketplace translations
  const marketplaceDe = `    marketplace: {
      title: "💰 Prompt Marktplatz",
      subtitle: "Verkaufe deine besten Prompts oder kaufe Premium-Workflows.",
      btnSell: "Prompt verkaufen",
      btnBuy: "Kaufen",
      searchPlaceholder: "Suchen (z.B. GPT-4, Midjourney)...",
      catAll: "Alle",
      catImage: "Bilder",
      catVideo: "Videos",
      catMusic: "Musik",
      catText: "Text & Code",
      priceFree: "Kostenlos",
      priceSparks: "Sparks"
    },`;
  const marketplaceEn = `    marketplace: {
      title: "💰 Prompt Marketplace",
      subtitle: "Sell your best prompts or buy premium workflows.",
      btnSell: "Sell Prompt",
      btnBuy: "Buy",
      searchPlaceholder: "Search (e.g. GPT-4, Midjourney)...",
      catAll: "All",
      catImage: "Images",
      catVideo: "Videos",
      catMusic: "Music",
      catText: "Text & Code",
      priceFree: "Free",
      priceSparks: "Sparks"
    },`;
  const marketplaceAr = `    marketplace: {
      title: "💰 سوق التلقينات",
      subtitle: "بيع أفضل التلقينات الخاصة بك أو شراء سير عمل مميز.",
      btnSell: "بيع تلقين",
      btnBuy: "شراء",
      searchPlaceholder: "بحث (مثال: GPT-4, Midjourney)...",
      catAll: "الكل",
      catImage: "صور",
      catVideo: "فيديو",
      catMusic: "موسيقى",
      catText: "نص وشفرة",
      priceFree: "مجاني",
      priceSparks: "شرارات"
    },`;

  content = content.replace(/de: \{/, 'de: {\n' + marketplaceDe);
  content = content.replace(/en: \{/, 'en: {\n' + marketplaceEn);
  content = content.replace(/ar: \{/, 'ar: {\n' + marketplaceAr);
  
  fs.writeFileSync(targetPath, content, 'utf8');
}
