import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ currentSlide, setCurrentSlide, heroSlides, isLoggedIn, userRole, handleNavigation }) => {
    return (
        <section className="relative h-[600px] md:h-[750px] overflow-hidden bg-[#0D0D0D]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/95 via-[#0D0D0D]/70 to-transparent z-10"></div>
                    <img
                        src={heroSlides[currentSlide].image}
                        alt={`Slide ${currentSlide + 1}`}
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 z-20 flex items-center">
                        <div className="container mx-auto px-6">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="max-w-4xl mx-auto text-center"
                            >
                                <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold mb-4 leading-tight text-[#F5E6C8]/80 tracking-tight">
                                    {heroSlides[currentSlide].title}
                                </h1>
                                <h2 className="text-base sm:text-xl md:text-2xl text-[#C8A96A] font-bold mb-6 uppercase tracking-[0.3em]">
                                    {heroSlides[currentSlide].subtitle}
                                </h2>
                                <p className="text-sm sm:text-base md:text-xl mb-8 text-gray-300 leading-relaxed max-w-2xl mx-auto font-light">
                                    {heroSlides[currentSlide].description}
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            if (isLoggedIn) {
                                                handleNavigation(userRole === 'admin' ? '/admin/dashboard' : '/my-account');
                                            } else {
                                                handleNavigation('/register');
                                            }
                                        }}
                                        className="px-8 py-4 bg-[#C8A96A] text-[#0D0D0D] font-bold rounded-full hover:bg-[#D4AF37] transition-all shadow-xl shadow-gold-900/20 flex items-center space-x-3 text-base gold-glow-hover"
                                    >
                                        <span>
                                            {isLoggedIn
                                                ? (userRole === 'admin' ? 'Admin Dashboard' : 'User Dashboard')
                                                : 'Join Now'
                                            }
                                        </span>
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleNavigation('/contact')}
                                        className="px-8 py-4 border-2 border-[#C8A96A]/30 backdrop-blur-md text-[#F5E6C8] font-bold rounded-full hover:bg-[#C8A96A] hover:text-[#0D0D0D] transition-all text-base"
                                    >
                                        Contact Us
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-10 bg-[#C8A96A]' : 'bg-white/30 hover:bg-white'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
