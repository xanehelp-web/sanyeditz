import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { Sparkles, Award, Target, Zap } from 'lucide-react';

export const About = () => {
  const skills = [
    { name: "Photoshop", icon: "P" },
    { name: "Figma", icon: "F" },
    { name: "Illustrator", icon: "I" }
  ];

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
          className="bg-surface p-10 rounded-[2rem] border border-border"
        >
          <h3 className="text-2xl font-display font-bold mb-8 text-foreground">Technical Skills</h3>
          <div className="grid gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-6 p-4 rounded-2xl bg-surface border border-border hover:border-primary/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-slate-900 font-bold text-xl">
                  {skill.icon}
                </div>
                <span className="text-foreground font-bold uppercase tracking-widest text-sm">{skill.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
