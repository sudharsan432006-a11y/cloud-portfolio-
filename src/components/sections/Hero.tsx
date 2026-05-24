'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { Shield, Zap, Server, BarChart2, Cpu, Globe, Terminal } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from('.hero-content', {
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'power4.out',
          stagger: 0.2
        });

        gsap.from('.hero-stat', {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          delay: 1,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        });

        // Scanline animation
        gsap.to('.scanline', {
          top: '100%',
          duration: 4,
          repeat: -1,
          ease: 'none'
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from('.hero-content, .hero-stat', {
          opacity: 0,
          duration: 1,
          stagger: 0.1
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="scanline absolute w-full h-[2px] bg-cyber-blue top-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="hero-content mb-12 relative">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-cyber-blue/20 p-2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-cyber-blue/10 animate-pulse" />
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(0,242,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,242,255,0.1)_1px,transparent_1px)] [background-size:10px_10px]" />
          <div className="w-full h-full rounded-full border border-cyber-blue/40 flex items-center justify-center bg-black/40 relative z-10">
            <Cpu size={48} className="text-cyber-blue opacity-50 group-hover:scale-110 transition-transform duration-500" />
          </div>
          {/* Scanning line for portrait */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-blue/50 shadow-[0_0_10px_rgba(0,242,255,0.5)] animate-[scan_3s_infinite_linear]" />
        </div>
        {/* Identity tags */}
        <div className="absolute -right-4 top-0 glass-panel px-2 py-1 rounded border border-cyber-blue/30 text-[8px] font-mono text-cyber-blue uppercase animate-bounce">
          Verified ID
        </div>
      </div>

      <div className="hero-content mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-blue/30 bg-cyber-blue/5 text-[10px] font-mono text-cyber-blue tracking-tighter uppercase">
        <span className="relative flex h-2 w-2">
          {!shouldReduceMotion && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-blue opacity-75"></span>
          )}
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-blue"></span>
        </span>
        Kernel Status: Siemens-Cloud-v2.0 // Rutgers-AI-Lab // GT-Cyber-Sec
      </div>

      <div className="relative">
        <h1 className="hero-content text-center mb-6 z-10 relative">
          <span className="block text-4xl md:text-8xl font-bold tracking-tighter leading-none">
            Engineering Scalable
          </span>
          <span className="block text-4xl md:text-8xl font-bold tracking-tighter leading-none text-cyber-blue cyber-text-glow">
            Cloud Infrastructure
          </span>
          <span className="block text-4xl md:text-8xl font-bold tracking-tighter leading-none">
            for the Future.
          </span>
        </h1>

        {/* Decorative holographic grid behind text */}
        <div className="absolute -inset-10 -z-10 opacity-10 blur-sm">
          <div className="w-full h-full border border-cyber-blue/50 [background-image:linear-gradient(to_right,rgba(0,242,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,242,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
      </div>

      <p className="hero-content text-center text-white/50 max-w-3xl mb-12 text-base md:text-xl font-mono">
        [SYSTEM] Architecting hardened cloud environments for Siemens and Rutgers AI Lab.
        <br />
        <span className="text-cyber-blue">&gt; Georgia Tech Cybersecurity Engineer specializing in high-availability IaC and automated SecOps.</span>
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
        {[
          { label: 'Siemens Cloud Dev', sub: 'Internal Systems', icon: Server },
          { label: 'Rutgers AI Lab', sub: 'Deep Learning Infra', icon: Cpu },
          { label: 'GT Cybersecurity', sub: 'Threat Modeling', icon: Shield },
          { label: 'Cloud Architecture', sub: 'Enterprise Grade', icon: Globe },
        ].map((stat, i) => (
          <div key={i} className="hero-stat glass-panel p-6 rounded-xl flex flex-col items-center text-center group hover:border-cyber-blue/50 transition-all hover:bg-cyber-blue/5">
            <stat.icon className="text-cyber-blue mb-4 group-hover:scale-110 transition-transform" size={24} />
            <div className="text-[10px] font-mono text-white/30 uppercase mb-1 tracking-widest">{stat.sub}</div>
            <div className="font-bold text-sm md:text-base tracking-tight">{stat.label}</div>
            <div className="mt-4 w-full h-[1px] bg-white/5 overflow-hidden">
               <div className="w-1/2 h-full bg-cyber-blue/50 animate-[shimmer_2s_infinite_linear]" />
            </div>
          </div>
        ))}
      </div>

      <div className="hero-content mt-16 flex items-center gap-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-cyber-blue" />
          <span>latency: 14ms</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-cyber-blue" />
          <span>uptime: 99.999%</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 size={14} className="text-cyber-blue" />
          <span>nodes: 1,024</span>
        </div>
      </div>
    </section>
  );
}
