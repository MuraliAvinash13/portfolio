import React, { useState } from 'react';
import SpaceCanvas from './components/SpaceCanvas';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import AboutMeHolo from './components/AboutMeHolo';
import SkillsGalaxy from './components/SkillsGalaxy';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectsShowroom from './components/ProjectsShowroom';
import AchievementVault from './components/AchievementVault';
import ContactCenter from './components/ContactCenter';
import ChatbotAVA from './components/ChatbotAVA';
import { Terminal, ShieldAlert, Cpu } from 'lucide-react';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentTab, setCurrentTab] = useState('universe'); // universe, skills, experience, projects, vault, contact
  
  // Selection states (synced from Canvas mouse triggers to Dashboard HUD panels)
  const [selectedSkillName, setSelectedSkillName] = useState(null);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(null);
  const [activeStationIdx, setActiveStationIdx] = useState(0);

  const handleEnterUniverse = () => {
    setShowWelcome(false);
  };

  // Callback when a planet is clicked in 3D Canvas
  const handleSelectPlanet = (name) => {
    setCurrentTab('skills');
    setSelectedSkillName(name);
  };

  // Callback when a project crystal is clicked in 3D Canvas
  const handleSelectCrystal = (title) => {
    setCurrentTab('projects');
    setSelectedProjectTitle(title);
  };

  // Callback when an experience node is clicked in 3D Canvas
  const handleSelectStation = (index) => {
    setCurrentTab('experience');
    setActiveStationIdx(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030014] select-none text-slate-100 font-mono scanline">
      
      {/* 1. Introductory Boot Sequence welcome page */}
      {showWelcome && (
        <WelcomeScreen onEnter={handleEnterUniverse} />
      )}

      {/* 2. Three.js GPU Particle Universe Canvas background */}
      <SpaceCanvas
        currentTab={currentTab}
        onSelectPlanet={handleSelectPlanet}
        onSelectCrystal={handleSelectCrystal}
        onSelectStation={handleSelectStation}
      />

      {/* 3. Global HUD Overlays & Panels */}
      {!showWelcome && (
        <>
          {/* Header Bar */}
          <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

          {/* Floating About Me Holographic bio helper */}
          <AboutMeHolo />

          {/* Render Active Dashboard Panel overlay */}
          <div className="absolute inset-0 pt-16 z-20 pointer-events-none">
            
            {/* Universe/Home HUD overlays */}
            {currentTab === 'universe' && (
              <div className="absolute top-20 right-6 w-80 md:w-96 hud-card p-5 corner-border border-cyan-500/20 text-[11px] pointer-events-auto bg-slate-950/80">
                <div className="flex items-center gap-1.5 border-b border-cyan-500/20 pb-2.5 mb-4 text-cyan-400 font-bold">
                  <Terminal size={14} className="animate-pulse" />
                  <span className="font-hud tracking-widest text-glow-blue">TELEMETRY DIAGNOSTICS</span>
                </div>
                <div className="space-y-3.5 leading-relaxed text-slate-300">
                  <p>
                    Greetings. Welcome to the workspace universe of software engineer <strong className="text-cyan-300">Mukhe Murali Avinash</strong>.
                  </p>
                  <p>
                    Drag the starfield mouse tracker to translate the 3D space viewport coordinates. Hover and select floating planets to load core skill proficiencies, or project crystals to open source configurations.
                  </p>
                  <div className="p-2.5 bg-cyan-950/20 border border-cyan-500/10 text-cyan-400 font-semibold">
                    [ORBITS ALIGNED: 7 PLANETS | 4 CRYSTALS]
                  </div>
                </div>
              </div>
            )}

            {/* Skills Galaxy Overlay Panels */}
            {currentTab === 'skills' && (
              <SkillsGalaxy
                selectedSkillName={selectedSkillName}
                setSelectedSkillName={setSelectedSkillName}
              />
            )}

            {/* Experience Space Stations Timeline */}
            {currentTab === 'experience' && (
              <ExperienceTimeline
                activeStationIdx={activeStationIdx}
                setActiveStationIdx={setActiveStationIdx}
              />
            )}

            {/* Projects Crystal Showroom */}
            {currentTab === 'projects' && (
              <ProjectsShowroom
                selectedProjectTitle={selectedProjectTitle}
                setSelectedProjectTitle={setSelectedProjectTitle}
              />
            )}

            {/* Secure Achievement Vault */}
            {currentTab === 'vault' && (
              <AchievementVault />
            )}

            {/* Contact Command Center form */}
            {currentTab === 'contact' && (
              <ContactCenter />
            )}

          </div>

          {/* Interactive Chatbot AVA virtual assistant widget */}
          <ChatbotAVA />
        </>
      )}

      {/* Cybernetic bottom corner stats */}
      {!showWelcome && (
        <div className="absolute bottom-4 left-6 hidden lg:flex items-center gap-4 text-[9px] text-cyan-500/40 z-30 font-bold">
          <span>LATENCY: 12MS</span>
          <span>FPS: 60/60</span>
          <span>GRID SECURE // SHIELD v1.2</span>
        </div>
      )}
    </div>
  );
}
