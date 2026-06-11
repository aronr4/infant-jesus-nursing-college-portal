import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, HelpCircle } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm the admissions assistant for Infant Jesus Nursing College. How can I help you build your career in healthcare today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const quickReplies = [
    { text: '🎓 Courses Offered', value: 'courses' },
    { text: '📋 Eligibility', value: 'eligibility' },
    { text: '🏨 Hostel & Fees', value: 'fees' },
    { text: '🏥 Hospital Training', value: 'training' },
    { text: '📞 Contact Details', value: 'contact' }
  ];

  const getBotResponse = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('course') || q === 'courses') {
      return "We offer high-demand 2-Year Diploma Programs including:\n\n" +
             "• **DFPN** - Diploma in Nursing\n" +
             "• **DMLT** - Diploma in Medical Laboratory Technology\n" +
             "• **X-Ray** - Imaging Technology\n" +
             "• **DOT** - Diploma in Operation Theatre Technology\n" +
             "• **DIP** - Diploma in Pharmacy\n\n" +
             "All programs include practical hospital training and central government-recognized certification!";
    }
    if (q.includes('eligibility') || q.includes('qualify') || q.includes('admission') || q === 'eligibility') {
      return "Our admission eligibility criteria are highly accessible:\n\n" +
             "• **12th Standard** (Pass or Fail in any stream)\n" +
             "• **OR Any Degree Holder**\n\n" +
             "You can apply directly using our Admissions Form or call us to confirm your seat.";
    }
    if (q.includes('hostel') || q.includes('fee') || q.includes('cost') || q === 'fees') {
      return "At Infant Jesus Nursing College, we focus on student welfare:\n\n" +
             "• **100% Free Hostel Facilities** for our students.\n" +
             "• **Lowest Installment-based Tuition Fees** to accommodate all families.\n" +
             "• **Free Uniforms** are also provided.";
    }
    if (q.includes('train') || q.includes('salary') || q.includes('placement') || q.includes('job') || q === 'training') {
      return "We offer exceptional career pathways:\n\n" +
             "• **Practical Hospital Training with Salary** during your study.\n" +
             "• **Training in Government-Recognized Hospitals**.\n" +
             "• **100% Placement Assistance** and **Overseas Employment Guidance** for international careers.";
    }
    if (q.includes('contact') || q.includes('phone') || q.includes('address') || q.includes('where') || q === 'contact') {
      return "📍 **Address**:\nRaj Complex, Near Venkateswara Theater, Kallal Road, Kalayarkovil, Sivaganga District, Tamil Nadu\n\n" +
             "📞 **Admissions Helpline**:\n• 9585417945\n• 9655757234\n• 9655757134\n• 9585116455";
    }
    
    return "I'm here to help with admissions! You can ask about our 2-Year Courses, Free Hostel, Eligibility (12th Pass/Fail), Hospital Training with Salary, or Contact numbers. What would you like to know?";
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const replyText = getBotResponse(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Bubble */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(10, 102, 194, 0.4)',
          zIndex: 999
        }}
        title="Chat with Admission Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="glass-card"
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              width: '360px',
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 999,
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
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
                <Bot size={20} />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700 }}>
                  IJ Admissions Support
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', opacity: 0.9 }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
                  Online | Sister Mary
                </div>
              </div>
            </div>

            {/* Messages Body */}
            <div 
              style={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      lineHeight: '1.45',
                      whiteSpace: 'pre-line',
                      backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-primary)',
                      color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-primary)',
                      border: msg.sender === 'user' ? 'none' : '1px solid var(--border)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginTop: '4px', padding: '0 4px' }}>
                    {msg.time}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', gap: '6px', alignSelf: 'flex-start', padding: '10px 14px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <span className="dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-light)', borderRadius: '50%', display: 'inline-block', animation: 'bounce-dot 1.4s infinite ease-in-out' }} />
                  <span className="dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-light)', borderRadius: '50%', display: 'inline-block', animation: 'bounce-dot 1.4s infinite ease-in-out', animationDelay: '0.2s' }} />
                  <span className="dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-light)', borderRadius: '50%', display: 'inline-block', animation: 'bounce-dot 1.4s infinite ease-in-out', animationDelay: '0.4s' }} />
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Quick replies */}
            <div 
              style={{
                padding: '8px 12px',
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                backgroundColor: 'var(--bg-primary)',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                scrollbarWidth: 'none' // Firefox
              }}
              className="quick-replies-container"
            >
              {quickReplies.map((reply) => (
                <button
                  key={reply.value}
                  onClick={() => handleSend(reply.value)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.775rem',
                    fontWeight: 600,
                    borderRadius: '20px',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    border: '1px solid rgba(10, 102, 194, 0.15)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                  className="quick-reply-btn"
                >
                  {reply.text}
                </button>
              ))}
            </div>

            {/* Footer Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              style={{
                padding: '12px 16px',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                backgroundColor: 'var(--bg-primary)'
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
              />
              <button
                type="submit"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce-dot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .quick-replies-container::-webkit-scrollbar {
          display: none;
        }
        .quick-reply-btn:hover {
          background-color: var(--primary) !important;
          color: #FFFFFF !important;
        }
      `}</style>
    </>
  );
}
