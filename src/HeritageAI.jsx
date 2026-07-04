import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, MapPin, Compass, BookOpen, Sparkles, Calendar, Radio } from 'lucide-react';

const HeritageAI = () => {
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Khamma Ghani! Welcome to Indore's digital cultural corridor. Tap the microphone and ask me about hidden tales of Rajwada, the midnight culinary magic of Sarafa Bazar, or royal Holkar history. What shall we explore today?",
      timestamp: '12:00 PM'
    }
  ]);
  const [aiStatus, setAiStatus] = useState('Idle');
  const [audioVisualizerBars, setAudioVisualizerBars] = useState(Array(15).fill(4));
  const visualizerRef = useRef(null);

  // Simulate audio visualizer dancing when listening
  useEffect(() => {
    let interval;
    if (isListening) {
      setAiStatus('Listening to your voice...');
      interval = setInterval(() => {
        setAudioVisualizerBars(Array(15).fill(0).map(() => Math.floor(Math.random() * 32) + 4));
      }, 100);
    } else {
      setAudioVisualizerBars(Array(15).fill(4));
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setAiStatus('Processing your query with RAG Engine...');
      
      // Simulate backend response after a short delay
      setTimeout(() => {
        setChatHistory(prev => [
          ...prev,
          { id: Date.now(), sender: 'user', text: "Tell me a hidden story about Lal Bagh Palace.", timestamp: '12:04 PM' },
          { 
            id: Date.now() + 1, 
            sender: 'bot', 
            text: "Ah, the magnificent Lal Bagh Palace! Beyond its grand gates—which are exact replicas of those at Buckingham Palace—lies a lesser-known tale. It was among the first in India to feature a completely mechanized underground kitchen line connected via a miniature railway system directly to the banquet halls to ensure the Holkar rulers' food was served perfectly hot. Let me stream the full oral history narrative for you.",
            timestamp: '12:04 PM'
          }
        ]);
        setAiStatus('Speaking...');
      }, 1500);
    } else {
      setIsListening(true);
    }
  };

  const categories = [
    { id: 'all', label: 'All Experiences', icon: Compass },
    { id: 'heritage', label: 'Heritage & Gems', icon: BookOpen },
    { id: 'culinary', label: 'Culinary Traditions', icon: Sparkles },
    { id: 'events', label: 'Local Events', icon: Calendar }
  ];

  const localizedCards = [
    {
      title: "The Underground Kitchens of Lal Bagh",
      category: "heritage",
      description: "Discover how the Holkar state engineered sub-terrain miniature transit rails to deliver hot cuisine during royal galas.",
      tag: "Hidden Gem"
    },
    {
      title: "Sarafa Bazar Culinary Alchemy",
      category: "culinary",
      description: "Uncover the secret multi-generational spice blends behind the famous 'Garadu' and 'Jaleba' stalls active only past midnight.",
      tag: "Authentic Taste"
    },
    {
      title: "Malwa Kabir Yatra",
      category: "events",
      description: "A community-driven folk music festival celebrating local regional poetry, weaving deep into Malwa's rural landscape.",
      tag: "Upcoming Ritual"
    }
  ];

  const filteredCards = activeTab === 'all' ? localizedCards : localizedCards.filter(c => c.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Header element */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-amber-600 to-orange-500 rounded-xl shadow-lg shadow-orange-500/20">
            <Radio className="w-7 h-7 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-200 bg-clip-text text-transparent">
              HeritageAI
            </h1>
            <p className="text-xs text-slate-400 font-medium">GenAI-Powered Voice Guide • Indore Cultural Corridor</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-xs text-slate-300">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span>Indore, MP, India</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-1 animate-ping"></span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side - The Conversational Voice Interface */}
        <section className="lg:col-span-7 flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl justify-between min-h-[600px]">
          
          {/* Chat Logs Window */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {chatHistory.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-amber-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-slate-800/90 text-slate-200 rounded-tl-none border border-slate-700/50'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}
          </div>

          {/* Voice Activation Hub */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col items-center">
            
            {/* Live Audio Waves Simulation */}
            <div className="flex items-end justify-center gap-1 h-12 mb-4">
              {audioVisualizerBars.map((height, i) => (
                <div 
                  key={i} 
                  style={{ height: `${height}px` }}
                  className={`w-1 rounded-full transition-all duration-100 ${
                    isListening ? 'bg-gradient-to-t from-orange-500 to-amber-400' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <p className="text-xs font-mono text-amber-400/80 mb-6 bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/10">
              System Status: {aiStatus}
            </p>

            {/* Mic Primary Switch Trigger */}
            <button 
              onClick={toggleListening}
              className={`relative p-6 rounded-full transition-all duration-300 transform active:scale-95 shadow-xl group ${
                isListening 
                  ? 'bg-red-500 text-white shadow-red-500/20 ring-4 ring-red-500/20' 
                  : 'bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-orange-500/20 hover:brightness-110'
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              <span className="absolute -inset-1 rounded-full bg-inherit opacity-25 blur animate-ping group-hover:opacity-40 transition" />
            </button>
            <span className="text-xs text-slate-400 mt-3 font-medium">
              {isListening ? "Tap to interrupt or finish" : "Tap to speak with HeritageAI"}
            </span>
          </div>

        </section>

        {/* Right Side - Discovery Hub backed by Vector DB Concepts */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-slate-200">
              <Compass className="w-5 h-5 text-amber-400" />
              Dynamic Discovery Hub
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Filter context vectors sourced in real-time from our local heritage RAG indexes.
            </p>

            {/* Context Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      activeTab === tab.id 
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' 
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Generated RAG Insight Cards */}
            <div className="space-y-4">
              {filteredCards.map((card, index) => (
                <div 
                  key={index} 
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 p-4 rounded-xl transition-all duration-200 group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/5 border border-amber-500/20 px-2 py-0.5 rounded">
                      {card.tag}
                    </span>
                    <Volume2 className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default HeritageAI;