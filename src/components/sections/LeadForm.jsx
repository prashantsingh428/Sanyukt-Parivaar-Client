import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUserMd,
  FaHospital,
  FaMapMarkerAlt,
  FaPhone,
  FaDollarSign,
  FaPaperPlane,
  FaCheck,
  FaShieldAlt,
} from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';

const DEFAULT_PRODUCTION_API_BASE_URL = 'https://aigrowthexa-landing-6.onrender.com';

const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV ? 'http://localhost:8000' : DEFAULT_PRODUCTION_API_BASE_URL)
).replace(/\/$/, '');

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    clinicName: '',
    city: '',
    mobile: '',
    budget: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${apiBaseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formFields = [
    { name: 'name', label: 'Full Name', icon: FaUserMd, placeholder: 'Dr. John Doe', type: 'text', required: true },
    { name: 'specialization', label: 'Specialization', icon: FaUserMd, placeholder: 'e.g., Cardiologist', type: 'text', required: true },
    { name: 'clinicName', label: 'Clinic Name', icon: FaHospital, placeholder: 'Your Clinic Name', type: 'text', required: true },
    { name: 'city', label: 'City', icon: FaMapMarkerAlt, placeholder: 'e.g., Mumbai', type: 'text', required: true },
    { name: 'mobile', label: 'Mobile Number', icon: FaPhone, placeholder: '+91 98765 43210', type: 'tel', required: true },
  ];

  const budgetOptions = [
    { value: '', label: 'Select monthly budget range' },
    { value: 'less-than-25k', label: 'Less than ₹25,000' },
    { value: '25k-50k', label: '₹25,000 – ₹50,000' },
    { value: '50k-1lac', label: '₹50,000 – ₹1,00,000' },
    { value: '1lac-2lac', label: '₹1,00,000 – ₹2,00,000' },
    { value: 'more-than-2lac', label: 'More than ₹2,00,000' },
  ];

  return (
    <section
      id="cns"
      className="relative py-20 md:py-28 bg-[#111827] overflow-hidden"
    >
      {/* Dark theme background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Get Your Free Growth Strategy"
          subtitle="Let's create a customized digital marketing plan for your practice"
          theme="dark"
        />

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-primary-600 px-6 py-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-1">
                    Your Personalized Growth Plan
                  </h3>
                  <p className="text-white/80 text-sm">
                    Fill these details and get a customized strategy in 24 hours
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    {formFields.map((field) => {
                      const Icon = field.icon;
                      return (
                        <div key={field.name} className="space-y-1.5">
                          <label className="block text-neutral-700 font-medium text-sm flex items-center gap-1">
                            <Icon className="text-primary-600 text-xs" />
                            <span>{field.label}</span>
                            {field.required && <span className="text-red-500">*</span>}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white text-neutral-900 placeholder-neutral-400"
                          />
                        </div>
                      );
                    })}

                    {/* Budget Field */}
                    <div className="space-y-1.5">
                      <label className="block text-neutral-700 font-medium text-sm flex items-center gap-1">
                        <FaDollarSign className="text-primary-600 text-xs" />
                        <span>Monthly Marketing Budget</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white text-neutral-900"
                      >
                        {budgetOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Trust Section */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <FaShieldAlt className="text-primary-600 text-lg flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-800 text-sm">
                          Your data is secure & confidential
                        </p>
                        <p className="text-neutral-600 text-xs">
                          We follow healthcare privacy guidelines. Your information will only be used for your consultation.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Get My Free Strategy</span>
                      </>
                    )}
                  </button>

                  {/* Bottom Info */}
                  <p className="text-center text-neutral-500 text-xs mt-4">
                    ✓ Response within 24 hours • ✓ Personalized strategy • ✓ No obligations
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-xl p-8 text-center border border-neutral-200"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
                  <FaCheck className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  Perfect! 🎉
                </h3>
                <p className="text-lg text-neutral-700 mb-4">
                  Your growth strategy is on the way
                </p>
                <div className="bg-neutral-50 rounded-lg p-5 mb-5">
                  <p className="text-sm text-neutral-600 mb-3">
                    Our healthcare marketing experts will review your clinic details and create a personalized growth plan within 24 hours.
                  </p>
                  <a
                    href="https://wa.me/+918979779337"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
                <p className="text-xs text-neutral-500">
                  We've also sent you an email with confirmation.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
