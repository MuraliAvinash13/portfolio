import React, { useState } from 'react';
import { Send, Phone, Mail, Linkedin, Github, ShieldAlert, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioApi } from '../utils/api';

export default function ContactCenter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerConfetti = () => {
    // Custom cyberpunk confetti colors: cyan, purple, pink
    const colors = ['#00f0ff', '#bd00ff', '#ff007f'];
    
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: colors
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
    }, 150);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg("All telemetry nodes must be filled.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      await portfolioApi.submitContact(formData);
      setSuccess(true);
      triggerConfetti();
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      setErrorMsg("Signal transmission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactLinks = [
    { icon: <Mail size={16} />, label: "EMAIL", value: "muraliavinash2005@gmail.com", url: "mailto:muraliavinash2005@gmail.com", color: "text-cyan-400" },
    { icon: <Github size={16} />, label: "GITHUB", value: "MuraliAvinash13", url: "https://github.com/MuraliAvinash13", color: "text-purple-400" },
    { icon: <Linkedin size={16} />, label: "LINKEDIN", value: "murali-avinash", url: "https://www.linkedin.com/in/murali-avinash-8b9ba4301", color: "text-pink-400" }
  ];

  return (
    <div className="absolute inset-x-6 top-20 bottom-6 z-30 font-mono select-none flex flex-col md:flex-row gap-6 pointer-events-none">
      
      {/* 1. Contact Info HUD panel */}
      <div className="hud-card corner-border border-cyan-500/20 p-5 rounded-none w-full md:w-80 flex flex-col pointer-events-auto bg-slate-950/80">
        <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3 mb-4 text-cyan-400">
          <Cpu className="animate-pulse" size={16} />
          <span className="text-[12px] font-hud font-bold tracking-widest text-glow-blue uppercase">CONTACT TERMINAL</span>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-6">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-cyan-500/10 hover:border-cyan-400/40 bg-black/40 hover:bg-cyan-950/15 transition-all duration-300 flex items-center gap-4 cursor-pointer"
            >
              <div className={`${link.color} animate-pulse`}>
                {link.icon}
              </div>
              <div>
                <div className="text-[9px] text-cyan-500/40 font-bold uppercase tracking-wider">{link.label}</div>
                <div className="text-[11px] text-cyan-200 mt-0.5 truncate max-w-[180px] font-semibold">{link.value}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-4 text-[9px] text-cyan-500/40 border-t border-cyan-500/10 pt-2.5 text-center">
          SYSTEM SECURED // SIGNAL CONDUIT ACTIVE
        </div>
      </div>

      {/* 2. Contact Message Form */}
      <div className="flex-1 flex pointer-events-auto">
        <div className="hud-card-purple corner-border border-purple-500/30 p-6 rounded-none flex-1 flex flex-col bg-slate-950/80 shadow-[0_0_20px_rgba(189,0,255,0.1)]">
          <div className="border-b border-purple-500/20 pb-3 mb-4 text-purple-400">
            <span className="text-[12px] font-hud font-bold tracking-widest text-glow-purple uppercase">TRANSMIT COMMS ENVELOPE</span>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-4 max-w-2xl text-[11px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-purple-400/70 font-bold block mb-1">COMMANDER_NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name..."
                  className="w-full bg-black/60 border border-purple-500/20 text-purple-300 px-3 py-2 outline-none focus:border-purple-400 focus:shadow-[0_0_8px_rgba(189,0,255,0.15)] font-semibold"
                />
              </div>
              <div>
                <label className="text-purple-400/70 font-bold block mb-1">EMAIL_VECTOR</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email..."
                  className="w-full bg-black/60 border border-purple-500/20 text-purple-300 px-3 py-2 outline-none focus:border-purple-400 focus:shadow-[0_0_8px_rgba(189,0,255,0.15)] font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-purple-400/70 font-bold block mb-1">SUBJECT_ROUTING</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Enter subject..."
                className="w-full bg-black/60 border border-purple-500/20 text-purple-300 px-3 py-2 outline-none focus:border-purple-400 focus:shadow-[0_0_8px_rgba(189,0,255,0.15)] font-semibold"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="text-purple-400/70 font-bold block mb-1">MESSAGE_PAYLOAD</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type transmission..."
                className="w-full flex-1 bg-black/60 border border-purple-500/20 text-purple-300 px-3 py-2 outline-none focus:border-purple-400 focus:shadow-[0_0_8px_rgba(189,0,255,0.15)] resize-none font-semibold"
              ></textarea>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 text-rose-400 border border-rose-500/30 p-2.5 bg-rose-950/15 font-semibold">
                <ShieldAlert size={14} className="animate-pulse" />
                <span>ALERT: {errorMsg}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 text-emerald-400 border border-emerald-500/30 p-2.5 bg-emerald-950/15 font-semibold">
                <ShieldAlert size={14} className="text-emerald-400 animate-pulse" />
                <span>TRANSMISSION SECURED: MESSAGE ROUTED TO MYSQL & DEVELOPER NOTIFIED</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto self-end px-8 py-2.5 bg-purple-950/30 border border-purple-400 text-purple-400 hover:bg-purple-500 hover:text-black font-hud tracking-widest text-xs font-bold transition-all duration-300 hover:shadow-[0_0_15px_#bd00ff] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={12} />
              <span>{submitting ? 'TRANSMITTING...' : 'INITIATE TRANSMISSION'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
