import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Terminal, Activity, User } from 'lucide-react';

export default function AboutMeHolo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-20 left-6 z-30 font-mono">
      <AnimatePresence>
        {!isOpen ? (
          /* Floating Holographic Sphere / Trigger Button */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full border border-cyan-400 bg-cyan-950/20 flex items-center justify-center relative hover:shadow-[0_0_15px_#00f0ff] transition-shadow duration-300">
              <User className="text-cyan-400 group-hover:scale-110 transition-transform" size={20} />
              {/* Outer halo */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping" style={{ animationDuration: '3s' }}></div>
            </div>
            <div className="hidden md:block bg-black/40 border border-cyan-500/20 px-3 py-1 text-[10px] text-cyan-400 tracking-wider">
              COMMANDER_BIO.EXE <span className="text-cyan-300 animate-pulse font-bold ml-1">LAUNCH</span>
            </div>
          </motion.div>
        ) : (
          /* Holographic Details Panel */
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="hud-card corner-border border-cyan-500/30 max-w-sm w-80 p-5 rounded-none shadow-[0_0_20px_rgba(0,240,255,0.1)] relative"
          >
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5 mb-4">
              <div className="flex items-center gap-2 text-cyan-400">
                <Activity size={14} className="animate-pulse" />
                <span className="text-[11px] font-hud font-bold tracking-widest text-glow-blue">MURALI_AVINASH.HUD</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[10px] text-cyan-400/50 hover:text-cyan-400 hover:border-cyan-400 border border-cyan-500/25 px-1.5 py-0.5 cursor-pointer bg-cyan-950/20"
              >
                COLLAPSE
              </button>
            </div>

            {/* Profile grid specs */}
            <div className="space-y-3.5 text-[11px] leading-relaxed">
              <div className="flex justify-between border-b border-cyan-500/10 pb-1.5">
                <span className="text-cyan-500/50">DESIGNATION:</span>
                <span className="text-cyan-300 font-bold">FULL STACK DEVELOPER</span>
              </div>
              <div className="flex justify-between border-b border-cyan-500/10 pb-1.5">
                <span className="text-cyan-500/50">CGPA PARAMETER:</span>
                <span className="text-cyan-300 font-bold text-glow-blue">8.3 / 10.0</span>
              </div>
              <div className="flex justify-between border-b border-cyan-500/10 pb-1.5">
                <span className="text-cyan-500/50">DEVS_DEPLOYED:</span>
                <span className="text-cyan-300 font-bold">4+ PRODUCTION APPS</span>
              </div>
              <div className="flex justify-between border-b border-cyan-500/10 pb-1.5">
                <span className="text-cyan-500/50">FOCUS:</span>
                <span className="text-cyan-300 font-bold">SPRING BOOT / MERN / AI</span>
              </div>
            </div>

            <div className="mt-4 p-2.5 bg-cyan-950/20 border border-cyan-500/10 text-[10px] text-cyan-400/80 leading-relaxed font-mono">
              <div className="flex items-center gap-1.5 mb-1 text-cyan-400 font-bold text-[11px]">
                <Sparkles size={11} /> LEADERSHIP TELEMETRIES
              </div>
              Mentored sprint teams during internships, optimizing REST gateway routines and leading MERN app migrations.
            </div>

            <div className="absolute -bottom-2.5 right-4 bg-cyan-500 text-black text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider">
              BIO_SYSTEMS_ACTIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
