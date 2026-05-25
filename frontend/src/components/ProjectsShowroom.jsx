import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, ExternalLink, GitBranch, Layout, Server, AlertCircle } from 'lucide-react';
import { portfolioApi } from '../utils/api';

export default function ProjectsShowroom({ selectedProjectTitle, setSelectedProjectTitle }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioApi.getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const selectedProj = projects.find(p => p.title === selectedProjectTitle);

  return (
    <div className="absolute inset-x-6 top-20 bottom-6 z-30 font-mono select-none flex flex-col md:flex-row gap-6 pointer-events-none">
      
      {/* 1. Projects Sidebar Menu */}
      <div className="hud-card corner-border border-cyan-500/20 p-5 rounded-none w-full md:w-96 flex flex-col pointer-events-auto bg-slate-950/80">
        <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3 mb-4 text-cyan-400">
          <Layout size={16} />
          <span className="text-[12px] font-hud font-bold tracking-widest text-glow-blue uppercase">CRYSTAL SHOWROOM DATABASE</span>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center text-xs text-cyan-500/40">
            CONNECTING DATABASE CORE...
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
            {projects.map((proj) => (
              <div 
                key={proj.id}
                onClick={() => setSelectedProjectTitle(proj.title)}
                className={`p-3 border transition-all duration-300 cursor-pointer ${
                  selectedProjectTitle === proj.title
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                    : 'border-cyan-500/10 hover:border-cyan-500/30 bg-black/30'
                }`}
              >
                <div className={`text-[12px] font-bold ${selectedProjectTitle === proj.title ? 'text-cyan-300' : 'text-slate-400'}`}>
                  {proj.title}
                </div>
                <div className="text-[9px] text-cyan-500/50 mt-1 uppercase tracking-wider">
                  STACK: {proj.techStack.split(',').slice(0, 3).join(', ')}...
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 text-[9px] text-cyan-500/40 border-t border-cyan-500/10 pt-2.5 text-center">
          SELECT FLOATING 3D CRYSTAL OR SIDEBAR ITEM TO DECIPHER
        </div>
      </div>

      {/* 2. Detailed Selected Project Holo Panel */}
      <div className="flex-1 flex pointer-events-auto">
        <AnimatePresence mode="wait">
          {selectedProj ? (
            <motion.div
              key={selectedProj.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="hud-card-purple corner-border border-purple-500/30 p-6 rounded-none flex-1 flex flex-col bg-slate-950/80 overflow-y-auto shadow-[0_0_20px_rgba(189,0,255,0.1)]"
            >
              {/* Project Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-purple-500/20 pb-4 mb-4 gap-3">
                <div>
                  <span className="text-[9px] text-purple-400 font-bold border border-purple-500/30 px-2 py-0.5 bg-purple-950/15 uppercase tracking-widest">
                    TELEMETRY CODE: PRJ_0{selectedProj.id}
                  </span>
                  <h2 className="text-xl font-hud font-black text-purple-300 tracking-wider mt-2.5">
                    {selectedProj.title}
                  </h2>
                </div>

                {/* External repository links */}
                <div className="flex items-center gap-2">
                  {selectedProj.githubLink && (
                    <a
                      href={selectedProj.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 border border-purple-500/30 hover:border-purple-400 bg-purple-950/20 text-purple-300 hover:text-purple-200 px-3 py-1.5 transition-all text-[11px] cursor-pointer"
                    >
                      <GitBranch size={12} />
                      <span>GITHUB</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                  {selectedProj.liveDemo && (
                    <a
                      href={selectedProj.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 border border-pink-500/30 hover:border-pink-400 bg-pink-950/20 text-pink-300 hover:text-pink-200 px-3 py-1.5 transition-all text-[11px] cursor-pointer"
                    >
                      <ExternalLink size={12} />
                      <span>LIVE DEMO</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Description & Specs */}
              <div className="space-y-5 text-xs text-purple-200/90 leading-relaxed max-w-3xl">
                <div>
                  <h3 className="text-purple-400 font-bold tracking-widest text-[11px] uppercase mb-1.5">
                    PROJECT SYNOPSIS
                  </h3>
                  <p className="bg-purple-950/10 border border-purple-500/10 p-3 rounded-none">
                    {selectedProj.description}
                  </p>
                </div>

                {/* Tech Badge grid */}
                <div>
                  <h3 className="text-purple-400 font-bold tracking-widest text-[11px] uppercase mb-2">
                    TECHNOLOGY COMPLEMENTS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProj.techStack.split(',').map((tech) => (
                      <span 
                        key={tech}
                        className="border border-purple-500/20 px-2.5 py-1 text-[10px] text-purple-300 bg-purple-950/15"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture details */}
                {selectedProj.architectureDiagram && (
                  <div>
                    <h3 className="text-purple-400 font-bold tracking-widest text-[11px] uppercase flex items-center gap-1.5 mb-2">
                      <Server size={12} /> SYSTEM ARCHITECTURE ROUTE
                    </h3>
                    <div className="bg-black/60 border border-purple-500/25 p-3 font-mono text-[10.5px] text-purple-400/90 leading-relaxed whitespace-pre-line rounded-none">
                      {selectedProj.architectureDiagram}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between items-center text-[10px] text-purple-500/40 border-t border-purple-500/10 pt-4">
                <span>SYSTEM DIAGNOSTIC: CRYSTAL LOG SECURED</span>
                <span>STATUS: STABLE</span>
              </div>
            </motion.div>
          ) : (
            /* Standby panel if no project is active */
            <div className="hud-card corner-border border-cyan-500/20 p-8 rounded-none flex-1 flex flex-col items-center justify-center bg-slate-950/40">
              <AlertCircle className="text-cyan-400/30 animate-pulse mb-4" size={48} />
              <h2 className="text-sm font-hud font-bold text-cyan-400/60 uppercase tracking-widest text-center">
                RADAR STANDBY: DECODE SYSTEM ACTIVE
              </h2>
              <p className="text-[10px] text-cyan-500/40 font-mono mt-1 text-center max-w-sm">
                Select a floating 3D Crystal object in the Universe view, or click on a sidebar repository item to decode its full telemetry parameters.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
