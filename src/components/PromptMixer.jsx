import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { toast } from 'react-hot-toast';
import { useCredits } from '../context/CreditsContext';

// Hilfskomponente für die sortierbaren Elemente (Tags im Builder)
function SortableItem({ id, title, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg cursor-grab active:cursor-grabbing text-sm font-bold shadow-lg"
    >
      <span className="cursor-move">⋮⋮</span>
      {title}
      <button 
        onPointerDown={(e) => {
          e.stopPropagation();
          onRemove(id);
        }}
        className="ml-1 opacity-0 group-hover:opacity-100 hover:text-red-300 transition-opacity"
      >
        ×
      </button>
    </div>
  );
}

const AVAILABLE_BLOCKS = [
  { id: 'b1', title: '8k Resolution', category: 'Quality' },
  { id: 'b2', title: 'Unreal Engine 5', category: 'Quality' },
  { id: 'b3', title: 'Cinematic Lighting', category: 'Lighting' },
  { id: 'b4', title: 'Neon Volumetric', category: 'Lighting' },
  { id: 'b5', title: 'Cyberpunk', category: 'Style' },
  { id: 'b6', title: 'Watercolor', category: 'Style' },
  { id: 'b7', title: '35mm Lens', category: 'Camera' },
  { id: 'b8', title: 'Drone View', category: 'Camera' },
];

export default function PromptMixer() {
  const [basePrompt, setBasePrompt] = useState('/imagine prompt: A futuristic city');
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { spendCredits } = useCredits();


  const handleOptimize = async () => {
    if (!basePrompt || basePrompt.trim() === '') {
      toast.error('Bitte gib zuerst einen Basis-Prompt ein!');
      return;
    }
    
    if (!spendCredits(2, 'KI Magic Optimize')) {
      return;
    }
    
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      toast.error('API Key fehlt! Bitte in der .env Datei als VITE_OPENROUTER_API_KEY eintragen.');
      return;
    }

    setIsOptimizing(true);
    const toastId = toast.loading('KI optimiert deinen Prompt...');

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Prompt Studio Live'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3-8b-instruct:free',
          messages: [
            { 
              role: 'system', 
              content: 'Du bist ein professioneller Prompt-Engineer für Bildgeneratoren (Midjourney, DALL-E). Nimm den kurzen Input des Users und verwandle ihn in einen extrem detaillierten, hochwertigen englischen Prompt. Nutze Keywords für Lighting, Camera, Style und Mood. Antworte NUR mit dem finalen Prompt, ohne Erklärungen.' 
            },
            { role: 'user', content: basePrompt }
          ],
          temperature: 0.7
        })
      });

      const data = await response.json();
      
      if (response.ok && data.choices && data.choices.length > 0) {
        setBasePrompt(data.choices[0].message.content.trim());
        toast.success('Prompt erfolgreich hochgerüstet!', { id: toastId });
      } else {
        const errMsg = data.error?.message || 'Unbekannter API Fehler';
        console.error('OpenRouter Error:', data);
        toast.error('API Fehler: ' + errMsg, { id: toastId });
      }
    } catch (error) {
      toast.error('Verbindungsfehler zur KI-API.', { id: toastId });
    } finally {
      setIsOptimizing(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSelectedBlocks((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addBlock = (block) => {
    if (!selectedBlocks.find(b => b.id === block.id)) {
      setSelectedBlocks([...selectedBlocks, block]);
    } else {
      toast.error('Block ist bereits im Prompt!');
    }
  };

  const removeBlock = (id) => {
    setSelectedBlocks(selectedBlocks.filter(b => b.id !== id));
  };

  const finalPrompt = `${basePrompt}${selectedBlocks.length > 0 ? ', ' + selectedBlocks.map(b => b.title).join(', ') : ''}`;

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4">
      <h2 className="text-3xl font-bold mb-2">🎛️ Prompt Mixer</h2>
      <p className="text-slate-400 mb-8">Klicke auf Blöcke, um sie hinzuzufügen. Ziehe sie per Drag & Drop in die gewünschte Reihenfolge.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LInke Spalte: Verfügbare Blöcke */}
        <div className="lg:col-span-1 bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Bausteine</h3>
          <div className="space-y-6">
            {['Style', 'Lighting', 'Camera', 'Quality'].map(category => (
              <div key={category}>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_BLOCKS.filter(b => b.category === category).map(block => (
                    <button
                      key={block.id}
                      onClick={() => addBlock(block)}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-3 py-1.5 rounded border border-slate-600 transition-colors"
                    >
                      + {block.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rechte Spalte: Der Builder */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Basis-Prompt</h3>
            <div className="relative">
              <textarea 
                value={basePrompt}
                onChange={(e) => setBasePrompt(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 pr-32 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />
              <button 
                onClick={handleOptimize}
                disabled={isOptimizing}
                className="absolute right-2 bottom-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold px-3 py-2 rounded-md shadow-lg transition-all flex items-center gap-1 disabled:opacity-50"
              >
                {isOptimizing ? (
                  <><svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Magie wirkt...</>
                ) : (
                  <>✨ KI Magic</>
                )}
              </button>
            </div>

            <h3 className="text-sm font-bold text-slate-400 mt-6 mb-3 uppercase tracking-wider">Drag & Drop Modifikatoren</h3>
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-lg p-4 min-h-[80px] flex flex-wrap gap-2 items-start">
              {selectedBlocks.length === 0 && <span className="text-slate-500 text-sm italic mt-1">Keine Modifikatoren ausgewählt...</span>}
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={selectedBlocks.map(b => b.id)} strategy={horizontalListSortingStrategy}>
                  {selectedBlocks.map(block => (
                    <SortableItem key={block.id} id={block.id} title={block.title} onRemove={removeBlock} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl relative group">
            <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Dein finaler Prompt
            </h3>
            <textarea 
              readOnly 
              value={finalPrompt}
              className="w-full h-24 bg-transparent text-white font-mono text-sm leading-relaxed resize-none focus:outline-none"
            />
            <button 
              onClick={() => {
                navigator.clipboard.writeText(finalPrompt);
                toast.success('Mixer Prompt kopiert!', { iconTheme: { primary: '#3b82f6', secondary: '#fff' } });
              }}
              className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg"
            >
              Kopieren
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}