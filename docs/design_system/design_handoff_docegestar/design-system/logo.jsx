// DoceGestar logo — recreated from the source mark.
// Stylised pregnant silhouette with a rose at the belly, drawn in the
// rosé-gold gradient from the original logo.

function DoceGestarLogo({ size = 96, showWordmark = false, color }) {
  // gradient stops match the original PNG: champagne → dusty pink → rosé brown
  const id = React.useId();
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`dg-${id}`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#F2D7C8" />
            <stop offset="35%" stopColor="#D9A491" />
            <stop offset="70%" stopColor="#A86B57" />
            <stop offset="100%" stopColor="#6E3B2D" />
          </linearGradient>
          <linearGradient id={`dg-rose-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5C9B6" />
            <stop offset="100%" stopColor="#B26851" />
          </linearGradient>
        </defs>
        {/* Mother silhouette — head + flowing hair, belly curve */}
        <g fill={color || `url(#dg-${id})`}>
          {/* head */}
          <circle cx="48" cy="20" r="9" />
          {/* hair flowing back */}
          <path d="M 38 18 Q 28 22 26 35 Q 24 48 30 60 Q 32 50 35 42 Q 40 30 42 26 Z" opacity="0.85" />
          {/* body + belly */}
          <path d="M 42 28
                   Q 40 38 42 48
                   Q 38 54 38 64
                   Q 38 78 50 84
                   Q 70 84 72 68
                   Q 72 56 64 52
                   Q 60 48 58 42
                   Q 58 34 54 30
                   Q 50 27 46 28 Z" />
          {/* arm cradling belly */}
          <path d="M 44 50 Q 50 62 64 64 Q 70 64 72 60" stroke={color || `url(#dg-${id})`} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.9" />
        </g>
        {/* Rose on belly */}
        <g transform="translate(54 60)">
          <circle r="9" fill={color || `url(#dg-rose-${id})`} opacity="0.35" />
          <g fill="none" stroke={color || `url(#dg-rose-${id})`} strokeWidth="1.4" strokeLinecap="round">
            <path d="M -5 0 Q -3 -4 0 -3 Q 3 -2 4 1 Q 4 4 1 5 Q -2 5 -4 3 Q -5 1 -5 0 Z" fill={color || `url(#dg-rose-${id})`} fillOpacity="0.5" />
            <path d="M -2 -1 Q 0 -2 2 -1 Q 3 1 1 2 Q -1 2 -2 0 Z" fill={color || `url(#dg-rose-${id})`} />
            <path d="M -7 4 Q -4 7 0 7" />
            <path d="M 4 5 Q 6 7 7 5" />
          </g>
        </g>
      </svg>
      {showWordmark && (
        <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
          <div style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 500, fontSize: size * 0.36,
            color: color || '#8E5642', letterSpacing: 0.5,
          }}>
            DoceGestar
          </div>
          <div style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontStyle: 'italic', fontSize: size * 0.13,
            color: color || '#A78A7C', marginTop: 2, letterSpacing: 0.3,
          }}>
            Acompanhe sua gestação com amor
          </div>
        </div>
      )}
    </div>
  );
}

window.DoceGestarLogo = DoceGestarLogo;
