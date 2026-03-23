const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'main.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

if (!content.includes('AuthProvider')) {
  // Add import
  content = content.replace(
    "import { LanguageProvider } from './context/LanguageContext'",
    "import { LanguageProvider } from './context/LanguageContext'\nimport { AuthProvider } from './context/AuthContext'"
  );
  
  // Wrap LanguageProvider with AuthProvider
  content = content.replace(
    "<LanguageProvider>",
    "<AuthProvider>\n      <LanguageProvider>"
  );
  content = content.replace(
    "</LanguageProvider>",
    "</LanguageProvider>\n      </AuthProvider>"
  );
  
  fs.writeFileSync(targetFile, content);
  console.log('Patched main.jsx with AuthProvider successfully.');
} else {
  console.log('AuthProvider already in main.jsx');
}
