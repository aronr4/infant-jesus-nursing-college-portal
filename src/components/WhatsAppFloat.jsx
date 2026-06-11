import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppFloat() {
  const phoneNumber = '919159417945'; // Primary contact format (country code + number)
  const message = encodeURIComponent('Hello! I am interested in admission details at Infant Jesus Nursing College.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: '90px',
        right: '24px',
        width: '56px',
        height: '56px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(37, 211, 102, 0.4)',
        zIndex: 998,
        cursor: 'pointer',
      }}
      title="Chat with Admissions on WhatsApp"
    >
      <MessageCircle size={28} fill="#FFFFFF" color="#25D366" />
      {/* Pulsing notification ring */}
      <span 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '2px solid #25D366',
          animation: 'whatsapp-ping 2s infinite ease-in-out',
          opacity: 0,
          pointerEvents: 'none'
        }}
      />
      <style>{`
        @keyframes whatsapp-ping {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </motion.a>
  );
}
