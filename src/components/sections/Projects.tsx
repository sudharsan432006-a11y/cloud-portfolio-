'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, Zap, Globe, ShieldCheck } from 'lucide-react';
import ArchitectureDiagram from '../visuals/ArchitectureDiagram';

const projects = [
  {
    title: 'Global Mesh Infrastructure',
    description: 'Multi-region Kubernetes deployment with Istio service mesh for high-throughput microservices.',
    tags: ['EKS', 'Istio', 'Terraform', 'Helm'],
    stats: { nodes: '200+', availability: '99.99%', latency: '<50ms' },
    icon: Globe,
    type: 'microservices' as const,
  },
  {
    title: 'Auto-Scaling Data Pipeline',
    description: 'Serverless data processing engine handling 100M+ daily events with real-time analytics.',
    tags: ['Lambda', 'Kinesis', 'DynamoDB', 'CDK'],
    stats: { throughput: '10GB/s', compute: 'Serverless', scaling: 'Auto' },
    icon: Zap,
    type: 'microservices' as const,
  },
  {
    title: 'Zero-Trust Cloud Security',
    description: 'Enterprise-grade security architecture implementing identity-aware proxy and encrypted VPCs.',
    tags: ['IAM', 'KMS', 'WAF', 'CloudTrail'],
    stats: { compliance: 'SOC2/HIPAA', audits: 'Automated', threats: 'Filtered' },
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
          <h3 className="text-4xl md:text-5xl font-bold">Deployed Solutions</h3>
        </div>
        <div className="text-white/40 max-w-md text-sm md:text-right">
          Showcasing production-ready architectures that balance performance, cost, and security.
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
            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl bg-infra-gray border border-white/5 p-8 flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 p-8 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                <ArchitectureDiagram type={project.type} />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-cyber-blue/10 text-cyber-blue rounded-md border border-cyber-blue/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-3xl font-bold mb-4 group-hover:text-cyber-blue transition-colors">
                  {project.title}
                </h4>
                <p className="text-white/60 text-lg mb-8 max-w-xl">
                  {project.description}
                </p>
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-cyber-blue text-black font-bold rounded-lg hover:bg-white transition-colors">
                  View Architecture <ExternalLink size={18} />
                </button>
                <button className="p-3 glass-panel rounded-lg hover:border-cyber-blue/50 transition-colors">
                  <GitBranch size={20} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-rows-3 gap-4">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="glass-panel p-6 flex items-center justify-between group-hover:border-cyber-blue/30 transition-colors">
                  <span className="text-sm font-mono text-white/40 uppercase tracking-widest">{key}</span>
                  <span className="text-xl font-bold text-cyber-blue">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
