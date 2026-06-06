import { motion } from 'framer-motion';
import { FaUsers, FaChartLine, FaTrophy, FaCity } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';

const About = () => {
  const stats = [
    { 
      icon: FaUsers, 
      label: 'Doctors', 
      value: '180+',
    },
    { 
      icon: FaChartLine, 
      label: 'Projects', 
      value: '1600+',
    },
    { 
      icon: FaTrophy, 
      label: 'Awards', 
      value: '15+',
    },
    { 
      icon: FaCity, 
      label: 'Cities', 
      value: '12+',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="abt" className="relative py-20 md:py-28 lg:py-32 bg-white overflow-hidden">
      {/* Subtle background elements - light version */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-secondary-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* No theme="dark" – uses default light theme */}
        <SectionHeading
          title="About AlGrowthexa"
          subtitle="Your Partner in Healthcare Digital Growth"
        />

        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center max-w-6xl mx-auto mb-16 md:mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
              <span className="font-semibold text-primary-600">AlGrowthexa</span> is a healthcare-focused digital growth agency dedicated to helping doctors build strong personal brands and increase patient acquisition using data-driven, ethical marketing strategies.
            </p>

            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
              With over <span className="font-semibold text-primary-600">8 years of experience</span>, we've mastered the art of ethical healthcare marketing that delivers measurable results while strictly adhering to medical guidelines.
            </p>

            {/* Simple bullet points */}
            <ul className="space-y-2">
              {[
                'MCI Guidelines Compliant',
                'Ethical Marketing Only',
                'Proven Track Record',
                'Healthcare Specialists',
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-600">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                  <span className="text-sm md:text-base">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Mission/Vision/Values Boxes - Light cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 shadow-sm">
              <h3 className="text-lg font-semibold text-primary-600 mb-2">Mission</h3>
              <p className="text-sm text-neutral-600">Transform every doctor into a digital leader.</p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 shadow-sm">
              <h3 className="text-lg font-semibold text-secondary-600 mb-2">Vision</h3>
              <p className="text-sm text-neutral-600">Make every doctor visible online.</p>
            </div>

            <div className="col-span-2 bg-neutral-50 p-6 rounded-xl border border-neutral-200 shadow-sm">
              <h3 className="text-lg font-semibold text-accent-600 mb-2">Values</h3>
              <p className="text-sm text-neutral-600">Integrity • Innovation • Impact • Excellence</p>
            </div>
          </motion.div>
        </div>

        {/* Stats Section - Clean Cards with icons styled like Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 text-center border border-neutral-100"
              >
                {/* Icon container matching Services component */}
                <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm mb-3">
                  <Icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-neutral-800 mb-1">
                  {stat.value}
                </div>
                <p className="text-neutral-600 text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
