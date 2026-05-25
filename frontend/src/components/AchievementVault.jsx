import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, Lock, Unlock, Eye, Sparkles } from 'lucide-react';

export default function AchievementVault() {
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: "cert_jpmorgan",
      title: "Software Engineering Virtual Experience",
      issuer: "JPMorgan Chase & Co.",
      date: "August 2025",
      type: "Virtual Internship",
      verificationUrl: "https://forage.com/verify/jpmorgan",
      description: "Completed tasks in interface configuration, system architecture, data visualization tools, and software engineering protocols."
    },
    {
      id: "cert_deloitte",
      title: "Technology Consulting Virtual Experience",
      issuer: "Deloitte",
      date: "September 2025",
      type: "Virtual Experience",
      verificationUrl: "https://forage.com/verify/deloitte",
      description: "Completed consulting modules in systems optimization, client requirement specification analysis, and technology framework implementations."
    },
    {
      id: "cert_leadership",
      title: "Team Lead & Hackathon Coordinator",
      issuer: "College Tech Committee",
      date: "2025",
      type: "Leadership Achievement",
      verificationUrl: null,
      description: "Organized multi-collegiate hackathons, led frontend development groups, and managed software integration pipelines for the tech fest portal."
    }
  ];

  return (
    <div className="absolute inset-x-6 top-20 bottom-6 z-30 font-mono select-none flex flex-col items-center justify-center pointer-events-none">
      
      <AnimatePresence mode="wait">
        {!vaultUnlocked ? (
          /* Locked Vault Gateway */
          <motion.div
            key="locked"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="hud-card corner-border border-cyan-500/20 p-8 text-center max-w-sm w-full pointer-events-auto bg-slate-950/80 shadow-[0_0_20px_rgba(0,240,255,0.1)] flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full border border-cyan-400 bg-cyan-950/20 flex items-center justify-center relative mb-6">
              <Lock className="text-cyan-400 animate-pulse" size={24} />
            </div>
            
            <h2 className="text-sm font-hud font-bold text-cyan-400 uppercase tracking-widest text-glow-blue">
              ACHIEVEMENT SECURE VAULT
            </h2>
            <p className="text-[10px] text-cyan-500/40 mt-2 mb-6 text-center leading-relaxed">
              ACCESS CLASSIFIED ACHIEVEMENTS, DELOITTE & JPMORGAN VERIFIABLE CREDENTIALS, AND LEADERSHIP CERTIFICATES.
            </p>

            <button
              onClick={() => setVaultUnlocked(true)}
              className="px-6 py-2.5 border border-cyan-400 text-cyan-400 text-[11px] font-hud hover:bg-cyan-400 hover:text-black tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_#00f0ff] cursor-pointer font-bold"
            >
              INITIALIZE UNLOCK SEQUENCE
            </button>
          </motion.div>
        ) : (
          /* Unlocked Vault Grid */
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full flex flex-col pointer-events-auto"
          >
            {/* Header info */}
            <div className="flex justify-between items-center border-b border-purple-500/20 pb-3 mb-6 bg-purple-950/15 p-4 hud-card border-x-0 border-t-0">
              <div className="text-[12px] font-hud font-bold text-purple-400 flex items-center gap-2">
                <Unlock size={14} className="text-emerald-400 animate-bounce" />
                <span className="text-glow-purple">SYSTEM STATUS: VAULT DECRYPTED</span>
              </div>
              <button
                onClick={() => {
                  setVaultUnlocked(false);
                  setSelectedCert(null);
                }}
                className="text-[9px] border border-purple-500/30 hover:border-purple-400 px-2 py-0.5 text-purple-400 bg-purple-950/20 cursor-pointer"
              >
                LOCK VAULT
              </button>
            </div>

            {/* Main view container */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
              {/* Vault list (floating card items) */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto">
                {certificates.map((cert) => (
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className={`hud-card p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      selectedCert?.id === cert.id
                        ? 'border-purple-400 bg-purple-950/15'
                        : 'border-purple-500/10 hover:border-purple-500/30 bg-black/40'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center text-[8px] text-purple-400/50 font-bold uppercase mb-2">
                        <span>{cert.type}</span>
                        <span>{cert.date}</span>
                      </div>
                      <h3 className="text-[13px] font-hud font-bold text-purple-200 tracking-wide mb-1 leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-[10px] text-purple-400 font-semibold mb-3">
                        {cert.issuer}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] text-purple-400 hover:text-purple-300 font-bold">
                      <Eye size={12} />
                      <span>DECRYPT FILE</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Holographic detail view */}
              <AnimatePresence>
                {selectedCert && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    className="hud-card-purple corner-border border-purple-500/30 p-6 rounded-none w-full lg:w-96 flex flex-col bg-slate-950/90 shadow-[0_0_25px_rgba(189,0,255,0.15)]"
                  >
                    <div className="border-b border-purple-500/20 pb-3.5 mb-4">
                      <div className="text-[8px] text-purple-400/50 font-bold uppercase">CREDENTIAL SPECS</div>
                      <h2 className="text-base font-hud font-black text-purple-300 mt-1">
                        {selectedCert.title}
                      </h2>
                      <p className="text-[11px] text-purple-400 font-bold mt-0.5">
                        {selectedCert.issuer} — <span className="text-purple-400/60 font-semibold">{selectedCert.date}</span>
                      </p>
                    </div>

                    <div className="flex-1 space-y-4 text-[11px] leading-relaxed">
                      <div>
                        <h4 className="text-purple-400 font-bold tracking-widest text-[9px] uppercase mb-1.5 flex items-center gap-1">
                          <Sparkles size={10} /> DESCRIPTION
                        </h4>
                        <p className="bg-purple-950/10 border border-purple-500/10 p-3 text-purple-200/80">
                          {selectedCert.description}
                        </p>
                      </div>

                      <div className="flex justify-between border-b border-purple-500/10 pb-1.5">
                        <span className="text-purple-500/50">VERIFICATION:</span>
                        <span className="text-purple-300 font-bold uppercase">
                          {selectedCert.verificationUrl ? "ONLINE // ACTIVE" : "LOCAL VERIFIED"}
                        </span>
                      </div>
                    </div>

                    {selectedCert.verificationUrl && (
                      <a
                        href={selectedCert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-4 text-center border border-purple-400 hover:border-purple-300 text-purple-400 hover:text-purple-200 px-4 py-2 transition-all text-xs font-bold bg-purple-950/20 cursor-pointer"
                      >
                        LAUNCH VERIFICATION LINK
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
