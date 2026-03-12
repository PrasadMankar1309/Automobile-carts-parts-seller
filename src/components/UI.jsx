// Shared reusable UI components

export function SectionLabel({ text }) {
  return (
    <div className="section-label">{text}</div>
  );
}

export function SectionTitle({ children, style = {} }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(26px, 4vw, 50px)',
      fontWeight: 900,
      color: 'var(--text-primary)',
      lineHeight: 1.05,
      letterSpacing: '.02em',
      ...style,
    }}>
      {children}
    </h2>
  );
}

export function GradientText({ children, style = {} }) {
  return (
    <span style={{
      background: 'linear-gradient(90deg, var(--gold), var(--gold-light), #FF8C00)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      ...style,
    }}>
      {children}
    </span>
  );
}

export function Gear({ size = 80, cls = '', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="rgba(255,180,0,0.06)" className={cls} style={{ display: 'block', ...style }}>
      <path d="M50,35 A15,15 0,1,1,50,65 A15,15 0,1,1,50,35 M43,10 L57,10 L60,25 A27,27 0,0,1,70,32 L84,27 L93,38 L83,49 A27,27 0,0,1,83,61 L93,72 L84,83 L70,78 A27,27 0,0,1,60,85 L57,100 L43,100 L40,85 A27,27 0,0,1,30,78 L16,83 L7,72 L17,61 A27,27 0,0,1,17,49 L7,38 L16,27 L30,32 A27,27 0,0,1,40,25 Z" />
    </svg>
  );
}

export function Stars({ n = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ color: 'var(--gold)', fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}
