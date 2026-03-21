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
            className="fixed top-0 right-0 z-[101] h-full w-full max-w-md bg-dark border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Hire <span className="text-primary">Team</span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-surface text-slate-400 hover:text-foreground transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <p className="text-slate-400 text-sm">
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
                      "group relative p-5 rounded-2xl border transition-all duration-300",
                      employee.isOwner 
                        ? "bg-primary/5 border-primary/30 shadow-[0_0_20px_rgba(255,215,0,0.05)]" 
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-dark border border-border flex items-center justify-center overflow-hidden shrink-0">
                        {employee.avatar ? (
                          <img 
                            src={employee.avatar} 
                            alt={employee.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <User className="w-8 h-8 text-slate-500" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-foreground font-bold truncate">{employee.name}</h3>
                          {employee.isOwner && (
                            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">
                              Owner
                            </span>
                          )}
                        </div>
                        <p className="text-primary text-xs font-medium mb-1">{employee.role}</p>
                        <p className="text-slate-400 text-[10px] truncate">{employee.info}</p>
                      </div>

                      {/* Hire Button */}
                      <motion.a
                        href={employee.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-primary text-slate-900 flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-all shrink-0"
                      >
                        <MessageCircle className="w-6 h-6 fill-current" />
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">
                Professional Design Services • 24/7 Support
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
