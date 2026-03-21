export const tabs = [
  // --- KREATION & GENERATOREN ---
  { id: 'home', name: '🏠 Command Dashboard', category: 'KREATION & GENERATOREN', desc: 'Deine Startzentrale' },
  { id: 'generator', name: '✨ Live Generator', category: 'KREATION & GENERATOREN', desc: 'Text, Bild, Video & Musik Generieren' },
  { id: 'mixer', name: '🎛️ Prompt Mixer', category: 'KREATION & GENERATOREN', desc: 'Drag & Drop Baukasten' },
  { id: 'extractor', name: '🔄 Prompt Extractor', category: 'KREATION & GENERATOREN', desc: 'Bild zu Text' },
  { id: 'compare', name: '⚖️ Modell-Vergleich', category: 'KREATION & GENERATOREN', desc: 'Midjourney vs DALL-E vs SD' },
  { id: 'assetlab', name: '🧊 3D & Asset Labor', category: 'KREATION & GENERATOREN', desc: 'Game Assets & 3D Modelle' },
  { id: 'voice-avatar', name: '🎙️ Deep Voice & Avatar Studio', category: 'KREATION & GENERATOREN', desc: 'KI-Stimmen & Video-Avatare' },
  { id: 'storyboard', name: '🎬 AI Storyboard Studio', category: 'KREATION & GENERATOREN', desc: 'Visual Narrative & Mega-Prompt Builder' },

  // --- BIBLIOTHEKEN & INSPIRATION ---
  { id: 'images', name: '🖼️ Bild-Prompts', category: 'BIBLIOTHEKEN & INSPIRATION', desc: 'Prompts für Midjourney, DALL-E' },
  { id: 'videos', name: '🎥 Video-Prompts', category: 'BIBLIOTHEKEN & INSPIRATION', desc: 'Prompts für Sora, Runway' },
  { id: 'music', name: '🎵 Hit-Labor', category: 'BIBLIOTHEKEN & INSPIRATION', desc: 'Prompts für Suno, Udio' },
  { id: 'community', name: '🏆 Community Feed', category: 'BIBLIOTHEKEN & INSPIRATION', desc: 'User Uploads & Trending' },
  { id: 'marketplace', name: '💰 Prompt Marktplatz', category: 'BIBLIOTHEKEN & INSPIRATION', desc: 'Prompts kaufen & verkaufen' },
  { id: 'analytics', name: '📊 Creator Dashboard', category: 'BIBLIOTHEKEN & INSPIRATION', desc: 'Deine Verkäufe & Analysen' },
  { id: 'arena', name: '⚔️ Prompt Arena', category: 'BIBLIOTHEKEN & INSPIRATION', desc: 'Tägliche Battles & Preisgelder' },
  { id: 'radar', name: '📡 KI-Radar', category: 'BIBLIOTHEKEN & INSPIRATION', desc: 'KI-News, Updates & Trends' },

  // --- WORKSPACE & AUTOMATISIERUNG ---
  { id: 'studio', name: '📂 Mein Workspace', category: 'WORKSPACE & AUTOMATISIERUNG', desc: 'Deine gespeicherten Werke' },
  { id: 'notebook', name: '📚 Notebook LM', category: 'WORKSPACE & AUTOMATISIERUNG', desc: 'Dokumenten Analyse & Podcast' },
  { id: 'agents', name: '🤖 Agenten Hub', category: 'WORKSPACE & AUTOMATISIERUNG', desc: 'Spezialisierte KI-Assistenten' },
  { id: 'flows', name: '⚡ Flow Builder', category: 'WORKSPACE & AUTOMATISIERUNG', desc: 'Prompt Chains & Automatisierung' },
  { id: 'api-nexus', name: '🔌 API Nexus', category: 'WORKSPACE & AUTOMATISIERUNG', desc: 'Webhooks & Entwickler-Zugang' },
  { id: 'command-center', name: '🎯 Social Media Suite', category: 'WORKSPACE & AUTOMATISIERUNG', desc: 'Deine Instagram KI-Crew' },
  { id: 'ebook-studio', name: '📚 E-Book Studio', category: 'WORKSPACE & AUTOMATISIERUNG', desc: 'Erstelle digitale Produkte' },
  { id: 'dev-architect', name: '💻 Dev Architect & Copilot', category: 'WORKSPACE & AUTOMATISIERUNG', desc: 'Architektur & Code Generation' },
  { id: 'prompt-versioning', name: '🌳 Prompt-Versionskontrolle', category: 'WORKSPACE & AUTOMATISIERUNG', desc: 'Git für Prompts & A/B Tests' },

  // --- BUSINESS & MONETARISIERUNG ---
  { id: 'side-hustle', name: '📈 Side-Hustle Radar', category: '💰 BUSINESS & MONETARISIERUNG', desc: 'Trending AI Monetization' },
  { id: 'agency-blueprint', name: '🏢 AI Agency Blueprint', category: '💰 BUSINESS & MONETARISIERUNG', desc: 'Freelance & Agency Tools' },
  { id: 'digital-product', name: '📦 Digital Product Architect', category: '💰 BUSINESS & MONETARISIERUNG', desc: 'End-to-End Product Creator' },
  
  // --- SYSTEM & LERNEN ---
  { id: 'learning', name: '🎓 KI Academy', category: 'SYSTEM & LERNEN', desc: 'Tools & Tutorials zum Starten' },
  { id: 'credits', name: '⚡ Sparks & Credits', category: 'SYSTEM & LERNEN', desc: 'Sparks für Premium KI aufladen' },
  { id: 'feedback', name: '💬 Feedback', category: 'SYSTEM & LERNEN', desc: 'Lass uns wissen, was du denkst' },
  { id: 'offers', name: '🎁 Angebote', category: 'SYSTEM & LERNEN', desc: 'Rabatte & Deals des Monats' },
  { id: 'auth', name: '🔐 Profil & Settings', category: 'SYSTEM & LERNEN', desc: 'Account verwalten' }
];

