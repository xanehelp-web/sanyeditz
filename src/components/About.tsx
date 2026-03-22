import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { Sparkles, Award, Target, Zap, Palette, Layout, Video, Target as TargetIcon } from 'lucide-react';

export const About = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'Target': return <TargetIcon className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <section id="about" className="py-24 px-6 bg-dark">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">About Me</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Creative <span className="text-primary">Designer</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Hi, I’m Sany. I’m a professional creative designer dedicated to crafting visuals that don’t just look good but drive results. With a focus on modern aesthetics and clean UI, I help brands stand out in the digital space.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            My approach is minimal, premium, and always focused on the client's conversion goals. Whether it's a logo, a mobile app, or social media content, I bring a strategic eye to every project.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface p-6 rounded-3xl border border-border"
        >
          <h3 className="text-xl font-display font-bold mb-6 text-foreground">Technical Skills</h3>
          <div className="grid grid-cols-2 gap-4">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center gap-3 p-4 glass border border-border rounded-xl hover:border-primary transition-colors group">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {getIcon(skill.icon)}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-center text-slate-400 group-hover:text-foreground transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
