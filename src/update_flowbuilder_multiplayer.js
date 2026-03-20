const fs = require('fs');

let content = fs.readFileSync('src/components/FlowBuilder.jsx', 'utf8');

const imports = `import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../supabaseClient';`;

if (!content.includes('import { supabase }')) {
  content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';\n" + imports);
}

// Add state for multiplayer cursors
const multiplayerState = `  const [cursors, setCursors] = useState({});
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  useEffect(() => {
    if (!isMultiplayer) return;

    // Simulate Supabase Realtime Presence
    const room = supabase.channel('flow_builder_room', {
      config: { presence: { key: 'user_' + Math.floor(Math.random() * 1000) } }
    });

    room.on('presence', { event: 'sync' }, () => {
      // In a real app we'd get actual states here
    });

    room.on('broadcast', { event: 'cursor_move' }, (payload) => {
      setCursors(prev => ({ ...prev, [payload.userId]: payload.position }));
    });

    room.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await room.track({ online_at: new Date().toISOString() });
      }
    });

    // Mock other users joining and moving for demo purposes
    const mockInterval = setInterval(() => {
      setCursors({
        'user_1': { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, name: 'Alex', color: '#3b82f6' },
        'user_2': { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, name: 'Sarah', color: '#10b981' }
      });
    }, 2000);

    return () => {
      clearInterval(mockInterval);
      supabase.removeChannel(room);
    };
  }, [isMultiplayer]);

  const handleMouseMove = (e) => {
    if (!isMultiplayer) return;
    // Broadcast own cursor (mocked for now to avoid spamming actual supabase in demo)
  };
`;

content = content.replace(/const \[showApiModal, setShowApiModal\] = useState\(false\);/, 'const [showApiModal, setShowApiModal] = useState(false);\n' + multiplayerState);

// Add the Multiplayer Toggle to the header
const multiplayerButton = `
          {/* Multiplayer Toggle */}
          <button 
            onClick={() => setIsMultiplayer(!isMultiplayer)}
            className={\`px-4 py-2 rounded-xl text-sm font-bold border flex items-center gap-2 transition-all shadow-lg \${isMultiplayer ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}\`}
          >
            <span className="text-lg">🌍</span> {isMultiplayer ? 'Live Session: Aktiv (3)' : 'Team einladen'}
          </button>
`;

// Insert the multiplayer button before the deploy button in the header
content = content.replace(/<div className="flex gap-3">/, '<div className="flex items-center gap-3">\n' + multiplayerButton);

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

// Inject into the builder area (find the relative container)
// Search for `<div className="w-full flex justify-center mb-16 relative">` or similar
// Actually, let's just inject it at the top of the grid view
content = content.replace(/<div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">/, '<div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative" onMouseMove={handleMouseMove}>\n' + cursorsOverlay);

fs.writeFileSync('src/components/FlowBuilder.jsx', content, 'utf8');
console.log('Multiplayer Phase 3 injected successfully.');
