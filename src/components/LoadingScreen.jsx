import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading/rendering buffer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
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
          }}
        >
          {/* Main loader design */}
          <div style={{ textAlign: 'center', padding: '20px' }}>
            {/* Heartbeat pulse container */}
            <div 
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto 24px auto',
              }}
              className="animate-pulse"
            >
              {/* EKG / Heartbeat SVG path pulsing */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 100 100" 
                width="60" 
                height="60" 
                fill="none" 
                stroke="var(--primary)" 
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-heartbeat"
              >
                <path d="M10 50 H30 L38 25 L48 75 L56 42 L62 58 L68 50 H90" />
              </svg>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ 
                fontSize: '1.75rem', 
                color: 'var(--text-primary)',
                fontWeight: 800,
                marginBottom: '8px',
                letterSpacing: '-0.02em'
              }}
            >
              INFANT JESUS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ 
                color: 'var(--primary)', 
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em'
              }}
            >
              Nursing & Paramedical College
            </motion.p>

            {/* Small loading line */}
            <div style={{ 
              width: '120px', 
              height: '3px', 
              backgroundColor: 'var(--border)', 
              borderRadius: '2px',
              margin: '24px auto 0 auto',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.2, 
                  ease: 'easeInOut' 
                }}
                style={{ 
                  position: 'absolute',
                  width: '50%',
                  height: '100%',
                  backgroundColor: 'var(--primary)',
                  borderRadius: '2px'
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
