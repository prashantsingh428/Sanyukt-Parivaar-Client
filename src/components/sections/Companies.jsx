import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';

const Companies = () => {
  const companies = [
    { 
      name: 'My Ortho Centre', 
      logo: '/images/companies/myorthocentre.jpeg',
      fallbackBg: '#2980B9' 
    },
    { 
      name: 'JAGADA N JHA', 
      logo: '/images/companies/jagadanjha-cardiologist.jpeg',
      fallbackBg: '#C0392B' 
    },
    { 
      name: 'Global Heart Clinic', 
      logo: '/images/companies/global-heart-clinic.jpeg',
      fallbackBg: '#D35400' 
    },
    { 
      name: 'Kailash Healthcare', 
      logo: '/images/companies/kailash-healthcare.jpeg',
      fallbackBg: '#27AE60' 
    },
    { 
      name: 'Dr. Satya Nanda', 
      logo: '/images/companies/dr-satya-nanda.jpeg',
      fallbackBg: '#16A085' 
    },
    {
      name: "Dr. Snehayil Tyagi",
      logo: "/images/companies/dr-snehyil-tyagi.jpeg",
      fallbackBg: "#2C3E50"
    }
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2);
  };

  const CompanyLogo = ({ company }) => {
    const [imgError, setImgError] = useState(false);

    if (imgError) {
      return (
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg mx-auto"
          style={{ backgroundColor: company.fallbackBg }}
        >
          {getInitials(company.name)}
        </div>
      );
    }

    return (
      <img
        src={company.logo}
        alt={company.name}
        className="h-16 w-auto object-contain mx-auto transition-all duration-300"
        onError={() => setImgError(true)}
      />
    );
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto">
        <SectionHeading
          title="Trusted by Leading Healthcare Institutions"
          subtitle="We partner with the best in the industry"
        />

        <div className="relative mt-12">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 20, // 🔁 Increased from 30 to 60 seconds for slower scrolling
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {[...companies, ...companies].map((company, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="shrink-0 flex flex-col items-center w-36"
              >
                <CompanyLogo company={company} />
                <p className="mt-3 text-sm text-gray-700 font-medium text-center leading-tight">
                  {company.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Companies;