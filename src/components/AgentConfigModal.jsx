import React, { useState, useEffect } from 'react';
import { X, Target, Mic, Briefcase, Save, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';

export default function AgentConfigModal({ agent, user, onClose, onSaved }) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    niche: '',
    tone_of_voice: 'Professional',
    primary_goal: 'Engagement'
  });

  useEffect(() => {
    if (user && agent) {
      loadConfig();
    }
  }, [user, agent]);

  const loadConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('agent_configurations')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        setFormData({
          niche: data.brand_niche || '',
          tone_of_voice: data.brand_tone || 'Professional',
          primary_goal: data.brand_goal || 'Engagement'
        });
      }
    } catch (err) {
      console.error('Fehler beim Laden der Brand-Config:', err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const dbUpdates = {
        user_id: user.id,
        brand_niche: formData.niche,
        brand_tone: formData.tone_of_voice,
        brand_goal: formData.primary_goal,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('agent_configurations')
        .upsert(dbUpdates, { onConflict: 'user_id' });

      if (error) throw error;

      toast.success(`Einsatzparameter für ${agent.name} gespeichert.`, {
        icon: '✅',
        style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' }
      });
      if (onSaved) onSaved();
      onClose();
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      toast.error('Mission Briefing fehlgeschlagen.', {
        style: { background: '#7f1d1d', color: '#fff' }
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!agent) return null;

  const Icon = agent.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-6 border-b border-gray-800 flex items-start justify-between ${agent.bg.replace('/10', '/5')}`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${agent.bg} ${agent.color}`}>
              <Icon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Mission Briefing: {agent.name}</h2>
              <p className={`text-sm ${agent.color} font-medium`}>{agent.role}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Konfiguriere die globalen Markenparameter. Alle aktiven Agenten greifen auf diese Direktiven zu, um synchron und authentisch für deine Marke zu agieren.
          </p>

          <div className="space-y-4">
            {/* Nische */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Briefcase size={16} className="text-blue-400" />
                Deine Nische / Branche
              </label>
              <input 
                type="text" 
                required
                placeholder="z.B. Fitness-Coach für Mütter, Immobilienmakler..."
                value={formData.niche}
                onChange={(e) => setFormData({...formData, niche: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Tone of Voice */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Mic size={16} className="text-purple-400" />
                Markenstimme (Tone of Voice)
              </label>
              <select 
                value={formData.tone_of_voice}
                onChange={(e) => setFormData({...formData, tone_of_voice: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none"
              >
                <option value="Professional">Professionell & Vertrauenswürdig (Corporate)</option>
                <option value="Motivational">Aggressiv & Motivierend (Hustle/Fitness)</option>
                <option value="Humorous">Locker & Humorvoll (Gen Z/Meme)</option>
                <option value="Educational">Akademisch & Lehrend (Experte)</option>
                <option value="Empathetic">Empathisch & Warm (Coaching/Heilung)</option>
              </select>
            </div>

            {/* Primary Goal */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Target size={16} className="text-emerald-400" />
                Primäres Missionsziel
              </label>
              <select 
                value={formData.primary_goal}
                onChange={(e) => setFormData({...formData, primary_goal: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none"
              >
                <option value="Leads">Lead-Generierung (E-Mail-Liste / Kontakte)</option>
                <option value="Sales">Direktvertrieb (Produkte / Kurse verkaufen)</option>
                <option value="Engagement">Community Aufbau (Kommentare & Shares maximieren)</option>
                <option value="Authority">Autorität aufbauen (Expertenstatus untermauern)</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 mt-6 border-t border-gray-800 flex items-center justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              Abbrechen
            </button>
            <button 
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Parameter sichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
