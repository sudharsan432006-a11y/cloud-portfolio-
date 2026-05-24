'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dataLines, setDataLines] = React.useState<{x1: string, x2: string}[]>([]);

  useEffect(() => {
    // Generate random lines only on client to avoid hydration mismatch
    setDataLines([...Array(10)].map(() => ({
      x1: Math.random() * 100 + "%",
      x2: Math.random() * 100 + "%"
    })));

    const ctx = gsap.context(() => {
      // Animate random pings on the grid
      const pings = document.querySelectorAll('.grid-ping');
      pings.forEach((ping) => {
        gsap.to(ping, {
          opacity: 0.8,
          duration: 0.5,
          repeat: -1,
          repeatDelay: Math.random() * 5 + 2,
          yoyo: true,
          ease: 'power2.inOut'
        });
      });

      // Animate data flow lines
      gsap.to('.data-flow', {
        strokeDashoffset: -100,
        duration: 3,
        repeat: -1,
        ease: 'none',
        stagger: {
          each: 0.5,
          from: 'random'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%" className="w-full h-full">
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="currentColor" className="grid-ping opacity-0" />
            <circle cx="100" cy="0" r="1.5" fill="currentColor" className="grid-ping opacity-0" />
            <circle cx="0" cy="100" r="1.5" fill="currentColor" className="grid-ping opacity-0" />
            <circle cx="100" cy="100" r="1.5" fill="currentColor" className="grid-ping opacity-0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-cyber-blue" />

        {/* Animated Data Flows */}
        {dataLines.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1="0"
            x2={line.x2}
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="10, 90"
            className="data-flow text-cyber-blue opacity-20"
          />
        ))}
      </svg>
    </div>
  );
}
