const fs = require('fs');

// 1. Add route to App.jsx
let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

// Ensure import
if (!appJsx.includes('const CreatorDashboard = lazy')) {
  appJsx = appJsx.replace("const AuthProfile = lazy(() => import('./components/AuthProfile'))", "const AuthProfile = lazy(() => import('./components/AuthProfile'))\nconst CreatorDashboard = lazy(() => import('./components/CreatorDashboard'))");
}

// Ensure route
if (!appJsx.includes('<Route path="analytics"')) {
  const routeInject = `
        <Route path="analytics" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        }><CreatorDashboard /></Suspense>} />
`;
  appJsx = appJsx.replace("{/* --- 1. MEIN STUDIO (MIT SHARE BUTTONS) --- */}", routeInject + "\n          {/* --- 1. MEIN STUDIO (MIT SHARE BUTTONS) --- */}");
  fs.writeFileSync('src/App.jsx', appJsx, 'utf8');
}

// 2. Add to data.js tabs
let dataJs = fs.readFileSync('src/data.js', 'utf8');
if (!dataJs.includes("{ id: 'analytics'")) {
  dataJs = dataJs.replace("{ id: 'marketplace', name: '💰 Prompt Marktplatz', category: 'BIBLIOTHEKEN & INSPIRATION', desc: 'Prompts kaufen & verkaufen' },", "{ id: 'marketplace', name: '💰 Prompt Marktplatz', category: 'BIBLIOTHEKEN & INSPIRATION', desc: 'Prompts kaufen & verkaufen' },\n  { id: 'analytics', name: '📊 Creator Dashboard', category: 'BIBLIOTHEKEN & INSPIRATION', desc: 'Deine Verkäufe & Analysen' },");
  fs.writeFileSync('src/data.js', dataJs, 'utf8');
}

// 3. Update i18n
let i18n = fs.readFileSync('src/i18n.js', 'utf8');
if (!i18n.includes('analytics: "📊 Creator Dashboard"')) {
  i18n = i18n.replace(/marketplace: "💰 Prompt Marktplatz",/g, 'marketplace: "💰 Prompt Marktplatz",\n      analytics: "📊 Creator Dashboard",');
  i18n = i18n.replace(/marketplace: "💰 Prompt Marketplace",/g, 'marketplace: "💰 Prompt Marketplace",\n      analytics: "📊 Creator Dashboard",');
  i18n = i18n.replace(/marketplace: "💰 سوق التلقينات",/g, 'marketplace: "💰 سوق التلقينات",\n      analytics: "📊 لوحة تحكم المبدع",');
  fs.writeFileSync('src/i18n.js', i18n, 'utf8');
}

