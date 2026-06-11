import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Admission() {
  const steps = [
    { num: '01', title: 'Submit Application', desc: 'Fill out the online enquiry form on our secure portal.' },
    { num: '02', title: 'Document Verification', desc: 'Submit your 10th/12th mark sheets and identification records for verification.' },
    { num: '03', title: 'Admission Confirmation', desc: 'Confirm your admission seat with our counselors and set up installment plans.' },
    { num: '04', title: 'Begin Training Program', desc: 'Receive your free uniforms, hostel allocation, and start your classwork!' }
  ];

  return (
    <section id="admissions" className="section" style={{ position: 'relative' }}>
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(18, 164, 182, 0.08) 0%, rgba(255, 255, 255, 0) 75%)',
          filter: 'blur(40px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div className="section-header">
          <span className="tag">Enrollment</span>
          <h2>Admission Process & Eligibility Guidelines</h2>
          <p>
            Secure your future in nursing with our direct and easy admission process. We welcome 12th standard candidates (pass or fail) and graduates from any stream.
          </p>
        </div>

        <div className="grid-2">
          
          {/* Left Column: Eligibility and Pipeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Eligibility Box */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                borderLeft: '5px solid var(--primary)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: 'var(--text-primary)' }}>
                <GraduationCap size={22} color="var(--primary)" /> Academic Eligibility
              </h3>
              <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--primary)', borderRadius: '50%' }} />
                  <strong>12th Standard</strong> (Passed or Failed in any stream)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--primary)', borderRadius: '50%' }} />
                  <strong>Any Degree Holder</strong> (Graduates looking for medical transition)
                </li>
              </ul>
            </motion.div>

            {/* Stepper Pipeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
              {/* Stepper Line divider */}
              <div 
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '15px',
                  bottom: '15px',
                  width: '2px',
                  backgroundColor: 'var(--border)',
                  zIndex: 0
                }}
              />

              {steps.map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}
                >
                  {/* Step Bubble */}
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-primary)',
                      border: '2px solid var(--primary)',
                      color: 'var(--primary)',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {step.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.45', margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Right Column: High-Fidelity Admissions Portal CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{
              padding: '40px 32px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-primary)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Accent Gradient */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(10, 102, 194, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}
              >
                <GraduationCap size={32} />
              </div>

              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  backgroundColor: 'var(--primary-light)',
                  padding: '4px 12px',
                  borderRadius: '50px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'inline-block',
                  marginBottom: '10px'
                }}>
                  Online Registration
                </span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 10px 0', color: 'var(--text-primary)' }}>
                  Secure Admissions Portal
                </h3>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '340px', margin: '0 auto' }}>
                  Ready to start your nursing career? Fill out our formal application form to reserve your seat and free hostel space.
                </p>
              </div>

              {/* Bullet points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', textAlign: 'left', margin: '10px 0' }}>
                {[
                  'Official registration for all 5 diploma courses',
                  'Takes under 2 minutes to fill and submit',
                  'Direct admissions helpdesk follow-up',
                  'Instant Application ID generation'
                ].map((text, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0 }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <a 
                href="#apply" 
                className="btn btn-primary pulse-btn"
                style={{ 
                  width: '100%', 
                  padding: '14px 28px', 
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 20px rgba(10, 102, 194, 0.15)',
                  marginTop: '10px'
                }}
              >
                Open Application Form <ArrowRight size={18} />
              </a>
            </div>

            <style>{`
              @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(10, 102, 194, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(10, 102, 194, 0); }
                100% { box-shadow: 0 0 0 0 rgba(10, 102, 194, 0); }
              }
              .pulse-btn {
                animation: pulse 2.5s infinite;
              }
              .pulse-btn:hover {
                animation: none;
              }
            `}</style>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
