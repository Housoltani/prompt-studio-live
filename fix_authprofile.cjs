const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'components', 'AuthProfile.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

if (!content.includes('const [myPrompts')) {
  content = content.replace(
    "const [activeTab, setActiveTab] = useState('showcase');",
    "const [activeTab, setActiveTab] = useState('tresor');\n  const [myPrompts, setMyPrompts] = useState([]);"
  );
}

if (!content.includes('fetchMyPrompts')) {
  const findSession = `setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);`;

  const replaceSession = `setSession(session);
      if (session?.user) fetchMyPrompts(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchMyPrompts = async (userId) => {
    const { data } = await supabase.from('prompts').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (data) setMyPrompts(data);
  };

  const togglePublic = async (prompt) => {
    const newStatus = !prompt.is_public;
    const { error } = await supabase.from('prompts').update({ is_public: newStatus }).eq('id', prompt.id);
    if (!error) {
      toast.success(newStatus ? 'Prompt auf Marktplatz veröffentlicht!' : 'Prompt wieder privat.');
      setMyPrompts(myPrompts.map(p => p.id === prompt.id ? { ...p, is_public: newStatus } : p));
    }
  };`;
  content = content.replace(findSession, replaceSession);
}

// Render "Tresor" tab
if (!content.includes('Tresor / Vault')) {
  const tabsFind = `<button onClick={() => setActiveTab('showcase')} className={\`pb-4 px-2 text-sm font-medium transition-colors \${activeTab === 'showcase' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-gray-200'}\`}>Showcase</button>`;
  const tabsReplace = `<button onClick={() => setActiveTab('tresor')} className={\`pb-4 px-2 text-sm font-medium transition-colors \${activeTab === 'tresor' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-gray-200'}\`}>Tresor / Vault</button>
                    <button onClick={() => setActiveTab('showcase')} className={\`pb-4 px-2 text-sm font-medium transition-colors \${activeTab === 'showcase' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-gray-200'}\`}>Showcase</button>`;
  content = content.replace(tabsFind, tabsReplace);
}

// Render "Tresor" content
if (!content.includes('Tresorinhalt')) {
  const renderFind = `{activeTab === 'showcase' && (`;
  const renderReplace = `{activeTab === 'tresor' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-6">Dein Persönlicher Tresor</h3>
                {myPrompts.length === 0 ? (
                  <p className="text-gray-400 text-center py-10">Dein Tresor ist leer. Generiere und speichere Prompts in den Studios!</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {myPrompts.map(prompt => (
                      <div key={prompt.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                        <h4 className="font-bold text-cyan-400">{prompt.title}</h4>
                        <p className="text-xs text-gray-400 mt-1 mb-3 line-clamp-2 font-mono">{prompt.content}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">{prompt.category}</span>
                          <button 
                            onClick={() => togglePublic(prompt)}
                            className={\`text-xs px-3 py-1 rounded-full font-bold \${prompt.is_public ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-700 text-gray-300'}\`}
                          >
                            {prompt.is_public ? 'Live im Markt' : 'Privat (Veröffentlichen)'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'showcase' && (`;
  content = content.replace(renderFind, renderReplace);
}

fs.writeFileSync(targetFile, content);
console.log('Patched AuthProfile.jsx successfully.');
