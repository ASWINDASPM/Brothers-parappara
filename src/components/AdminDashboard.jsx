import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Sliders, 
  Trophy, 
  Calendar, 
  Users, 
  Image as ImageIcon, 
  Bell, 
  Mail, 
  ArrowLeft, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle2, 
  X, 
  Lock, 
  Eye, 
  ExternalLink,
  ShieldCheck,
  Download,
  Database,
  Loader2,
  RefreshCw,
  User,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import ClubLogo from './ClubLogo';
import { 
  isSupabaseConfigured, 
  signInAdminWithSupabase, 
  signOutAdminFromSupabase, 
  getAdminSession, 
  onAdminAuthStateChange,
  getMembersFromSupabase,
  updateMemberStatusInSupabase,
  deleteMemberFromSupabase,
  getContactMessagesFromSupabase,
  deleteContactMessageFromSupabase,
  getRsvpsFromSupabase,
  createEventInSupabase,
  deleteEventFromSupabase,
  createNewsInSupabase,
  deleteNewsFromSupabase,
  createGalleryInSupabase,
  deleteGalleryFromSupabase,
  ensureImageBucketExists
} from '../lib/supabase';
import ImageUploadField from './ImageUploadField';
import { checkAdminPassword, setAdminPassword, adminLogout, isAdminLoggedIn } from '../utils/cmsStorage';

