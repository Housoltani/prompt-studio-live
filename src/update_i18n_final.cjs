const fs = require('fs');

const content = fs.readFileSync('src/update_i18n_full.cjs', 'utf8');
const newTranslationsRegex = /const newTranslations = \`([\s\S]*?)\`;\n\nfs\.writeFileSync/;
const match = content.match(newTranslationsRegex);
let baseI18n = match[1];

// Now inject Marketplace cleanly into each language
const mktDE = `
    Marketplace: {
      all: "Alle",
      promptMarketplaceTitle: "💰 Prompt Marktplatz",
      promptMarketplaceDescription: "Kaufe und verkaufe Premium-Prompts mit deinen Sparks ⚡.",
      searchPromptsPlaceholder: "Suche Prompts...",
      buyButton: "Kaufen",
      noPromptsFound: "Keine Prompts für diese Kategorie gefunden.",
      categoryMidjourney: "Midjourney",
      categoryStableDiffusion: "Stable Diffusion",
      categoryGPT4: "GPT-4",
      categoryVideo: "Video",
      categoryWebDev: "Web Dev",
      costPrefix: "Kauf:",
      successMessage: "Prompt \\"{title}\\" gekauft! Jetzt in deinem Studio.",
      promptPreviewFallback: "Ein detaillierter Prompt für maximale Ergebnisse...",
      creatorPrefix: "👤 @CreatorAI"
    },`;

const mktEN = `
    Marketplace: {
      all: "All",
      promptMarketplaceTitle: "💰 Prompt Marketplace",
      promptMarketplaceDescription: "Buy and sell premium prompts with your Sparks ⚡.",
      searchPromptsPlaceholder: "Search Prompts...",
      buyButton: "Buy",
      noPromptsFound: "No prompts found for this category.",
      categoryMidjourney: "Midjourney",
      categoryStableDiffusion: "Stable Diffusion",
      categoryGPT4: "GPT-4",
      categoryVideo: "Video",
      categoryWebDev: "Web Dev",
      costPrefix: "Purchase:",
      successMessage: "Prompt \\"{title}\\" purchased! Now in your studio.",
      promptPreviewFallback: "A detailed prompt for maximum results...",
      creatorPrefix: "👤 @CreatorAI"
    },`;

const mktAR = `
    Marketplace: {
      all: "الكل",
      promptMarketplaceTitle: "💰 سوق الموجهات",
      promptMarketplaceDescription: "اشترِ وبع الموجهات المميزة باستخدام شراراتك ⚡.",
      searchPromptsPlaceholder: "ابحث عن موجهات...",
      buyButton: "شراء",
      noPromptsFound: "لم يتم العثور على موجهات لهذه الفئة.",
      categoryMidjourney: "Midjourney",
      categoryStableDiffusion: "Stable Diffusion",
      categoryGPT4: "GPT-4",
      categoryVideo: "فيديو",
      categoryWebDev: "تطوير الويب",
      costPrefix: "شراء:",
      successMessage: "تم شراء الموجه \\"{title}\\"! الآن في الاستوديو الخاص بك.",
      promptPreviewFallback: "موجه مفصل للحصول على أقصى النتائج...",
      creatorPrefix: "👤 @CreatorAI"
    },`;

baseI18n = baseI18n.replace(/de:\s*\{/, 'de: {' + mktDE);
baseI18n = baseI18n.replace(/en:\s*\{/, 'en: {' + mktEN);
baseI18n = baseI18n.replace(/ar:\s*\{/, 'ar: {' + mktAR);

fs.writeFileSync('src/i18n.js', baseI18n, 'utf8');
console.log("Restored i18n.js cleanly.");
