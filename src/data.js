export const tabs = [
  { id: 'generator', name: '✨ Live Generator', desc: 'Bilder, Videos & Musik direkt hier' },
  { id: 'extractor', name: '🔄 Prompt Extractor', desc: 'Bild zu Text' },
  { id: 'mixer', name: '🎛️ Prompt Mixer', desc: 'Drag & Drop Baukasten' },
  { id: 'compare', name: '⚖️ Modell-Vergleich', desc: 'Midjourney vs DALL-E vs SD' },
  { id: 'images', name: '🖼️ KI Bilder', desc: 'Prompts für Midjourney, DALL-E' },
  { id: 'videos', name: '🎥 KI Videos', desc: 'Prompts für Sora, Runway' },
  { id: 'music', name: '🎵 KI Musik', desc: 'Prompts für Suno, Udio' },
  { id: 'community', name: '🏆 Community', desc: 'User Uploads & Trending' },
  { id: 'learning', name: '🎓 KI für Anfänger', desc: 'Tools & Tutorials zum Starten' },
  { id: 'repair', name: '🛠️ Tech Repair', desc: 'Handy & Laptop reparieren' },
  { id: 'feedback', name: '💬 Feedback', desc: 'Lass uns wissen, was du denkst' },
  { id: 'auth', name: '🔐 Login / Profil', desc: 'Google, Apple, Twitter' },
];

export const communityPrompts = [
  { id: 101, user: '@PixelNinja', avatar: '🥷', title: 'Neon Samurai', prompt: '/imagine prompt: A cybernetic samurai standing on a neon-lit Tokyo rooftop in the rain, holding a glowing red katana, 8k, unreal engine --ar 16:9', likes: 1420, views: '15k', timeAgo: '2h' },
  { id: 102, user: '@ArtLover99', avatar: '🎨', title: 'Watercolor Fox', prompt: '/imagine prompt: A cute fluffy red fox sleeping under a giant glowing mushroom, watercolor illustration style, soft pastel colors, dreamy --ar 1:1', likes: 856, views: '10k', timeAgo: '5h' },
  { id: 103, user: '@TechGuru', avatar: '💻', title: 'AI Server Room', prompt: '/imagine prompt: Inside a massive futuristic quantum computer server room, glowing blue fiber optic cables, cinematic lighting, photorealistic --ar 16:9', likes: 2100, views: '28k', timeAgo: '1d' },
  { id: 104, user: '@MovieBuff', avatar: '🎬', title: 'Dune Desert', prompt: '/imagine prompt: Epic cinematic wide shot of a giant sandworm emerging from deep orange desert dunes, tiny human figure in foreground, Denis Villeneuve style --ar 21:9', likes: 3450, views: '42k', timeAgo: '2d' },
];

