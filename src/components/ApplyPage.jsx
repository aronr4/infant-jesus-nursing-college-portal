import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2, User, Phone, Mail, MapPin, Calendar, GraduationCap, BookOpen } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

export default function ApplyPage({ hash }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    dob: '',
    qualification: '',
    course: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [regId, setRegId] = useState('');
  const [countdown, setCountdown] = useState(8);
  const [submitError, setSubmitError] = useState('');

  // Auto-redirect to home page after successful submission
  useEffect(() => {
    if (isSubmitted) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = '/';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isSubmitted]);

  // Parse course from hash on load/change
  useEffect(() => {
    if (hash) {
      try {
        const queryIndex = hash.indexOf('?');
        if (queryIndex !== -1) {
          const params = new URLSearchParams(hash.substring(queryIndex));
          const courseCode = params.get('course');
          if (courseCode) {
            setFormData(prev => ({ ...prev, course: courseCode }));
          }
        }
      } catch (err) {
        console.error('Error parsing course parameter from hash:', err);
      }
    }
  }, [hash]);

  // Force scroll to top on mount and hash changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const scrollTimer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 80);
    return () => clearTimeout(scrollTimer);
  }, [hash]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitError) setSubmitError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.qualification || !formData.course || !formData.address) {
      alert('Please fill out all required fields marked with *');
      return;
    }
    setIsSubmitting(true);

    const generatedId = `IJ-${Math.floor(100000 + Math.random() * 900000)}`;
    setRegId(generatedId);

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
        window.scrollTo({ top: document.querySelector('.apply-card').offsetTop - 100, behavior: 'smooth' });
        return;
      }

      const { error } = await supabase.from('applications').insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          gender: formData.gender || null,
          dob: formData.dob || null,
          qualification: formData.qualification,
          course: formData.course,
          address: formData.address,
          application_id: generatedId,
          status: 'New'
        }
      ]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      localStorage.setItem('inquiry_submitted', 'true');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Database save error:', err);
      alert('Admissions server encountered a network delay. Your application was not registered yet. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '80vh',
        padding: '60px 0',
        background: 'linear-gradient(180deg, rgba(10, 102, 194, 0.03) 0%, rgba(255, 255, 255, 0) 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Blur Orbs */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10, 102, 194, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(18, 164, 182, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Centered Form Wrapper */}
        <div style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}>
          
          {/* Back Button */}
          <div style={{ marginBottom: '24px' }}>
            <a 
              href="/" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: 'var(--primary)', 
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'transform 0.2s'
              }}
              className="back-btn-hover"
            >
              <ArrowLeft size={16} /> Back to Homepage
            </a>
          </div>

          {/* Page Headings */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
              Online Application Portal
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>
              Apply for direct admissions for academic session 2025–2026.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card apply-card"
              >
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
                      Admission Request Form
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                      All fields marked with (*) are required for registration.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <div style={{ position: 'relative' }}>
                      <User size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{ paddingLeft: '40px' }}
                        placeholder="Enter name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '16px' }}>
                    {/* Phone Number */}
                    <div className="form-group">
                      <label className="form-label">Phone / WhatsApp Number *</label>
                      <div style={{ position: 'relative' }}>
                        <Phone size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                        <input 
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-control"
                          style={{ paddingLeft: '40px' }}
                          placeholder="10-digit mobile number"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="form-group">
                      <label className="form-label">Email ID</label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                        <input 
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-control"
                          style={{ paddingLeft: '40px' }}
                          placeholder="Email ID"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '16px' }}>
                    {/* Gender */}
                    <div className="form-group">
                      <label className="form-label">Gender *</label>
                      <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Date of Birth */}
                    <div className="form-group">
                      <label className="form-label">Date of Birth</label>
                      <div style={{ position: 'relative' }}>
                        <Calendar size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                        <input 
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="form-control"
                          style={{ paddingLeft: '40px' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '16px' }}>
                    {/* Highest Qualification */}
                    <div className="form-group">
                      <label className="form-label">Academic Qualification *</label>
                      <div style={{ position: 'relative' }}>
                        <GraduationCap size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                        <select 
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleInputChange}
                          className="form-control"
                          style={{ paddingLeft: '40px' }}
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
                    </div>

                    {/* Preferred Course */}
                    <div className="form-group">
                      <label className="form-label">Course Preference *</label>
                      <div style={{ position: 'relative' }}>
                        <BookOpen size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                        <select 
                          name="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          className="form-control"
                          style={{ paddingLeft: '40px' }}
                          required
                        >
                          <option value="">Select Course preference</option>
                          <option value="DFPN">Diploma in Nursing (DFPN)</option>
                          <option value="DMLT">Diploma in Medical Laboratory Technology (DMLT)</option>
                          <option value="X-Ray">Imaging Technology (X-Ray)</option>
                          <option value="DOT">Diploma in Operation Theatre Technology (DOT)</option>
                          <option value="DIP">Diploma in Pharmacy (DIP)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Residential Address */}
                  <div className="form-group">
                    <label className="form-label">Permanent Address / City *</label>
                    <div style={{ position: 'relative' }}>
                      <MapPin size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                      <textarea 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{ paddingLeft: '40px', minHeight: '80px', resize: 'vertical', fontFamily: 'inherit' }}
                        placeholder="House No, Street, City, Pincode"
                        required
                      />
                    </div>
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
                    style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '10px' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Registering Application...'
                    ) : (
                      <>
                        <Send size={16} /> Submit Formal Application
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card apply-card"
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '24px'
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
                >
                  <CheckCircle2 size={80} color="var(--success)" />
                </motion.div>
                
                <div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
                    Application Registered!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '420px', margin: '0 auto', marginBottom: '12px' }}>
                    Congratulations <strong>{formData.name}</strong>, your formal application for <strong>{formData.course}</strong> has been received by our office.
                  </p>
                  <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%', animation: 'ping 1.5s infinite' }} />
                    Auto-redirecting to Homepage in {countdown}s...
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', width: '100%', textAlign: 'left' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                    What happens next?
                  </h4>
                  <ol style={{ paddingLeft: '20px', margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>An admissions officer will contact you within 24 hours.</li>
                    <li>We will review your educational qualification status and discuss fee installment schemes.</li>
                    <li>You will receive information regarding your free hostel room allocation and class schedules.</li>
                  </ol>
                </div>

                <a 
                  href="/" 
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '12px', marginTop: '10px' }}
                >
                  Return to Home Page
                </a>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      <style>{`
        .back-btn-hover:hover {
          transform: translateX(-4px);
        }
      `}</style>
    </section>
  );
}
