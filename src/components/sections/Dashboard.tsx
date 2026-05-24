'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Cpu,
  ArrowUpRight,
  ShieldAlert,
  Database,
  CloudLightning,
  Terminal,
  Signal
} from 'lucide-react';

export default function Dashboard() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [cpuLoad, setCpuLoad] = useState([40, 45, 42, 48, 52, 47, 44, 49, 53, 51]);
  const [traffic, setTraffic] = useState([20, 35, 60, 45, 30, 25, 40, 55, 65, 45]);
  const [logs, setLogs] = useState<string[]>([]);
  const [uptime] = useState('99.999%');

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCpuLoad(prev => [...prev.slice(1), Math.floor(Math.random() * 20) + 40]);
      setTraffic(prev => [...prev.slice(1), Math.floor(Math.random() * 40) + 30]);

      const systems = ['SIEMENS-PROD', 'GT-SOC-NODE', 'RUTGERS-AI-GPU', 'AWS-US-EAST-1', 'EDGE-WAF'];
      const actions = ['Auth check passed', 'Packet filtered', 'Model weight synced', 'VPC flow logged', 'DDoS mitig active'];
      const newLog = `[${new Date().toLocaleTimeString()}] ${systems[Math.floor(Math.random() * systems.length)]}: ${actions[Math.floor(Math.random() * actions.length)]}`;
      setLogs(prev => [newLog, ...prev].slice(0, 8));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section id="dashboard" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <h2 className="text-sm font-mono text-cyber-blue uppercase tracking-widest mb-4">Infrastructure Operations Center</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">Real-time Performance Metrics</h3>
        </div>
        <div className="glass-panel px-6 py-4 rounded-xl flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Global Uptime</span>
            <span className="text-xl font-bold text-green-400">{uptime}</span>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Active Nodes</span>
            <span className="text-xl font-bold text-cyber-blue">1,248</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Traffic Graph */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-xl relative overflow-hidden border-cyber-blue/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded bg-cyber-blue/10 text-cyber-blue">
                <Activity size={20} className={shouldReduceMotion ? '' : 'animate-pulse'} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider">Network Ingress Rate</h4>
                <p className="text-[10px] font-mono text-white/40">Aggregated Global Traffic (Gbps)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-cyber-blue bg-cyber-blue/5 px-2 py-1 rounded border border-cyber-blue/20">
              <Signal size={12} />
              LIVE STREAM
            </div>
          </div>

          <div className="h-64 flex items-end gap-1 px-2 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.05]">
               {[...Array(5)].map((_, i) => <div key={i} className="w-full h-[1px] bg-white" />)}
            </div>

            {traffic.map((val, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                className="flex-1 bg-gradient-to-t from-cyber-blue/5 via-cyber-blue/20 to-cyber-blue/60 rounded-t-sm border-t border-cyber-blue/40 relative group"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 border border-cyber-blue/30 px-1 rounded text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}G
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-between text-[10px] font-mono text-white/20 uppercase tracking-widest">
            <span>T-Minus 10m</span>
            <span>Internal Backbone Statistics</span>
            <span>Current Cluster: US-EAST-01</span>
          </div>
        </div>

        {/* Side Metrics */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="glass-panel p-5 rounded-xl border-white/5 hover:border-cyber-blue/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Cpu className="text-cyber-blue" size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">CPU Load</span>
              </div>
              <span className="text-xs font-mono text-cyber-blue">{cpuLoad[cpuLoad.length - 1]}%</span>
            </div>
            <div className="flex items-end gap-1 h-12">
               {cpuLoad.map((load, i) => (
                 <motion.div
                   key={i}
                   animate={{ height: `${load}%` }}
                   className="flex-1 bg-cyber-blue/20 rounded-t-[1px]"
                 />
               ))}
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Database className="text-amber-400" size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">DB Latency</span>
              </div>
              <span className="text-xs font-mono text-amber-400">12ms</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber-400"
                animate={{ width: '45%' }}
              />
            </div>
            <div className="mt-2 text-[8px] font-mono text-white/20 uppercase">Primary Cluster: rds-geo-replica</div>
          </div>

          <div className="glass-panel p-5 rounded-xl border-white/5 bg-cyber-blue/5">
             <div className="flex items-center gap-3 mb-4">
               <ShieldAlert className="text-cyber-blue" size={18} />
               <span className="text-xs font-bold uppercase tracking-wider">Security Events</span>
             </div>
             <div className="text-2xl font-bold text-cyber-blue cyber-text-glow">0 Threats</div>
             <div className="text-[8px] font-mono text-white/40 mt-1 uppercase">Filtered by WAF Edge</div>
          </div>
        </div>

        {/* Bottom Panel - Console & Status */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 glass-panel p-4 rounded-xl flex flex-col h-64 overflow-hidden bg-black/40">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-cyber-blue" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Global Deploy Logs</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/20" />
                <div className="w-2 h-2 rounded-full bg-amber-500/20" />
                <div className="w-2 h-2 rounded-full bg-green-500/40" />
              </div>
            </div>
            <div className="flex-1 font-mono text-[10px] space-y-1 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {logs.map((log, i) => (
                  <motion.div
                    key={log}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className={i === 0 ? 'text-cyber-blue border-l-2 border-cyber-blue pl-2' : 'text-white/30 pl-2'}
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CloudLightning size={16} className="text-cyber-blue" />
                <span className="text-[10px] font-mono uppercase tracking-widest">System Health</span>
              </div>
              <div className="space-y-3">
                {[
                  { region: 'US-EAST-1', status: 'Healthy', load: 'low' },
                  { region: 'EU-CENT-1', status: 'Healthy', load: 'mid' },
                  { region: 'AP-SOUTH-1', status: 'Stable', load: 'low' },
                  { region: 'SA-EAST-1', status: 'Healthy', load: 'low' },
                ].map((reg) => (
                  <div key={reg.region} className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/40">{reg.region}</span>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                       <span className="text-[10px] font-mono uppercase">{reg.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full mt-4 py-2 border border-cyber-blue/20 rounded text-[10px] font-mono uppercase text-cyber-blue hover:bg-cyber-blue/10 transition-colors flex items-center justify-center gap-2">
              Deep Diagnostic <ArrowUpRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
