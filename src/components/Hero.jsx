import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Home, Stethoscope, ArrowRight } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const badges = [
    { icon: <Award size={20} />, text: '100% Job Opportunity Assistance' },
    { icon: <Home size={20} />, text: 'Free Hostel Facilities' },
    { icon: <Stethoscope size={20} />, text: 'Hospital Training with Salary' },
    { icon: <ShieldCheck size={20} />, text: 'Government Approved' },
  ];

  return (
    <section 
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 0',
        background: 'linear-gradient(180deg, rgba(10, 102, 194, 0.04) 0%, rgba(255, 255, 255, 0) 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Blur Backgrounds */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10, 102, 194, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(18, 164, 182, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid-2">
          {/* Left Column: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Admissions tag */}
            <motion.div 
              variants={itemVariants}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                alignSelf: 'flex-start',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                padding: '6px 14px',
                borderRadius: '50px',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%', animation: 'ping 1.5s infinite' }} />
              Admissions Open 2025–2026
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              style={{ 
                fontSize: 'calc(2.2rem + 1.5vw)', 
                lineHeight: '1.15', 
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: 0
              }}
            >
              Infant Jesus <br />
              <span style={{ 
                background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Nursing College
              </span>
            </motion.h1>

            {/* Sub-heading */}
            <motion.h2 
              variants={itemVariants}
              style={{ 
                fontSize: '1.5rem', 
                fontWeight: 600, 
                color: 'var(--primary)', 
                margin: 0,
                fontStyle: 'italic'
              }}
            >
              "A College with Free Hostel Facilities"
            </motion.h2>

            {/* Supporting description */}
            <motion.p 
              variants={itemVariants}
              style={{ 
                fontSize: '1.05rem', 
                color: 'var(--text-secondary)', 
                lineHeight: '1.6',
                margin: 0,
                maxWidth: '560px'
              }}
            >
              Build your career in healthcare with hands-on clinical training, government-recognized certification, and 100% placement support. Learn from nursing professionals and secure your future.
            </motion.p>

            {/* Actions */}
            <motion.div 
              variants={itemVariants}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}
            >
              <a href="/apply" className="btn btn-primary" style={{ padding: '14px 32px' }}>
                Apply Now <ArrowRight size={18} />
              </a>
              <a href="#courses" className="btn btn-secondary" style={{ padding: '14px 32px' }}>
                Explore Courses
              </a>
            </motion.div>

            {/* Trust Badges Grid */}
            <motion.div 
              variants={itemVariants}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '16px', 
                marginTop: '16px',
                borderTop: '1px solid var(--border)',
                paddingTop: '24px'
              }}
              className="trust-badges-grid"
            >
              {badges.map((badge, index) => (
                <div 
                  key={index}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    color: 'var(--text-primary)'
                  }}
                >
                  <div 
                    style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--primary-light)', 
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {badge.icon}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image with widgets */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.25, delay: 0.4 }}
            style={{ 
              position: 'relative', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
          >
            {/* Image frame */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '450px',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '6px solid var(--bg-primary)',
                aspectRatio: '4/5'
              }}
            >
              <img 
                src="/nursing_hero.png" 
                alt="Nursing Student"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />
              {/* Overlay gradient */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to top, rgba(10, 102, 194, 0.2) 0%, rgba(255, 255, 255, 0) 50%)'
                }}
              />
            </div>

            {/* Float Badge 1: Placement assistance */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="glass-panel"
              style={{
                position: 'absolute',
                left: '-20px',
                top: '20%',
                padding: '12px 20px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyCenter: 'center', padding: '6px' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', lineHeight: '1.2' }}>100%</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Placement Support</div>
              </div>
            </motion.div>

            {/* Float Badge 2: Training salary */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 2 }}
              className="glass-panel"
              style={{
                position: 'absolute',
                right: '-10px',
                bottom: '20%',
                padding: '12px 20px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyCenter: 'center', padding: '6px' }}>
                <Stethoscope size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.2' }}>Paid training</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Hospital Stipend</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @media (max-width: 768px) {
          .trust-badges-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
