const fs = require('fs');

let content = fs.readFileSync('src/components/FlowBuilder.jsx', 'utf8');

// The new state variables
const multiplayerState = `  const [cursors, setCursors] = useState({});
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  // Simulated Multiplayer Presence
  React.useEffect(() => {
    if (!isMultiplayer) return;

    // In a real app, this connects to Supabase Channel
    // For demo: randomly simulate teammates moving around
    const mockInterval = setInterval(() => {
      setCursors({
        'user_1': { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, name: 'Sven', color: '#3b82f6' },
        'user_2': { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, name: 'Mia', color: '#10b981' }
      });
    }, 1500);

    return () => clearInterval(mockInterval);
  }, [isMultiplayer]);
`;

content = content.replace(/const \[showApiModal, setShowApiModal\] = useState\(false\);/, 'const [showApiModal, setShowApiModal] = useState(false);\n' + multiplayerState);

// Add the Multiplayer Toggle to the header
const multiplayerButton = `
          {/* Multiplayer Toggle */}
          <button 
            onClick={() => setIsMultiplayer(!isMultiplayer)}
            className={\`px-4 py-3 rounded-xl text-sm font-bold border flex items-center gap-2 transition-all shadow-lg \${isMultiplayer ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}\`}
          >
            <span className="text-xl">🌍</span> {isMultiplayer ? 'Live Session (3)' : 'Team einladen'}
          </button>
`;

content = content.replace(/<div className="flex gap-3">/, '<div className="flex gap-3">\n' + multiplayerButton);

// Add the Cursors Overlay to the main container
const cursorsOverlay = `
        {/* Multiplayer Cursors Overlay */}
        {isMultiplayer && Object.entries(cursors).map(([id, pos]) => (
          <div 
            key={id} 
            className="absolute pointer-events-none transition-all duration-1000 ease-out z-50 flex flex-col items-center"
            style={{ left: \`\${pos.x}%\`, top: \`\${pos.y}%\` }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg transform -rotate-12">
              <path d="M4 4L9.5 22L12.5 14.5L20 11.5L4 4Z" fill={pos.color} stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <div className="mt-1 px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-md whitespace-nowrap" style={{ backgroundColor: pos.color }}>
              {pos.name}
            </div>
          </div>
        ))}
`;

const gridPattern = /<div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">/;
if (content.includes('<div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">')) {
  content = content.replace(gridPattern, '<div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">\n' + cursorsOverlay);
  fs.writeFileSync('src/components/FlowBuilder.jsx', content, 'utf8');
  console.log('Multiplayer Phase 3 injected successfully.');
} else {
  // alternative
  const altPattern = /<div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">/;
  content = content.replace(altPattern, '<div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">\n' + cursorsOverlay);
  fs.writeFileSync('src/components/FlowBuilder.jsx', content, 'utf8');
  console.log('Multiplayer Phase 3 injected successfully (alt anchor).');
}

