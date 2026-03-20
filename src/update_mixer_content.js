import fs from 'fs';

const mixerPath = './prompt-studio-live/src/components/PromptMixer.jsx';
let content = fs.readFileSync(mixerPath, 'utf8');

// I will refactor PROMPT_BLOCKS into a function getPromptBlocks(t) to allow translations

content = content.replace(/const PROMPT_BLOCKS = \{[\s\S]*?\]\n\};/, `
const getPromptBlocks = (t) => ({
  [t?.promptMixer?.catSubject || 'Subject']: [
    { id: 'sub1', text: t?.promptMixer?.sub1 || 'A futuristic cyborg samurai', icon: '🥷' },
    { id: 'sub2', text: t?.promptMixer?.sub2 || 'A massive glowing crystal monolith', icon: '💎' },
    { id: 'sub3', text: t?.promptMixer?.sub3 || 'An abandoned overgrown train station', icon: '🌿' },
    { id: 'sub4', text: t?.promptMixer?.sub4 || 'A majestic space cruiser floating in orbit', icon: '🚀' },
    { id: 'sub5', text: t?.promptMixer?.sub5 || 'A cyberpunk street vendor cooking noodles', icon: '🍜' }
  ],
  [t?.promptMixer?.catEnv || 'Environment']: [
    { id: 'env1', text: t?.promptMixer?.env1 || 'in a rainy neon-lit alleyway', icon: '🌧️' },
    { id: 'env2', text: t?.promptMixer?.env2 || 'on the surface of Mars', icon: '🔴' },
    { id: 'env3', text: t?.promptMixer?.env3 || 'underwater surrounded by glowing coral', icon: '🌊' },
    { id: 'env4', text: t?.promptMixer?.env4 || 'in a dense enchanted forest', icon: '🌲' }
  ],
  [t?.promptMixer?.catLit || 'Lighting']: [
    { id: 'lit1', text: t?.promptMixer?.lit1 || 'cinematic volumetric lighting', icon: '🎬' },
    { id: 'lit2', text: t?.promptMixer?.lit2 || 'golden hour sunset', icon: '🌅' },
    { id: 'lit3', text: t?.promptMixer?.lit3 || 'harsh neon rim lights', icon: '🟣' },
    { id: 'lit4', text: t?.promptMixer?.lit4 || 'moody low key lighting', icon: '🌑' }
  ],
  [t?.promptMixer?.catCam || 'Camera']: [
    { id: 'cam1', text: t?.promptMixer?.cam1 || 'shot on 35mm lens, depth of field', icon: '📷' },
    { id: 'cam2', text: t?.promptMixer?.cam2 || 'drone aerial view from above', icon: '🚁' },
    { id: 'cam3', text: t?.promptMixer?.cam3 || 'macro close up, high detail', icon: '🔍' },
    { id: 'cam4', text: t?.promptMixer?.cam4 || 'wide angle fisheye lens', icon: '👁️' }
  ],
  [t?.promptMixer?.catStyle || 'Style']: [
    { id: 'sty1', text: t?.promptMixer?.sty1 || 'in the style of Studio Ghibli', icon: '🎨' },
    { id: 'sty2', text: t?.promptMixer?.sty2 || 'hyperrealistic Unreal Engine 5 render', icon: '🎮' },
    { id: 'sty3', text: t?.promptMixer?.sty3 || 'vintage 80s anime aesthetic', icon: '📺' },
    { id: 'sty4', text: t?.promptMixer?.sty4 || 'oil painting, thick impasto brushstrokes', icon: '🖌️' }
  ]
});
`);

// Inside component
content = content.replace(/const \[activeCategory, setActiveCategory\] = useState\('Subject'\);/, "const PROMPT_BLOCKS = getPromptBlocks(t);\n  const [activeCategory, setActiveCategory] = useState(Object.keys(PROMPT_BLOCKS)[0]);");

// UI Labels
content = content.replace(/>Kategorien</g, ">{t?.promptMixer?.categoriesTitle || 'Kategorien'}<");
content = content.replace(/>Parameter</g, ">{t?.promptMixer?.parametersTitle || 'Parameter'}<");
content = content.replace(/>Bausteine: /g, ">{t?.promptMixer?.blocksTitle || 'Bausteine:'} ");
content = content.replace(/> Ausgewählt</g, ">{t?.promptMixer?.selectedText || 'Ausgewählt'}<");

fs.writeFileSync(mixerPath, content);
