'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ArchitectureDiagram from '../visuals/ArchitectureDiagram';
import {
  Container,
  GitBranch,
  Terminal,
  Network,
  Workflow,
  Box,
  ShieldCheck,
  Cpu
} from 'lucide-react';

const skills = [
  { name: 'AWS Infrastructure', icon: Box, category: 'Cloud' },
  { name: 'Kubernetes (EKS/GKE)', icon: Container, category: 'Orchestration' },
  { name: 'Terraform & IaC', icon: Workflow, category: 'Automation' },
  { name: 'CI/CD Pipelines', icon: GitBranch, category: 'DevOps' },
  { name: 'Cybersecurity / SecOps', icon: ShieldCheck, category: 'Security' },
  { name: 'Python & Go', icon: Terminal, category: 'Engineering' },
  { name: 'Advanced Networking', icon: Network, category: 'Infrastructure' },
  { name: 'Deep Learning Infra', icon: Cpu, category: 'AI/ML' },
];

export default function Skills() {
  return (
    <section className="py-24 px-6 relative max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <h2 className="text-sm font-mono text-cyber-blue uppercase tracking-widest mb-4">Tech Stack & Competencies</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">Architecture Engineering</h3>
        </div>
        <div className="glass-panel p-6 rounded-xl border-cyber-blue/20 max-w-sm">
           <div className="text-[10px] font-mono text-cyber-blue uppercase mb-2">Academic Validation</div>
           <p className="text-xs text-white/60 leading-relaxed font-mono">
             MS in Cybersecurity - Georgia Tech.
             <br />
             Specializing in hardened infrastructure & automated threat mitigation.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, borderColor: 'rgba(0, 242, 255, 0.4)' }}
            className="glass-panel p-6 rounded-xl group transition-all duration-300 border-white/5"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="p-3 rounded-lg bg-cyber-blue/10 text-cyber-blue group-hover:bg-cyber-blue group-hover:text-black transition-all duration-500 shadow-[0_0_0_rgba(0,242,255,0)] group-hover:shadow-[0_0_20px_rgba(0,242,255,0.3)]">
                <skill.icon size={24} />
              </div>
              <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest border border-white/5 px-2 py-1 rounded">
                {skill.category}
              </div>
            </div>

            <h4 className="text-lg font-bold mb-2 group-hover:text-cyber-blue transition-colors">
              {skill.name}
            </h4>

            <div className="flex gap-1 mt-4">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className={`h-[2px] flex-1 rounded-full ${i < 4 ? 'bg-cyber-blue/40' : 'bg-white/5'}`} />
               ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative floating diagram */}
      <div className="absolute -right-20 top-40 w-[500px] h-[500px] opacity-10 -z-10 pointer-events-none">
        <ArchitectureDiagram type="microservices" />
      </div>
    </section>
  );
}
