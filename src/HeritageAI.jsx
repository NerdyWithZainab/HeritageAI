import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, MapPin, Compass, BookOpen, Sparkles, Calendar, Radio, Send } from 'lucide-react';

const HeritageAI = () => {
  const [isListening, setIsListening] = useState(false);
  const [textQuery, setTextQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Khamma Ghani! Welcome to Indore's digital cultural corridor. Type your question below or tap the microphone to ask me about hidden tales of Rajwada, the midnight culinary magic of Sarafa Bazar, or royal Holkar history.",
      timestamp: '12:00 PM'
    }
  ]);
  const [aiStatus, setAiStatus] = useState('Idle');
  const [audioVisualizerBars, setAudioVisualizerBars] = useState(Array(15).fill(4));
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom of the chat logs
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Simulate audio visualizer dancing when voice is active
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

  // Simulated dynamic system response framework
  const simulateBackendResponse = (userPrompt) => {
    setAiStatus('Processing query with RAG Engine...');
    
    setTimeout(() => {
      let botText = "That sounds fascinating! My RAG repositories are pulling deep Malwa historical records to compile an immersive story regarding that specific local experience right now.";
      
      if (userPrompt.toLowerCase().includes('rajwada')) {
        botText = "Ah, Rajwada! Did you know its lower three floors are crafted purely out of stone, while the upper four floors are built entirely of teakwood? This layout was structurally chosen by Maratha architects to absorb seismic micro-shocks across the Kahn river basin.";
      } else if (userPrompt.toLowerCase().includes('sarafa') || userPrompt.toLowerCase().includes('food')) {
        botText = "The magic of Sarafa Bazar lies in its dual existence. By day, it's a quiet bullion trading hub. By 9 PM, it transforms completely into a street food legacy. Don't skip the double-fried Garadu topped with secret Jeeravan spice blends!";
      }

      setChatHistory(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: botText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setAiStatus('Speaking response...');
    }, 1200);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!textQuery.trim()) return;

    const currentTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = textQuery;

    setChatHistory(prev => [...prev, { id: Date.now(), sender: 'user', text: userMessage, timestamp: currentTimestamp }]);
    setTextQuery('');
    simulateBackendResponse(userMessage);
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setAiStatus('Processing spoken query...');
      
      // Simulating a parsed transcription
      setTimeout(() => {
        const spokenDummy = "Tell me something unique about Rajwada architecture.";
        setChatHistory(prev => [
          ...prev,
          { id: Date.now(), sender: 'user', text: spokenDummy, timestamp: 'Voice Entry' }
        ]);
        simulateBackendResponse(spokenDummy);
      }, 1000);
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
            <p className="text-xs text-slate-400 font-medium">GenAI-Powered Voice & Text Guide • Indore</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-xs text-slate-300">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span>Indore, MP, India</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-1 animate-ping"></span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side - The Conversational Hybrid Hub */}
        <section className="lg:col-span-7 flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl justify-between min-h-[620px]">
          
          {/* Chat Logs Window */}
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 overflow-x-hidden custom-scrollbar mb-4">
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
            <div ref={chatEndRef} />
          </div>

          {/* Prompting Interface & Action Panel */}
          <div className="pt-4 border-t border-slate-800/80 space-y-4">
            
            {/* Live Audio Waves Monitoring Row */}
            <div className="flex items-center justify-between px-2 bg-slate-950/40 py-2 rounded-xl border border-slate-900">
              <span className="text-[11px] font-mono text-amber-400/90 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                Status: {aiStatus}
              </span>
              <div className="flex items-end gap-0.5 h-6">
                {audioVisualizerBars.map((height, i) => (
                  <div 
                    key={i} 
                    style={{ height: `${height * 0.5}px` }} 
                    className={`w-0.5 rounded-full transition-all duration-100 ${
                      isListening ? 'bg-gradient-to-t from-orange-500 to-amber-400' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Hybrid Input Box (Text + Voice Button Side-by-Side) */}
            <form onSubmit={handleTextSubmit} className="flex items-center gap-3">
              <button 
                type="button"
                onClick={toggleListening}
                className={`p-3.5 rounded-xl transition-all duration-200 flex-shrink-0 relative group shadow-md ${
                  isListening 
                    ? 'bg-red-500 text-white ring-4 ring-red-500/10' 
                    : 'bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-750 hover:text-amber-300'
                }`}
                title={isListening ? "Stop recording" : "Ask via voice"}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                {isListening && (
                  <span className="absolute -inset-0.5 rounded-xl bg-red-500 opacity-20 blur animate-ping" />
                )}
              </button>

              <div className="relative flex-1">
                <input 
                  type="text"
                  value={textQuery}
                  onChange={(e) => setTextQuery(e.target.value)}
                  placeholder="Ask HeritageAI (e.g., 'Tell me about Sarafa Bazar architecture'...)"
                  disabled={isListening}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-500/50 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!textQuery.trim() || isListening}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-amber-400 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </section>

        {/* Right Side - Discovery Hub */}
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