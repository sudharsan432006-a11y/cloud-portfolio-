'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Cpu, Cloud, Globe } from 'lucide-react';

const certs = [
  {
    title: 'MS in Cybersecurity',
    issuer: 'Georgia Institute of Technology',
    date: 'Expected 2026',
    id: 'ACADEMIC-GT-01',
    icon: Globe,
    color: 'from-blue-600/20 to-transparent'
  },
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024',
    id: 'AWS-ASA-99421',
    icon: Cloud,
    color: 'from-orange-500/20 to-transparent'
  },
  {
    title: 'Certified Kubernetes Administrator',
    issuer: 'CNCF / Linux Foundation',
    date: '2023',
    id: 'CKA-CKAD-1102',
    icon: Cpu,
    color: 'from-blue-400/20 to-transparent'
  },
  {
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: '2023',
    id: 'SEC-PLUS-4491',
    icon: Shield,
    color: 'from-green-500/20 to-transparent'
  },
];

export default function Certifications() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-sm font-mono text-cyber-blue uppercase tracking-widest mb-4">Academic & Professional Validation</h2>
        <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">Accredited Expertise</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className={`relative overflow-hidden glass-panel p-8 rounded-xl border-l-2 border-l-cyber-blue/40 bg-gradient-to-br ${cert.color} border-white/5 transition-all duration-500 group`}
          >
            <div className="relative z-10 flex items-start gap-8">
              <div className="p-4 rounded bg-black/40 text-cyber-blue border border-cyber-blue/20 group-hover:border-cyber-blue group-hover:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all">
                <cert.icon size={36} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-2xl font-bold tracking-tight">{cert.title}</h4>
                  <span className="text-[10px] font-mono text-cyber-blue bg-cyber-blue/10 px-2 py-1 rounded">{cert.date}</span>
                </div>
                <p className="text-white/40 text-sm mb-6 font-mono uppercase tracking-widest">{cert.issuer}</p>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Credential ID: {cert.id}</span>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-cyber-blue uppercase cursor-pointer hover:underline">
                    Verify <Award size={12} />
                  </div>
                </div>
              </div>
            </div>

            {/* Holographic scanning effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-blue/5 to-transparent w-full -skew-x-12 pointer-events-none"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
