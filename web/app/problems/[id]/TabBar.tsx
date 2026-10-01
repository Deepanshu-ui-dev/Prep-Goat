'use client';

import { useState } from 'react';

type Tab = 'problem' | 'history';

interface TabBarProps {
  active: Tab;
  onChange: (t: Tab) => void;
}

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div className="flex gap-1 p-1 glass-card rounded-xl w-fit mb-8">
      {(['problem', 'history'] as Tab[]).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${active === tab
              ? 'btn-luminous text-white shadow-md'
              : 'text-white/40 hover:text-white/75'
            }`}
        >
          {tab === 'problem' ? 'Problem' : 'My History'}
        </button>
      ))}
    </div>
  );
}