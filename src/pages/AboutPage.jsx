import { motion } from 'framer-motion';
import { SectionLabel, SectionTitle, GradientText, Gear } from '../components/UI';
import { Link } from 'react-router-dom';

const TIMELINE = [
  { year: '2000', t: 'Company Founded', d: 'Seven Eyes Distribution established in Nagpur, focusing on professional automotive hand tools.' },
  { year: '2005', t: 'Brand Partnerships', d: 'Signed authorized dealership agreements with Snap-on, Stanley, and Eastman.' },
  { year: '2010', t: 'Abrasives Division', d: 'Added Norton (Saint-Gobain), Mirka, Henkel and Sika to the brand portfolio.' },
  { year: '2015', t: 'Machines & Equipment', d: 'Expanded into garage equipment, hydraulic tools and industrial machinery.' },
  { year: '2020', t: 'Value Added Services', d: 'Launched ceramic coating, PPF, and automotive detailing services division.' },
  { year: '2025', t: 'Growing Strong', d: 'Now serving 500+ clients across Nagpur and Maharashtra with 11+ premium brands.' },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 110 }}>
      <div style={{ background: 'var(--bg1)', padding: '52px 0 44px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', opacity: 0.04 }}>
          <Gear size={400} style={{ animation: 'spinGearR 40s linear infinite' }} />
        </div>
        <div style={{ position: 'relative', maxWidth: 1300, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.2em', color: 'var(--gold)', marginBottom: 12 }}>// ABOUT US</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,58px)', fontWeight: 900 }}>
            <GradientText>25 Years</GradientText> of Industrial Excellence
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, maxWidth: 540, fontSize: 15 }}>
            Bridging the gap between high-quality procurement and long-term operational excellence through our dedicated sales and service teams.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '60px 28px 80px' }}>
        {/* Mission / Vision */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 72 }}>
          {[
            { icon: '🎯', label: 'Our Mission', text: 'To empower automotive professionals and industrial operators with the finest tools, equipment, and support services — making world-class brands accessible across Maharashtra.' },
            { icon: '🔭', label: 'Our Vision', text: 'To be the most trusted industrial distribution partner in the region, known for quality, reliability, and the depth of our technical expertise and after-sales support.' },
            { icon: '💎', label: 'Our Values', text: 'Integrity in every transaction. Quality without compromise. Customer success as our measure. Genuine products always. No grey market, no shortcuts.' },
          ].map((c, i) => (
            <motion.div key={c.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '32px 26px', position: 'relative', overflow: 'hidden', transition: 'all .4s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,180,0,.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>{c.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--gold)', marginBottom: 12, letterSpacing: '.06em' }}>{c.label}</div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{c.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ marginBottom: 72, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
          {[
            { n: '25+', l: 'Years in Business' }, { n: '11+', l: 'Brand Partners' },
            { n: '500+', l: 'Business Clients' }, { n: '100%', l: 'Genuine Products' },
            { n: 'ISO', l: 'Quality Standards' }, { n: '24/7', l: 'Technical Support' },
          ].map((s, i) => (
            <motion.div key={s.l}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '28px 20px', textAlign: 'center', transition: 'all .4s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,180,0,.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
            >
              <GradientText style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 900, display: 'block', marginBottom: 6 }}>{s.n}</GradientText>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '.1em' }}>{s.l}</div>
            </motion.div>
          ))}
        </div>

        {/* Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'start', marginBottom: 72 }}>
          <div>
            <SectionLabel text="Company Overview" />
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionTitle><GradientText>Seven Eyes</GradientText> Distribution</SectionTitle>
            </motion.div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: 18, marginBottom: 18, fontSize: 15 }}>
              Seven Eyes Distribution is a leading provider of Snap-on, Eastman, Stanley, Norton, Mirka, Henkel, Sika and many more company. We bridge a gap between high quality procurement and long-term operational excellence through our dedicated sales and service teams.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>
              Our Sales Division covers the full range of automotive and industrial tools — from hand tools and power tools to hydraulic equipment, pneumatic systems, and specialized machinery. Our Service Division provides technical support, on-site repairs, warranty management and user training.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/products" className="btn-gold" style={{ fontSize: 12 }}>View Products</Link>
              <Link to="/contact" className="btn-outline" style={{ fontSize: 12 }}>Contact Us</Link>
            </div>
          </div>

          {/* Timeline */}
          <div>
            {TIMELINE.map((t, i) => (
              <motion.div key={t.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ position: 'relative', paddingLeft: 52, paddingBottom: i < TIMELINE.length - 1 ? 32 : 0 }}
              >
                {/* Connector line */}
                {i < TIMELINE.length - 1 && (
                  <div style={{ position: 'absolute', left: 18, top: 32, bottom: 0, width: 1, background: 'linear-gradient(to bottom, rgba(255,180,0,0.3), transparent)' }} />
                )}
                {/* Year dot */}
                <div style={{ position: 'absolute', left: 0, top: 4, width: 36, height: 36, background: 'rgba(255,180,0,.1)', border: '2px solid rgba(255,180,0,.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', transition: 'all .3s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#050709'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,180,0,.1)'; e.currentTarget.style.color = 'var(--gold)'; }}>
                  {t.year.slice(2)}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: '.1em', marginBottom: 3 }}>{t.year}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 5 }}>{t.t}</div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{t.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Address card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ background: 'var(--bg2)', border: '1px solid var(--border-gold)', padding: '36px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--gold)', letterSpacing: '.06em', marginBottom: 14 }}>📍 OUR OFFICE</div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              51, Nath Gajanan Apartment,<br />
              Opp. Sony Showroom,<br />
              Near Chandrashekhar Azad Square,<br />
              C.A. Road, Nagpur-440032<br />
              Maharashtra (India)
            </p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--gold)', letterSpacing: '.06em', marginBottom: 14 }}>📞 CONTACT</div>
            {['+91-7888246020', '+91-9922923373', '+91-9823894019'].map(p => (
              <a key={p} href={`tel:${p}`} style={{ display: 'block', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', lineHeight: 1.9, transition: 'color .3s' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>{p}</a>
            ))}
            <a href="mailto:seveneyesdis@gmail.com" style={{ display: 'block', marginTop: 6, fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color .3s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>seveneyesdis@gmail.com</a>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--gold)', letterSpacing: '.06em', marginBottom: 14 }}>🏢 LEGAL</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75 }}>
              <div style={{ marginBottom: 6 }}><span style={{ color: 'var(--text-secondary)' }}>GST:</span> 27AHOPG8728Q1ZD</div>
              <div><span style={{ color: 'var(--text-secondary)' }}>Region:</span> Maharashtra (India)</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
