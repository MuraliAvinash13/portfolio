import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Calendar, Briefcase, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ExperienceTimeline({ activeStationIdx, setActiveStationIdx }) {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Edunet Foundation",
      duration: "Sept 2025 - Nov 2025",
      type: "Internship",
      details: [
        "Collaborated on designing RESTful APIs and microservice endpoints.",
        "Created modern UI dashboard panels with React.js and Tailwind CSS.",
        "Participated in Agile sprint planning, code refactorings, and Git workflow integrations."
      ],
      coordinate: "SECTOR_DELTA_01"
    },
    {
      title: "Java Full Stack Trainee",
      company: "QSpiders Training Institute",
      duration: "Feb 2025 - Aug 2025",
      type: "Training",
      details: [
        "Intensive curriculum in Advanced Java core structures and JPA integrations.",
        "Engineered RESTful web services with Spring Boot and database mappings using Hibernate.",
        "Studied SQL database optimizations, trigger structures, and normalization patterns in MySQL."
      ],
      coordinate: "SECTOR_OMEGA_02"
    }
  ];

  const activeExp = experiences[activeStationIdx];

  return (
    <div className="absolute inset-x-6 top-20 bottom-6 z-30 font-mono select-none flex flex-col md:flex-row gap-6 pointer-events-none">
      
      {/* 1. Interactive Space Station Nodes Grid */}
      <div className="hud-card corner-border border-cyan-500/20 p-5 rounded-none w-full md:w-96 flex flex-col pointer-events-auto bg-slate-950/80">
        <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3 mb-4 text-cyan-400">
          <Briefcase className="animate-pulse" size={16} />
          <span className="text-[12px] font-hud font-bold tracking-widest text-glow-blue uppercase">SPACE STATIONS PATHWAY</span>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-12 relative px-4">
          
          {/* Vertical Glowing Route Conduit */}
          <div className="absolute top-0 bottom-0 left-[23px] w-0.5 bg-gradient-to-b from-cyan-500 via-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(0,240,255,0.4)]"></div>

          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveStationIdx(idx)}
              className="flex items-center gap-6 cursor-pointer relative group"
            >
              {/* Station Node Indicator */}
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center relative transition-all duration-300 z-10 ${
                  activeStationIdx === idx 
                    ? 'border-2 border-cyan-400 bg-cyan-950 shadow-[0_0_15px_rgba(0,240,255,0.8)]'
                    : 'border border-cyan-500/30 bg-black hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                }`}
              >
                <span className={`text-xs font-bold ${activeStationIdx === idx ? 'text-cyan-300 animate-pulse' : 'text-slate-500 group-hover:text-cyan-400'}`}>
                  S0{idx + 1}
                </span>
                
                {/* Ping pulse for current selection */}
                {activeStationIdx === idx && (
                  <div className="absolute inset-0 rounded-full border border-cyan-400/50 animate-ping"></div>
                )}
              </div>

              {/* Node Summary card */}
              <div className="flex-1">
                <div className={`text-[11px] font-bold ${activeStationIdx === idx ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-300'}`}>
                  {exp.company}
                </div>
                <div className="text-[9px] text-cyan-500/50 uppercase tracking-widest">
                  {exp.coordinate}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-[9px] text-cyan-500/40 border-t border-cyan-500/10 pt-2.5 text-center">
          CLICK ON STATION NODES TO ALIGN RADAR ORBITALS
        </div>
      </div>

      {/* 2. Detailed Selected Station Telemetries */}
      <div className="flex-1 flex pointer-events-auto">
        <AnimatePresence mode="wait">
          {activeExp && (
            <motion.div
              key={activeStationIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="hud-card-purple corner-border border-purple-500/30 p-6 rounded-none flex-1 flex flex-col bg-slate-950/80 shadow-[0_0_20px_rgba(189,0,255,0.1)]"
            >
              {/* Station Header */}
              <div className="flex justify-between items-start border-b border-purple-500/20 pb-4 mb-4">
                <div>
                  <span className="text-[9px] text-purple-400 font-bold border border-purple-500/30 px-2 py-0.5 bg-purple-950/10 uppercase tracking-widest">
                    STATION: {activeExp.coordinate}
                  </span>
                  <h2 className="text-xl font-hud font-black text-purple-300 tracking-wider mt-2.5">
                    {activeExp.title}
                  </h2>
                  <p className="text-xs text-purple-400/80 mt-1 font-bold">
                    {activeExp.company} — <span className="text-purple-400/60 font-semibold">{activeExp.type}</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 text-[10px] text-purple-400 bg-purple-950/20 px-2.5 py-1 border border-purple-500/20">
                  <Calendar size={12} />
                  <span>{activeExp.duration}</span>
                </div>
              </div>

              {/* Station core logs */}
              <div className="flex-1 space-y-4 text-xs text-purple-200/90 leading-relaxed max-w-2xl">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-400 tracking-widest uppercase">
                  <Award size={13} className="animate-pulse" /> STATION MISSION LOGS
                </div>
                <ul className="space-y-3">
                  {activeExp.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 items-start bg-purple-950/10 border border-purple-500/10 p-3 rounded-none">
                      <span className="text-purple-400 font-bold mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center text-[10px] text-purple-500/40 border-t border-purple-500/10 pt-4">
                <span>SYSTEM STATUS: ENCRYPTED // MISSION LOG COMPLETED</span>
                <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-400" /> SECURE_RECORD</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
