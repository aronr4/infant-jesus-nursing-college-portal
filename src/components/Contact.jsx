import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, MessageSquare, Send, CheckCircle2, MailOpen } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', msg: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const phoneNumbers = ['9159417945', '9585417945', '9655757134', '9585116455'];
  const primaryPhone = '9159417945';

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);

    const generatedId = `IJ-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // Check if phone number is already registered (matching the last 10 digits to ignore country codes/spaces)
      const cleanedPhone = formData.phone.replace(/\D/g, '');
      const searchPhone = cleanedPhone.length >= 10 ? cleanedPhone.slice(-10) : cleanedPhone;

      const { data: existing, error: checkError } = await supabase
        .from('applications')
        .select('id')
        .like('phone', `%${searchPhone}`)
        .limit(1);

      if (checkError) {
        throw checkError;
      }

      if (existing && existing.length > 0) {
        setSubmitError('This mobile number is already registered! Our admissions office will get in touch with you shortly.');
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.from('applications').insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: null,
          gender: null,
          dob: null,
          qualification: 'Contact Form',
          course: 'Enquiry',
          address: formData.msg || 'No message provided',
          application_id: generatedId,
          status: 'New'
        }
      ]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      setFormData({ name: '', phone: '', msg: '' });
    } catch (err) {
      console.error('Database save error:', err);
      alert('Admissions server encountered a network delay. Your message was not registered yet. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section section-bg">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="tag">Contact Us</span>
          <h2>Connect With Our Admissions Office</h2>
          <p>
            Get in touch for fee structures, campus visits, or document submissions. Call us directly or send a message using the form.
          </p>
        </div>

        <div className="grid-2">
          
          {/* Left Column: Address, Contact Info, Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}
            >
              <div 
                style={{
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  flexShrink: 0
                }}
              >
                <MapPin size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
                  College Campus Address
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  Raj Complex, Near Venkateswara Theater,<br />
                  Kallal Road, Kalayarkovil,<br />
                  Sivaganga District, Tamil Nadu
                </p>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="glass-card"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}
            >
              <div 
                style={{
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  flexShrink: 0
                }}
              >
                <MailOpen size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
                  Email Address
                </h3>
                <a 
                  href="mailto:admission.infantjesusnursing@gmail.com"
                  style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}
                  className="email-link-hover"
                >
                  admission.infantjesusnursing@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Helpline Numbers Grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)'
              }}
            >
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={18} color="var(--primary)" /> Admissions Helpline
              </h3>
              
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '12px' 
                }}
                className="contact-helpline-grid"
              >
                {phoneNumbers.map((num) => (
                  <a
                    key={num}
                    href={`tel:+91${num}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      transition: 'all 0.2s'
                    }}
                    className="helpline-btn"
                  >
                    <Phone size={14} color="var(--primary)" /> +91 {num}
                  </a>
                ))}
              </div>

              {/* WhatsApp Callout */}
              <div style={{ marginTop: '16px', display: 'flex' }}>
                <a
                  href={`https://wa.me/91${primaryPhone}?text=Hello!%20I%20am%20interested%20in%20learning%20more%20about%20admissions.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    width: '100%',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(37, 211, 102, 0.2)'
                  }}
                  className="whatsapp-btn-hover"
                >
                  <MessageSquare size={16} fill="#FFFFFF" color="#25D366" /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Google Map Iframe */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                width: '100%',
                height: '240px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border)'
              }}
            >
              {/* Embed map of Kalayarkovil */}
              <iframe
                title="College Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15715.111802958085!2d78.6186855146033!3d9.952402127116805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00eb05877f6cdb%3A0xcb1b590e82c58971!2sKalayarkoil%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1717772023023!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

          </div>

          {/* Right Column: Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{
              padding: '32px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-primary)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '8px', borderRadius: '50%', display: 'flex' }}>
                      <MailOpen size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      Send an Enquiry Message
                    </h3>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter 10-digit phone number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message / Details</label>
                    <textarea 
                      name="msg"
                      value={formData.msg}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{ minHeight: '120px', resize: 'vertical' }}
                      placeholder="Tell us what you would like to ask..."
                    />
                  </div>

                  {submitError && (
                    <div style={{ 
                      backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                      border: '1px solid var(--danger)', 
                      color: 'var(--danger)', 
                      padding: '12px 14px', 
                      borderRadius: 'var(--radius-sm)', 
                      fontSize: '0.9rem', 
                      marginBottom: '14px',
                      textAlign: 'left'
                    }}>
                      {submitError}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Message...' : <><Send size={16} /> Send Enquiry</>}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '50px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle2 size={72} color="var(--success)" />
                  </motion.div>
                  
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
                      Message Sent Successfully!
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      Thank you for contacting Infant Jesus Nursing College. Our support team will get in touch with you shortly.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>

      <style>{`
        .helpline-btn:hover {
          background-color: var(--primary-light) !important;
          border-color: var(--primary) !important;
          transform: translateY(-2px);
        }
        .whatsapp-btn-hover:hover {
          background-color: #1ebd59 !important;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .contact-helpline-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
