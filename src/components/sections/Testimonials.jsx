import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaQuoteRight,
  FaCheckCircle,
  FaWhatsapp,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';

// Testimonial data enriched with full conversation text from screenshots
const testimonials = [
  {
    id: 1,
    name: 'Dr. Pradeep',
    role: 'Doctor',
    request: 'Hello pardeepp sir Help me out with our work feedback',
    feedback: `प्रियांशु के साथ कार्य करने का अनुभव अत्यंत सराहनीय रहा है। वे स्वभाव से सरल, शांत और कार्य के प्रति पूर्णतः समर्पित हैं। उनकी कार्यशैली परिणाम-केंद्रित है, जिससे मेरे कार्यों और पहलों को वास्तविक गति और विस्तार मिला है। उनके साथ काम करना वास्तव में सुखद रहा प्रत्येक कार्य समयबद्ध, सटीक और पूरी जिम्मेदारी के साथ संपन्न किया गया। पॉडकास्ट प्रबंधन से लेकर वेबसाइट विकास, सोशल मीडिया ऑप्टिमाइजेशन और गूगल पेड़स तक, हर स्तर पर उनकी योजना, समन्वय और निष्पादन प्रशंसनीय रहा है। मैं उनके कार्य की निष्ठा और पेशेवर दृष्टिकोण की सराहना करता हूँ और भविष्य में भी उनके साथ कार्य करने की अपेक्षा रखता हूँ।`,
    thanks:
      'Thanku sir For your feedback, it\'s really cool working with you sir',
    screenshot: '/images/testimonials/ss-01.jpeg',
    tags: ['Podcast Management', 'Website Development', 'SMO', 'Google Ads'],
  },
  {
    id: 2,
    name: 'Dr. Mohit Madan',
    role: 'Doctor',
    request: 'Hello Mohit Madan sir Help me out with our work feedback',
    feedback: `It's really been very good working with you, Priyanshu. You are simple, calm, and extremely action-oriented. Your work has genuinely helped in growing my practice. Bahut mazaa aaya aapke saath kaam karke — har task hamesha timely aur accurate raha. From website development to SMO and Google Ads, the results and coordination were excellent.`,
    thanks: '', // No thank you message visible in screenshot
    screenshot: '/images/testimonials/ss-02.jpeg',
    tags: ['Website Development', 'SMO', 'Google Ads'],
  },
  {
    id: 3,
    name: 'Dr. Nitin Goswami',
    role: 'Doctor',
    request: 'Hello Nitin sir Help me out with our work feedback',
    feedback: `It has been a great experience working with Priyanshu. He is calm, focused, and highly action-oriented, with a clear understanding of business needs. His efforts have genuinely contributed to the growth of my practice. Working with him has been enjoyable — every task was handled with accuracy, professionalism, and on-time delivery. From podcast execution and website development to SMO and Google Ads, the planning, coordination, and results were consistently excellent. I truly appreciate his dedication and would highly recommend him.`,
    thanks:
      'Thanku so much sir For your beautiful feedback, it\'s really unexpected It\'s really lovely working with you also sir',
    screenshot: '/images/testimonials/ss-03.jpeg',
    tags: ['Podcast Execution', 'Website Development', 'SMO', 'Google Ads'],
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  const current = testimonials[activeIndex];

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % testimonials.length);

  const prev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const openModal = (img) => {
    setModalImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage('');
  };

  return (
    <section id="tml" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Trusted by Real Doctors"
          subtitle="Verified feedback with real proof — directly from the professionals we've helped"
        />

        <div className="max-w-6xl mx-auto relative">
          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-primary-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-primary-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>

          {/* Main Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left - WhatsApp Screenshot Thumbnail */}
                <div
                  onClick={() => openModal(current.screenshot)}
                  className="md:w-72 lg:w-80 cursor-pointer group relative bg-gray-100 p-4 flex items-center justify-center"
                >
                  <div className="relative w-full max-w-[240px] mx-auto rounded-2xl overflow-hidden shadow-md border-4 border-white">
                    <div className="bg-[#075e54] text-white text-xs py-1 px-3 flex items-center gap-1">
                      <FaWhatsapp size={12} />
                      <span className="font-medium">WhatsApp</span>
                    </div>
                    <img
                      src={current.screenshot}
                      alt="WhatsApp chat screenshot"
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end justify-start p-2 opacity-0 group-hover:opacity-100">
                      <span className="text-[10px] font-medium text-white bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
                        Tap to enlarge
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right - Testimonial Content */}
                <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col">
                  {/* Verified Badge & Name */}
                  <div className="flex items-center gap-2 mb-3">
                    <FaCheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      Verified Doctor
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                      {current.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {current.name}
                      </h3>
                      <p className="text-sm text-gray-500">{current.role}</p>
                    </div>
                  </div>

                  <FaQuoteRight className="text-primary-100 text-4xl mb-4" />

                  {/* Main Feedback */}
                  <div className="space-y-4">
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      {current.feedback}
                    </p>

                    {/* Service Tags */}
                    <div className="flex flex-wrap gap-2">
                      {current.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1.5 rounded-full border border-primary-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Transcript Toggle (if there's additional conversation) */}
                    {(current.request || current.thanks) && (
                      <div className="mt-4 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => setTranscriptOpen(!transcriptOpen)}
                          className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
                        >
                          <FaWhatsapp className="text-[#075e54]" />
                          <span>View full conversation transcript</span>
                          {transcriptOpen ? (
                            <FaChevronUp size={12} />
                          ) : (
                            <FaChevronDown size={12} />
                          )}
                        </button>

                        <AnimatePresence>
                          {transcriptOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 space-y-2 text-sm bg-gray-50 p-3 rounded-lg">
                                {current.request && (
                                  <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-700 min-w-[60px]">
                                      Request:
                                    </span>
                                    <span className="text-gray-600">
                                      {current.request}
                                    </span>
                                  </div>
                                )}
                                {current.thanks && (
                                  <div className="flex items-start gap-2">
                                    <span className="font-medium text-gray-700 min-w-[60px]">
                                      Thanks:
                                    </span>
                                    <span className="text-gray-600">
                                      {current.thanks}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 w-2.5 hover:bg-primary-300'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full-Screen Image Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 z-10 transition-colors"
                aria-label="Close modal"
              >
                <FaTimes size={24} />
              </button>
              <div className="w-full h-full flex items-center justify-center p-4">
                <img
                  src={modalImage}
                  alt="Full screenshot"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
