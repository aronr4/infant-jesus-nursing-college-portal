import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileCheck, Hospital, CircleDollarSign, Home, ShieldCheck, 
  Sparkles, Award, Globe2, BookOpenCheck, LayoutGrid 
} from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <FileCheck size={22} />,
      title: 'Central Government Certificate',
      desc: 'Acquire certifications recognized by central regulatory boards, ensuring nationwide validity.'
    },
    {
      icon: <Hospital size={22} />,
      title: 'Government Recognized Hospitals',
      desc: 'Receive direct hands-on training inside large-scale government-approved healthcare facilities.'
    },
    {
      icon: <CircleDollarSign size={22} />,
      title: 'Hospital Training with Salary',
      desc: 'Earn a steady salary/stipend while completing your practical clinical rotations.'
    },
    {
      icon: <Home size={22} />,
      title: 'Free Hostel Facilities',
      desc: 'Enjoy safe, comfortable, and zero-cost lodging inside the campus hostel complex.'
    },
    {
      icon: <LayoutGrid size={22} />,
      title: 'Lowest Installment Fees',
      desc: 'Access quality healthcare education with affordable fee schedules split into multiple installments.'
    },
    {
      icon: <ShieldCheck size={22} />,
      title: 'Free Uniforms',
      desc: 'Professional scrubs and academic uniforms are provided at no extra cost to all students.'
    },
    {
      icon: <Award size={22} />,
      title: '100% Placement Assistance',
      desc: 'Gain access to top corporate hospital networks and recruitment drives upon graduation.'
    },
    {
      icon: <Globe2 size={22} />,
      title: 'Overseas Employment Guidance',
      desc: 'Structured counseling and language preparation guides for careers in the Middle East, UK, and Europe.'
    },
    {
      icon: <BookOpenCheck size={22} />,
      title: 'Modern Practical Learning',
      desc: 'Focus heavily on lab experiments, clinical procedures, and real-patient interactions.'
    },
    {
      icon: <Sparkles size={22} />,
      title: 'Career-Oriented Curriculum',
      desc: 'Curriculum structured according to the latest medical standards and clinical technological advances.'
    }
  ];

  return (
    <section id="why-choose-us" className="section section-bg">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="tag">Why Choose Us</span>
          <h2>Outstanding Benefits of Joining Our College</h2>
          <p>
            We offer our students unmatched support, practical clinical training with salary, free housing, and career gateways to make professional nursing accessible.
          </p>
        </div>

        {/* Benefits Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '20px' 
          }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                alignItems: 'flex-start',
                gap: '12px'
              }}
            >
              {/* Icon Holder */}
              <div 
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {benefit.icon}
              </div>

              {/* Title & Desc */}
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
