import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useHirePanel } from '../context/HirePanelContext';

export const Navbar = () => {
  const { openHirePanel } = useHirePanel();
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'glass py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-gothic tracking-wider text-primary">Sany</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-primary"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={openHirePanel}
            className="px-5 py-2 md:px-6 md:py-2 rounded-full bg-primary text-slate-900 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-primary transition-all glow-yellow"
          >
            Hire Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export const Hero = () => {
  const { openHirePanel } = useHirePanel();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-dark">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4"
          >
            Creative Designer
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-display font-bold leading-tight mb-8"
          >
            <span className="font-gothic text-primary">Hi, I’m Sany</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-lg mb-12 leading-relaxed"
          >
            I design visuals that sell and stand out. Specializing in minimal, premium, and high-converting digital experiences.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            <button 
              onClick={() => {
                const element = document.querySelector('#work');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-5 rounded-full bg-primary text-slate-900 font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-primary transition-all glow-yellow flex items-center gap-3"
            >
              View Work
            </button>
            <button 
              onClick={openHirePanel}
              className="px-10 py-5 rounded-full bg-primary text-slate-900 font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-primary hover:scale-105 transition-all flex items-center gap-3 glow-yellow"
            >
              Hire Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
