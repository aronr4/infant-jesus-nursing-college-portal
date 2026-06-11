import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress smoothly to simulate active file caching
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const exitTimer = setTimeout(() => {
            setLoading(false);
          }, 300); // Small pause at 100% for smooth exit
          return 100;
        }
        // Increment by random steps (between 5% and 15%) for a realistic feel
        const increment = Math.floor(Math.random() * 10) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 90);

    return () => {
      clearInterval(interval);
    };
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
          {/* Floating Ambient Sparkles/Particles */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}>
            {[...Array(12)].map((_, i) => {
              const size = Math.random() * 4 + 3;
              const delay = Math.random() * 1.5;
              const duration = Math.random() * 2.5 + 2.5;
              const xOffset = (Math.random() - 0.5) * 320;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: '60vh', x: xOffset }}
                  animate={{ 
                    opacity: [0, 0.65, 0], 
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
                animate={{ scale: [1, 1.45, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
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
                animate={{ scale: [1, 1.75, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: '50%',
                  border: '1.5px solid var(--primary)',
                  pointerEvents: 'none'
                }}
              />

              {/* High-Tech Spinning Dashed Outer Border Tracker */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  right: '-8px',
                  bottom: '-8px',
                  borderRadius: '50%',
                  border: '2px dashed var(--primary)',
                  opacity: 0.7,
                  pointerEvents: 'none'
                }}
              />
              
              {/* Main Logo Container (Slow Breathing scale loop) */}
              <motion.div
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.04, 1], 
                  opacity: 1 
                }}
                transition={{ 
                  initial: { type: 'spring', stiffness: 100, damping: 10 },
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '3px solid var(--primary)',
                  padding: '10px',
                  boxShadow: '0 10px 35px rgba(10, 102, 194, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* Logo Image */}
                <div style={{ position: 'relative', width: '90%', height: '90%', overflow: 'hidden', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.img
                    src="/logo.png"
                    alt="College Logo"
                    animate={{ rotate: [0, 4, -4, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      zIndex: 1
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div style="font-weight:900;color:var(--primary);font-size:1.5rem">IJ</div>';
                    }}
                  />
                  
                  {/* Premium Diagonal Glint Shimmer Overlay */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%)',
                      zIndex: 2,
                      animation: 'logo-glint 2s infinite linear',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Typography brand names (Metallic shining text-sweep) */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
              style={{ 
                fontSize: '1.9rem', 
                fontWeight: 900,
                marginBottom: '4px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg, var(--text-primary) 0%, var(--primary) 50%, var(--text-primary) 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'text-sweep 2.8s infinite linear'
              }}
            >
              INFANT JESUS
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              style={{ 
                color: 'var(--primary)', 
                fontSize: '0.85rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                marginBottom: '32px'
              }}
            >
              Nursing &amp; Paramedical College
            </motion.p>

            {/* Elegant Progress bar & Loading metadata */}
            <div style={{ width: '220px' }}>
              <div style={{ 
                width: '100%', 
                height: '4px', 
                backgroundColor: 'var(--border)', 
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <motion.div 
                  style={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginTop: '10px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--text-light)',
                letterSpacing: '0.04em'
              }}>
                <span>INITIALIZING INTERFACE</span>
                <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{progress}%</span>
              </div>
            </div>
            
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
