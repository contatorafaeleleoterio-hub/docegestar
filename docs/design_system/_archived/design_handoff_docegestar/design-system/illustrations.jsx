// Shared SVG illustrations for DoceGestar.
// Stylised, on-brand placeholders that look hand-drawn rather than stocky.

// Pregnant mother silhouette — for onboarding heroes
function HeroMother({ height = 360, palette = 'rose', style = {} }) {
  const id = React.useId();
  const stops = palette === 'rose'
    ? [['0%', '#FBE6DA'], ['40%', '#E8B8A2'], ['100%', '#A86B57']]
    : [['0%', '#FFE0EC'], ['40%', '#FFB3CB'], ['100%', '#EC3779']];
  const skin = palette === 'rose' ? '#E8C4AE' : '#F4D5C0';
  const dress = palette === 'rose' ? '#B26851' : '#EC3779';
  return (
    <svg viewBox="0 0 300 420" style={{ height, width: 'auto', display: 'block', ...style }}>
      <defs>
        <linearGradient id={`hm-bg-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          {stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} stopOpacity="0.25" />)}
        </linearGradient>
        <radialGradient id={`hm-glow-${id}`} cx="50%" cy="55%" r="40%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`hm-dress-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={dress} stopOpacity="0.95" />
          <stop offset="100%" stopColor={dress} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* soft background blob */}
      <ellipse cx="150" cy="220" rx="140" ry="180" fill={`url(#hm-bg-${id})`} />
      <ellipse cx="150" cy="220" rx="100" ry="140" fill={`url(#hm-glow-${id})`} />
      {/* hair behind */}
      <path d="M 110 80 Q 80 110 78 170 Q 80 230 100 270 L 115 260 Q 110 220 115 180 Q 120 130 135 100 Z"
            fill="#3A2A21" opacity="0.85" />
      {/* face profile */}
      <path d="M 130 75
               Q 122 78 120 92
               Q 119 108 125 118
               Q 130 124 138 124
               L 142 130
               Q 145 134 143 138
               L 138 142
               Q 135 148 140 152
               Q 148 155 152 150
               L 152 100
               Q 148 80 140 75 Z"
            fill={skin} />
      {/* eye */}
      <ellipse cx="135" cy="102" rx="2" ry="3" fill="#3A2A21" />
      {/* lips hint */}
      <path d="M 138 138 Q 142 140 145 138" stroke="#A85A4A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* hair on top + flowing */}
      <path d="M 128 75 Q 145 65 168 72 Q 172 78 168 90 Q 158 80 148 80 Q 138 80 128 90 Z" fill="#3A2A21" />
      <path d="M 100 270 Q 95 310 110 350 L 130 345 Q 122 310 120 280 Z" fill="#3A2A21" opacity="0.8" />
      {/* body + dress */}
      <path d="M 145 150
               L 165 165
               Q 175 175 178 195
               Q 200 215 215 250
               Q 225 285 215 320
               Q 200 350 165 360
               Q 130 360 115 340
               Q 105 310 110 280
               Q 115 240 130 210
               Q 138 195 142 175
               Z"
            fill={`url(#hm-dress-${id})`} />
      {/* belly highlight */}
      <ellipse cx="190" cy="265" rx="32" ry="42" fill="#FFF" opacity="0.18" />
      {/* arm cradling belly */}
      <path d="M 155 220
               Q 175 240 200 250
               Q 220 252 225 245"
            stroke={skin} strokeWidth="14" fill="none" strokeLinecap="round" />
      <ellipse cx="225" cy="245" rx="9" ry="8" fill={skin} />
    </svg>
  );
}

// Fetus illustration for week-view (stylised, not anatomical)
function FetusIllustration({ size = 180, palette = 'rose' }) {
  const id = React.useId();
  const skin = palette === 'rose' ? '#F0C9B5' : '#FBD4C0';
  const shadow = palette === 'rose' ? '#C68068' : '#E8967C';
  const bg = palette === 'rose'
    ? ['#FAF1EC', '#F2DDD2']
    : ['#FFF1F5', '#FFD9E4'];
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ display: 'block' }}>
      <defs>
        <radialGradient id={`fe-bg-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={bg[0]} />
          <stop offset="100%" stopColor={bg[1]} />
        </radialGradient>
        <linearGradient id={`fe-skin-${id}`} x1="20%" y1="20%" x2="80%" y2="80%">
          <stop offset="0%" stopColor="#FFE5D5" />
          <stop offset="50%" stopColor={skin} />
          <stop offset="100%" stopColor={shadow} />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill={`url(#fe-bg-${id})`} />
      {/* curled fetus */}
      <g transform="translate(100 100)">
        {/* body curl */}
        <path d="M -35 -15
                 Q -50 10 -30 35
                 Q -10 50 25 45
                 Q 50 35 50 5
                 Q 50 -25 25 -40
                 Q 0 -50 -25 -40
                 Q -45 -30 -35 -15 Z"
              fill={`url(#fe-skin-${id})`} />
        {/* head */}
        <circle cx="10" cy="-25" r="32" fill={`url(#fe-skin-${id})`} />
        {/* face details */}
        <ellipse cx="-5" cy="-22" rx="2" ry="3" fill="#5A3A2D" opacity="0.7" />
        <path d="M -10 -10 Q -7 -7 -3 -10" stroke="#A85A4A" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* arm */}
        <path d="M -10 5 Q -20 -5 -15 -18" stroke={shadow} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5" />
        {/* leg curl */}
        <path d="M 20 30 Q 35 20 38 5" stroke={shadow} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.4" />
        {/* highlight */}
        <ellipse cx="20" cy="-35" rx="10" ry="6" fill="#FFF" opacity="0.4" />
      </g>
    </svg>
  );
}

