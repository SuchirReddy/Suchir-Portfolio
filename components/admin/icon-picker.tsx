"use client";

import { useState } from "react";
import { 
  Code2, Terminal, Database, Palette, Layers, Cpu, Globe, Server, 
  Wrench, FileJson, Layout, PenTool, Smartphone, Cloud, Zap, Settings,
  LucideIcon
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Code2, Terminal, Database, Palette, Layers, Cpu, Globe, Server, 
  Wrench, FileJson, Layout, PenTool, Smartphone, Cloud, Zap, Settings
};

export function IconPicker({ name = "icon", defaultValue = "Code2" }: { name?: string, defaultValue?: string }) {
  // Fallback to Code2 if the database has an icon not in our list
  const [selected, setSelected] = useState(ICONS[defaultValue] ? defaultValue : "Code2");

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white/60">Category Icon</label>
      <input type="hidden" name={name} value={selected} />
      <div className="flex flex-wrap gap-2">
        {Object.entries(ICONS).map(([iconName, Icon]) => {
          const isSelected = selected === iconName;
          
          return (
            <button
              key={iconName}
              type="button"
              onClick={() => setSelected(iconName)}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-all ${
                isSelected 
                  ? "border-lime-300 bg-lime-300/10 text-lime-300" 
                  : "border-white/10 bg-white/[0.02] text-white/50 hover:bg-white/10 hover:text-white"
              }`}
              title={iconName}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
