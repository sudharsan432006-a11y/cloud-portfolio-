'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { Shield, Zap, Server, BarChart2 } from 'lucide-react';

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
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6">
      <div className="hero-content mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-blue/30 bg-cyber-blue/5 text-[10px] font-mono text-cyber-blue tracking-tighter uppercase">
        <span className="relative flex h-2 w-2">
          {!shouldReduceMotion && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-blue opacity-75"></span>
          )}
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-blue"></span>
        </span>
        System Status: Optimized
      </div>

      <h1 className="hero-content text-center mb-6">
        <span className="block text-5xl md:text-8xl font-bold tracking-tighter leading-none">
          Engineering Scalable
        </span>
        <span className="block text-5xl md:text-8xl font-bold tracking-tighter leading-none text-cyber-blue cyber-text-glow">
          Cloud Infrastructure
        </span>
        <span className="block text-5xl md:text-8xl font-bold tracking-tighter leading-none">
          for the Future.
        </span>
      </h1>

      <p className="hero-content text-center text-white/50 max-w-2xl mb-12 text-lg md:text-xl">
        Architecting high-availability systems and automated DevOps workflows for global-scale enterprise applications.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
        {[
          { label: '99.99% Uptime', sub: 'SLA Guaranteed', icon: Server },
          { label: 'SecOps', sub: 'Hardened Env', icon: Shield },
          { label: 'IaC', sub: 'Terraform/CDK', icon: Zap },
          { label: 'Real-time', sub: 'Monitoring', icon: BarChart2 },
        ].map((stat, i) => (
          <div key={i} className="hero-stat glass-panel p-6 rounded-xl flex flex-col items-center text-center group hover:border-cyber-blue/50 transition-colors">
            <stat.icon className="text-cyber-blue mb-4 group-hover:scale-110 transition-transform" size={24} />
            <div className="text-[10px] font-mono text-white/30 uppercase mb-1">{stat.sub}</div>
            <div className="font-bold text-sm md:text-base">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
