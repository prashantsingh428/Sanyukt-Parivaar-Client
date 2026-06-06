import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import WhatsAppFloat from '../common/WhatsAppFloat';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default MainLayout;