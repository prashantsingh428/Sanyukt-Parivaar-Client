import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaBrain, FaTrophy, FaFire, FaStar } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import { getSectionPath, navigateToSection } from '../../lib/sectionNavigation';

const Founder = () => {
  const [imageError, setImageError] = useState(false);

  const achievements = [
    { icon: FaBrain, label: 'Experience', value: '8+ Years' },
    { icon: FaTrophy, label: 'Doctors Helped', value: '180+' },
    { icon: FaFire, label: 'Projects Done', value: '1600+' },
  ];

  const expertise = [
    'Healthcare Marketing Specialist',
    'Digital Strategy Expert',
    'Brand Building Visionary',
    'Patient Growth Focussed',
  ];

  const founder = {
    name: 'Priyanshu Srivastava',
    title: 'Founder & Growth Strategist',
    image: '/images/founder.jpeg',
    emoji: '👨‍⚕️',
    quote: '"I started AlGrowthexa with a vision to help doctors dominate Google, attract premium patients, and build powerful online presence. Our mission is simple: grow doctors digitally, ethically."',
    established: 'Est. 2016',
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <section
      id="fdr"
      className="relative py-20 md:py-28 lg:py-32 bg-[#111827] overflow-hidden"
    >
      {/* Subtle dark background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Meet Our Founder"
          subtitle="The visionary behind AlGrowthexa's healthcare transformation"
          theme="dark"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section – clean headshot */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="relative"
            >
              <div className="relative w-full max-w-sm mx-auto md:mx-0">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-neutral-800">
                  {imageError ? (
                    <div className="w-full h-full bg-gradient-to-br from-primary-900 to-secondary-900 flex items-center justify-center">
                      <span className="text-7xl">{founder.emoji}</span>
                    </div>
                  ) : (
                    <img
                      src={founder.image}
                      alt={founder.name}
                      onError={handleImageError}
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                </div>

                {/* Minimal badge – stays white for contrast */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-3 right-4 bg-white px-4 py-2 rounded-full shadow-md border border-neutral-200 text-sm font-semibold text-neutral-700"
                >
                  {founder.established}
                </motion.div>
              </div>
            </motion.div>

            {/* Content Section – light text on dark */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {founder.name}
                </h3>
                <p className="text-lg md:text-xl text-primary-400 font-medium">
                  {founder.title}
                </p>
              </div>

              {/* Quote – light text with primary border */}
              <blockquote className="text-base md:text-lg text-neutral-300 leading-relaxed border-l-4 border-primary-400 pl-4 py-1">
                <FaQuoteLeft className="inline-block text-primary-700 mr-1 text-lg" />
                {founder.quote}
              </blockquote>

              {/* Achievements – light values and labels */}
              <div className="grid grid-cols-3 gap-3 py-4">
                {achievements.map((achievement, i) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={i} className="text-center">
                      <Icon className="text-2xl text-primary-400 mx-auto mb-1" />
                      <div className="text-lg font-bold text-white">{achievement.value}</div>
                      <div className="text-xs text-neutral-400">{achievement.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Expertise – dark‑mode tags */}
              <div>
                <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">Core Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA – primary button (unchanged) */}
              <motion.a
                href={getSectionPath('cns')}
                onClick={(event) => navigateToSection(event, 'cns')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block px-8 py-3 bg-primary-600 text-white font-semibold rounded-full shadow-md hover:bg-primary-700 transition-colors"
              >
                Start Your Journey Today
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Founder;
