const fs = require('fs');

// 1. Add route to App.jsx
let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

if (!appJsx.includes('const CommandDashboard = lazy')) {
  appJsx = appJsx.replace("const NotebookLM = lazy(() => import('./components/NotebookLM'))", "const NotebookLM = lazy(() => import('./components/NotebookLM'))\nconst CommandDashboard = lazy(() => import('./components/CommandDashboard'))");
}

if (!appJsx.includes('<Route path="home"')) {
  const routeInject = `
        <Route path="home" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        }><CommandDashboard /></Suspense>} />
`;
  appJsx = appJsx.replace("{/* --- 1. MEIN STUDIO (MIT SHARE BUTTONS) --- */}", routeInject + "\n          {/* --- 1. MEIN STUDIO (MIT SHARE BUTTONS) --- */}");
  
  // Update the root redirect to point to home instead of agents
  appJsx = appJsx.replace('<Route path="/" element={<Navigate to="agents" replace />} />', '<Route path="/" element={<Navigate to="home" replace />} />');
  
  fs.writeFileSync('src/App.jsx', appJsx, 'utf8');
}

// 2. Add to data.js tabs (we'll put it at the very top of KREATION & GENERATOREN)
let dataJs = fs.readFileSync('src/data.js', 'utf8');
if (!dataJs.includes("{ id: 'home'")) {
  dataJs = dataJs.replace("// --- KREATION & GENERATOREN ---", "// --- KREATION & GENERATOREN ---\n  { id: 'home', name: '🏠 Command Dashboard', category: 'KREATION & GENERATOREN', desc: 'Deine Startzentrale' },");
  fs.writeFileSync('src/data.js', dataJs, 'utf8');
}

// 3. Update i18n
let i18n = fs.readFileSync('src/i18n.js', 'utf8');
if (!i18n.includes('home: "🏠 Command Dashboard"')) {
  i18n = i18n.replace(/generator: "✨ Live Generator",/g, 'home: "🏠 Command Dashboard",\n      generator: "✨ Live Generator",');
  i18n = i18n.replace(/generator: "✨ المولد المباشر",/g, 'home: "🏠 لوحة القيادة",\n      generator: "✨ المولد المباشر",');
  fs.writeFileSync('src/i18n.js', i18n, 'utf8');
}

