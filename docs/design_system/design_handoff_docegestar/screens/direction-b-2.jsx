// Direction B — Moderno Suave — part 2 (Bebê semanal, Saúde, Diário)

const TBB = window.TOKENS_B;
const { PhoneB, TabBarB } = window.DirectionB;

// ─── BEBÊ SEMANAL B ────────────────────────────────────────────────
function BabyWeekB() {
  const t = TBB;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden' }}>
        <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.surface, boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.ink }}>
            <Icon name="chevronLeft" size={18} strokeWidth={2} />
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 700, color: t.ink }}>Pregnancy Tracker</div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.pink50, color: t.pink500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="sparkles" size={18} strokeWidth={2.2} />
          </div>
        </div>

        {/* big circular progress with fetus */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{
            background: t.surface, borderRadius: 32, padding: '20px 18px 22px',
            boxShadow: t.shadowCard, position: 'relative',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: t.lav50, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.pink500 }}>
                <Icon name="chevronLeft" size={14} strokeWidth={2.4} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>Semana 20</div>
                <div style={{ fontSize: 11, color: t.inkMuted, marginTop: 1 }}>15 — 21 out</div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: t.lav50, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.pink500 }}>
                <Icon name="chevronRight" size={14} strokeWidth={2.4} />
              </div>
            </div>

            {/* circle */}
            <div style={{ position: 'relative', width: 220, height: 220, margin: '0 auto' }}>
              <svg viewBox="0 0 220 220" width="220" height="220" style={{ position: 'absolute', inset: 0 }}>
                <circle cx="110" cy="110" r="100" fill="none" stroke={t.lav50} strokeWidth="10" />
                <circle cx="110" cy="110" r="100" fill="none" stroke={t.pink500} strokeWidth="10"
                        strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 100 * 0.5} 9999`}
                        transform="rotate(-90 110 110)" />
              </svg>
              <div style={{
                position: 'absolute', inset: 22, borderRadius: '50%',
                background: `linear-gradient(135deg, ${t.lav50}, ${t.pink50})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FetusIllustration size={150} palette="pink" />
              </div>
              {/* badges */}
              <div style={{
                position: 'absolute', top: '38%', left: -8, padding: '8px 12px', borderRadius: 14,
                background: '#fff', boxShadow: t.shadowCard, fontSize: 11, fontWeight: 600, color: t.ink,
              }}>
                <div style={{ fontSize: 9.5, color: t.inkMuted }}>Comprim.</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>25cm</div>
              </div>
              <div style={{
                position: 'absolute', top: '38%', right: -8, padding: '8px 12px', borderRadius: 14,
                background: '#fff', boxShadow: t.shadowCard, fontSize: 11, fontWeight: 600, color: t.ink,
              }}>
                <div style={{ fontSize: 9.5, color: t.inkMuted }}>Peso</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>300g</div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <div style={{ fontSize: 12.5, color: t.inkMuted }}>Faltam apenas</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.ink, marginTop: 2 }}>140 dias 💖</div>
              <button style={{
                marginTop: 12, padding: '10px 20px', borderRadius: 100, border: 'none',
                background: t.pink500, color: '#fff', fontSize: 12.5, fontWeight: 700,
                boxShadow: `0 8px 18px ${t.pink500}40`,
              }}>Ver detalhes do bebê</button>
            </div>
          </div>
        </div>

        {/* weekly content cards */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.ink, marginBottom: 10 }}>Conteúdo semanal</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <ContentCard tokens={t} bg="#FFE9D6" ic="#E8854A" icon="eye" label="Vídeo da semana" />
            <ContentCard tokens={t} bg={t.pink50} ic={t.pink500} icon="flower" label="Seu bebê" />
            <ContentCard tokens={t} bg={t.lav50} ic={t.lav200} icon="heart" label="Saúde da mãe" />
            <ContentCard tokens={t} bg="#E5F5E5" ic="#5BB76E" icon="sparkles" label="Bem-estar" />
            <ContentCard tokens={t} bg="#E0F1FA" ic="#5C9BC2" icon="droplet" label="Nutrição" />
            <ContentCard tokens={t} bg="#FFE3E3" ic="#E15858" icon="bell" label="Alertas" />
          </div>
        </div>
      </div>
    </PhoneB>
  );
}