export const marketplacePrompts = [
  { id: 201, title: 'Das ultimative SEO-Content Framework', creator: '@MarketingPro', price: '49', category: 'ChatGPT', sales: 124, rating: 4.9, preview: 'Ein 800-Wort Master-Prompt, der ChatGPT zwingt, Google-optimierte, plagiatsfreie Artikel mit LSI-Keywords und strukturierter HTML-Ausgabe zu generieren.' },
  { id: 202, title: 'UX/UI Wireframe Generator', creator: '@DesignNinja', price: '85', category: 'Midjourney', sales: 340, rating: 5.0, preview: 'Der perfekte Prompt, um sofort saubere, moderne Dashboard-Interfaces und Mobile-App Wireframes in Midjourney zu erzeugen. Inklusive Farbpaletten-Steuerung.' },
  { id: 203, title: 'Konsistente Charaktere (Comic)', creator: '@ArtStudio', price: '30', category: 'Midjourney', sales: 89, rating: 4.7, preview: 'Die genaue Formel, um in Midjourney denselben Charakter aus verschiedenen Blickwinkeln und mit verschiedenen Emotionen (Character Sheet) zu generieren.' },
  { id: 204, title: 'Viraler TikTok Hook Builder', creator: '@SocialGod', price: 'Free', category: 'Claude 3', sales: 2100, rating: 4.8, preview: 'Ein Prompt, der deine Video-Idee nimmt und 5 psychologisch optimierte Hooks ausspuckt, die Zuschauer in den ersten 3 Sekunden fesseln.' },
  { id: 205, title: 'Kling 3.0 Cinematic Camera Moves', creator: '@VideoDirector', price: '120', category: 'Video', sales: 412, rating: 4.9, preview: 'Geheime Prompt-Struktur für Kling 3.0, um perfekte Kamera-Fahrten (Dolly, Pan, Tilt, Crane) ohne Artefakte oder Morphing zu erzeugen.' },
  { id: 206, title: 'Fullstack Next.js Boilerplate Builder', creator: '@CodeWizard', price: '150', category: 'Web Dev', sales: 85, rating: 5.0, preview: 'Lass dir von GPT-4o ein komplettes Next.js 14 Projekt mit Tailwind, Supabase Auth und Stripe Integration in einem einzigen, strukturierten Output schreiben.' },
  { id: 207, title: 'Photorealistische Produktfotografie', creator: '@EcomHacker', price: '65', category: 'Midjourney', sales: 630, rating: 4.6, preview: 'Prompt-Template für Apple-like Produktfotos (Parfüm, Technik, Uhren) mit Studio-Beleuchtung (Softbox, Rim Light, Macro-Objektiv).' },
  { id: 208, title: 'LinkedIn Viral Post Generator', creator: '@B2B_King', price: '45', category: 'ChatGPT', sales: 890, rating: 4.8, preview: 'Generiert den perfekten B2B-LinkedIn Post mit starker Hook, Storytelling-Bogen und Handlungsaufforderung. Perfekt formatiert.' },
  { id: 209, title: 'Stable Diffusion: Architektur Skizzen', creator: '@ArchViz', price: '55', category: 'Stable Diffusion', sales: 112, rating: 4.5, preview: 'ControlNet + Prompt Kombination, um aus simplen Bleistiftskizzen atemberaubende Architektur-Renderings in Aquarell-Optik zu zaubern.' },
  { id: 210, title: 'Suno AI Hit-Song Formel', creator: '@MusicProducer', price: '25', category: 'Audio', sales: 340, rating: 4.7, preview: 'Die genauen Metatags ([Pre-Chorus], [Drop], [Guitar Solo]), um Suno AI dazu zu bringen, einen Song mit perfekter Pop-Struktur zu singen.' },
  { id: 211, title: 'Dungeons & Dragons Dungeon Master', creator: '@NerdDice', price: '35', category: 'Claude 3', sales: 45, rating: 4.9, preview: 'Verwandelt die KI in einen interaktiven D&D Spielleiter, der dynamische Welten, NSCs mit tiefen Backstorys und faire Würfelwürfe simuliert.' },
  { id: 212, title: 'Python Web Scraper Master', creator: '@DataMiner', price: '75', category: 'Web Dev', sales: 210, rating: 4.8, preview: 'Ein Multi-Step Prompt, der dir ein fehlerfreies Python/BeautifulSoup Script schreibt, das Pagination, Proxies und Captcha-Bypasses integriert.' }
];

