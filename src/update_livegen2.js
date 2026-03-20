import fs from 'fs';

const liveGenPath = './prompt-studio-live/src/components/LiveGenerator.jsx';
let content = fs.readFileSync(liveGenPath, 'utf8');

// There might be another hook or syntax error.
// The previous change was const [persona, setPersona] = useState(() => getPersonas()[0]);
// => t was undefined in the initial load since getPersonas() lacked t. We changed it to getPersonas(null)[0].

fs.writeFileSync(liveGenPath, content);
