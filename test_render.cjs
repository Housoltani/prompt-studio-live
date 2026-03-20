const fs = require('fs');
// This is a rough hack to check if there are syntax errors or top-level runtime errors in JS
try {
  require('child_process').execSync('node -c src/components/FlowBuilder.jsx');
  console.log('FlowBuilder syntax ok');
} catch (e) {
  console.error('FlowBuilder syntax error', e.message);
}