// Soft photo placeholder — gradient + faint icon
function PhotoPlaceholder({ width = '100%', height = 160, label, palette = 'rose', radius = 18, icon = 'mom' }) {
  const id = React.useId();
  const gradients = {
    rose: ['#F5DCD0', '#E5BFAE', '#C68068'],
    pink: ['#FFE0EC', '#FFB3CB', '#FF7FAB'],
    lavender: ['#E5DCF5', '#C9B8E8', '#9B86C9'],
    peach: ['#FFE3D5', '#FFC0A0', '#E8967C'],
    sage: ['#E8EFE2', '#C9D7BD', '#7B8F6B'],
  };
  const [c1, c2, c3] = gradients[palette] || gradients.rose;
  const Icon = {
    mom: <path d="M 30 20 Q 25 25 26 35 Q 28 45 35 50 Q 32 60 30 75 Q 35 80 50 80 Q 65 80 60 70 Q 55 55 55 45 Q 60 40 60 32 Q 60 22 50 18 Q 38 18 30 20 Z M 50 75 Q 60 65 70 65" />,
    baby: <circle cx="50" cy="40" r="14" />,
    food: <circle cx="50" cy="50" r="20" />,
    heart: <path d="M 50 70 Q 30 55 30 40 Q 30 28 40 28 Q 48 28 50 38 Q 52 28 60 28 Q 70 28 70 40 Q 70 55 50 70 Z" />,
  }[icon];
  return (
    <div style={{
      width, height, borderRadius: radius, position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`,
    }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
        <g fill="#fff">{Icon}</g>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at top right, rgba(255,255,255,0.4), transparent 60%)',
      }} />
      {label && (
        <div style={{
          position: 'absolute', left: 14, bottom: 12, color: '#fff',
          fontSize: 13, fontWeight: 500, letterSpacing: 0.2,
          textShadow: '0 1px 4px rgba(0,0,0,0.25)',
        }}>{label}</div>
      )}
    </div>
  );
}

// Tiny inline icon set
function Icon({ name, size = 18, color = 'currentColor', strokeWidth = 1.7 }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    pill: <><path d="M10.5 20.5a7 7 0 0 1-9.9-9.9l9.9-9.9a7 7 0 0 1 9.9 9.9z" /><line x1="8.5" y1="8.5" x2="15.5" y2="15.5" /></>,
    foot: <path d="M9 4c2.5 0 4 2 4 5 0 1.5-.5 3-2 4l-2 1c-1 .5-2 1.5-2 3 0 2 1.5 3 3 3 1.5 0 3-1 3-3M16 6c1 0 1.5.7 1.5 1.5S17 9 16 9M18 9c1 0 1.5.7 1.5 1.5S19 12 18 12M19 12c1 0 1.5.7 1.5 1.5S20 15 19 15" />,
    book: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    chevronRight: <polyline points="9 18 15 12 9 6" />,
    chevronLeft: <polyline points="15 18 9 12 15 6" />,
    chevronDown: <polyline points="6 9 12 15 18 9" />,
    search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    droplet: <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
    sparkles: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></>,
    flower: <><circle cx="12" cy="12" r="2" /><path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" /><path d="M12 14a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" /><path d="M22 12a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4z" /><path d="M10 12a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4z" /></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    check: <polyline points="20 6 9 17 4 12" />,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    google: <path d="M21.35 11.1H12v3.2h5.35c-.5 2.4-2.5 3.7-5.35 3.7a6 6 0 1 1 0-12 5.5 5.5 0 0 1 3.9 1.5l2.4-2.4A9 9 0 1 0 12 21c5.2 0 9-3.6 9-9 0-.6-.05-1.2-.15-1.9z" />,
    apple: <path d="M16 1c0 1.5-.5 3-2 4-1 .5-2 1-3 1-.2-1.5.5-3 2-4 1-.7 2-1 3-1zM21 17c-.5 1-1 2-2 3-1.5 1.5-3 2-4 1-1-.5-2-.5-3 0-1 1-2.5.5-4-1-2-2-3.5-5-3.5-8 0-3 2-5 4-5 1 0 2 .5 3 1 1-.5 2-1 3-1 1.5 0 3 1 4 2.5-2 1-3 3-2 5 0 1 .5 2 1.5 2.5z" />,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  };
  return <svg {...props}>{paths[name]}</svg>;
}

// Status bar (simplified for static screens)
function StatusBar({ time = '08:42', dark = false }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 28px 6px', fontFamily: '-apple-system, system-ui',
      fontSize: 15, fontWeight: 600, color: c,
    }}>
      <span>{time}</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><path d="M8.5 2.7c2 0 3.9.8 5.3 2.1l1-1A8.6 8.6 0 0 0 8.5 1 8.6 8.6 0 0 0 2.7 3.8l1 1A7.4 7.4 0 0 1 8.5 2.7zm0 3a4.6 4.6 0 0 1 3.2 1.3l1-1A6 6 0 0 0 8.5 4.5a6 6 0 0 0-4.2 1.5l1 1A4.6 4.6 0 0 1 8.5 5.7zM8.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill={c}/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke={c} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="17" height="7" rx="1.5" fill={c}/><rect x="21" y="3.5" width="1.5" height="4" rx="0.5" fill={c} fillOpacity="0.4"/></svg>
      </div>
    </div>
  );
}

// Home indicator
function HomeIndicator({ color = 'rgba(0,0,0,0.3)' }) {
  return (
    <div style={{
      position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
      width: 134, height: 5, borderRadius: 3, background: color,
    }} />
  );
}

Object.assign(window, { HeroMother, FetusIllustration, PhotoPlaceholder, Icon, StatusBar, HomeIndicator });
