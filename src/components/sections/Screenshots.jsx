import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaTimes,
  FaGlobe,
  FaMapMarkerAlt,
  FaUserMd,
  FaHeartbeat,
  FaStethoscope,
  FaFemale,
  FaCheckCircle,
} from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';

const Screenshots = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  // Doctor data with extended bio and achievements
  const doctors = [
    {
      id: 1,
      name: 'Dr. Ritu Arya',
      title: 'Best Gynaecologist in Noida West',
      location: 'Noida West, Uttar Pradesh',
      rating: 4.9,
      reviews: 327,
      specialty: 'Gynaecology',
      icon: <FaFemale className="text-pink-500" />,
      image: '/images/doc/rituarya.png',
      website: 'https://www.drrituarya.com',
      map: 'https://maps.google.com/?q=Dr+Ritu+Arya+Noida+West',
      verified: true,
      bio: 'With over 15 years of experience, Dr. Arya is a trusted name in women’s health, specializing in high‑risk pregnancies and minimally invasive surgeries.',
      achievements: [
        '500+ successful deliveries',
        'Expert in laparoscopic gynecology',
        'Gold medalist in obstetrics',
      ],
    },
    {
      id: 2,
      name: 'Dr. Gunjan K Sharma',
      title: 'General Practitioner in Greater Noida',
      location: 'Greater Noida, Uttar Pradesh',
      rating: 4.8,
      reviews: 412,
      specialty: 'General Practice',
      icon: <FaStethoscope className="text-blue-500" />,
      image: '/images/doc/gunjansharma.png',
      website: 'https://www.drgunjanksharma.com',
      map: 'https://maps.google.com/?q=Dr+Gunjan+K+Sharma+Greater+Noida',
      verified: true,
      bio: 'Dr. Sharma combines modern diagnostics with compassionate care, serving the community for over a decade and treating 50+ patients daily.',
      achievements: [
        'Pioneer in telemedicine in Greater Noida',
        'Recipient of “Excellence in Primary Care” award',
        'Published research in diabetes management',
      ],
    },
    {
      id: 3,
      name: 'Dr. Anjula Bhargava',
      title: 'Obstetrician-Gynecologist in Aligarh',
      location: 'Aligarh, Uttar Pradesh',
      rating: 4.0,
      reviews: 89,
      specialty: 'Obstetrics & Gynecology',
      icon: <FaUserMd className="text-green-600" />,
      image: '/images/doc/anjulabhargava.jpg',
      website: 'https://www.dranjulabhargava.com',
      map: 'https://maps.google.com/?q=Dr+Anjula+Bhargava+Aligarh',
      verified: true,
      bio: 'A dedicated gynecologist committed to patient education and preventive care, Dr. Bhargava has helped hundreds of women lead healthier lives.',
      achievements: [
        'Specialist in adolescent gynecology',
        'Conducted 50+ health awareness camps',
        'Member of FOGSI',
      ],
    },
    {
      id: 4,
      name: 'Kamal Heart Care Center (Dr. Athar)',
      title: 'D.M. Cardiology • Aligarh',
      location: 'Aligarh, Uttar Pradesh',
      rating: 4.1,
      reviews: 156,
      specialty: 'Cardiology',
      icon: <FaHeartbeat className="text-red-500" />,
      image: '/images/doc/artharkamal.webp',
      website: 'https://www.kamalheartcare.com',
      map: 'https://maps.google.com/?q=Kamal+Heart+Care+Center+Aligarh',
      verified: true,
      bio: 'Dr. Athar specializes in interventional cardiology and has performed over 1,000 successful angioplasties, earning trust across the region.',
      achievements: [
        '1,000+ angioplasties performed',
        'Fellow of the American College of Cardiology',
        'Pioneer in radial artery interventions',
      ],
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % doctors.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
  };

  const goToDoctor = (index) => {
    setCurrentIndex(index);
  };

  // Helper to get icon color class for achievements (same as specialty icon)
  const getAchievementIconColor = (doctor) => {
    if (doctor.specialty === 'Gynaecology') return 'text-pink-500';
    if (doctor.specialty === 'General Practice') return 'text-blue-500';
    if (doctor.specialty === 'Obstetrics & Gynecology') return 'text-green-600';
    if (doctor.specialty === 'Cardiology') return 'text-red-500';
    return 'text-primary-500';
  };

  return (
    <section
      id="scs"
      className="relative py-20 md:py-28 lg:py-32 bg-[#111827] overflow-hidden"
    >
      {/* Dark theme background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Trusted by Leading Doctors"
          subtitle="Real healthcare professionals who have partnered with us"
          theme="dark" // Changed to dark theme for white text on dark bg
        />

        {/* Main carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-xl border border-neutral-800 bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-col md:flex-row min-h-[550px] md:min-h-[450px] lg:min-h-[500px]"
              >
                {/* Image container with fixed aspect ratio */}
                <div className="md:w-2/5 relative bg-neutral-100 aspect-w-4 aspect-h-5 md:aspect-h-6">
                  {doctors[currentIndex].image ? (
                    <img
                      src={doctors[currentIndex].image}
                      alt={doctors[currentIndex].name}
                      className="w-full h-full object-cover object-center cursor-pointer"
                      onClick={() => setSelectedImage(doctors[currentIndex].image)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-neutral-400">
                      {doctors[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  {doctors[currentIndex].verified && (
                    <div className="absolute top-4 left-4 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <FaCheckCircle size={12} /> Verified
                    </div>
                  )}
                </div>

                {/* Details - flex column to fill remaining height */}
                <div className="md:w-3/5  p-6 md:p-8 flex flex-col justify-between flex-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-2xl font-semibold text-neutral-800 mb-2">
                      {doctors[currentIndex].icon}
                      <span>{doctors[currentIndex].name}</span>
                    </div>
                    <p className="text-lg text-primary-600 font-medium mb-1">
                      {doctors[currentIndex].title}
                    </p>
                    <p className="text-blue-500 flex items-center gap-1 mb-4">
                      <FaMapMarkerAlt size={14} /> {doctors[currentIndex].location}
                    </p>

                    {/* Trust stats */}
                    <div className="flex gap-6 mb-3 py-3">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-amber-400" />
                        <span className="font-semibold text-neutral-800">
                          {doctors[currentIndex].rating}
                        </span>
                        <span className="text-neutral-700 text-sm">
                          ({doctors[currentIndex].reviews} reviews)
                        </span>
                      </div>
                      <div className="text-neutral-700 text-sm">
                        {doctors[currentIndex].specialty}
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-800 border-l-2 border-primary-200 pl-4 py-2 mb-3 text-sm leading-relaxed">
                      {doctors[currentIndex].bio}
                    </p>

                    {/* Achievements list - fills remaining space */}
                    <ul className="space-y-2 py-2 mb-3">
                      {doctors[currentIndex].achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <FaCheckCircle
                            className={`mt-0.5 flex-shrink-0 ${getAchievementIconColor(
                              doctors[currentIndex]
                            )}`}
                            size={14}
                          />
                          <span className="text-neutral-700">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Partner note */}
                    <p className="text-neutral-500 italic text-xs mb-3">
                      Partnered with us to grow their practice digitally.
                    </p>
                  </div>

                  {/* Action buttons - always at bottom */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {doctors[currentIndex].website && (
                      <a
                        href={doctors[currentIndex].website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 px-4 py-2 rounded-lg transition text-sm font-medium"
                      >
                        <FaGlobe size={14} /> Website
                      </a>
                    )}
                    {doctors[currentIndex].map && (
                      <a
                        href={doctors[currentIndex].map}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-secondary-50 hover:bg-secondary-100 text-secondary-700 px-4 py-2 rounded-lg transition text-sm font-medium"
                      >
                        <FaMapMarkerAlt size={14} /> Directions
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows - adjusted for dark background */}
          <button
            onClick={prev}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-neutral-800/80 hover:bg-neutral-700 text-white p-2 md:p-3 rounded-full shadow-md backdrop-blur-sm transition-all hover:scale-110 border border-neutral-700 z-20"
            aria-label="Previous"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-neutral-800/80 hover:bg-neutral-700 text-white p-2 md:p-3 rounded-full shadow-md backdrop-blur-sm transition-all hover:scale-110 border border-neutral-700 z-20"
            aria-label="Next"
          >
            <FaArrowRight />
          </button>

          {/* Simple dot indicators - adjusted for dark background */}
          <div className="flex justify-center mt-6 gap-2">
            {doctors.map((_, index) => (
              <button
                key={index}
                onClick={() => goToDoctor(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary-500 w-6'
                    : 'bg-neutral-600 hover:bg-neutral-500'
                }`}
                aria-label={`Go to doctor ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full-screen modal (unchanged) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl"
                aria-label="Close"
              >
                <FaTimes />
              </button>
              <img
                src={selectedImage}
                alt="Doctor full view"
                className="w-full h-full object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Screenshots;
