import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaAward, FaMedal, FaStar, FaTimes } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import { awards } from '../../data/data';

const Awards = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedCertificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCertificate]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Specialization':
        return FaTrophy;
      case 'Certification':
        return FaAward;
      case 'Training':
        return FaMedal;
      case 'Recognition':
        return FaTrophy;
      default:
        return FaStar;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="awd"
      className="relative py-20 md:py-28 bg-[#111827] overflow-hidden"
    >
      {/* Dark theme background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Awards & Certifications"
          subtitle="Industry-recognized credentials that validate our expertise"
          theme="dark"
        />

        {/* Awards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {awards.map((award) => {
            const Icon = getCategoryIcon(award.category);
            return (
              <motion.div
                key={award.id}
                variants={itemVariants}
                onClick={() => setSelectedCertificate(award)}
                className="group bg-white rounded-xl border border-neutral-200 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Certificate Image */}
                <div className="relative h-48 bg-neutral-100 flex items-center justify-center">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      // Show fallback icon if image fails to load
                      if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.style.display = 'flex';
                      }
                    }}
                  />
                  <div
                    style={{ display: 'none' }}
                    className="absolute inset-0 flex items-center justify-center bg-neutral-200"
                  >
                    <Icon className="text-5xl text-neutral-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <Icon className="text-primary-600 text-sm" />
                      </div>
                      <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                        {award.category}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                      {award.year}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 line-clamp-2 mb-1">
                    {award.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{award.issuer}</p>

                  {/* Verification hint */}
                  <p className="text-xs text-neutral-400 mt-3 flex items-center gap-1">
                    <FaStar className="text-primary-400" size={12} />
                    Click to view certificate
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Statement - adjusted for dark background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h4 className="text-lg font-semibold text-white mb-2">
              Verified Credentials
            </h4>
            <p className="text-neutral-300 text-sm md:text-base">
              Each certification is independently verified, ensuring you partner with recognized industry experts.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal (unchanged) */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-neutral-100 transition-colors border border-neutral-200"
                aria-label="Close"
              >
                <FaTimes className="text-neutral-600 text-lg" />
              </button>

              {/* Certificate Image */}
              <div className="max-h-[70vh] overflow-auto">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Certificate Details */}
              <div className="p-5 border-t border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {selectedCertificate.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                    {selectedCertificate.category}
                  </span>
                  <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium">
                    {selectedCertificate.year}
                  </span>
                </div>
                <p className="text-sm text-neutral-700">
                  <span className="font-medium">Issued by:</span> {selectedCertificate.issuer}
                </p>

                {/* Verification Badge */}
                <div className="mt-4 flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                    <FaStar className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-green-800">Verified Industry Credential</p>
                    <p className="text-xs text-green-600">Authenticated and recognized</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Awards;
