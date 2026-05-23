'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ArchitectureDiagram from '../visuals/ArchitectureDiagram';
import {
  Container,
  GitBranch,
  Terminal,
  Network,
  BarChart3,
  Workflow,
  Box
} from 'lucide-react';

const skills = [
  { name: 'AWS Ecosystem', icon: Box, category: 'Cloud' },
  { name: 'Kubernetes', icon: Container, category: 'Orchestration' },
  { name: 'Docker', icon: Box, category: 'Containerization' },
  { name: 'CI/CD Pipelines', icon: GitBranch, category: 'DevOps' },
  { name: 'Infrastructure as Code', icon: Workflow, category: 'Automation' },
  { name: 'Linux Engineering', icon: Terminal, category: 'OS' },
  { name: 'Network Architecture', icon: Network, category: 'Infrastructure' },
  { name: 'Monitoring & Logging', icon: BarChart3, category: 'Observability' },
];

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 px-6 relative max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-sm font-mono text-cyber-blue uppercase tracking-widest mb-4">Core Competencies</h2>
        <h3 className="text-4xl md:text-5xl font-bold">Cloud Engineering Stack</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, borderColor: 'rgba(0, 242, 255, 0.5)' }}
            className="glass-panel p-6 rounded-xl group transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="p-3 rounded-lg bg-cyber-blue/10 text-cyber-blue group-hover:bg-cyber-blue group-hover:text-black transition-colors">
                <skill.icon size={24} />
              </div>
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-tighter">
                {skill.category}
              </div>
            </div>

            <h4 className="text-lg font-bold mb-2 group-hover:text-cyber-blue transition-colors">
              {skill.name}
            </h4>

            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
              <motion.div
                className="h-full bg-cyber-blue"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute -right-20 top-40 w-96 h-96 opacity-20 -z-10 pointer-events-none">
        <ArchitectureDiagram type="microservices" />
      </div>
      <div className={`absolute -right-20 top-40 w-96 h-96 border border-cyber-blue/10 rounded-full -z-10 ${shouldReduceMotion ? '' : 'animate-pulse'}`} />
    </section>
  );
}
