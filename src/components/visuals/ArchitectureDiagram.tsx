'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ArchitectureDiagram({ type = 'microservices' }: { type?: 'microservices' | 'security' }) {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Animate lines
        gsap.fromTo('.diagram-line',
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: 2, repeat: -1, ease: "none" }
        );

        // Pulse nodes
        gsap.to('.diagram-node', {
          opacity: 0.6,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          stagger: 0.2
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set('.diagram-line', { strokeDashoffset: 0 });
        gsap.set('.diagram-node', { opacity: 0.8 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [type]);

  if (type === 'security') {
    return (
      <svg ref={containerRef} viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00f2ff" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="150" r="120" fill="none" stroke="#00f2ff" strokeWidth="1" strokeDasharray="10 5" className="opacity-20" />
        <rect x="100" y="50" width="200" height="200" rx="10" fill="url(#shield-grad)" stroke="#00f2ff" strokeWidth="1" className="diagram-node" />
        <rect x="130" y="80" width="140" height="140" rx="10" fill="url(#shield-grad)" stroke="#00f2ff" strokeWidth="1" className="diagram-node" />
        <circle cx="200" cy="150" r="30" fill="#00f2ff" fillOpacity="0.1" stroke="#00f2ff" strokeWidth="2" className="diagram-node" />
        <line x1="200" y1="30" x2="200" y2="120" stroke="#00f2ff" strokeWidth="1" strokeDasharray="5 5" className="diagram-line" />
        <line x1="200" y1="180" x2="200" y2="270" stroke="#00f2ff" strokeWidth="1" strokeDasharray="5 5" className="diagram-line" />
      </svg>
    );
  }

  return (
    <svg ref={containerRef} viewBox="0 0 400 300" className="w-full h-full">
      <circle cx="200" cy="150" r="40" fill="none" stroke="#00f2ff" strokeWidth="2" className="diagram-node" />
      <text x="200" y="155" textAnchor="middle" fill="#00f2ff" fontSize="10" className="font-mono">GATEWAY</text>
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * 90) * (Math.PI / 180);
        const x = 200 + Math.cos(angle) * 100;
        const y = 150 + Math.sin(angle) * 100;
        return (
          <g key={i}>
            <path
              d={`M 200 150 L ${x} ${y}`}
              stroke="#00f2ff"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="diagram-line opacity-30"
              style={{ strokeDashoffset: 100 }}
            />
            <rect
              x={x - 30} y={y - 20}
              width="60" height="40"
              rx="4"
              fill="#00f2ff" fillOpacity="0.05"
              stroke="#00f2ff" strokeWidth="1"
              className="diagram-node"
            />
            <text x={x} y={y + 5} textAnchor="middle" fill="#fff" fillOpacity="0.5" fontSize="8" className="font-mono">SVC-0{i}</text>
          </g>
        );
      })}
    </svg>
  );
}
