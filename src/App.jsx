import React from 'react';
import MainLayout from './components/layouts/MainLayout';

import Hero from './components/sections/Hero';
import TrustStats from './components/sections/TrustStats';
import Services from './components/sections/Services';
import Screenshots from './components/sections/Screenshots';
import Companies from './components/sections/Companies';
import Awards from './components/sections/Awards';
import About from './components/sections/About';
import Founder from './components/sections/Founder';
import Testimonials from './components/sections/Testimonials';
import LeadForm from './components/sections/LeadForm';
import FAQ from './components/sections/FAQ';
import CaseStudies from './components/sections/CaseStudies';
import ComparisonTable from './components/sections/ComparisonTable';
import WhyChoose from './components/sections/WhyChoose';

function App() {
  return (
    <MainLayout>

      <section id="hme"><Hero /></section>
      <section id="tst"><TrustStats /></section>
      <section id="why"><WhyChoose /></section>
      <section id="svc"><Services /></section>
      <section id="scs"><Screenshots /></section>
      <section id="cmp"><Companies /></section>
      <section id="awd"><Awards /></section>
      <section id="abt"><About /></section>
      <section id="fdr"><Founder /></section>
      <section id="tml"><Testimonials /></section>
      <section id="cns"><LeadForm /></section>
      <section id="faq"><FAQ /></section>
      <section id="cst"><CaseStudies /></section>
      <section id="cpr"><ComparisonTable /></section>
    </MainLayout>
  );
}

export default App;
