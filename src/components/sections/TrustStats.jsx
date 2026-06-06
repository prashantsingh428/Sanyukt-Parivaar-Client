import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaProjectDiagram, FaUserMd, FaCity, FaStar } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading'; // adjust path if needed

const trustStats = [
  {
    icon: FaProjectDiagram,
    value: '1600+',
    label: 'Projects Served',
    description: 'Delivered across healthcare and enterprise',
  },
  {
    icon: FaUserMd,
    value: '180+',
    label: 'Helped Doctors',
    description: 'Trusted by leading medical professionals',
  },
  {
    icon: FaCity,
    value: '12+',
    label: 'Cities Covered',
    description: 'Pan-India presence with local expertise',
  },
  {
    icon: FaStar,
    value: '4.8',
    label: 'Avg. Rating',
    description: 'Based on 500+ verified reviews',
  },
];

const Counter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const numericStr = value.replace(/[^0-9.]/g, '');
      const end = parseFloat(numericStr);
      const duration = 2500;
      const increment = end / (duration / 16);

      let start = 0;
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const displayValue = (() => {
    if (value.includes('.')) {
      return count.toFixed(1);
    }
    return Math.floor(count);
  })();

  return (
    <span ref={ref} className="font-bold">
      {displayValue}
      {value.includes('+') ? '+' : ''}
    </span>
  );
};

const TrustStats = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const iconHoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <section className="relative py-20 md:py-28 lg:py-32 bg-gray-50 overflow-hidden">
      {/* Subtle background texture (same as Services) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-30" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Optional heading – matches Services style */}
        <SectionHeading
          title="Our Impact in Numbers"
          subtitle="Trusted by healthcare professionals across India"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto"
        >
          {trustStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group relative h-full"
              >
                <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-7 h-full border border-gray-100">
                  {/* Icon with consistent blue background (like Services) */}
                  <motion.div
                    variants={iconHoverVariants}
                    whileHover="hover"
                    className="inline-block mb-5"
                  >
                    <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm">
                      <Icon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                  </motion.div>

                  {/* Value – solid bold number (no gradient) */}
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <Counter value={stat.value} />
                  </div>

                  {/* Label */}
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                    {stat.label}
                  </p>

                  {/* Description styled as benefit box */}
                  <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border-l-2 border-blue-500">
                    <span className="italic">{stat.description}</span>
                  </div>

                  {/* Animated bottom bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-500 ease-out"
                    initial={{ width: '0%' }}
                    whileHover={{ width: '100%' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStats;