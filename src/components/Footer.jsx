import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{
        backgroundColor: '#0F172A',
        color: '#94A3B8',
        padding: '80px 0 30px 0',
        borderTop: '1px solid #1E293B',
        fontSize: '0.9rem'
      }}
    >
      <div className="container">
        
        {/* Upper footer grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr 1.2fr 1.8fr', 
            gap: '40px',
            marginBottom: '60px'
          }}
          className="footer-grid"
        >
          
          {/* Column 1: Branding */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#FFFFFF' }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img
                  src="/logo.png"
                  alt="Infant Jesus Nursing College Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    display: 'block',
                    imageRendering: '-webkit-optimize-contrast',
                    imageRendering: 'crisp-edges'
                  }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
                  INFANT JESUS
                </h4>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.05em' }}>
                  NURSING COLLEGE · KALAYARKOVIL
                </div>
              </div>
            </a>
            <p style={{ lineHeight: '1.6', margin: 0 }}>
              Preparing skilled nursing professionals and paramedics for global careers since inception. We build clinical confidence combined with hospital-level practical work.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E2E8F0', fontSize: '0.8rem', fontWeight: 600 }}>
              <ShieldCheck size={16} color="var(--primary)" /> Govt India Approved Reg No: 2605
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['About Us', 'Why Choose Us', 'Facilities', 'Admissions', 'Contact Us'].map((item) => {
                const href = `#${item.toLowerCase().replace(/ /g, '-')}`;
                return (
                  <li key={item}>
                    <a href={href} style={{ color: '#94A3B8', transition: 'all 0.2s' }} className="footer-link-hover">
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Courses */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>
              Our Courses
            </h4>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'DFPN - Nursing', href: '#courses' },
                { name: 'DMLT - Lab Tech', href: '#courses' },
                { name: 'X-Ray - Imaging', href: '#courses' },
                { name: 'DOT - Operation Theatre', href: '#courses' },
                { name: 'DIP - Pharmacy', href: '#courses' }
              ].map((course) => (
                <li key={course.name}>
                  <a href={course.href} style={{ color: '#94A3B8', transition: 'all 0.2s' }} className="footer-link-hover">
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>
              Admissions Office
            </h4>
            <p style={{ lineHeight: '1.5', marginBottom: '16px', color: '#94A3B8' }}>
              Raj Complex, Near Venkateswara Theater,<br />
              Kallal Road, Kalayarkovil,<br />
              Sivaganga District, Tamil Nadu
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ color: '#FFFFFF', fontWeight: 700 }}>Helplines:</div>
              <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.85rem', marginBottom: '8px' }}>
                <span>+91 9159417945</span>
                <span>+91 9585417945</span>
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 700 }}>Email ID:</div>
              <a href="mailto:admission.infantjesusnursing@gmail.com" style={{ color: '#94A3B8', fontSize: '0.85rem', textDecoration: 'none' }} className="footer-link-hover">
                admission.infantjesusnursing@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Lower footer: Divider, Socials, and Copyright */}
        <div 
          style={{
            borderTop: '1px solid #1E293B',
            paddingTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span>&copy; {currentYear} Infant Jesus Nursing College. All rights reserved.</span>
            <span style={{ color: '#334155' }}>|</span>
            <a href="/admin" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }} className="footer-link-hover">Staff Portal</a>
          </div>
          
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { 
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                ), 
                href: '#' 
              },
              { 
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                ), 
                href: '#' 
              },
              { 
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                ), 
                href: '#' 
              },
              { 
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                ), 
                href: '#' 
              }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#1E293B',
                  color: '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                className="social-icon-hover"
                aria-label="Social Link"
              >
                {social.icon}
              </a>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .footer-link-hover:hover {
          color: var(--primary) !important;
          padding-left: 4px;
        }
        .social-icon-hover:hover {
          background-color: var(--primary) !important;
          color: #FFFFFF !important;
          transform: translateY(-2px);
        }
        @media (max-width: 991px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </footer>
  );
}
