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
          }, 250); // Small pause at 100% for smooth exit
          return 100;
        }
        // Increment by random steps (between 6% and 18%) for a realistic feel
        const increment = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 100);

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
            scale: 1.04,
            filter: 'blur(8px)',
            transition: { duration: 0.55, ease: 'easeInOut' }
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
          }}
        >
          {/* Main loader design */}
          <div style={{ textAlign: 'center', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Concentric Logo Frame with pulsing rings */}
            <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '28px' }}>
              {/* Radiating Ring 1 */}
              <motion.div
                animate={{ scale: [1, 1.45, 1], opacity: [0.35, 0, 0.35] }}
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
                animate={{ scale: [1, 1.7, 1], opacity: [0.18, 0, 0.18] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: '50%',
                  border: '1.5px solid var(--primary)',
                  pointerEvents: 'none'
                }}
              />
              
              {/* Main Logo Container */}
              <motion.div
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '3px solid var(--primary)',
                  padding: '10px',
                  boxShadow: '0 8px 30px rgba(10, 102, 194, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <motion.img
                  src="/logo.png"
                  alt="College Logo"
                  animate={{ rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: '90%',
                    height: '90%',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div style="font-weight:900;color:var(--primary);font-size:1.5rem">IJ</div>';
                  }}
                />
              </motion.div>
            </div>

            {/* Typography brand names */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
              style={{ 
                fontSize: '1.8rem', 
                color: 'var(--text-primary)',
                fontWeight: 800,
                marginBottom: '4px',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase'
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
