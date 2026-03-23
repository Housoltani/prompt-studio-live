import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Aperture, Sun, Move, MonitorPlay, Sparkles, Copy, Check, Bot, Loader2 } from 'lucide-react';
import { executePromptViaAI } from '../services/aiService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../supabaseClient.js';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCredits } from '../context/CreditsContext.jsx';

export default function CinemaStudioPro() {
  const [subject, setSubject] = useState('');
  const [lens, setLens] = useState('50mm Prime');
  const [aperture, setAperture] = useState('f/2.8');
  const [lighting, setLighting] = useState('Volumetric Cinematic Lighting');
  const [filmStock, setFilmStock] = useState('ARRI Alexa 65');
  const [movement, setMovement] = useState('Slow Push In');
  
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { spendCredits } = useCredits();


  const executeWithAI = async () => {
    if (!generatedPrompt) return;
    if (!spendCredits(5, "KI Pre-Vis (Director)")) return;
    setIsExecuting(true);
    setAiResult('');
    try {
      // Ask the AI to act as a Director and visualize the prompt
      const aiPrompt = "You are a master cinematographer. Read this Midjourney prompt and vividly describe the final image as a Director's Pre-Visualization (Pre-Vis) in 2-3 sentences. Focus on lighting, mood, and composition.\n\nPrompt: " + generatedPrompt;
      const result = await executePromptViaAI(aiPrompt);
      setAiResult(result);
    } catch (error) {
      setAiResult('Error: ' + error.message);
    } finally {
      setIsExecuting(false);
    }
  };


  const saveToVault = async () => {
    if (!user) {
      toast.error('Zugriff verweigert. Bitte im Hauptquartier einloggen!', { icon: '🔒' });
      navigate('/auth');
      return;
    }
    if (!generatedPrompt) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase.from('prompts').insert([
        { 
          user_id: user.id, 
          title: 'Cinema Studio Prompt', 
          content: generatedPrompt, 
          description: subject || 'Unbenannt', 
          category: 'Midjourney', 
          is_public: false 
        }
      ]);
      if (error) throw error;
      toast.success('Prompt erfolgreich im Tresor gesichert!', { icon: '🗄️' });
    } catch (error) {
      toast.error('Fehler beim Speichern: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const generatePrompt = () => {
    setAiResult('');
    const prompt = `A cinematic video shot on ${filmStock}, using a ${lens} lens at ${aperture} aperture. 
The subject is: ${subject || 'A mysterious figure walking through a neon-lit cyberpunk street'}. 
Lighting setup: ${lighting}, creating dramatic depth and atmosphere. 
Camera movement: ${movement}, perfectly smooth and deterministic. 
Real optical physics, sharp focus on the subject, beautiful bokeh, 8k resolution, highly detailed.`;
    setGeneratedPrompt(prompt);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 pb-24 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-amber-500/20 to-orange-600/20 p-8 rounded-3xl border border-amber-500/30 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <h1 className="text-4xl font-black mb-4 flex items-center gap-3">
            <Film className="w-10 h-10 text-amber-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
              Cinema Studio Pro
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg">
            Deterministische Video-Generierung. Kontrolliere optische Physik, echte Kameralinsen und Hollywood-Beleuchtung für perfekte, vorhersehbare Ergebnisse.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Controls Console */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl space-y-6 shadow-2xl"
          >
            <h2 className="text-xl font-bold flex items-center gap-2 text-amber-500 mb-6 pb-4 border-b border-gray-800">
              <Camera className="w-5 h-5" /> Regie-Konsole
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Subject / Scene</label>
                <textarea 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Describe the action and subject in detail..."
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-amber-500/50 outline-none h-24 resize-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                    <Aperture className="w-4 h-4 text-amber-500" /> Lens / Brennweite
                  </label>
                  <select 
                    value={lens}
                    onChange={(e) => setLens(e.target.value)}
                    className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white outline-none"
                  >
                    <option>24mm Wide Angle (Establishing)</option>
                    <option>35mm Prime (Storytelling)</option>
                    <option>50mm Prime (Human Eye)</option>
                    <option>85mm Portrait Lens</option>
                    <option>135mm Telephoto (Compression)</option>
                    <option>Anamorphic Lens (Cinematic Flare)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                    <Aperture className="w-4 h-4 text-amber-500" /> Aperture (f-stop)
                  </label>
                  <select 
                    value={aperture}
                    onChange={(e) => setAperture(e.target.value)}
                    className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white outline-none"
                  >
                    <option>f/1.2 (Extreme Bokeh, Shallow DOF)</option>
                    <option>f/1.8 (Soft Background)</option>
                    <option>f/2.8 (Standard Cinematic Portrait)</option>
                    <option>f/5.6 (Sharp Subject & Context)</option>
                    <option>f/8.0 (Deep Focus, Landscapes)</option>
                    <option>f/16.0 (Macro / Sunstars)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" /> Lighting Physics
                  </label>
                  <select 
                    value={lighting}
                    onChange={(e) => setLighting(e.target.value)}
                    className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white outline-none"
                  >
                    <option>Volumetric Cinematic Lighting</option>
                    <option>High-Contrast Chiaroscuro (Film Noir)</option>
                    <option>Neon Cyberpunk (Practical LED tubes)</option>
                    <option>Golden Hour Backlight (Sunflare)</option>
                    <option>Soft Diffused Overcast (Even light)</option>
                    <option>Harsh Spotlight (Dramatic shadows)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                    <Move className="w-4 h-4 text-amber-500" /> Camera Movement
                  </label>
                  <select 
                    value={movement}
                    onChange={(e) => setMovement(e.target.value)}
                    className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white outline-none"
                  >
                    <option>Static Tripod / Locked off</option>
                    <option>Slow Push In (Dolly)</option>
                    <option>Slow Pull Out (Dolly)</option>
                    <option>Cinematic Pan (Left to Right)</option>
                    <option>Steadicam Tracking (Following Subject)</option>
                    <option>Handheld (Dynamic / Documentary)</option>
                    <option>Drone Sweep (Aerial)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-500" /> Film Stock / Sensor
                </label>
                <select 
                  value={filmStock}
                  onChange={(e) => setFilmStock(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white outline-none"
                >
                  <option>ARRI Alexa 65 (Digital Cinema)</option>
                  <option>RED Monstro 8K VV (Ultra Sharp)</option>
                  <option>Kodak Vision3 500T (35mm Film Grain)</option>
                  <option>Fujifilm Eterna (Soft cinematic colors)</option>
                  <option>Vintage 16mm (Heavy grain, halation)</option>
                </select>
              </div>

            </div>

            <button 
              onClick={generatePrompt}
              className="w-full mt-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] shadow-lg shadow-amber-900/50"
            >
              <MonitorPlay className="w-5 h-5" />
              Director's Prompt Generieren
            </button>
          </motion.div>

          {/* Output Dashboard */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-amber-500">
                <Sparkles className="w-5 h-5" /> Master Prompt
              </h2>
              {generatedPrompt && (
                <button 
                  onClick={executeWithAI}
                  disabled={isExecuting}
                  className="flex items-center gap-2 text-xs bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 px-3 py-1.5 rounded-lg transition-colors border border-amber-500/30 disabled:opacity-50 font-sans"
                >
                  {isExecuting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                  {isExecuting ? 'Visualizing...' : 'KI Pre-Vis (5 ⚡)'}
                </button>
              )}
            </div>
            
            <div className="flex-1 bg-black/60 rounded-xl border border-gray-800 p-5 font-mono text-sm text-amber-100 whitespace-pre-wrap flex flex-col">
              {generatedPrompt ? (
                <>
                  <div className="flex-1 text-gray-300 leading-relaxed">
                    {generatedPrompt}
                  </div>
                  <div className="mt-4 flex flex-col gap-3 w-full">
                  <div className="flex gap-2">
                    <button 
                      onClick={saveToVault}
                      disabled={isSaving}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 hover:bg-gray-800 text-amber-400 rounded-lg transition-colors border border-amber-500/30 font-bold"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>}
                      In Tresor speichern
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700 font-bold"
                    >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy to Generator'}
                    </button>
                  </div>
                  
                  {aiResult && (
                    <div className="mt-4 p-4 bg-gray-900 border border-amber-500/30 rounded-lg relative text-left">
                      <div className="text-xs font-bold text-amber-400 flex items-center gap-2 mb-2">
                        <Bot className="w-3 h-3" /> DIRECTOR'S PRE-VIS
                      </div>
                      <div className="text-gray-300 text-xs leading-relaxed font-sans">
                        {aiResult}
                      </div>
                    </div>
                  )}
                </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-600 gap-4 opacity-50">
                  <Camera className="w-12 h-12" />
                  <p className="text-center px-4">Calibrate settings and generate the master prompt for Sora / Runway.</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500 flex items-center justify-between">
              <span>Optics: <span className="text-amber-500">{lens.split(' ')[0]}</span></span>
              <span>Aperture: <span className="text-amber-500">{aperture.split(' ')[0]}</span></span>
              <span>Sensor: <span className="text-amber-500">{filmStock.split(' ')[0]}</span></span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
