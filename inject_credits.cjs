const fs = require('fs');

// 1. App.jsx Updates
const appPath = '/Users/houcemsoltani/.openclaw/workspace/prompt-studio-live/src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8');

// Import the Provider and the new Component
appContent = appContent.replace(
  "import { translations } from './i18n.js'",
  "import { translations } from './i18n.js'\nimport { CreditsProvider, useCredits } from './context/CreditsContext'"
);

appContent = appContent.replace(
  "const AuthProfile = lazy(() => import('./components/AuthProfile'))",
  "const AuthProfile = lazy(() => import('./components/AuthProfile'))\nconst EarnCredits = lazy(() => import('./components/EarnCredits'))"
);

// Create an inner AppContent component because we need to use 'useCredits' hook inside App layout (header)
// Actually, wrapping the whole export default App is easier. Let's rename App to AppContent and export App wrapped in Provider.
appContent = appContent.replace("function App() {", "function AppContent() {");
appContent = appContent.replace("export default App", "export default function App() { return <CreditsProvider><AppContent /></CreditsProvider>; }");

// Inject useCredits inside AppContent
appContent = appContent.replace("const t = translations[lang]", "const t = translations[lang]\n  const { credits } = useCredits()");

// Add credits to Header (next to User)
const headerUser = `{user ? (
                <div className="flex items-center gap-3 bg-slate-800/50 pl-3 pr-1 py-1 rounded-full border border-slate-700">`;

const newHeaderUser = `
             <NavLink to="/app/credits" className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-sm font-bold transition-colors">
               <span>🪙</span> {credits}
             </NavLink>
             {user ? (
                <div className="flex items-center gap-3 bg-slate-800/50 pl-3 pr-1 py-1 rounded-full border border-slate-700">`;

if (!appContent.includes("to=\"/app/credits\"")) {
  appContent = appContent.replace(headerUser, newHeaderUser);
}

// Add route for EarnCredits
const fallback = `<Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }>`;

const creditsRoute = `
        {/* --- EARN CREDITS --- */}
        <Route path="credits" element={${fallback}<EarnCredits /></Suspense>} />
`;
appContent = appContent.replace("{/* --- PLACEHOLDER FOR OTHERS --- */}", creditsRoute + "\n        {/* --- PLACEHOLDER FOR OTHERS --- */}");

fs.writeFileSync(appPath, appContent);
console.log("App.jsx configured with Credits context and UI.");

// 2. data.js - Add it to sidebar navigation
const dataPath = '/Users/houcemsoltani/.openclaw/workspace/prompt-studio-live/src/data.js';
let dataContent = fs.readFileSync(dataPath, 'utf8');
if (!dataContent.includes("id: 'credits'")) {
  dataContent = dataContent.replace(
    "{ id: 'marketplace', name: '💰 Marktplatz', desc: 'Prompts kaufen & verkaufen' },",
    "{ id: 'marketplace', name: '💰 Marktplatz', desc: 'Prompts kaufen & verkaufen' },\n  { id: 'credits', name: '💎 Kredite sammeln', desc: 'Werbung für Coins' },"
  );
  fs.writeFileSync(dataPath, dataContent);
  console.log("data.js updated with credits tab.");
}
