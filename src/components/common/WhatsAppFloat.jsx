import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleChat = () => {
    window.open('https://wa.me/+918979779337', '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Button */}
      <button
        onClick={handleToggle}
        className="w-14 h-14 bg-secondary-500 hover:bg-secondary-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors focus:outline-none"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={24} />
      </button>

      {/* Chat Options Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-16 right-0 w-48 bg-white rounded-lg shadow-xl border border-neutral-200 overflow-hidden"
          >
            <button
              onClick={handleChat}
              className="w-full px-4 py-3 text-left text-neutral-700 hover:bg-primary-50 hover:text-primary-600 font-medium text-sm transition-colors flex items-center gap-2"
            >
              <FaWhatsapp className="text-secondary-500" size={16} />
              Start Chat
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppFloat;