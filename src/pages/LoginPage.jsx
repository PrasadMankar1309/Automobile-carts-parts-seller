import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gear } from '../components/UI';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      // Admin login
      if (form.email === 'admin@seveneyes.com' && form.password === 'admin123') {
        navigate('/admin');
        return;
      }
      // Demo user login
      if (form.email && form.password.length >= 6) {
        navigate('/');
        return;
      }
      setError('Invalid credentials. Try admin@seveneyes.com / admin123');
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* BG */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.18) saturate(0.4)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(5,7,9,0.9) 0%, rgba(8,13,20,0.7) 100%)' }} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      {/* Gears */}
      <div style={{ position: 'absolute', right: '5%', top: '5%', opacity: 0.06 }}>
        <Gear size={260} style={{ animation: 'spinGear 20s linear infinite' }} />
      </div>
      <div style={{ position: 'absolute', left: '3%', bottom: '8%', opacity: 0.05 }}>
        <Gear size={180} style={{ animation: 'spinGearR 15s linear infinite' }} />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass"
        style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 420, margin: '20px', padding: '40px 36px' }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, background: 'linear-gradient(135deg, #FFB400, #FF6B00)', clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)', marginBottom: 14, animation: 'glowPulse 3s infinite' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, color: '#050709' }}>7</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, letterSpacing: '.1em', color: '#fff', marginBottom: 4 }}>SEVEN EYES</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.2em', color: 'var(--gold)' }}>DISTRIBUTION · NAGPUR</div>
        </div>

        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, letterSpacing: '.06em', marginBottom: 6, textAlign: 'center' }}>SIGN IN</div>
        <div style={{ width: 40, height: 2, background: 'var(--gold)', margin: '0 auto 28px' }} />

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'rgba(232,48,42,.12)', border: '1px solid rgba(232,48,42,.3)', padding: '10px 14px', marginBottom: 20, color: '#fca5a5', fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.5 }}>
            ⚠️ {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.14em', display: 'block', marginBottom: 6 }}>EMAIL ADDRESS</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              className="form-input"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.14em', display: 'block', marginBottom: 6 }}>PASSWORD</label>
            <div style={{ position: 'relative' }}>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                className="form-input"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                style={{ paddingRight: 44 }}
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16 }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            className="btn-gold"
            whileTap={{ scale: 0.97 }}
            style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '14px', marginTop: 6, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? '⏳ Signing In...' : '🔐 SIGN IN'}
          </motion.button>
        </form>

        <div style={{ marginTop: 24, padding: '16px', background: 'rgba(255,180,0,.06)', border: '1px solid rgba(255,180,0,.15)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,180,0,.6)', letterSpacing: '.08em', marginBottom: 6 }}>DEMO CREDENTIALS:</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Admin: admin@seveneyes.com / admin123<br />
            User: any@email.com / anypassword (6+ chars)
          </div>
        </div>

        <div style={{ marginTop: 20, textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color .3s' }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>← Back to Site</Link>
          <Link to="/admin" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,180,0,.5)', textDecoration: 'none', transition: 'color .3s' }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,180,0,.5)'}>Admin Dashboard →</Link>
        </div>
      </motion.div>
    </div>
  );
}
