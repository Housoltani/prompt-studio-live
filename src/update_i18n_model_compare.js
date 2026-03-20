import fs from 'fs';

const i18nPath = './prompt-studio-live/src/i18n.js';
let content = fs.readFileSync(i18nPath, 'utf8');

const deCompare = `modelCompare: {
      title: "⚖️ Modell-Vergleich",
      subtitle: "Gleicher Prompt, unterschiedliche KIs. Wer liefert das beste Ergebnis?",
      promptLabel: "Dein Universal-Prompt",
      compareBtn: "🚀 Splitt-Screen Render starten (15 Sparks)",
      missingPrompt: "Prompt fehlt!",
      initText: "Beide KI-Systeme initiieren Rendering...",
      doneText: "ist fertig!",
      modelALabel: "🤖 Modell A",
      modelBLabel: "🤖 Modell B",
      waitingText: "Warte auf Render..."
    }`;

const enCompare = `modelCompare: {
      title: "⚖️ Model Compare",
      subtitle: "Same prompt, different AIs. Who delivers the best result?",
      promptLabel: "Your Universal Prompt",
      compareBtn: "🚀 Start Split-Screen Render (15 Sparks)",
      missingPrompt: "Prompt missing!",
      initText: "Both AI systems initiating rendering...",
      doneText: "is ready!",
      modelALabel: "🤖 Model A",
      modelBLabel: "🤖 Model B",
      waitingText: "Waiting for render..."
    }`;

const arCompare = `modelCompare: {
      title: "⚖️ مقارنة النماذج",
      subtitle: "نفس التلقين، ذكاء اصطناعي مختلف. من يقدم أفضل نتيجة؟",
      promptLabel: "تلقينك العالمي",
      compareBtn: "🚀 بدء تصيير الشاشة المزدوجة (15 شرارة)",
      missingPrompt: "التلقين مفقود!",
      initText: "نظاما الذكاء الاصطناعي يبدآن التصيير...",
      doneText: "جاهز!",
      modelALabel: "🤖 النموذج أ",
      modelBLabel: "🤖 النموذج ب",
      waitingText: "في انتظار التصيير..."
    }`;

content = content.replace(/de:\s*\{/, 'de: {\n    ' + deCompare + ',');
content = content.replace(/en:\s*\{/, 'en: {\n    ' + enCompare + ',');
content = content.replace(/ar:\s*\{/, 'ar: {\n    ' + arCompare + ',');

fs.writeFileSync(i18nPath, content);
