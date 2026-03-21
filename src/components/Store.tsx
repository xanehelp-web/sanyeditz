import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Layout, FileCode, ArrowRight } from 'lucide-react';
import { DIGITAL_PRODUCTS } from '../constants';
import { cn } from '../lib/utils';

export const Store = () => {
  return (
    <section id="store" className="py-24 px-6 bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20 -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass neon-border text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-6"
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Digital Assets & Resources</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-display font-black mb-6">
            Sell Your <span className="text-gradient">Work</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium">
            Premium design assets, UI kits, and templates crafted to accelerate your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {DIGITAL_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass rounded-[2.5rem] p-8 neon-border hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              <div className="aspect-square rounded-3xl overflow-hidden mb-8 relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full text-xs font-black text-primary glow-yellow">
                  ${product.price}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                  {product.category === 'Thumbnail Pack' && <Package className="w-3 h-3" />}
                  {product.category === 'UI Kit' && <Layout className="w-3 h-3" />}
                  {product.category === 'Template' && <FileCode className="w-3 h-3" />}
                  {product.category}
                </div>
                <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white">{product.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                  {product.description}
                </p>
                
                <div className="pt-4 flex gap-4">
                  <button className="flex-1 py-4 rounded-2xl bg-primary text-slate-900 font-black uppercase tracking-widest hover:bg-slate-900 hover:text-primary transition-all glow-yellow flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </button>
                  <button className="w-14 h-14 rounded-2xl glass neon-border flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm group">
            View All Products <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </div>
    </section>
  );
};
