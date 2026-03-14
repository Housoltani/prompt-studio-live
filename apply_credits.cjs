const fs = require('fs');
const generatorPath = '/Users/houcemsoltani/.openclaw/workspace/prompt-studio-live/src/components/LiveGenerator.jsx';
let genContent = fs.readFileSync(generatorPath, 'utf8');

// Import useCredits in Generator
genContent = genContent.replace(
  "import { toast } from 'react-hot-toast';",
  "import { toast } from 'react-hot-toast';\nimport { useCredits } from '../context/CreditsContext';"
);

// Get spendCredits
genContent = genContent.replace(
  "const chatEndRef = useRef(null);",
  "const chatEndRef = useRef(null);\n  const { spendCredits } = useCredits();"
);

// Apply logic when generating
const generateCheck = `  const handleGenerate = async () => {
    if (!input.trim() && !imageUrl) {
      toast.error('Bitte gib einen Prompt oder ein Bild ein!');
      return;
    }`;

const newGenerateCheck = `  const handleGenerate = async () => {
    if (!input.trim() && !imageUrl) {
      toast.error('Bitte gib einen Prompt oder ein Bild ein!');
      return;
    }
    
    // Check credits before starting (1 prompt = 5 credits)
    if (!spendCredits(5, 'KI Generierung')) {
      return;
    }`;

genContent = genContent.replace(generateCheck, newGenerateCheck);

fs.writeFileSync(generatorPath, genContent);
console.log('Credits system wired into LiveGenerator!');

const mixerPath = '/Users/houcemsoltani/.openclaw/workspace/prompt-studio-live/src/components/PromptMixer.jsx';
let mixerContent = fs.readFileSync(mixerPath, 'utf8');

mixerContent = mixerContent.replace(
  "import { toast } from 'react-hot-toast';",
  "import { toast } from 'react-hot-toast';\nimport { useCredits } from '../context/CreditsContext';"
);

mixerContent = mixerContent.replace(
  "const [isOptimizing, setIsOptimizing] = useState(false);",
  "const [isOptimizing, setIsOptimizing] = useState(false);\n  const { spendCredits } = useCredits();"
);

const optimizeCheck = `  const handleOptimize = async () => {
    if (!basePrompt || basePrompt.trim() === '') {
      toast.error('Bitte gib zuerst einen Basis-Prompt ein!');
      return;
    }`;

const newOptimizeCheck = `  const handleOptimize = async () => {
    if (!basePrompt || basePrompt.trim() === '') {
      toast.error('Bitte gib zuerst einen Basis-Prompt ein!');
      return;
    }
    
    if (!spendCredits(2, 'KI Magic Optimize')) {
      return;
    }`;

mixerContent = mixerContent.replace(optimizeCheck, newOptimizeCheck);

fs.writeFileSync(mixerPath, mixerContent);
console.log('Credits system wired into PromptMixer AI Weapon!');
