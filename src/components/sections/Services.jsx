import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaGoogle, FaFacebook } from 'react-icons/fa';
import {
  CodeBracketIcon,
  MagnifyingGlassIcon,
  ShareIcon,
  DevicePhoneMobileIcon,
  PaintBrushIcon,
  PencilIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';
import SectionHeading from '../common/SectionHeading';
import { getSectionPath, navigateToSection } from '../../lib/sectionNavigation';

// Services data (unchanged)
const services = [
  {
    title: 'Website Development',
    description: 'Clinic Websites',
    benefit: 'Responsive, patient‑friendly, and SEO‑optimized',
    icon: CodeBracketIcon
  },
  {
    title: 'SEO for Doctors',
    description: 'Rank #1 on Google',
    benefit: 'Dominate local search results',
    icon: MagnifyingGlassIcon
  },
  {
    title: 'Social Media Optimization',
    description: 'SMO',
    benefit: 'Engage and grow your patient community',
    icon: ShareIcon
  },
  {
    title: 'Google Ads',
    description: 'High Intent Patients',
    benefit: 'Attract high‑intent patients instantly',
    icon: FaGoogle
  },
  {
    title: 'Meta Ads',
    description: 'FB + Instagram',
    benefit: 'Targeted campaigns on Facebook & Instagram',
    icon: FaFacebook
  },
  {
    title: 'App Development',
    description: 'Doctor/Appointment Apps',
    benefit: 'Seamless appointment booking at their fingertips',
    icon: DevicePhoneMobileIcon
  },
  {
    title: 'Graphic Posts',
    description: 'Medical Branding',
    benefit: 'Visually compelling medical branding',
    icon: PaintBrushIcon
  },
  {
    title: 'Content Creation',
    description: 'Reels, Blogs, Articles',
    benefit: 'Educational content that builds trust',
    icon: PencilIcon
  },
  {
    title: 'Podcast Production',
    description: 'Doctor Authority Building',
    benefit: 'Establish thought leadership in healthcare',
    icon: MicrophoneIcon
  }
];

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedServices = showAll ? services : services.slice(0, 6);

  // Subtle hover animation for icons
  const iconHoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section
      id="svc"
      className="relative py-20 md:py-28 lg:py-32 bg-gray-50 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-30" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Services We Serve for Doctors"
          subtitle="Comprehensive digital marketing solutions tailored for healthcare professionals"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
        >
          <AnimatePresence>
            {displayedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 20 }}
                  whileHover={{ y: -4 }}
                  className="group relative h-full"
                >
                  <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-7 h-full border border-gray-100">
                    {/* Icon with consistent primary color */}
                    <motion.div
                      variants={iconHoverVariants}
                      whileHover="hover"
                      className="inline-block mb-5"
                    >
                      <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm">
                        <Icon className="w-6 h-6 md:w-7 md:h-7" />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                      {service.description}
                    </p>

                    {/* Benefit – simple and clean */}
                    <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border-l-2 border-blue-500">
                      <span className="italic">{service.benefit}</span>
                    </div>

                    {/* Animated bottom bar – subtle accent */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-500 ease-out"
                      initial={{ width: '0%' }}
                      whileHover={{ width: '100%' }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Toggle Button: View More / View Less */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-full shadow-sm hover:shadow-md hover:border-blue-300 hover:text-blue-600 transition-all duration-300 group"
          >
            <span>{showAll ? 'View Less' : 'View More'}</span>
            <FaArrowRight
              className={`text-sm transition-transform duration-300 ${
                showAll ? 'rotate-90' : 'group-hover:translate-x-1'
              }`}
            />
          </button>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 md:mt-24 text-center"
        >
          <p className="text-lg md:text-xl text-gray-700 mb-6 font-medium">
            Ready to transform your practice?
          </p>
          <motion.a
            href={getSectionPath('cns')}
            onClick={(event) => navigateToSection(event, 'cns')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 md:px-14 py-4 bg-blue-600 text-white font-semibold text-base md:text-lg rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all"
          >
            <span>Get Started Today</span>
            <FaArrowRight className="text-sm" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
