import { motion } from 'framer-motion';
import {
  FaLinkedinIn,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { getSectionPath, navigateToSection } from '../../lib/sectionNavigation';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { id: 'hme', label: 'Home' },
    { id: 'svc', label: 'Services' },
    { id: 'cst', label: 'Case Studies' },
    { id: 'tml', label: 'Testimonials' },
    { id: 'abt', label: 'About' },
    { id: 'why', label: 'Why Choose Us' },
  ];

  const servicesList = [
    'SEO for Doctors',
    'Social Media',
    'Google Ads',
    'Website Development',
    'Content Creation',
    'Podcast Production'
  ];

  // Only LinkedIn and WhatsApp remain
  const socialLinks = [
    {
      icon: FaLinkedinIn,
      href: 'https://www.linkedin.com/company/ai-growthexa/about/?viewAsMember=true',
      label: 'LinkedIn'
    },
    {
      icon: FaWhatsapp,
      href: 'https://wa.me/9189797979337', // Based on contact number
      label: 'WhatsApp'
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white pt-16 pb-6 border-t border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12"
        >
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              AlGrowthexa
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We help businesses grow using AI-powered marketing, automation, lead generation, and smart analytics.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={getSectionPath(link.id)}
                    onClick={(event) => navigateToSection(event, link.id)}
                    className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Services</h4>
            <ul className="space-y-2.5">
              {servicesList.map((service, i) => (
                <li key={i}>
                  <a
                    href={getSectionPath('svc')}
                    onClick={(event) => navigateToSection(event, 'svc')}
                    className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Get in Touch</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-teal-400 mt-1 flex-shrink-0" size={16} />
                <span className="text-slate-300 leading-relaxed">
                  Beta Plaza, Block B, Beta I, Greater Noida, Uttar Pradesh 201310, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-teal-400 flex-shrink-0" size={16} />
                <a
                  href="tel:+9189797979337"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  +91 89797 79337
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-teal-400 flex-shrink-0" size={16} />
                <a
                  href="mailto:aigrowthexa@gmail.com"
                  className="text-slate-300 hover:text-teal-400 transition-colors break-all"
                >
                  aigrowthexa@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 pt-6 text-center text-slate-400 text-xs">
          <p>© {currentYear} AlGrowthexa. All rights reserved.</p>
          <p className="mt-1 text-slate-500 text-[10px]">
            Designed for healthcare excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
