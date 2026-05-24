'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Zap, ShieldCheck, Terminal, Server } from 'lucide-react';
import ArchitectureDiagram from '../visuals/ArchitectureDiagram';

const projects = [
  {
    title: 'Siemens Cloud Migration',
    description: 'Lead engineering for internal tool migration to AWS, optimizing CI/CD workflows and reducing deployment latency by 40%.',
    tags: ['AWS', 'Jenkins', 'Terraform', 'Docker'],
    stats: { impact: '-40% Latency', scale: 'Internal Tools', tech: 'IaC Focus' },
    icon: Server,
    type: 'microservices' as const,
  },
  {
    title: 'AI Lab Compute Cluster',
    description: 'Architected high-performance compute infrastructure for Rutgers AI Research Lab, supporting multi-GPU deep learning workloads.',
    tags: ['Nvidia-Docker', 'Slurm', 'K8s', 'Prometheus'],
    stats: { compute: 'Multi-GPU', labs: 'Rutgers AI', perf: 'Optimized' },
    icon: Zap,
    type: 'microservices' as const,
  },
  {
    title: 'Zero-Trust SecOps Framework',
    description: 'Developed automated security auditing tools and hardened VPC architectures as part of GT Cybersecurity research.',
    tags: ['SecOps', 'Compliance', 'Vault', 'Suricata'],
    stats: { security: 'SOC2-Ready', audit: 'Automated', research: 'GT Cyber' },
    icon: ShieldCheck,
    type: 'security' as const,
  },
];

export default function Projects() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-sm font-mono text-cyber-blue uppercase tracking-widest mb-4">Infrastructure Case Studies</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">Production Deployments</h3>
        </div>
        <div className="text-white/40 max-w-md text-sm md:text-right font-mono uppercase tracking-widest">
          [ ARCHIVE: 2023-2026 ]
          <br />
          Enterprise & Academic Solutions
        </div>
      </div>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            <div className="lg:col-span-8 relative group overflow-hidden rounded-2xl bg-black/40 border border-white/5 p-10 flex flex-col justify-between hover:border-cyber-blue/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-80 h-80 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
                <ArchitectureDiagram type={project.type} />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-mono px-2 py-1 bg-cyber-blue/5 text-cyber-blue rounded border border-cyber-blue/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-4xl font-bold mb-4 tracking-tight group-hover:text-cyber-blue transition-colors">
                  {project.title}
                </h4>
                <p className="text-white/50 text-lg mb-10 max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-cyber-blue text-black font-bold rounded text-sm hover:bg-white transition-colors">
                  Documentation <ExternalLink size={16} />
                </button>
                <button className="p-3 glass-panel rounded hover:border-cyber-blue/50 transition-colors">
                  <Terminal size={18} className="text-cyber-blue" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-rows-3 gap-4">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="glass-panel p-6 flex flex-col justify-center border-white/5 group-hover:border-cyber-blue/20 transition-all">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">{key}</span>
                  <span className="text-xl font-bold text-cyber-blue tracking-tight">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
