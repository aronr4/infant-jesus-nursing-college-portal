import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: 'A. Priyadharshini',
      role: 'Staff Nurse at City Care Hospital',
      course: 'DFPN (Diploma in Nursing)',
      text: 'The practical training in Government Hospitals was life-changing. Having a free hostel made it extremely affordable for my family. The clinical instructors were incredibly supportive and helped me clear all my licensing interviews!',
      stars: 5,
      avatar: 'AP'
    },
    {
      name: 'P. Sandhiya',
      role: 'OT Assistant at Kauvery Hospital',
      course: 'DOT (Operation Theatre Technology)',
      text: 'The labs here are equipped with modern surgical tool setups, and our clinical posting at Government Hospital gave me confidence. The teachers really care. I rated 4.8 only because we wanted even more simulator hours, but the overall experience is top-notch!',
      stars: 4.8,
      avatar: 'PS'
    },
    {
      name: 'R. Shalini',
      role: 'X-Ray Tech, Kovai Medical Center',
      course: 'X-Ray (Imaging Technology)',
      text: "Being a girl student from another district, safety was my parent's main concern. The free college hostel is highly secure, clean, and has a disciplined study environment. The training stipend was also very helpful for my pocket money.",
      stars: 4.7,
      avatar: 'RS'
    },
    {
      name: 'M. Karthik',
      role: 'Lab Technician, Apollo Diagnostics',
      course: 'DMLT (Lab Technology)',
      text: 'I gained hands-on experience in diagnostic labs and biochemistry setups. The professors guide you at every step, teaching you how to use professional medical machinery. Truly grateful for the placement assistance.',
      stars: 5,
      avatar: 'MK'
    },
    {
      name: 'K. Meera',
      role: 'Pharmacist, MedPlus Pharmacy',
      course: 'DIP (Diploma in Pharmacy)',
      text: 'Excellent pharmacy labs and curriculum aligned with central government norms. The placement cell guided me through interviews. 4.9 stars for the absolute best faculty guidance and lowest installment fees program.',
      stars: 4.9,
      avatar: 'KM'
    },
    {
      name: 'B. Deepa',
      role: 'Staff Nurse, Fortis Hospitals',
      course: 'DFPN (Diploma in Nursing)',
      text: 'Great clinical exposure and Govt Hospital training every 3 months. It is an intensive course, but it prepares you for real-world stress. The guidance for foreign jobs and licensing exams is also a huge plus.',
      stars: 4.6,
      avatar: 'BD'
    },
    {
      name: 'S. Jesuraj',
      role: 'Parent of Graduate (DFPN)',
      course: 'Parent Support Review',
      text: 'Infant Jesus College has provided high-quality education at the lowest installment fees. The salary they paid my daughter during training supported her daily expenses. Safe environment and wonderful hostel care.',
      stars: 5,
      avatar: 'SJ'
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      handleNext();
    }, 6000); // Auto-advance every 6 seconds
    return () => clearInterval(slideTimer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="section section-bg">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="tag">Testimonials</span>
          <h2>Success Stories From Our Students & Parents</h2>
          <p>
            Read about the experiences of our graduates who have launched their medical careers, and feedback from their parents.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          style={{
            maxWidth: '750px',
            margin: '0 auto',
            position: 'relative',
            padding: '0 50px'
          }}
          className="carousel-container"
        >
          {/* Main Card */}
          <div 
            className="glass-panel"
            style={{
              padding: '40px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-primary)',
              minHeight: '260px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative'
            }}
          >
            {/* Quote Icon watermark */}
            <Quote 
              size={120} 
              style={{
                position: 'absolute',
                top: '10px',
                right: '20px',
                opacity: 0.05,
                color: 'var(--primary)',
                pointerEvents: 'none'
              }} 
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Star Ratings */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(5)].map((_, i) => {
                      const starVal = i + 1;
                      const rating = reviews[currentIndex].stars;
                      const isFull = rating >= starVal;
                      const isHalf = !isFull && rating >= starVal - 0.5;
                      return (
                        <div key={i} style={{ position: 'relative', display: 'inline-block', width: '16px', height: '16px' }}>
                          <Star size={16} color="var(--border)" style={{ position: 'absolute', top: 0, left: 0 }} />
                          {isFull && (
                            <div style={{ position: 'absolute', top: 0, left: 0, overflow: 'hidden', width: '100%', height: '100%' }}>
                              <Star size={16} fill="var(--warning)" color="var(--warning)" />
                            </div>
                          )}
                          {!isFull && isHalf && (
                            <div style={{ position: 'absolute', top: 0, left: 0, overflow: 'hidden', width: '50%', height: '100%' }}>
                              <Star size={16} fill="var(--warning)" color="var(--warning)" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '2px 8px', borderRadius: '4px' }}>
                    {reviews[currentIndex].stars.toFixed(1)} / 5.0
                  </span>
                </div>

                {/* Review Text */}
                <p 
                  style={{ 
                    fontSize: '1.05rem', 
                    lineHeight: '1.65', 
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic',
                    marginBottom: '24px'
                  }}
                >
                  "{reviews[currentIndex].text}"
                </p>

                {/* Reviewer Details */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div 
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1rem'
                    }}
                  >
                    {reviews[currentIndex].avatar}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      {reviews[currentIndex].name}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>
                      {reviews[currentIndex].course}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '2px' }}>
                      {reviews[currentIndex].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-sm)'
            }}
            className="carousel-nav-btn"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-sm)'
            }}
            className="carousel-nav-btn"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>

      <style>{`
        .carousel-nav-btn:hover {
          background-color: var(--primary-light) !important;
          color: var(--primary) !important;
          border-color: var(--primary) !important;
        }
        @media (max-width: 640px) {
          .carousel-container {
            padding: 0 !important;
          }
          .carousel-nav-btn {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
