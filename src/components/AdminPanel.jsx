import React, { useState, useEffect } from 'react';
import { supabase, isConfigured } from '../utils/supabaseClient';
import { 
  Lock, Mail, Key, LogOut, Search, Filter, 
  Download, RefreshCw, FileText, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard states
  const [apps, setApps] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // Monitor Authentication state
  useEffect(() => {
    if (!isConfigured) {
      setAuthLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Auth session fetch error:', err);
      }
      setAuthLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Fetch applications
  const fetchApps = async () => {
    if (!isConfigured || !user) return;
    setFetching(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      setApps(data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchApps();
    }
  }, [user]);

  // Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isConfigured) {
      setLoginError('Supabase is not configured yet! Please update config.js first.');
      return;
    }
    if (!email || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }

    setLoginLoading(true);
    setLoginError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw error;
      }
    } catch (err) {
      setLoginError(err.message || 'Invalid login credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Update Status & Notes for an application
  const handleUpdateApp = async (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    setUpdatingId(selectedApp.id);
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: editStatus, notes: editNotes })
        .eq('id', selectedApp.id);

      if (error) {
        throw error;
      }

      // Update local state
      setApps(prev => prev.map(app => 
        app.id === selectedApp.id 
          ? { ...app, status: editStatus, notes: editNotes } 
          : app
      ));

      setSelectedApp(null);
    } catch (err) {
      alert('Failed to update student record: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Export Filtered Records to CSV
  const exportToCSV = () => {
    const headers = [
      'Date', 'Application ID', 'Name', 'Phone', 'Email', 
      'Gender', 'DOB', 'Qualification', 'Course', 'Address', 'Status', 'Notes'
    ];
    
    const rows = filteredApps.map(app => [
      new Date(app.created_at).toLocaleDateString('en-IN'),
      app.application_id,
      app.name,
      app.phone,
      app.email || '',
      app.gender || '',
      app.dob || '',
      app.qualification,
      app.course,
      (app.address || '').replace(/\n/g, ' ').replace(/"/g, '""'),
      app.status,
      (app.notes || '').replace(/\n/g, ' ').replace(/"/g, '""')
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' 
      + [headers.join(','), ...rows.map(row => row.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `IJ_Admissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  // Filters logic
  const filteredApps = apps.filter(app => {
    const matchesSearch = 
      (app.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.phone || '').includes(searchQuery) ||
      (app.application_id || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesCourse = courseFilter === 'All' || app.course === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // KPI Calculations
  const totalCount = apps.length;
  const newCount = apps.filter(a => a.status === 'New').length;
  const calledCount = apps.filter(a => a.status === 'Called').length;
  const confirmedCount = apps.filter(a => a.status === 'Confirmed' || a.status === 'Joined').length;

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)' }}>
        <div style={{ textAlign: 'center' }}>
          <RefreshCw className="animate-spin" size={40} color="var(--primary)" />
          <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontWeight: 600 }}>Loading Admissions Console...</p>
        </div>
      </div>
    );
  }

  // Not configured fallback page
  if (!isConfigured) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)', padding: '24px' }}>
        <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--pulse-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Lock size={30} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px' }}>Admissions Panel Locked</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                The database credentials have not been configured yet. To activate the Admissions Admin Panel and begin receiving student applications, please configure the database keys.
              </p>
            </div>
            <div style={{ width: '100%', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'left', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Instructions:</div>
              <ol style={{ paddingLeft: '18px', margin: 0, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Open <code style={{ fontWeight: 700 }}>src/config.js</code> in your editor.</li>
                <li>Go to your project settings in your free Supabase console.</li>
                <li>Copy the URL and Anon Key, paste them into <code style={{ fontWeight: 700 }}>config.js</code>, and save the file.</li>
              </ol>
            </div>
            <a href="#" className="btn btn-secondary" style={{ width: '100%' }}>Back to Homepage</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
      
      {!user ? (
        // ------------------ LOGIN SCREEN ------------------
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ maxWidth: '420px', width: '100%', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-primary)' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <Lock size={24} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.3 }}>Infant Jesus Admissions Console</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Sign in to manage student registrations.</p>
            </div>

            {loginError && (
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', fontSize: '0.85rem', fontWeight: 600, marginBottom: '20px', textAlign: 'center' }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Admin Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control" 
                    placeholder="admin@college.com"
                    style={{ paddingLeft: '40px' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <Key size={16} color="var(--text-light)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control" 
                    placeholder="••••••••"
                    style={{ paddingLeft: '40px' }}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '12px', fontSize: '0.95rem', marginTop: '8px' }}
                disabled={loginLoading}
              >
                {loginLoading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <a href="#" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Back to Website</a>
            </div>
          </motion.div>
        </div>
      ) : (
        // ------------------ ADMIN DASHBOARD ------------------
        <div style={{ paddingBottom: '60px' }}>
          
          {/* Header */}
          <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border)', padding: '16px 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--primary)', overflow: 'hidden', backgroundColor: '#fff', flexShrink: 0 }}>
                  <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.2 }}>Infant Jesus Nursing College</h1>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.05em', display: 'block', marginTop: '1px' }}>ADMISSIONS PANEL</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button 
                  onClick={handleLogout}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#EF4444', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(239,68,68,0.2)' }}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </header>

          <div className="container" style={{ marginTop: '32px' }}>
            


            {/* KPI Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }} className="kpi-grid">
              {[
                { title: 'Total Leads', count: totalCount, sub: 'All form queries', color: 'var(--primary)' },
                { title: 'New Leads', count: newCount, sub: 'Needs calling', color: 'var(--accent)' },
                { title: 'Called Leads', count: calledCount, sub: 'Follow-ups active', color: 'var(--warning)' },
                { title: 'Confirmed Seats', count: confirmedCount, sub: 'Seats confirmed', color: 'var(--success)' },
              ].map((kpi, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-primary)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{kpi.title}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: kpi.color, margin: '8px 0 2px 0', lineHeight: 1.1 }}>{kpi.count}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{kpi.sub}</div>
                </div>
              ))}
            </div>

            {/* Table Control Filters Panel */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-primary)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: '20px' }}>
              
              {/* Search Bar */}
              <div style={{ position: 'relative', maxWidth: '320px', width: '100%' }}>
                <Search size={16} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                  placeholder="Search Name, Phone, ID..."
                  style={{ paddingLeft: '36px', height: '40px', fontSize: '0.88rem' }}
                />
              </div>

              {/* Dropdown filters */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Filter size={14} color="var(--text-light)" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Course:</span>
                  <select 
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className="form-control"
                    style={{ height: '40px', width: '120px', fontSize: '0.85rem', padding: '0 32px 0 12px' }}
                  >
                    <option value="All">All Courses</option>
                    <option value="DFPN">DFPN</option>
                    <option value="DMLT">DMLT</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="DOT">DOT</option>
                    <option value="DIP">DIP</option>
                    <option value="Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Status:</span>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-control"
                    style={{ height: '40px', width: '120px', fontSize: '0.85rem', padding: '0 32px 0 12px' }}
                  >
                    <option value="All">All Status</option>
                    <option value="New">New</option>
                    <option value="Called">Called</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Joined">Joined</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <button 
                  onClick={fetchApps}
                  title="Refresh Leads List"
                  style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}
                >
                  <RefreshCw size={16} className={fetching ? 'animate-spin' : ''} />
                </button>

                <button 
                  onClick={exportToCSV}
                  disabled={filteredApps.length === 0}
                  className="btn btn-primary"
                  style={{ height: '40px', padding: '0 18px', fontSize: '0.85rem', display: 'flex', gap: '8px' }}
                >
                  <Download size={15} /> Export to CSV
                </button>
              </div>

            </div>

            {/* Applications Table Card */}
            <div className="glass-card" style={{ backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto', width: '100%' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
                      <th style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>Date</th>
                      <th style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>Application ID</th>
                      <th style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>Student Name</th>
                      <th style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>Phone Number</th>
                      <th style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>Course</th>
                      <th style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>Qualification</th>
                      <th style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>Status</th>
                      <th style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetching ? (
                      <tr>
                        <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          <RefreshCw className="animate-spin" size={24} style={{ margin: '0 auto' }} />
                          <span style={{ display: 'block', marginTop: '8px', fontWeight: 600 }}>Refreshing Database...</span>
                        </td>
                      </tr>
                    ) : filteredApps.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          <FileText size={40} color="var(--text-light)" style={{ margin: '0 auto 12px auto' }} />
                          <span style={{ display: 'block', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>No Applications Found</span>
                          <span style={{ display: 'block', fontSize: '0.82rem', marginTop: '4px' }}>Try resetting your filters or submit a new form.</span>
                        </td>
                      </tr>
                    ) : (
                      filteredApps.map((app) => {
                        const statusColors = {
                          New: { bg: 'var(--primary-light)', text: 'var(--primary)' },
                          Called: { bg: 'var(--accent-light)', text: 'var(--accent)' },
                          Confirmed: { bg: 'var(--success-light)', text: 'var(--success)' },
                          Joined: { bg: 'rgba(16, 185, 129, 0.15)', text: '#059669' },
                          Cancelled: { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444' }
                        };
                        const col = statusColors[app.status] || { bg: 'var(--border)', text: 'var(--text-secondary)' };
                        
                        return (
                          <tr key={app.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s' }} className="table-row-hover">
                            <td style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                              {new Date(app.created_at).toLocaleDateString('en-IN')}
                            </td>
                            <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                              {app.application_id}
                            </td>
                            <td style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                              {app.name}
                            </td>
                            <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                              <a href={`tel:+91${app.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>+91 {app.phone}</a>
                            </td>
                            <td style={{ padding: '16px 20px' }}>
                              <span style={{ fontWeight: 800, fontSize: '0.8rem', padding: '3px 8px', borderRadius: '4px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                                {app.course}
                              </span>
                            </td>
                            <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                              {app.qualification}
                            </td>
                            <td style={{ padding: '16px 20px' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, padding: '4px 10px', borderRadius: '12px', backgroundColor: col.bg, color: col.text, display: 'inline-block' }}>
                                {app.status}
                              </span>
                            </td>
                            <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                              <button 
                                onClick={() => {
                                  setSelectedApp(app);
                                  setEditStatus(app.status);
                                  setEditNotes(app.notes || '');
                                }}
                                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-secondary)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', color: 'var(--primary)' }}
                                className="action-btn-hover"
                              >
                                Edit / View
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Edit Detail View Modal Popup */}
          <AnimatePresence>
            {selectedApp && (
              <div 
                style={{ 
                  position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', 
                  backgroundColor: 'rgba(10, 15, 29, 0.6)', backdropFilter: 'blur(4px)', 
                  zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' 
                }}
              >
                {/* Backdrop Click */}
                <div style={{ position: 'absolute', width: '100%', height: '100%' }} onClick={() => setSelectedApp(null)} />
                
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="glass-card"
                  style={{ maxWidth: '600px', width: '100%', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', zIndex: 201 }}
                >
                  <div style={{ borderBottom: '1px solid var(--border)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Applicant: {selectedApp.name}</h3>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-light)' }}>ID: {selectedApp.application_id}</span>
                  </div>

                  <form onSubmit={handleUpdateApp}>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
                      
                      {/* Grid Detail Fields */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', fontSize: '0.88rem' }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Phone</span>
                          <span style={{ fontWeight: 800 }}>+91 {selectedApp.phone}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Email</span>
                          <span style={{ fontWeight: 800 }}>{selectedApp.email || 'N/A'}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Gender</span>
                          <span style={{ fontWeight: 800 }}>{selectedApp.gender || 'N/A'}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>DOB</span>
                          <span style={{ fontWeight: 800 }}>{selectedApp.dob || 'N/A'}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Qualification</span>
                          <span style={{ fontWeight: 800 }}>{selectedApp.qualification}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Course Preference</span>
                          <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{selectedApp.course}</span>
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Residential Address</span>
                          <span style={{ fontWeight: 600, display: 'block', marginTop: '2px', lineHeight: 1.4 }}>{selectedApp.address}</span>
                        </div>
                      </div>

                      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

                      {/* Edit Fields */}
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Admissions Follow-up Status</label>
                        <select 
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="form-control"
                          required
                          style={{ paddingRight: '40px' }}
                        >
                          <option value="New">New Lead</option>
                          <option value="Called">Called (Follow-up)</option>
                          <option value="Confirmed">Confirmed Seat</option>
                          <option value="Joined">Joined College</option>
                          <option value="Cancelled">Cancelled/Declined</option>
                        </select>
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Counselor Notes</label>
                        <textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="form-control"
                          rows={4}
                          placeholder="Type follow-up details (e.g. promised hostel reservation, requested 10th marksheet by Monday)..."
                          style={{ resize: 'none' }}
                        />
                      </div>

                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', padding: '16px 24px', display: 'flex', gap: '12px', justifyContent: 'flex-end', backgroundColor: 'var(--bg-secondary)' }}>
                      <button 
                        type="button" 
                        onClick={() => setSelectedApp(null)}
                        className="btn btn-secondary"
                        style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                        disabled={updatingId !== null}
                      >
                        {updatingId !== null ? 'Saving Changes...' : 'Save & Close'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>
      )}

      {/* Embedded CSS for dashboard effects */}
      <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .table-row-hover:hover {
          background-color: var(--primary-light) !important;
        }
        .action-btn-hover:hover {
          border-color: var(--primary) !important;
          background-color: var(--primary-light) !important;
        }
        @media (max-width: 768px) {
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 480px) {
          .kpi-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
