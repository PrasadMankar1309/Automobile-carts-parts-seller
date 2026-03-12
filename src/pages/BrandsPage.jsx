import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel, SectionTitle, GradientText } from '../components/UI';
import { BRANDS } from '../data';

export default function BrandsPage() {
  const [filter, setFilter] = useState('All');
  const origins = ['All', ...Array.from(new Set(BRANDS.map(b => b.origin)))];
  const shown = filter === 'All' ? BRANDS : BRANDS.filter(b => b.origin === filter);

  return (
    <div style={{ paddingTop: 110, background: 'var(--bg0)', minHeight: '100vh' }}>
      {/* Cinematic Header */}
      <div style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        <div style={{ position: 'relative', maxWidth: 1300, margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label"
            style={{ justifyContent: 'center' }}
          >
            Strategic Brand Partners
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}
          >
            Authorized By The <br /><GradientText>Industry Giants</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: 16, lineHeight: 1.6 }}
          >
            Seven Eyes Distribution operates as the exclusive authorized channel for 11+ global manufacturers, ensuring ironclad authenticity and direct technical parity.
          </motion.p>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 28px 100px' }}>
        {/* Simplified Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 60, flexWrap: 'wrap' }}>
          {origins.map((o, i) => (
            <motion.button
              key={o}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`filter-pill ${filter === o ? 'active' : ''}`}
              onClick={() => setFilter(o)}
              style={{ padding: '10px 24px', borderRadius: '4px' }}
            >
              {o}
            </motion.button>
          ))}
        </div>

        {/* Brand Showcase Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, marginBottom: 80 }}>
          <AnimatePresence mode="popLayout">
            {shown.map((b, i) => (
              <motion.div key={b.name}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  background: 'var(--bg1)',
                  border: '1px solid var(--border)',
                  padding: '40px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 15
                }}
                className="brand-card-premium"
              >
                {/* Visual Identity */}
                <div style={{ fontSize: 44, marginBottom: 10 }}>{b.logo}</div>

                <div style={{ position: 'relative' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 26,
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    letterSpacing: '0.05em'
                  }}>
                    {b.name}
                  </h3>
                  <div style={{
                    width: 30,
                    height: 2,
                    background: b.color || 'var(--gold)',
                    marginTop: 8
                  }} />
                </div>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--gold)',
                  letterSpacing: '2px',
                  opacity: 0.8
                }}>
                  {b.tag}
                </div>

                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, flexGrow: 1 }}>
                  {b.desc}
                </p>

                <div style={{
                  marginTop: 20,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 20,
                  borderTop: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ORIGIN</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>{b.origin.toUpperCase()}</span>
                  </div>
                  <div style={{
                    background: 'rgba(0, 212, 255, 0.05)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    padding: '4px 10px',
                    fontSize: 9,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--cyan)'
                  }}>
                    AUTHORIZED DEALER
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global Standards */}
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 30 }}>
          {[
            { t: 'GENUINE', s: 'Verified manufacturer origins and certification.' },
            { t: 'SUPPORT', s: 'Direct synchronization with brand tech teams.' },
            { t: 'WARRANTY', s: 'Official coverage for all authorized inventory.' },
          ].map((item, i) => (
            <motion.div
              key={item.t}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 900, color: 'var(--gold)', letterSpacing: '3px', marginBottom: 10 }}>{item.t}</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.s}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

