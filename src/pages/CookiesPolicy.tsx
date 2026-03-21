import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cookie, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const PolicyPage = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dark py-24 px-6">
      <SEO 
        title={`${title} | Sany Editz`} 
        description={`Read the ${title} for Sany's portfolio and design services.`}
        url={`https://sany-portfolio.com/${title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
      />
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-12 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-[2.5rem] p-8 md:p-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold">{title}</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-slate-400 leading-relaxed">
            {children}
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em]">
            © 2026 Sany Editz. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export const CookiesPolicy = () => (
  <PolicyPage title="Cookies Policy" icon={Cookie}>
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Cookies Policy for Sany Portfolio</h2>
      <p>
        This Cookies Policy explains how we use cookies and similar technologies to improve your experience on our website.
      </p>
    </section>

    <section>
      <h3 className="text-lg font-bold text-foreground mb-3">What Are Cookies?</h3>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help the website recognize your device and remember certain information about your visit, such as your preferences and settings.
      </p>
    </section>

    <section>
      <h3 className="text-lg font-bold text-foreground mb-3">How We Use Cookies</h3>
      <p>We use cookies for the following purposes:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>To improve website performance and ensure a smooth browsing experience.</li>
        <li>To understand user behavior and analyze how visitors interact with our site.</li>
        <li>To enhance user experience by remembering your preferences.</li>
        <li>To provide personalized content and relevant advertisements.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-bold text-foreground mb-3">Your Control</h3>
      <p>
        You have the right to control and manage cookies. Most web browsers allow you to disable or delete cookies through their settings. Please note that disabling cookies may affect the functionality of certain parts of our website.
      </p>
    </section>

    <section>
      <h3 className="text-lg font-bold text-foreground mb-3">Contact Information</h3>
      <p>If you have any questions about our use of cookies, please contact us:</p>
      <div className="mt-4 p-6 rounded-2xl bg-surface border border-border">
        <p className="font-bold text-foreground mb-1">Email:</p>
        <p className="mb-4">xanehelp@gmail.com</p>
        <p className="font-bold text-foreground mb-1">WhatsApp:</p>
        <p>https://wa.me/8801881081707</p>
      </div>
    </section>
  </PolicyPage>
);
