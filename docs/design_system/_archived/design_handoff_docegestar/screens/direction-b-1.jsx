// Direction B — Moderno Suave
// Sans-serif (Plus Jakarta), vibrant pink CTAs, lavender-tinted backgrounds,
// rounded cards. Pregnancy+/Flo aesthetic.

const TB = window.TOKENS_B;

function PhoneB({ children, time = '08:42' }) {
  return (
    <div style={{
      width: 360, height: 780, borderRadius: 44, overflow: 'hidden',
      background: TB.bg, position: 'relative',
      boxShadow: '0 30px 60px rgba(40,20,60,0.18), 0 0 0 1px rgba(40,20,60,0.08)',
      fontFamily: TB.fontBody, color: TB.ink,
    }}>
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        width: 110, height: 32, borderRadius: 20, background: '#000', zIndex: 50,
      }} />
      <StatusBar time={time} />
      <div style={{ height: 'calc(100% - 30px)', overflow: 'hidden' }}>{children}</div>
      <HomeIndicator color="rgba(40,20,60,0.3)" />
    </div>
  );
}

function TabBarB({ active = 'home' }) {
  const tabs = [
    { id: 'home', label: 'Hoje', icon: 'home' },
    { id: 'baby', label: 'Bebê', icon: 'flower' },
    { id: 'health', label: 'Saúde', icon: 'heart' },
    { id: 'diary', label: 'Diário', icon: 'book' },
    { id: 'me', label: 'Eu', icon: 'user' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 16, right: 16, bottom: 22,
      background: TB.ink, borderRadius: 32,
      boxShadow: '0 20px 48px rgba(40,20,60,0.25)',
      padding: 6, display: 'flex', justifyContent: 'space-between',
    }}>
      {tabs.map(t => {
        const isActive = t.id === active;
        return (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: isActive ? '10px 16px' : '10px 12px', borderRadius: 24,
            background: isActive ? TB.pink500 : 'transparent',
            color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
          }}>
            <Icon name={t.icon} size={18} strokeWidth={isActive ? 2.2 : 1.8} />
            {isActive && <span style={{ fontSize: 12, fontWeight: 600 }}>{t.label}</span>}
          </div>
        );
      })}
    </div>
  );
}

