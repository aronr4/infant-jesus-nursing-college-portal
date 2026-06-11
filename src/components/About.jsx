import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Stethoscope, Briefcase, HeartHandshake } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Users size={24} />,
      title: 'Experienced Faculty',
      desc: 'Learn from highly qualified nursing educators and clinical instructors dedicated to academic mentoring.'
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Modern Learning Environment',
      desc: 'Study in classrooms equipped with digital learning aids, smartboards, and resource-rich nursing libraries.'
    },
    {
      icon: <Stethoscope size={24} />,
      title: 'Practical Hospital Training',
      desc: 'Gain real clinical experience with hands-on practice in active wards and state-of-the-art simulation labs.'
    },
    {
      icon: <Briefcase size={24} />,
      title: 'Career Placement Support',
      desc: 'Benefit from our robust hospital network, recruitment drives, and professional interview coaching.'
    },
    {
      icon: <HeartHandshake size={24} />,
      title: 'Student-Centric Learning',
      desc: 'Engage in custom study circles, remedial programs, and structured skill building tailored to individual pace.'
    }
  ];

  return (
    <section id="about" className="section section-bg">
      <div className="container">
        <div className="grid-2">
          
          {/* Left Column: Text Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div className="section-header" style={{ textAlign: 'left', margin: 0 }}>
              <span className="tag">About Our College</span>
              <h2 style={{ fontSize: '2.5rem', marginTop: '12px' }}>
                Dedicated to Preparing Tomorrow's Healthcare Leaders
              </h2>
            </div>
            
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              Infant Jesus Nursing College is a premier healthcare education institution committed to delivering top-tier nursing and paramedical science training. We combine classroom excellence with deep practical hospital immersion.
            </p>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              Our mission is to empower student nurses with clinical confidence, technical expertise, and values of compassions and perseverance, ensuring they excel in both Indian and global healthcare environments.
            </p>

            {/* Visual key metrics display */}
            <div 
              style={{
                display: 'flex',
                gap: '24px',
                marginTop: '12px',
                borderLeft: '4px solid var(--primary)',
                paddingLeft: '20px'
              }}
            >
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', lineHeight: '1.2' }}>Govt</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Approved Institution</div>
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', lineHeight: '1.2' }}>100%</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)' }}>Practical Focus</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Features Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {features.map((feat, index) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card"
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  alignItems: 'flex-start'
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    borderRadius: 'var(--radius-sm)',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {feat.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
