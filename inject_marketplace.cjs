const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'components', 'Marketplace.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

if (!content.includes('import { supabase } from')) {
  content = content.replace(
    "import { useLanguage } from '../context/LanguageContext';",
    "import { useLanguage } from '../context/LanguageContext';\nimport { supabase } from '../supabaseClient';\nimport { useEffect } from 'react';\nimport { useAuth } from '../context/AuthContext';"
  );
}

if (!content.includes('const fetchPublicPrompts')) {
  const hooksFind = "const categories = [";
  const hooksReplace = `const { user } = useAuth();\n  
  useEffect(() => {
    fetchPublicPrompts();
  }, []);

  const fetchPublicPrompts = async () => {
    try {
      const { data, error } = await supabase.from('prompts').select('id, title, description, category, user_id, content').eq('is_public', true).limit(50);
      if (error) throw error;
      if (data && data.length > 0) {
        const mappedPrompts = data.map(p => ({
          id: p.id,
          title: p.title,
          desc: p.description,
          price: '50 ⚡',
          creator: 'Community',
          category: p.category || 'General',
          content: p.content,
          isDbPrompt: true
        }));
        setPrompts([...mappedPrompts, ...initialPrompts]);
      }
    } catch (err) {
      console.error('Error fetching marketplace prompts:', err);
    }
  };

  const categories = [`;
  content = content.replace(hooksFind, hooksReplace);
}

if (!content.includes('saveToVault(item)')) {
  const findBuy = `if (spendCredits(cost, \`\${t.Marketplace.costPrefix} \${item.title}\`)) {`;
  const replaceBuy = `if (spendCredits(cost, \`\${t.Marketplace.costPrefix} \${item.title}\`)) {
      if (item.isDbPrompt && user) {
        // Add purchased prompt to user vault
        supabase.from('prompts').insert([{
          user_id: user.id,
          title: item.title,
          content: item.content,
          description: item.desc,
          category: item.category,
          is_public: false
        }]).then(({error}) => {
           if (error) toast.error('Konnte nicht in Tresor gespeichert werden!');
        });
      }`;
  content = content.replace(findBuy, replaceBuy);
}

fs.writeFileSync(targetFile, content);
console.log('Patched Marketplace.jsx successfully.');
