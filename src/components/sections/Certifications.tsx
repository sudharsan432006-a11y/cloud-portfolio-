'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Cpu, Cloud } from 'lucide-react';

const certs = [
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
    id: 'AWS-ASA-12345',
    icon: Award,
    color: 'from-orange-500/20 to-transparent'
  },
  {
    title: 'Certified Kubernetes Administrator',
    issuer: 'CNCF / Linux Foundation',
    date: '2023',
    id: 'CKA-98765',
    icon: Cpu,
    color: 'from-blue-500/20 to-transparent'
  },
  {
    title: 'HashiCorp Certified: Terraform',
    issuer: 'HashiCorp',
    date: '2024',
    id: 'HC-TF-45678',
    icon: Cloud,
    color: 'from-purple-500/20 to-transparent'
  },
  {
    title: 'Security+ / AWS Security',
    issuer: 'CompTIA / AWS',
    date: '2024',
    id: 'SEC-AWS-11223',
    icon: Shield,
    color: 'from-green-500/20 to-transparent'
  },
];

export default function Certifications() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-sm font-mono text-cyber-blue uppercase tracking-widest mb-4">Verification & Expertise</h2>
        <h3 className="text-4xl md:text-5xl font-bold">Cloud Certifications</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certs.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className={`relative overflow-hidden glass-panel p-8 rounded-2xl border-l-4 border-l-cyber-blue/30 bg-gradient-to-br ${cert.color}`}
          >
            <div className="relative z-10 flex items-start gap-6">
              <div className="p-4 rounded-xl bg-white/5 text-cyber-blue">
                <cert.icon size={32} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold">{cert.title}</h4>
                  <span className="text-xs font-mono text-white/30">{cert.date}</span>
                </div>
                <p className="text-white/50 text-sm mb-4">{cert.issuer}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">ID: {cert.id}</span>
                  <span className="text-[10px] font-mono text-cyber-blue uppercase tracking-widest cursor-pointer hover:underline">Verified Credentials</span>
                </div>
              </div>
            </div>

            {/* Holographic scanning effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-blue/5 to-transparent w-1/2 -skew-x-12"
              animate={{ x: ['-100%', '250%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
