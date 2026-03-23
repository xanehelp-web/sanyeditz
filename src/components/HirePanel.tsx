import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, User, Shield, Zap, Star, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface Employee {
  id: string;
  name: string;
  role: string;
  info: string;
  avatar?: string;
  whatsapp: string;
  isOwner?: boolean;
  status?: 'online' | 'busy' | 'offline';
  specialties: string[];
}

const EMPLOYEES: Employee[] = [
  {
    id: 'sany',
    name: 'Sany',
    role: 'Owner & Lead Designer',
    info: 'Visionary behind SanY EDITZ. 5+ years of Minecraft design expertise.',
    whatsapp: 'https://wa.me/8801881081707?text=Hello%20Sany%20I%20want%20to%20hire%20you',
    isOwner: true,
    status: 'online',
    specialties: ['UI/UX', 'Branding', 'Motion Graphics'],
    avatar: 'https://picsum.photos/seed/sany/200/200'
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
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: "spring",
              damping: 28,
              stiffness: 200,
              mass: 1
            }}
            className="fixed top-0 right-0 z-[101] h-full w-full md:max-w-lg bg-dark border-l-4 border-black shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            </div>

            {/* Header */}
            <div className="relative p-8 border-b-4 border-black bg-dark/50 backdrop-blur-xl flex items-center justify-between">
              <div className="space-y-1">
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 text-primary font-display text-[10px] tracking-widest uppercase"
                >
                  <Shield className="w-3 h-3" />
                  Verified Team
                </motion.div>
                <h2 className="text-3xl font-display text-foreground tracking-tight">
                  Hire <span className="text-primary">Experts</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="group p-3 minecraft-border bg-dark hover:bg-primary transition-all duration-300"
              >
                <X className="w-6 h-6 text-slate-400 group-hover:text-dark transition-colors" />
              </button>
            </div>

            {/* Content */}
            <div className="relative flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              <div className="space-y-2">
                <p className="text-slate-400 text-xs font-mono leading-relaxed">
                  Connect directly with our elite designers via WhatsApp for instant consultation and project booking.
                </p>
                <div className="h-1 w-12 bg-primary/30" />
              </div>

              <div className="space-y-6">
                {EMPLOYEES.map((employee, index) => (
                  <motion.div
                    key={employee.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className={cn(
                      "group relative p-6 minecraft-border transition-all duration-500 overflow-hidden",
                      employee.isOwner 
                        ? "bg-primary/5 border-primary/40 hover:border-primary" 
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    )}
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative flex flex-col gap-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-5">
                          {/* Avatar Container */}
                          <div className="relative">
                            <div className="w-20 h-20 minecraft-border bg-dark p-1 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                              {employee.avatar ? (
                                <img 
                                  src={employee.avatar} 
                                  alt={employee.name} 
                                  className="w-full h-full object-cover pixelated grayscale group-hover:grayscale-0 transition-all duration-500"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <User className="w-10 h-10 text-slate-500" />
                              )}
                            </div>
                            {/* Status Indicator */}
                            <div className={cn(
                              "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-dark flex items-center justify-center",
                              employee.status === 'online' ? "bg-green-500" : 
                              employee.status === 'busy' ? "bg-yellow-500" : "bg-slate-500"
                            )}>
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-display text-foreground group-hover:text-primary transition-colors">
                                {employee.name}
                              </h3>
                              {employee.isOwner && (
                                <Star className="w-4 h-4 text-primary fill-primary animate-pulse" />
                              )}
                            </div>
                            <p className="text-primary/70 text-[10px] font-display uppercase tracking-wider">
                              {employee.role}
                            </p>
                            <div className="flex items-center gap-1 text-green-500 text-[8px] font-mono uppercase">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              Available Now
                            </div>
                          </div>
                        </div>

                        <motion.a
                          href={employee.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center gap-2 group/btn"
                        >
                          <div className="w-14 h-14 minecraft-border bg-primary text-dark flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] group-hover/btn:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all">
                            <MessageCircle className="w-7 h-7 fill-current" />
                          </div>
                          <span className="text-[8px] font-display uppercase tracking-widest text-primary opacity-0 group-hover/btn:opacity-100 transition-opacity">
                            Chat
                          </span>
                        </motion.a>
                      </div>

                      <div className="space-y-4">
                        <p className="text-slate-400 text-xs font-mono leading-relaxed italic">
                          "{employee.info}"
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {employee.specialties.map(spec => (
                            <span key={spec} className="px-3 py-1 bg-dark/80 border border-white/10 text-slate-300 text-[8px] font-mono uppercase tracking-wider rounded-sm group-hover:border-primary/30 transition-colors">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white/5 border border-white/5 rounded-sm flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <div className="space-y-0.5">
                    <p className="text-white text-[10px] font-display uppercase">Fast Delivery</p>
                    <p className="text-slate-500 text-[8px] font-mono">24-48h Turnaround</p>
                  </div>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-sm flex items-center gap-3">
                  <Star className="w-5 h-5 text-primary" />
                  <div className="space-y-0.5">
                    <p className="text-white text-[10px] font-display uppercase">Top Rated</p>
                    <p className="text-slate-500 text-[8px] font-mono">100+ Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative p-8 border-t-4 border-black bg-dark/80 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[8px] text-slate-500 font-display uppercase tracking-[0.2em]">
                  SanY Editz Official Team
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-1 h-1 bg-primary/30 rounded-full" />
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-400 text-center font-mono italic">
                "Quality is not an act, it is a habit."
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
