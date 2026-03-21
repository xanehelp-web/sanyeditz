import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Quote, ArrowRight, Zap, Shield, Sparkles, CreditCard } from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../constants';
import { cn } from '../lib/utils';
import { useHirePanel } from '../context/HirePanelContext';

export const Services = () => {
  const { openHirePanel } = useHirePanel();

  return (
    <section id="services" className="py-24 px-6 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Pricing</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Design <span className="text-primary">Services</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Choose a plan that fits your needs. All plans include high-quality deliverables and professional support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-white/5 rounded-3xl p-10 border border-slate-200 dark:border-white/10 flex flex-col h-full transition-all hover:border-primary/30"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-foreground mb-2">{service.tier}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{service.description}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-display font-bold text-primary">{service.price}</span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">/ Project</span>
                </div>
                <div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-widest">
                  <Zap className="w-3 h-3" />
                  Delivery: {service.delivery}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <motion.button 
                  onClick={openHirePanel}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full py-4 rounded-xl font-bold uppercase tracking-widest text-center transition-all overflow-hidden group/btn bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-primary hover:text-slate-900"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Hire Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-border" />
            Fast response • Professional work • 100% client satisfaction
            <span className="w-8 h-[1px] bg-border" />
          </p>
        </div>
      </div>
    </section>
  );
};
