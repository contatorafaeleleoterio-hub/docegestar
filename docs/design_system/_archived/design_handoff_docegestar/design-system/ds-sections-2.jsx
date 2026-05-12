// DoceGestar Design System — Components & Patterns

const DC = window.TOKENS_B;
const { DSCard, DSSection, CodeChip } = window.DSDocSections1;
const DGIcon2 = window.DGIcon;

// Live components
function DGButton({ variant = 'primary', size = 'md', icon, children }) {
  const heights = { sm: 40, md: 52, lg: 58 };
  const padX = { sm: 16, md: 22, lg: 28 };
  const fontS = { sm: 13, md: 14, lg: 15 };
  const styles = {
    primary: { background: DC.pink500, color: '#fff', boxShadow: `0 10px 22px ${DC.pink500}40`, border: 'none' },
    secondary: { background: DC.lav50, color: DC.pink600, border: 'none' },
    ghost: { background: 'transparent', color: DC.ink, border: `1.5px solid ${DC.hairline}` },
    danger: { background: DC.danger, color: '#fff', border: 'none' },
  };
  return (
    <button style={{
      height: heights[size], padding: `0 ${padX[size]}px`, borderRadius: 100,
      fontFamily: DC.fontBody, fontSize: fontS[size], fontWeight: 700,
      display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
      ...styles[variant],
    }}>
      {icon && <DGIcon2 name={icon} size="sm" />}
      {children}
    </button>
  );
}

function DGChip({ selected, icon, children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '7px 13px', borderRadius: 100, fontSize: 12, fontWeight: 700,
      background: selected ? DC.pink500 : '#fff',
      color: selected ? '#fff' : DC.ink,
      boxShadow: selected ? `0 6px 14px ${DC.pink500}40` : 'none',
      border: selected ? 'none' : `1.5px solid ${DC.hairline}`,
    }}>
      {icon && <DGIcon2 name={icon} size="xs" />}
      {children}
    </div>
  );
}

function DGInput({ label, value, icon, placeholder = '' }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: DC.ink, marginBottom: 6 }}>{label}</div>
      <div style={{
        height: 52, borderRadius: 16, background: '#fff',
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10,
        border: `1.5px solid ${DC.hairline}`,
      }}>
        {icon && <DGIcon2 name={icon} size="sm" color={DC.inkMuted} />}
        <span style={{ flex: 1, fontSize: 14, color: value ? DC.ink : DC.inkSubtle, fontWeight: 500 }}>{value || placeholder}</span>
      </div>
    </div>
  );
}

function DGToggle({ on }) {
  return (
    <div style={{
      width: 46, height: 28, borderRadius: 14, position: 'relative',
      background: on ? DC.pink500 : DC.hairline, transition: 'background 0.2s',
    }}>
      <div style={{
        position: 'absolute', top: 3, left: on ? 22 : 3, width: 22, height: 22, borderRadius: 11, background: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)', transition: 'left 0.2s',
      }} />
    </div>
  );
}

function DGBadge({ tone = 'neutral', children }) {
  const tones = {
    neutral: { bg: DC.lav50, fg: DC.pink600 },
    success: { bg: DC.success + '20', fg: DC.success },
    warning: { bg: DC.warning + '20', fg: DC.warning },
    danger:  { bg: DC.danger + '20', fg: DC.danger },
  };
  const s = tones[tone];
  return (
    <span style={{ padding: '3px 9px', borderRadius: 100, fontSize: 10.5, fontWeight: 700, background: s.bg, color: s.fg, letterSpacing: 0.3 }}>{children}</span>
  );
}

function DGListItem({ icon, title, sub, trailing }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
      background: '#fff', borderRadius: 16, boxShadow: '0 1px 2px rgba(40,20,60,0.04), 0 8px 28px rgba(40,20,60,0.06)',
    }}>
      <div style={{ width: 38, height: 38, borderRadius: 12, background: DC.pink50, color: DC.pink500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DGIcon2 name={icon} size="sm" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: DC.ink }}>{title}</div>
        <div style={{ fontSize: 11, color: DC.inkMuted, marginTop: 1 }}>{sub}</div>
      </div>
      {trailing}
    </div>
  );
}

