import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
} from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import { getSectionPath, navigateToSection } from '../../lib/sectionNavigation';

const Contact = () => {
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      label: 'Office Address',
      value: 'Beta Plazza, Block B, Beta I, Greater Noida, Uttar Pradesh, 201310, India',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+91 8979779337',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'aigrowthexa@gmail.com',
    },
    {
      icon: FaClock,
      label: 'Working Hours',
      value: 'Mon - Sat: 9:00 AM - 7:00 PM',
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Simple background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Let's Connect"
          subtitle="Reach out to us for any queries or to start your growth journey"
          theme="light"
        />

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    <Icon className="text-lg" />
                  </div>
                  <h3 className="font-semibold text-neutral-900">{item.label}</h3>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed pl-14">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto bg-primary-600 rounded-2xl shadow-lg p-8 md:p-10 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Grow Your Practice?
          </h3>
          <p className="text-white/90 text-base md:text-lg mb-6">
            Let's discuss your digital growth strategy and create a path to success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getSectionPath('cns')}
              onClick={(event) => navigateToSection(event, 'cns')}
              className="bg-white text-primary-600 px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <span>Book Strategy Call</span>
            </a>
            <a
              href="https://wa.me/+918979779337"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold border border-white/40 transition-colors flex items-center justify-center gap-2"
            >
              <FaWhatsapp />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
