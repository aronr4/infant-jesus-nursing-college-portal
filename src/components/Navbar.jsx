import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchOverlay from './SearchOverlay';

const tickerItems = [
  '🏥 Hospital Internship Every 3 Months',
  '🏆 Training in Government Recognized Hospitals',
  '🏠 Free Hostel Facilities for All Students',
  '🩺 DFPN | DMLT | X-Ray | DOT | DIP Courses',
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const isProgrammaticScroll = useRef(false);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    isProgrammaticScroll.current = true;
    
    // Update page title immediately
    if (!window.location.hash.startsWith('#apply')) {
      if (sectionId === 'home') {
        document.title = "Infant Jesus Nursing College | Kalayarkovil | Free Hostel | Govt Approved";
      } else {
        const rawTitle = sectionId.replace(/-/g, ' ');
        const title = rawTitle.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        document.title = `${title} | Infant Jesus Nursing College`;
      }
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 850);
  };

  // Active section scroll spy
  useEffect(() => {
    // List of page sections on homepage
    const sections = ['about', 'courses', 'why-choose-us', 'admissions', 'placements', 'facilities', 'faq', 'contact'];
    
    // Fallback if none is active (e.g. at the top of the page)
    const handleScrollTitle = () => {
      if (isProgrammaticScroll.current) return;
      if (window.scrollY < 150 && !window.location.hash.startsWith('#apply')) {
        setActiveSection('home');
        document.title = "Infant Jesus Nursing College | Kalayarkovil | Free Hostel | Govt Approved";
      }
    };
    window.addEventListener('scroll', handleScrollTitle);

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Trigger when section is in the upper middle
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      if (isProgrammaticScroll.current) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          
          // Update page title
          if (!window.location.hash.startsWith('#apply')) {
            const rawTitle = id.replace(/-/g, ' ');
            const title = rawTitle.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            document.title = `${title} | Infant Jesus Nursing College`;
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScrollTitle);
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Open search with Ctrl+K shortcut
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const menuItems = [
    { label: 'About', href: '#about' },
    { label: 'Courses', href: '#courses' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Admissions', href: '#admissions' },
    { label: 'Placements', href: '#placements' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const allTickers = [...tickerItems, ...tickerItems];

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Auto-Scrolling Ticker Bar */}
      <div
        style={{
          backgroundColor: 'var(--primary)',
          color: '#FFFFFF',
          fontSize: '0.82rem',
          padding: '7px 0',
          overflow: 'hidden',
          display: isScrolled ? 'none' : 'block',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          whiteSpace: 'nowrap',
        }}
      >
        <div className="ticker-track">
          {allTickers.map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-dot">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className="glass-panel"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          transition: 'all 0.3s ease',
          padding: isScrolled ? '10px 0' : '14px 0',
          borderBottom: '1px solid var(--border)',
          boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* Logo Brand */}
          <a 
            href="#" 
            onClick={(e) => {
              if (window.location.hash.startsWith('#apply')) {
                window.location.hash = '#';
              } else {
                e.preventDefault();
                handleNavClick('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', textDecoration: 'none' }}
          >
            <div 
              style={{
                position: 'relative',
                width: isScrolled ? '50px' : '62px',
                height: isScrolled ? '50px' : '62px',
                flexShrink: 0,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2.5px solid var(--primary)',
                boxShadow: '0 2px 10px rgba(10,102,194,0.2)',
                backgroundColor: '#fff',
                transition: 'all 0.3s ease'
              }}
              className="brand-logo-frame"
            >
              <img
                src="/logo.png"
                alt="Infant Jesus Nursing College Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  transform: 'scale(1.08)'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--primary);color:#fff;font-weight:800;font-size:1.2rem">IJ</div>';
                }}
              />
            </div>
            <div className="brand-text-frame">
              <div style={{ fontWeight: 800, fontSize: '1.1rem', lineHeight: '1.1', color: 'var(--text-primary)' }}>
                INFANT JESUS
              </div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.06em' }} className="brand-text-subtitle">
                NURSING COLLEGE
              </div>
            </div>
          </a>

          {/* Desktop Menu */}
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {menuItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId && !window.location.hash.startsWith('#apply');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavClick(sectionId)}
                  style={{
                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 600,
                    fontSize: '0.925rem',
                    position: 'relative',
                    padding: '6px 0',
                    transition: 'color 0.25s ease'
                  }}
                  className={`nav-link-hover ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--primary)'
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              title="Search (Ctrl+K)"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}
              className="search-btn"
            >
              <Search size={18} color="var(--primary)" />
            </button>

            {/* Apply Now CTA */}
            <a
              href="#apply"
              className="btn btn-primary desktop-only"
              style={{ padding: '10px 20px', fontSize: '0.875rem' }}
            >
              Apply Now
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-only-btn"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)'
              }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              backgroundColor: 'var(--bg-primary)',
              borderBottom: '1px solid var(--border)',
              padding: '20px 24px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              zIndex: 999
            }}
          >
            {/* Mobile Search */}
            <button
              onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 14px', borderRadius: '8px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                cursor: 'pointer', color: 'var(--text-secondary)',
                fontSize: '0.9rem', fontWeight: 500, width: '100%'
              }}
            >
              <Search size={16} color="var(--primary)" /> Search the website...
            </button>

            {menuItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId && !window.location.hash.startsWith('#apply');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => { setIsMobileMenuOpen(false); handleNavClick(sectionId); }}
                  style={{
                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 600,
                    fontSize: '1rem',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--bg-secondary)',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#apply"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '8px' }}
            >
              Apply Now
            </a>
          </div>
        )}
      </header>

      <style>{`
        .ticker-track {
          display: inline-flex;
          animation: ticker-scroll 35s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0 28px;
          font-weight: 600;
          white-space: nowrap;
        }
        .ticker-dot { font-size: 0.4rem; opacity: 0.5; margin-left: 28px; }
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 991px) {
          .desktop-only { display: none !important; }
          .mobile-only-btn { display: flex !important; }
          .search-btn-text { display: none; }
          .search-shortcut { display: none; }
          .search-btn { padding: 8px 10px !important; }
        }
        @media (max-width: 480px) {
          .brand-logo-frame {
            width: 42px !important;
            height: 42px !important;
            border-width: 2px !important;
          }
          .brand-text-frame div:first-child {
            font-size: 0.95rem !important;
          }
          .brand-text-subtitle {
            font-size: 0.58rem !important;
            letter-spacing: 0.04em !important;
          }
        }
        @media (max-width: 360px) {
          .brand-text-subtitle {
            display: none !important;
          }
        }
        .nav-link-hover:hover { color: var(--primary) !important; }
        .search-btn:hover {
          border-color: var(--primary) !important;
          color: var(--primary) !important;
        }
      `}</style>
    </>
  );
}
