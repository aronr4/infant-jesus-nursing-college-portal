import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, GraduationCap } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

export default function InquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', qualification: '', course: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or submitted the form
    const hasSubmitted = localStorage.getItem('inquiry_submitted');
    const hasDismissed = localStorage.getItem('inquiry_dismissed');
    
    if (!hasSubmitted && !hasDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 8000); // Popup after 8 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('inquiry_dismissed', 'true');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.qualification || !formData.course) {
      alert('Please fill out all fields.');
      return;
    }
    setIsSubmitting(true);

    const generatedId = `IJ-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const { error } = await supabase.from('applications').insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: null,
          gender: null,
          dob: null,
          qualification: formData.qualification,
          course: formData.course,
          address: 'Popup Inquiry',
          application_id: generatedId,
          status: 'New'
        }
      ]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      localStorage.setItem('inquiry_submitted', 'true');
      setTimeout(() => setIsOpen(false), 3000);
    } catch (err) {
      console.error('Database save error:', err);
      alert('Admissions server encountered a network delay. Your enquiry was not registered yet. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(10, 15, 29, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          {/* Backdrop click close */}
          <div style={{ position: 'absolute', width: '100%', height: '100%' }} onClick={handleClose} />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '480px',
              position: 'relative',
              zIndex: 10001,
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-primary)'
            }}
          >
            {/* Header decoration */}
            <div 
              style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
                padding: '24px',
                color: '#FFFFFF',
                position: 'relative'
              }}
            >
              <button 
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: '#FFFFFF',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <X size={16} />
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div 
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <GraduationCap size={20} />
                </div>
                <h3 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>
                  Admission Enquiry 2025-2026
                </h3>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem', margin: 0 }}>
                Get free career guidance & secure your seat in healthcare programs today.
              </p>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control" 
                        placeholder="Enter your full name" 
                        required 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Mobile Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control" 
                        placeholder="Enter 10-digit number" 
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Last Qualification</label>
                      <select 
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="form-control" 
                        required
                      >
                        <option value="">Select Qualification</option>
                        <option value="10th Pass">10th Standard Pass</option>
                        <option value="12th Pass">12th Standard Pass</option>
                        <option value="12th Fail">12th Standard Fail</option>
                        <option value="Any Degree">Any Degree Holder</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Course of Interest</label>
                      <select 
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="form-control" 
                        required
                      >
                        <option value="">Select a Course</option>
                        <option value="DFPN">Diploma in Nursing (DFPN)</option>
                        <option value="DMLT">Diploma in Medical Laboratory Technology (DMLT)</option>
                        <option value="X-Ray">Imaging Technology (X-Ray)</option>
                        <option value="DOT">Diploma in Operation Theatre Technology (DOT)</option>
                        <option value="DIP">Diploma in Pharmacy (DIP)</option>
                      </select>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      style={{ width: '100%', marginTop: '10px' }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        <>
                          <Send size={16} /> Submit Application
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      textAlign: 'center',
                      padding: '30px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    >
                      <CheckCircle2 size={64} color="var(--success)" />
                    </motion.div>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
                        Enquiry Submitted!
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Thank you for your interest. Our admissions office will contact you shortly on <strong>{formData.phone}</strong>.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