function DGMetric({ icon, label, value, sub, color = DC.pink500 }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, padding: 14, boxShadow: '0 1px 2px rgba(40,20,60,0.04), 0 8px 28px rgba(40,20,60,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 9, background: color + '20', color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DGIcon2 name={icon} size="xs" />
        </div>
        <div style={{ fontSize: 11.5, color: DC.inkMuted, fontWeight: 600 }}>{label}</div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: DC.ink, letterSpacing: -0.5, marginTop: 8 }}>{value}</div>
      <div style={{ fontSize: 10.5, color: DC.inkSubtle, marginTop: 1 }}>{sub}</div>
    </div>
  );
}

// Sub-card showing one component example with label
function CompoSlot({ name, usage, children, span = 1 }) {
  return (
    <DSCard style={{ gridColumn: `span ${span}`, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: DC.ink }}>{name}</div>
        <CodeChip>{`<${name.replace(/\s+/g, '')}/>`}</CodeChip>
      </div>
      <div style={{ fontSize: 12, color: DC.inkMuted, marginBottom: 16, lineHeight: 1.4 }}>{usage}</div>
      <div style={{ flex: 1, background: DC.bg, borderRadius: 14, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {children}
      </div>
    </DSCard>
  );
}

function ComponentSection() {
  return (
    <DSSection id="components" eyebrow="06 · Biblioteca" title="Componentes" lede="Blocos básicos que aparecem repetidamente nas telas. Mantenha a API simples e o comportamento previsível.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>

        <CompoSlot name="Button" usage="CTA principal · pink500. Secundário em lavanda. Ghost para ações sutis." span={2}>
          <DGButton variant="primary" icon="arrowRight">Começar agora</DGButton>
          <DGButton variant="secondary">Saiba mais</DGButton>
          <DGButton variant="ghost">Cancelar</DGButton>
          <DGButton variant="primary" size="sm">Pequeno</DGButton>
        </CompoSlot>

        <CompoSlot name="Chip" usage="Filtros, sintomas, categorias. Selecionado em pink500.">
          <DGChip selected icon="check">Náusea</DGChip>
          <DGChip icon="plus">Cansaço</DGChip>
          <DGChip>Cólica</DGChip>
        </CompoSlot>

        <CompoSlot name="Badge" usage="Status compacto. Use semânticas com moderação.">
          <DGBadge>Novo</DGBadge>
          <DGBadge tone="success">Saudável</DGBadge>
          <DGBadge tone="warning">Agendar</DGBadge>
          <DGBadge tone="danger">Atenção</DGBadge>
        </CompoSlot>

        <CompoSlot name="Input" usage="Campos de formulário com ícone à esquerda.">
          <div style={{ width: '100%', maxWidth: 320 }}>
            <DGInput label="Email" value="ana.beatriz@email.com" icon="mail" />
          </div>
        </CompoSlot>

        <CompoSlot name="Toggle" usage="Preferências on/off. Sempre com label adjacente.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 13, color: DC.ink, fontWeight: 600 }}>
              Lembretes <DGToggle on />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 13, color: DC.ink, fontWeight: 600 }}>
              Modo escuro <DGToggle />
            </div>
          </div>
        </CompoSlot>

        <CompoSlot name="List item" usage="Lista de exames, consultas, dicas, etc." span={2}>
          <div style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <DGListItem icon="calendar" title="Consulta · Dra. Marina" sub="14 mai · 14:30 · Hosp. Pérola" trailing={<DGBadge tone="warning">Em 2 dias</DGBadge>} />
            <DGListItem icon="pill" title="Ácido fólico" sub="Todo dia · 08:00" trailing={<DGIcon2 name="chevronRight" size="sm" color={DC.inkSubtle} />} />
          </div>
        </CompoSlot>

        <CompoSlot name="Metric" usage="Indicadores de saúde no painel. Sempre com ícone tinted.">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%', maxWidth: 320 }}>
            <DGMetric icon="heart" label="Pressão" value="118/76" sub="mmHg · normal" color={DC.danger} />
            <DGMetric icon="moon" label="Sono" value="7h 20m" sub="suave" color={DC.lav200} />
          </div>
        </CompoSlot>

      </div>
    </DSSection>
  );
}

