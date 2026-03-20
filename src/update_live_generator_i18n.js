import fs from 'fs';

const i18nPath = './prompt-studio-live/src/i18n.js';
let i18nContent = fs.readFileSync(i18nPath, 'utf8');

const deLiveGen = `liveGen: {
      assistant: "Standard Assistent",
      engineer: "Prompt Engineer",
      seo: "SEO Copywriter",
      dev: "Senior Developer",
      translator: "Profi Übersetzer",
      summarizer: "Text Zusammenfasser",
      analyst: "Data Analyst",
      social: "Social Media Manager",
      micNotSupported: "Spracherkennung wird von diesem Browser nicht unterstützt.",
      speakNow: "Spreche jetzt...",
      creditError: "Nicht genügend Sparks! Bitte aufladen.",
      reqError: "Netzwerkfehler oder ungültige Antwort.",
      sysRole: "Du bist ein hilfreicher KI-Assistent.",
      modeText: "📝 Text",
      modeImage: "🖼️ Bild",
      modeVideo: "🎥 Video",
      modeMusic: "🎵 Musik",
      clearChat: "Chat leeren",
      personaLabel: "🎭 Persona",
      modelLabel: "🤖 Modell",
      paramsLabel: "⚙️ Parameter",
      tempLabel: "Kreativität (Temperature)",
      tokensLabel: "Max Tokens",
      imgUrlLabel: "🔗 Bild-URL (optional, für Vision-Modelle)",
      msgPlaceholder: "Schreibe eine Nachricht oder einen Prompt...",
      generating: "Generiert...",
      btnSend: "Senden"
    },`;

const enLiveGen = `liveGen: {
      assistant: "Standard Assistant",
      engineer: "Prompt Engineer",
      seo: "SEO Copywriter",
      dev: "Senior Developer",
      translator: "Pro Translator",
      summarizer: "Text Summarizer",
      analyst: "Data Analyst",
      social: "Social Media Manager",
      micNotSupported: "Speech recognition not supported in this browser.",
      speakNow: "Speak now...",
      creditError: "Not enough Sparks! Please recharge.",
      reqError: "Network error or invalid response.",
      sysRole: "You are a helpful AI assistant.",
      modeText: "📝 Text",
      modeImage: "🖼️ Image",
      modeVideo: "🎥 Video",
      modeMusic: "🎵 Music",
      clearChat: "Clear Chat",
      personaLabel: "🎭 Persona",
      modelLabel: "🤖 Model",
      paramsLabel: "⚙️ Parameters",
      tempLabel: "Creativity (Temperature)",
      tokensLabel: "Max Tokens",
      imgUrlLabel: "🔗 Image URL (optional, for Vision models)",
      msgPlaceholder: "Write a message or a prompt...",
      generating: "Generating...",
      btnSend: "Send"
    },`;

const arLiveGen = `liveGen: {
      assistant: "مساعد قياسي",
      engineer: "مهندس تلقين",
      seo: "كاتب تحسين محركات البحث",
      dev: "مطور أول",
      translator: "مترجم محترف",
      summarizer: "ملخص نصوص",
      analyst: "محلل بيانات",
      social: "مدير وسائل التواصل الاجتماعي",
      micNotSupported: "التعرف على الصوت غير مدعوم في هذا المتصفح.",
      speakNow: "...تحدث الآن",
      creditError: "لا يوجد ما يكفي من الشرارات! يرجى إعادة الشحن.",
      reqError: "خطأ في الشبكة أو استجابة غير صالحة.",
      sysRole: "أنت مساعد ذكاء اصطناعي مفيد.",
      modeText: "📝 نص",
      modeImage: "🖼️ صورة",
      modeVideo: "🎥 فيديو",
      modeMusic: "🎵 موسيقى",
      clearChat: "مسح الدردشة",
      personaLabel: "🎭 الشخصية",
      modelLabel: "🤖 النموذج",
      paramsLabel: "⚙️ المعلمات",
      tempLabel: "الإبداع (الحرارة)",
      tokensLabel: "الحد الأقصى للرموز",
      imgUrlLabel: "🔗 رابط الصورة (اختياري، لنماذج الرؤية)",
      msgPlaceholder: "...اكتب رسالة أو تلقينًا",
      generating: "...جاري التوليد",
      btnSend: "إرسال"
    },`;

i18nContent = i18nContent.replace(/^  de: \{/m, '  de: {\n    ' + deLiveGen);
i18nContent = i18nContent.replace(/^  en: \{/m, '  en: {\n    ' + enLiveGen);
i18nContent = i18nContent.replace(/^  ar: \{/m, '  ar: {\n    ' + arLiveGen);

fs.writeFileSync(i18nPath, i18nContent);
