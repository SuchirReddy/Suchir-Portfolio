"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// A simple animated counter using Framer Motion
function AnimatedCounter({ value, progress, triggerStart, triggerEnd, label }: { value: number, progress: any, triggerStart: number, triggerEnd: number, label: string }) {
  const mappedProgress = useTransform(progress, [triggerStart, triggerEnd], [0, 1]);
  const springProgress = useSpring(mappedProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    return springProgress.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      setDisplayValue(Math.floor(clamped * value));
    });
  }, [springProgress, value]);

  const opacity = useTransform(progress, (p: number) => {
    if (p < triggerStart - 0.05) return 0;
    if (p >= triggerStart) return 1;
    return (p - (triggerStart - 0.05)) / 0.05;
  });

  const y = useTransform(progress, (p: number) => {
    if (p < triggerStart - 0.05) return 20;
    if (p >= triggerStart) return 0;
    return 20 - ((p - (triggerStart - 0.05)) / 0.05) * 20;
  });

  return (
    <motion.div
      style={{ opacity, y }}
      className="flex flex-col items-center justify-center p-2 md:p-4 rounded-xl md:rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-xl md:shadow-2xl relative overflow-hidden transition-colors duration-500 w-full"
    >
      <div className="text-2xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-1 font-mono tracking-tighter transition-colors duration-500">
        {displayValue}
        <span className="text-lime-500">+</span>
      </div>
      <div className="text-[8px] md:text-xs lg:text-sm font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-widest text-center transition-colors duration-500 leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

// --- REAL 3D MODEL ---
function F1RealMesh({ wheelRotation, scale = 1.1 }: { wheelRotation: number, scale?: number }) {
  const { scene } = useGLTF("/redbull.glb/source/oracle_redbull_rb19.glb");

  useFrame(() => {
    // Traverse carefully to avoid rotating the entire chassis or steering wheels
    scene.traverse((child: any) => {
      const name = child.name?.toUpperCase() || "";
      // Match tire, slick, or rim. We removed 'WHEEL' because it often includes the suspension rods/axles in the group.
      if (
        (name.includes("TIRE") || name.includes("SLICK") || name.includes("RIM")) &&
        !name.includes("STEER") &&
        !name.includes("BASE")
      ) {
        // We removed child.isMesh because the wheels are often Groups (Object3D) rather than raw Meshes.
        child.rotation.x = -wheelRotation;
      }
    });
  });

  return (
    // Adjust scale and rotation so it faces the correct direction
    // You may need to tweak Math.PI / 2 or Math.PI to make it face right.
    <group rotation={[0, Math.PI / 2, 0]}>
      <primitive object={scene} scale={scale} position={[0, 0, 0]} />
    </group>
  );
}

// Preload the model so it's ready immediately
useGLTF.preload("/redbull.glb/source/oracle_redbull_rb19.glb");

// The 3D Scene that connects to Framer Motion scroll
function Scene({ scrollYProgress }: { scrollYProgress: any }) {
  const { viewport } = useThree();
  const [carX, setCarX] = useState(-8);
  const [wheelRot, setWheelRot] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check immediately
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // We removed responsive scaling so the car remains a fixed size (1.1) on all devices
  const responsiveScale = 1.1;

  useFrame(() => {
    // Get the current scroll value (0 to 1)
    const progress = scrollYProgress.get();

    // Drive from just outside the left edge
    const startX = -(viewport.width / 2) - 4;
    // On mobile, stop the car even earlier (x = -2.5) so the front wing is fully visible on screen
    const endX = isMobile ? -2.5 : (viewport.width / 2) + 4;
    const totalDistance = endX - startX;

    const targetX = startX + progress * totalDistance;
    setCarX(targetX);

    // Map progress to wheel rotation (lots of spins)
    setWheelRot(progress * Math.PI * 20);
  });

  return (
    <>
      {/* Beautiful lighting setup for the premium F1 look */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
      <spotLight position={[-5, 5, 5]} intensity={2} color="#A3E635" angle={0.5} penumbra={1} />

      {/* Use a studio environment map for great metallic reflections */}
      <Environment preset="city" />

      {/* The Car Group */}
      <group position={[carX, -0.75, 0]}>
        <React.Suspense fallback={null}>
          <F1RealMesh wheelRotation={wheelRot} scale={responsiveScale} />
        </React.Suspense>
        {/* Soft glowing underlight */}
        <pointLight position={[0, 0.2, 0]} intensity={1} color="#A3E635" distance={3} />
      </group>

      {/* Ground reflections / shadows */}
      <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={20} blur={2} far={2} />
    </>
  );
}

// --- MAIN COMPONENT ---
export function FinalLapSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-zinc-50 dark:bg-[#020202] overflow-visible transition-colors duration-500"
    >
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden">

        {/* Headlines */}
        <div className="absolute top-32 w-full text-center z-20 px-4 pointer-events-none">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white mb-4 transition-colors duration-500"
          >
            Built Fast. Built Right. <br className="md:hidden" /> Built to <span className="text-lime-500">Scale.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto transition-colors duration-500"
          >
            Every product, brand, and experience is engineered for performance.
          </motion.p>
        </div>

        {/* The Metrics Layer */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end md:block">
          <div className="container mx-auto h-full relative">

            {/* Unified Bottom Layout for both Desktop and Mobile */}
            <div className="absolute bottom-0 md:bottom-2 left-0 w-full px-2 md:px-12 lg:px-24 pb-4 md:pb-2 z-50">
              <div className="grid grid-cols-3 gap-2 md:gap-8 max-w-5xl mx-auto">
                <AnimatedCounter value={12} progress={scrollYProgress} triggerStart={0.40} triggerEnd={0.50} label="Projects Built" />
                <AnimatedCounter value={69} progress={scrollYProgress} triggerStart={0.45} triggerEnd={0.55} label="Ideas Executed" />
                <AnimatedCounter value={5} progress={scrollYProgress} triggerStart={0.50} triggerEnd={0.60} label="Products Shipped" />
              </div>
            </div>
          </div>
        </div>

        {/* The Track / Ground Visuals */}
        <div className="absolute bottom-[20%] w-full h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent dark:via-zinc-600 opacity-20 z-0"></div>
        <div
          className="absolute bottom-[18%] w-full border-b border-solid border-zinc-400 dark:border-zinc-500 opacity-30 z-0"
          style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
        ></div>

        {/* 3D Canvas Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* We use pointer-events-none so we don't block scrolling */}
          <Canvas camera={{ position: [0, 2, 6], fov: 40 }}>
            <Scene scrollYProgress={scrollYProgress} />
          </Canvas>
        </div>

      </div>
    </section>
  );
}
