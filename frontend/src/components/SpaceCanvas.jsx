import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Center } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// 1. Dynamic Stars/Particles
function StarField() {
  const pointsRef = useRef();
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);

  // Seed positions randomly
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
  }

  useFrame((state) => {
    // Subtle rotation based on time
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.015;
      pointsRef.current.rotation.x = time * 0.005;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} limit={particleCount}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// 2. Central Planet Core
function PlanetCore() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#030014"
        roughness={0.1}
        metalness={0.9}
        bumpScale={0.05}
      />
      {/* Outer wireframe glow */}
      <mesh>
        <sphereGeometry args={[1.53, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </mesh>
  );
}

// 3. Orbiting Skill Planet
function SkillPlanet({ index, name, color, radius, size, onSelect }) {
  const groupRef = useRef();
  const planetRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Orbital rotation speed varies by index
    const speed = 0.2 + (index * 0.05);
    const angle = time * speed + (index * (Math.PI / 4));
    
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angle) * radius;
      groupRef.current.position.z = Math.sin(angle) * radius;
      groupRef.current.position.y = Math.sin(time * 1.5 + index) * 0.15;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh 
        ref={planetRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(name);
        }}
        onPointerOver={(e) => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
        {/* Orbital ring path helper */}
        <mesh>
          <sphereGeometry args={[size * 1.1, 16, 16]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
        </mesh>
      </mesh>
    </group>
  );
}

// 4. Floating Project Crystals (Octahedrons / Double Pyramids)
function ProjectCrystal({ index, title, position, color, onSelect }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Rotation and float animation
      meshRef.current.rotation.x = time * 0.3 + index;
      meshRef.current.rotation.y = time * 0.2 + index;
      meshRef.current.position.y = position[1] + Math.sin(time * 1.2 + index) * 0.25;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(title);
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      <octahedronGeometry args={[0.65, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.85}
      />
      {/* Outer bounding box glow */}
      <boxHelper args={[new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0))]} color={color} />
    </mesh>
  );
}

// 5. Experience Station Node
function ExperienceStationNode({ position, label, index, onSelect }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.4 + index;
      meshRef.current.position.y = position[1] + Math.sin(time * 2.0 + index) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <torusGeometry args={[0.5, 0.15, 8, 24]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.5}
          wireframe
        />
        {/* Core sphere inside torus */}
        <mesh>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>
      </mesh>
    </group>
  );
}

// 6. Camera Orchestrator for Smooth Tab Transitions
function CameraOrchestrator({ currentTab, mouse }) {
  const { camera } = useThree();

  useEffect(() => {
    let targetCamPos = { x: 0, y: 3, z: 8 };

    // Update coordinates depending on tab state
    switch (currentTab) {
      case 'universe':
        targetCamPos = { x: 0, y: 2, z: 7.5 };
        break;
      case 'skills':
        targetCamPos = { x: 0, y: 4, z: 9 };
        break;
      case 'experience':
        targetCamPos = { x: -4, y: 2, z: 7 };
        break;
      case 'projects':
        targetCamPos = { x: 4, y: 1.5, z: 7.5 };
        break;
      case 'vault':
        targetCamPos = { x: 0, y: -3, z: 8 };
        break;
      case 'contact':
        targetCamPos = { x: 0, y: 0.5, z: 5.5 };
        break;
      default:
        targetCamPos = { x: 0, y: 2, z: 8 };
    }

    // Animate camera position smoothly using GSAP
    gsap.to(camera.position, {
      x: targetCamPos.x,
      y: targetCamPos.y,
      z: targetCamPos.z,
      duration: 1.8,
      ease: 'power3.out',
    });

  }, [currentTab, camera]);

  useFrame(() => {
    // Parallax mouse movements
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 0.6 - camera.position.y) * 0.05;
    
    // Always look towards the origin
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main Space Canvas orchestrator
export default function SpaceCanvas({ currentTab, onSelectPlanet, onSelectCrystal, onSelectStation }) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to [-1, 1]
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skillPlanets = [
    { name: 'Java', color: '#f89820', radius: 3.5, size: 0.45 },
    { name: 'Spring Boot', color: '#6db33f', radius: 4.8, size: 0.4 },
    { name: 'React.js', color: '#61dafb', radius: 6.0, size: 0.38 },
    { name: 'MySQL', color: '#00758f', radius: 7.2, size: 0.35 },
    { name: 'MongoDB', color: '#4db33d', radius: 8.4, size: 0.35 },
    { name: 'Node.js', color: '#339933', radius: 9.6, size: 0.3 },
    { name: 'Machine Learning', color: '#bd00ff', radius: 10.8, size: 0.32 }
  ];

  const projectCrystals = [
    { title: "Blood Bank Management System", position: [3, 0, 2], color: "#ff0000" },
    { title: "Pharmacy Ordering Management System", position: [4.5, 1, -1.5], color: "#00f0ff" },
    { title: "Grayscale Image Colorization AI", position: [2.5, -1, -3], color: "#bd00ff" },
    { title: "Personal Portfolio Website", position: [5.2, -0.5, 1], color: "#ff007f" }
  ];

  const experienceNodes = [
    { position: [-3, 1, 1], label: "Edunet Foundation", index: 0 },
    { position: [-5, -0.5, -2], label: "QSpiders", index: 1 }
  ];

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 7.5], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#030014');
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#bd00ff" />
        
        {/* Particle Stars */}
        <StarField />
        
        {/* Core Planet */}
        {currentTab !== 'vault' && <PlanetCore />}

        {/* Orbiting Skill Planets */}
        {(currentTab === 'universe' || currentTab === 'skills') && (
          skillPlanets.map((planet, idx) => (
            <SkillPlanet
              key={planet.name}
              index={idx}
              name={planet.name}
              color={planet.color}
              radius={planet.radius}
              size={planet.size}
              onSelect={onSelectPlanet}
            />
          ))
        )}

        {/* Floating Project Crystals */}
        {(currentTab === 'universe' || currentTab === 'projects') && (
          projectCrystals.map((crystal, idx) => (
            <ProjectCrystal
              key={crystal.title}
              index={idx}
              title={crystal.title}
              position={crystal.position}
              color={crystal.color}
              onSelect={onSelectCrystal}
            />
          ))
        )}

        {/* Experience Space Stations */}
        {(currentTab === 'universe' || currentTab === 'experience') && (
          experienceNodes.map((node, idx) => (
            <ExperienceStationNode
              key={node.index}
              position={node.position}
              label={node.label}
              index={node.index}
              onSelect={onSelectStation}
            />
          ))
        )}

        {/* Camera Lerp Controller */}
        <CameraOrchestrator currentTab={currentTab} mouse={mouse} />
      </Canvas>
    </div>
  );
}
