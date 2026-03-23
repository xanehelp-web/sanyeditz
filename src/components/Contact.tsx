import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, Facebook, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
    try {
      await addDoc(collection(db, 'messages'), {
        ...data,
        createdAt: serverTimestamp(),
      });

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Form Submission Error:', error);
      alert('Something went wrong. Please try again later.');
      triggerShake();
    }
  };

  const onError = () => {
    triggerShake();
  };

  const contactLinks = [
    { icon: Mail, href: 'mailto:xanehelp@gmail.com', label: 'Email', value: 'xanehelp@gmail.com' },
    { icon: Phone, href: 'tel:+8801881081707', label: 'Phone', value: '+880 1881 081707' },
    { icon: MessageSquare, href: 'https://wa.me/8801881081707?text=Hello%20Sany%20I%20want%20to%20hire%20you%20for%20a%20design%20project', label: 'WhatsApp', value: 'Chat with me' },
    { icon: (props: any) => (
      <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        {...props}
      >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.44-.11 6.89-.13 10.33-.03 2.13-.99 4.26-2.85 5.31-1.56.9-3.47 1.07-5.13.49-2.13-.71-3.77-2.7-3.9-4.95-.2-2.62 1.54-5.22 4.03-6.01.73-.23 1.51-.3 2.27-.24v4.1c-.68-.11-1.41-.01-2.01.34-.8.47-1.16 1.45-.94 2.33.22.85.96 1.53 1.83 1.61.94.09 1.9-.41 2.26-1.28.17-.39.22-.82.22-1.25V0z"/>
      </svg>
    ), href: 'https://www.tiktok.com/@one.sany', label: 'TikTok', value: '@one.sany' },
    { icon: Facebook, href: 'https://www.facebook.com/One.sAnY', label: 'Facebook', value: 'Follow me' },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4">Contact</p>
            <h2 className="text-3xl md:text-6xl font-display font-bold mb-6 md:mb-8">
              Let’s <span className="text-primary">Connect</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-lg mb-8 md:mb-12">
              Ready to start your next project? Feel free to reach out through any of these platforms or use the contact form.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-6">
              {contactLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : undefined}
                  rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="p-4 md:p-6 rounded-2xl bg-surface border border-border hover:border-primary/20 transition-all group"
                >
                  <link.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mb-3 md:mb-4 mx-auto md:mx-0" />
                  <p className="text-slate-500 text-[8px] md:text-[10px] uppercase tracking-widest font-bold mb-1">{link.label}</p>
                  <p className="text-foreground font-bold text-xs md:text-sm group-hover:text-primary transition-colors truncate">{link.value}</p>
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
            className="bg-surface p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-border"
          >
            <h3 className="text-xl md:text-2xl font-display font-bold mb-6 md:mb-8 text-foreground text-center md:text-left">Send a Message</h3>
            
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <label className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Name</label>
                <input 
                  {...register('name', { required: true })}
                  className="w-full bg-surface border border-border rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your Name"
                />
                {errors.name && <span className="text-red-500 text-[8px] md:text-[10px] font-bold uppercase tracking-widest ml-2">Required</span>}
              </div>

              <div className="space-y-2">
                <label className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Email</label>
                <input 
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className="w-full bg-surface border border-border rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && <span className="text-red-500 text-[8px] md:text-[10px] font-bold uppercase tracking-widest ml-2">Invalid Email</span>}
              </div>

              <div className="space-y-2">
                <label className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Message</label>
                <textarea 
                  {...register('message', { required: true })}
                  rows={4}
                  className="w-full bg-surface border border-border rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Your Message"
                />
                {errors.message && <span className="text-red-500 text-[8px] md:text-[10px] font-bold uppercase tracking-widest ml-2">Required</span>}
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full py-3 md:py-4 rounded-xl bg-primary text-slate-900 font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-primary transition-all glow-yellow flex items-center justify-center gap-2 disabled:opacity-50 text-xs md:text-sm"
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
