import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-dismiss loading screen after animations complete
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  // Lock scrolling while loading screen is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.6, ease: 'easeInOut' }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'var(--bg-primary)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Floating Ambient Sparkles */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}>
            {[...Array(10)].map((_, i) => {
              const size = Math.random() * 4 + 3;
              const delay = Math.random() * 1.5;
              const duration = Math.random() * 2.5 + 2.5;
              const xOffset = (Math.random() - 0.5) * 320;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: '60vh', x: xOffset }}
                  animate={{ 
                    opacity: [0, 0.6, 0], 
                    y: '-50vh',
                    x: xOffset + (Math.random() - 0.5) * 60
                  }}
                  transition={{ 
                    duration: duration,
                    repeat: Infinity,
                    delay: delay,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 0,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    boxShadow: '0 0 10px var(--primary), 0 0 20px var(--primary-light)',
                  }}
                />
              );
            })}
          </div>

          {/* Main loader design content */}
          <div style={{ textAlign: 'center', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
            
            {/* Concentric Logo Frame with pulsing rings */}
            <div style={{ position: 'relative', width: '130px', height: '130px', marginBottom: '32px' }}>
              
              {/* Radiating Ring 1 */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [1, 1.45, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: '50%',
                  border: '2.5px solid var(--primary-light)',
                  pointerEvents: 'none'
                }}
              />
              
              {/* Radiating Ring 2 */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [1, 1.75, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: '50%',
                  border: '1.5px solid var(--primary)',
                  pointerEvents: 'none'
                }}
              />

              {/* High-Tech Dashed Outer Border (Entry assembly from top) */}
              <motion.div
                initial={{ y: -120, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                transition={{ type: 'spring', stiffness: 90, damping: 12, delay: 0.4 }}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  right: '-8px',
                  bottom: '-8px',
                  width: '146px',
                  height: '146px',
                  pointerEvents: 'none'
                }}
              >
                {/* Spinning Loop */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '2px dashed var(--primary)'
                  }}
                />
              </motion.div>
              
              {/* Main Logo Container (Premium Spring & Spin Entry) */}
              <motion.div
                initial={{ scale: 0.1, rotate: -270, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 75, 
                  damping: 13, 
                  delay: 0.15 
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '3px solid var(--primary)',
                  padding: '10px',
                  boxShadow: '0 12px 40px rgba(10, 102, 194, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* Logo Image */}
                <div style={{ position: 'relative', width: '90%', height: '90%', overflow: 'hidden', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="/logo.png"
                    alt="College Logo"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain',
                      imageRendering: '-webkit-optimize-contrast',
                      imageRendering: 'crisp-edges'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div style="font-weight:900;color:var(--primary);font-size:1.5rem">IJ</div>';
                    }}
                  />
                  
                  {/* Premium Diagonal Glint Shimmer Overlay */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%)',
                      zIndex: 3,
                      animation: 'logo-glint 2s infinite linear 0.8s',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              </motion.div>

              {/* Snap Flash impact wave overlay */}
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.8, 2.3], opacity: [0, 0.95, 0] }}
                transition={{ duration: 0.85, delay: 0.7, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  boxShadow: '0 0 30px var(--primary), 0 0 60px var(--primary-light)',
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />
            </div>

            {/* Typography brand names (Deblurring and condensing letter-spacing) */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', overflow: 'hidden', height: '36px', marginBottom: '4px' }}>
              <motion.h2
                initial={{ y: 20, opacity: 0, filter: 'blur(8px)', letterSpacing: '0.25em' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)', letterSpacing: '0.04em' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                style={{ 
                  fontSize: '1.9rem', 
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, var(--text-primary) 0%, var(--primary) 50%, var(--text-primary) 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'text-sweep 2.8s infinite linear'
                }}
              >
                INFANT
              </motion.h2>
              <motion.h2
                initial={{ y: 20, opacity: 0, filter: 'blur(8px)', letterSpacing: '0.25em' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)', letterSpacing: '0.04em' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                style={{ 
                  fontSize: '1.9rem', 
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, var(--text-primary) 0%, var(--primary) 50%, var(--text-primary) 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'text-sweep 2.8s infinite linear'
                }}
              >
                JESUS
              </motion.h2>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.7, duration: 0.7, ease: 'easeOut' }}
              style={{ 
                color: 'var(--primary)', 
                fontSize: '0.85rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                marginBottom: '0px'
              }}
            >
              Nursing &amp; Paramedical College
            </motion.p>
          </div>
          
          {/* Keyframe animations injected */}
          <style>{`
            @keyframes logo-glint {
              0% { transform: translateX(-150%) skewX(-25deg); }
              100% { transform: translateX(150%) skewX(-25deg); }
            }
            @keyframes text-sweep {
              0% { background-position: 0% center; }
              100% { background-position: 200% center; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
