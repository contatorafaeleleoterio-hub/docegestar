// Direction B — extended screens (escolhida pelo user)
// Appointments, kick counter, meds list, premium paywall, profile

const TBE = window.TOKENS_B;
const { PhoneB, TabBarB } = window.DirectionB;

// ─── AGENDA / CONSULTAS ────────────────────────────────────────────
function AppointmentsB() {
  const t = TBE;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden' }}>
        <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.surface, boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="chevronLeft" size={18} strokeWidth={2} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: t.inkMuted, fontWeight: 600 }}>Abril 2026</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.ink, letterSpacing: -0.6 }}>Consultas</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.pink500, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 18px ${t.pink500}50` }}>
            <Icon name="plus" size={20} strokeWidth={2.6} />
          </div>
        </div>

        {/* week strip */}
        <div style={{ padding: '14px 14px 0' }}>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between' }}>
            {[
              { d: 'seg', n: 27 },
              { d: 'ter', n: 28, badge: 1 },
              { d: 'qua', n: 29 },
              { d: 'qui', n: 30, today: true },
              { d: 'sex', n: 1 },
              { d: 'sáb', n: 2 },
              { d: 'dom', n: 3 },
            ].map(({d, n, today, badge}) => (
              <div key={n} style={{
                flex: 1, padding: '10px 0', borderRadius: 16,
                background: today ? t.pink500 : t.surface,
                color: today ? '#fff' : t.ink,
                boxShadow: today ? `0 8px 18px ${t.pink500}40` : 'none',
                border: today ? 'none' : `1px solid ${t.hairline}`,
                position: 'relative', textAlign: 'center',
              }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, opacity: today ? 0.85 : 0.6, letterSpacing: 0.4 }}>{d.toUpperCase()}</div>
                <div style={{ fontSize: 17, fontWeight: 800, marginTop: 2 }}>{n}</div>
                {badge && <div style={{ position: 'absolute', top: 6, right: 8, width: 6, height: 6, borderRadius: 3, background: t.pink500 }} />}
              </div>
            ))}
          </div>
        </div>

        {/* next appointment hero */}
        <div style={{ padding: '18px 18px 0' }}>
          <div style={{ fontSize: 11.5, color: t.inkMuted, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 }}>Próxima · em 3 dias</div>
          <div style={{
            borderRadius: 26, overflow: 'hidden', position: 'relative',
            background: `linear-gradient(135deg, ${t.lav100}, ${t.pink100})`,
            boxShadow: t.shadowCard, padding: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 60, height: 60, borderRadius: 18,
                background: '#fff', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(40,20,60,0.08)',
              }}>
                <div style={{ fontSize: 9.5, color: t.pink500, fontWeight: 700, letterSpacing: 0.6 }}>SEG</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: t.ink, lineHeight: 1 }}>28</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10.5, color: t.inkMuted, fontWeight: 700, letterSpacing: 0.5 }}>14:00 · 1H</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: t.ink, marginTop: 2, lineHeight: 1.2 }}>Ultrassom morfológico</div>
                <div style={{ fontSize: 11.5, color: t.inkMuted, marginTop: 2 }}>Dra. Marina Alves · Hosp. Pérola</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button style={{ flex: 1, height: 38, border: 'none', borderRadius: 100, background: t.pink500, color: '#fff', fontSize: 12, fontWeight: 700 }}>Ver detalhes</button>
              <button style={{ flex: 1, height: 38, border: `1.5px solid ${t.pink500}`, borderRadius: 100, background: 'transparent', color: t.pink500, fontSize: 12, fontWeight: 700 }}>Reagendar</button>
            </div>
          </div>
        </div>

        {/* upcoming list */}
        <div style={{ padding: '20px 22px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>Próximas</div>
            <div style={{ fontSize: 12, color: t.pink500, fontWeight: 700 }}>Ver tudo</div>
          </div>

          {[
            { d: '12 mai', t: '09:30', l: 'Pré-natal · 22ª sem', dr: 'Dra. Marina', col: t.pink500 },
            { d: '24 mai', t: '15:00', l: 'Glicemia 24-28sem', dr: 'Lab. Sabin', col: '#5BB76E' },
            { d: '06 jun', t: '11:00', l: 'Pré-natal · 26ª sem', dr: 'Dra. Marina', col: t.pink500 },
          ].map((a, i) => (
            <div key={i} style={{
              background: t.surface, borderRadius: 18, padding: '12px 14px',
              boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 8,
            }}>
              <div style={{
                width: 4, height: 36, borderRadius: 2, background: a.col,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.ink }}>{a.l}</div>
                <div style={{ fontSize: 11, color: t.inkMuted, marginTop: 2 }}>{a.dr}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: t.ink }}>{a.d}</div>
                <div style={{ fontSize: 10.5, color: t.inkMuted }}>{a.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneB>
  );
}

// ─── CONTADOR DE CHUTES ──────────────────────────────────────────
function KickCounterB() {
  const t = TBE;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', overflow: 'hidden',
        background: `linear-gradient(180deg, ${t.lav50} 0%, ${t.pink50} 60%, ${t.pink100} 100%)`,
      }}>
        <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="chevronLeft" size={18} strokeWidth={2} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>Contador de chutes</div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="settings" size={17} strokeWidth={1.8} />
          </div>
        </div>

        {/* counter big */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <div style={{ fontSize: 11.5, color: t.inkMuted, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Sessão atual · 12 min</div>
          <div style={{ fontSize: 120, fontWeight: 800, color: t.ink, letterSpacing: -6, lineHeight: 1, marginTop: 8 }}>
            <span style={{ background: `linear-gradient(135deg, ${t.pink400}, ${t.pink600})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>3</span>
          </div>
          <div style={{ fontSize: 14, color: t.inkMuted, marginTop: 4 }}>chutes registrados</div>
        </div>

        {/* big tap button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
          <div style={{
            width: 220, height: 220, borderRadius: 110, position: 'relative',
            background: `radial-gradient(circle at 40% 30%, ${t.pink400}, ${t.pink600})`,
            boxShadow: `0 30px 60px ${t.pink500}55, inset 0 -10px 30px rgba(0,0,0,0.15), inset 0 10px 30px rgba(255,255,255,0.2)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
            color: '#fff',
          }}>
            <div style={{
              position: 'absolute', inset: -16, borderRadius: 130,
              border: `2px solid ${t.pink500}30`,
            }} />
            <div style={{
              position: 'absolute', inset: -32, borderRadius: 140,
              border: `2px solid ${t.pink500}15`,
            }} />
            <Icon name="foot" size={56} color="#fff" strokeWidth={1.6} />
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 8, letterSpacing: 0.4 }}>TOQUE A CADA CHUTE</div>
          </div>
        </div>

        {/* timeline */}
        <div style={{ padding: '32px 22px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.ink, marginBottom: 8 }}>Histórico de hoje</div>
          <div style={{
            background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)',
            borderRadius: 18, padding: '12px 14px',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            {[
              { t: '16:18', l: 'Chute forte · enquanto eu cantava' },
              { t: '14:32', l: 'Movimento suave' },
              { t: '11:05', l: 'Chute médio · após o café' },
            ].map((k, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: t.pink500 }} />
                <div style={{ fontWeight: 700, color: t.ink, minWidth: 44 }}>{k.t}</div>
                <div style={{ color: t.inkMuted }}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* helper card */}
        <div style={{ padding: '14px 22px 0' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 11.5, color: t.inkMuted, lineHeight: 1.4, boxShadow: t.shadowCard }}>
            <div style={{ width: 28, height: 28, borderRadius: 9, background: t.lav50, color: t.pink500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="sparkles" size={14} strokeWidth={2.2} />
            </div>
            <div>A partir de 28 sem, registre <b style={{ color: t.ink }}>10 chutes em até 2h</b>. Avise sua médica se levar mais.</div>
          </div>
        </div>
      </div>
    </PhoneB>
  );
}

// ─── LEMBRETES / VITAMINAS ───────────────────────────────────────
function MedsB() {
  const t = TBE;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden' }}>
        <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.surface, boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="chevronLeft" size={18} strokeWidth={2} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: t.inkMuted, fontWeight: 600 }}>Quinta · 23 abr</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.ink, letterSpacing: -0.6 }}>Lembretes</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.pink500, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 18px ${t.pink500}50` }}>
            <Icon name="plus" size={20} strokeWidth={2.6} />
          </div>
        </div>

        {/* progress ring summary */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{
            background: `linear-gradient(135deg, ${t.pink400}, ${t.pink600})`,
            color: '#fff', borderRadius: 26, padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: 16,
            boxShadow: `0 16px 36px ${t.pink500}50`,
          }}>
            <div style={{ position: 'relative', width: 80, height: 80 }}>
              <svg viewBox="0 0 80 80" width="80" height="80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="#fff" strokeWidth="6"
                        strokeLinecap="round" strokeDasharray={`${2*Math.PI*34*0.66} 9999`} transform="rotate(-90 40 40)" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>2/3</div>
                <div style={{ fontSize: 9, opacity: 0.85, fontWeight: 700, letterSpacing: 0.4 }}>HOJE</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.2 }}>Quase lá!</div>
              <div style={{ fontSize: 12, opacity: 0.9, marginTop: 2, lineHeight: 1.4 }}>Falta 1 dose hoje · ácido fólico às 20:00 ⏰</div>
            </div>
          </div>
        </div>

        {/* schedule */}
        <div style={{ padding: '18px 22px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>Hoje</div>
            <div style={{ fontSize: 11.5, color: t.inkMuted, fontWeight: 600 }}>3 doses</div>
          </div>

          {[
            { t: '08:00', n: 'Sulfato Ferroso', d: '40 mg · com suco de laranja', c: '#5BB76E', ic: 'pill', done: true },
            { t: '12:00', n: 'Vitamina D3', d: '2000 UI · após o almoço', c: '#E8854A', ic: 'sparkles', done: true },
            { t: '20:00', n: 'Ácido fólico', d: '5 mg · antes de dormir', c: t.pink500, ic: 'pill', upcoming: true },
          ].map((m, i) => (
            <div key={i} style={{
              background: t.surface, borderRadius: 18, padding: '12px 14px', marginBottom: 8,
              boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', gap: 12,
              opacity: m.done ? 0.7 : 1,
              border: m.upcoming ? `1.5px solid ${m.c}40` : `1px solid ${t.hairline}`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, background: m.c + '18',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.c,
              }}>
                <Icon name={m.ic} size={20} strokeWidth={2} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: m.upcoming ? m.c : t.inkMuted, letterSpacing: 0.3 }}>{m.t}</div>
                  {m.done && <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 100, background: '#5BB76E20', color: '#5BB76E', fontWeight: 700 }}>✓ TOMADO</span>}
                  {m.upcoming && <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 100, background: m.c + '20', color: m.c, fontWeight: 700 }}>EM 4H</span>}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.ink, marginTop: 1, textDecoration: m.done ? 'line-through' : 'none' }}>{m.n}</div>
                <div style={{ fontSize: 11, color: t.inkMuted, marginTop: 1 }}>{m.d}</div>
              </div>
              <div style={{
                width: 28, height: 28, borderRadius: 14,
                background: m.done ? '#5BB76E' : 'transparent',
                border: m.done ? 'none' : `2px solid ${t.hairline}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              }}>
                {m.done && <Icon name="check" size={14} color="#fff" strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>

        {/* tomorrow preview */}
        <div style={{ padding: '14px 22px 0' }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: t.inkMuted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>Amanhã</div>
          <div style={{
            background: t.surface, borderRadius: 16, padding: '10px 14px',
            border: `1px dashed ${t.hairline}`, display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 12, color: t.inkMuted,
          }}>
            <Icon name="calendar" size={14} color={t.inkMuted} />
            3 lembretes programados · 08h, 12h, 20h
          </div>
        </div>
      </div>
    </PhoneB>
  );
}

