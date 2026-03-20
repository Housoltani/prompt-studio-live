import fs from 'fs';

const i18nPath = './prompt-studio-live/src/i18n.js';
let content = fs.readFileSync(i18nPath, 'utf8');

const arMixer = `
    promptMixer: {
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
    },`;

content = content.replace(/promptMixer: \{[\s\S]*?copyBtn: "نسخ"\n\s*\}/, arMixer.trim());

fs.writeFileSync(i18nPath, content);
