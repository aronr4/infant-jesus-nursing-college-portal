import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is the eligibility required for admission?',
      a: 'We have very open eligibility guidelines. You can enroll if you have completed the 12th standard (passed or failed in any stream) or if you hold any college degree and wish to transition into a healthcare career.'
    },
    {
      q: 'Do you provide hostel facilities? Is it really free?',
      a: 'Yes, absolutely! Infant Jesus Nursing College provides 100% free hostel facilities (lodging) to our students to make nursing and paramedical education highly accessible.'
    },
    {
      q: 'What courses does the college offer?',
      a: 'We offer five core 2-year diploma programs: DFPN (Diploma in Nursing), DMLT (Diploma in Medical Laboratory Technology), X-Ray (Imaging Technology), DOT (Diploma in Operation Theatre Technology), and DIP (Diploma in Pharmacy).'
    },
    {
      q: 'Will I receive a salary during practical hospital training?',
      a: 'Yes! Our programs feature clinical training inside government-recognized hospitals. During this training phase, students receive a monthly salary/stipend to support their career development.'
    },
    {
      q: 'Is the college certification government approved?',
      a: 'Yes. Our programs are approved by the Government of India, under Registration Number: 2605. The certification is widely recognized across India and provides pathways for overseas employment boards.'
    },
    {
      q: 'How can I pay my tuition fees? Are there installments?',
      a: 'We offer the lowest installment-based tuition fee schedules. This allows parents to clear the fees in small, convenient chunks rather than in a single large payment.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="tag">Questions</span>
          <h2>Frequently Asked Questions</h2>
          <p>
            Have queries about admissions, qualifications, fees, or hospital stipends? Find quick answers to the most common questions.
          </p>
        </div>

        {/* Accordion Wrapper */}
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card"
                style={{
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-primary)',
                  border: isOpen ? '1px solid var(--primary)' : '1px solid var(--border)',
                  overflow: 'hidden'
                }}
              >
                {/* Accordion Question Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HelpCircle size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                    {faq.q}
                  </span>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--primary-light)' : 'var(--bg-secondary)',
                      color: isOpen ? 'var(--primary)' : 'var(--text-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                      flexShrink: 0
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {/* Accordion Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div 
                        style={{ 
                          padding: '0 24px 20px 54px', 
                          fontSize: '0.925rem', 
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          borderTop: '1px solid transparent'
                        }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
