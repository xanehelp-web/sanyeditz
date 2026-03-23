import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface Employee {
  id: string;
  name: string;
  role: string;
  info: string;
  avatar?: string;
  whatsapp: string;
  isOwner?: boolean;
}

const EMPLOYEES: Employee[] = [
  {
    id: 'sany',
    name: 'Sany',
    role: 'Owner',
    info: 'Professional Designer',
    whatsapp: 'https://wa.me/8801881081707?text=Hello%20Sany%20I%20want%20to%20hire%20you',
    isOwner: true,
  }
];

interface HirePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HirePanel = ({ isOpen, onClose }: HirePanelProps) => {
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
            <div className="p-6 border-b-4 border-black flex items-center justify-between">
              <h2 className="text-2xl font-display text-foreground">
                Hire <span className="text-primary">Team</span>
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
                Select a team member to discuss your project requirements.
              </p>

              <div className="space-y-4">
                {EMPLOYEES.map((employee, index) => (
                  <motion.div
                    key={employee.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className={cn(
                      "group relative p-5 minecraft-border transition-all duration-300",
                      employee.isOwner 
                        ? "bg-primary/5 border-primary/30" 
                        : "bg-white/5 border-white/10"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-16 h-16 minecraft-border bg-dark flex items-center justify-center overflow-hidden shrink-0">
                        {employee.avatar ? (
                          <img 
                            src={employee.avatar} 
                            alt={employee.name} 
                            className="w-full h-full object-cover pixelated"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <User className="w-8 h-8 text-slate-500" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-foreground font-display text-xs truncate">{employee.name}</h3>
                          {employee.isOwner && (
                            <span className="px-2 py-0.5 minecraft-border bg-dark/50 text-primary text-[8px] font-display uppercase tracking-normal">
                              Owner
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-[10px] font-mono truncate">{employee.info}</p>
                      </div>

                      {/* Hire Button */}
                      <motion.a
                        href={employee.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 minecraft-border bg-primary text-slate-900 flex items-center justify-center transition-all shrink-0 hover:brightness-110"
                      >
                        <MessageCircle className="w-6 h-6 fill-current" />
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t-4 border-black">
              <p className="text-[10px] text-slate-500 text-center uppercase tracking-normal font-display">
                Professional Design Services • 24/7 Support
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
