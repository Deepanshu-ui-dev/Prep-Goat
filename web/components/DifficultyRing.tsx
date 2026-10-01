"use client";

import { motion } from "framer-motion";

interface DifficultyRingProps {
  label: string;
  solved: number;
  total: number;
  color: string;
}

export function DifficultyRing({
  label,
  solved,
  total,
  color,
}: DifficultyRingProps) {
  // Prevent NaN when total is 0
  const pct = total > 0 ? Math.min(1, Math.max(0, solved / total)) : 0;
  const r = 40;
  const c = 2 * Math.PI * r;

  // Sanitize label for valid SVG filter ID selector
  const filterId = `glow-${label.toLowerCase().replace(/[^a-z0-9]/g, "")}`;

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg
          width="112"
          height="112"
          viewBox="0 0 100 100"
          className="overflow-visible"
        >
          <defs>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circle track */}
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="7"
          />

          {/* Active progress arc */}
          <motion.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * (1 - pct) }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            filter={`url(#${filterId})`}
          />

          {/* Numeric indicators with centered baseline */}
          <text
            x="50"
            y="44"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-white text-[17px] font-mono font-bold tracking-tight"
          >
            {solved}
          </text>
          <text
            x="50"
            y="60"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-white/40 text-[9px] font-mono"
          >
            /{total}
          </text>
        </svg>
      </div>

      <div className="flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="font-mono text-xs font-medium text-white/70">
          {label}
        </span>
      </div>
    </div>
  );
}