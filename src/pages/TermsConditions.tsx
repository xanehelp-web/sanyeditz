import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
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

export const TermsConditions = () => (
  <PolicyPage title="Terms & Conditions" icon={FileText}>
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Terms and Conditions for Sany Portfolio</h2>
      <p>
        By using this website and our services, you agree to the following terms and conditions. Please read them carefully.
      </p>
    </section>

    <section>
      <h3 className="text-lg font-bold text-foreground mb-3">Services Provided</h3>
      <p>We provide a range of creative design services, including but not limited to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Logo Design & Branding</li>
        <li>UI/UX Design for Web and Mobile</li>
        <li>Thumbnails, Social Media Graphics, and Digital Illustrations</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-bold text-foreground mb-3">Payments & Project Terms</h3>
      <p>Our project and payment terms are as follows:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Project terms and payment schedules are agreed upon individually for each project.</li>
        <li>Payments are typically handled via direct transfer or other agreed-upon methods.</li>
        <li>Once work has commenced on a project, no refunds will be issued unless otherwise agreed upon in writing.</li>
        <li>We reserve the right to pause or terminate services if agreed-upon milestones or payments are not met.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-bold text-foreground mb-3">User Responsibility</h3>
      <p>As a user of this website, you agree not to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Misuse the website or its content for any illegal or unauthorized purpose.</li>
        <li>Copy, reproduce, or steal any designs, images, or text from this website without explicit written permission.</li>
        <li>Attempt to disrupt the website's functionality or security.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-bold text-foreground mb-3">Intellectual Property</h3>
      <p>
        All designs, concepts, and creative work remain the intellectual property of Sany until full payment is completed. Upon receipt of full payment, the client is granted ownership rights as specified in the project agreement.
      </p>
    </section>

    <section>
      <h3 className="text-lg font-bold text-foreground mb-3">Contact Information</h3>
      <p>For any issues or questions regarding these terms, please reach out to us:</p>
      <div className="mt-4 p-6 rounded-2xl bg-surface border border-border">
        <p className="font-bold text-foreground mb-1">Email:</p>
        <p className="mb-4">xanehelp@gmail.com</p>
        <p className="font-bold text-foreground mb-1">WhatsApp:</p>
        <p>https://wa.me/8801881081707</p>
      </div>
    </section>
  </PolicyPage>
);
