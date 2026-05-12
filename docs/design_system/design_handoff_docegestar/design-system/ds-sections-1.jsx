// DoceGestar Design System — Documentation page sections (React)
// Renders each section of the design system doc.

const DT = window.TOKENS_B;
const DGIcon = window.DGIcon;
const ICONS = window.DG_ICON_NAMES;
const SIZES = window.DG_ICON_SIZES;

// ─── Shared doc components ───────────────────────────────────
function DSCard({ children, style = {} }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 20, padding: 20,
      boxShadow: '0 1px 2px rgba(40,20,60,0.04), 0 8px 28px rgba(40,20,60,0.06)',
      border: `1px solid ${DT.hairline}`, ...style,
    }}>{children}</div>
  );
}

function DSSection({ id, eyebrow, title, lede, children }) {
  return (
    <section id={id} style={{ padding: '64px 0 24px', borderTop: `1px solid ${DT.hairline}` }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: DT.pink500, letterSpacing: 1.2, textTransform: 'uppercase' }}>{eyebrow}</div>
      <h2 style={{ fontFamily: DT.fontDisplay, fontSize: 44, fontWeight: 800, color: DT.ink, margin: '8px 0 12px', letterSpacing: -1.4, lineHeight: 1.05 }}>{title}</h2>
      {lede && <p style={{ fontSize: 16, color: DT.inkMuted, maxWidth: 640, lineHeight: 1.5, margin: '0 0 32px' }}>{lede}</p>}
      {children}
    </section>
  );
}

function CodeChip({ children }) {
  return (
    <code style={{
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 11.5, padding: '2px 7px', borderRadius: 6,
      background: DT.lav50, color: DT.pink600,
    }}>{children}</code>
  );
}

// ─── 1. Brand ───────────────────────────────────────────────
function BrandSection() {
  return (
    <DSSection id="brand" eyebrow="01 · Fundamentos" title="Marca" lede="DoceGestar é uma marca feminina, acolhedora e moderna. Cuidamos do momento mais delicado da vida da mulher com clareza, sem infantilizar e sem floreios excessivos.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <DSCard>
          <div style={{ fontSize: 13, fontWeight: 700, color: DT.ink }}>Princípio 01</div>
          <div style={{ fontFamily: DT.fontDisplay, fontSize: 24, fontWeight: 700, color: DT.ink, marginTop: 6, letterSpacing: -0.5, lineHeight: 1.15 }}>Acolhedor, nunca infantil</div>
          <p style={{ fontSize: 13, color: DT.inkMuted, lineHeight: 1.5, marginTop: 10 }}>Linguagem visual quente sem corações flutuantes, glitter ou ilustrações “fofas”. Use rosa com intenção, não como decoração.</p>
        </DSCard>
        <DSCard>
          <div style={{ fontSize: 13, fontWeight: 700, color: DT.ink }}>Princípio 02</div>
          <div style={{ fontFamily: DT.fontDisplay, fontSize: 24, fontWeight: 700, color: DT.ink, marginTop: 6, letterSpacing: -0.5, lineHeight: 1.15 }}>Clareza sobre estética</div>
          <p style={{ fontSize: 13, color: DT.inkMuted, lineHeight: 1.5, marginTop: 10 }}>Em contexto clínico (exames, sintomas, pressão arterial), priorize legibilidade e hierarquia. O lúdico vem nas memórias e marcos.</p>
        </DSCard>
        <DSCard>
          <div style={{ fontSize: 13, fontWeight: 700, color: DT.ink }}>Princípio 03</div>
          <div style={{ fontFamily: DT.fontDisplay, fontSize: 24, fontWeight: 700, color: DT.ink, marginTop: 6, letterSpacing: -0.5, lineHeight: 1.15 }}>Calmo por padrão</div>
          <p style={{ fontSize: 13, color: DT.inkMuted, lineHeight: 1.5, marginTop: 10 }}>Bordas generosas, sombras suaves, espaços respiráveis. Cores vibrantes apenas para CTAs e estados ativos.</p>
        </DSCard>
      </div>
    </DSSection>
  );
}

