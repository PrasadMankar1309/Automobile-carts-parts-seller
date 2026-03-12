import { Link } from 'react-router-dom';
import { CONTACT } from '../data';

export default function Footer() {
  return (
    <footer style={{ background: '#020406', borderTop: '1px solid rgba(255,180,0,0.1)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '60px 28px 36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #FFB400, #FF6B00)', clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, color: '#050709' }}>7</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, letterSpacing: '.1em', color: '#fff' }}>SEVEN EYES</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.18em', color: 'var(--gold)' }}>DISTRIBUTION</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(200,210,230,.3)', lineHeight: 1.7, marginBottom: 16 }}>
            Leading distributor of Snap-on, Stanley, Eastman, Norton, Mirka, Henkel, Sika and more. Nagpur, Maharashtra.
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,180,0,.35)', letterSpacing: '.08em' }}>
            GST: {CONTACT.gst}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            {['FB', 'IG', 'LI', 'YT'].map(s => (
              <button key={s} style={{ width: 32, height: 32, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', color: 'rgba(200,210,230,.3)', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer', transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,180,0,.1)'; e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.04)'; e.currentTarget.style.color = 'rgba(200,210,230,.3)'; }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, letterSpacing: '.14em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 18 }}>Products</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {['Hand Tools', 'Power Tools', 'Special Tools', 'Hydraulic Tools', 'Pneumatic Tools', 'Machines & Equipment'].map(l => (
              <li key={l}><Link to="/products" style={{ fontSize: 13, color: 'rgba(200,210,230,.3)', textDecoration: 'none', transition: 'color .3s', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'rgba(200,210,230,.3)'}>{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, letterSpacing: '.14em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 18 }}>Company</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[['About Us', '/about'], ['Our Brands', '/brands'], ['Services', '/services'], ['Contact', '/contact'], ['Admin', '/admin']].map(([l, p]) => (
              <li key={l}><Link to={p} style={{ fontSize: 13, color: 'rgba(200,210,230,.3)', textDecoration: 'none', transition: 'color .3s', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'rgba(200,210,230,.3)'}>{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, letterSpacing: '.14em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 18 }}>Contact</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,180,0,.4)', letterSpacing: '.1em', marginBottom: 3 }}>PHONES</div>
              {CONTACT.phones.map(p => (
                <a key={p} href={`tel:${p}`} style={{ display: 'block', fontSize: 13, color: 'rgba(200,210,230,.4)', textDecoration: 'none', lineHeight: 1.8, transition: 'color .3s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(200,210,230,.4)'}>{p}</a>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,180,0,.4)', letterSpacing: '.1em', marginBottom: 3 }}>EMAIL</div>
              <a href={`mailto:${CONTACT.email}`} style={{ fontSize: 13, color: 'rgba(200,210,230,.4)', textDecoration: 'none', transition: 'color .3s' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'rgba(200,210,230,.4)'}>{CONTACT.email}</a>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,180,0,.4)', letterSpacing: '.1em', marginBottom: 3 }}>ADDRESS</div>
              <p style={{ fontSize: 12, color: 'rgba(200,210,230,.3)', lineHeight: 1.6 }}>{CONTACT.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.04)', padding: '16px 28px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, maxWidth: 1300, margin: '0 auto' }}>
        <p style={{ fontSize: 11, color: 'rgba(200,210,230,.2)', fontFamily: 'var(--font-mono)', letterSpacing: '.05em' }}>© 2025 SEVEN EYES DISTRIBUTION. ALL RIGHTS RESERVED. NAGPUR, MAHARASHTRA.</p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy Policy', 'Terms of Use'].map(t => (
            <span key={t} style={{ fontSize: 11, color: 'rgba(200,210,230,.2)', fontFamily: 'var(--font-mono)', letterSpacing: '.06em', cursor: 'pointer', transition: 'color .3s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'rgba(200,210,230,.2)'}>{t}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
