import { useState } from 'react'
import './App.css'
import {
  tabs as dataTabs, // Original Tabs from data.js
  imagePeopleTemplates,
  imageCoupleTemplates,
  videoMiscTemplates,
  videoPeopleTemplates,
  videoCoupleTemplates,
  extendedMusicTemplates,
  repairTutorials,
  learningTutorials
} from './data.js'

// Import Translations
import { translations } from './i18n.js'

function App() {
  const [lang, setLang] = useState('de') // 'de', 'en', 'ar'
  const t = translations[lang]

  const [activeTab, setActiveTab] = useState('generator')
  
  // Search States
  const [musicSearch, setMusicSearch] = useState('')
  const [repairSearch, setRepairSearch] = useState('')
  const [learningSearch, setLearningSearch] = useState('')
  
  // Generator States
  const [genPrompt, setGenPrompt] = useState('')
  const [genType, setGenType] = useState('image')
  const [isGenerating, setIsGenerating] = useState(false)
  const [genResult, setGenResult] = useState(null)

  // Auth States
  const [isLoginMode, setIsLoginMode] = useState(true)

  // Feedback States
  const [feedbackSubject, setFeedbackSubject] = useState('Idee')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)
  const [feedbackSuccess, setFeedbackSuccess] = useState(false)

  // Global Likes & Copy State
  const [likedItems, setLikedItems] = useState({})
  const [copiedItems, setCopiedItems] = useState({})

  const copyToClipboard = (text, idStr) => {
    navigator.clipboard.writeText(text);
    setCopiedItems(prev => ({ ...prev, [idStr]: true }));
    setTimeout(() => {
      setCopiedItems(prev => ({ ...prev, [idStr]: false }));
    }, 2000);
  };

  const toggleLike = (type, id) => {
    const key = `${type}-${id}`;
    setLikedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    if (!genPrompt.trim()) return;
    setIsGenerating(true);
    setGenResult(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGenResult({
        type: genType,
        url: genType === 'image' 
          ? 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop' 
          : genType === 'video' ? 'video' : 'music'
      });
    }, 3000);
  };

  // Reusable Prompt Card
  const PromptCard = ({ item, type, hoverColorClass }) => {
    const isLiked = likedItems[`${type}-${item.id}`];
    const isCopied = copiedItems[`${type}-${item.id}`];
    return (
      <div className={`bg-slate-800 rounded-xl border border-slate-700 overflow-hidden group hover:border-${hoverColorClass}-500/50 transition-colors flex flex-col`}>
        <div className={`h-32 w-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
          <span className="text-white/80 font-bold text-lg drop-shadow-md text-center px-2">{item.title}</span>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="bg-slate-900 p-3 rounded text-xs font-mono text-slate-400 mb-4 flex-grow line-clamp-3 group-hover:line-clamp-none transition-all border border-slate-700" dir="ltr">
            {item.prompt} {/* Prompts stay LTR even in Arabic because they are code */}
          </div>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
            <div className="flex items-center gap-4 text-slate-400">
              <button onClick={() => toggleLike(type, item.id)} className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-400'}`}>
                <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                <span>{isLiked ? (item.likes + 1).toLocaleString() : item.likes.toLocaleString()}</span>
              </button>
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>{item.views}</span>
              </div>
            </div>
            <button onClick={() => copyToClipboard(item.prompt, `${type}-${item.id}`)} className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${isCopied ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-blue-600 text-slate-200'}`}>
              {isCopied ? t.copiedBtn : t.copyBtn}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    // APPLY RTL DIRECTION FOR ARABIC
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen bg-slate-900 text-slate-100 flex ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Sidebar Navigation */}
      <div className={`w-72 bg-slate-950 border-slate-800 p-6 flex flex-col fixed h-full overflow-y-auto z-10 ${lang === 'ar' ? 'border-l right-0' : 'border-r left-0'}`}>
        <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          {t.appTitle}
        </h1>
        <nav className="flex-1 space-y-2">
          {dataTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} p-3 rounded-lg transition-colors flex flex-col ${activeTab === tab.id ? 'bg-blue-600/20 border border-blue-500/50 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <span className="font-semibold text-sm">{t.tabs[tab.id] || tab.name}</span>
            </button>
          ))}
        </nav>
        
        {/* Language Switcher */}
        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex justify-between bg-slate-900 rounded-lg p-1 border border-slate-700">
            <button onClick={() => setLang('de')} className={`flex-1 py-1.5 text-xs font-bold rounded ${lang === 'de' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}>DE</button>
            <button onClick={() => setLang('en')} className={`flex-1 py-1.5 text-xs font-bold rounded ${lang === 'en' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}>EN</button>
            <button onClick={() => setLang('ar')} className={`flex-1 py-1.5 text-xs font-bold rounded ${lang === 'ar' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}>عربي</button>
          </div>
        </div>
      </div>

      <div className={`flex-1 p-8 ${lang === 'ar' ? 'mr-72' : 'ml-72'}`}>

        {/* --- TAB: LIVE GENERATOR --- */}
        {activeTab === 'generator' && (
          <div className="max-w-5xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">{t.generatorTitle}</h2>
            <p className="text-slate-400 mb-8">{t.generatorDesc}</p>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <label className="block text-sm font-bold text-slate-300 mb-3">{t.whatToCreate}</label>
                  <textarea value={genPrompt} onChange={(e) => setGenPrompt(e.target.value)} placeholder={t.promptPlaceholder} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-slate-200 h-40 focus:outline-none focus:border-blue-500 mb-4" dir="ltr" />
                  <div className="flex gap-2 mb-6">
                    <button onClick={() => setGenType('image')} className={`flex-1 py-2 rounded-lg text-sm font-medium border ${genType === 'image' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-600 text-slate-400'}`}>{t.btnImage}</button>
                    <button onClick={() => setGenType('video')} className={`flex-1 py-2 rounded-lg text-sm font-medium border ${genType === 'video' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-600 text-slate-400'}`}>{t.btnVideo}</button>
                    <button onClick={() => setGenType('music')} className={`flex-1 py-2 rounded-lg text-sm font-medium border ${genType === 'music' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-900 border-slate-600 text-slate-400'}`}>{t.btnMusic}</button>
                  </div>
                  <button onClick={handleGenerate} disabled={isGenerating || !genPrompt.trim()} className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 text-lg">
                    {isGenerating ? t.generatingBtn : t.generateBtn}
                  </button>
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden">
                  {!isGenerating && !genResult && <p className="text-slate-500">{t.resultPlaceholder}</p>}
                  {isGenerating && <p className="text-blue-400 animate-pulse">{t.generatingBtn}</p>}
                  {genResult && !isGenerating && (
                    <div className="w-full h-full animate-fade-in relative group flex items-center justify-center">
                      {genResult.type === 'image' && <img src={genResult.url} className="w-full h-full object-cover rounded-lg" />}
                      {genResult.type === 'video' && <div className="text-blue-400 font-bold text-lg">🎥 Placeholder</div>}
                      {genResult.type === 'music' && <div className="text-purple-400 font-bold text-lg">🎵 Placeholder</div>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: KI BILDER --- */}
        {activeTab === 'images' && (
          <div className="max-w-7xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">{t.tabs.images}</h2>
            <p className="text-slate-400 mb-12">{t.sections.images}</p>
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {imagePeopleTemplates.map(template => <PromptCard key={template.id} item={template} type="imgPeople" hoverColorClass="blue" />)}
              </div>
            </div>
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {imageCoupleTemplates.map(template => <PromptCard key={template.id} item={template} type="imgCouple" hoverColorClass="red" />)}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: KI VIDEOS --- */}
        {activeTab === 'videos' && (
          <div className="max-w-7xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">{t.tabs.videos}</h2>
            <p className="text-slate-400 mb-12">{t.sections.videos}</p>
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videoMiscTemplates.map(template => <PromptCard key={template.id} item={template} type="vidMisc" hoverColorClass="orange" />)}
              </div>
            </div>
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videoPeopleTemplates.map(template => <PromptCard key={template.id} item={template} type="vidPeople" hoverColorClass="blue" />)}
              </div>
            </div>
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videoCoupleTemplates.map(template => <PromptCard key={template.id} item={template} type="vidCouple" hoverColorClass="red" />)}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: KI MUSIK --- */}
        {activeTab === 'music' && (
          <div className="max-w-6xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">{t.tabs.music}</h2>
            <p className="text-slate-400 mb-8">{t.sections.music}</p>
            <div className="mb-10">
              <input type="text" value={musicSearch} onChange={(e) => setMusicSearch(e.target.value)} placeholder={t.searchPlaceholder} className="w-full bg-slate-800 border border-slate-600 text-slate-100 text-lg rounded-xl focus:ring-purple-500 block p-4 shadow-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {extendedMusicTemplates.filter(tr => tr.title.toLowerCase().includes(musicSearch.toLowerCase()) || tr.genre.toLowerCase().includes(musicSearch.toLowerCase())).map((track) => {
                const isLiked = likedItems[`music-${track.id}`];
                const isCopied = copiedItems[`music-${track.id}`];
                return (
                <div key={track.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden group hover:border-purple-500 transition-colors flex flex-col">
                  <div className={`h-36 w-full bg-gradient-to-br ${track.color} relative flex items-center justify-center`}>
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded font-mono">{track.time}</div>
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full">{track.platform}</div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-slate-100 mb-2">{track.title}</h3>
                    <div className="bg-slate-900 p-3 rounded text-xs font-mono text-purple-300 mb-4 flex-grow line-clamp-3" dir="ltr">{track.prompt}</div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50 text-slate-400">
                      <div className="flex items-center gap-4">
                        <button onClick={() => toggleLike('music', track.id)} className={`flex items-center gap-1.5 text-sm font-medium ${isLiked ? 'text-red-500' : 'hover:text-red-400'}`}>
                          <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                          <span>{isLiked ? (track.likes + 1).toLocaleString() : track.likes.toLocaleString()}</span>
                        </button>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          <span>{track.views}</span>
                        </div>
                      </div>
                      <button onClick={() => copyToClipboard(track.prompt, `music-${track.id}`)} className={`py-2 px-3 rounded-lg text-sm transition-colors ${isCopied ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-purple-600 text-slate-200'}`}>
                        {isCopied ? t.copiedBtn : t.copyBtn}
                      </button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        )}

        {/* --- TAB: KI FÜR ANFÄNGER --- */}
        {activeTab === 'learning' && (
          <div className="max-w-6xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">{t.tabs.learning}</h2>
            <p className="text-slate-400 mb-8">{t.sections.learning}</p>
            <div className="mb-10">
              <input type="text" value={learningSearch} onChange={(e) => setLearningSearch(e.target.value)} placeholder={t.searchPlaceholder} className="w-full bg-slate-800 border border-slate-600 text-slate-100 text-lg rounded-xl focus:ring-emerald-500 block p-4 shadow-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {learningTutorials.filter(tr => tr.title.toLowerCase().includes(learningSearch.toLowerCase()) || tr.category.toLowerCase().includes(learningSearch.toLowerCase())).map((tutorial) => {
                const isLiked = likedItems[`learning-${tutorial.id}`];
                return (
                <div key={tutorial.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden group hover:border-emerald-500 transition-colors flex flex-col cursor-pointer">
                  <div className={`h-48 w-full bg-gradient-to-br ${tutorial.color} relative flex items-center justify-center`}>
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">{tutorial.time}</div>
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full">{tutorial.category}</div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-slate-100 mb-2">{tutorial.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{tutorial.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50 text-slate-400">
                      <div className="flex items-center gap-5">
                        <button onClick={(e) => { e.stopPropagation(); toggleLike('learning', tutorial.id); }} className={`flex items-center gap-1.5 text-sm font-medium ${isLiked ? 'text-red-500' : 'hover:text-red-400'}`}>
                          <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                          <span>{isLiked ? (tutorial.likes + 1).toLocaleString() : tutorial.likes.toLocaleString()}</span>
                        </button>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          <span>{tutorial.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        )}

        {/* --- TAB: TECH REPAIR --- */}
        {activeTab === 'repair' && (
          <div className="max-w-6xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">{t.tabs.repair}</h2>
            <p className="text-slate-400 mb-8">{t.sections.repair}</p>
            <div className="mb-10">
              <input type="text" value={repairSearch} onChange={(e) => setRepairSearch(e.target.value)} placeholder={t.searchPlaceholder} className="w-full bg-slate-800 border border-slate-600 text-slate-100 text-lg rounded-xl focus:ring-blue-500 block p-4 shadow-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {repairTutorials.filter(tr => tr.title.toLowerCase().includes(repairSearch.toLowerCase()) || tr.device.toLowerCase().includes(repairSearch.toLowerCase())).map((tutorial) => {
                const isLiked = likedItems[`repair-${tutorial.id}`];
                return (
                <div key={tutorial.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden group hover:border-blue-500 transition-colors flex flex-col">
                  <div className={`h-48 w-full bg-gradient-to-br ${tutorial.color} relative flex items-center justify-center`}>
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">{tutorial.time}</div>
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full">{tutorial.category}</div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-slate-100 mb-2">{tutorial.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">Gerät: <span className="font-medium text-slate-300">{tutorial.device}</span></p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50 text-slate-400">
                      <div className="flex items-center gap-4">
                        <button onClick={() => toggleLike('repair', tutorial.id)} className={`flex items-center gap-1.5 text-sm font-medium ${isLiked ? 'text-red-500' : 'hover:text-red-400'}`}>
                          <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                          <span>{isLiked ? (tutorial.likes + 1).toLocaleString() : tutorial.likes.toLocaleString()}</span>
                        </button>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          <span>{tutorial.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        )}

        {/* --- PLACEHOLDER FOR AUTH & FEEDBACK --- */}
        {['auth', 'feedback'].includes(activeTab) && (
          <div className="max-w-4xl animate-fade-in flex flex-col items-center justify-center h-96 bg-slate-800 rounded-xl border border-slate-700 border-dashed">
            <h2 className="text-2xl font-bold mb-2 text-slate-300">{t.tabs[activeTab]}</h2>
            <p className="text-slate-500">Formular-Bereiche sind in dieser Ansicht minimiert.</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App