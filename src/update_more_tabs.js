import fs from 'fs';

const i18nPath = './prompt-studio-live/src/i18n.js';
let i18nContent = fs.readFileSync(i18nPath, 'utf8');

const deAdditions = `
    promptMixer: {
      title: "🎛️ Prompt Mixer",
      subtitle: "Kombiniere Bausteine zu perfekten Prompts",
      dragText: "Ziehe Bausteine hierher",
      clearBtn: "Leeren",
      copyBtn: "Kopieren"
    },
    promptExtractor: {
      title: "🔄 Prompt Extractor",
      subtitle: "Bild hochladen und Prompt extrahieren",
      uploadBtn: "Bild hochladen",
      extractBtn: "Extrahieren",
      resultTitle: "Extrahierter Prompt"
    },`;

const enAdditions = `
    promptMixer: {
      title: "🎛️ Prompt Mixer",
      subtitle: "Combine blocks to perfect prompts",
      dragText: "Drag blocks here",
      clearBtn: "Clear",
      copyBtn: "Copy"
    },
    promptExtractor: {
      title: "🔄 Prompt Extractor",
      subtitle: "Upload image and extract prompt",
      uploadBtn: "Upload Image",
      extractBtn: "Extract",
      resultTitle: "Extracted Prompt"
    },`;

const arAdditions = `
    promptMixer: {
      title: "🎛️ خلاط التلقينات",
      subtitle: "اجمع الكتل لإنشاء تلقينات مثالية",
      dragText: "اسحب الكتل إلى هنا",
      clearBtn: "مسح",
      copyBtn: "نسخ"
    },
    promptExtractor: {
      title: "🔄 مستخرج التلقين",
      subtitle: "قم بتحميل صورة واستخراج التلقين",
      uploadBtn: "تحميل صورة",
      extractBtn: "استخراج",
      resultTitle: "التلقين المستخرج"
    },`;

i18nContent = i18nContent.replace(/^  de: \{/m, '  de: {' + deAdditions);
i18nContent = i18nContent.replace(/^  en: \{/m, '  en: {' + enAdditions);
i18nContent = i18nContent.replace(/^  ar: \{/m, '  ar: {' + arAdditions);

fs.writeFileSync(i18nPath, i18nContent);
