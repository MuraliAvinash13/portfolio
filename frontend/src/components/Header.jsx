import React, { useState, useEffect } from 'react';
import { Terminal, Download, Globe, Radio } from 'lucide-react';
import { portfolioApi } from '../utils/api';

export default function Header({ currentTab, setCurrentTab }) {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString('en-US', { hour12: false }));
      setDateStr(d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'universe', label: 'UNIVERSE' },
    { id: 'skills', label: 'SKILLS GALAXY' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECT SHOWROOM' },
    { id: 'vault', label: 'ACHIEVEMENT VAULT' },
    { id: 'contact', label: 'CONTACT CMD' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 hud-card border-t-0 border-x-0 border-cyan-500/20 backdrop-blur-md px-6 flex items-center justify-between font-mono select-none">
      {/* HUD Logo Left */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <Globe className="text-cyan-400 animate-spin" size={20} style={{ animationDuration: '12s' }} />
          <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full"></div>
        </div>
        <div>
          <span className="text-cyan-400 font-hud font-bold tracking-widest text-sm text-glow-blue uppercase">
            AVINASH.HUD
          </span>
          <span className="hidden sm:inline-block ml-2 text-[9px] text-cyan-500/50 uppercase border border-cyan-500/30 px-1.5 py-0.5">
            GRID STATUS: OK
          </span>
        </div>
      </div>

      {/* Nav Items Center */}
      <nav className="hidden lg:flex items-center gap-1.5 xl:gap-4 text-xs font-semibold">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`px-3 py-1.5 relative border transition-all duration-300 cursor-pointer ${
              currentTab === item.id
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                : 'border-transparent text-slate-400 hover:text-cyan-300 hover:border-cyan-400/30'
            }`}
          >
            {item.label}
            {currentTab === item.id && (
              <span className="absolute top-0 left-0 w-1.5 h-1.5 bg-cyan-400 -mt-1 -ml-1 border border-cyan-400"></span>
            )}
          </button>
        ))}
      </nav>

      {/* Time & Resume Right */}
      <div className="flex items-center gap-6 text-xs text-right">
        {/* Connection Pulse */}
        <div className="hidden md:flex items-center gap-2 text-[10px] text-cyan-400/70 border border-cyan-500/20 px-2 py-1 bg-black/40">
          <Radio size={11} className="animate-pulse text-emerald-400" />
          <span>LINK: CONNECTED</span>
        </div>

        {/* Date Time HUD */}
        <div className="hidden sm:block">
          <div className="text-cyan-400 text-[11px] font-bold text-glow-blue tracking-wider">{timeStr}</div>
          <div className="text-cyan-500/60 text-[9px] uppercase tracking-wider">{dateStr}</div>
        </div>

        {/* Resume Download Action */}
        <a
          href="https://drive.google.com/file/d/1wHpqvtpzfpNEAf8u1uAtItNzfurKvvyd/view?usp=drivesdk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-pink-500/30 hover:border-pink-500 bg-pink-950/10 hover:bg-pink-500 hover:text-black text-pink-400 px-3 py-1.5 tracking-wider font-semibold transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,127,0.4)] text-[11px]"
        >
          <Download size={13} />
          <span>DOWNLOAD RESUME</span>
        </a>
      </div>
    </header>
  );
}
