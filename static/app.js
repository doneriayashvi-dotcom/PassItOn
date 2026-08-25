const { useState, useEffect, useRef, useCallback } = React;

/* ---------------------------------------------------------
   Design Token System
   Brand: violet-indigo "#6C5CE7", coral "#FF7A59" (AI accent)
   Ink neutrals: #101014 → #FAFAFC
--------------------------------------------------------- */
const T = {
  brand: '#A18CD1',      // Pastel Purple
  brandDark: '#8F75C5',
  brandSoft: '#F3EFFF',
  coral: '#FFB8B8',      // Pastel Peach/Pink
  coralSoft: '#FFEBEB',
  mint: '#B8E9D5',       // Pastel Mint
  blue: '#AECBFA',       // Pastel Blue
  ink900: '#2D3142',     // Soft dark navy
  ink700: '#4F5D75',
  ink400: '#9098A9',
  ink200: '#E1E5ED',
  ink100: '#F4F6F9',
  ink50: '#FAFBFD',
};

/* ---------------------------------------------------------
   SVG Icons Component Library
--------------------------------------------------------- */
function Icon({ name, className = "w-5 h-5", style = {} }) {
  switch (name) {
    case 'home':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      );
    case 'sparkles':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
          <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
        </svg>
      );
    case 'plus':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      );
    case 'search':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      );
    case 'sliders':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/>
        </svg>
      );
    case 'mail':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      );
    case 'shield':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      );
    case 'check-circle':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      );
    case 'arrow-right':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      );
    case 'x':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      );
    case 'book':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      );
    case 'wrench':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      );
    case 'bike':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
        </svg>
      );
    case 'laptop':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="12" x="3" y="4" rx="2"/><line x1="2" x2="22" y1="20" y2="20"/>
        </svg>
      );
    case 'tag':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><circle cx="7" cy="7" r=".5" fill="currentColor"/>
        </svg>
      );
    case 'message':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
        </svg>
      );
    case 'send':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      );
    case 'star':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      );
    case 'clock':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      );
    default:
      return null;
  }
}

const CATEGORIES = [
  { id: 'books', label: 'Books', iconName: 'book' },
  { id: 'skills', label: 'Skills', iconName: 'wrench' },
  { id: 'rides', label: 'Rides & Gear', iconName: 'bike' },
  { id: 'tech', label: 'Tech', iconName: 'laptop' },
];

