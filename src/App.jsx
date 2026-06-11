import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import WhyChooseUs from './components/WhyChooseUs';
import Admission from './components/Admission';
import Placement from './components/Placement';
import Facilities from './components/Facilities';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import InquiryModal from './components/InquiryModal';
import Chatbot from './components/Chatbot';
import ApplyPage from './components/ApplyPage';
import AdminPanel from './components/AdminPanel';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isApplyPage = currentPath.startsWith('/apply');
  const isAdminPage = currentPath.startsWith('/admin');

  // Scroll to target hash on load (e.g. returning to /#courses from /apply)
  useEffect(() => {
    if (!isApplyPage && !isAdminPage && currentHash && currentHash !== '#') {
      const elementId = currentHash.replace('#', '').split('?')[0];
      const element = document.getElementById(elementId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [currentPath, currentHash, isApplyPage, isAdminPage]);

  // Handle auto-scrolling to top on portal page entries
  useEffect(() => {
    if (isApplyPage || isAdminPage) {
      window.scrollTo(0, 0);
    }
  }, [isApplyPage, isAdminPage]);

  return (
    <>
      {/* Premium preloader screen */}
      <LoadingScreen />

      {/* Floating actions & Widgets */}
      {!isAdminPage && <WhatsAppFloat />}
      {!isApplyPage && !isAdminPage && <InquiryModal />}
      {!isAdminPage && <Chatbot />}

      {/* Sticky Main Navbar */}
      {!isAdminPage && <Navbar />}
      
      {isAdminPage ? (
        <AdminPanel />
      ) : isApplyPage ? (
        <ApplyPage hash={window.location.search || ''} />
      ) : (
        <main>
          <Hero />
          <About />
          <Courses />
          <WhyChooseUs />
          <Admission />
          <Placement />
          <Facilities />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
      )}

      {/* Footer */}
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