// ─── 2. Color ───────────────────────────────────────────────
function ColorSection() {
  const groups = [
    {
      title: 'Rosa · primária',
      desc: 'CTAs, estados ativos, destaque emocional. Use pink500 como cor principal.',
      ramp: [
        ['pink50', '#FFF1F5'], ['pink100', '#FFD9E4'], ['pink200', '#FFB3CB'],
        ['pink300', '#FF7FAB'], ['pink400', '#FF4B8E'], ['pink500', '#EC3779', true],
        ['pink600', '#C8255F'],
      ],
    },
    {
      title: 'Lavanda · acento',
      desc: 'Fundos suaves, segundo plano, ícones em estado tinted.',
      ramp: [['lav50', '#F4F0FB'], ['lav100', '#E5DCF5'], ['lav200', '#C9B8E8']],
    },
    {
      title: 'Tinta · texto',
      desc: 'Hierarquia tipográfica. Nunca use cinza neutro — sempre tinta com matiz violeta.',
      ramp: [['ink', '#1F1A2E', true], ['inkMuted', '#5E5870'], ['inkSubtle', '#9690A8'], ['hairline', '#EDE7F3']],
    },
    {
      title: 'Semântica',
      desc: 'Estados de status. Use com moderação — nunca decore.',
      ramp: [['success', '#3DB57E'], ['warning', '#F0A23A'], ['danger', '#E15858']],
    },
  ];
  return (
    <DSSection id="color" eyebrow="02 · Fundamentos" title="Cor" lede="Paleta enxuta e intencional. Cada cor tem um trabalho — se não tiver, não está no sistema.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {groups.map(g => (
          <div key={g.title}>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: DT.ink }}>{g.title}</div>
              <div style={{ fontSize: 13, color: DT.inkMuted, marginTop: 2 }}>{g.desc}</div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {g.ramp.map(([name, hex, main]) => (
                <div key={name} style={{
                  flex: '1 1 120px', minWidth: 130,
                  background: '#fff', borderRadius: 14, overflow: 'hidden',
                  border: `1px solid ${DT.hairline}`,
                  outline: main ? `2px solid ${DT.pink500}` : 'none', outlineOffset: -2,
                }}>
                  <div style={{ height: 72, background: hex, position: 'relative' }}>
                    {main && <div style={{ position: 'absolute', top: 8, right: 8, padding: '2px 7px', borderRadius: 100, background: '#fff', color: DT.ink, fontSize: 9.5, fontWeight: 800, letterSpacing: 0.4 }}>MAIN</div>}
                  </div>
                  <div style={{ padding: '8px 12px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: DT.ink }}>{name}</div>
                    <div style={{ fontSize: 11, color: DT.inkMuted, fontFamily: 'ui-monospace, monospace', marginTop: 1 }}>{hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DSSection>
  );
}

// ─── 3. Typography ──────────────────────────────────────────
function TypeSection() {
  const scale = [
    { name: 'Display / 56', size: 56, weight: 800, ls: -2, ff: DT.fontDisplay, sample: 'Sua jornada' },
    { name: 'H1 / 32', size: 32, weight: 800, ls: -1.2, ff: DT.fontDisplay, sample: 'Acompanhe cada momento' },
    { name: 'H2 / 22', size: 22, weight: 800, ls: -0.6, ff: DT.fontDisplay, sample: 'Sua saúde' },
    { name: 'H3 / 18', size: 18, weight: 700, ls: -0.2, ff: DT.fontBody, sample: 'Seu bebê hoje' },
    { name: 'Body / 14', size: 14, weight: 500, ls: 0, ff: DT.fontBody, sample: 'Tudo o que você precisa em um só lugar.' },
    { name: 'Caption / 12', size: 12, weight: 600, ls: 0, ff: DT.fontBody, sample: 'Última atualização: ontem' },
    { name: 'Eyebrow / 11', size: 11, weight: 700, ls: 1.2, ff: DT.fontBody, sample: '2º TRIMESTRE', tt: true },
    { name: 'Serif accent', size: 22, weight: 500, ls: -0.3, ff: DT.fontSerif, sample: 'Confie no seu corpo', it: true },
  ];
  return (
    <DSSection id="type" eyebrow="03 · Fundamentos" title="Tipografia" lede="Plus Jakarta Sans para 95% da interface. Fraunces (serif) reservado para citações editoriais e pull quotes — nunca para UI funcional.">
      <DSCard style={{ padding: 0, overflow: 'hidden' }}>
        {scale.map((s, i) => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', padding: '18px 22px', borderTop: i ? `1px solid ${DT.hairline}` : 'none', gap: 20 }}>
            <div style={{ width: 130, flexShrink: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: DT.ink }}>{s.name}</div>
              <div style={{ fontSize: 11, color: DT.inkMuted, fontFamily: 'ui-monospace, monospace', marginTop: 2 }}>{s.weight} · {s.ls}px</div>
            </div>
            <div style={{
              flex: 1, fontFamily: s.ff, fontSize: s.size, fontWeight: s.weight,
              letterSpacing: s.ls, lineHeight: 1.1, color: DT.ink,
              textTransform: s.tt ? 'uppercase' : 'none',
              fontStyle: s.it ? 'italic' : 'normal',
            }}>{s.sample}</div>
          </div>
        ))}
      </DSCard>
    </DSSection>
  );
}

// ─── 4. Spacing / Radii / Shadow ─────────────────────────────
function FormSection() {
  const space = [['1', 4], ['2', 8], ['3', 12], ['4', 16], ['5', 20], ['6', 24], ['7', 32], ['8', 40], ['9', 56]];
  const radii = [['xs', 8], ['sm', 12], ['md', 18], ['lg', 26], ['xl', 36], ['pill', 100]];
  const shadows = [
    ['soft', '0 2px 8px rgba(40,20,60,0.04), 0 16px 40px rgba(236,55,121,0.06)'],
    ['card', '0 1px 2px rgba(40,20,60,0.04), 0 8px 28px rgba(40,20,60,0.06)'],
    ['cta', '0 12px 28px rgba(236,55,121,0.4)'],
  ];
  return (
    <DSSection id="form" eyebrow="04 · Fundamentos" title="Forma" lede="Espaçamento em escala de 4. Raios generosos para reforçar a sensação de cuidado. Sombras suaves, nunca duras.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <DSCard>
          <div style={{ fontSize: 14, fontWeight: 700, color: DT.ink, marginBottom: 14 }}>Espaçamento · base 4</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {space.map(([n, v]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 70, fontSize: 11.5, color: DT.inkMuted }}><CodeChip>s-{n}</CodeChip></div>
                <div style={{ width: v, height: 10, background: DT.pink400, borderRadius: 3 }} />
                <div style={{ fontSize: 11.5, color: DT.inkMuted, fontFamily: 'ui-monospace, monospace' }}>{v}px</div>
              </div>
            ))}
          </div>
        </DSCard>
        <DSCard>
          <div style={{ fontSize: 14, fontWeight: 700, color: DT.ink, marginBottom: 14 }}>Raios</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {radii.map(([n, v]) => (
              <div key={n} style={{ textAlign: 'center' }}>
                <div style={{ height: 64, background: DT.lav50, border: `1.5px solid ${DT.lav200}`, borderRadius: v === 100 ? 100 : v }} />
                <div style={{ fontSize: 11, fontWeight: 700, color: DT.ink, marginTop: 6 }}>{n}</div>
                <div style={{ fontSize: 10.5, color: DT.inkMuted, fontFamily: 'ui-monospace, monospace' }}>{v === 100 ? '∞' : v + 'px'}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: DT.hairline, margin: '20px 0' }} />
          <div style={{ fontSize: 14, fontWeight: 700, color: DT.ink, marginBottom: 14 }}>Sombras</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {shadows.map(([n, s]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 56, height: 56, background: '#fff', borderRadius: 14, boxShadow: s }} />
                <div>
                  <CodeChip>shadow-{n}</CodeChip>
                  <div style={{ fontSize: 11, color: DT.inkMuted, marginTop: 4 }}>
                    {n === 'soft' && 'Cards principais'}
                    {n === 'card' && 'Cards e itens elevados'}
                    {n === 'cta' && 'Botões primários, FAB'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DSCard>
      </div>
    </DSSection>
  );
}

// ─── 5. Iconography ─────────────────────────────────────────
function IconSection() {
  const variants = [
    { name: 'Outline', sub: 'Padrão · 95% dos casos', bg: '#fff', col: DT.ink, ring: DT.hairline },
    { name: 'Tinted', sub: 'Categorias · chips · status', bg: DT.pink50, col: DT.pink500, ring: 'transparent' },
    { name: 'Solid', sub: 'CTAs primários · FAB', bg: DT.pink500, col: '#fff', ring: 'transparent' },
    { name: 'Premium', sub: 'Conteúdo exclusivo', bg: 'linear-gradient(135deg, #F0C75C, #C9923A)', col: '#fff', ring: 'transparent' },
  ];
  return (
    <DSSection id="icon" eyebrow="05 · Fundamentos" title="Iconografia" lede="36 ícones desenhados sobre grade 24×24 com stroke 1.75px, cantos arredondados e currentColor. Mesmo peso ótico em todos. Sem emojis — emojis são banidos da UI funcional para garantir consistência cross-platform.">

        {/* Sizes */}
        <DSCard style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: DT.ink, marginBottom: 4 }}>Escala</div>
          <div style={{ fontSize: 12.5, color: DT.inkMuted, marginBottom: 18 }}>Use sempre tamanhos nomeados. Tamanhos arbitrários quebram a coerência tipográfica.</div>
          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {Object.entries(SIZES).map(([n, v]) => (
              <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ height: 36, display: 'flex', alignItems: 'center', color: DT.ink }}>
                  <DGIcon name="heart" size={n} />
                </div>
                <CodeChip>icon-{n}</CodeChip>
                <div style={{ fontSize: 10.5, color: DT.inkMuted, fontFamily: 'ui-monospace, monospace' }}>{v}px</div>
              </div>
            ))}
          </div>
        </DSCard>

        {/* Variants */}
        <DSCard style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: DT.ink, marginBottom: 4 }}>Variantes de aplicação</div>
          <div style={{ fontSize: 12.5, color: DT.inkMuted, marginBottom: 18 }}>Quatro modos de aplicar o mesmo ícone, conforme o contexto da interface.</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {variants.map(v => (
              <div key={v.name} style={{ background: DT.bg, borderRadius: 16, padding: 16, textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: v.bg, color: v.col,
                  border: `1.5px solid ${v.ring}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto',
                }}>
                  <DGIcon name="heart" size="md" />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: DT.ink, marginTop: 10 }}>{v.name}</div>
                <div style={{ fontSize: 10.5, color: DT.inkMuted, marginTop: 2, lineHeight: 1.3 }}>{v.sub}</div>
              </div>
            ))}
          </div>
        </DSCard>

        {/* Catalog */}
        <DSCard>
          <div style={{ fontSize: 14, fontWeight: 700, color: DT.ink, marginBottom: 4 }}>Catálogo · {ICONS.length} ícones</div>
          <div style={{ fontSize: 12.5, color: DT.inkMuted, marginBottom: 18 }}>Grupo navegação, cuidado, tempo, comunicação, perfil, status, conteúdo.</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
            {ICONS.map(n => (
              <div key={n} style={{
                background: DT.bg, borderRadius: 12, padding: '14px 8px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}>
                <div style={{ color: DT.ink }}><DGIcon name={n} size="md" /></div>
                <div style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', color: DT.inkMuted, textAlign: 'center', wordBreak: 'break-all' }}>{n}</div>
              </div>
            ))}
          </div>
        </DSCard>

        {/* Do's & don'ts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          <DSCard style={{ borderTop: `4px solid ${DT.success}` }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: DT.success, letterSpacing: 0.6, marginBottom: 8 }}>FAÇA</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: DT.ink, lineHeight: 1.7 }}>
              <li>Use o componente <CodeChip>&lt;DGIcon&gt;</CodeChip> sempre.</li>
              <li>Combine ícone com label em navegação e CTAs.</li>
              <li>Use a variante tinted para reforçar categorias.</li>
              <li>Mantenha o ícone alinhado ao baseline do texto.</li>
            </ul>
          </DSCard>
          <DSCard style={{ borderTop: `4px solid ${DT.danger}` }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: DT.danger, letterSpacing: 0.6, marginBottom: 8 }}>NÃO FAÇA</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: DT.ink, lineHeight: 1.7 }}>
              <li>Não use emojis para representar ações ou status.</li>
              <li>Não misture estilos (fill + stroke) na mesma tela.</li>
              <li>Não use ícones decorativos sem propósito.</li>
              <li>Não invente cores de ícone — só ink, inkMuted ou pink500.</li>
            </ul>
          </DSCard>
        </div>
    </DSSection>
  );
}

window.DSDocSections1 = { BrandSection, ColorSection, TypeSection, FormSection, IconSection, DSCard, DSSection, CodeChip };
