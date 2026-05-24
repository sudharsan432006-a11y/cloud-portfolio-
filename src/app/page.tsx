'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import Dashboard from '@/components/sections/Dashboard';
import GridBackground from '@/components/visuals/GridBackground';
import { Terminal, Shield, Activity, LayoutDashboard, Database, HardDrive, Menu } from 'lucide-react';

const CloudSystem = dynamic(() => import('@/components/visuals/CloudSystem'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative text-cloud-white min-h-screen bg-infra-dark">
      <GridBackground />
      <CloudSystem />

      {/* Side Navigation Console (Desktop) */}
      <nav className="fixed left-0 top-0 h-full w-16 hidden lg:flex flex-col items-center py-8 z-50 border-r border-white/5 bg-black/20 backdrop-blur-md">
        <div className="p-3 rounded-lg bg-cyber-blue/20 text-cyber-blue mb-12">
          <Terminal size={24} />
        </div>
        <div className="flex-1 flex flex-col gap-8 text-white/20">
          <LayoutDashboard size={20} className="hover:text-cyber-blue cursor-pointer transition-colors" />
          <Activity size={20} className="hover:text-cyber-blue cursor-pointer transition-colors" />
          <Shield size={20} className="hover:text-cyber-blue cursor-pointer transition-colors" />
          <Database size={20} className="hover:text-cyber-blue cursor-pointer transition-colors" />
          <HardDrive size={20} className="hover:text-cyber-blue cursor-pointer transition-colors" />
        </div>
        <div className="text-[10px] font-mono text-cyber-blue/40 origin-center -rotate-90 whitespace-nowrap tracking-[0.5em] mb-4">
          SYSTEM-VERSION-2.4.0
        </div>
      </nav>

      {/* Top Header Console */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl z-40 px-6 lg:pl-24 flex items-center justify-between">
         <div className="flex items-center gap-4">
           <div className="flex flex-col">
             <span className="text-xs font-bold tracking-tighter uppercase">Cloud Console</span>
             <span className="text-[8px] font-mono text-cyber-blue tracking-[0.2em] uppercase">Auth: G.TECH_SECURED</span>
           </div>
           <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />
           <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             Nodes: 1,024 / ACTIVE
           </div>
         </div>

         <div className="flex items-center gap-6">
           <div className="hidden md:flex items-center gap-4 text-[10px] font-mono">
             <div className="flex flex-col items-end">
               <span className="text-white/20 uppercase">Network Out:</span>
               <span className="text-cyber-blue">48.2 GB/s</span>
             </div>
             <div className="flex flex-col items-end">
               <span className="text-white/20 uppercase">CPU Inst:</span>
               <span className="text-cyber-blue">14.2%</span>
             </div>
           </div>
           <button className="lg:hidden text-cyber-blue">
             <Menu size={24} />
           </button>
         </div>
      </header>

      <div className="relative z-10 lg:pl-16 pt-16">
        <div className="max-w-[1600px] mx-auto">
          <Hero />

          {/* Section Divider with Metadata */}
          <div className="px-6 flex items-center gap-4 opacity-20">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white" />
            <span className="text-[8px] font-mono uppercase tracking-[0.5em]">Architecture.Map_Start</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white" />
          </div>

          <Skills />
          <Projects />
          <Certifications />
          <Dashboard />

          <footer className="py-20 px-6 lg:px-12 border-t border-white/5 bg-black/40 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-cyber-blue/10 rounded">
                  <Terminal size={20} className="text-cyber-blue" />
                </div>
                <div>
                  <div className="text-sm font-bold tracking-tight">Cloud Engineering Port v2</div>
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Secured by Georgia Tech Cybersecurity Protocols</div>
                </div>
              </div>

              <div className="flex gap-8 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                <span className="hover:text-cyber-blue cursor-pointer transition-colors">Documentation</span>
                <span className="hover:text-cyber-blue cursor-pointer transition-colors">Architecture</span>
                <span className="hover:text-cyber-blue cursor-pointer transition-colors">Credentials</span>
              </div>

              <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
                © 2026 G.TECH-SEC // ALL RIGHTS RESERVED
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