export default function AdminDashboard({ 
  cmsData, 
  onUpdateCmsData, 
  onResetCmsData, 
  onExitAdmin, 
  onShowToast 
}) {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return isAdminLoggedIn();
  });
  const [authMode, setAuthMode] = useState('supabase'); // 'supabase' | 'local'
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Active CMS Tab
  const [activeTab, setActiveTab] = useState('overview'); // overview, general, slides, activities, events, members, gallery, news, messages

  // Local Editable State
  const [generalForm, setGeneralForm] = useState(cmsData.clubDetails);
  const [editingSlide, setEditingSlide] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);
  
  // New Item Modals
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [showAddSlideModal, setShowAddSlideModal] = useState(false);

  // New Item Draft States
  const [newEventDraft, setNewEventDraft] = useState({
    month: 'NOV',
    day: '20',
    title: '',
    location: 'Parappara Ground',
    time: '8:00 AM - 6:00 PM',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    description: ''
  });

  const [newNewsDraft, setNewNewsDraft] = useState({
    tag: 'NEWS',
    title: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    content: '',
    author: 'Club Secretary'
  });

  const [newGalleryDraft, setNewGalleryDraft] = useState({
    title: '',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80',
    isVideo: false,
    description: ''
  });

  const [newActivityDraft, setNewActivityDraft] = useState({
    id: `act-${Date.now()}`,
    title: '',
    subtext: '',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    icon: 'football',
    description: ''
  });

  const [newSlideDraft, setNewSlideDraft] = useState({
    id: `slide-${Date.now()}`,
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=2000&q=85',
    welcomeTag: 'WELCOME TO',
    title: 'Brothers Parappara',
    subtitle: 'Local Arts & Sports Club',
    tagline: 'Together in Sports, United in Arts, Stronger as a Community.',
    scriptTop: 'Sports | Arts | Community',
    scriptBottom: 'Together We Grow'
  });

  // 1. Session Restoration & Auth Listener
  useEffect(() => {
    let mounted = true;

    // Check existing Supabase session
    getAdminSession().then(({ session, user }) => {
      if (!mounted) return;
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    });

    // Listen to Supabase auth state changes
    const { data: { subscription } } = onAdminAuthStateChange((event, session) => {
      if (!mounted) return;
      if (session?.user) {
        setCurrentUser(session.user);
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  // 2. Fetch live data from Supabase once authenticated
  useEffect(() => {
    if (!isAuthenticated || !isSupabaseConfigured()) return;
    let isMounted = true;

    const fetchLiveSupabaseData = async () => {
      setIsSyncing(true);
      try {
        // Auto-check/create bucket if possible
        ensureImageBucketExists().catch(() => {});

        const [membersRes, msgsRes, rsvpsRes, eventsRes, newsRes] = await Promise.all([
          getMembersFromSupabase(),
          getContactMessagesFromSupabase(),
          getRsvpsFromSupabase(),
          getEventsFromSupabase(),
          getNewsFromSupabase()
        ]);

        if (!isMounted) return;

        let updated = { ...cmsData };
        let changed = false;

        if (membersRes.data && membersRes.data.length > 0) {
          const mappedMembers = membersRes.data.map(m => ({
            id: m.id,
            memberId: m.member_id || m.id,
            name: m.name,
            phone: m.phone,
            email: m.email || '',
            wing: m.wing,
            ageGroup: m.age_group || 'Youth',
            address: m.address || '',
            status: m.status || 'Active',
            joinedDate: m.created_at ? new Date(m.created_at).toISOString().split('T')[0] : '2026-10-18'
          }));
          updated.members = mappedMembers;
          changed = true;
        }

        if (msgsRes.data && msgsRes.data.length > 0) {
          const mappedMsgs = msgsRes.data.map(msg => ({
            id: msg.id,
            name: msg.name,
            contact: msg.phone_or_email,
            message: msg.message,
            date: msg.created_at ? new Date(msg.created_at).toISOString().split('T')[0] : '2026-10-19'
          }));
          updated.messages = mappedMsgs;
          changed = true;
        }

        if (rsvpsRes.data && rsvpsRes.data.length > 0) {
          const mappedRsvps = rsvpsRes.data.map(r => ({
            id: r.id,
            eventId: r.event_id,
            name: r.participant_name,
            passCode: r.pass_code,
            date: r.created_at ? new Date(r.created_at).toISOString().split('T')[0] : '2026-10-19'
          }));
          updated.rsvps = mappedRsvps;
          changed = true;
        }

        if (changed) {
          onUpdateCmsData(updated);
        }
      } catch (err) {
        console.warn('Error fetching Supabase live data:', err);
      } finally {
        if (isMounted) setIsSyncing(false);
      }
    };

    fetchLiveSupabaseData();
  }, [isAuthenticated]);

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (authMode === 'supabase') {
      if (!loginEmail || !loginPassword) {
        setLoginError('Please enter both your Supabase admin email and password.');
        return;
      }
      setIsAuthLoading(true);
      try {
        const { data, error } = await signInAdminWithSupabase(loginEmail, loginPassword);
        setIsAuthLoading(false);
        if (error) {
          console.error('Supabase auth error:', error);
          if (error.message.includes('Invalid login credentials')) {
            setLoginError('Invalid email or password. Please verify your Supabase user credentials.');
          } else if (error.message.includes('Email not confirmed')) {
            setLoginError('Email not confirmed yet. In Supabase Dashboard > Authentication > Users, you can manually verify it, or disable "Confirm email" in Auth settings.');
          } else {
            setLoginError(error.message || 'Supabase authentication failed.');
          }
        } else if (data?.user) {
          setCurrentUser(data.user);
          setIsAuthenticated(true);
          if (onShowToast) onShowToast(`Welcome back, ${data.user.email}!`);
        }
      } catch (err) {
        setIsAuthLoading(false);
        setLoginError(err.message || 'Network error connecting to Supabase Auth.');
      }
    } else {
      // Local Password Fallback
      if (checkAdminPassword(loginPassword)) {
        setIsAuthenticated(true);
        setLoginError('');
        if (onShowToast) onShowToast('Admin authenticated via master password!');
      } else {
        setLoginError('Incorrect password. Default master password is: admin123');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOutAdminFromSupabase();
    } catch (err) {}
    adminLogout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    if (onShowToast) onShowToast('Signed out from Admin Dashboard.');
  };

  // General Details Save
  const handleSaveGeneral = (e) => {
    e.preventDefault();
    onUpdateCmsData({
      ...cmsData,
      clubDetails: generalForm
    });
    if (onShowToast) onShowToast('Club General details updated live!');
  };

  // Slide Operations
  const handleSaveSlide = (slide) => {
    const updated = cmsData.slides.map(s => s.id === slide.id ? slide : s);
    onUpdateCmsData({ ...cmsData, slides: updated });
    setEditingSlide(null);
    if (onShowToast) onShowToast('Hero Slide updated!');
  };

  const handleAddSlide = (e) => {
    e.preventDefault();
    if (!newSlideDraft.title) return;
    const updated = [...cmsData.slides, { ...newSlideDraft, id: `slide-${Date.now()}` }];
    onUpdateCmsData({ ...cmsData, slides: updated });
    setShowAddSlideModal(false);
    if (onShowToast) onShowToast('New Hero Slide added!');
  };

  const handleDeleteSlide = (id) => {
    if (cmsData.slides.length <= 1) {
      alert('You must keep at least 1 hero slide!');
      return;
    }
    const updated = cmsData.slides.filter(s => s.id !== id);
    onUpdateCmsData({ ...cmsData, slides: updated });
    if (onShowToast) onShowToast('Slide removed.');
  };

  // Activity Operations
  const handleSaveActivity = (activity) => {
    const updated = cmsData.activities.map(a => a.id === activity.id ? activity : a);
    onUpdateCmsData({ ...cmsData, activities: updated });
    setEditingActivity(null);
    if (onShowToast) onShowToast('Activity updated!');
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newActivityDraft.title) return;
    const updated = [...cmsData.activities, { ...newActivityDraft, id: `act-${Date.now()}` }];
    onUpdateCmsData({ ...cmsData, activities: updated });
    setShowAddActivityModal(false);
    if (onShowToast) onShowToast(`Activity "${newActivityDraft.title}" added!`);
  };

  const handleDeleteActivity = (id) => {
    if (window.confirm('Delete this activity card?')) {
      const updated = cmsData.activities.filter(a => a.id !== id);
      onUpdateCmsData({ ...cmsData, activities: updated });
      if (onShowToast) onShowToast('Activity deleted.');
    }
  };

  // Events Operations
  const handleSaveEvent = (evt) => {
    const updated = cmsData.events.map(e => e.id === evt.id ? evt : e);
    onUpdateCmsData({ ...cmsData, events: updated });
    setEditingEvent(null);
    if (onShowToast) onShowToast('Event fixture updated!');
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEventDraft.title) return;
    const newId = `evt-${Date.now()}`;
    const newEvt = { ...newEventDraft, id: newId };
    const updated = [newEvt, ...cmsData.events];
    onUpdateCmsData({ ...cmsData, events: updated });
    setShowAddEventModal(false);
    setNewEventDraft({
      month: 'NOV',
      day: '20',
      title: '',
      location: 'Parappara Ground',
      time: '8:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      category: 'Sports',
      description: ''
    });
    // Sync to Supabase in background
    createEventInSupabase(newEvt).catch(err => console.warn('Supabase event create error:', err));
    if (onShowToast) onShowToast('New event scheduled!');
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Delete this event?')) {
      const updated = cmsData.events.filter(e => e.id !== id);
      onUpdateCmsData({ ...cmsData, events: updated });
      deleteEventFromSupabase(id).catch(err => console.warn('Supabase event delete error:', err));
      if (onShowToast) onShowToast('Event deleted.');
    }
  };

  // News Operations
  const handleSaveNews = (item) => {
    const updated = cmsData.news.map(n => n.id === item.id ? item : n);
    onUpdateCmsData({ ...cmsData, news: updated });
    setEditingNews(null);
    if (onShowToast) onShowToast('Bulletin updated!');
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    if (!newNewsDraft.title || !newNewsDraft.content) return;
    const newId = `news-${Date.now()}`;
    const newNews = { ...newNewsDraft, id: newId };
    const updated = [newNews, ...cmsData.news];
    onUpdateCmsData({ ...cmsData, news: updated });
    setShowAddNewsModal(false);
    setNewNewsDraft({
      tag: 'NEWS',
      title: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      content: '',
      author: 'Club Secretary'
    });
    createNewsInSupabase(newNews).catch(err => console.warn('Supabase news create error:', err));
    if (onShowToast) onShowToast('Bulletin posted live!');
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm('Delete this news notice?')) {
      const updated = cmsData.news.filter(n => n.id !== id);
      onUpdateCmsData({ ...cmsData, news: updated });
      deleteNewsFromSupabase(id).catch(err => console.warn('Supabase news delete error:', err));
      if (onShowToast) onShowToast('Notice removed.');
    }
  };

  // Gallery Operations
  const handleAddGallery = async (e) => {
    e.preventDefault();
    if (!newGalleryDraft.title || !newGalleryDraft.image) return;
    const newId = `gal-${Date.now()}`;
    const newGal = { ...newGalleryDraft, id: newId };
    const updated = [newGal, ...cmsData.gallery];
    onUpdateCmsData({ ...cmsData, gallery: updated });
    setShowAddGalleryModal(false);
    setNewGalleryDraft({
      title: '',
      category: 'Sports',
      image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80',
      isVideo: false,
      description: ''
    });
    createGalleryInSupabase(newGal).catch(err => console.warn('Supabase gallery create error:', err));
    if (onShowToast) onShowToast('Showcase highlight added!');
  };

  const handleDeleteGallery = async (id) => {
    if (window.confirm('Remove this photo/video from gallery?')) {
      const updated = cmsData.gallery.filter(g => g.id !== id);
      onUpdateCmsData({ ...cmsData, gallery: updated });
      deleteGalleryFromSupabase(id).catch(err => console.warn('Supabase gallery delete error:', err));
      if (onShowToast) onShowToast('Gallery item removed.');
    }
  };

  // Member Status toggle & delete
  const handleToggleMemberStatus = async (id) => {
    let nextStatus = 'Active';
    const updated = cmsData.members.map(m => {
      if (m.id === id) {
        nextStatus = m.status === 'Active' ? 'Pending' : 'Active';
        return { ...m, status: nextStatus };
      }
      return m;
    });
    onUpdateCmsData({ ...cmsData, members: updated });
    updateMemberStatusInSupabase(id, nextStatus).catch(err => console.warn('Supabase member status update error:', err));
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm('Remove this member from roster?')) {
      const updated = cmsData.members.filter(m => m.id !== id);
      onUpdateCmsData({ ...cmsData, members: updated });
      deleteMemberFromSupabase(id).catch(err => console.warn('Supabase member delete error:', err));
      if (onShowToast) onShowToast('Member removed.');
    }
  };

  // Export Members to CSV
  const handleExportMembersCSV = () => {
    const headers = ['Member ID', 'Name', 'Phone', 'Email', 'Wing', 'Age Group', 'Address', 'Status'];
    const rows = (cmsData.members || []).map(m => [
      `"${m.memberId || ''}"`,
      `"${m.name || ''}"`,
      `"${m.phone || ''}"`,
      `"${m.email || ''}"`,
      `"${m.wing || ''}"`,
      `"${m.ageGroup || ''}"`,
      `"${m.address || ''}"`,
      `"${m.status || 'Active'}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Brothers_Parappara_Members_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Message delete
  const handleDeleteMessage = async (id) => {
    const updated = cmsData.messages.filter(msg => msg.id !== id);
    onUpdateCmsData({ ...cmsData, messages: updated });
    deleteContactMessageFromSupabase(id).catch(err => console.warn('Supabase message delete error:', err));
    if (onShowToast) onShowToast('Message deleted.');
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('Are you sure you want to restore all CMS content to original default seed data? All custom additions will be reset.')) {
      onResetCmsData();
      if (onShowToast) onShowToast('CMS reset to initial defaults.');
    }
  };

  // ==========================================
  // LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Brothers Parappara</h2>
            <p className="text-xs text-slate-400 font-medium">CMS Admin Dashboard & Portal Control</p>
            
            {/* Supabase Connection Status Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-800/80 border border-slate-700/80 text-slate-300 mt-2">
              <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured() ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
              <span>{isSupabaseConfigured() ? 'Supabase Auth Ready' : 'Supabase Not Configured'}</span>
            </div>
          </div>

          {/* Auth Method Selector */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setAuthMode('supabase'); setLoginError(''); }}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'supabase'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Supabase Auth</span>
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('local'); setLoginError(''); }}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'local'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Local Password</span>
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Supabase Email Input (only when Supabase mode) */}
            {authMode === 'supabase' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Supabase User Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your Supabase auth email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-800/80 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500"
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {authMode === 'supabase' ? 'Supabase Password' : 'Local Master Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  placeholder={authMode === 'supabase' ? 'Enter your password' : 'Enter master password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-800/80 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500"
                />
              </div>
            </div>

            {/* Error Message Box */}
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{loginError}</span>
              </div>
            )}

            {/* Hint Box */}
            {authMode === 'supabase' ? (
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <span className="text-emerald-400 font-semibold">Tip:</span> Use the email & password you created in your Supabase Auth dashboard.
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-400 flex items-center justify-between">
                <span>Default Password:</span>
                <code className="text-emerald-400 font-bold bg-slate-900 px-2 py-0.5 rounded">admin123</code>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
            >
              {isAuthLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating with Supabase...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{authMode === 'supabase' ? 'Sign In with Supabase' : 'Access Admin CMS'}</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={onExitAdmin}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Public Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // LOGGED-IN ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <ClubLogo isDark={true} />
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-700">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                CMS Admin
              </span>
              <span className="text-xs text-slate-400">Content Management</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            
            {/* Supabase User & Live Status */}
            {currentUser?.email ? (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 font-semibold truncate max-w-[150px] sm:max-w-[200px]" title={currentUser.email}>
                  {currentUser.email}
                </span>
                <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 px-1.5 py-0.5 rounded">
                  Supabase
                </span>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-slate-800 border border-slate-700">
                <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured() ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="text-slate-300 font-semibold text-[11px]">
                  {isSupabaseConfigured() ? 'Supabase Live' : 'Local Storage Mode'}
                </span>
              </div>
            )}

            {/* Syncing spinner */}
            {isSyncing && (
              <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>Syncing Supabase...</span>
              </div>
            )}

            {/* Reset Defaults */}
            <button
              onClick={handleReset}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Reset all CMS content to original default seed data"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset</span>
            </button>

            {/* Back to Live Site Button */}
            <button
              onClick={onExitAdmin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Website</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Logout from CMS"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block px-3 mb-2">
              CMS Modules
            </span>

            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'general', label: 'General & Club Info', icon: Settings },
              { id: 'slides', label: 'Hero Slider', icon: Sliders, badge: cmsData.slides.length },
              { id: 'activities', label: 'Activities & Sports', icon: Trophy, badge: cmsData.activities.length },
              { id: 'events', label: 'Upcoming Events', icon: Calendar, badge: cmsData.events.length },
              { id: 'members', label: 'Members Roster', icon: Users, badge: cmsData.members.length },
              { id: 'gallery', label: 'Photo & Video Gallery', icon: ImageIcon, badge: cmsData.gallery.length },
              { id: 'news', label: 'News & Bulletins', icon: Bell, badge: cmsData.news.length },
              { id: 'messages', label: 'Contact Messages', icon: Mail, badge: cmsData.messages.length }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Real-Time Sync Active</span>
            </p>
            <p className="text-[11px] text-emerald-700/80 leading-relaxed">
              Every change you save here updates the public website live immediately.
            </p>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* ======================================================== */}
          {/* TAB 1: OVERVIEW */}
          {/* ======================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">CMS Overview & Metrics</h2>
                <p className="text-xs text-slate-500 mt-1">Live snapshot of Brothers Parappara content</p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Members</div>
                  <div className="text-3xl font-black text-slate-900">{cmsData.members.length}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">Active Players & Artists</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scheduled Events</div>
                  <div className="text-3xl font-black text-emerald-700">{cmsData.events.length}</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Tournaments & Fests</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gallery Media</div>
                  <div className="text-3xl font-black text-slate-900">{cmsData.gallery.length}</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Moments That Matter</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Messages & RSVPs</div>
                  <div className="text-3xl font-black text-emerald-700">
                    {(cmsData.messages.length) + (cmsData.rsvps?.length || 0)}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold">Community Inquiries</div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="font-extrabold text-base text-slate-900">Quick Content Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => { setActiveTab('events'); setShowAddEventModal(true); }}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 text-left transition-all"
                  >
                    <Plus className="w-5 h-5 text-emerald-600 mb-2" />
                    <div className="font-bold text-xs text-slate-900">Add Upcoming Event</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Football, Cricket, or Cultural Fest</div>
                  </button>

                  <button
                    onClick={() => { setActiveTab('news'); setShowAddNewsModal(true); }}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 text-left transition-all"
                  >
                    <Plus className="w-5 h-5 text-emerald-600 mb-2" />
                    <div className="font-bold text-xs text-slate-900">Post Club Bulletin</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Announcement, notice, or victory</div>
                  </button>

                  <button
                    onClick={() => { setActiveTab('gallery'); setShowAddGalleryModal(true); }}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 text-left transition-all"
                  >
                    <Plus className="w-5 h-5 text-emerald-600 mb-2" />
                    <div className="font-bold text-xs text-slate-900">Upload Gallery Photo</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Match snapshots and celebrations</div>
                  </button>
                </div>
              </div>

              {/* Recent Activity Rows */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900">Recent Member Applications</h3>
                  <button 
                    onClick={() => setActiveTab('members')}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    View All ({cmsData.members.length}) →
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {cmsData.members.slice(0, 4).map((m) => (
                    <div key={m.id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-slate-900">{m.name}</span>
                        <div className="text-[11px] text-slate-500">{m.wing} • {m.phone}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {m.memberId || 'Registered'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: GENERAL & CLUB INFO */}
          {/* ======================================================== */}
          {activeTab === 'general' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">General & Branding CMS</h2>
                <p className="text-xs text-slate-500 mt-1">Configure club name, taglines, vision, mission, and contact information</p>
              </div>

              <form onSubmit={handleSaveGeneral} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Club Primary Name</label>
                    <input
                      type="text"
                      value={generalForm.name}
                      onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Club Subtitle / Classification</label>
                    <input
                      type="text"
                      value={generalForm.subtitle}
                      onChange={(e) => setGeneralForm({ ...generalForm, subtitle: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Main Tagline</label>
                  <input
                    type="text"
                    value={generalForm.tagline}
                    onChange={(e) => setGeneralForm({ ...generalForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">About Us Section Heading</label>
                    <input
                      type="text"
                      value={generalForm.aboutHeading}
                      onChange={(e) => setGeneralForm({ ...generalForm, aboutHeading: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Signature Cursive Motto</label>
                    <input
                      type="text"
                      value={generalForm.togetherWeGrow}
                      onChange={(e) => setGeneralForm({ ...generalForm, togetherWeGrow: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">About Us Story Text</label>
                  <textarea
                    rows="3"
                    value={generalForm.aboutText}
                    onChange={(e) => setGeneralForm({ ...generalForm, aboutText: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Our Vision</label>
                    <textarea
                      rows="2"
                      value={generalForm.vision}
                      onChange={(e) => setGeneralForm({ ...generalForm, vision: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Our Mission</label>
                    <textarea
                      rows="2"
                      value={generalForm.mission}
                      onChange={(e) => setGeneralForm({ ...generalForm, mission: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <h3 className="font-extrabold text-sm text-slate-900">Contact & Location</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Address / Location</label>
                      <input
                        type="text"
                        value={generalForm.contact?.address || ''}
                        onChange={(e) => setGeneralForm({ 
                          ...generalForm, 
                          contact: { ...generalForm.contact, address: e.target.value } 
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={generalForm.contact?.phone || ''}
                        onChange={(e) => setGeneralForm({ 
                          ...generalForm, 
                          contact: { ...generalForm.contact, phone: e.target.value } 
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email</label>
                      <input
                        type="email"
                        value={generalForm.contact?.email || ''}
                        onChange={(e) => setGeneralForm({ 
                          ...generalForm, 
                          contact: { ...generalForm.contact, email: e.target.value } 
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes Live</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: HERO SLIDER */}
          {/* ======================================================== */}
          {activeTab === 'slides' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Hero Slider Manager</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage the prominent rotating carousel slides on the homepage</p>
                </div>
                <button
                  onClick={() => setShowAddSlideModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Slide</span>
                </button>
              </div>

              <div className="space-y-4">
                {cmsData.slides.map((slide, idx) => (
                  <div key={slide.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-extrabold uppercase text-emerald-600">{slide.welcomeTag} • Slide #{idx + 1}</div>
                        <h4 className="font-extrabold text-sm text-slate-900">{slide.title} — <span className="text-emerald-700">{slide.subtitle}</span></h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{slide.tagline}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <button
                        onClick={() => setEditingSlide(slide)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: ACTIVITIES MANAGER */}
          {/* ======================================================== */}
          {activeTab === 'activities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Activities & Sports Programs</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage the 4 primary sports and cultural offerings</p>
                </div>
                <button
                  onClick={() => setShowAddActivityModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Activity</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cmsData.activities.map((act) => (
                  <div key={act.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div className="relative h-36">
                      <img src={act.image} alt={act.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 text-white">
                        <span className="text-[10px] uppercase font-bold text-emerald-400">{act.category}</span>
                        <h4 className="font-extrabold text-base leading-tight">{act.title}</h4>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="text-xs font-semibold text-slate-600">{act.subtext}</div>
                      <p className="text-xs text-slate-500 line-clamp-2">{act.description}</p>
                      
                      <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                        <span className="text-[11px] text-slate-400">ID: {act.id}</span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => setEditingActivity(act)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteActivity(act.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: UPCOMING EVENTS */}
          {/* ======================================================== */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Events & Competitions CMS</h2>
                  <p className="text-xs text-slate-500 mt-1">Schedule tournaments, matches, and cultural evenings</p>
                </div>
                <button
                  onClick={() => setShowAddEventModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Event</span>
                </button>
              </div>

              <div className="space-y-4">
                {cmsData.events.map((evt) => {
                  const eventRsvps = (cmsData.rsvps || []).filter(r => r.eventId === evt.id);
                  return (
                    <div key={evt.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-slate-950 text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
                          <span className="text-[10px] font-black uppercase text-emerald-400">{evt.month}</span>
                          <span className="text-lg font-black leading-none">{evt.day}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                              {evt.category}
                            </span>
                            <span className="text-xs text-slate-400">• {evt.time}</span>
                          </div>
                          <h4 className="font-extrabold text-base text-slate-900 mt-0.5">{evt.title}</h4>
                          <p className="text-xs text-slate-500">📍 {evt.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                          {eventRsvps.length} Passes Reserved
                        </span>
                        <button
                          onClick={() => setEditingEvent(evt)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: MEMBERS ROSTER */}
          {/* ======================================================== */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Members & Applicants Roster</h2>
                  <p className="text-xs text-slate-500 mt-1">All registrations submitted from the public portal</p>
                </div>
                <button
                  onClick={handleExportMembersCSV}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Export to CSV</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Member ID</th>
                        <th className="p-3.5">Name</th>
                        <th className="p-3.5">Wing / Squad</th>
                        <th className="p-3.5">Phone</th>
                        <th className="p-3.5">Address</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {cmsData.members.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-slate-700">{m.memberId || 'N/A'}</td>
                          <td className="p-3.5 font-bold text-slate-900">{m.name}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {m.wing}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-600">{m.phone}</td>
                          <td className="p-3.5 text-slate-500">{m.address}</td>
                          <td className="p-3.5">
                            <button
                              onClick={() => handleToggleMemberStatus(m.id)}
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                m.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {m.status || 'Active'}
                            </button>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleDeleteMember(m.id)}
                              className="text-slate-400 hover:text-rose-600 p-1"
                              title="Delete Member"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 7: GALLERY MANAGER */}
          {/* ======================================================== */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Moments That Matter (Gallery)</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage photos and video highlights shown in the gallery grid</p>
                </div>
                <button
                  onClick={() => setShowAddGalleryModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo / Video</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {cmsData.gallery.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div className="relative aspect-[4/3] bg-slate-900">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {item.isVideo && (
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                          ▶ Video
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">{item.category}</span>
                      <h4 className="font-bold text-xs text-slate-900 truncate">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 8: NEWS & BULLETINS */}
          {/* ======================================================== */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">News & Bulletins CMS</h2>
                  <p className="text-xs text-slate-500 mt-1">Publish notices, achievements, and club announcements</p>
                </div>
                <button
                  onClick={() => setShowAddNewsModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Bulletin</span>
                </button>
              </div>

              <div className="space-y-4">
                {cmsData.news.map((item) => (
                  <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-100 text-sky-800 uppercase">
                          {item.tag}
                        </span>
                        <span className="text-xs text-slate-400">• {item.date}</span>
                      </div>
                      <h4 className="font-extrabold text-base text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2 max-w-xl">{item.content}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => setEditingNews(item)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 9: INCOMING MESSAGES */}
          {/* ======================================================== */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">Inquiries & Contact Messages</h2>
                <p className="text-xs text-slate-500 mt-1">Messages received from the "Contact Us" modal</p>
              </div>

              <div className="space-y-3">
                {cmsData.messages.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl text-xs text-slate-400">
                    No inquiries received yet.
                  </div>
                ) : (
                  cmsData.messages.map((msg) => (
                    <div key={msg.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-900">{msg.name}</span>
                          <span className="text-xs text-slate-500">• {msg.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">{msg.date}</span>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {msg.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ============================================================ */}
      {/* MODAL 1: ADD / EDIT EVENT */}
      {/* ============================================================ */}
      {(showAddEventModal || editingEvent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative my-6 animate-in fade-in zoom-in-95">
            <button
              onClick={() => { setShowAddEventModal(false); setEditingEvent(null); }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={editingEvent ? (e) => { e.preventDefault(); handleSaveEvent(editingEvent); } : handleAddEvent} className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">
                {editingEvent ? 'Edit Event Fixture' : 'Schedule New Event'}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Month Badge</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NOV"
                    value={editingEvent ? editingEvent.month : newEventDraft.month}
                    onChange={(e) => editingEvent 
                      ? setEditingEvent({ ...editingEvent, month: e.target.value.toUpperCase() })
                      : setNewEventDraft({ ...newEventDraft, month: e.target.value.toUpperCase() })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 uppercase font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Day Badge</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15"
                    value={editingEvent ? editingEvent.day : newEventDraft.day}
                    onChange={(e) => editingEvent 
                      ? setEditingEvent({ ...editingEvent, day: e.target.value })
                      : setNewEventDraft({ ...newEventDraft, day: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inter-District Football Cup"
                  value={editingEvent ? editingEvent.title : newEventDraft.title}
                  onChange={(e) => editingEvent 
                    ? setEditingEvent({ ...editingEvent, title: e.target.value })
                    : setNewEventDraft({ ...newEventDraft, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Venue / Location</label>
                  <input
                    type="text"
                    value={editingEvent ? editingEvent.location : newEventDraft.location}
                    onChange={(e) => editingEvent 
                      ? setEditingEvent({ ...editingEvent, location: e.target.value })
                      : setNewEventDraft({ ...newEventDraft, location: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Time Range</label>
                  <input
                    type="text"
                    value={editingEvent ? editingEvent.time : newEventDraft.time}
                    onChange={(e) => editingEvent 
                      ? setEditingEvent({ ...editingEvent, time: e.target.value })
                      : setNewEventDraft({ ...newEventDraft, time: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={editingEvent ? editingEvent.category : newEventDraft.category}
                  onChange={(e) => editingEvent 
                    ? setEditingEvent({ ...editingEvent, category: e.target.value })
                    : setNewEventDraft({ ...newEventDraft, category: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                >
                  <option value="Sports">Sports</option>
                  <option value="Arts & Culture">Arts & Culture</option>
                  <option value="Community">Community Welfare</option>
                </select>
              </div>

              <ImageUploadField
                label="Event Poster / Banner Image"
                folder="events"
                value={editingEvent ? editingEvent.image : newEventDraft.image}
                onChange={(url) => editingEvent 
                  ? setEditingEvent({ ...editingEvent, image: url })
                  : setNewEventDraft({ ...newEventDraft, image: url })
                }
                helpText="Upload event poster to 'club-images' bucket or paste image link"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Event Description</label>
                <textarea
                  rows="2"
                  value={editingEvent ? editingEvent.description : newEventDraft.description}
                  onChange={(e) => editingEvent 
                    ? setEditingEvent({ ...editingEvent, description: e.target.value })
                    : setNewEventDraft({ ...newEventDraft, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setShowAddEventModal(false); setEditingEvent(null); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                >
                  {editingEvent ? 'Update Event' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: ADD / EDIT BULLETIN */}
      {/* ============================================================ */}
      {(showAddNewsModal || editingNews) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative my-6">
            <button
              onClick={() => { setShowAddNewsModal(false); setEditingNews(null); }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={editingNews ? (e) => { e.preventDefault(); handleSaveNews(editingNews); } : handleAddNews} className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">
                {editingNews ? 'Edit Bulletin' : 'Publish Announcement'}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tag / Category</label>
                  <select
                    value={editingNews ? editingNews.tag : newNewsDraft.tag}
                    onChange={(e) => editingNews 
                      ? setEditingNews({ ...editingNews, tag: e.target.value })
                      : setNewNewsDraft({ ...newNewsDraft, tag: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                  >
                    <option value="NEWS">NEWS</option>
                    <option value="ACHIEVEMENT">ACHIEVEMENT</option>
                    <option value="NOTICE">NOTICE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={editingNews ? editingNews.date : newNewsDraft.date}
                    onChange={(e) => editingNews 
                      ? setEditingNews({ ...editingNews, date: e.target.value })
                      : setNewNewsDraft({ ...newNewsDraft, date: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tryouts Scheduled This Sunday"
                  value={editingNews ? editingNews.title : newNewsDraft.title}
                  onChange={(e) => editingNews 
                    ? setEditingNews({ ...editingNews, title: e.target.value })
                    : setNewNewsDraft({ ...newNewsDraft, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Content Details</label>
                <textarea
                  rows="4"
                  required
                  value={editingNews ? editingNews.content : newNewsDraft.content}
                  onChange={(e) => editingNews 
                    ? setEditingNews({ ...editingNews, content: e.target.value })
                    : setNewNewsDraft({ ...newNewsDraft, content: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setShowAddNewsModal(false); setEditingNews(null); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                >
                  {editingNews ? 'Save Changes' : 'Post Bulletin Live'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: ADD GALLERY ITEM */}
      {/* ============================================================ */}
      {showAddGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative my-6">
            <button
              onClick={() => setShowAddGalleryModal(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleAddGallery} className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">Add Gallery Moment</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Caption / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Football Final Match Celebration"
                  value={newGalleryDraft.title}
                  onChange={(e) => setNewGalleryDraft({ ...newGalleryDraft, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newGalleryDraft.category}
                    onChange={(e) => setNewGalleryDraft({ ...newGalleryDraft, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                  >
                    <option value="Sports">Sports</option>
                    <option value="Arts & Culture">Arts & Culture</option>
                    <option value="Achievements">Achievements</option>
                    <option value="Events">Events</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isVideo"
                    checked={newGalleryDraft.isVideo}
                    onChange={(e) => setNewGalleryDraft({ ...newGalleryDraft, isVideo: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="isVideo" className="text-xs font-semibold text-slate-700">Has Video Reel</label>
                </div>
              </div>

              <ImageUploadField
                label="Photo / Media Image"
                folder="gallery"
                value={newGalleryDraft.image}
                onChange={(url) => setNewGalleryDraft({ ...newGalleryDraft, image: url })}
                helpText="Upload match or event photo directly to 'club-images' bucket"
              />

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddGalleryModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 4: ADD / EDIT HERO SLIDE */}
      {/* ============================================================ */}
      {(showAddSlideModal || editingSlide) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative my-6">
            <button
              onClick={() => { setShowAddSlideModal(false); setEditingSlide(null); }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={editingSlide ? (e) => { e.preventDefault(); handleSaveSlide(editingSlide); } : handleAddSlide} className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">
                {editingSlide ? 'Edit Hero Banner Slide' : 'Add New Hero Banner Slide'}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Welcome Tag</label>
                  <input
                    type="text"
                    required
                    value={editingSlide ? editingSlide.welcomeTag : newSlideDraft.welcomeTag}
                    onChange={(e) => editingSlide 
                      ? setEditingSlide({ ...editingSlide, welcomeTag: e.target.value })
                      : setNewSlideDraft({ ...newSlideDraft, welcomeTag: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Club Main Title</label>
                  <input
                    type="text"
                    required
                    value={editingSlide ? editingSlide.title : newSlideDraft.title}
                    onChange={(e) => editingSlide 
                      ? setEditingSlide({ ...editingSlide, title: e.target.value })
                      : setNewSlideDraft({ ...newSlideDraft, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  required
                  value={editingSlide ? editingSlide.subtitle : newSlideDraft.subtitle}
                  onChange={(e) => editingSlide 
                    ? setEditingSlide({ ...editingSlide, subtitle: e.target.value })
                    : setNewSlideDraft({ ...newSlideDraft, subtitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  required
                  value={editingSlide ? editingSlide.tagline : newSlideDraft.tagline}
                  onChange={(e) => editingSlide 
                    ? setEditingSlide({ ...editingSlide, tagline: e.target.value })
                    : setNewSlideDraft({ ...newSlideDraft, tagline: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>

              {/* Image Upload Field */}
              <ImageUploadField
                label="Slide Background Photo"
                folder="slides"
                value={editingSlide ? editingSlide.image : newSlideDraft.image}
                onChange={(url) => editingSlide 
                  ? setEditingSlide({ ...editingSlide, image: url })
                  : setNewSlideDraft({ ...newSlideDraft, image: url })
                }
                helpText="High-res landscape photo (min 1920x800 recommended)"
              />

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setShowAddSlideModal(false); setEditingSlide(null); }}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                >
                  {editingSlide ? 'Update Slide' : 'Add Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 5: ADD / EDIT ACTIVITY */}
      {/* ============================================================ */}
      {(showAddActivityModal || editingActivity) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative my-6">
            <button
              onClick={() => { setShowAddActivityModal(false); setEditingActivity(null); }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={editingActivity ? (e) => { e.preventDefault(); handleSaveActivity(editingActivity); } : handleAddActivity} className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">
                {editingActivity ? 'Edit Activity Offering' : 'Add New Activity Offering'}
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Activity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Football Academy"
                  value={editingActivity ? editingActivity.title : newActivityDraft.title}
                  onChange={(e) => editingActivity 
                    ? setEditingActivity({ ...editingActivity, title: e.target.value })
                    : setNewActivityDraft({ ...newActivityDraft, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subtext / Catchphrase</label>
                <input
                  type="text"
                  placeholder="e.g. Grassroots to Championship training"
                  value={editingActivity ? editingActivity.subtext : newActivityDraft.subtext}
                  onChange={(e) => editingActivity 
                    ? setEditingActivity({ ...editingActivity, subtext: e.target.value })
                    : setNewActivityDraft({ ...newActivityDraft, subtext: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>

              {/* Image Upload Field */}
              <ImageUploadField
                label="Activity Card Image"
                folder="activities"
                value={editingActivity ? editingActivity.image : newActivityDraft.image}
                onChange={(url) => editingActivity 
                  ? setEditingActivity({ ...editingActivity, image: url })
                  : setNewActivityDraft({ ...newActivityDraft, image: url })
                }
                helpText="Card preview image stored in 'club-images' bucket"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={editingActivity ? editingActivity.description : newActivityDraft.description}
                  onChange={(e) => editingActivity 
                    ? setEditingActivity({ ...editingActivity, description: e.target.value })
                    : setNewActivityDraft({ ...newActivityDraft, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setShowAddActivityModal(false); setEditingActivity(null); }}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                >
                  {editingActivity ? 'Update Activity' : 'Add Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
