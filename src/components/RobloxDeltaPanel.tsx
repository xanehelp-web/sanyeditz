import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Shield, Rocket, Download, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface RobloxDeltaFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const DELTA_FEATURES: RobloxDeltaFeature[] = [
  {
    id: 'fast-execution',
    name: 'Fast Execution',
    description: 'Lightning-fast script execution for the best Roblox experience.',
    icon: <Zap className="w-5 h-5 text-primary" />,
  },
  {
    id: 'anti-ban',
    name: 'Anti-Ban Shield',
    description: 'Advanced protection to keep your account safe while playing.',
    icon: <Shield className="w-5 h-5 text-primary" />,
  },
  {
    id: 'optimized',
    name: 'Optimized Performance',
    description: 'Low resource usage, ensuring smooth gameplay on all devices.',
    icon: <Rocket className="w-5 h-5 text-primary" />,
  }
];

interface RobloxDeltaPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RobloxDeltaPanel = ({ isOpen, onClose }: RobloxDeltaPanelProps) => {
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
            className="fixed top-0 right-0 z-[101] h-full w-full md:max-w-md bg-dark minecraft-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b-4 border-black flex items-center justify-between bg-primary/5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-primary text-dark text-[8px] font-display uppercase animate-pulse">New Version</span>
                  <span className="text-[10px] font-mono text-primary/60">v2.6.4</span>
                </div>
                <h2 className="text-2xl font-display text-foreground">
                  Roblox <span className="text-primary">Delta</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 minecraft-border text-slate-400 hover:text-foreground transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between p-3 minecraft-border bg-white/5 border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-display uppercase text-emerald-500">Status: Undetected</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Last Updated: Today</span>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1">
                  <Sparkles className="w-4 h-4 text-primary/30" />
                </div>
                <p className="text-primary text-xs font-mono leading-relaxed relative z-10">
                  The most powerful mobile & PC executor has been upgraded. Experience 100% stability with the latest Roblox engine.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-foreground font-display text-xs uppercase tracking-wider">Latest Features</h3>
                  <span className="text-[8px] font-mono text-primary">Optimized for 2026</span>
                </div>
                {DELTA_FEATURES.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="p-4 minecraft-border bg-white/5 border-white/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-foreground font-display text-[10px] mb-1">{feature.name}</h4>
                        <p className="text-slate-400 text-[10px] font-mono leading-tight">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4">
                <a 
                  href="https://delta-executor.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full minecraft-btn-primary flex items-center justify-center gap-2 no-underline"
                >
                  <Download className="w-4 h-4" />
                  Download Delta Now
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t-4 border-black">
              <p className="text-[10px] text-slate-500 text-center uppercase tracking-normal font-display">
                Roblox Delta • Premium Executor • 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
