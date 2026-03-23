import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useHirePanel } from '../context/HirePanelContext';
import { useModPacksPanel } from '../context/ModPacksPanelContext';
import { useRobloxDeltaPanel } from '../context/RobloxDeltaPanelContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { openHirePanel } = useHirePanel();
  const { user, login, logout, isAdmin } = useAuth();
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
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 md:px-6 py-3 md:py-4',
        isScrolled ? 'glass py-2 md:py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <span className="text-lg md:text-xl font-display tracking-wider text-primary">Sany</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-8">
          <button
            onClick={toggleTheme}
            className="p-1.5 md:p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-primary"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" />}
          </button>

          <button
            onClick={openHirePanel}
            className="minecraft-btn-primary !py-2 !px-3 md:!py-3 md:!px-4 text-[8px] md:text-[10px]"
          >
            Hire Now
          </button>

          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="text-[8px] md:text-[10px] font-display uppercase tracking-widest text-primary hover:text-white transition-colors"
                >
                  Admin
                </button>
              )}
              <button
                onClick={logout}
                className="text-[8px] md:text-[10px] font-display uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
              >
                Logout
              </button>
              {user.photoURL && (
                <img src={user.photoURL} alt="" className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-primary/20" />
              )}
            </div>
          ) : (
            <button
              onClick={login}
              className="text-[8px] md:text-[10px] font-display uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export const Hero = () => {
  const { openHirePanel } = useHirePanel();
  const { openModPacksPanel } = useModPacksPanel();
  const { openRobloxDeltaPanel } = useRobloxDeltaPanel();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 md:pt-20 overflow-hidden bg-dark">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="max-w-3xl text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-display text-[10px] md:text-xs mb-4 md:mb-6 flex items-center justify-center md:justify-start gap-2"
          >
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary animate-pixel-float"></span>
            Creative Minecraft Designer
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-7xl font-display leading-tight mb-6 md:mb-8"
          >
            <span className="text-primary">Hi, I’m Sany</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs md:text-base text-slate-400 max-w-lg mb-8 md:mb-12 leading-relaxed font-mono mx-auto md:mx-0"
          >
            Building epic visuals in the digital world. Specializing in pixel-perfect, high-converting experiences.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-6"
          >
            <button 
              onClick={() => {
                const element = document.querySelector('#work');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="minecraft-btn-primary text-[8px] md:text-[10px] !py-2 !px-3 md:!py-3 md:!px-4"
            >
              View Work
            </button>
            <button 
              onClick={openModPacksPanel}
              className="minecraft-btn-primary text-[8px] md:text-[10px] !py-2 !px-3 md:!py-3 md:!px-4"
            >
              Minecraft Mod Packs
            </button>
            <button 
              onClick={openRobloxDeltaPanel}
              className="minecraft-btn-primary text-[8px] md:text-[10px] !py-2 !px-3 md:!py-3 md:!px-4"
            >
              Roblox Delta
            </button>
            <button 
              onClick={openHirePanel}
              className="minecraft-btn-secondary text-[8px] md:text-[10px] !py-2 !px-3 md:!py-3 md:!px-4"
            >
              Hire Now
            </button>
          </motion.div>
        </div>

        {/* Character Visual Removed as per user request */}
      </div>
    </section>
  );
};