function ContentCard({ tokens, bg, ic, icon, label }) {
  const t = tokens;
  return (
    <div style={{ background: t.surface, borderRadius: 18, padding: 12, boxShadow: t.shadowCard, position: 'relative' }}>
      <div style={{
        width: 38, height: 38, borderRadius: 12, background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: ic,
        margin: '0 auto',
      }}>
        <Icon name={icon} size={18} strokeWidth={2} />
      </div>
      <div style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: 9, border: `1.5px solid ${t.lav200}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.lav200 }}>
        <Icon name="arrowRight" size={9} strokeWidth={2.4} />
      </div>
      <div style={{ fontSize: 10.5, fontWeight: 600, color: t.ink, marginTop: 8, textAlign: 'center', lineHeight: 1.25 }}>{label}</div>
    </div>
  );
}

// ─── SAÚDE B ───────────────────────────────────────────────────────
function HealthB() {
  const t = TBB;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden' }}>
        <div style={{ padding: '8px 22px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.surface, boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="chevronLeft" size={18} strokeWidth={2} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: t.inkMuted, fontWeight: 600 }}>Quinta · 23 abr</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.ink, letterSpacing: -0.6 }}>Sua saúde</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.pink500, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 18px ${t.pink500}50` }}>
            <Icon name="plus" size={20} strokeWidth={2.6} />
          </div>
        </div>

        {/* condition card with timeline */}
        <div style={{ padding: '0 18px' }}>
          <div style={{
            background: t.surface, borderRadius: 24, padding: '16px 18px',
            boxShadow: t.shadowCard, position: 'relative',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: t.lav50, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.pink500 }}>
                <Icon name="calendar" size={16} strokeWidth={2.2} />
              </div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: t.ink }}>Condição da mãe</div>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: `linear-gradient(135deg, ${t.pink400}, ${t.pink600})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, letterSpacing: 0.4 }}>AI</div>
            </div>
            {/* week timeline */}
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: t.inkMuted, fontWeight: 600 }}>
                {['6w', '10w', '14w', '18w', '20w', '24w', '28w'].map(w => (
                  <span key={w} style={{ color: w === '20w' ? t.pink500 : t.inkMuted, fontWeight: w === '20w' ? 800 : 600 }}>{w}</span>
                ))}
              </div>
              <div style={{ height: 8, borderRadius: 4, background: t.lav50, marginTop: 8, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60%', borderRadius: 4, background: `linear-gradient(90deg, ${t.pink300}, ${t.pink500})` }} />
                <div style={{ position: 'absolute', left: '60%', top: 0, bottom: 0, right: 0, borderRadius: 4, background: `repeating-linear-gradient(45deg, ${t.lav100}, ${t.lav100} 4px, ${t.lav50} 4px, ${t.lav50} 8px)` }} />
                <div style={{ position: 'absolute', left: '57%', top: -4, width: 16, height: 16, borderRadius: 8, background: '#fff', border: `3px solid ${t.pink500}`, boxShadow: `0 4px 10px ${t.pink500}40` }} />
              </div>
            </div>
          </div>
        </div>

        {/* metric grid */}
        <div style={{ padding: '12px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <MetricB tokens={t} icon="activity" iconBg={t.pink50} iconColor={t.pink500} label="Dor lombar" value="Leve" tag="" sub="ontem" />
          <MetricB tokens={t} icon="droplet" iconBg="#E0F1FA" iconColor="#5C9BC2" label="Urina (pH)" value="5.0" sub="normal" />
          <MetricB tokens={t} icon="heart" iconBg="#FFE3E3" iconColor="#E15858" label="Pressão" value="118/76" sub="mmHg" />
          <MetricB tokens={t} icon="moon" iconBg={t.lav50} iconColor={t.lav200} label="Sono" value="7h 20m" sub="suave" />
        </div>

        {/* peso card with chart */}
        <div style={{ padding: '12px 18px 0' }}>
          <div style={{ background: t.surface, borderRadius: 22, padding: 16, boxShadow: t.shadowCard }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, color: t.inkMuted, fontWeight: 600 }}>Ganho de peso</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
                  <span style={{ fontSize: 26, fontWeight: 800, color: t.ink, letterSpacing: -0.6 }}>+5,8</span>
                  <span style={{ fontSize: 13, color: t.inkMuted, fontWeight: 600 }}>kg</span>
                </div>
              </div>
              <div style={{ padding: '4px 10px', borderRadius: 100, background: t.success + '20', color: t.success, fontSize: 10.5, fontWeight: 700 }}>📈 saudável</div>
            </div>
            <svg viewBox="0 0 280 70" style={{ width: '100%', marginTop: 10, height: 70 }}>
              <defs>
                <linearGradient id="hb-g" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={t.pink500} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={t.pink500} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 60 Q 35 56 70 50 T 140 36 T 210 22 L 280 14 L 280 70 L 0 70 Z" fill="url(#hb-g)" />
              <path d="M 0 60 Q 35 56 70 50 T 140 36 T 210 22 L 280 14" stroke={t.pink500} strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="280" cy="14" r="5" fill="#fff" stroke={t.pink500} strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        {/* symptoms */}
        <div style={{ padding: '12px 22px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>Sintomas hoje</div>
            <div style={{ fontSize: 12, color: t.pink500, fontWeight: 700 }}>+ Adicionar</div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[{l:'Náusea',s:1},{l:'Cansaço',s:1},{l:'Dor lombar',s:1},{l:'Inchaço'},{l:'Cólicas'}].map(({l,s}) => (
              <div key={l} style={{
                padding: '7px 13px', borderRadius: 100, fontSize: 11.5, fontWeight: 600,
                background: s ? t.pink500 : t.surface, color: s ? '#fff' : t.ink,
                boxShadow: s ? `0 6px 14px ${t.pink500}40` : 'none',
                border: s ? 'none' : `1.5px solid ${t.hairline}`,
              }}>{l}</div>
            ))}
          </div>
        </div>
      </div>
    </PhoneB>
  );
}

function MetricB({ tokens, icon, iconBg, iconColor, label, value, sub }) {
  const t = tokens;
  return (
    <div style={{ background: t.surface, borderRadius: 18, padding: 12, boxShadow: t.shadowCard }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 9, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor }}>
          <Icon name={icon} size={14} strokeWidth={2.2} />
        </div>
        <div style={{ fontSize: 11.5, color: t.inkMuted, fontWeight: 600 }}>{label}</div>
      </div>
      <div style={{ fontSize: 19, fontWeight: 800, color: t.ink, letterSpacing: -0.4, marginTop: 6 }}>{value}</div>
      <div style={{ fontSize: 10, color: t.inkSubtle, marginTop: 1 }}>{sub}</div>
    </div>
  );
}

// ─── DIÁRIO B ───────────────────────────────────────────────────────
function DiaryB() {
  const t = TBB;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden' }}>
        <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: t.pink500, fontWeight: 700, letterSpacing: 0.6 }}>MEU DIÁRIO 💕</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: t.ink, letterSpacing: -0.8, lineHeight: 1.1 }}>23 de abril</div>
            <div style={{ fontSize: 12, color: t.inkMuted, marginTop: 2 }}>Quinta-feira · semana 20</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.surface, boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="search" size={18} strokeWidth={2} />
          </div>
        </div>

        {/* mood selector */}
        <div style={{ padding: '18px 18px 0' }}>
          <div style={{
            background: `linear-gradient(135deg, ${t.lav50}, ${t.pink50})`,
            borderRadius: 24, padding: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.ink }}>Como você se sente?</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              {[{m:'☁️',l:'baixa'},{m:'🌥',l:'so-so'},{m:'🌤',l:'bem'},{m:'☀️',l:'feliz',sel:true},{m:'🌸',l:'amor'}].map(({m,l,sel}) => (
                <div key={l} style={{
                  width: 50, height: 60, borderRadius: 16,
                  background: sel ? '#fff' : 'transparent',
                  boxShadow: sel ? '0 6px 14px rgba(40,20,60,0.08)' : 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                }}>
                  <div style={{ fontSize: 22 }}>{m}</div>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: sel ? t.pink500 : t.inkMuted }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* quick chips */}
        <div style={{ padding: '14px 22px 0', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {[
            {ic:'foot', l:'Chute', c:t.pink500},
            {ic:'edit', l:'Carta', c:'#7BB6D6'},
            {ic:'star', l:'Foto', c:'#E8854A'},
            {ic:'heart', l:'Marco', c:'#5BB76E'},
          ].map(({ic, l, c}) => (
            <div key={l} style={{
              padding: '7px 12px 7px 8px', borderRadius: 100, background: t.surface, boxShadow: t.shadowCard,
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 700, color: t.ink, whiteSpace: 'nowrap',
            }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: c + '20', color: c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={ic} size={12} strokeWidth={2.4} />
              </div>
              {l}
            </div>
          ))}
        </div>

        {/* timeline entries */}
        <div style={{ padding: '14px 18px 0' }}>
          {/* milestone */}
          <div style={{
            background: `linear-gradient(135deg, ${t.pink400}, ${t.pink600})`,
            color: '#fff', borderRadius: 22, padding: 16, position: 'relative',
            boxShadow: `0 12px 28px ${t.pink500}40`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 9, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="sparkles" size={14} color="#fff" strokeWidth={2.4} />
              </div>
              <div style={{ fontSize: 11, opacity: 0.9, fontWeight: 700, letterSpacing: 0.6 }}>MARCO · METADE!</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, marginTop: 8, letterSpacing: -0.3 }}>Você chegou às 20 semanas 🎉</div>
            <div style={{ fontSize: 12.5, opacity: 0.9, marginTop: 4, lineHeight: 1.4 }}>Metade da jornada concluída. Hoje começa o segundo trimestre completo.</div>
          </div>

          {/* photo entry */}
          <div style={{ marginTop: 12, background: t.surface, borderRadius: 22, overflow: 'hidden', boxShadow: t.shadowCard }}>
            <PhotoPlaceholder height={120} palette="pink" icon="mom" radius={0} label="Barriga · semana 20" />
            <div style={{ padding: '10px 14px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.ink }}>Foto da barriga</div>
                <div style={{ fontSize: 10.5, color: t.inkMuted }}>14:32</div>
              </div>
              <div style={{ fontSize: 12, color: t.inkMuted, marginTop: 2 }}>Já está bem visível! 🌸</div>
            </div>
          </div>

          {/* kick log */}
          <div style={{
            marginTop: 12, background: t.surface, borderRadius: 22, padding: '14px 16px',
            boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: t.pink50, color: t.pink500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="foot" size={18} strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.ink }}>3 chutes registrados</div>
              <div style={{ fontSize: 11, color: t.inkMuted, marginTop: 1 }}>último às 16:18 · enquanto eu cantava</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.pink500 }}>3</div>
          </div>
        </div>

        {/* FAB */}
        <div style={{
          position: 'absolute', right: 22, bottom: 100,
          width: 60, height: 60, borderRadius: 24,
          background: t.pink500, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 16px 32px ${t.pink500}55`,
        }}>
          <Icon name="plus" size={26} strokeWidth={2.6} />
        </div>

        <TabBarB active="diary" />
      </div>
    </PhoneB>
  );
}

window.DirectionB2 = { BabyWeekB, HealthB, DiaryB };
