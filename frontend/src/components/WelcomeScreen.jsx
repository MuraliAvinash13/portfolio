import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu } from 'lucide-react';

export default function WelcomeScreen({ onEnter }) {
  const [loadingText, setLoadingText] = useState("INITIALIZING SCI-FI CMD CENTER...");
  const [progress, setProgress] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const textIntervals = [
      { text: "ESTABLISHING SECURE CONNECTION...", time: 600 },
      { text: "LOADING DEV UNIVERSE CANVAS...", time: 1400 },
      { text: "LOADING GALAXY RESOURCING SYSTEMS...", time: 2200 },
      { text: "AVA ASSISTANT CORE ONLINE...", time: 3000 },
      { text: "SYSTEM STATUS: SECURE & OPERATIONAL", time: 3800 }
    ];

    textIntervals.forEach((item) => {
      setTimeout(() => {
        setLoadingText(item.text);
      }, item.time);
    });

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setBootComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="absolute inset-0 bg-[#030014] z-[9999] flex flex-col items-center justify-center scanline select-none text-white p-4">
      {/* Aurora Ambient Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="hud-card corner-border max-w-xl w-full p-8 rounded-none border-cyan-500/20 text-center relative z-10 flex flex-col items-center">
        {/* Cyber hud symbols */}
        <div className="flex justify-between w-full mb-6 text-cyan-400 text-xs font-mono tracking-wider opacity-60">
          <span className="flex items-center gap-1"><Shield size={12} /> SECURE PROTOCOL // SSL</span>
          <span className="flex items-center gap-1"><Cpu size={12} /> SYSTEM INTEL CORE i7</span>
        </div>

        {/* Floating Developer Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-hud font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-glow-blue uppercase">
            MURALI AVINASH
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
            Developer Universe Command Center
          </p>
        </div>

        {/* Animated HUD Diagnostics Panel */}
        <div className="w-full bg-black/50 border border-cyan-500/10 p-4 rounded-none mb-8 text-left font-mono text-xs text-cyan-400/80 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span>SYSTEM STACK: Java Spring Boot | MERN | AI</span>
          </div>
          <div>CORE: AVA ENGINE v1.2.0 INTEGRATION</div>
          <div>STATUS: {loadingText}</div>
          
          {/* Progress bar */}
          <div className="w-full bg-cyan-950/40 h-2 border border-cyan-500/20 mt-4 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-100 shadow-[0_0_10px_#00f0ff]" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-cyan-500/60">
            <span>DIAGNOSTIC PROGRESS</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Enter Button */}
        <div className="h-16 flex items-center justify-center">
          {bootComplete ? (
            <button
              onClick={onEnter}
              className="relative group px-8 py-3 bg-cyan-950/20 border border-cyan-400 text-cyan-400 font-hud tracking-widest text-sm hover:bg-cyan-400 hover:text-black font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.8)] cursor-pointer overflow-hidden animate-pulse"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Terminal size={14} /> ENTER DEV UNIVERSE
              </span>
              <div className="absolute inset-0 bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 -z-0"></div>
            </button>
          ) : (
            <span className="font-mono text-xs text-cyan-500/50 animate-pulse tracking-wider">
              ESTABLISHING LINK... PLEASE STAND BY
            </span>
          )}
        </div>

        <div className="mt-6 text-[10px] font-mono text-cyan-500/30">
          DESIGNED BY ANTIGRAVITY AI // © 2026 MUKHE MURALI AVINASH
        </div>
      </div>
    </div>
  );
}
