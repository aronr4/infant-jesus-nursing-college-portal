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
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#');
      // Scroll to top of the page when view changes
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);

    // Initial check on load
    if (window.location.hash.startsWith('#apply') || window.location.hash.startsWith('#admin')) {
      window.scrollTo(0, 0);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isApplyPage = currentHash.startsWith('#apply');
  const isAdminPage = currentHash.startsWith('#admin');
  const [wasApplyPage, setWasApplyPage] = useState(false);

  // Track if we were previously on the Apply page
  useEffect(() => {
    if (isApplyPage) {
      setWasApplyPage(true);
    }
  }, [isApplyPage]);

  // Handle smooth scrolling when navigating from Apply page back to a homepage section
  useEffect(() => {
    if (!isApplyPage && wasApplyPage && currentHash && currentHash !== '#') {
      const elementId = currentHash.replace('#', '').split('?')[0];
      const element = document.getElementById(elementId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          setWasApplyPage(false); // reset transition state
        }, 150);
        return () => clearTimeout(timer);
      }
    } else if (!isApplyPage && currentHash === '#') {
      setWasApplyPage(false); // reset if returning to top of home
    }
  }, [isApplyPage, currentHash, wasApplyPage]);

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
        <ApplyPage hash={currentHash} />
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
