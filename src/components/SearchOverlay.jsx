import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

const searchData = [
  // Courses
  { title: 'DFPN – Diploma in Nursing', desc: 'Foundation nursing program with hospital training and salary stipend.', href: '#courses', tags: ['dfpn', 'nursing', 'diploma', 'course'], icon: '🎓' },
  { title: 'DMLT – Diploma in Medical Lab Technology', desc: 'Learn clinical lab techniques including blood testing and analysis.', href: '#courses', tags: ['dmlt', 'lab', 'medical', 'laboratory', 'course'], icon: '🔬' },
  { title: 'X-Ray – Radiology Technology', desc: 'Imaging and X-ray technology program with hands-on hospital training.', href: '#courses', tags: ['x-ray', 'xray', 'radiology', 'imaging', 'course'], icon: '🩻' },
  { title: 'DOT – Operation Theatre Technology', desc: 'Operation theatre assistance training with real-time surgical exposure.', href: '#courses', tags: ['dot', 'operation', 'theatre', 'surgery', 'course'], icon: '🏥' },
  { title: 'DIP – Diploma in Pharmacy', desc: 'Pharmacy science program covering medicine preparation and dispensing.', href: '#courses', tags: ['dip', 'pharmacy', 'medicine', 'course'], icon: '💊' },

  // Features
  { title: 'Free Hostel Facilities', desc: 'Free accommodation provided to all enrolled students on campus.', href: '#facilities', tags: ['hostel', 'free', 'accommodation', 'stay', 'room'], icon: '🏠' },
  { title: 'Hospital Training with Salary', desc: 'Students receive monthly salary stipend during hospital internship training.', href: '#facilities', tags: ['salary', 'training', 'hospital', 'stipend', 'paid', 'internship'], icon: '💰' },
  { title: 'Hospital Internship Every 3 Months', desc: 'Hands-on clinical experience at government hospitals every 3 months.', href: '#facilities', tags: ['internship', '3 months', 'clinical', 'hospital', 'training'], icon: '🏥' },
  { title: 'Government Approved College', desc: 'Infant Jesus is a government recognized institution. Reg. No: 2605.', href: '#about', tags: ['government', 'approved', 'recognized', 'reg', 'certificate'], icon: '🎖️' },
  { title: 'Free Uniform Provided', desc: 'All students receive official college uniforms at no cost.', href: '#facilities', tags: ['uniform', 'free', 'dress'], icon: '👗' },
  { title: '100% Placement Assistance', desc: 'Dedicated placement cell helping students find jobs in top hospitals.', href: '#placements', tags: ['placement', 'job', '100%', 'career', 'employment'], icon: '✅' },
  { title: 'Overseas Employment Guidance', desc: 'Guidance and support for international nursing job opportunities.', href: '#placements', tags: ['overseas', 'abroad', 'international', 'gulf', 'foreign', 'employment'], icon: '🌍' },

  // Sections
  { title: 'About the College', desc: 'Learn about Infant Jesus Nursing College – our mission, vision and values.', href: '#about', tags: ['about', 'college', 'infant jesus', 'history', 'info'], icon: '📖' },
  { title: 'Admission Process', desc: 'Step-by-step guide to apply for admission at Infant Jesus Nursing College.', href: '#admissions', tags: ['admission', 'apply', 'enroll', 'register', 'join', 'eligibility'], icon: '📋' },
  { title: 'Eligibility for Admission', desc: '12th pass or fail from any stream, or any degree holder can apply.', href: '#admissions', tags: ['eligibility', '12th', 'fail', 'degree', 'qualification', 'who can apply'], icon: '✔️' },
  { title: 'Contact Us', desc: 'Get in touch with our admissions office. Call or WhatsApp us.', href: '#contact', tags: ['contact', 'phone', 'call', 'whatsapp', 'address', 'location'], icon: '📞' },
  { title: 'College Location', desc: 'Raj Complex, Kallal Road, Kalayarkovil, Sivaganga District, Tamil Nadu.', href: '#contact', tags: ['location', 'address', 'kalayarkovil', 'sivaganga', 'map', 'direction'], icon: '📍' },
  { title: 'Frequently Asked Questions', desc: 'Common questions about courses, fees, hostel, admission and placement.', href: '#faq', tags: ['faq', 'question', 'doubt', 'fees', 'cost', 'duration'], icon: '❓' },
  { title: 'Why Choose Us', desc: 'Reasons to choose Infant Jesus – quality education, free hostel, salary training.', href: '#why-choose-us', tags: ['why', 'choose', 'benefits', 'advantage', 'best'], icon: '⭐' },
  { title: 'Facilities', desc: 'Modern labs, hostel, library, and hospital tie-ups for students.', href: '#facilities', tags: ['facilities', 'lab', 'library', 'campus', 'infrastructure'], icon: '🏗️' },
  { title: 'Testimonials & Student Reviews', desc: 'Read success stories and reviews from our alumni and current students.', href: '#testimonials', tags: ['testimonial', 'review', 'student', 'feedback', 'experience'], icon: '💬' },
  { title: 'Fee Structure', desc: 'Affordable fees with easy installment options. No hidden charges.', href: '#courses', tags: ['fee', 'cost', 'installment', 'price', 'affordable', 'payment'], icon: '💳' },
];

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSearch = (q) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }
    const lower = q.toLowerCase();
    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(lower) ||
      item.desc.toLowerCase().includes(lower) ||
      item.tags.some(t => t.includes(lower))
    );
    setResults(filtered);
  };

  const handleResultClick = (href) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 16px 16px',
        animation: 'fadeIn 0.18s ease'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '620px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          animation: 'slideDown 0.2s ease'
        }}
      >
        {/* Search Input Row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)'
        }}>
          <Search size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search courses, hostel, admission, fees..."
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: '1rem', fontWeight: 500,
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
            }}
          />
          {query && (
            <button onClick={() => handleSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'flex' }}>
              <X size={18} />
            </button>
          )}
          <button onClick={onClose} style={{
            background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--text-secondary)',
            display: 'flex', alignItems: 'center', padding: '4px'
          }}>
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
          {!query && (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.9rem' }}>
              <Search size={40} style={{ opacity: 0.15, display: 'block', margin: '0 auto 12px' }} />
              Start typing to search...
            </div>
          )}

          {query && results.length === 0 && (
            <div style={{ padding: '28px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              No results found for <strong>"{query}"</strong>.<br />
              Try different keywords like course names, hostel, or fees.
            </div>
          )}

          {results.map((item, i) => (
            <button
              key={i}
              onClick={() => handleResultClick(item.href)}
              style={{
                width: '100%', textAlign: 'left', background: 'none',
                border: 'none', borderBottom: '1px solid var(--border)',
                padding: '14px 20px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '14px',
                transition: 'background 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '3px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.desc}
                </div>
              </div>
              <ArrowRight size={16} color="var(--primary)" style={{ flexShrink: 0, opacity: 0.6 }} />
            </button>
          ))}

          {results.length > 0 && (
            <div style={{ padding: '10px 20px', fontSize: '0.78rem', color: 'var(--text-light)', textAlign: 'right' }}>
              {results.length} result{results.length > 1 ? 's' : ''} found
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideDown { from { transform: translateY(-16px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}
