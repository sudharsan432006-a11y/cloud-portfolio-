'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import Dashboard from '@/components/sections/Dashboard';

const CloudSystem = dynamic(() => import('@/components/visuals/CloudSystem'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative bg-infra-dark text-cloud-white min-h-screen">
      <CloudSystem />

      <div className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <Certifications />
        <Dashboard />

        <footer className="py-12 text-center text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
          © 2026 Cloud Engineering Architecture. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
