const fs = require('fs');
let content = fs.readFileSync('src/components/FlowBuilder.jsx', 'utf8');

// Also remove `setNodes` if it's not defined
if (!content.includes('const [nodes, setNodes] = useState')) {
   // The problem is `setNodes` is defined but not used according to linter
   content = content.replace(/const \[nodes, setNodes\] = useState\(/, 'const [nodes] = useState(');
}

// Same for cursors
if (!content.includes('setCursors(')) {
   content = content.replace(/const \[cursors, setCursors\] = useState/, 'const [cursors] = useState');
}

fs.writeFileSync('src/components/FlowBuilder.jsx', content, 'utf8');
