const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'i18n.js');
let content = fs.readFileSync(targetFile, 'utf8');

const deAdditions = `
    cinema: {
      preVisBtn: "KI Pre-Vis",
      preVisLoading: "Visualizing...",
      saveToVault: "In Tresor speichern",
      masterPrompt: "Master Prompt",
      copyToGen: "Kopieren"
    },
    social: {
      aiExecuteBtn: "Mit KI ausführen",
      aiLoading: "KI arbeitet...",
      scriptReady: "SCRIPT_READY",
      generateBtn: "Viral-Skript Generieren",
      format: "FORMAT:",
      aiResponse: "KI ANTWORT"
    },
    vault: {
      tabName: "Tresor / Vault",
      title: "Dein Persönlicher Tresor",
      empty: "Dein Tresor ist leer. Generiere und speichere Prompts in den Studios!",
      publicBtn: "Live im Markt",
      privateBtn: "Privat (Veröffentlichen)"
    },
`;

const enAdditions = `
    cinema: {
      preVisBtn: "AI Pre-Vis",
      preVisLoading: "Visualizing...",
      saveToVault: "Save to Vault",
      masterPrompt: "Master Prompt",
      copyToGen: "Copy"
    },
    social: {
      aiExecuteBtn: "Run via AI",
      aiLoading: "AI is working...",
      scriptReady: "SCRIPT_READY",
      generateBtn: "Generate Viral Script",
      format: "FORMAT:",
      aiResponse: "AI RESPONSE"
    },
    vault: {
      tabName: "Vault",
      title: "Your Personal Vault",
      empty: "Your vault is empty. Generate and save prompts in the Studios!",
      publicBtn: "Live on Market",
      privateBtn: "Private (Publish)"
    },
`;

const arAdditions = `
    cinema: {
      preVisBtn: "رؤية مسبقة",
      preVisLoading: "جاري التصور...",
      saveToVault: "حفظ في الخزنة",
      masterPrompt: "الموجه الرئيسي",
      copyToGen: "نسخ"
    },
    social: {
      aiExecuteBtn: "تنفيذ بالذكاء الاصطناعي",
      aiLoading: "الذكاء الاصطناعي يعمل...",
      scriptReady: "السكريبت جاهز",
      generateBtn: "توليد سكريبت فيروسي",
      format: "الصيغة:",
      aiResponse: "رد الذكاء الاصطناعي"
    },
    vault: {
      tabName: "الخزنة",
      title: "خزنتك الشخصية",
      empty: "خزنتك فارغة. قم بتوليد وحفظ الموجهات في الاستوديوهات!",
      publicBtn: "معروض في السوق",
      privateBtn: "خاص (نشر)"
    },
`;

if (!content.includes('cinema: {')) {
  content = content.replace("de: {", "de: {" + deAdditions);
  content = content.replace("en: {", "en: {" + enAdditions);
  content = content.replace("ar: {", "ar: {" + arAdditions);
  fs.writeFileSync(targetFile, content);
  console.log("Injected keys into i18n.js");
} else {
  console.log("Keys already exist in i18n.js");
}
