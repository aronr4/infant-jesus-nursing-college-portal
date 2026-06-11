import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Beaker, Scan, Scissors, Pill, Clock, Award, ShieldCheck, X, ArrowRight } from 'lucide-react';

const coursesList = [
  {
    code: 'DFPN',
    name: 'Diploma in Nursing',
    icon: <Heart size={26} />,
    duration: '2 Years',
    training: 'Govt Hospital Internships',
    cert: 'Central Govt Approved',
    details: 'Comprehensive education in patient care, community nursing, first aid, maternal health, and pharmacology. Prepares graduates for clinical roles in private and government hospitals worldwide.',
    careers: ['Registered Staff Nurse', 'Community Health Worker', 'Home Care Supervisor', 'Nursing Assistant']
  },
  {
    code: 'DMLT',
    name: 'Diploma in Medical Laboratory Technology',
    icon: <Beaker size={26} />,
    duration: '2 Years',
    training: 'Diagnostic Lab Practical Work',
    cert: 'Govt Approved Certification',
    details: 'Hands-on training in blood banking, pathology, microbiology, clinical biochemistry, and immunology. Students learn to handle advanced diagnostic machinery and lab processes.',
    careers: ['Medical Lab Technician', 'Lab Quality Analyst', 'Research Assistant', 'Pathology Assistant']
  },
  {
    code: 'X-Ray',
    name: 'Imaging Technology',
    icon: <Scan size={26} />,
    duration: '2 Years',
    training: 'Radiology Clinic Internships',
    cert: 'Safety Compliant Certification',
    details: 'Deep training in radiography, medical physics, radiation safety, anatomy, CT/MRI operation, and imaging processing. Designed for rapid integration into hospital radiology departments.',
    careers: ['X-Ray Technician', 'CT Scan Specialist', 'MRI Technologist', 'Radiographer Assistant']
  },
  {
    code: 'DOT',
    name: 'Diploma in Operation Theatre Technology',
    icon: <Scissors size={26} />,
    duration: '2 Years',
    training: 'OT Clinical Internships',
    cert: 'Govt Approved Certification',
    details: 'Focuses on sterilization techniques, operation theatre setup, anesthesia equipment management, surgical assistance, and critical care protocols. Key role in hospital surgical teams.',
    careers: ['OT Technician', 'Anesthesia Assistant', 'Sterilization Lead', 'Critical Care Support']
  },
  {
    code: 'DIP',
    name: 'Diploma in Pharmacy',
    icon: <Pill size={26} />,
    duration: '2 Years',
    training: 'Pharmacy/Drug Store Training',
    cert: 'Central Govt Registered',
    details: 'Study of pharmaceutical chemistry, drug distribution, dispensing rules, healthcare ethics, and store management. Qualifies graduates for retail pharmacy operations and medical store roles.',
    careers: ['Hospital Pharmacist', 'Retail Chemist Store Manager', 'Pharmaceutical Representative', 'Medical Representative']
  }
];

function CourseModal({ course, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px'
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          onClick={e => e.stopPropagation()}
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: '20px',
            padding: '36px',
            maxWidth: '520px',
            width: '100%',
            boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
            border: '1px solid var(--border)',
            position: 'relative'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              width: '34px', height: '34px', borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{
              backgroundColor: 'var(--primary-light)', color: 'var(--primary)',
              width: '58px', height: '58px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              {course.icon}
            </div>
            <div>
              <span style={{
                fontSize: '0.72rem', fontWeight: 800,
                backgroundColor: 'var(--primary)', color: '#fff',
                padding: '3px 10px', borderRadius: '4px',
                display: 'inline-block', marginBottom: '6px'
              }}>{course.code}</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {course.name}
              </h3>
            </div>
          </div>

          {/* Info Badges */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '12px', marginBottom: '24px'
          }}>
            {[
              { icon: <Clock size={15} />, label: 'Duration', val: course.duration },
              { icon: <ShieldCheck size={15} />, label: 'Training', val: course.training },
              { icon: <Award size={15} />, label: 'Certificate', val: course.cert },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '8px',
                padding: '12px', borderRadius: '10px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                gridColumn: i === 2 ? '1 / -1' : 'auto'
              }}>
                <span style={{ color: 'var(--primary)', marginTop: '1px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Details */}
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '20px' }}>
            {course.details}
          </p>

          {/* Career Paths */}
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '10px', letterSpacing: '0.05em' }}>
              Career Paths
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {course.careers.map(career => (
                <span key={career} style={{
                  fontSize: '0.8rem', padding: '5px 12px',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  borderRadius: '20px', fontWeight: 600
                }}>
                  {career}
                </span>
              ))}
            </div>
          </div>

          {/* Apply CTA */}
          <a
            href={`/apply?course=${course.code}`}
            onClick={onClose}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            Apply for {course.code} <ArrowRight size={16} />
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <section id="courses" className="section">
      <div className="container">

        {/* Section Header */}
        <div className="section-header">
          <span className="tag">Our Programs</span>
          <h2>Professional Paramedical &amp; Nursing Courses</h2>
          <p>
            Build your medical career with our intensive, job-oriented 2-year diploma courses featuring paid clinical training and central government approved certificates.
          </p>
        </div>

        {/* Courses Grid — all cards same height, no layout shift */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {coursesList.map((course, index) => (
            <motion.div
              key={course.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card"
              style={{
                display: 'flex', flexDirection: 'column',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-primary)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {/* Course Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{
                  backgroundColor: 'var(--primary-light)', color: 'var(--primary)',
                  width: '50px', height: '50px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {course.icon}
                </div>
                <div style={{
                  fontSize: '0.75rem', fontWeight: 800,
                  backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)',
                  padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border)'
                }}>
                  {course.code}
                </div>
              </div>

              {/* Course Name */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                {course.name}
              </h3>

              {/* Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Clock size={15} color="var(--primary)" />
                  Duration: <strong style={{ color: 'var(--text-primary)' }}>{course.duration}</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <ShieldCheck size={15} color="var(--primary)" />
                  Training: <strong style={{ color: 'var(--text-primary)' }}>{course.training}</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Award size={15} color="var(--primary)" />
                  Cert: <strong style={{ color: 'var(--text-primary)' }}>{course.cert}</strong>
                </div>
              </div>

              {/* Learn More Button */}
              <button
                onClick={() => setSelectedCourse(course)}
                className="course-action-btn"
                style={{
                  width: '100%', padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'transparent',
                  color: 'var(--primary)',
                  fontWeight: 700, fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                Learn More <ArrowRight size={15} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}

      <style>{`
        .course-action-btn:hover {
          background-color: var(--primary-light) !important;
          border-color: var(--primary) !important;
        }
      `}</style>
    </section>
  );
}
