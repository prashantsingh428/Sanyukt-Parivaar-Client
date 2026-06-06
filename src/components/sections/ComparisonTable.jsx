import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import { comparisonData } from '../../data/data';

const ComparisonTable = () => {
  return (
    <section id="cpr" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why AlGrowthexa vs Others"
          subtitle="See the difference specialized healthcare marketing makes"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto overflow-x-auto rounded-xl border border-neutral-200 shadow-lg"
        >
          <table className="w-full min-w-[500px] sm:min-w-[600px]">
            <thead>
              <tr className="bg-neutral-100 border-b border-neutral-200">
                <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-semibold text-neutral-700 uppercase tracking-wider">
                  Features
                </th>
                <th className="p-3 sm:p-4 text-center text-xs sm:text-sm font-semibold text-neutral-700 uppercase tracking-wider">
                  AlGrowthexa
                </th>
                <th className="p-3 sm:p-4 text-center text-xs sm:text-sm font-semibold text-neutral-700 uppercase tracking-wider">
                  Other Agencies
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {comparisonData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="p-3 sm:p-4 text-sm sm:text-base text-neutral-800 font-medium">
                    {item.feature}
                  </td>
                  <td className="p-3 sm:p-4 text-center">
                    <span className="text-green-600 text-lg sm:text-xl">
                      <FaCheck className="inline" />
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 text-center">
                    <span className="text-red-500 text-lg sm:text-xl">
                      <FaTimes className="inline" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Hint for horizontal scroll on very small screens (optional) */}
        <p className="text-xs text-neutral-500 text-center mt-2 sm:hidden">
          Swipe to see full comparison →
        </p>

        {/* <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-lg sm:text-xl md:text-2xl font-light text-neutral-700 mt-10 sm:mt-12 max-w-3xl mx-auto italic border-l-4 border-primary-500 pl-4"
        >
          "Doctors trust AlGrowthexa because we understand healthcare marketing."
        </motion.p> */}
      </div>
    </section>
  );
};

export default ComparisonTable;
