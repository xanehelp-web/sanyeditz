import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface ModPack {
  id: string;
  name: string;
  version: string;
  description: string;
  image?: string;
  downloadUrl: string;
  downloads?: string;
  created?: string;
  updated?: string;
  projectId?: string;
  license?: string;
}

const MOD_PACKS: ModPack[] = [
  {
    id: 'x-ray-pack',
    name: 'X-Ray Mod Pack',
    version: 'v2.1.0',
    description: 'The ultimate X-Ray resource pack for finding ores instantly. Works on all versions.',
    downloadUrl: 'https://www.curseforge.com/minecraft/mc-mods/x-ray-bc',
    downloads: '109,481',
    created: '2 months ago',
    updated: '1 month ago',
    projectId: '1414354',
    license: 'MT License',
  },
  {
    id: 'tech-world',
    name: 'Tech World Mod',
    version: 'v2.0.5',
    description: 'Advanced machinery and automation for your Minecraft world.',
    downloadUrl: 'https://www.curseforge.com/minecraft/modpacks/create-perfect-world',
    downloads: '50,000+',
    created: '6 months ago',
    updated: '2 weeks ago',
    projectId: '882341',
    license: 'MIT License',
  },
  {
    id: 'magic-realms',
    name: 'Magic Realms',
    version: 'v1.0.1',
    description: 'Explore ancient spells and mythical creatures in this magic pack.',
    downloadUrl: 'https://www.curseforge.com/minecraft/modpacks/roguelike-adventures-and-dungeons',
    downloads: '25,000+',
    created: '1 year ago',
    updated: '3 months ago',
    projectId: '773129',
    license: 'Custom License',
  }
];

interface ModPacksPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModPacksPanel = ({ isOpen, onClose }: ModPacksPanelProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[101] h-full w-full max-w-md bg-dark minecraft-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b-4 border-black flex items-center justify-between">
              <h2 className="text-2xl font-display text-foreground">
                Minecraft <span className="text-primary">Mod Packs</span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 minecraft-border text-slate-400 hover:text-foreground transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <p className="text-slate-400 text-xs font-mono">
                Explore my custom Minecraft mod packs. Select one to see details or download.
              </p>
              
              <div className="space-y-4">
                {MOD_PACKS.map((pack, index) => (
                  <motion.div
                    key={pack.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="group relative p-5 minecraft-border bg-white/5 border-white/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      {/* Pack Icon Placeholder */}
                      <div className="w-16 h-16 minecraft-border bg-dark flex items-center justify-center overflow-hidden shrink-0">
                        <div className="w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-foreground font-display text-xs truncate">{pack.name}</h3>
                          <span className="text-primary text-[8px] font-mono">{pack.version}</span>
                        </div>
                        <p className="text-slate-400 text-[10px] font-mono line-clamp-2 mb-3">
                          {pack.description}
                        </p>

                        {/* Additional Details */}
                        <div className="grid grid-cols-2 gap-2 mb-4 p-2 bg-black/20 border border-white/5 rounded">
                          <div className="space-y-1">
                            <p className="text-[8px] text-slate-500 uppercase font-display">Downloads</p>
                            <p className="text-[10px] text-primary font-mono">{pack.downloads}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[8px] text-slate-500 uppercase font-display">License</p>
                            <p className="text-[10px] text-primary font-mono">{pack.license}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[8px] text-slate-500 uppercase font-display">Created</p>
                            <p className="text-[10px] text-slate-300 font-mono">{pack.created}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[8px] text-slate-500 uppercase font-display">Updated</p>
                            <p className="text-[10px] text-slate-300 font-mono">{pack.updated}</p>
                          </div>
                          <div className="col-span-2 pt-1 border-t border-white/5">
                            <p className="text-[8px] text-slate-500 uppercase font-display">Project ID: <span className="text-slate-300 font-mono lowercase">{pack.projectId}</span></p>
                          </div>
                        </div>
                        
                        <a 
                          href={pack.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full minecraft-btn-primary block text-center no-underline"
                        >
                          Download Now
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t-4 border-black">
              <p className="text-[10px] text-slate-500 text-center uppercase tracking-normal font-display">
                Custom Mod Packs • High Quality • 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
