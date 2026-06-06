import React from 'react';
import { motion } from 'framer-motion';
import {
  FaStethoscope,
  FaChartLine,
  FaUsers
} from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';

const WhyChoose = () => {
  const pillars = [
    {
      icon: FaStethoscope,
      title: 'We only work with doctors',
      description:
        'Eight years focused on healthcare. We understand your world patient trust, medical ethics, and local reputation.'
    },
    {
      icon: FaChartLine,
      title: 'Real results, not promises',
      description:
        '300% patient growth for some clients. Top 3 Google rankings. 4.8★ average rating across 180+ doctors.'
    },
    {
      icon: FaUsers,
      title: 'Everything in one place',
      description:
        'SEO, ads, websites, social media, podcasts we handle it all. You get a unified brand without the headache.'
    }
  ];

  const floatAnimation = {
    y: [0, -6, 0],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="why" className="relative py-20 md:py-28 lg:py-32 bg-[#111827] overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-900/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-secondary-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Why Trust AlGrowthexa"
          subtitle="We’ve spent years learning what works for doctors – so you don’t have to."
          theme="dark"
        />

        {/* Three pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 max-w-6xl mx-auto"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative h-full"
              >
                <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 h-full border border-neutral-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                  <motion.div
                    animate={floatAnimation}
                    className="inline-block mb-5"
                  >
                    <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm">
                      <Icon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                  </motion.div>

                  <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3 leading-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                    {pillar.description}
                  </p>

                  <motion.div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
