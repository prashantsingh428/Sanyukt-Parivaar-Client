import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaStar, FaUserMd } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import { getSectionPath, navigateToSection } from '../../lib/sectionNavigation';

/* ================= CASE STUDIES DATA ================= */

const caseStudies = [
  {
    id: 1,
    domain: 'My Ortho Centre – Advanced Surgical Centre',
    subDomain: 'Multi-speciality Orthopedic Clinic',
    location: 'Vaishali, Ghaziabad',
    image: '/images/cs/d2.jpeg',

    doctor: {
      name: 'Dr. Mohit Madan',
      qualifications: 'MBBS, MS – Orthopaedics',
      experience: '23+ years',
      specialty: 'Orthopedic & Joint Replacement Surgeon',
    },

    problem:
      'Limited online visibility, declining new patient inquiries, strong competition among orthopedic clinics in Ghaziabad',

    strategy:
      'Local SEO optimization, Google Business Profile management, orthopedic treatment content marketing, patient review generation',

    results: [
      '+150% increase in patient inquiries',
      'Top ranking in local orthopedic searches',
      'Growth in 5-star patient reviews',
    ],

    rating: 4.9,
    source: 'Google Business Profile insights & clinic data',
  },

  {
    id: 2,
    domain: 'Northern Railway – Electrical Engineering Division',
    subDomain: 'Government Transport Organization',
    location: 'India',
    image: '/images/cs/d1.jpeg',

    leader: 'Shri Mohit Chandra – Additional General Manager',

    highlight:
      'Indian Railway Service for Electrical Engineers (1989 Batch)',

    problem:
      'Operational monitoring gaps, maintenance workflow delays, lack of centralized reporting visibility',

    strategy:
      'Digital reporting systems, asset monitoring frameworks, workflow automation & process digitization',

    results: [
      'Improved maintenance tracking efficiency',
      'Streamlined loco shed reporting',
      'Enhanced operational visibility',
    ],

    rating: 4.7,
    source: 'Departmental performance documentation',
  },

  {
    id: 3,
    domain: 'Dhanwantri Health & Dental Care Implant Centre',
    subDomain: 'Dental & Implant Clinic',
    location: 'Raj Nagar Extension, Ghaziabad',
    image: '/images/cs/d3.jpeg',

    problem:
      'Low appointment bookings, minimal digital presence, poor awareness of implant services',

    strategy:
      'Website development, Google Ads campaigns, implant SEO ranking, social media branding',

    results: [
      '+200% growth in appointment bookings',
      'Increase in implant consultations',
      'Top ranking for implant keywords locally',
    ],

    rating: 4.8,
    source: 'Clinic booking analytics',
  },

  {
    id: 4,
    domain: 'Metro Hospitals & Heart Institute',
    subDomain: 'Interventional Cardiology Services',
    location: 'Sector-12, Noida',
    image: '/images/cs/d4.jpeg',

    doctor: {
      name: 'Dr. Richa Agrawal',
      qualifications: 'MBBS, DNB Cardiology, DM Cardiology',
      experience: '13+ years',
      specialty: 'Interventional Cardiologist',
    },

    highlight:
      'Expert in angiography, angioplasty & cardiac device procedures',

    problem:
      'Need for stronger digital authority, cardiology awareness gaps, limited patient education reach',

    strategy:
      'Cardiology awareness campaigns, procedure explainer content, reputation management',

    results: [
      'Growth in cardiology consultations',
      'Improved procedure awareness',
      'Higher patient trust & engagement',
    ],

    rating: 4.9,
    source: 'Hospital engagement analytics',
  },
];

/* ================= HELPERS ================= */

const splitItems = (str) =>
  str.split(',').map((item) => item.trim());

/* ================= COMPONENT ================= */

const CaseStudies = () => {
  const [activeCase, setActiveCase] = useState(0);
  const data = caseStudies[activeCase];

  return (
    <section
      id="cst"
      className="relative py-20 md:py-28 bg-[#111827] overflow-hidden"
    >
      {/* Background Accents */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-primary-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary-900/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Real Client Success Stories"
          subtitle="Verified transformations across healthcare & organizations"
          theme="dark"
        />

        {/* ================= TABS ================= */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {caseStudies.map((study, index) => (
            <button
              key={study.id}
              onClick={() => setActiveCase(index)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                activeCase === index
                  ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                  : 'bg-transparent text-neutral-300 border-neutral-700 hover:border-primary-500 hover:text-primary-400'
              }`}
            >
              {study.domain}
            </button>
          ))}
        </div>

        {/* ================= CARD ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-neutral-200 shadow-lg overflow-hidden max-w-5xl mx-auto"
          >
            <div className="lg:flex">
              {/* IMAGE */}
              <div className="lg:w-2/5 h-80 lg:h-auto bg-neutral-100 relative">
                {data.image ? (
                  <img
                    src={data.image}
                    alt={data.domain}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}

                <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100">
                  <FaUserMd className="text-5xl text-primary-300" />
                </div>

                {/* EXPERIENCE BADGE */}
                {data.doctor?.experience && (
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border text-xs font-medium text-neutral-700">
                    ⏳ {data.doctor.experience} experience
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="lg:w-3/5 p-6 md:p-8 space-y-5">
                {/* TITLE */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-900">
                    {data.domain}
                  </h3>

                  <p className="text-primary-600 font-medium text-sm mt-1">
                    {data.subDomain} • {data.location}
                  </p>

                  {/* DOCTOR */}
                  {data.doctor && (
                    <div className="mt-2">
                      <p className="text-sm text-neutral-700 font-semibold">
                        {data.doctor.name}
                      </p>

                      {data.doctor.qualifications && (
                        <p className="text-xs text-neutral-700">
                          {data.doctor.qualifications}
                        </p>
                      )}

                      {data.doctor.specialty && (
                        <p className="text-xs text-neutral-700">
                          {data.doctor.specialty}
                        </p>
                      )}
                    </div>
                  )}

                  {/* LEADER */}
                  {data.leader && (
                    <p className="text-sm text-neutral-700 mt-2">
                      {data.leader}
                    </p>
                  )}

                  {/* HIGHLIGHT */}
                  {data.highlight && (
                    <p className="text-xs text-primary-600 mt-1">
                      {data.highlight}
                    </p>
                  )}
                </div>

                {/* RATING */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700">
                    <FaCheckCircle className="text-green-600" />
                    Verified Result
                  </span>

                  <span className="flex items-center gap-1 text-sm text-neutral-600">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-amber-400 text-sm" />
                    ))}
                    <span className="ml-1 text-neutral-500">
                      ({data.rating})
                    </span>
                  </span>
                </div>

                {/* CHALLENGE & SOLUTION */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-red-400 uppercase mb-2">
                      Challenge
                    </h4>
                    <p className="text-neutral-700 text-sm">
                      {data.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-red-400 uppercase mb-2">
                      Solution
                    </h4>
                    <p className="text-neutral-700 text-sm">
                      {data.strategy}
                    </p>
                  </div>
                </div>

                {/* RESULTS */}
                <div>
                  <h4 className="text-xs font-semibold text-red-400 uppercase mb-2">
                    Key Results
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    {data.results.map((result, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-primary-50 text-primary-800 rounded-full text-sm font-medium border border-primary-200"
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SOURCE */}
                <p className="text-xs text-neutral-600 italic pt-2 border-t">
                  * Case verified from {data.source}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={getSectionPath('cns')}
            onClick={(event) => navigateToSection(event, 'cns')}
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Book Your Free Strategy Call
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
