import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, Facebook, Twitter, Instagram, Linkedin, Send, Sparkles, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';

export const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const onSubmit = async (data: any) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form Data:', data);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const onError = () => {
    triggerShake();
  };

  const contactLinks = [
    { icon: Mail, href: 'mailto:xanehelp@gmail.com', label: 'Email', value: 'xanehelp@gmail.com' },
    { icon: Phone, href: 'tel:+8801881081707', label: 'Phone', value: '+880 1881 081707' },
    { icon: MessageSquare, href: 'https://wa.me/8801881081707?text=Hello%20Sany%20I%20want%20to%20hire%20you%20for%20a%20design%20project', label: 'WhatsApp', value: 'Chat with me' },
    { icon: Facebook, href: 'https://www.facebook.com/One.sAnY', label: 'Facebook', value: 'Follow me' },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Contact</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Let’s <span className="text-primary">Connect</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12">
              Ready to start your next project? Feel free to reach out through any of these platforms or use the contact form.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : undefined}
                  rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/20 transition-all group"
                >
                  <link.icon className="w-6 h-6 text-primary mb-4" />
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">{link.label}</p>
                  <p className="text-foreground font-bold text-sm group-hover:text-primary transition-colors">{link.value}</p>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={isShaking ? { duration: 0.4 } : { duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-surface p-10 rounded-[2rem] border border-border"
          >
            <h3 className="text-2xl font-display font-bold mb-8 text-foreground">Send a Message</h3>
            
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Name</label>
                <input 
                  {...register('name', { required: true })}
                  className="w-full bg-surface border border-border rounded-xl px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your Name"
                />
                {errors.name && <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-2">Required</span>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Email</label>
                <input 
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className="w-full bg-surface border border-border rounded-xl px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-2">Invalid Email</span>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Message</label>
                <textarea 
                  {...register('message', { required: true })}
                  rows={4}
                  className="w-full bg-surface border border-border rounded-xl px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Your Message"
                />
                {errors.message && <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-2">Required</span>}
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-primary text-slate-900 font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-primary transition-all glow-yellow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <AnimatePresence>
                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-primary text-center text-xs font-bold uppercase tracking-widest mt-4"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-dark border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-2xl font-display font-black text-foreground tracking-tighter">
          SanY <span className="text-primary">EDITZ</span>
        </div>
        
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">
          © 2026 Sany Editz. All Rights Reserved. <br className="md:hidden" /> 
          <span className="text-primary ml-2">Designed for the Future.</span>
        </div>

        <div className="flex gap-8">
          <Link to="/privacy" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
            Terms & Conditions
          </Link>
          <Link to="/cookies" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
            Cookies Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};
