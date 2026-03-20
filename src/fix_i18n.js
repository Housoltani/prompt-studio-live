import fs from 'fs';

let content = fs.readFileSync('./prompt-studio-live/src/i18n.js', 'utf8');

const deMixer = `promptMixer: {
      title: "🎛️ Prompt Mixer",
      subtitle: "Kombiniere Bausteine zu perfekten Prompts",
      dragText: "Ziehe Bausteine hierher",
      clearBtn: "Leeren",
      copyBtn: "Kopieren",
      categoriesTitle: "Kategorien",
      parametersTitle: "Parameter",
      blocksTitle: "Bausteine:",
      selectedText: "Ausgewählt",
      catSubject: "Subject",
      catEnv: "Environment",
      catLit: "Lighting",
      catCam: "Camera",
      catStyle: "Style",
      sub1: "A futuristic cyborg samurai",
      sub2: "A massive glowing crystal monolith",
      sub3: "An abandoned overgrown train station",
      sub4: "A majestic space cruiser floating in orbit",
      sub5: "A cyberpunk street vendor cooking noodles",
      env1: "in a rainy neon-lit alleyway",
      env2: "on the surface of Mars",
      env3: "underwater surrounded by glowing coral",
      env4: "in a dense enchanted forest",
      lit1: "cinematic volumetric lighting",
      lit2: "golden hour sunset",
      lit3: "harsh neon rim lights",
      lit4: "moody low key lighting",
      cam1: "shot on 35mm lens, depth of field",
      cam2: "drone aerial view from above",
      cam3: "macro close up, high detail",
      cam4: "wide angle fisheye lens",
      sty1: "in the style of Studio Ghibli",
      sty2: "hyperrealistic Unreal Engine 5 render",
      sty3: "vintage 80s anime aesthetic",
      sty4: "oil painting, thick impasto brushstrokes"
    }`;

const enMixer = `promptMixer: {
      title: "🎛️ Prompt Mixer",
      subtitle: "Combine blocks to perfect prompts",
      dragText: "Drag blocks here",
      clearBtn: "Clear",
      copyBtn: "Copy",
      categoriesTitle: "Categories",
      parametersTitle: "Parameters",
      blocksTitle: "Blocks:",
      selectedText: "Selected",
      catSubject: "Subject",
      catEnv: "Environment",
      catLit: "Lighting",
      catCam: "Camera",
      catStyle: "Style",
      sub1: "A futuristic cyborg samurai",
      sub2: "A massive glowing crystal monolith",
      sub3: "An abandoned overgrown train station",
      sub4: "A majestic space cruiser floating in orbit",
      sub5: "A cyberpunk street vendor cooking noodles",
      env1: "in a rainy neon-lit alleyway",
      env2: "on the surface of Mars",
      env3: "underwater surrounded by glowing coral",
      env4: "in a dense enchanted forest",
      lit1: "cinematic volumetric lighting",
      lit2: "golden hour sunset",
      lit3: "harsh neon rim lights",
      lit4: "moody low key lighting",
      cam1: "shot on 35mm lens, depth of field",
      cam2: "drone aerial view from above",
      cam3: "macro close up, high detail",
      cam4: "wide angle fisheye lens",
      sty1: "in the style of Studio Ghibli",
      sty2: "hyperrealistic Unreal Engine 5 render",
      sty3: "vintage 80s anime aesthetic",
      sty4: "oil painting, thick impasto brushstrokes"
    }`;

const arMixer = `promptMixer: {
      title: "🎛️ خلاط التلقينات",
      subtitle: "اجمع الكتل لإنشاء تلقينات مثالية",
      dragText: "اسحب الكتل إلى هنا",
      clearBtn: "مسح",
      copyBtn: "نسخ",
      categoriesTitle: "الفئات",
      parametersTitle: "المعلمات",
      blocksTitle: "الكتل:",
      selectedText: "محدد",
      catSubject: "الموضوع",
      catEnv: "البيئة",
      catLit: "الإضاءة",
      catCam: "الكاميرا",
      catStyle: "الأسلوب",
      sub1: "ساموراي آلي مستقبلي",
      sub2: "عمود كريستالي متوهج ضخم",
      sub3: "محطة قطار مهجورة ومتضخمة",
      sub4: "طراد فضائي مهيب يطفو في المدار",
      sub5: "بائع متجول يطبخ المعكرونة في السايبربانك",
      env1: "في زقاق ممطر مضاء بالنيون",
      env2: "على سطح المريخ",
      env3: "تحت الماء محاط بشعاب مرجانية متوهجة",
      env4: "في غابة كثيفة ومسحورة",
      lit1: "إضاءة سينمائية حجمية",
      lit2: "غروب الشمس في الساعة الذهبية",
      lit3: "أضواء حواف النيون القاسية",
      lit4: "إضاءة منخفضة ومزاجية",
      cam1: "عدسة 35 مم، عمق الميدان",
      cam2: "منظر جوي بطائرة بدون طيار من الأعلى",
      cam3: "لقطة مقرّبة ماكرو، تفاصيل عالية",
      cam4: "عدسة عين السمكة واسعة الزاوية",
      sty1: "بأسلوب استوديو جيبلي",
      sty2: "تصيير Unreal Engine 5 واقعي جدا",
      sty3: "جماليات الرسوم المتحركة الكلاسيكية من الثمانينيات",
      sty4: "لوحة زيتية، ضربات فرشاة سميكة"
    }`;

content = content.replace(/de:\s*\{[\s\S]*?(promptMixer:\s*\{[^}]*?copyBtn:\s*"Kopieren"\s*\})/m, (match, p1) => {
  return match.replace(p1, deMixer);
});

content = content.replace(/en:\s*\{[\s\S]*?(promptMixer:\s*\{[^}]*?copyBtn:\s*"Copy"\s*\})/m, (match, p1) => {
  return match.replace(p1, enMixer);
});

content = content.replace(/ar:\s*\{[\s\S]*?(promptMixer:\s*\{[^}]*?copyBtn:\s*"نسخ"\s*\})/m, (match, p1) => {
  return match.replace(p1, arMixer);
});

fs.writeFileSync('./prompt-studio-live/src/i18n.js', content);
