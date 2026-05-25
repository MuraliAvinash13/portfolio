import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Cpu, Bot, Minimize2, Maximize2, ShieldAlert } from 'lucide-react';
import { portfolioApi } from '../utils/api';

export default function ChatbotAVA() {
  const [messages, setMessages] = useState([
    { text: "Greetings, Commander! I am AVA, Avinash's holographic Virtual Assistant. Ask me anything about his technical stack, projects, internships, or academic milestones. Try typing 'Who is Murali?' or 'List projects'.", sender: 'AVA', time: new Date() }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue("");
    setMessages((prev) => [...prev, { text: userText, sender: 'USER', time: new Date() }]);
    setLoading(true);

    try {
      const response = await portfolioApi.askChatbot(userText);
      setMessages((prev) => [...prev, { text: response.response, sender: 'AVA', time: new Date() }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Connection error. Re-routing telemetries...", sender: 'AVA', time: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    setTimeout(() => {
      // Small timeout to allow input to update before submit
      setInputValue("");
      setMessages((prev) => [...prev, { text: question, sender: 'USER', time: new Date() }]);
      setLoading(true);
      portfolioApi.askChatbot(question).then((res) => {
        setMessages((prev) => [...prev, { text: res.response, sender: 'AVA', time: new Date() }]);
        setLoading(false);
      });
    }, 100);
  };

  const quickPrompts = [
    "Who is Murali?",
    "Show projects",
    "List skills",
    "Contact info"
  ];

  return (
    <div 
      className={`fixed bottom-6 left-6 z-40 w-80 md:w-96 transition-all duration-300 font-mono ${
        minimized ? 'h-12' : 'h-[420px]'
      }`}
    >
      <div className="hud-card corner-border border-purple-500/30 flex flex-col h-full overflow-hidden shadow-[0_0_15px_rgba(189,0,255,0.15)] bg-slate-950/85">
        
        {/* Header HUD panel */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-purple-500/20 bg-purple-950/20">
          <div className="flex items-center gap-2 text-purple-400">
            <Bot size={16} className="animate-pulse" />
            <span className="text-[11px] font-hud tracking-widest font-bold text-glow-purple">AVA.SYS: INTERACTIVE VIRTUAL ASST</span>
          </div>
          <button 
            onClick={() => setMinimized(!minimized)} 
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            {minimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
          </button>
        </div>

        {!minimized && (
          <>
            {/* Message History logs */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-[11px]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] px-3 py-2 border ${
                      msg.sender === 'USER' 
                        ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-200' 
                        : 'bg-purple-950/30 border-purple-500/30 text-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[8px] opacity-40 mb-1 font-bold">
                      <span>{msg.sender === 'USER' ? 'COMMAND_USER' : 'AVA_HOLO'}</span>
                      <span>{msg.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
                    </div>
                    <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-purple-950/30 border border-purple-500/30 text-purple-400/70 max-w-[80%] px-3 py-2 flex items-center gap-2">
                    <Terminal size={11} className="animate-spin" />
                    <span>DECRYPTING TELEMETRIES...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Helper Prompts */}
            <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-purple-500/10">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleQuickQuestion(prompt)}
                  className="text-[9px] border border-purple-500/25 px-2 py-0.5 rounded-none text-purple-400/70 hover:text-purple-300 hover:border-purple-400 transition-all cursor-pointer bg-purple-950/10"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSend} className="p-3 border-t border-purple-500/20 bg-slate-900/40 flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask AVA about Avinash..."
                className="flex-1 bg-black/60 border border-purple-500/20 text-purple-300 placeholder-purple-400/30 text-[11px] px-3 py-2 rounded-none outline-none focus:border-purple-400 focus:shadow-[0_0_10px_rgba(189,0,255,0.15)] font-mono"
              />
              <button 
                type="submit" 
                className="bg-purple-950/30 border border-purple-500/40 hover:border-purple-400 text-purple-400 px-3 py-2 rounded-none transition-all duration-300 hover:bg-purple-500 hover:text-black cursor-pointer shadow-md"
              >
                <Send size={12} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
