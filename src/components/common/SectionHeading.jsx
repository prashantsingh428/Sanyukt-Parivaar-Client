import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle, theme = 'light' }) => {
  // Theme-based classes
  const isDark = theme === 'dark';

  const badgeTextClass = isDark ? 'text-primary-400' : 'text-primary-600';
  const titleClass = isDark ? 'text-white' : 'text-neutral-900';
  const subtitleClass = isDark ? 'text-neutral-300' : 'text-neutral-600';
  const lineClass = isDark ? 'bg-primary-400' : 'bg-primary-600';
  const gradientClass = isDark
    ? 'from-primary-400 via-secondary-400 to-accent-300'
    : 'from-primary-600 via-secondary-500 to-accent-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
    >
      {/* Animated Top Line */}
      <motion.div
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`h-1 bg-linear-to-r from-transparent ${lineClass} rounded-full`}
        />
        <span className={`font-bold text-sm md:text-base uppercase tracking-widest ${badgeTextClass}`}>
          Our Excellence
        </span>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`h-1 bg-linear-to-l from-transparent ${lineClass} rounded-full`}
        />
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${titleClass}`}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className={`text-lg md:text-xl leading-relaxed font-light ${subtitleClass}`}
      >
        {subtitle}
      </motion.p>

      {/* Bottom Decorative Line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`h-1.5 bg-gradient-to-r ${gradientClass} mx-auto mt-8 rounded-full`}
      />
    </motion.div>
  );
};

export default SectionHeading;