const fs = require('fs');

// We need to remove the analytics block from AuthProfile if we want it isolated, but leaving it is fine too as a preview. I will remove it to avoid confusion.
let authJsx = fs.readFileSync('src/components/AuthProfile.jsx', 'utf8');

const analyticsStart = "{/* PHASE 2: CREATOR ANALYTICS DASHBOARD */}";
const analyticsEnd = "        )}";

if (authJsx.includes(analyticsStart)) {
  const startIdx = authJsx.indexOf(analyticsStart);
  // Find the end by looking for the next ')' after the start
  const endIdx = authJsx.indexOf(analyticsEnd, startIdx);
  if (endIdx !== -1) {
    const before = authJsx.substring(0, startIdx);
    const after = authJsx.substring(endIdx + analyticsEnd.length);
    fs.writeFileSync('src/components/AuthProfile.jsx', before + after, 'utf8');
    console.log('Removed old analytics from AuthProfile.');
  }
}
