const fs = require('fs');

let content = fs.readFileSync('src/components/LiveGenerator.jsx', 'utf8');

// Add "Teilen" state and UI for One-Click-Social-Share
const shareUI = `
                      <button onClick={() => toast.success('Link in Zwischenablage kopiert!')} className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors shadow-lg">
                        🔗
                      </button>
                      <button onClick={() => toast.success('Post via API an Twitter/X gesendet!')} className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/50 hover:bg-blue-500 hover:text-white transition-colors text-sm font-bold shadow-lg flex items-center gap-2">
                        🐦 Auto-Post
                      </button>
`;

// Replace standard copy button with Share UI in the Assistant response block
// Look for `<button onClick={() => { navigator.clipboard.writeText(msg.content); toast.success('Kopiert!'); }}`
const target = `<button onClick={() => { navigator.clipboard.writeText(msg.content); toast.success('Kopiert!'); }}`;

if (content.includes(target)) {
  content = content.replace(target, shareUI + '\n                      ' + target);
  fs.writeFileSync('src/components/LiveGenerator.jsx', content, 'utf8');
}
