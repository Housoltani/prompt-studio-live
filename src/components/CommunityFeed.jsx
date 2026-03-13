import React, { useState } from 'react';
import { communityPrompts } from '../data.js';
import { toast } from 'react-hot-toast';

export default function CommunityFeed() {
  const [feed, setFeed] = useState(communityPrompts);

  const forkPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt.prompt);
    toast.success(`Prompt "${prompt.title}" in dein Studio kopiert!`);
  };

  return (
    <div className="max-w-4xl animate-fade-in mx-auto mt-4 pb-20">
      <h2 className="text-3xl font-bold mb-2 text-gradient from-amber-400 to-orange-500">🏆 Community Feed</h2>
      <p className="text-slate-400 mb-8">Scrolle durch die besten Kreationen der Community und forke sie in dein Studio.</p>

      <div className="flex flex-col gap-10 items-center">
        {feed.map((post) => (
          <div key={post.id} className="w-full max-w-xl glass-card rounded-3xl overflow-hidden shadow-2xl transform transition duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.3)]">
            
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-700/50 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <span className="text-2xl bg-slate-800 p-2 rounded-full">{post.avatar}</span>
                <div>
                  <h4 className="font-bold text-slate-200">{post.user}</h4>
                  <p className="text-xs text-slate-500">{post.timeAgo}</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-white transition-colors">
                ⋮
              </button>
            </div>

            {/* Fake Image Placeholder - we use the title to generate a gradient */}
            <div className="h-64 w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-b border-slate-700/50 relative group">
              <span className="text-4xl opacity-50 absolute">🖼️</span>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                 <button onClick={() => forkPrompt(post)} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transform transition-transform hover:scale-105">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                   Prompt Forken
                 </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
              <p className="text-sm font-mono text-amber-400/80 mb-4 bg-amber-500/10 p-3 rounded-xl line-clamp-2">{post.prompt}</p>
              
              <div className="flex items-center gap-6 mt-4">
                <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors font-bold text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  {post.likes}
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors font-bold text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  {post.views}
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}