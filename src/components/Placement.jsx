import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldAlert, Award, Hospital, Compass, HeartHandshake } from 'lucide-react';

function StatCounter({ value, duration = 1.2, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const end = parseInt(value, 10);
      if (isNaN(end)) return;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Placement() {
  const stats = [
    {
      value: '100',
      suffix: '%',
      title: 'Placement Assistance',
      desc: 'Complete coaching, corporate hospital tie-ups, and resume assistance.',
      icon: <Award size={28} />
    },
    {
      value: '70',
      suffix: '+',
      title: 'Govt Training Hospitals',
      desc: 'Hands-on training inside registered large-scale municipal and government hospital networks.',
      icon: <Hospital size={28} />
    },
    {
      value: '500',
      suffix: '+',
      title: 'Alumni Careers',
      desc: 'Graduated students placed successfully in clinical and para-medical professions.',
      icon: <Compass size={28} />
    },
    {
      value: '100',
      suffix: '%',
      title: 'Paid Practical Internships',
      desc: 'Gain real clinical skills while earning monthly stipends / training salary.',
      icon: <HeartHandshake size={28} />
    }
  ];

  return (
    <section id="placements" className="section section-bg">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="tag">Placements & Career</span>
          <h2>Build a Globally Respected Healthcare Career</h2>
          <p>
            Our placement cells help prepare you for direct jobs in local hospitals, corporate medical groups, and government clinics, with pathways for overseas jobs.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid-4" style={{ marginBottom: '50px' }}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card"
              style={{
                padding: '30px 24px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {stat.icon}
              </div>

              {/* Counter Display */}
              <div 
                style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 800, 
                  color: 'var(--primary)',
                  lineHeight: 1.1
                }}
              >
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {stat.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Placement Callout box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel"
          style={{
            padding: '32px',
            borderRadius: 'var(--radius-lg)',
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
            gap: '30px',
            alignItems: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}
          className="placement-cta-panel"
        >
          <div 
            style={{
              backgroundColor: 'var(--primary-light)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}
          >
            <Award size={64} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', fontWeight: 800 }}>
              Global Certification & Career Recognition
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Our diploma programs are structured under central government-recognized guidelines. This ensures your certification is recognized across all states of India, and provides eligibility for overseas employment boards in countries like Qatar, UAE, Saudi Arabia, UK, and beyond.
            </p>
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .placement-cta-panel {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 20px !important;
          }
          .placement-cta-panel div:first-child {
            max-width: 120px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
