import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Beaker, Stethoscope, BookOpen, MonitorPlay, HeartHandshake, Eye, X } from 'lucide-react';

export default function Facilities() {
  const [activePhoto, setActivePhoto] = useState(null);

  const facilitiesList = [
    {
      title: 'Hospital Training',
      icon: <Stethoscope size={24} />,
      img: '/facility_hospital.jpg',
      desc: 'Real-world clinical immersion with salary/stipend inside active government-approved wards.'
    },
    {
      title: 'Practical Laboratories',
      icon: <Beaker size={24} />,
      img: '/facility_practical.jpg',
      desc: 'Advanced simulators, anatomy models, and equipment to conduct precise diagnostic practice.'
    },
    {
      title: 'Academic Library',
      icon: <BookOpen size={24} />,
      img: '/facility_library.jpg',
      desc: 'Huge collections of nursing papers, textbooks, medical journals, and digital research workstations.'
    },
    {
      title: 'Free Hostel Facilities',
      icon: <Home size={24} />,
      img: '/facility_hostel.webp',
      desc: 'Comfortable, safe, and completely free living spaces equipped with study rooms and quality dining.'
    },
  ];

  return (
    <section id="facilities" className="section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="tag">Campus Life</span>
          <h2>Modern Facilities Supporting Your Journey</h2>
          <p>
            Infant Jesus Nursing College provides an environment equipped with modern learning tools and accommodation support to make learning smooth.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid-3">
          {facilitiesList.map((facility, index) => {
            const hasImage = !!facility.img;
            return (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '380px',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                {/* Upper Section: Image or Gradient Header */}
                {hasImage ? (
                  <div 
                    style={{ 
                      position: 'relative', 
                      height: '200px', 
                      overflow: 'hidden',
                      backgroundColor: 'var(--primary-light)'
                    }}
                    className="facility-img-container"
                  >
                    <img 
                      src={facility.img} 
                      alt={facility.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      className="facility-img"
                    />
                    {/* Dark/Blue tint hover */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(10, 102, 194, 0.15)',
                        opacity: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'opacity 0.3s ease'
                      }}
                      className="facility-img-overlay"
                      onClick={() => setActivePhoto(facility)}
                    >
                      <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '50%', color: 'var(--primary)', boxShadow: 'var(--shadow-md)', display: 'flex' }}>
                        <Eye size={20} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div 
                    style={{ 
                      height: '200px', 
                      background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF'
                    }}
                  >
                    {/* Glowing circular icon holder */}
                    <div 
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {facility.icon}
                    </div>
                  </div>
                )}

                {/* Lower Section: Card Details */}
                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {hasImage && <span style={{ color: 'var(--primary)' }}>{facility.icon}</span>}
                      {facility.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                      {facility.desc}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Photo Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: 'rgba(10, 15, 29, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 11000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {/* Click backdrop to close */}
            <div style={{ position: 'absolute', width: '100%', height: '100%' }} onClick={() => setActivePhoto(null)} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '700px',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border)',
                zIndex: 11001
              }}
            >
              <button 
                onClick={() => setActivePhoto(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(10, 15, 29, 0.5)',
                  border: 'none',
                  color: '#FFFFFF',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2
                }}
              >
                <X size={20} />
              </button>

              <img 
                src={activePhoto.img} 
                alt={activePhoto.title} 
                style={{ width: '100%', maxHeight: '450px', objectFit: 'cover', display: 'block' }}
              />

              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {activePhoto.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                  {activePhoto.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .facility-img-container:hover .facility-img {
          transform: scale(1.06);
        }
        .facility-img-container:hover .facility-img-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
