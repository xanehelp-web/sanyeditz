import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Quote, ArrowRight, Zap, Shield, Sparkles, CreditCard } from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../constants';
import { cn } from '../lib/utils';
import { useHirePanel } from '../context/HirePanelContext';

export const Services = () => {
  const { openHirePanel } = useHirePanel();

  return (
    <section id="services" className="py-16 md:py-24 px-4 md:px-6 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <p className="text-primary font-display text-[10px] md:text-xs mb-4">Pricing</p>
          <h2 className="text-3xl md:text-6xl font-display mb-4 md:mb-6">
            Design <span className="text-primary">Services</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono text-sm md:text-base">
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
              className="relative bg-surface minecraft-border p-8 flex flex-col h-full transition-all duration-500"
            >
              <div className="mb-8">
                <h3 className="text-xl font-display text-foreground mb-4">{service.tier}</h3>
                <p className="text-slate-400 text-xs font-mono mb-6">{service.description}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-display text-primary">{service.price}</span>
                  <span className="text-slate-500 text-[10px] font-display uppercase tracking-normal">/ Project</span>
                </div>
                <div className="flex items-center gap-2 text-primary text-[10px] font-display uppercase tracking-normal">
                  <Zap className="w-3 h-3" />
                  Delivery: {service.delivery}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-300 text-xs font-mono">
                    <Check className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={openHirePanel}
                  className="minecraft-btn-primary w-full flex items-center justify-center gap-2"
                >
                  Hire Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-500 text-[10px] font-display uppercase tracking-normal flex items-center justify-center gap-4">
            <span className="w-8 h-[4px] bg-border" />
            Fast response • Professional work • 100% client satisfaction
            <span className="w-8 h-[4px] bg-border" />
          </p>
        </div>
      </div>
    </section>
  );
};
