const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'src', 'data.js');
let content = fs.readFileSync(dataFile, 'utf8');

if (!content.includes("id: 'pricing'")) {
  content = content.replace(
    "{ id: 'credits', name: '⚡ Sparks & Credits', category: 'SYSTEM & LERNEN', desc: 'Sparks für Premium KI aufladen' },",
    "{ id: 'credits', name: '⚡ Sparks & Credits', category: 'SYSTEM & LERNEN', desc: 'Sparks für Premium KI aufladen' },\n  { id: 'pricing', name: '💎 Das Arsenal (Preise)', category: 'SYSTEM & LERNEN', desc: 'Abonnements & A-la-Carte' },"
  );
  fs.writeFileSync(dataFile, content);
  console.log("Added pricing to data.js");
}

const appFile = path.join(__dirname, 'src', 'App.jsx');
let appContent = fs.readFileSync(appFile, 'utf8');

// I also need to update the Route so it matches the /app/pricing format since the Sidebar links to /app/:id
if (!appContent.includes('<Route path="pricing" element={<Pricing />} />') && appContent.includes('<Route path="pricing" element={<Suspense fallback={<LoadingCore />}><Pricing /></Suspense>} />')) {
  // It's already there! Let's check if it's inside the Route path="/app"
  // Actually, App.jsx has `<Route path="app" element={<Layout />}>` and inside it `<Route path=":id" ...>` or explicit routes?
}

