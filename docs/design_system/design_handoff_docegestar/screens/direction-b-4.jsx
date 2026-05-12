// Direction B — telas finais (chat obstetriz, álbum, exames, plano de parto, enxoval, conteúdo)

const TBF = window.TOKENS_B;
const { PhoneB, TabBarB } = window.DirectionB;

// ─── CHAT OBSTETRIZ ────────────────────────────────────────────
function ChatB() {
  const t = TBF;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* header */}
        <div style={{
          padding: '8px 18px 14px', display: 'flex', alignItems: 'center', gap: 12,
          borderBottom: `1px solid ${t.hairline}`, background: t.surface,
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="chevronLeft" size={18} strokeWidth={2} />
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 16,
            background: `linear-gradient(135deg, ${t.lav200}, ${t.pink400})`,
            color: '#fff', fontSize: 16, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}>
            R
            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 12, height: 12, borderRadius: 6, background: t.success, border: '2px solid #fff' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>Renata · obstetriz</div>
            <div style={{ fontSize: 11, color: t.success, fontWeight: 600 }}>● online · responde em 5min</div>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: t.pink50, color: t.pink500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="bell" size={16} />
          </div>
        </div>

        {/* messages */}
        <div style={{ flex: 1, padding: '16px 18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ textAlign: 'center', fontSize: 10.5, color: t.inkSubtle, fontWeight: 600, letterSpacing: 0.5 }}>HOJE · 14:18</div>

          {/* received */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div style={{ width: 28, height: 28, borderRadius: 10, background: `linear-gradient(135deg, ${t.lav200}, ${t.pink400})`, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>R</div>
            <div style={{ maxWidth: '78%', background: t.surface, borderRadius: '18px 18px 18px 4px', padding: '10px 14px', boxShadow: t.shadowCard, fontSize: 13, color: t.ink, lineHeight: 1.4 }}>
              Oi Ana! Vi que registrou um pico de náusea hoje. Tudo bem? 💕
            </div>
          </div>

          {/* sent */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ maxWidth: '78%', background: t.pink500, color: '#fff', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', fontSize: 13, lineHeight: 1.4, boxShadow: `0 6px 16px ${t.pink500}40` }}>
              Oi Renata! Voltou forte essa semana. Posso tomar dramin?
            </div>
          </div>

          {/* received with card */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div style={{ width: 28, height: 28, borderRadius: 10, background: `linear-gradient(135deg, ${t.lav200}, ${t.pink400})`, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>R</div>
            <div style={{ maxWidth: '78%' }}>
              <div style={{ background: t.surface, borderRadius: '18px 18px 18px 4px', padding: '10px 14px', boxShadow: t.shadowCard, fontSize: 13, color: t.ink, lineHeight: 1.4 }}>
                Pode sim, mas vamos tentar antes:
              </div>
              <div style={{ background: t.surface, borderRadius: 16, padding: 12, marginTop: 6, boxShadow: t.shadowCard, border: `1px solid ${t.hairline}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 9, background: t.lav50, color: t.pink500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="sparkles" size={14} strokeWidth={2.2} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: t.ink }}>Dicas naturais p/ náusea</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11.5, color: t.inkMuted }}>
                  <div>· Gengibre em chá morno</div>
                  <div>· Refeições pequenas a cada 2h</div>
                  <div>· Evite estômago vazio ao acordar</div>
                </div>
                <div style={{ fontSize: 11, color: t.pink500, fontWeight: 700, marginTop: 8 }}>Ver guia completo →</div>
              </div>
            </div>
          </div>

          {/* typing */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div style={{ width: 28, height: 28, borderRadius: 10, background: `linear-gradient(135deg, ${t.lav200}, ${t.pink400})`, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>R</div>
            <div style={{ background: t.surface, borderRadius: '18px 18px 18px 4px', padding: '12px 16px', boxShadow: t.shadowCard, display: 'flex', gap: 4 }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: 3, background: t.inkSubtle, opacity: 0.4 + i * 0.2 }} />)}
            </div>
          </div>
        </div>

        {/* composer */}
        <div style={{ padding: '12px 16px 32px', background: t.surface, borderTop: `1px solid ${t.hairline}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.inkMuted }}>
            <Icon name="plus" size={18} strokeWidth={2.4} />
          </div>
          <div style={{ flex: 1, height: 42, borderRadius: 100, background: t.bg, padding: '0 16px', display: 'flex', alignItems: 'center', fontSize: 13, color: t.inkSubtle }}>
            Escreva uma mensagem…
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.pink500, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 18px ${t.pink500}50` }}>
            <Icon name="arrowRight" size={18} strokeWidth={2.6} />
          </div>
        </div>
      </div>
    </PhoneB>
  );
}

// ─── ÁLBUM / GALERIA ──────────────────────────────────────────
function AlbumB() {
  const t = TBF;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden' }}>
        <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.surface, boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="chevronLeft" size={18} strokeWidth={2} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: t.inkMuted, fontWeight: 600 }}>140 fotos · 12 vídeos</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.ink, letterSpacing: -0.6 }}>Meu álbum</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.pink500, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 18px ${t.pink500}50` }}>
            <Icon name="plus" size={20} strokeWidth={2.6} />
          </div>
        </div>

        {/* filter chips */}
        <div style={{ padding: '14px 22px 0', display: 'flex', gap: 7, overflow: 'hidden' }}>
          {[
            { l: 'Tudo', n: 152, sel: true },
            { l: 'Barriga', n: 20 },
            { l: 'Ultrassom', n: 8 },
            { l: 'Marcos', n: 12 },
          ].map((c, i) => (
            <div key={i} style={{
              padding: '7px 13px', borderRadius: 100, fontSize: 11.5, fontWeight: 700,
              background: c.sel ? t.ink : t.surface,
              color: c.sel ? '#fff' : t.ink,
              border: c.sel ? 'none' : `1px solid ${t.hairline}`,
              whiteSpace: 'nowrap',
            }}>{c.l} <span style={{ opacity: 0.5, marginLeft: 3 }}>{c.n}</span></div>
          ))}
        </div>

        {/* this week hero */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{ fontSize: 11.5, color: t.pink500, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 }}>Esta semana</div>
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '120px 120px', gap: 6,
          }}>
            <div style={{ gridRow: '1 / 3', borderRadius: 22, overflow: 'hidden' }}>
              <PhotoPlaceholder height="100%" palette="pink" icon="mom" radius={0} label="Barriga · 20s" />
            </div>
            <div style={{ borderRadius: 18, overflow: 'hidden' }}>
              <PhotoPlaceholder height="100%" palette="lavender" icon="baby" radius={0} />
            </div>
            <div style={{ borderRadius: 18, overflow: 'hidden', position: 'relative' }}>
              <PhotoPlaceholder height="100%" palette="peach" icon="heart" radius={0} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 800 }}>+12</div>
            </div>
          </div>
        </div>

        {/* timeline by month */}
        <div style={{ padding: '20px 22px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>Abril · semana 18-19</div>
            <div style={{ fontSize: 12, color: t.inkMuted }}>24 itens</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            <div style={{ borderRadius: 14, overflow: 'hidden', height: 92 }}><PhotoPlaceholder height="100%" palette="pink" icon="mom" radius={0} /></div>
            <div style={{ borderRadius: 14, overflow: 'hidden', height: 92 }}><PhotoPlaceholder height="100%" palette="sage" icon="heart" radius={0} /></div>
            <div style={{ borderRadius: 14, overflow: 'hidden', height: 92, position: 'relative' }}>
              <PhotoPlaceholder height="100%" palette="lavender" icon="baby" radius={0} />
              <div style={{ position: 'absolute', top: 6, left: 6, padding: '2px 7px', borderRadius: 6, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 9, fontWeight: 700 }}>📹 0:24</div>
            </div>
          </div>
        </div>

        {/* milestone strip */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{
            background: `linear-gradient(135deg, ${t.lav100}, ${t.pink100})`,
            borderRadius: 20, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ fontSize: 28 }}>🎉</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: t.ink }}>Marco da metade</div>
              <div style={{ fontSize: 11, color: t.inkMuted, marginTop: 1 }}>20 semanas · compartilhe com sua família</div>
            </div>
            <div style={{ padding: '6px 12px', borderRadius: 100, background: t.pink500, color: '#fff', fontSize: 11, fontWeight: 700 }}>Compartilhar</div>
          </div>
        </div>
      </div>
    </PhoneB>
  );
}

// ─── EXAMES & RESULTADOS ─────────────────────────────────────────
function ExamsB() {
  const t = TBF;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden' }}>
        <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.surface, boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="chevronLeft" size={18} strokeWidth={2} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: t.inkMuted, fontWeight: 600 }}>14 exames · 2 pendentes</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.ink, letterSpacing: -0.6 }}>Exames</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.pink500, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 18px ${t.pink500}50` }}>
            <Icon name="plus" size={20} strokeWidth={2.6} />
          </div>
        </div>

        {/* status row */}
        <div style={{ padding: '14px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { v: '12', l: 'Concluídos', c: t.success },
            { v: '2', l: 'Pendentes', c: t.warning },
            { v: '0', l: 'Atenção', c: t.danger },
          ].map((s, i) => (
            <div key={i} style={{ background: t.surface, borderRadius: 16, padding: 12, boxShadow: t.shadowCard, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.c, letterSpacing: -0.5 }}>{s.v}</div>
              <div style={{ fontSize: 10.5, color: t.inkMuted, fontWeight: 600, marginTop: 1 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* trimester tabs */}
        <div style={{ padding: '16px 22px 0', display: 'flex', gap: 6 }}>
          {['1º trim', '2º trim', '3º trim'].map((tab, i) => (
            <div key={i} style={{
              flex: 1, padding: '8px 0', textAlign: 'center',
              borderRadius: 100, fontSize: 11.5, fontWeight: 700,
              background: i === 1 ? t.ink : 'transparent',
              color: i === 1 ? '#fff' : t.inkMuted,
              border: i === 1 ? 'none' : `1px solid ${t.hairline}`,
            }}>{tab}</div>
          ))}
        </div>

        {/* pending exam highlighted */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{
            background: t.surface, borderRadius: 22, padding: '14px 16px',
            boxShadow: t.shadowCard, border: `1.5px solid ${t.warning}40`,
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: -8, left: 16, padding: '3px 10px', borderRadius: 100, background: t.warning, color: '#fff', fontSize: 9.5, fontWeight: 800, letterSpacing: 0.4 }}>⏰ AGENDAR</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: t.warning + '18', color: t.warning, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="droplet" size={20} strokeWidth={2} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>Curva glicêmica · TOTG</div>
                <div style={{ fontSize: 11.5, color: t.inkMuted, marginTop: 2 }}>Recomendado entre 24-28 sem · em jejum</div>
              </div>
              <Icon name="chevronRight" size={18} color={t.inkMuted} />
            </div>
          </div>
        </div>

        {/* exam list */}
        <div style={{ padding: '18px 22px 0' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.ink, marginBottom: 8 }}>Concluídos</div>
          {[
            { d: '23 abr', t: 'Ultrassom morfológico', sub: 'Hosp. Pérola · Dr. Caio', tag: 'Tudo bem ✓', tc: t.success, ic: 'eye', col: t.pink500 },
            { d: '12 abr', t: 'Hemograma completo', sub: 'Lab. Sabin · 18 sem', tag: 'Normal', tc: t.success, ic: 'droplet', col: '#5C9BC2' },
            { d: '04 mar', t: 'Glicemia jejum', sub: '92 mg/dL', tag: 'Normal', tc: t.success, ic: 'activity', col: '#E8854A' },
            { d: '21 fev', t: 'Tipagem sanguínea', sub: 'O+ · 12 sem', tag: 'Concluído', tc: t.inkMuted, ic: 'pill', col: t.lav200 },
          ].map((e, i) => (
            <div key={i} style={{
              background: t.surface, borderRadius: 16, padding: '10px 14px', marginBottom: 8,
              boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: e.col + '18', color: e.col, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={e.ic} size={16} strokeWidth={2} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.t}</div>
                <div style={{ fontSize: 10.5, color: t.inkMuted, marginTop: 1 }}>{e.sub}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10.5, color: t.inkMuted, fontWeight: 600 }}>{e.d}</div>
                <div style={{ fontSize: 9.5, color: e.tc, fontWeight: 700, marginTop: 2 }}>{e.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneB>
  );
}

// ─── PLANO DE PARTO ─────────────────────────────────────────────
function BirthPlanB() {
  const t = TBF;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden' }}>
        <div style={{
          padding: '8px 18px 18px',
          background: `linear-gradient(160deg, ${t.lav100} 0%, ${t.pink100} 100%)`,
          position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="chevronLeft" size={18} strokeWidth={2} />
            </div>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="edit" size={16} strokeWidth={1.8} />
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 11.5, color: t.pink600, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>Plano de parto · rascunho</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: t.ink, letterSpacing: -0.8, marginTop: 4, lineHeight: 1.1 }}>Como eu desejo<br/>esse momento ser</div>
          </div>

          {/* progress */}
          <div style={{ marginTop: 18, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)', borderRadius: 16, padding: '10px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 11.5, color: t.ink, fontWeight: 700 }}>62% preenchido</div>
              <div style={{ fontSize: 10.5, color: t.inkMuted }}>5 de 8 seções</div>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.6)', overflow: 'hidden' }}>
              <div style={{ width: '62%', height: '100%', borderRadius: 3, background: t.pink500 }} />
            </div>
          </div>
        </div>

        {/* sections */}
        <div style={{ padding: '14px 18px 0' }}>
          {[
            { ic: 'home', l: 'Local e ambiente', s: 'Hospital Pérola · quarto privativo · luzes baixas', done: true },
            { ic: 'user', l: 'Equipe', s: 'Dra. Marina · doula Lia · enfermeira Júlia', done: true },
            { ic: 'sparkles', l: 'Ambiente', s: 'Música, aromaterapia, banho quente', done: true },
            { ic: 'heart', l: 'Trabalho de parto', s: 'Liberdade de movimento · pouca intervenção', done: true },
            { ic: 'pill', l: 'Analgesia', s: 'Em discussão com a equipe', done: true },
            { ic: 'flower', l: 'Nascimento', s: 'A definir', done: false },
            { ic: 'foot', l: 'Pós-parto imediato', s: 'A definir', done: false },
            { ic: 'mail', l: 'Cesárea (caso necessário)', s: 'A definir', done: false },
          ].map((sec, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              background: t.surface, borderRadius: 16, marginBottom: 8, boxShadow: t.shadowCard,
              border: sec.done ? 'none' : `1.5px dashed ${t.hairline}`,
              opacity: sec.done ? 1 : 0.7,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 11,
                background: sec.done ? t.pink50 : t.bg, color: sec.done ? t.pink500 : t.inkMuted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={sec.ic} size={16} strokeWidth={2} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: t.ink }}>{sec.l}</div>
                <div style={{ fontSize: 10.5, color: t.inkMuted, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sec.s}</div>
              </div>
              {sec.done
                ? <div style={{ width: 22, height: 22, borderRadius: 11, background: t.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={12} color="#fff" strokeWidth={3} /></div>
                : <Icon name="chevronRight" size={16} color={t.inkSubtle} />}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ position: 'absolute', left: 18, right: 18, bottom: 24 }}>
          <button style={{
            width: '100%', height: 52, border: 'none', borderRadius: 100,
            background: t.pink500, color: '#fff', fontSize: 14, fontWeight: 700,
            boxShadow: `0 12px 28px ${t.pink500}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Icon name="mail" size={16} color="#fff" />
            Enviar para Dra. Marina
          </button>
        </div>
      </div>
    </PhoneB>
  );
}

