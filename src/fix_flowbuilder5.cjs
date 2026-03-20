const fs = require('fs');
let content = fs.readFileSync('src/components/FlowBuilder.jsx', 'utf8');

if (content.includes('import { useLanguage }') && !content.includes('const { t } = useLanguage();')) {
  // We imported useLanguage but we didn't call it inside the component.
  // Actually we didn't replace `useLanguage` usage. 
  // Let's make sure it doesn't crash if useLanguage is imported but not called, which is fine, but maybe eslint fails or unused var.
  
  content = content.replace("export default function FlowBuilder() {", "export default function FlowBuilder() {\n  const { t } = useLanguage();");
  fs.writeFileSync('src/components/FlowBuilder.jsx', content, 'utf8');
}
