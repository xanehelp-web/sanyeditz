import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ExternalLink, ShoppingCart, Filter, CreditCard, ArrowRight, Star, Sparkles, Copy, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../constants';
import { cn } from '../lib/utils';
import { SEO } from './SEO';
import { useHirePanel } from '../context/HirePanelContext';

const ProjectCard = ({ item, onClick }: { item: typeof PORTFOLIO_ITEMS[0], onClick: () => void, key?: React.Key }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      onClick={onClick}
      className="relative aspect-square overflow-hidden cursor-pointer group minecraft-border transition-all duration-500"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pixelated"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary text-[8px] font-display uppercase tracking-normal">
              {item.category}
            </span>
            {item.featured && (
              <Star className="w-3 h-3 text-primary fill-primary glow-yellow" />
            )}
          </div>
          <h3 className="text-lg font-display text-white leading-tight mb-4">
            {item.title}
          </h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-white text-[8px] font-display uppercase tracking-normal flex items-center gap-2">
              View Project <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Portfolio = () => {
  const { openHirePanel } = useHirePanel();
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<typeof PORTFOLIO_ITEMS[0] | null>(null);

  const categories = ['All', 'Logo Design', 'UI/UX', 'Thumbnails', 'Social Media'];
  
  const filteredItems = filter === 'All' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1
      }
    }
  };

  return (
    <section id="work" className="py-32 bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-primary font-display uppercase tracking-normal text-[10px] mb-4">
              <Sparkles className="w-3 h-3" />
              Showcase
            </div>
            <h2 className="text-3xl md:text-5xl font-display text-foreground leading-none">
              Selected <span className="text-gradient">Work</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "minecraft-btn",
                  filter === cat 
                    ? "bg-primary text-slate-900" 
                    : "bg-surface text-slate-400 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredItems.map((item) => (
                <ProjectCard 
                  key={item.id}
                  item={item} 
                  onClick={() => setSelectedItem(item)} 
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <SEO 
              title={`${selectedItem.title} | Portfolio`}
              description={selectedItem.description}
              image={selectedItem.image}
              url={`https://sany-portfolio.com/work/${selectedItem.id}`}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-dark minecraft-border overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-8 right-8 z-20 w-12 h-12 minecraft-border flex items-center justify-center text-foreground hover:bg-surface transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-3/5 h-[40vh] md:h-auto relative overflow-hidden">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover pixelated"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent md:bg-gradient-to-r" />
              </div>
              
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-dark">
                <div className="space-y-8">
                  <div>
                    <span className="text-primary text-[10px] font-display uppercase tracking-normal mb-4 block">
                      {selectedItem.category}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-display text-foreground leading-tight mb-6">
                      {selectedItem.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-mono leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-foreground text-[10px] font-display uppercase tracking-normal mb-4">Tools & Tech</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tools.map(tool => (
                        <span key={tool} className="px-4 py-2 minecraft-border text-[8px] font-display uppercase tracking-normal text-slate-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 flex flex-wrap gap-4">
                    <button 
                      onClick={() => {
                        setSelectedItem(null);
                        openHirePanel();
                      }}
                      className="minecraft-btn-primary flex items-center gap-3"
                    >
                      Hire Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
