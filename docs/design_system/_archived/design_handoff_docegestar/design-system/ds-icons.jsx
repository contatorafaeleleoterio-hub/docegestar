// DoceGestar Design System — Iconography
// Single source of truth. Stroke 1.75, currentColor, rounded caps/joins.
// All icons share the same 24×24 grid and optical weight.

const ICON_SIZES = { xs: 12, sm: 16, md: 20, lg: 24, xl: 32 };

const ICON_PATHS = {
  // Navigation
  home:        <><path d="M3.5 10.5 12 3.5l8.5 7v8a1.5 1.5 0 0 1-1.5 1.5h-3.5v-6h-7v6H5a1.5 1.5 0 0 1-1.5-1.5z" /></>,
  chevronRight:<polyline points="9.5 6 15.5 12 9.5 18" />,
  chevronLeft: <polyline points="14.5 6 8.5 12 14.5 18" />,
  chevronDown: <polyline points="6 9.5 12 15.5 18 9.5" />,
  arrowRight:  <><line x1="4.5" y1="12" x2="19.5" y2="12" /><polyline points="13 5.5 19.5 12 13 18.5" /></>,
  close:       <><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>,
  menu:        <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="14" y2="17" /></>,
  search:      <><circle cx="11" cy="11" r="6.5" /><line x1="16" y1="16" x2="20" y2="20" /></>,
  plus:        <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  check:       <polyline points="5 12.5 10 17.5 19 7.5" />,

  // Care / pregnancy
  heart:       <path d="M12 20s-7.5-4.5-7.5-10.5A4 4 0 0 1 8.5 5.5 4 4 0 0 1 12 7.5a4 4 0 0 1 3.5-2 4 4 0 0 1 4 4C19.5 15.5 12 20 12 20Z" />,
  baby:        <><circle cx="12" cy="9" r="4" /><path d="M7 19c.5-2.5 2.5-4 5-4s4.5 1.5 5 4" /><circle cx="10.5" cy="9" r="0.6" fill="currentColor" stroke="none" /><circle cx="13.5" cy="9" r="0.6" fill="currentColor" stroke="none" /><path d="M10.5 11.5c.5.5 1.5.5 2 0" /></>,
  pregnant:    <path d="M11 3.5c1.5 0 2.5 1 2.5 2.5S12.5 8.5 11 8.5v2c2 .5 4.5 2 4.5 5s-1.5 4.5-4.5 5h-1c-1.5 0-2-1-2-2v-9.5c-2 0-3-1-3-2.5S6.5 3.5 8 3.5z" />,
  foot:        <path d="M9 4.5c1.8 0 3 1.8 3 4 0 1.5-.5 2.5-1.5 3.5-1 1-2 1.5-2 3 0 2 1.5 3 3 3 1.5 0 3-1 3-3M16 7c.8 0 1.3.5 1.3 1.3S16.8 9.5 16 9.5M17.5 10c.8 0 1.3.5 1.3 1.3S18.3 12.5 17.5 12.5M18 13c.8 0 1.3.5 1.3 1.3S18.8 15.5 18 15.5" />,
  pill:        <><rect x="3.5" y="9.5" width="17" height="5" rx="2.5" transform="rotate(-30 12 12)" /><line x1="9" y1="6.7" x2="13.3" y2="14.7" /></>,
  droplet:     <path d="M12 3.5c-3 4-5.5 6.5-5.5 10A5.5 5.5 0 0 0 12 19a5.5 5.5 0 0 0 5.5-5.5C17.5 10 15 7.5 12 3.5z" />,
  activity:    <polyline points="3.5 12 8 12 10.5 5 13.5 19 16 12 20.5 12" />,
  stethoscope: <><path d="M5 3.5v6a4 4 0 0 0 8 0v-6" /><path d="M9 13.5v2.5a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-2" /><circle cx="17" cy="11" r="1.5" /></>,

  // Time / calendar
  calendar:    <><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="16" y1="3" x2="16" y2="7" /><line x1="3.5" y1="10" x2="20.5" y2="10" /></>,
  clock:       <><circle cx="12" cy="12" r="8.5" /><polyline points="12 7 12 12 15.5 14" /></>,
  moon:        <path d="M19.5 14a7 7 0 0 1-9.5-9 8 8 0 1 0 9.5 9z" />,
  sun:         <><circle cx="12" cy="12" r="4" /><line x1="12" y1="3" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="21" /><line x1="3" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="21" y2="12" /><line x1="5.5" y1="5.5" x2="6.9" y2="6.9" /><line x1="17.1" y1="17.1" x2="18.5" y2="18.5" /><line x1="5.5" y1="18.5" x2="6.9" y2="17.1" /><line x1="17.1" y1="6.9" x2="18.5" y2="5.5" /></>,
  bell:        <><path d="M6 9.5a6 6 0 0 1 12 0c0 5 2.5 7 2.5 7H3.5s2.5-2 2.5-7" /><path d="M10.2 20a1.94 1.94 0 0 0 3.6 0" /></>,

  // Communication / I/O
  mail:        <><rect x="3.5" y="5" width="17" height="14" rx="2.5" /><polyline points="3.5 7.5 12 13 20.5 7.5" /></>,
  message:     <path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-8l-4 3v-3H4A1.5 1.5 0 0 1 2.5 16V7A1.5 1.5 0 0 1 4 5.5z" />,
  phone:       <path d="M20.5 16.5v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 3.6 12a19.8 19.8 0 0 1-3.1-8.7 2 2 0 0 1 2-2.2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2L6.4 8.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" transform="translate(2 3)" />,
  lock:        <><rect x="4.5" y="11" width="15" height="9.5" rx="2" /><path d="M7.5 11V7.5a4.5 4.5 0 0 1 9 0V11" /></>,
  eye:         <><path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff:      <><path d="M3 3l18 18" /><path d="M10.5 6c.5-.1 1-.1 1.5-.1 6 0 9.5 6.1 9.5 6.1a13.5 13.5 0 0 1-2.5 3" /><path d="M6.5 7.5a13.6 13.6 0 0 0-4 4.5s3.5 6.1 9.5 6.1c1.4 0 2.7-.3 3.9-.8" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,

  // Profile / settings
  user:        <><circle cx="12" cy="8.5" r="4" /><path d="M4.5 20.5v-1A4.5 4.5 0 0 1 9 15h6a4.5 4.5 0 0 1 4.5 4.5v1" /></>,
  settings:    <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  logout:      <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,

  // Status
  alert:       <><circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="13" /><circle cx="12" cy="16.5" r="0.8" fill="currentColor" stroke="none" /></>,
  info:        <><circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" /><circle cx="12" cy="8" r="0.8" fill="currentColor" stroke="none" /></>,
  check2:      <><circle cx="12" cy="12" r="9" /><polyline points="8 12.5 11 15.5 16 9.5" /></>,

  // Content
  book:        <><path d="M3 5.5A2 2 0 0 1 5 3.5h6v17H5a2 2 0 0 0-2 2z" /><path d="M21 5.5a2 2 0 0 0-2-2h-6v17h6a2 2 0 0 1 2 2z" /></>,
  bookmark:    <path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4-7 4V4.5a1 1 0 0 1 1-1z" />,
  star:        <polygon points="12 3.5 14.6 9.1 20.5 10 16.2 14.2 17.3 20.5 12 17.5 6.7 20.5 7.8 14.2 3.5 10 9.4 9.1" />,
  edit:        <><path d="M11 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" /><path d="M18 3.5a2.1 2.1 0 0 1 3 3L12 15.5 8 17l1.5-4z" /></>,
  camera:      <><path d="M3.5 8.5A1.5 1.5 0 0 1 5 7h2l1.5-2h7L17 7h2a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18z" /><circle cx="12" cy="13" r="3.5" /></>,
  trash:       <><polyline points="4 7 20 7" /><path d="M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2" /><path d="M6 7v12a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></>,
  share:       <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="5.5" r="2.5" /><circle cx="18" cy="18.5" r="2.5" /><line x1="8.3" y1="10.8" x2="15.7" y2="6.7" /><line x1="8.3" y1="13.2" x2="15.7" y2="17.3" /></>,
  filter:      <polygon points="3.5 4 20.5 4 14 12 14 19 10 21 10 12" />,
  flower:      <><circle cx="12" cy="12" r="2.2" /><path d="M12 3.5a2.5 2.5 0 0 1 2.5 2.5c0 1.5-2.5 3.8-2.5 3.8S9.5 7.5 9.5 6A2.5 2.5 0 0 1 12 3.5z" /><path d="M12 20.5a2.5 2.5 0 0 0 2.5-2.5c0-1.5-2.5-3.8-2.5-3.8s-2.5 2.3-2.5 3.8a2.5 2.5 0 0 0 2.5 2.5z" /><path d="M3.5 12a2.5 2.5 0 0 0 2.5 2.5c1.5 0 3.8-2.5 3.8-2.5S7.5 9.5 6 9.5A2.5 2.5 0 0 0 3.5 12z" /><path d="M20.5 12a2.5 2.5 0 0 1-2.5 2.5c-1.5 0-3.8-2.5-3.8-2.5s2.3-2.5 3.8-2.5a2.5 2.5 0 0 1 2.5 2.5z" /></>,
  sparkles:    <><path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M5.7 5.7 7.8 7.8M16.2 16.2l2.1 2.1M5.7 18.3l2.1-2.1M16.2 7.8l2.1-2.1" /></>,
  crown:       <path d="M3 18.5h18M5 18.5l-2-10 5 4 4-7 4 7 5-4-2 10z" />,
};

function DGIcon({ name, size = 'md', color = 'currentColor', style = {} }) {
  const px = typeof size === 'number' ? size : (ICON_SIZES[size] || 20);
  const path = ICON_PATHS[name];
  return (
    <svg
      width={px} height={px} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
    >
      {path || <circle cx="12" cy="12" r="6" />}
    </svg>
  );
}

window.DGIcon = DGIcon;
window.DG_ICON_NAMES = Object.keys(ICON_PATHS);
window.DG_ICON_SIZES = ICON_SIZES;
