const fs = require('fs');
let content = fs.readFileSync('src/components/FlowBuilder.jsx', 'utf8');

// I never injected the imports properly! It didn't find `import React, { useState } from 'react';` or something similar, or the search pattern failed. Let's fix it.
if (!content.includes('import { useLanguage }')) {
  content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { useLanguage } from '../context/LanguageContext';");
  fs.writeFileSync('src/components/FlowBuilder.jsx', content, 'utf8');
}
