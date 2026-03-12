import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel, SectionTitle, GradientText } from '../components/UI';
import { CONTACT, PRODUCT_CATEGORIES } from '../data';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', category: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const up = k => e => setForm({ ...form, [k]: e.target.value });

  const submit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', company: '', email: '', phone: '', category: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }, 1200);
  };

  return (
    <div style={{ paddingTop: 110 }}>
      {/* Header */}
      <div style={{ background: 'var(--bg1)', padding: '52px 0 44px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'relative', maxWidth: 1300, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.2em', color: 'var(--gold)', marginBottom: 12 }}>// GET IN TOUCH</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,58px)', fontWeight: 900 }}>
            Let's Build Something <GradientText>Together</GradientText>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, maxWidth: 500, fontSize: 15 }}>
            Contact Seven Eyes Distribution for pricing, bulk orders, product sourcing or technical support.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '60px 28px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 52 }}>
          {/* Left: Contact info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            {/* Phones */}
            {[
              { icon: '📞', label: 'Call Us', values: CONTACT.phones },
              { icon: '✉', label: 'Email Us', values: [CONTACT.email] },
              { icon: '📍', label: 'Visit Us', values: [CONTACT.address] },
              { icon: '🕐', label: 'Hours', values: ['Mon–Sat: 09:00 AM – 07:00 PM', 'Sunday: Closed'] },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                <div style={{ width: 46, height: 46, background: 'rgba(255,180,0,.08)', border: '1px solid rgba(255,180,0,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '.12em', marginBottom: 4 }}>{c.label.toUpperCase()}</div>
                  {c.values.map(v => (
                    <div key={v} style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{v}</div>
                  ))}
                </div>
              </div>
            ))}

            {/* GST */}
            <div style={{ marginTop: 18, padding: '12px 16px', background: 'rgba(255,180,0,.06)', border: '1px solid rgba(255,180,0,.15)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '.1em', marginBottom: 4 }}>GST NUMBER</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--gold)' }}>{CONTACT.gst}</div>
            </div>

            {/* Map placeholder */}
            <div style={{ marginTop: 24, height: 200, background: 'var(--bg2)', border: '1px solid rgba(255,180,0,.12)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
              <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                style={{ position: 'relative', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,180,0,.15)', border: '2px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📍</motion.div>
              <div style={{ position: 'relative', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '.1em', textAlign: 'center', padding: '0 20px' }}>C.A. ROAD, NAGPUR-440032<br /><span style={{ color: 'rgba(255,180,0,.4)', fontSize: 10 }}>Opp. Sony Showroom</span></div>
            </div>

            {/* Quick contact buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
              <a href="tel:+917888246020" className="btn-gold" style={{ justifyContent: 'center', fontSize: 13 }}>📞 Call: +91-7888246020</a>
              <a href={`https://wa.me/917888246020`} className="btn-outline" style={{ justifyContent: 'center', fontSize: 13, borderColor: 'rgba(34,197,94,0.4)', color: '#22C55E' }} target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
              <a href={`mailto:${CONTACT.email}`} className="btn-outline" style={{ justifyContent: 'center', fontSize: 13 }}>✉ {CONTACT.email}</a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: 36 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, letterSpacing: '.04em', marginBottom: 6 }}>REQUEST A QUOTE</div>
              <div style={{ width: 40, height: 2, background: 'var(--gold)', marginBottom: 24 }} />

              {sent && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.3)', padding: '12px 16px', marginBottom: 20, color: '#86efac', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.06em' }}>
                  ✓ MESSAGE SENT — WE'LL RESPOND WITHIN 24 HOURS
                </motion.div>
              )}

              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.12em', display: 'block', marginBottom: 5 }}>FULL NAME *</label>
                    <input className="form-input" placeholder="Your full name" value={form.name} onChange={up('name')} required />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.12em', display: 'block', marginBottom: 5 }}>COMPANY</label>
                    <input className="form-input" placeholder="Company name" value={form.company} onChange={up('company')} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.12em', display: 'block', marginBottom: 5 }}>EMAIL *</label>
                    <input className="form-input" type="email" placeholder="Email address" value={form.email} onChange={up('email')} required />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.12em', display: 'block', marginBottom: 5 }}>PHONE</label>
                    <input className="form-input" placeholder="+91-XXXXXXXXXX" value={form.phone} onChange={up('phone')} />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.12em', display: 'block', marginBottom: 5 }}>PRODUCT CATEGORY</label>
                  <select className="form-input" value={form.category} onChange={up('category')}>
                    <option value="" disabled>Select category of interest</option>
                    {PRODUCT_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.12em', display: 'block', marginBottom: 5 }}>MESSAGE *</label>
                  <textarea className="form-input" placeholder="Describe your requirements, quantities, specific products..." value={form.message} onChange={up('message')} required rows={5} style={{ resize: 'vertical', minHeight: 110 }} />
                </div>

                <motion.button type="submit" className="btn-gold" whileTap={{ scale: 0.97 }}
                  style={{ fontSize: 13, justifyContent: 'center', width: '100%', padding: '15px', opacity: loading ? 0.7 : 1 }}
                  disabled={loading}>
                  {loading ? '⏳ Sending...' : '📋 SEND INQUIRY →'}
                </motion.button>

                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '.06em', textAlign: 'center' }}>
                  YOUR DATA IS SECURE. WE NEVER SHARE CLIENT INFORMATION.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
