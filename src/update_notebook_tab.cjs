const fs = require('fs');

// 1. Add route to App.jsx
let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

if (!appJsx.includes('const NotebookLM = lazy')) {
  appJsx = appJsx.replace("const AuthProfile = lazy(() => import('./components/AuthProfile'))", "const AuthProfile = lazy(() => import('./components/AuthProfile'))\nconst NotebookLM = lazy(() => import('./components/NotebookLM'))");
}

if (!appJsx.includes('<Route path="notebook"')) {
  const routeInject = `
        <Route path="notebook" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        }><NotebookLM /></Suspense>} />
`;
  appJsx = appJsx.replace("{/* --- 1. MEIN STUDIO (MIT SHARE BUTTONS) --- */}", routeInject + "\n          {/* --- 1. MEIN STUDIO (MIT SHARE BUTTONS) --- */}");
  fs.writeFileSync('src/App.jsx', appJsx, 'utf8');
}

// 2. Add to data.js tabs
let dataJs = fs.readFileSync('src/data.js', 'utf8');
if (!dataJs.includes("{ id: 'notebook'")) {
  dataJs = dataJs.replace("{ id: 'studio', name: '📂 Mein Workspace', category: 'WORKSPACE & AUTOMATISIERUNG', desc: 'Deine gespeicherten Werke' },", "{ id: 'studio', name: '📂 Mein Workspace', category: 'WORKSPACE & AUTOMATISIERUNG', desc: 'Deine gespeicherten Werke' },\n  { id: 'notebook', name: '📚 Notebook LM', category: 'WORKSPACE & AUTOMATISIERUNG', desc: 'Dokumenten Analyse & Podcast' },");
  fs.writeFileSync('src/data.js', dataJs, 'utf8');
}

// 3. Update i18n
let i18n = fs.readFileSync('src/i18n.js', 'utf8');
if (!i18n.includes('notebook: "📚 Notebook LM"')) {
  i18n = i18n.replace(/studio: "📂 Mein Workspace",/g, 'studio: "📂 Mein Workspace",\n      notebook: "📚 Notebook LM",');
  i18n = i18n.replace(/studio: "📂 My Workspace",/g, 'studio: "📂 My Workspace",\n      notebook: "📚 Notebook LM",');
  i18n = i18n.replace(/studio: "📂 مساحة العمل",/g, 'studio: "📂 مساحة العمل",\n      notebook: "📚 الدفتر الذكي",');
  fs.writeFileSync('src/i18n.js', i18n, 'utf8');
}