// ─── PREMIUM / PAYWALL ────────────────────────────────────────────
function PremiumB() {
  const t = TBE;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', overflow: 'hidden',
        background: `linear-gradient(180deg, ${t.ink} 0%, #2E2247 50%, ${t.pink600} 100%)`,
        color: '#fff',
      }}>
        {/* close */}
        <div style={{ padding: '8px 22px 0', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 16, color: '#fff', fontWeight: 300 }}>×</span>
          </div>
        </div>

        {/* hero */}
        <div style={{ textAlign: 'center', padding: '20px 28px 0' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100,
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
            fontSize: 10.5, fontWeight: 800, letterSpacing: 1.2, marginBottom: 16,
          }}>
            ✨ DOCEGESTAR PLUS
          </div>
          <h1 style={{
            margin: 0, fontFamily: t.fontDisplay, fontSize: 36, fontWeight: 800,
            letterSpacing: -1.4, lineHeight: 1.05,
          }}>
            Sua jornada<br/><span style={{
              background: `linear-gradient(135deg, ${t.pink200}, #fff)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>completa e sem limites</span>
          </h1>
          <p style={{ fontSize: 13.5, opacity: 0.8, lineHeight: 1.5, margin: '14px 0 0' }}>
            Conteúdo exclusivo da semana, suporte 24/7 com obstetrizes e seu álbum gestacional sem limite.
          </p>
        </div>

        {/* features */}
        <div style={{ padding: '24px 22px 0' }}>
          {[
            { ic: 'sparkles', l: 'Conteúdo semanal premium', sub: 'Vídeos, podcasts e e-books exclusivos' },
            { ic: 'mail', l: 'Chat com obstetriz 24/7', sub: 'Tire dúvidas a qualquer hora' },
            { ic: 'star', l: 'Álbum ilimitado', sub: 'Salve quantas fotos e cartas quiser' },
            { ic: 'heart', l: 'Personalização total', sub: 'Temas, lembretes e relatórios' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: t.pink200,
              }}>
                <Icon name={f.ic} size={18} strokeWidth={2.2} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>{f.l}</div>
                <div style={{ fontSize: 11.5, opacity: 0.7, marginTop: 1 }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* plan */}
        <div style={{ position: 'absolute', left: 18, right: 18, bottom: 50 }}>
          <div style={{
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255,255,255,0.25)',
            borderRadius: 22, padding: '16px 18px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>Anual <span style={{ fontSize: 10, fontWeight: 800, color: t.pink200, marginLeft: 6, padding: '2px 8px', borderRadius: 100, background: t.pink500 + '40' }}>−40%</span></div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>R$ 9,90/mês · cobrado anualmente</div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>R$ 119</div>
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', margin: '12px -18px 12px' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0.65 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Mensal</div>
                <div style={{ fontSize: 11, marginTop: 2 }}>R$ 16,90/mês</div>
              </div>
            </div>
          </div>

          <button style={{
            width: '100%', height: 56, border: 'none', borderRadius: 100, marginTop: 12,
            background: '#fff', color: t.pink600,
            fontSize: 15, fontWeight: 800,
            boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
          }}>
            Começar 7 dias grátis
          </button>
          <div style={{ textAlign: 'center', fontSize: 11, opacity: 0.7, marginTop: 12 }}>
            Cancele quando quiser · Termos · Privacidade
          </div>
        </div>
      </div>
    </PhoneB>
  );
}

// ─── PERFIL ─────────────────────────────────────────────────────
function ProfileB() {
  const t = TBE;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden' }}>
        {/* hero */}
        <div style={{
          background: `linear-gradient(135deg, ${t.lav100} 0%, ${t.pink100} 100%)`,
          padding: '14px 22px 22px', position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="chevronLeft" size={18} strokeWidth={2} />
            </div>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="settings" size={18} strokeWidth={1.8} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18 }}>
            <div style={{
              width: 76, height: 76, borderRadius: 28,
              background: `linear-gradient(135deg, ${t.pink300}, ${t.pink500})`,
              color: '#fff', fontSize: 30, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '4px solid #fff', boxShadow: '0 12px 24px rgba(40,20,60,0.15)',
            }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 19, fontWeight: 800, color: t.ink, letterSpacing: -0.4 }}>Ana Beatriz</div>
              <div style={{ fontSize: 11.5, color: t.inkMuted, marginTop: 1 }}>32 anos · primeira gestação</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 100, background: '#fff', color: t.pink500, fontSize: 10, fontWeight: 800, letterSpacing: 0.4, marginTop: 6 }}>
                ✨ PLUS · 11 meses
              </div>
            </div>
          </div>

          {/* stats */}
          <div style={{
            background: '#fff', borderRadius: 18, marginTop: 16, padding: '14px 12px',
            display: 'flex', justifyContent: 'space-around', boxShadow: '0 8px 20px rgba(40,20,60,0.06)',
          }}>
            {[
              { v: '20', l: 'semanas' },
              { v: '140', l: 'dias' },
              { v: '50%', l: 'concluído', highlight: true },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ width: 1, background: t.hairline }} />}
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.highlight ? t.pink500 : t.ink, letterSpacing: -0.6 }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: t.inkMuted, fontWeight: 600, marginTop: 1 }}>{s.l}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* due date card */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{
            background: t.surface, borderRadius: 18, padding: '14px 16px',
            boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: t.pink50,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.pink500,
            }}>
              <Icon name="heart" size={22} strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: t.inkMuted, fontWeight: 600, letterSpacing: 0.4 }}>DATA PROVÁVEL DO PARTO</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: t.ink, marginTop: 2 }}>11 de setembro · 2026</div>
            </div>
            <Icon name="chevronRight" size={18} color={t.inkMuted} />
          </div>
        </div>

        {/* menu */}
        <div style={{ padding: '14px 18px 0' }}>
          {[
            { ic: 'user', l: 'Dados pessoais', sub: 'Nome, idade, contato' },
            { ic: 'heart', l: 'Histórico médico', sub: 'Pré-natal, exames, alergias' },
            { ic: 'mail', l: 'Equipe e contatos', sub: 'Dra. Marina · Dr. Felipe · doula Lia' },
            { ic: 'bell', l: 'Notificações', sub: 'Lembretes e alertas' },
            { ic: 'lock', l: 'Privacidade', sub: 'Diário privado, fotos, dados' },
          ].map((m, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0',
              borderBottom: i < 4 ? `1px solid ${t.hairline}` : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 12, background: t.lav50, color: t.pink500,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={m.ic} size={16} strokeWidth={2} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: t.ink }}>{m.l}</div>
                <div style={{ fontSize: 11, color: t.inkMuted, marginTop: 1 }}>{m.sub}</div>
              </div>
              <Icon name="chevronRight" size={16} color={t.inkSubtle} />
            </div>
          ))}
        </div>

        <TabBarB active="me" />
      </div>
    </PhoneB>
  );
}

window.DirectionBExt = { AppointmentsB, KickCounterB, MedsB, PremiumB, ProfileB };
