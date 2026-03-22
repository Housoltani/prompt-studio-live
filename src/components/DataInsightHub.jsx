import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, BarChart2, PieChart, TrendingUp, Database, Search, Zap } from 'lucide-react';

export default function DataInsightHub() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-24 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-8 rounded-3xl border border-emerald-500/30 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <h1 className="text-4xl font-black mb-4 flex items-center gap-3">
            <LineChart className="w-10 h-10 text-emerald-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Data Insight Hub
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg">
            Verwandle Rohdaten in strategische Erkenntnisse. Generiere Analyse-Prompts und visualisiere Business-Metriken mit KI-Präzision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Data Input Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" /> Dataset Upload (Mock)
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center text-gray-500 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-pointer">
                Drag & Drop CSV / JSON here
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" /> Ask Data Analyst AI
              </label>
              <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'What was the revenue growth last quarter?'"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none h-32 resize-none"
              />
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/25">
              <TrendingUp className="w-5 h-5" />
              Generate Insights
            </button>
          </motion.div>

          {/* Visualization Dashboard */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl flex flex-col items-center justify-center h-48">
                <BarChart2 className="w-16 h-16 text-emerald-500 mb-2 opacity-50" />
                <span className="text-gray-400 font-bold">Revenue Matrix</span>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl flex flex-col items-center justify-center h-48">
                <PieChart className="w-16 h-16 text-teal-500 mb-2 opacity-50" />
                <span className="text-gray-400 font-bold">User Demographics</span>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl">
              <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" /> AI Executive Summary
              </h3>
              <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700 text-gray-300 leading-relaxed">
                "Based on the projected metrics, automating your lead generation with multimodale agents could increase your profit margins by 34% in Q3. The primary bottleneck identified is manual content scheduling."
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
