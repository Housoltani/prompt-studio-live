import fs from 'fs';

let content = fs.readFileSync('./prompt-studio-live/src/components/PromptMixer.jsx', 'utf8');

// The issue might be a runtime error. Let's make sure PROMPT_BLOCKS is completely stripped of any possible effect loops.
content = content.replace(/const \[activeCategoryState, setActiveCategoryState\] = useState\(categories\[0\]\);[\s\S]*?const setActiveCategory = \(cat\) => \{\n\s*setActiveCategoryState\(cat\);\n\s*\};/, `
  const [activeCategoryState, setActiveCategoryState] = useState(categories[0]);
  
  // Safe active category determination without effects
  const activeCategory = (PROMPT_BLOCKS && PROMPT_BLOCKS[activeCategoryState]) ? activeCategoryState : (PROMPT_BLOCKS ? Object.keys(PROMPT_BLOCKS)[0] : '');

  const setActiveCategory = (cat) => {
    setActiveCategoryState(cat);
  };
`);

fs.writeFileSync('./prompt-studio-live/src/components/PromptMixer.jsx', content);
