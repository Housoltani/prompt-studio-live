const fs = require('fs');
const path = require('path');

function replaceCinema() {
  const targetFile = path.join(__dirname, 'src', 'components', 'CinemaStudioPro.jsx');
  let content = fs.readFileSync(targetFile, 'utf8');

  // Add import
  if (!content.includes('useLanguage')) {
    content = content.replace(
      "import { useNavigate } from 'react-router-dom';",
      "import { useNavigate } from 'react-router-dom';\nimport { useLanguage } from '../context/LanguageContext';"
    );
  }

  // Add hook
  if (!content.includes('const { t } = useLanguage()')) {
    content = content.replace(
      "const navigate = useNavigate();",
      "const navigate = useNavigate();\n  const { t } = useLanguage();"
    );
  }

  // Replace text
  content = content.replace(/"Master Prompt"/g, "{t.cinema.masterPrompt}");
  content = content.replace(/"KI Pre-Vis \(5 ⚡\)"/g, "{t.cinema.preVisBtn + ' (5 ⚡)'}");
  content = content.replace(/"Visualizing..."/g, "{t.cinema.preVisLoading}");
  content = content.replace(/"In Tresor speichern"/g, "{t.cinema.saveToVault}");
  content = content.replace(/"Copy to Generator"/g, "{t.cinema.copyToGen}");

  // Also replace some single quote cases just in case
  content = content.replace(/'KI Pre-Vis \(5 ⚡\)'/g, "`${t.cinema.preVisBtn} (5 ⚡)`");
  content = content.replace(/'Visualizing...'/g, "t.cinema.preVisLoading");

  fs.writeFileSync(targetFile, content);
  console.log('Translated CinemaStudioPro.jsx');
}

function replaceSocial() {
  const targetFile = path.join(__dirname, 'src', 'components', 'SocialMediaEngine.jsx');
  let content = fs.readFileSync(targetFile, 'utf8');

  // Add import
  if (!content.includes('useLanguage')) {
    content = content.replace(
      "import { useCredits } from '../context/CreditsContext.jsx';",
      "import { useCredits } from '../context/CreditsContext.jsx';\nimport { useLanguage } from '../context/LanguageContext';"
    );
  }

  // Add hook
  if (!content.includes('const { t } = useLanguage()')) {
    content = content.replace(
      "const { spendCredits } = useCredits();",
      "const { spendCredits } = useCredits();\n  const { t } = useLanguage();"
    );
  }

  // Replace text
  content = content.replace(/'Mit KI ausführen \(2 ⚡\)'/g, "`${t.social.aiExecuteBtn} (2 ⚡)`");
  content = content.replace(/'KI arbeitet...'/g, "t.social.aiLoading");
  content = content.replace(/>Viral-Skript Generieren</g, ">{t.social.generateBtn}<");
  content = content.replace(/>\/\/\/ SCRIPT_READY</g, ">{'/// ' + t.social.scriptReady}<");
  content = content.replace(/>FORMAT:/g, ">{t.social.format}<");
  content = content.replace(/KI ANTWORT \(OpenRouter\)/g, "{t.social.aiResponse} (OpenRouter)");

  fs.writeFileSync(targetFile, content);
  console.log('Translated SocialMediaEngine.jsx');
}

function replaceVault() {
  const targetFile = path.join(__dirname, 'src', 'components', 'AuthProfile.jsx');
  let content = fs.readFileSync(targetFile, 'utf8');

  // Add import
  if (!content.includes('useLanguage')) {
    content = content.replace(
      "import { communityPrompts, marketplacePrompts } from '../data';",
      "import { communityPrompts, marketplacePrompts } from '../data';\nimport { useLanguage } from '../context/LanguageContext';"
    );
  }

  // Add hook
  if (!content.includes('const { t } = useLanguage()')) {
    content = content.replace(
      "const { credits } = useCredits();",
      "const { credits } = useCredits();\n  const { t } = useLanguage();"
    );
  }

  // Replace text
  content = content.replace(/>Tresor \/ Vault</g, ">{t.vault.tabName}<");
  content = content.replace(/>Dein Persönlicher Tresor</g, ">{t.vault.title}<");
  content = content.replace(/>Dein Tresor ist leer. Generiere und speichere Prompts in den Studios!</g, ">{t.vault.empty}<");
  content = content.replace(/'Live im Markt'/g, "t.vault.publicBtn");
  content = content.replace(/'Privat \(Veröffentlichen\)'/g, "t.vault.privateBtn");

  fs.writeFileSync(targetFile, content);
  console.log('Translated AuthProfile.jsx');
}

replaceCinema();
replaceSocial();
replaceVault();