// ─── ENXOVAL / CHECKLIST ──────────────────────────────────────
function NurseryB() {
  const t = TBF;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden' }}>
        <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.surface, boxShadow: t.shadowCard, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="chevronLeft" size={18} strokeWidth={2} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: t.inkMuted, fontWeight: 600 }}>Para o bebê</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.ink, letterSpacing: -0.6 }}>Enxoval</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: t.pink500, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 18px ${t.pink500}50` }}>
            <Icon name="plus" size={20} strokeWidth={2.6} />
          </div>
        </div>

        {/* progress hero */}
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
                        strokeLinecap="round" strokeDasharray={`${2*Math.PI*34*0.42} 9999`} transform="rotate(-90 40 40)" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>42%</div>
                <div style={{ fontSize: 9, opacity: 0.85, fontWeight: 700, letterSpacing: 0.4 }}>32/76</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.2 }}>Bom progresso!</div>
              <div style={{ fontSize: 12, opacity: 0.9, marginTop: 2, lineHeight: 1.4 }}>Faltam 44 itens · cerca de R$ 1.200 estimados</div>
            </div>
          </div>
        </div>

        {/* category tabs */}
        <div style={{ padding: '16px 18px 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { ic: 'mom', l: 'Roupas', n: '12/22', c: t.pink400 },
            { ic: 'baby', l: 'Higiene', n: '8/15', c: '#5C9BC2' },
            { ic: 'home', l: 'Quarto', n: '6/18', c: t.lav200 },
            { ic: 'heart', l: 'Saída', n: '6/21', c: '#5BB76E' },
          ].map((cat, i) => (
            <div key={i} style={{
              background: t.surface, borderRadius: 16, padding: '10px 8px',
              boxShadow: t.shadowCard, textAlign: 'center',
              border: i === 0 ? `1.5px solid ${t.pink500}` : `1px solid ${t.hairline}`,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, background: cat.c + '20', color: cat.c,
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
              }}><Icon name="heart" size={14} strokeWidth={2.2} /></div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: t.ink, marginTop: 6 }}>{cat.l}</div>
              <div style={{ fontSize: 9.5, color: t.inkMuted, marginTop: 1 }}>{cat.n}</div>
            </div>
          ))}
        </div>

        {/* checklist */}
        <div style={{ padding: '18px 22px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.ink }}>Roupas · 12 de 22</div>
            <div style={{ fontSize: 11.5, color: t.pink500, fontWeight: 700 }}>Filtrar</div>
          </div>
          {[
            { l: 'Body manga curta · 6un · RN', p: 'R$ 89', done: true, prio: 'essencial' },
            { l: 'Body manga longa · 6un · P', p: 'R$ 95', done: true, prio: 'essencial' },
            { l: 'Macacão · 4un · RN/P', p: 'R$ 120', done: true },
            { l: 'Toucas e luvas · kit', p: 'R$ 45', done: false, prio: 'essencial' },
            { l: 'Pijama macio · 3un', p: 'R$ 75', done: false },
            { l: 'Saída de maternidade', p: 'R$ 220', done: false, prio: 'especial' },
          ].map((it, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
              borderBottom: i < 5 ? `1px solid ${t.hairline}` : 'none',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 11,
                background: it.done ? t.success : 'transparent',
                border: it.done ? 'none' : `2px solid ${t.hairline}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {it.done && <Icon name="check" size={12} color="#fff" strokeWidth={3} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: it.done ? t.inkMuted : t.ink, textDecoration: it.done ? 'line-through' : 'none' }}>{it.l}</div>
                {it.prio && <div style={{ marginTop: 3, display: 'inline-block', padding: '1px 7px', borderRadius: 100, fontSize: 9, fontWeight: 700, letterSpacing: 0.3,
                  background: it.prio === 'essencial' ? t.pink50 : t.lav50,
                  color: it.prio === 'essencial' ? t.pink500 : t.lav200,
                }}>{it.prio.toUpperCase()}</div>}
              </div>
              <div style={{ fontSize: 11.5, color: t.inkMuted, fontWeight: 700 }}>{it.p}</div>
            </div>
          ))}
        </div>
      </div>
    </PhoneB>
  );
}

