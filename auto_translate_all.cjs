const fs = require('fs');
const path = require('path');
const envData = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
const envVars = {};
envData.split('\n').forEach(line => {
  if (line.includes('=')) {
    const [key, ...rest] = line.split('=');
    envVars[key.trim()] = rest.join('=').trim();
  }
});
const apiKey = envVars['VITE_OPENROUTER_API_KEY'];

const { OpenAI } = require('openai');
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: apiKey,
});

const componentsDir = path.join(__dirname, 'src', 'components');

async function processFile(filename) {
  const filePath = path.join(componentsDir, filename);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const componentName = filename.replace('.jsx', '');
  
  // skip if already has translations
  if (content.includes(`t.${componentName}`) || content.includes('useLanguage')) {
    console.log(`Skipping ${filename} (looks translated).`);
    return;
  }

  console.log(`Processing ${filename}...`);

  const prompt = `
You are an expert React developer and Arabic translator. 
I have a React component named "${componentName}". It contains hardcoded German text in its JSX.
1. Extract all hardcoded German text and create a JSON object with translations for 'de', 'en', and 'ar'. The keys should be nested under a main key "${componentName}". Use short logical keys.
2. Rewrite the React component replacing the hardcoded text with \`t.${componentName}.keyName\`. 
3. Add \`import { useLanguage } from '../context/LanguageContext';\` and \`const { t } = useLanguage();\`
4. Return ONLY valid JSON:
{
  "translations": { "de": { "${componentName}": { "key1": "German" } }, "en": { "${componentName}": { "key1": "English" } }, "ar": { "${componentName}": { "key1": "Arabic" } } },
  "newCode": "..."
}
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.5-flash',
      messages: [
        { role: 'system', content: 'You only return valid JSON.' },
        { role: 'user', content: prompt + '\n\nFile Content:\n' + content }
      ],
      max_tokens: 4000,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content);

    if (result.newCode && result.translations) {
      fs.writeFileSync(filePath, result.newCode, 'utf8');
      fs.writeFileSync(path.join(__dirname, `translations_${componentName}.json`), JSON.stringify(result.translations, null, 2), 'utf8');
      console.log(`Successfully processed ${filename}`);
    }
  } catch (err) {
    console.error(`Error processing ${filename}:`, err.message);
  }
}

async function run() {
  const targetFiles = [
    'AIAcademy.jsx', 'Studio.jsx', 'CommunityFeed.jsx', 'FlowBuilder.jsx', 
    'AuthProfile.jsx', 'EbookStudio.jsx', 'AgentsHub.jsx', 'PromptArena.jsx',
    'EarnCredits.jsx', 'Feedback.jsx', 'Pricing.jsx'
  ];
  for (const file of targetFiles) {
    await processFile(file);
    // sleep to avoid rate limits
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('ALL DONE');
}

run();
