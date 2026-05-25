import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Compass, Layers, CheckSquare } from 'lucide-react';
import { portfolioApi } from '../utils/api';

const SKILL_DESCRIPTIONS = {
  'Java': 'Robust, object-oriented language used for writing enterprise microservices, concurrency mapping, and high-performance server logic.',
  'Spring Boot': 'Enterprise MVC framework used for constructing decoupled REST gateways, Spring Security JWT modules, JPA persistence layers, and cloud endpoints.',
  'Node.js': 'Asynchronous, event-driven JavaScript engine used to script real-time order invoicing queues and fast data exchange layers.',
  'React.js': 'State-driven visual UI components library. Engineered with virtual DOM rendering, hooks, and rich 3D space canvasses.',
  'Vite': 'Next-generation hot-module reload bundler providing rapid development setups and super-optimized assets compression.',
  'Tailwind CSS': 'Utility-first presentation engine. Configured with a responsive dark-theme design system and custom HUD variables.',
  'Three.js': 'WebGL library for rendering GPU-accelerated interactive 3D particle starfields and revolving planet meshes in browser environments.',
  'MySQL': 'Relational SQL database engine. Deployed with complex indexing, normalization, and trigger constraints mapping.',
  'MongoDB': 'NoSQL document database. Managed for high-speed dynamic supply chain indexes and pharmacy order logging.',
  'AI & Deep Learning': 'Neural Network architectures (CNN, GANs) compiled for processing historical image colorizations.',
  'Machine Learning': 'Supervised and unsupervised regression algorithms configured for predictive database analytics.'
};

export default function SkillsGalaxy({ selectedSkillName, setSelectedSkillName }) {
  const [skills, setSkills] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioApi.getSkills().then((data) => {
      setSkills(data);
      setLoading(false);
    });
  }, []);

  const categories = ['ALL', 'Backend', 'Frontend', 'Database', 'AI'];

  const filteredSkills = filter === 'ALL' 
    ? skills 
    : skills.filter(s => s.category.toUpperCase() === filter.toUpperCase());

  const selectedSkill = skills.find(s => s.name === selectedSkillName);

  return (
    <div className="absolute top-20 right-6 bottom-6 left-6 md:left-auto md:w-96 z-30 font-mono select-none flex flex-col pointer-events-none">
      
      {/* 1. Main Skills Control Panel Card */}
      <div className="hud-card corner-border border-cyan-500/20 p-5 rounded-none flex-1 flex flex-col pointer-events-auto bg-slate-950/80">
        
        {/* Header HUD title */}
        <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3 mb-4 text-cyan-400">
          <Compass className="animate-spin text-cyan-400" size={16} style={{ animationDuration: '6s' }} />
          <span className="text-[12px] font-hud font-bold tracking-widest text-glow-blue uppercase">GALAXY TELEMETRY CONTROLLER</span>
        </div>

        {/* Filter Tabs HUD */}
        <div className="flex gap-1 mb-4 overflow-x-auto pb-2 border-b border-cyan-500/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-1 text-[10px] border transition-all cursor-pointer font-bold shrink-0 ${
                filter === cat
                  ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
                  : 'border-transparent text-slate-500 hover:text-cyan-300'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skill lists with animated dials */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-xs text-cyan-500/40">
            LOADING GALAXY COORDS...
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-1 space-y-4">
            {filteredSkills.map((skill) => (
              <div 
                key={skill.name}
                onClick={() => setSelectedSkillName(skill.name)}
                className={`p-2.5 border transition-all duration-300 cursor-pointer ${
                  selectedSkillName === skill.name
                    ? 'border-cyan-400 bg-cyan-950/20'
                    : 'border-cyan-500/10 hover:border-cyan-500/30 bg-black/30'
                }`}
              >
                <div className="flex justify-between items-center text-[11px] mb-2 font-bold">
                  <span className="text-cyan-300 flex items-center gap-1.5">
                    <Cpu size={12} className={selectedSkillName === skill.name ? "animate-pulse" : ""} />
                    {skill.name}
                  </span>
                  <span className="text-cyan-400">{skill.proficiencyPercentage}%</span>
                </div>
                
                {/* HUD dial loading bar */}
                <div className="w-full bg-cyan-950/40 h-1.5 border border-cyan-500/10 rounded-none overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiencyPercentage}%` }}
                    transition={{ duration: 0.8 }}
                    className="bg-cyan-400 h-full shadow-[0_0_8px_rgba(0,240,255,0.7)]"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 text-[9px] text-cyan-500/40 border-t border-cyan-500/10 pt-2.5 text-center">
          CLICK GALAXY PLANET OR RADAR DIAL TO DECRYPT DETAILS
        </div>
      </div>

      {/* 2. Interactive Planet Details Modal Floating Overlay */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="hud-card-purple corner-border border-purple-500/30 p-5 mt-4 rounded-none pointer-events-auto bg-slate-950/90 shadow-[0_0_20px_rgba(189,0,255,0.15)]"
          >
            <div className="flex justify-between items-center border-b border-purple-500/20 pb-2 mb-3.5">
              <div className="text-[12px] font-hud font-bold text-purple-400 flex items-center gap-2">
                <Layers size={13} className="animate-bounce" />
                <span>PLANET COORD: {selectedSkill.name.toUpperCase()}</span>
              </div>
              <button 
                onClick={() => setSelectedSkillName(null)}
                className="text-[9px] border border-purple-500/30 px-1.5 py-0.5 text-purple-400/70 hover:text-purple-300 hover:border-purple-400 cursor-pointer bg-purple-950/15"
              >
                DISMISS
              </button>
            </div>

            <div className="space-y-3 text-[11px] leading-relaxed">
              <div className="flex justify-between">
                <span className="text-purple-500/60">GALAXY SYSTEM:</span>
                <span className="text-purple-300 font-bold">{selectedSkill.category.toUpperCase()} ORBIT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-500/60">RADIAL LEVEL:</span>
                <span className="text-purple-300 font-bold">{selectedSkill.proficiencyPercentage}% POTENCY</span>
              </div>
              
              <div className="bg-purple-950/15 border border-purple-500/10 p-2.5 text-[10px] text-purple-300/80 font-mono">
                {SKILL_DESCRIPTIONS[selectedSkill.name] || 'Technical skill configured for full-stack space architecture deployment.'}
              </div>

              <div className="flex items-center gap-1.5 text-purple-400 font-bold mt-1 text-[10.5px]">
                <CheckSquare size={12} /> PROJECTS INTEGRATING PLANET
              </div>
              <div className="text-[9.5px] text-purple-300/60 list-disc pl-3">
                {selectedSkill.name === 'Java' || selectedSkill.name === 'Spring Boot' || selectedSkill.name === 'MySQL' ? (
                  <div>• Blood Bank Management System<br />• 3D Space command Portfolio</div>
                ) : selectedSkill.name === 'React.js' || selectedSkill.name === 'Vite' || selectedSkill.name === 'Tailwind CSS' ? (
                  <div>• Blood Bank Management System<br />• Pharmacy Ordering Management<br />• 3D Space command Portfolio</div>
                ) : selectedSkill.name === 'MongoDB' || selectedSkill.name === 'Node.js' ? (
                  <div>• Pharmacy Ordering Management System</div>
                ) : selectedSkill.name === 'AI & Deep Learning' || selectedSkill.name === 'Machine Learning' ? (
                  <div>• Grayscale Image Colorization AI</div>
                ) : (
                  <div>• 3D Space command Portfolio</div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