// ─── ARTIGO / CONTEÚDO ───────────────────────────────────────
function ArticleB() {
  const t = TBF;
  return (
    <PhoneB>
      <div style={{ position: 'relative', height: '100%', background: t.bg, overflow: 'hidden' }}>
        {/* hero photo */}
        <div style={{ position: 'relative', height: 240 }}>
          <PhotoPlaceholder height={240} palette="lavender" icon="mom" radius={0} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.6) 100%)',
          }} />
          {/* nav */}
          <div style={{ position: 'absolute', top: 8, left: 18, right: 18, display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="chevronLeft" size={18} strokeWidth={2} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 42, height: 42, borderRadius: 14, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="heart" size={18} strokeWidth={2} color={t.pink500} />
              </div>
              <div style={{ width: 42, height: 42, borderRadius: 14, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="arrowRight" size={18} strokeWidth={2} />
              </div>
            </div>
          </div>
          {/* title */}
          <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18, color: '#fff' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 100, background: t.pink500, fontSize: 10, fontWeight: 800, letterSpacing: 0.6 }}>
              ✨ PLUS · 2º TRIMESTRE
            </div>
            <h1 style={{ margin: '8px 0 0', fontSize: 22, fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.6 }}>
              Os 5 sinais de que tudo está indo bem (mesmo quando você duvida)
            </h1>
          </div>
        </div>

        {/* meta */}
        <div style={{ padding: '14px 22px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${t.lav200}, ${t.pink400})`, color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>R</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: t.ink }}>Renata Castro · obstetriz</div>
            <div style={{ fontSize: 10, color: t.inkMuted }}>5 min de leitura · revisado em 23 abr</div>
          </div>
          <div style={{ padding: '5px 10px', borderRadius: 100, background: t.lav50, color: t.pink500, fontSize: 10.5, fontWeight: 700 }}>🎧 Ouvir</div>
        </div>

        {/* body */}
        <div style={{ padding: '14px 22px 0', fontSize: 13, color: t.ink, lineHeight: 1.6 }}>
          <p style={{ margin: 0 }}>
            É comum, no segundo trimestre, oscilar entre a alegria de sentir o bebê mexer e a preocupação silenciosa de que algo possa estar errado. Esses sentimentos convivem.
          </p>
        </div>

        {/* pull quote */}
        <div style={{ padding: '14px 22px 0' }}>
          <div style={{
            borderLeft: `3px solid ${t.pink500}`, paddingLeft: 14,
            fontFamily: t.fontSerif, fontStyle: 'italic',
            fontSize: 17, color: t.ink, lineHeight: 1.4, fontWeight: 500,
          }}>
            "Confie no seu corpo — ele já sabe o que fazer."
          </div>
        </div>

        {/* checklist preview */}
        <div style={{ padding: '14px 22px 0' }}>
          <div style={{ background: t.surface, borderRadius: 18, padding: 14, boxShadow: t.shadowCard }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: t.ink, marginBottom: 8 }}>Os 5 sinais</div>
            {['Movimentos regulares do bebê', 'Ganho de peso saudável', 'Pressão estável'].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontSize: 12, color: t.inkMuted }}>
                <div style={{ width: 18, height: 18, borderRadius: 9, background: t.pink500, color: '#fff', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                {s}
              </div>
            ))}
            <div style={{ fontSize: 11.5, color: t.pink500, fontWeight: 700, marginTop: 6 }}>Ler o restante (2 itens) →</div>
          </div>
        </div>
      </div>
    </PhoneB>
  );
}

window.DirectionBFinal = { ChatB, AlbumB, ExamsB, BirthPlanB, NurseryB, ArticleB };