// ─── ONBOARDING B ───────────────────────────────────────────────────
function OnboardingB() {
  const t = TB;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', overflow: 'hidden',
        background: `linear-gradient(180deg, ${t.lav50} 0%, ${t.pink50} 70%, ${t.pink100} 100%)`,
      }}>
        {/* hero photo placeholder */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 24 }}>
          <div style={{
            width: 300, height: 360, borderRadius: 28, overflow: 'hidden', position: 'relative',
            background: `linear-gradient(160deg, ${t.pink100}, ${t.lav100})`,
            boxShadow: '0 24px 60px rgba(236,55,121,0.18)',
          }}>
            <HeroMother height={360} palette="pink" style={{ margin: '0 auto' }} />
            {/* logo chip */}
            <div style={{
              position: 'absolute', top: 16, left: 16,
              padding: '6px 12px 6px 8px', borderRadius: 100,
              background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <DoceGestarLogo size={20} />
              <span style={{ fontSize: 12, fontWeight: 700, color: t.pink600, letterSpacing: 0.2 }}>DoceGestar</span>
            </div>
            {/* dots inside */}
            <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
              <div style={{ width: 22, height: 5, borderRadius: 3, background: '#fff' }} />
              <div style={{ width: 5, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.5)' }} />
              <div style={{ width: 5, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.5)' }} />
            </div>
          </div>
        </div>

        <div style={{ padding: '30px 28px 0', textAlign: 'left' }}>
          <h1 style={{
            fontFamily: t.fontDisplay, fontWeight: 800,
            fontSize: 32, lineHeight: 1.05, color: t.ink, margin: 0,
            letterSpacing: -1.2,
          }}>
            Acompanhe<br/>cada momento <span style={{ color: t.pink500 }}>com&nbsp;cuidado</span>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.5, color: t.inkMuted, margin: '14px 0 0', maxWidth: 280 }}>
            Tudo o que você precisa para viver sua gestação com tranquilidade — em um só lugar.
          </p>
        </div>

        <div style={{ position: 'absolute', left: 24, right: 24, bottom: 50 }}>
          <button style={{
            width: '100%', height: 58, border: 'none', borderRadius: 100,
            background: t.pink500, color: '#fff',
            fontFamily: t.fontBody, fontSize: 15, fontWeight: 700,
            boxShadow: `0 12px 28px ${t.pink500}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 28px',
          }}>
            <span>Começar agora</span>
            <div style={{ width: 42, height: 42, borderRadius: 21, background: '#fff', color: t.pink500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="arrowRight" size={18} strokeWidth={2.4} />
            </div>
          </button>
          <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: t.inkMuted }}>
            Já tem conta? <span style={{ color: t.pink500, fontWeight: 700 }}>Entrar</span>
          </div>
        </div>
      </div>
    </PhoneB>
  );
}

// ─── LOGIN B ───────────────────────────────────────────────────────
function LoginB() {
  const t = TB;
  return (
    <PhoneB>
      <div style={{ height: '100%', background: t.bg, padding: '12px 26px 0', position: 'relative' }}>
        <div style={{ width: 42, height: 42, borderRadius: 14, background: t.surface, boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.ink }}>
          <Icon name="chevronLeft" size={18} strokeWidth={2} />
        </div>

        <h1 style={{
          fontFamily: t.fontDisplay, fontWeight: 800, fontSize: 32, lineHeight: 1.05,
          color: t.ink, margin: '32px 0 6px', letterSpacing: -1.2,
        }}>
          Olá de novo 👋
        </h1>
        <p style={{ fontSize: 14, color: t.inkMuted, margin: 0, lineHeight: 1.5 }}>
          Entre para continuar acompanhando sua jornada.
        </p>

        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <FieldB label="Email" value="ana.beatriz@email.com" icon="mail" tokens={t} />
          <FieldB label="Senha" value="••••••••••" icon="lock" tokens={t} trailing={<Icon name="eye" size={16} color={t.inkSubtle} />} />
          <div style={{ textAlign: 'right', fontSize: 12.5, color: t.pink500, fontWeight: 700, marginTop: -4 }}>Esqueci minha senha</div>
        </div>

        <button style={{
          width: '100%', height: 56, border: 'none', borderRadius: 100, marginTop: 22,
          background: t.pink500, color: '#fff',
          fontFamily: t.fontBody, fontSize: 15, fontWeight: 700,
          boxShadow: `0 12px 28px ${t.pink500}50`,
        }}>
          Entrar
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0' }}>
          <div style={{ flex: 1, height: 1, background: t.hairline }} />
          <span style={{ fontSize: 11, color: t.inkSubtle, letterSpacing: 0.3 }}>ou</span>
          <div style={{ flex: 1, height: 1, background: t.hairline }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <SocialBtnB icon="google" label="Continuar com Google" tokens={t} />
          <SocialBtnB icon="apple" label="Continuar com Apple" tokens={t} />
        </div>

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 50, textAlign: 'center', fontSize: 13, color: t.inkMuted }}>
          Primeira vez? <span style={{ color: t.pink500, fontWeight: 700 }}>Criar conta grátis</span>
        </div>
      </div>
    </PhoneB>
  );
}

function FieldB({ label, value, icon, trailing, tokens }) {
  const t = tokens;
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: t.ink, marginBottom: 6 }}>{label}</div>
      <div style={{
        height: 54, borderRadius: 16, background: t.surface,
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10,
        border: `1.5px solid ${t.hairline}`,
      }}>
        <Icon name={icon} size={18} color={t.inkMuted} />
        <span style={{ flex: 1, fontSize: 14, color: t.ink, fontWeight: 500 }}>{value}</span>
        {trailing}
      </div>
    </div>
  );
}

function SocialBtnB({ icon, label, tokens }) {
  const t = tokens;
  return (
    <div style={{
      width: '100%', height: 54, borderRadius: 100, background: t.surface,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      border: `1.5px solid ${t.hairline}`, fontSize: 14, fontWeight: 600, color: t.ink,
    }}>
      <Icon name={icon} size={18} strokeWidth={0} color={icon === 'apple' ? '#000' : '#EA4335'} />
      {label}
    </div>
  );
}

// ─── HOME B ────────────────────────────────────────────────────────
function HomeB() {
  const t = TB;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden' }}>
        <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 16,
            background: `linear-gradient(135deg, ${t.pink200}, ${t.pink400})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 18, fontWeight: 700,
          }}>A</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: t.inkMuted }}>Bom dia,</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: t.ink, lineHeight: 1.1 }}>Ana Beatriz ✨</div>
          </div>
          <div style={{
            width: 42, height: 42, borderRadius: 14, background: t.surface,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.ink,
            border: `1px solid ${t.hairline}`, position: 'relative',
          }}>
            <Icon name="bell" size={18} />
            <div style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 5, background: t.pink500, border: '2px solid #fff' }} />
          </div>
        </div>

        {/* hero week — vibrant pink card */}
        <div style={{ padding: '16px 18px 0' }}>
          <div style={{
            position: 'relative', borderRadius: 32, overflow: 'hidden',
            background: `linear-gradient(135deg, ${t.pink400} 0%, ${t.pink500} 60%, ${t.pink600} 100%)`,
            color: '#fff', padding: '20px 22px 22px',
            boxShadow: `0 16px 40px ${t.pink500}40`,
          }}>
            {/* sparkles */}
            <svg viewBox="0 0 320 200" style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
              <circle cx="280" cy="40" r="2" fill="#fff" />
              <circle cx="40" cy="160" r="1.5" fill="#fff" />
              <circle cx="240" cy="180" r="2" fill="#fff" />
              <circle cx="60" cy="60" r="1" fill="#fff" />
            </svg>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, opacity: 0.85, letterSpacing: 1, fontWeight: 600 }}>2º TRIMESTRE</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                  <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>20</span>
                  <span style={{ fontSize: 16, fontWeight: 600, opacity: 0.9 }}>semanas</span>
                </div>
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>e 3 dias 🌸</div>
              </div>
              <div style={{
                width: 90, height: 90, borderRadius: 22, overflow: 'hidden',
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FetusIllustration size={86} palette="pink" />
              </div>
            </div>
            {/* progress */}
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.85, marginBottom: 6 }}>
                <span>50% concluído</span><span>140 dias 💖</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
                <div style={{ width: '50%', height: '100%', borderRadius: 4, background: '#fff' }} />
              </div>
            </div>
          </div>
        </div>

        {/* baby today */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: t.ink }}>Seu bebê hoje</div>
            <div style={{ fontSize: 12, color: t.pink500, fontWeight: 700 }}>Ver tudo →</div>
          </div>
          <div style={{
            background: t.surface, borderRadius: 24, padding: 14, marginTop: 10,
            boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 70, height: 70, borderRadius: 18,
              background: `linear-gradient(135deg, ${t.lav50}, ${t.pink50})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 60 60" width="50" height="50">
                <path d="M 12 38 Q 14 14 38 16 Q 42 16 44 22 Q 30 28 22 42 Q 16 46 12 38 Z" fill="#F2C84B" />
                <path d="M 38 16 L 40 11 L 44 12" stroke="#7B5E22" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.ink }}>Banana 🍌</div>
              <div style={{ fontSize: 12, color: t.inkMuted, marginTop: 2 }}>25 cm · 300g</div>
              <div style={{ marginTop: 6, fontSize: 11, color: t.pink600, fontWeight: 600 }}>Já reage a sons!</div>
            </div>
          </div>
        </div>

        {/* care row */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px 8px' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: t.ink }}>Cuidados de hoje</div>
            <div style={{ fontSize: 12, color: t.pink500, fontWeight: 700 }}>+ Add</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <CareB tokens={t} icon="pill" label="Vitamina" sub="Ácido fólico · 08:00" done bg={t.lav50} ic={t.lav200} />
            <CareB tokens={t} icon="droplet" label="Água" sub="2 / 8 copos" bg={'#E0F1FA'} ic={'#7BB6D6'} />
            <CareB tokens={t} icon="foot" label="Chutes" sub="3 hoje" bg={t.pink50} ic={t.pink400} />
          </div>
        </div>

        {/* contractions/timer card */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{
            background: t.surface, borderRadius: 22, padding: '14px 16px',
            boxShadow: t.shadowCard, border: `1px solid ${t.hairline}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: `linear-gradient(135deg, ${t.pink400}, ${t.pink600})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}>
              <Icon name="activity" size={20} strokeWidth={2.4} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>Contador de chutes</div>
              <div style={{ fontSize: 11.5, color: t.inkMuted, marginTop: 1 }}>Toque para registrar quando sentir</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: t.pink500 }}>3</div>
          </div>
        </div>

        <TabBarB active="home" />
      </div>
    </PhoneB>
  );
}

function CareB({ tokens, icon, label, sub, done, bg, ic }) {
  const t = tokens;
  return (
    <div style={{
      flex: 1, background: t.surface, borderRadius: 20, padding: 12,
      boxShadow: t.shadowCard, border: `1px solid ${t.hairline}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 12, background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: ic,
      }}>
        <Icon name={icon} size={18} strokeWidth={2} />
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: t.ink, marginTop: 8 }}>{label}</div>
      <div style={{ fontSize: 10.5, color: t.inkMuted, marginTop: 2, lineHeight: 1.3 }}>{sub}</div>
      {done && <div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 8px', borderRadius: 100, background: t.success + '20', color: t.success, fontSize: 9.5, fontWeight: 700 }}>✓ feito</div>}
    </div>
  );
}

window.DirectionB = { OnboardingB, LoginB, HomeB, PhoneB, TabBarB };
