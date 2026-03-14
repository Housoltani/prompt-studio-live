export const tabs = [
  { id: 'agents', name: '🤖 Agenten Hub', desc: 'Spezialisierte KI-Assistenten' },
  { id: 'generator', name: '✨ Live Generator', desc: 'Bilder, Videos & Musik direkt hier' },
  { id: 'studio', name: '📂 Mein Studio', desc: 'Dein Workspace' },
  { id: 'flows', name: '⚡ Automatisierung', desc: 'Prompt Chains' },
  { id: 'marketplace', name: '💰 Marktplatz', desc: 'Prompts kaufen & verkaufen' },
  { id: 'credits', name: '⚡ Aufladestation', desc: 'Sparks für Premium KI' },
  { id: 'extractor', name: '🔄 Prompt Extractor', desc: 'Bild zu Text' },
  { id: 'mixer', name: '🎛️ Prompt Mixer', desc: 'Drag & Drop Baukasten' },
  { id: 'compare', name: '⚖️ Modell-Vergleich', desc: 'Midjourney vs DALL-E vs SD' },
  { id: 'images', name: '🖼️ KI Bilder', desc: 'Prompts für Midjourney, DALL-E' },
  { id: 'videos', name: '🎥 KI Videos', desc: 'Prompts für Sora, Runway' },
  { id: 'music', name: '🎵 KI Musik', desc: 'Prompts für Suno, Udio' },
  { id: 'community', name: '🏆 Community', desc: 'User Uploads & Trending' },
  { id: 'learning', name: '🎓 KI für Anfänger', desc: 'Tools & Tutorials zum Starten' },
  { id: 'feedback', name: '💬 Feedback', desc: 'Lass uns wissen, was du denkst' },
  { id: 'auth', name: '🔐 Login / Profil', desc: 'Google, Apple, Twitter' },
];

export const marketplacePrompts = [
  { id: 201, title: 'Das ultimative SEO-Content Framework', creator: '@MarketingPro', price: '4.99€', category: 'ChatGPT', sales: 124, rating: 4.9, preview: 'Ein 800-Wort Master-Prompt, der ChatGPT zwingt, Google-optimierte, plagiatsfreie Artikel mit LSI-Keywords und strukturierter HTML-Ausgabe zu generieren.' },
  { id: 202, title: 'UX/UI Wireframe Generator', creator: '@DesignNinja', price: '8.50€', category: 'Midjourney v6', sales: 340, rating: 5.0, preview: 'Der perfekte Prompt, um sofort saubere, moderne Dashboard-Interfaces und Mobile-App Wireframes in Midjourney zu erzeugen. Inklusive Farbpaletten-Steuerung.' },
  { id: 203, title: 'Konsistente Charaktere (Comic)', creator: '@ArtStudio', price: '2.99€', category: 'Midjourney Niji', sales: 89, rating: 4.7, preview: 'Die genaue Formel, um in Midjourney denselben Charakter aus verschiedenen Blickwinkeln und mit verschiedenen Emotionen (Character Sheet) zu generieren.' },
  { id: 204, title: 'Viraler TikTok Hook Builder', creator: '@SocialGod', price: 'Kostenlos', category: 'Claude 3', sales: 2100, rating: 4.8, preview: 'Ein Prompt, der deine Video-Idee nimmt und 5 psychologisch optimierte Hooks ausspuckt, die Zuschauer in den ersten 3 Sekunden fesseln.' },
];

// ... (Rest of data.js remains the same)
export const communityPrompts = [
  { id: 101, user: '@PixelNinja', avatar: '🥷', title: 'Neon [KRIEGER]', prompt: '/imagine prompt: A cybernetic [KRIEGER] standing on a neon-lit [STADT] rooftop in the rain, holding a glowing [WAFFE], 8k, unreal engine --ar 16:9', likes: 1420, views: '15k', timeAgo: '2h' },
  { id: 102, user: '@ArtLover99', avatar: '🎨', title: 'Watercolor [TIER]', prompt: '/imagine prompt: A cute fluffy [TIER] sleeping under a giant glowing [OBJEKT], watercolor illustration style, soft pastel colors, dreamy --ar 1:1', likes: 856, views: '10k', timeAgo: '5h' },
  { id: 103, user: '@TechGuru', avatar: '💻', title: 'AI Server Room', prompt: '/imagine prompt: Inside a massive futuristic quantum computer server room, glowing blue fiber optic cables, cinematic lighting, photorealistic --ar 16:9', likes: 2100, views: '28k', timeAgo: '1d' },
  { id: 104, user: '@MovieBuff', avatar: '🎬', title: 'Dune Desert', prompt: '/imagine prompt: Epic cinematic wide shot of a giant sandworm emerging from deep orange desert dunes, tiny human figure in foreground, Denis Villeneuve style --ar 21:9', likes: 3450, views: '42k', timeAgo: '2d' },
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