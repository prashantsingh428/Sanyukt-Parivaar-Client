import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import { faqs } from '../../data/data';
import { getSectionPath, navigateToSection } from '../../lib/sectionNavigation';

// 🔹 Initial FAQs to show
const INITIAL_COUNT = 5;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [renderKey, setRenderKey] = useState(0); // Force animation re-render

  // 🔹 Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  // 🔹 Item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // 🔥 View More
  const handleViewMore = () => {
    setVisibleCount(faqs.length);
    setOpenIndex(null);
    setRenderKey((prev) => prev + 1);
  };

  // 🔥 View Less
  const handleViewLess = () => {
    setVisibleCount(INITIAL_COUNT);
    setOpenIndex(null);
    setRenderKey((prev) => prev + 1);
  };

  // 🔹 Safety check
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return (
      <section id="faq" className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-neutral-600">
            No FAQs available at the moment.
          </p>
        </div>
      </section>
    );
  }

  const hasMore = visibleCount < faqs.length;
  const hasLess = visibleCount > INITIAL_COUNT;
  const displayedFaqs = faqs.slice(0, visibleCount);

  return (
    <section id="faq" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        {/* 🔹 Section Heading */}
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our services"
          theme="light"
        />

        {/* 🔥 FAQ List */}
        <motion.div
          key={renderKey}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto space-y-3"
        >
          {displayedFaqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border-b border-neutral-200 last:border-0"
            >
              {/* Question */}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full py-4 flex justify-between items-center text-left focus:outline-none"
              >
                <span className="text-neutral-800 font-medium text-base md:text-lg pr-4">
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-neutral-500"
                >
                  <FaChevronDown size={16} />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="text-neutral-600 text-sm md:text-base pb-4 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* 🔥 View More / Less Buttons */}
          <div className="text-center pt-6 flex justify-center gap-4">

            {hasMore && (
              <button
                onClick={handleViewMore}
                className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium rounded-lg transition-colors border border-neutral-300"
              >
                View More
              </button>
            )}

            {hasLess && (
              <button
                onClick={handleViewLess}
                className="px-6 py-3 bg-neutral-800 hover:bg-neutral-900 text-white font-medium rounded-lg transition-colors"
              >
                View Less
              </button>
            )}

          </div>
        </motion.div>

        {/* 🔹 CTA Section */}
        <div className="text-center mt-12">
          <p className="text-neutral-600 mb-4">
            Still have questions? We're here to help.
          </p>

          <a
            href={getSectionPath('cns')}
            onClick={(event) => navigateToSection(event, 'cns')}
            className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            Get in Touch
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
