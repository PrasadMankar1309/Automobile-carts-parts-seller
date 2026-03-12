import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen, wishlist } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'Anand', role: 'customer' }); // Mock user

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Services', path: '/services' },
    { label: 'Brands', path: '/brands' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled ? 'rgba(5,7,9,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,180,0,0.12)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Top info bar */}
        <div className="hide-mobile" style={{ background: 'linear-gradient(90deg, #FFB400, #FF8C00)', padding: '5px 0' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 24 }}>
              {['+91-7888246020', '+91-9922923373'].map(p => (
                <a key={p} href={`tel:${p}`} style={{ fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, color: '#050709', letterSpacing: '.06em', textDecoration: 'none' }}>📞 {p}</a>
              ))}
              <a href="mailto:seveneyesdis@gmail.com" style={{ fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, color: '#050709', letterSpacing: '.06em', textDecoration: 'none' }}>
                ✉ seveneyesdis@gmail.com
              </a>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#050709', letterSpacing: '.1em' }}>
              GST: 27AHOPG8728Q1ZD · NAGPUR, MAHARASHTRA
            </span>
          </div>
        </div>

        {/* Main bar */}
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              style={{
                width: 46, height: 46,
                background: 'linear-gradient(135deg, #FFB400, #FF6B00)',
                clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, color: '#050709',
                animation: 'glowPulse 3s ease-in-out infinite',
              }}
            >7</motion.div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, letterSpacing: '.1em', color: '#fff', lineHeight: 1 }}>SEVEN EYES</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.2em', color: 'var(--gold)' }}>DISTRIBUTION · NAGPUR</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hide-mobile" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {navItems.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={path === '/'}
              >{label}</NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              style={{
                position: 'relative', background: 'rgba(255,180,0,0.05)',
                border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-secondary)',
                width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 18, transition: 'all .3s',
              }}
            >
              ♡
              {wishlist.length > 0 && <span style={{ position: 'absolute', top: 10, right: 10, width: 6, height: 6, background: 'var(--gold)', borderRadius: '50%' }} />}
            </motion.button>

            {/* Cart button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              style={{
                position: 'relative', background: 'rgba(255,180,0,0.1)',
                border: '1px solid rgba(255,180,0,0.25)', color: 'var(--gold)',
                width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 18, transition: 'all .3s',
              }}
            >
              🛒
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    style={{
                      position: 'absolute', top: -6, right: -6,
                      background: 'var(--red)', color: '#fff',
                      borderRadius: '50%', width: 20, height: 20,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                    }}
                  >{totalItems}</motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* User Profile / Dashboard */}
            <div className="hide-mobile" style={{ marginLeft: 5 }}>
              <Link to={user.role === 'admin' ? '/admin' : user.role === 'dealer' ? '/dealer-dashboard' : '/dashboard'}
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg2)', border: '1px solid var(--border)', padding: '6px 15px', borderRadius: 4 }}>
                <div style={{ width: 24, height: 24, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#000' }}>
                  {user.name[0]}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)' }}>
                  MY DASHBOARD
                </div>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button className="hide-desktop" onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 22 }}>
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(5,7,9,0.98)', backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
            }}
          >
            {navItems.map(({ label, path }, i) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <NavLink to={path} className="nav-link" style={{ fontSize: 22 }} onClick={() => setMobileOpen(false)}>{label}</NavLink>
              </motion.div>
            ))}
            <Link to="/login" className="btn-outline" onClick={() => setMobileOpen(false)}>Login</Link>
            <Link to="/contact" className="btn-gold" onClick={() => setMobileOpen(false)}>Get a Quote</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