export const communityPrompts = [
  { id: 101, user: '@PixelNinja', avatar: '🥷', title: 'Neon [KRIEGER]', prompt: '/imagine prompt: A cybernetic [KRIEGER] standing on a neon-lit [STADT] rooftop in the rain, holding a glowing [WAFFE], 8k, unreal engine, volumetric fog, rim lighting --ar 16:9 --v 6.0', likes: 1420, views: '15k', timeAgo: '2h' },
  { id: 102, user: '@ArtLover99', avatar: '🎨', title: 'Watercolor [TIER]', prompt: '/imagine prompt: A cute fluffy [TIER] sleeping under a giant glowing [OBJEKT], watercolor illustration style, soft pastel colors, dreamy, masterpiece, trending on artstation --ar 1:1', likes: 856, views: '10k', timeAgo: '5h' },
  { id: 103, user: '@TechGuru', avatar: '💻', title: 'AI Server Room', prompt: '/imagine prompt: Inside a massive futuristic quantum computer server room, glowing blue fiber optic cables, cinematic lighting, photorealistic, depth of field, 35mm lens --ar 16:9 --style raw', likes: 2100, views: '28k', timeAgo: '1d' },
  { id: 104, user: '@MovieBuff', avatar: '🎬', title: 'Dune Desert', prompt: '/imagine prompt: Epic cinematic wide shot of a giant sandworm emerging from deep orange desert dunes, tiny human figure in foreground, Denis Villeneuve style, Arri Alexa 65, IMAX, golden hour --ar 21:9', likes: 3450, views: '42k', timeAgo: '2d' },
  { id: 105, user: '@LogoMaster', avatar: '📐', title: 'Minimalist Startup Logo', prompt: '/imagine prompt: A minimalist, modern vector logo for a tech startup named [FIRMA], using a stylized [SYMBOL], geometric shapes, vibrant gradient colors on a solid dark background, dribbble style, flat design --no text --ar 1:1', likes: 5120, views: '60k', timeAgo: '3d' },
  { id: 106, user: '@FoodPorn', avatar: '🍔', title: 'Michelin Star [GERICHT]', prompt: '/imagine prompt: A mouth-watering, hyper-realistic close-up food photography of [GERICHT], plated beautifully on a dark slate board, steam rising, moody dramatic restaurant lighting, macro lens, 8k --ar 4:5 --style raw', likes: 890, views: '12k', timeAgo: '4h' },
  { id: 107, user: '@FantasyScribe', avatar: '🐉', title: 'Taverne [SZENE]', prompt: '/imagine prompt: Inside a cozy medieval fantasy tavern filled with [KREATUREN] drinking ale, roaring fireplace casting warm orange light, intricate wooden carvings, cinematic composition, concept art by Greg Rutkowski --ar 16:9', likes: 2750, views: '33k', timeAgo: '1w' },
  { id: 108, user: '@StreetTog', avatar: '📷', title: 'Cinematic Street Photography', prompt: '/imagine prompt: Candid street photography of a solitary figure walking down a foggy alley in [STADT] at night, illuminated by a single neon sign, Kodak Portra 400 film look, cinematic grading, anamorphic lens flare --ar 16:9 --v 6.0', likes: 4100, views: '55k', timeAgo: '3w' },
  { id: 109, user: '@MacroKing', avatar: '🔎', title: 'Macro [INSEKT] Eye', prompt: '/imagine prompt: Extreme macro photography of a [INSEKT] eye, showing microscopic geometric details, covered in tiny morning dew drops reflecting the sunrise, National Geographic style, incredibly sharp focus --ar 16:9', likes: 1240, views: '18k', timeAgo: '1h' },
  { id: 110, user: '@GamerDev', avatar: '🕹️', title: 'Isometric RPG Room', prompt: '/imagine prompt: Isometric 3D rendering of a cozy gamer bedroom, glowing RGB lights, multiple monitors displaying code, pizza boxes on the floor, octane render, soft clay materials, tilt-shift photography --ar 1:1 --stylize 250', likes: 6200, views: '80k', timeAgo: '2w' }
];

