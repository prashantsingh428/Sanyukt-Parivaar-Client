import { motion } from 'framer-motion';
import { FaWhatsapp, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { getSectionPath, navigateToSection } from '../../lib/sectionNavigation';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, easAe: 'easeOut' }
    },
  };

  return (
    <section id="hme" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#111827]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-banner.mp4" type="video/mp4" />
        </video>
        {/* Simple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700/90 to-secondary-600/85 mix-blend-multiply" />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 md:px-6 lg:px-8 relative z-20 max-w-4xl w-full text-center text-white"
      >
        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight"
        >
          <span className="block mb-2">From Clinic to Brand</span>
          <span className="inline-block bg-gradient-to-r from-accent-300 to-white bg-clip-text text-transparent">
            We Grow Doctors Digitally
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-10 text-white/80 font-light"
        >
          We help doctors dominate Google, attract premium patients & build powerful online presence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Book Call Button */}
          <motion.a
            href={getSectionPath('cns')}
            onClick={(event) => navigateToSection(event, 'cns')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-primary-600 rounded-full font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <FaCalendarAlt />
            <span>Book Free Strategy Call</span>
            <FaArrowRight size={16} />
          </motion.a>

          {/* WhatsApp Button */}
          <motion.a
            href="https://wa.me/+918979779337"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-full font-bold text-base md:text-lg shadow-md hover:shadow-lg border border-secondary-400 transition-all"
          >
            <FaWhatsapp size={20} />
            <span>Chat on WhatsApp</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
