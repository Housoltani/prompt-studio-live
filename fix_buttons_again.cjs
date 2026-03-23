const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'components', 'CinemaStudioPro.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Inject "KI Pre-Vis" next to "Master Prompt"
const headerFind = `<h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-500 border-b border-gray-800 pb-4">
              <Sparkles className="w-5 h-5" /> Master Prompt
            </h2>`;
const headerReplace = `<div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-amber-500">
                <Sparkles className="w-5 h-5" /> Master Prompt
              </h2>
              {generatedPrompt && (
                <button 
                  onClick={executeWithAI}
                  disabled={isExecuting}
                  className="flex items-center gap-2 text-xs bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 px-3 py-1.5 rounded-lg transition-colors border border-amber-500/30 disabled:opacity-50 font-sans"
                >
                  {isExecuting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                  {isExecuting ? 'Visualizing...' : 'KI Pre-Vis'}
                </button>
              )}
            </div>`;
content = content.replace(headerFind, headerReplace);

// Inject "Save to Vault" and "AI Result" near copy
const copyFind = `<button 
                    onClick={copyToClipboard}
                    className="mt-4 flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700"
                  >`;
const copyReplace = `<div className="mt-4 flex flex-col gap-3 w-full">
                  <div className="flex gap-2">
                    <button 
                      onClick={saveToVault}
                      disabled={isSaving}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 hover:bg-gray-800 text-amber-400 rounded-lg transition-colors border border-amber-500/30 font-bold"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>}
                      In Tresor speichern
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700 font-bold"
                    >`;

content = content.replace(copyFind, copyReplace);

const endCopyFind = `{copied ? 'Copied!' : 'Copy to Generator'}
                  </button>`;
const endCopyReplace = `{copied ? 'Copied!' : 'Copy to Generator'}
                    </button>
                  </div>
                  
                  {aiResult && (
                    <div className="mt-4 p-4 bg-gray-900 border border-amber-500/30 rounded-lg relative text-left">
                      <div className="text-xs font-bold text-amber-400 flex items-center gap-2 mb-2">
                        <Bot className="w-3 h-3" /> DIRECTOR'S PRE-VIS
                      </div>
                      <div className="text-gray-300 text-xs leading-relaxed font-sans">
                        {aiResult}
                      </div>
                    </div>
                  )}
                </div>`;
content = content.replace(endCopyFind, endCopyReplace);

fs.writeFileSync(targetFile, content);
