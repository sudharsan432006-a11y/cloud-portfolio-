'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Cpu, Network, CheckCircle2, ArrowUpRight } from 'lucide-react';

import { AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [cpuLoad, setCpuLoad] = useState([40, 45, 42, 48, 52, 47, 44]);
  const [traffic, setTraffic] = useState([20, 35, 60, 45, 30, 25, 40]);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCpuLoad(prev => [...prev.slice(1), Math.floor(Math.random() * 30) + 40]);
      setTraffic(prev => [...prev.slice(1), Math.floor(Math.random() * 50) + 20]);

      const systems = ['AUTH-SVC', 'DB-CLUSTER', 'API-GW', 'K8S-NODE-01', 'WAF-EDGE'];
      const actions = ['Validated tokens', 'Query optimized', 'Request proxied', 'Pod rescheduled', 'Threat blocked'];
      const newLog = `[${new Date().toLocaleTimeString()}] ${systems[Math.floor(Math.random() * systems.length)]}: ${actions[Math.floor(Math.random() * actions.length)]}`;
      setLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-sm font-mono text-cyber-blue uppercase tracking-widest mb-4">Live Infrastructure Monitoring</h2>
        <h3 className="text-4xl md:text-5xl font-bold">DevOps Operations Dashboard</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 glass-panel p-8 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Activity className={`text-cyber-blue ${shouldReduceMotion ? '' : 'animate-pulse'}`} />
              <h4 className="font-bold">Traffic Visualization</h4>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-cyber-blue" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
          </div>

          <div className="h-64 flex items-end gap-2 px-2">
            {traffic.map((val, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                className="flex-1 bg-gradient-to-t from-cyber-blue/5 to-cyber-blue/40 rounded-t-sm border-t border-cyber-blue/50"
              />
            ))}
          </div>

          <div className="mt-6 flex justify-between text-[10px] font-mono text-white/20 uppercase tracking-widest">
            <span>T-Minus 12h</span>
            <span>Real-time Stream</span>
            <span>Live Status</span>
          </div>
        </div>

        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <Cpu className="text-cyber-blue" />
              <span className="text-xs font-mono text-cyber-blue">+2.4%</span>
            </div>
            <div className="text-2xl font-bold mb-1">{cpuLoad[cpuLoad.length - 1]}%</div>
            <div className="text-xs text-white/40 uppercase tracking-widest mb-4">Avg CPU Usage</div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyber-blue"
                animate={{ width: `${cpuLoad[cpuLoad.length - 1]}%` }}
              />
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <Network className="text-cyber-blue" />
              <span className="text-xs font-mono text-green-400">Stable</span>
            </div>
            <div className="text-2xl font-bold mb-1">{(traffic[traffic.length - 1] / 50).toFixed(1)} Gbps</div>
            <div className="text-xs text-white/40 uppercase tracking-widest mb-4">Network Ingress</div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyber-blue"
                animate={{ width: `${traffic[traffic.length - 1]}%` }}
              />
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl lg:col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-1.5 h-1.5 rounded-full bg-matrix-green ${shouldReduceMotion ? '' : 'animate-pulse'}`} />
              <h5 className="text-[10px] font-mono uppercase text-white/40 tracking-widest">Security Protocols</h5>
            </div>
            <div className="space-y-2 font-mono text-[10px]">
              <AnimatePresence mode="popLayout">
                {logs.map((log, i) => (
                  <motion.div
                    key={log}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className={i === 0 ? 'text-cyber-blue' : 'text-white/30'}
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="lg:col-span-12 glass-panel p-4 rounded-xl flex flex-wrap gap-8 items-center justify-between overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-xs font-mono">us-east-1: Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-xs font-mono">eu-west-1: Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-xs font-mono">ap-southeast-1: Healthy</span>
          </div>
          <div className="flex items-center gap-2 text-cyber-blue">
            <ArrowUpRight size={16} />
            <span className="text-xs font-mono underline cursor-pointer">Open Full System Report</span>
          </div>
        </div>
      </div>
    </section>
  );
}
