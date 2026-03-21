import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const ProfitMatrix = () => {
  const [costs, setCosts] = useState({
    chatgpt: 20,
    midjourney: 30,
    claude: 20,
    other: 0,
    api: 10
  });
  const [hourlyRate, setHourlyRate] = useState(75);
  const [projectHours, setProjectHours] = useState(10);
  const [valueMultiplier, setValueMultiplier] = useState(3);

  const handleCostChange = (e) => {
    const { name, value } = e.target;
    setCosts(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const totalMonthlySubCosts = Object.values(costs).reduce((acc, val) => acc + val, 0);
  const timeCost = hourlyRate * projectHours;
  const breakEven = totalMonthlySubCosts + timeCost;
  
  // Value-based pricing calculation
  const suggestedPrice = timeCost * valueMultiplier;
  const netProfit = suggestedPrice - timeCost - totalMonthlySubCosts; // Assuming 1 project covers all monthly tools for simplicity, or we just subtract flat costs
  const margin = suggestedPrice > 0 ? ((netProfit / suggestedPrice) * 100).toFixed(1) : 0;

  return (
    <div className="animate-fade-in p-6 max-w-7xl mx-auto text-slate-200 min-h-screen">
      <Toaster position="bottom-right" />
      
      {/* Header */}
      <div className="mb-12 text-center relative mt-4">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 blur-3xl -z-10 rounded-full h-32 w-3/4 mx-auto top-10"></div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 drop-shadow-lg">
          Profit Margin Matrix
        </h1>
        <p className="text-lg text-emerald-200/70 max-w-2xl mx-auto font-light">
          Calculate your AI ROI. Determine your break-even point, value-based pricing, and true net profit margins for AI-accelerated workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-emerald-500/20"></div>
            
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <span className="text-emerald-400">⚡</span> Tool Costs (Monthly $)
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm text-slate-400 font-medium">ChatGPT Plus</label>
                <input type="number" name="chatgpt" value={costs.chatgpt} onChange={handleCostChange} className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-right text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-sm text-slate-400 font-medium">Midjourney</label>
                <input type="number" name="midjourney" value={costs.midjourney} onChange={handleCostChange} className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-right text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-sm text-slate-400 font-medium">Claude Pro</label>
                <input type="number" name="claude" value={costs.claude} onChange={handleCostChange} className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-right text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-sm text-slate-400 font-medium">API Usage (Est.)</label>
                <input type="number" name="api" value={costs.api} onChange={handleCostChange} className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-right text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-sm text-slate-400 font-medium">Other Tools</label>
                <input type="number" name="other" value={costs.other} onChange={handleCostChange} className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-right text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-between items-center">
              <span className="text-slate-300 font-bold">Total Monthly Tools:</span>
              <span className="text-xl text-emerald-400 font-mono">${totalMonthlySubCosts}</span>
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-teal-500/50 transition-all duration-500">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <span className="text-teal-400">⏱️</span> Labor & Value
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 font-medium mb-1">Your Hourly Rate ($)</label>
                <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 font-medium mb-1">Estimated Project Time (Hours)</label>
                <input type="number" value={projectHours} onChange={(e) => setProjectHours(parseFloat(e.target.value) || 0)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
                <p className="text-xs text-slate-500 mt-2">How long it takes *with* AI acceleration.</p>
              </div>
              <div>
                <label className="block text-sm text-slate-400 font-medium mb-1">Value-Based Multiplier (x)</label>
                <input type="range" min="1" max="10" step="0.5" value={valueMultiplier} onChange={(e) => setValueMultiplier(parseFloat(e.target.value))} className="w-full accent-teal-500" />
                <div className="text-right text-teal-400 font-mono text-sm mt-1">{valueMultiplier}x</div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
            {/* Glowing orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Break-Even Point</h3>
                <div className="text-4xl font-black text-white mb-2 tracking-tight">${breakEven.toLocaleString()}</div>
                <p className="text-xs text-slate-500 leading-relaxed">Minimum price to cover your hourly labor and monthly tool overhead.</p>
              </div>

              <div className="bg-emerald-900/20 rounded-xl p-6 border border-emerald-500/30">
                <h3 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Suggested Price
                </h3>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2 tracking-tight">
                  ${suggestedPrice.toLocaleString()}
                </div>
                <p className="text-xs text-emerald-200/50 leading-relaxed">Value-based price charging for the result, not just the hours.</p>
              </div>

            </div>

            <div className="mt-8 pt-8 border-t border-slate-700/50 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Net Profit</h3>
                  <div className="text-3xl font-bold text-white">${netProfit.toLocaleString()}</div>
                </div>
                
                <div className="text-right">
                  <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Profit Margin</h3>
                  <div className={`text-4xl font-black ${margin > 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {margin}%
                  </div>
                </div>
              </div>

              {/* Margin Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-3 mt-6 overflow-hidden">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(Math.max(margin, 0), 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-8 bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300 border border-slate-700/50 italic flex items-start gap-3 relative z-10">
              <span className="text-xl">💡</span>
              <p>AI drastically reduces your delivery time. By charging value-based pricing instead of hourly, you leverage AI to dramatically increase your effective hourly rate and profit margins.</p>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfitMatrix;