// Existing exports (truncated to avoid size limits, keeping full arrays)
export const imagePeopleTemplates = [
  { id: 1, title: 'Der alte Fischer', prompt: '/imagine prompt: Cinematic close-up portrait of an old fisherman with a weathered face and deep wrinkles, wearing a yellow raincoat, stormy sea in the background, 8k, photorealistic, dramatic lighting --ar 4:5', color: 'from-blue-800 to-slate-900', likes: 1245, views: '15.2k' },
  { id: 2, title: 'Cyberpunk Hackerin', prompt: '/imagine prompt: Neon-lit portrait of a female cyberpunk hacker with glowing blue cybernetic implants, wearing a dark hoodie, rain reflecting on her face, Tokyo alleyway, neon colors --ar 4:5', color: 'from-pink-600 to-purple-900', likes: 3890, views: '45.1k' },
  { id: 3, title: 'Business Headshot', prompt: '/imagine prompt: Professional corporate headshot of a confident young CEO, wearing a sharp navy blue suit, modern glass office background, natural soft lighting, highly detailed --ar 1:1', color: 'from-slate-400 to-slate-700', likes: 856, views: '10.3k' },
  { id: 4, title: 'Fantasy Krieger', prompt: '/imagine prompt: A fierce medieval fantasy warrior standing on a battlefield, wearing heavy battle-worn armor, holding a glowing broadsword, smoke and embers in the air, epic fantasy art --ar 16:9', color: 'from-orange-700 to-red-900', likes: 2100, views: '28.9k' },
];
export const imageCoupleTemplates = [
  { id: 1, title: 'Kuss im Neon-Regen', prompt: '/imagine prompt: A romantic couple kissing under a clear umbrella in a rainy cyberpunk city, neon reflections on the wet street, cinematic lighting, 8k --ar 16:9', color: 'from-purple-600 to-indigo-900', likes: 5430, views: '82.5k' },
  { id: 2, title: 'Älteres Paar im Herbst', prompt: '/imagine prompt: A heartwarming photo of an elderly couple holding hands walking down a path covered in golden autumn leaves, soft sunlight, nostalgic mood --ar 16:9', color: 'from-orange-400 to-yellow-600', likes: 8900, views: '110k' },
];
export const videoMiscTemplates = [
  { id: 1, title: 'Drohnenflug Vulkan', prompt: 'Aerial drone shot, flying over an active erupting volcano, glowing lava flows, thick smoke, cinematic motion, 4k, realistic physics', color: 'from-orange-600 to-red-900', likes: 8400, views: '125k' },
  { id: 2, title: 'Kaffee Makro', prompt: 'Extreme close-up macro shot, a rich drop of espresso falling in slow motion into a cup, perfect crema, dynamic lighting, 120fps', color: 'from-amber-700 to-amber-900', likes: 5200, views: '78.3k' },
];
export const videoPeopleTemplates = [
  { id: 1, title: 'Porträt Drehung', prompt: 'Slow motion portrait, a beautiful woman with red hair turning around to look at the camera, wind blowing her hair, golden hour lighting', color: 'from-orange-500 to-red-600', likes: 2340, views: '31.2k' },
];
export const videoCoupleTemplates = [
  { id: 1, title: 'Tanz im Regen', prompt: 'Slow motion, a romantic couple dancing and laughing in a heavy downpour under a warm streetlamp, cinematic romance', color: 'from-blue-500 to-indigo-700', likes: 12400, views: '185k' },
];
export const extendedMusicTemplates = [
  { id: 1, title: 'Lo-Fi Chill Beats', genre: 'Lo-Fi / Hip Hop', platform: 'Suno AI', mood: 'Relaxed', time: '02:30', likes: 1240, views: '8.5k', prompt: '[Genre: Lo-Fi Hip Hop, Chillhop] [Mood: Relaxing, late night study] [Instruments: Vinyl crackle, soft electric piano, slow drum loop] A cozy instrumental track for studying.', color: 'from-indigo-500 to-purple-600' },
  { id: 2, title: 'Epic Cyberpunk Synthwave', genre: 'Synthwave', platform: 'Udio', mood: 'Energetic', time: '03:15', likes: 892, views: '5.2k', prompt: '[Genre: Synthwave, Darksynth] [Mood: Energetic, driving, futuristic] [Instruments: Heavy bass synth, fast arpeggiators, retro drum machine] An adrenaline-pumping track for a high-speed car chase.', color: 'from-pink-600 to-orange-500' },
];
export const repairTutorials = [
  { id: 1, category: '📱 Smartphone', title: 'iPhone 13 Display tauschen', device: 'Apple iPhone 13', difficulty: 'Mittel', time: '45 Min', likes: 4500, views: '142k', color: 'from-blue-600 to-indigo-900' },
  { id: 2, category: '📱 Smartphone', title: 'Akku wechseln in 10 Min', device: 'Samsung Galaxy S22', difficulty: 'Leicht', time: '10 Min', likes: 3200, views: '89k', color: 'from-emerald-600 to-green-900' },
];
export const learningTutorials = [
  { id: 1, category: '🤖 ChatGPT', title: 'Die perfekten ersten Prompts', level: 'Anfänger', time: '10 Min', likes: 12500, views: '340k', description: 'Wie du aufhörst mit ChatGPT wie mit Google zu reden und stattdessen richtige Ergebnisse bekommst.', color: 'from-emerald-600 to-green-900' },
  { id: 2, category: '🎨 Midjourney', title: 'Vom Anfänger zum Profi in 15 Min', level: 'Anfänger', time: '15 Min', likes: 8400, views: '215k', description: 'Die wichtigsten Parameter (--ar, --v, --stylize) einfach erklärt an Praxisbeispielen.', color: 'from-blue-600 to-indigo-900' },
];