// ─── Pattern: Header anatomy ──────────────────────────────
function PatternSection() {
  return (
    <DSSection id="patterns" eyebrow="07 · Padrões" title="Padrões de tela" lede="Como combinar tokens e componentes para resolver padrões recorrentes do produto.">

      <DSCard style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: DC.ink }}>Anatomia do header</div>
        <div style={{ fontSize: 12.5, color: DC.inkMuted, marginTop: 4, marginBottom: 20 }}>Toda tela do app começa com um header de 3 zonas: navegação, contexto, ação. Mantém ritmo e previsibilidade.</div>

        <div style={{ background: DC.bg, borderRadius: 18, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: '#fff', boxShadow: DC.shadowCard, display: 'flex', alignItems: 'center', justifyContent: 'center', color: DC.ink }}>
            <DGIcon2 name="chevronLeft" size="sm" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: DC.inkMuted, fontWeight: 600 }}>Quinta · 23 abr</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: DC.ink, letterSpacing: -0.6 }}>Sua saúde</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: DC.pink500, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 18px ${DC.pink500}50` }}>
            <DGIcon2 name="plus" size="sm" />
          </div>
          {/* annotations */}
          <div style={{ position: 'absolute', left: 22, top: 78, fontSize: 10, color: DC.pink500, fontWeight: 700 }}>↑ Navegação · 42×42</div>
          <div style={{ position: 'absolute', left: '38%', top: 78, fontSize: 10, color: DC.pink500, fontWeight: 700 }}>↑ Eyebrow + título</div>
          <div style={{ position: 'absolute', right: 22, top: 78, fontSize: 10, color: DC.pink500, fontWeight: 700 }}>↑ Ação · solid</div>
        </div>
      </DSCard>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <DSCard>
          <div style={{ fontSize: 14, fontWeight: 700, color: DC.ink }}>Hero card emocional</div>
          <div style={{ fontSize: 12.5, color: DC.inkMuted, marginTop: 4, marginBottom: 16 }}>Quando a tela é sobre um marco (semana, peso, progresso). Gradiente pink400→pink600 + tipografia grande + ilustração à direita.</div>
          <div style={{
            background: `linear-gradient(135deg, ${DC.pink400}, ${DC.pink500}, ${DC.pink600})`,
            color: '#fff', borderRadius: 22, padding: 18,
          }}>
            <div style={{ fontSize: 10.5, opacity: 0.85, letterSpacing: 1, fontWeight: 700 }}>2º TRIMESTRE</div>
            <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, letterSpacing: -1.5, marginTop: 6 }}>20<span style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginLeft: 6 }}>semanas</span></div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 3, marginTop: 14 }}>
              <div style={{ width: '50%', height: '100%', background: '#fff', borderRadius: 3 }} />
            </div>
          </div>
        </DSCard>

        <DSCard>
          <div style={{ fontSize: 14, fontWeight: 700, color: DC.ink }}>Tom de voz</div>
          <div style={{ fontSize: 12.5, color: DC.inkMuted, marginTop: 4, marginBottom: 16 }}>Direto, caloroso, respeitoso. Trate a usuária como adulta — nunca diminutivos forçados.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: '10px 14px', borderLeft: `3px solid ${DC.success}`, background: DC.success + '10' }}>
              <div style={{ fontSize: 10, color: DC.success, fontWeight: 800, letterSpacing: 0.6 }}>SIM</div>
              <div style={{ fontSize: 13, color: DC.ink, marginTop: 2 }}>"Você está na metade da jornada. Continue assim."</div>
            </div>
            <div style={{ padding: '10px 14px', borderLeft: `3px solid ${DC.danger}`, background: DC.danger + '10' }}>
              <div style={{ fontSize: 10, color: DC.danger, fontWeight: 800, letterSpacing: 0.6 }}>NÃO</div>
              <div style={{ fontSize: 13, color: DC.ink, marginTop: 2 }}>"Aaaaai, mamãezinha! Tá quaaase lá! 💕💕💕"</div>
            </div>
          </div>
        </DSCard>
      </div>
    </DSSection>
  );
}

window.DSDocSections2 = { ComponentSection, PatternSection };