export const imagePeopleTemplates = [
  { id: 1, title: 'Der alte Fischer', prompt: '/imagine prompt: Cinematic close-up portrait of an old fisherman with a weathered face and deep wrinkles, wearing a yellow raincoat, stormy sea in the background, 8k, photorealistic, dramatic lighting --ar 4:5', color: 'from-blue-800 to-slate-900', likes: 1245, views: '15.2k' },
  { id: 2, title: 'Cyberpunk Hackerin', prompt: '/imagine prompt: Neon-lit portrait of a female cyberpunk hacker with glowing blue cybernetic implants, wearing a dark hoodie, rain reflecting on her face, Tokyo alleyway, neon colors --ar 4:5', color: 'from-pink-600 to-purple-900', likes: 3890, views: '45.1k' },
];
export const imageCoupleTemplates = [
  { id: 1, title: 'Kuss im Neon-Regen', prompt: '/imagine prompt: A romantic couple kissing under a clear umbrella in a rainy cyberpunk city, neon reflections on the wet street, cinematic lighting, 8k --ar 16:9', color: 'from-purple-600 to-indigo-900', likes: 5430, views: '82.5k' },
];
export const videoMiscTemplates = [
  { id: 1, title: 'Drohnenflug Vulkan', prompt: 'Aerial drone shot, flying over an active erupting volcano, glowing lava flows, thick smoke, cinematic motion, 4k, realistic physics', color: 'from-orange-600 to-red-900', likes: 8400, views: '125k' },
];
export const videoPeopleTemplates = [
  { id: 1, title: 'Porträt Drehung', prompt: 'Slow motion portrait, a beautiful woman with red hair turning around to look at the camera, wind blowing her hair, golden hour lighting', color: 'from-orange-500 to-red-600', likes: 2340, views: '31.2k' },
];
export const videoCoupleTemplates = [
  { id: 1, title: 'Tanz im Regen', prompt: 'Slow motion, a romantic couple dancing and laughing in a heavy downpour under a warm streetlamp, cinematic romance', color: 'from-blue-500 to-indigo-700', likes: 12400, views: '185k' },
];
export const extendedMusicTemplates = [
  { id: 1, title: 'Lo-Fi Chill Beats', genre: 'Lo-Fi / Hip Hop', platform: 'Suno AI', mood: 'Relaxed', time: '02:30', likes: 1240, views: '8.5k', prompt: '[Genre: Lo-Fi Hip Hop, Chillhop] [Mood: Relaxing, late night study] [Instruments: Vinyl crackle, soft electric piano, slow drum loop] A cozy instrumental track for studying.', color: 'from-indigo-500 to-purple-600' },
];
export const repairTutorials = [
  { id: 1, category: '📱 Smartphone', title: 'iPhone 13 Display tauschen', device: 'Apple iPhone 13', difficulty: 'Mittel', time: '45 Min', likes: 4500, views: '142k', color: 'from-blue-600 to-indigo-900' },
];
export const learningTutorials = [
  { id: 1, category: '🤖 ChatGPT', title: 'Die perfekten ersten Prompts', level: 'Anfänger', time: '10 Min', likes: 12500, views: '340k', description: 'Wie du aufhörst mit ChatGPT wie mit Google zu reden und stattdessen richtige Ergebnisse bekommst.', color: 'from-emerald-600 to-green-900' },
];