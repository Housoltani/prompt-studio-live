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
  const content = fs.readFileSync(filePath, 'utf8');
  const componentName = filename.replace('.jsx', '');
  
  console.log(`Processing ${filename}...`);

  const prompt = `
You are an expert React developer and Arabic translator. 
I have a React component named "${componentName}". It contains hardcoded German text in its JSX.
1. Extract all hardcoded German text and create a JSON object with translations for 'de', 'en', and 'ar'. The keys should be nested under a main key "${componentName}". Use short logical keys.
2. Rewrite the React component replacing the hardcoded text with \`t.${componentName}.keyName\`. 
3. Add \`import { useLanguage } from '../context/LanguageContext';\`
4. Add \`const { t } = useLanguage();\`
5. Output valid JSON.

Return ONLY a valid JSON object matching this schema. NO markdown backticks, NO extra text:
{
  "translations": {
    "de": { "${componentName}": { "key1": "German" } },
    "en": { "${componentName}": { "key1": "English" } },
    "ar": { "${componentName}": { "key1": "Arabic" } }
  },
  "newCode": "import React from 'react';\\nimport { useLanguage }..."
}
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.5-flash',
      messages: [
        { role: 'system', content: 'You only return valid JSON.' },
        { role: 'user', content: prompt + '\n\nFile Content:\n' + content }
      ],
      max_tokens: 3000,
      response_format: { type: 'json_object' }
    });

    const resultText = response.choices[0].message.content;
    const result = JSON.parse(resultText);

    if (result.newCode && result.translations) {
      fs.writeFileSync(filePath, result.newCode, 'utf8');
      fs.writeFileSync(path.join(__dirname, `translations_${componentName}.json`), JSON.stringify(result.translations, null, 2), 'utf8');
      console.log(`Successfully processed ${filename}`);
    } else {
      console.log(`Failed to parse expected format for ${filename}`);
    }

  } catch (err) {
    console.error(`Error processing ${filename}:`, err.message);
  }
}

async function run() {
  const targetFiles = ['Marketplace.jsx'];
  for (const file of targetFiles) {
    await processFile(file);
  }
}

run();