/* ---------------------------------------------------------
   Root App
--------------------------------------------------------- */
function App() {
  const [phase, setPhase] = useState('splash'); // splash | email | verified | main
  const [userEmail, setUserEmail] = useState('student@campus.edu');

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#0E0E12]">
      <div
        className="w-full max-w-5xl min-h-[100dvh] sm:border-x border-white/10 overflow-hidden relative flex flex-col shadow-2xl"
        style={{ background: T.ink50 }}
      >
        {phase === 'splash' && <SplashScreen onDone={() => setPhase('email')} />}
        {phase === 'email' && (
          <EmailVerifyScreen 
            onVerified={(email) => {
              if (email) setUserEmail(email);
              setPhase('verified');
            }} 
          />
        )}
        {phase === 'verified' && <VerifiedScreen onContinue={() => setPhase('main')} />}
        {phase === 'main' && <MainApp currentUserEmail={userEmail} />}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   1. Splash — Logo front slide, strictly 2.8s timer
--------------------------------------------------------- */
function SplashScreen({ onDone }) {
  useEffect(() => {
    // 1.8 seconds timer before proceeding
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden select-none" style={{ background: T.ink50 }}>
      {/* Ambient background glows */}
      <div
        className="absolute -top-24 -right-16 w-80 h-80 rounded-full blur-3xl opacity-40 animate-pulse-slow"
        style={{ background: T.brandSoft }}
      />
      <div
        className="absolute -bottom-28 -left-20 w-80 h-80 rounded-full blur-3xl opacity-50 animate-pulse-slow"
        style={{ background: T.coralSoft }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-80 rounded-full blur-3xl opacity-30"
        style={{ background: T.mintSoft }}
      />

      <div className="relative flex flex-col items-center animate-splash-in z-10">
        {/* Glowing Logo Badge */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl transition-transform hover:scale-105"
          style={{ 
            background: `linear-gradient(135deg, ${T.brand}, ${T.coral})`, 
            boxShadow: `0 15px 35px ${T.brand}40` 
          }}
        >
          <span className="text-white font-bold text-4xl">P</span>
        </div>
        
        <h1 className="font-bold text-4xl text-gray-800 flex items-center">
          Pass<span style={{ color: T.coral }}>It</span>On
        </h1>
        <p className="text-[14px] mt-2 tracking-wide font-medium" style={{ color: T.ink400 }}>
          campus stuff, passed on
        </p>

        <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 bg-white shadow-sm">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ background: T.brand }} />
          <span className="text-[12px] text-gray-500 font-medium">Connecting to campus network...</span>
        </div>
      </div>

      {/* 2.8s Animated Loading Bar */}
      <div className="absolute bottom-12 w-44 h-2 rounded-full overflow-hidden shadow-inner" style={{ background: T.ink100 }}>
        <div className="h-full rounded-full animate-splash-bar" style={{ background: `linear-gradient(90deg, ${T.brand}, ${T.coral})` }} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   2. Email verification
--------------------------------------------------------- */
function EmailVerifyScreen({ onVerified }) {
  const [step, setStep] = useState('email'); // email | code
  const [email, setEmail] = useState('alex@campus.edu');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [demoCodeHint, setDemoCodeHint] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const inputsRef = useRef([]);

  async function sendCode(e) {
    if (e) e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setDemoCodeHint(data.demo_code || '123456');
        setStep('code');
        setTimeout(() => inputsRef.current[0]?.focus(), 100);
      } else {
        setErrorMsg(data.detail || 'Failed to send code');
      }
    } catch (err) {
      // Fallback for offline resilience
      setDemoCodeHint('123456');
      setStep('code');
    } finally {
      setLoading(false);
    }
  }

  function updateDigit(i, val) {
    if (val && !/^[0-9]$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) inputsRef.current[i + 1]?.focus();
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
    if (e.key === 'Enter') {
      const fullCode = code.join('');
      if (fullCode.length === 6) {
        verifyCode();
      }
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      const next = [...code];
      pasted.split('').forEach((char, index) => {
        if (index < 6) next[index] = char;
      });
      setCode(next);
      const focusIndex = Math.min(pasted.length, 5);
      inputsRef.current[focusIndex]?.focus();
    }
  }

  async function verifyCode() {
    const fullCode = code.join('');
    if (fullCode.length < 6) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code: fullCode })
      });
      const data = await res.json();
      if (res.ok) {
        onVerified(email.trim());
      } else {
        setErrorMsg(data.detail || 'Invalid code, try 123456');
      }
    } catch (err) {
      onVerified(email.trim());
    } finally {
      setLoading(false);
    }
  }

  const codeComplete = code.every((d) => d !== '');

  return (
    <div className="flex-1 flex flex-col px-6 pt-12 pb-6 overflow-y-auto">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
        style={{ background: T.brandSoft }}
      >
        {step === 'email' ? (
          <Icon name="mail" className="w-7 h-7" style={{ color: T.brand }} />
        ) : (
          <Icon name="shield" className="w-7 h-7" style={{ color: T.brand }} />
        )}
      </div>

      {step === 'email' ? (
        <>
          <h2 className="font-black text-2xl tracking-tight" style={{ color: T.ink900 }}>
            Verify your student email
          </h2>
          <p className="text-[14px] mt-2 leading-relaxed" style={{ color: T.ink400 }}>
            PassItOn is verified for students only. We'll send a 6-digit passcode to confirm it's really you.
          </p>

          <form onSubmit={sendCode} className="mt-8">
            <label className="text-[12px] font-bold uppercase tracking-wider" style={{ color: T.ink700 }}>
              College email address
            </label>
            <div className="relative mt-2">
              <input
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@college.edu"
                className="w-full rounded-xl px-4 py-3.5 text-[15px] outline-none border-2 transition-all font-medium"
                style={{ borderColor: T.ink200, background: '#fff', color: T.ink900 }}
                onFocus={(e) => (e.target.style.borderColor = T.brand)}
                onBlur={(e) => (e.target.style.borderColor = T.ink200)}
              />
            </div>

            {errorMsg && (
              <p className="text-red-500 text-xs font-semibold mt-2">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={!email.trim() || loading}
              className="w-full mt-6 rounded-xl py-3.5 font-bold text-[15px] text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] disabled:opacity-40"
              style={{ background: T.brand }}
            >
              {loading ? 'Sending code...' : (
                <>Send verification code <Icon name="arrow-right" className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-auto pt-8 text-center">
            <span className="text-[12px] px-3 py-1 rounded-full font-medium" style={{ background: T.ink100, color: T.ink700 }}>
              🔒 Protected campus ecosystem
            </span>
          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-2xl tracking-tight" style={{ color: T.ink900 }}>
            Enter the 6-digit code
          </h2>
          <p className="text-[14px] mt-2 leading-relaxed" style={{ color: T.ink400 }}>
            We sent a verification code to <span className="font-bold" style={{ color: T.ink900 }}>{email}</span>
          </p>

          {demoCodeHint && (
            <div className="mt-4 p-3 rounded-xl flex items-center justify-between border" style={{ background: T.coralSoft, borderColor: `${T.coral}44` }}>
              <span className="text-[12px] font-bold" style={{ color: T.coral }}>Demo Passcode:</span>
              <span className="text-[14px] font-mono font-black tracking-widest px-2 py-0.5 rounded bg-white" style={{ color: T.coral }}>
                {demoCodeHint}
              </span>
            </div>
          )}

          <div className="flex gap-2 mt-7 justify-between" onPaste={handlePaste}>
            {code.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                value={d}
                onChange={(e) => updateDigit(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                maxLength={1}
                inputMode="numeric"
                className="w-12 h-14 text-center text-2xl font-black rounded-xl border-2 outline-none transition-all"
                style={{ 
                  borderColor: d ? T.brand : T.ink200, 
                  color: T.ink900,
                  background: d ? T.brandSoft : '#fff'
                }}
              />
            ))}
          </div>

          {errorMsg && (
            <p className="text-red-500 text-xs font-semibold mt-3 text-center">{errorMsg}</p>
          )}

          <button
            disabled={!codeComplete || loading}
            onClick={verifyCode}
            className="w-full mt-7 rounded-xl py-3.5 font-bold text-[15px] text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] disabled:opacity-40"
            style={{ background: T.brand }}
          >
            {loading ? 'Verifying...' : 'Verify Student ID'}
          </button>

          <button
            onClick={() => setStep('email')}
            className="mt-4 text-[13px] font-semibold mx-auto hover:underline"
            style={{ color: T.ink400 }}
          >
            Wrong email address? Change email
          </button>
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   3. Verified Screen
--------------------------------------------------------- */
function VerifiedScreen({ onContinue }) {
  useEffect(() => {
    const t = setTimeout(onContinue, 1800);
    return () => clearTimeout(t);
  }, [onContinue]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center select-none">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6 animate-pop-in shadow-xl"
        style={{ background: T.brandSoft }}
      >
        <Icon name="check-circle" className="w-10 h-10" style={{ color: T.brand }} />
      </div>
      <h2 className="font-black text-3xl tracking-tight" style={{ color: T.ink900 }}>
        You're Verified!
      </h2>
      <p className="text-[14px] mt-2 font-medium leading-relaxed" style={{ color: T.ink400 }}>
        Welcome to your campus exchange. Let's find your first trade.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------
   4. Main App Container
--------------------------------------------------------- */
function MainApp({ currentUserEmail }) {
  const [screen, setScreen] = useState('home'); // home | smartmatch
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all | offer | want
  const [stats, setStats] = useState({ total_listings: 0, total_users: 142 });
  const [loading, setLoading] = useState(true);

  const fetchListings = useCallback(async () => {
    try {
      let url = '/api/listings';
      const params = new URLSearchParams();
      if (activeCategory) params.append('category', activeCategory);
      if (filterType !== 'all') params.append('type', filterType);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      
      const qs = params.toString();
      if (qs) url += `?${qs}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setListings(data);
      }
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, filterType, searchQuery]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    fetchListings();
    fetchStats();
  }, [fetchListings, fetchStats]);

  const handleCreate = useCallback(async (formData) => {
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          poster: 'You',
          poster_email: currentUserEmail
        })
      });
      if (res.ok) {
        const created = await res.json();
        setListings((prev) => [created, ...prev]);
        setShowCreate(false);
        setScreen('home');
        fetchStats();
      }
    } catch (err) {
      console.error(err);
    }
  }, [currentUserEmail, fetchStats]);

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-white">
      {screen === 'home' && (
        <HomeScreen
          listings={listings}
          stats={stats}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filterType={filterType}
          setFilterType={setFilterType}
          onListingClick={setSelectedListing}
          onSmartMatch={() => setScreen('smartmatch')}
          onOpenInbox={() => setShowInbox(true)}
          loading={loading}
        />
      )}

      {screen === 'smartmatch' && (
        <SmartMatchChat 
          listings={listings} 
          onListingClick={setSelectedListing} 
          onBack={() => setScreen('home')} 
        />
      )}

      {/* Bottom Navigation */}
      <nav
        className="sticky bottom-0 z-30 backdrop-blur-xl border-t shadow-lg"
        style={{ background: 'rgba(255,255,255,0.92)', borderColor: T.ink100 }}
      >
        <div className="flex items-center justify-around px-3 py-2">
          <NavButton 
            iconName="home" 
            label="Feed" 
            active={screen === 'home'} 
            onClick={() => setScreen('home')} 
          />
          <NavButton 
            iconName="sparkles" 
            label="Smart Match" 
            active={screen === 'smartmatch'} 
            onClick={() => setScreen('smartmatch')} 
            accent 
          />
          
          {/* Post Action Button */}
          <button 
            onClick={() => setShowCreate(true)} 
            className="flex flex-col items-center gap-1 -mt-5 group"
          >
            <div
              className="w-13 h-13 rounded-2xl text-white flex items-center justify-center shadow-lg active:scale-95 group-hover:scale-105 transition-all p-3"
              style={{ background: `linear-gradient(135deg, ${T.brand}, ${T.brandDark})`, boxShadow: `0 8px 24px ${T.brand}55` }}
            >
              <Icon name="plus" className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold" style={{ color: T.ink700 }}>Post</span>
          </button>

          <NavButton 
            iconName="message" 
            label="Messages" 
            active={showInbox} 
            onClick={() => setShowInbox(true)} 
          />
        </div>
      </nav>

      {/* Overlays / Modals */}
      {selectedListing && (
        <ListingDetail 
          listing={selectedListing} 
          currentUserEmail={currentUserEmail}
          onClose={() => setSelectedListing(null)} 
        />
      )}
      
      {showCreate && (
        <CreateListing 
          onClose={() => setShowCreate(false)} 
          onCreate={handleCreate} 
        />
      )}

      {showInbox && (
        <MessagesInbox 
          currentUserEmail={currentUserEmail}
          onClose={() => setShowInbox(false)} 
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Feed / Home Screen
--------------------------------------------------------- */
function HomeScreen({ 
  listings, 
  stats, 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory, 
  filterType, 
  setFilterType, 
  onListingClick, 
  onSmartMatch,
  onOpenInbox,
  loading 
}) {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 backdrop-blur-xl border-b" style={{ background: 'rgba(255,255,255,0.92)', borderColor: T.ink100 }}>
        <div className="px-4 pt-3.5 pb-2.5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="font-black text-2xl leading-none tracking-tight" style={{ color: T.ink900 }}>
                Pass<span style={{ color: T.brand }}>It</span>On
              </h1>
              <p className="text-[11px] mt-0.5 font-medium" style={{ color: T.ink400 }}>
                campus stuff, passed on
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={onOpenInbox}
                className="w-9 h-9 rounded-full flex items-center justify-center border active:scale-95 transition-transform"
                style={{ borderColor: T.ink200, background: T.ink50 }}
              >
                <Icon name="message" className="w-4 h-4" style={{ color: T.ink700 }} />
              </button>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
                style={{ background: `linear-gradient(135deg, ${T.brand}, ${T.brandDark})` }}
              >
                P
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative mb-2.5">
            <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: T.ink400 }} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search textbooks, tech, skills, rides..."
              className="w-full rounded-xl pl-10 pr-8 py-2.5 text-[13.5px] font-medium outline-none border transition-all"
              style={{ background: T.ink50, borderColor: T.ink200, color: T.ink900 }}
              onFocus={(e) => (e.target.style.borderColor = T.brand)}
              onBlur={(e) => (e.target.style.borderColor = T.ink200)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Icon name="x" className="w-4 h-4" style={{ color: T.ink400 }} />
              </button>
            )}
          </div>

          {/* Filter Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFilterType(filterType === 'all' ? 'offer' : filterType === 'offer' ? 'want' : 'all')}
                className="flex items-center gap-1.5 text-[11.5px] font-bold px-3 py-1.5 rounded-full border transition-all active:scale-95"
                style={{ 
                  color: filterType !== 'all' ? T.brand : T.ink700, 
                  background: filterType !== 'all' ? T.brandSoft : T.ink50,
                  borderColor: filterType !== 'all' ? T.brand : T.ink200
                }}
              >
                <Icon name="sliders" className="w-3.5 h-3.5" />
                {filterType === 'all' ? 'All Types' : filterType === 'offer' ? '🎁 Offering' : '🔍 Wanted'}
              </button>
            </div>
            
            <span className="text-[11px] font-semibold" style={{ color: T.ink400 }}>
              {listings.length} campus items
            </span>
          </div>
        </div>

        {/* Category Carousel */}
        <div className="overflow-x-auto no-scrollbar px-4 pb-2.5">
          <div className="flex gap-2 w-max">
            <CategoryChip 
              active={activeCategory === null} 
              onClick={() => setActiveCategory(null)} 
              label="All" 
              iconName="tag" 
            />
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat.id}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                label={cat.label}
                iconName={cat.iconName}
              />
            ))}
          </div>
        </div>
      </header>

      {/* AI Smart Match Hero Banner */}
      {!searchQuery && !activeCategory && (
        <div className="px-4 pt-3.5">
          <button
            onClick={onSmartMatch}
            className="w-full relative overflow-hidden rounded-3xl p-5 text-left active:scale-[0.98] transition-all shadow-xl group"
            style={{ background: `linear-gradient(135deg, ${T.brand}, ${T.coral})` }}
          >
            {/* Animated glowing orbs inside */}
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-50 animate-pulse-slow" style={{ background: '#FFF' }} />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full blur-3xl opacity-30 animate-pulse-slow" style={{ background: T.mint }} />
            
            <div 
              className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform bg-white/20 backdrop-blur-md border border-white/40" 
            >
              <Icon name="sparkles" className="w-6 h-6 text-white" />
            </div>
            
            <div className="relative z-10">
              <span className="text-[10.5px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/30">
                ✨ AI MATCHMAKER
              </span>
              <h3 className="font-bold text-white text-[18px] leading-tight mt-2.5">
                Smart Match Assistant
              </h3>
              <p className="text-[12.5px] mt-1 max-w-[220px] font-medium text-white/90">
                Describe what you need in plain English. We'll find the right student.
              </p>
            </div>
          </button>
        </div>
      )}

      {/* Listings Grid */}
      <div className="flex-1 px-3 py-3 pb-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: T.brand, borderTopColor: 'transparent' }} />
            <p className="text-[12px] font-medium mt-3" style={{ color: T.ink400 }}>Loading campus items...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3" style={{ background: T.ink100 }}>
              <Icon name="search" className="w-7 h-7" style={{ color: T.ink400 }} />
            </div>
            <p className="text-[15px] font-bold" style={{ color: T.ink900 }}>No listings found</p>
            <p className="text-[13px] mt-1" style={{ color: T.ink400 }}>Try searching another keyword or post what you need!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} onClick={onListingClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Listing Card Component
--------------------------------------------------------- */
function ListingCard({ listing, onClick }) {
  const cat = CATEGORIES.find((c) => c.id === listing.category);
  const isOffer = listing.type === 'offer';
  
  let urgencyLabel = "FLEXIBLE";
  let urgencyColor = "#888";
  let urgencyIcon = "⏳";
  
  if (listing.urgency === '1_asap') { urgencyLabel = "ASAP"; urgencyColor = T.coral; urgencyIcon = "🔥"; }
  if (listing.urgency === '2_this_week') { urgencyLabel = "THIS WEEK"; urgencyColor = T.brand; urgencyIcon = "⚡"; }

  return (
    <button 
      onClick={() => onClick(listing)} 
      className="w-full text-left p-4 h-[190px] rounded-[24px] flex flex-col justify-between soft-shadow soft-btn bg-white hover:bg-opacity-80"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ 
              color: isOffer ? T.brandDark : T.coral, 
              background: isOffer ? T.brandSoft : T.coralSoft 
            }}
          >
            {isOffer ? 'Offering' : 'Wanted'}
          </span>
          <div className="flex items-center gap-1 text-[9.5px] font-bold px-2 py-1 rounded-full" style={{ color: urgencyColor, background: T.ink100 }}>
            <span>{urgencyIcon}</span> {urgencyLabel}
          </div>
        </div>
        <p className="text-[14px] font-bold leading-snug line-clamp-2 mt-2" style={{ color: T.ink900 }}>
          {listing.title}
        </p>
        <p className="text-[11.5px] mt-1.5 line-clamp-2 font-medium leading-relaxed" style={{ color: T.ink700 }}>
          {listing.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: T.ink100 }}>
        <span className="text-[10.5px] font-bold truncate max-w-[70px]">
          @{listing.poster.replace(' ', '').toLowerCase()}
        </span>
        <div className="flex items-center gap-1">
          <Icon name="star" className="w-3 h-3" style={{ color: '#F5B800' }} />
          <span className="text-[10.5px] font-bold" style={{ color: T.ink700 }}>
            {listing.rating || '5.0'}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ---------------------------------------------------------
   Category Chip
--------------------------------------------------------- */
function CategoryChip({ active, onClick, label, iconName }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-all active:scale-95 border"
      style={active ? { 
        background: T.ink900, 
        color: '#fff', 
        borderColor: T.ink900 
      } : { 
        background: '#fff', 
        color: T.ink700, 
        borderColor: T.ink200 
      }}
    >
      <Icon name={iconName} className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

/* ---------------------------------------------------------
   Nav Button
--------------------------------------------------------- */
function NavButton({ iconName, label, active, onClick, accent }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 flex-1 py-1 active:scale-95 transition-transform">
      <Icon 
        name={iconName} 
        className="w-5 h-5 transition-colors" 
        style={{ color: active ? (accent ? T.coral : T.brand) : T.ink400 }} 
      />
      <span 
        className="text-[10px] font-bold transition-colors" 
        style={{ color: active ? T.ink900 : T.ink400 }}
      >
        {label}
      </span>
    </button>
  );
}

/* ---------------------------------------------------------
   Listing Detail Sheet / Modal
--------------------------------------------------------- */
function ListingDetail({ listing, currentUserEmail, onClose }) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const cat = CATEGORIES.find((c) => c.id === listing.category);
  const isOffer = listing.type === 'offer';

  async function handleContact(e) {
    e.preventDefault();
    if (!message.trim() || sending) return;
    setSending(true);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listing_id: String(listing.id),
          sender_email: currentUserEmail,
          receiver_name: listing.poster,
          message: message.trim()
        })
      });
      if (res.ok) {
        setSentSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-[2rem] p-6 pb-8 animate-sheet-up max-h-[88%] overflow-y-auto shadow-2xl">
        <div className="w-12 h-1.5 rounded-full mx-auto mb-4" style={{ background: T.ink200 }} />
        
        <div className="flex items-start justify-between">
          <span
            className="text-[10.5px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full"
            style={{ 
              color: isOffer ? T.brand : T.coral, 
              background: isOffer ? T.brandSoft : T.coralSoft 
            }}
          >
            {isOffer ? 'Offering' : 'Wanted'}
          </span>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <Icon name="x" className="w-5 h-5" style={{ color: T.ink400 }} />
          </button>
        </div>

        <h2 className="font-black text-xl mt-3 leading-snug" style={{ color: T.ink900 }}>
          {listing.title}
        </h2>
        <p className="text-[14px] mt-2.5 leading-relaxed" style={{ color: T.ink700 }}>
          {listing.description}
        </p>

        {/* Poster Card */}
        <div className="flex items-center gap-3.5 mt-5 p-3 rounded-2xl border" style={{ borderColor: T.ink100, background: T.ink50 }}>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-sm"
            style={{ background: `linear-gradient(135deg, ${T.brand}, ${T.brandDark})` }}
          >
            {listing.poster.charAt(0)}
          </div>
          <div>
            <p className="text-[13.5px] font-bold" style={{ color: T.ink900 }}>{listing.poster}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Icon name="star" className="w-3 h-3" style={{ color: '#F5B800' }} />
              <span className="text-[11px] font-semibold" style={{ color: T.ink400 }}>
                {listing.rating || '5.0'} rating · {cat?.label || 'General'}
              </span>
            </div>
          </div>
          <span className="ml-auto flex items-center gap-1 text-[11px] font-medium" style={{ color: T.ink400 }}>
            <Icon name="clock" className="w-3 h-3" /> {listing.time_ago || 'recent'}
          </span>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleContact} className="mt-5">
          <label className="text-[11.5px] font-bold uppercase tracking-wider block mb-1.5" style={{ color: T.ink700 }}>
            Send message to {listing.poster.split(' ')[0]}
          </label>
          <div className="flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hi ${listing.poster.split(' ')[0]}, is this still available?`}
              className="flex-1 rounded-xl px-3.5 py-3 text-[13.5px] border outline-none font-medium"
              style={{ borderColor: T.ink200, color: T.ink900 }}
              disabled={sentSuccess}
            />
            <button
              type="submit"
              disabled={!message.trim() || sending || sentSuccess}
              className="px-5 rounded-xl font-bold text-[14px] text-white flex items-center justify-center gap-1.5 active:scale-95 transition-all disabled:opacity-50"
              style={{ background: sentSuccess ? '#22c55e' : T.brand }}
            >
              {sentSuccess ? 'Sent ✓' : sending ? '...' : <Icon name="send" className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Create Listing Sheet / Modal
--------------------------------------------------------- */
function CreateListing({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('books');
  const [type, setType] = useState('offer'); // offer | want
  const [urgency, setUrgency] = useState('3_flexible');

  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onCreate({ title, description, category, type, urgency });
  }

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={submit} className="relative bg-white rounded-t-[2rem] p-6 pb-8 animate-sheet-up max-h-[92%] overflow-y-auto shadow-2xl">
        <div className="w-12 h-1.5 rounded-full mx-auto mb-4" style={{ background: T.ink200 }} />
        
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-xl" style={{ color: T.ink900 }}>Create Campus Post</h2>
          <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <Icon name="x" className="w-5 h-5" style={{ color: T.ink400 }} />
          </button>
        </div>

        {/* Type selector */}
        <div className="flex gap-2 mb-4 p-1 rounded-xl" style={{ background: T.ink100 }}>
          <button
            type="button"
            onClick={() => setType('offer')}
            className="flex-1 py-2.5 rounded-lg text-[13px] font-bold transition-all"
            style={type === 'offer' ? { background: '#fff', color: T.brand, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' } : { color: T.ink700 }}
          >
            🎁 I'm Offering Something
          </button>
          <button
            type="button"
            onClick={() => setType('want')}
            className="flex-1 py-2.5 rounded-lg text-[13px] font-bold transition-all"
            style={type === 'want' ? { background: '#fff', color: T.coral, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' } : { color: T.ink700 }}
          >
            🔍 I Need Something
          </button>
        </div>

        <label className="text-[11.5px] font-bold uppercase tracking-wider block" style={{ color: T.ink700 }}>
          Item or Service Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Signals & Systems Textbook or Arduino Kit"
          className="w-full mt-1.5 mb-4 rounded-xl px-4 py-3 text-[14px] outline-none border-2 font-medium"
          style={{ borderColor: T.ink200, color: T.ink900 }}
          required
        />

        <label className="text-[11.5px] font-bold uppercase tracking-wider block" style={{ color: T.ink700 }}>
          Details & Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe condition, timing, trade preference (or free exchange)..."
          rows={3}
          className="w-full mt-1.5 mb-4 rounded-xl px-4 py-3 text-[14px] outline-none border-2 resize-none font-medium"
          style={{ borderColor: T.ink200, color: T.ink900 }}
          required
        />

        <label className="text-[11.5px] font-bold uppercase tracking-wider block" style={{ color: T.ink700 }}>
          Urgency / Timeline
        </label>
        <div className="grid grid-cols-3 gap-2 mt-1.5 mb-4">
          <button type="button" onClick={() => setUrgency('1_asap')} className="p-2 rounded-[16px] border text-[11.5px] font-bold uppercase text-center soft-btn" style={urgency === '1_asap' ? { borderColor: T.coral, background: T.coralSoft, color: T.ink900 } : { borderColor: T.ink200, background: '#fff' }}>
            🔥 ASAP
          </button>
          <button type="button" onClick={() => setUrgency('2_this_week')} className="p-2 rounded-[16px] border text-[11.5px] font-bold uppercase text-center soft-btn" style={urgency === '2_this_week' ? { borderColor: T.brand, background: T.brandSoft, color: T.brandDark } : { borderColor: T.ink200, background: '#fff' }}>
            ⚡ THIS WK
          </button>
          <button type="button" onClick={() => setUrgency('3_flexible')} className="p-2 rounded-[16px] border text-[11.5px] font-bold uppercase text-center soft-btn" style={urgency === '3_flexible' ? { borderColor: T.ink900, background: T.ink100, color: T.ink900 } : { borderColor: T.ink200, background: '#fff' }}>
            ⏳ FLEXIBLE
          </button>
        </div>

        <label className="text-[11.5px] font-bold uppercase tracking-wider block" style={{ color: T.ink700 }}>
          Category
        </label>
        <div className="grid grid-cols-2 gap-2 mt-1.5 mb-6">
          {CATEGORIES.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => setCategory(c.id)}
              className="flex items-center gap-2 p-3 rounded-xl border text-[13px] font-bold transition-all text-left"
              style={category === c.id ? { 
                background: T.ink900, 
                color: '#fff',
                borderColor: T.ink900 
              } : { 
                background: '#fff', 
                color: T.ink700, 
                borderColor: T.ink200 
              }}
            >
              <Icon name={c.iconName} className="w-4 h-4" />
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl py-3.5 font-bold text-[15px] text-white soft-btn soft-shadow"
          style={{ background: T.brand }}
        >
          Publish to Campus Feed
        </button>
      </form>
    </div>
  );
}

/* ---------------------------------------------------------
   Smart Match AI Chat Assistant
--------------------------------------------------------- */
function SmartMatchChat({ listings, onListingClick, onBack }) {
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      text: "👋 Hey there! I'm the PassItOn AI Matchmaker. Tell me in plain words what you're looking for or what you'd like to offer on campus!",
      suggestions: ["Need a graphing calculator", "Hostel bicycle for sale", "Looking for guitar tutor", "Arduino kit for hackathon"]
    },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { 
    endRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [messages, thinking]);

  async function handleSend(queryText) {
    const q = queryText || input.trim();
    if (!q) return;

    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setThinking(true);

    try {
      const res = await fetch('/api/smartmatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      if (res.ok) {
        const data = await res.json();
        setMessages((m) => [
          ...m, 
          { 
            role: 'ai', 
            text: data.reply, 
            listings: data.matches 
          }
        ]);
      } else {
        throw new Error('API failed');
      }
    } catch (err) {
      // Fallback matching
      const ql = q.toLowerCase();
      const matches = listings.filter((l) => 
        l.title.toLowerCase().includes(ql.split(' ')[0]) || 
        l.description.toLowerCase().includes(ql.split(' ')[0])
      ).slice(0, 2);

      setMessages((m) => [
        ...m, 
        { 
          role: 'ai', 
          text: `Here's what looks closest to "${q}" on campus:`, 
          listings: matches.length ? matches : listings.slice(0, 2) 
        }
      ]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#FAFAFC]">
      {/* Chat Header */}
      <header className="flex items-center justify-between px-4 py-3.5 border-b backdrop-blur-md bg-white/90" style={{ borderColor: T.ink100 }}>
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] font-bold" style={{ color: T.ink700 }}>
          ← Feed
        </button>
        <div className="flex items-center gap-1.5">
          <Icon name="sparkles" className="w-4 h-4" style={{ color: T.coral }} />
          <span className="font-black text-[15px]" style={{ color: T.ink900 }}>Smart Match AI</span>
        </div>
        <span className="w-6" />
      </header>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%]">
              <div
                className="rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed shadow-sm font-medium"
                style={m.role === 'user' ? { 
                  background: T.brand, 
                  color: '#fff',
                  borderBottomRightRadius: '4px' 
                } : { 
                  background: '#fff', 
                  color: T.ink900, 
                  border: `1px solid ${T.ink200}`,
                  borderBottomLeftRadius: '4px' 
                }}
              >
                {m.text}
              </div>

              {/* Suggestions chips */}
              {m.suggestions && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.suggestions.map((s, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSend(s)}
                      className="text-[11.5px] font-bold px-3 py-1.5 rounded-full border bg-white active:scale-95 transition-transform"
                      style={{ borderColor: T.ink200, color: T.brand }}
                    >
                      💡 {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Matched Listing Cards */}
              {m.listings && m.listings.length > 0 && (
                <div className="mt-2.5 space-y-2">
                  {m.listings.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => onListingClick(l)}
                      className="w-full text-left rounded-xl p-3 border active:scale-[0.98] transition-all bg-white hover:border-gray-300 shadow-sm"
                      style={{ borderColor: T.ink200 }}
                    >
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full"
                          style={{ 
                            background: l.type === 'offer' ? T.brandSoft : T.coralSoft,
                            color: l.type === 'offer' ? T.brand : T.coral 
                          }}
                        >
                          {l.type === 'offer' ? 'Offering' : 'Wanted'}
                        </span>
                        <span className="text-[10px] font-semibold" style={{ color: T.ink400 }}>⭐ {l.rating || '5.0'}</span>
                      </div>
                      <p className="text-[13px] font-bold mt-1" style={{ color: T.ink900 }}>{l.title}</p>
                      <p className="text-[11px] mt-0.5 line-clamp-1" style={{ color: T.ink400 }}>{l.description}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 flex items-center gap-1.5 bg-white border" style={{ borderColor: T.ink200 }}>
              <span className="text-[11px] font-bold" style={{ color: T.coral }}>AI Scanning campus</span>
              <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: T.coral, animationDelay: '0s' }} />
              <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: T.coral, animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: T.coral, animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input Bar */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
        className="flex items-center gap-2 px-4 py-3 border-t bg-white shadow-md" 
        style={{ borderColor: T.ink100 }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Need a scientific calculator for exams..."
          className="flex-1 text-[13.5px] outline-none font-medium px-2 py-1"
          style={{ color: T.ink900 }}
        />
        <button 
          type="submit" 
          disabled={!input.trim() || thinking}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 active:scale-95 transition-transform disabled:opacity-40" 
          style={{ background: T.brand }}
        >
          <Icon name="send" className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  );
}

/* ---------------------------------------------------------
   Messages Inbox Modal
--------------------------------------------------------- */
function MessagesInbox({ currentUserEmail, onClose }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/messages');
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-[2rem] p-6 pb-8 animate-sheet-up max-h-[85%] overflow-y-auto shadow-2xl">
        <div className="w-12 h-1.5 rounded-full mx-auto mb-4" style={{ background: T.ink200 }} />
        
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-xl" style={{ color: T.ink900 }}>Campus Messages</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <Icon name="x" className="w-5 h-5" style={{ color: T.ink400 }} />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-semibold" style={{ color: T.ink400 }}>
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="py-12 text-center">
            <Icon name="message" className="w-10 h-10 mx-auto mb-2 opacity-30" style={{ color: T.ink400 }} />
            <p className="text-[14px] font-bold" style={{ color: T.ink900 }}>No conversations yet</p>
            <p className="text-[12px] mt-1" style={{ color: T.ink400 }}>Tap on any listing to send a direct inquiry.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {messages.map((m) => (
              <div key={m.id} className="p-3.5 rounded-2xl border" style={{ borderColor: T.ink100, background: T.ink50 }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-bold" style={{ color: T.ink900 }}>To: {m.receiver_name}</span>
                  <span className="text-[10px] font-medium" style={{ color: T.ink400 }}>{m.created_at?.slice(0, 16) || 'just now'}</span>
                </div>
                {m.listing_title && (
                  <p className="text-[11px] font-bold px-2 py-0.5 rounded inline-block mb-1" style={{ background: T.brandSoft, color: T.brand }}>
                    📌 {m.listing_title}
                  </p>
                )}
                <p className="text-[13px] leading-relaxed mt-1 font-medium" style={{ color: T.ink700 }}>
                  "{m.message}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Mount React Application
--------------------------------------------------------- */
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
