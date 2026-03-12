import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SectionLabel, SectionTitle, GradientText, Gear, Stars } from '../components/UI';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { SERVICES, BRANDS, TESTIMONIALS } from '../data';

// Stat counter
function StatNum({ target, suffix, label, trigger }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const dur = 1800;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = setTimeout(() => requestAnimationFrame(step), 200);
    return () => clearTimeout(id);
  }, [trigger, target]);
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,46px)', fontWeight: 900, lineHeight: 1 }}>
        <GradientText>{n}{suffix}</GradientText>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '.14em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
    </div>
  );
}

// Product card for home page
function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
          <img
            src={product.img}
            alt={product.title}
            className="card-img"
            style={{ height: '100%' }}
            onError={e => { e.target.src = `https://placehold.co/600x400/0c1420/FFB400?text=${encodeURIComponent(product.cat)}`; }}
          />
          <div className="card-overlay" />
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(5,7,9,0.85)', border: `1px solid ${product.color}60`, padding: '3px 10px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: product.color, zIndex: 2 }}>
            {product.cat}
          </div>
          <div style={{ position: 'absolute', top: 12, right: 12, background: product.color, padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#050709', fontWeight: 700, zIndex: 2 }}>
            {product.tag}
          </div>
        </div>

        <div style={{ padding: '16px 18px 18px' }}>
          <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '.01em' }}>{product.title}</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.desc}</p>

          <motion.button
            className="cart-btn btn-gold"
            onClick={handleAdd}
            whileTap={{ scale: 0.96 }}
            style={{ width: '100%', justifyContent: 'center', fontSize: 12, padding: '11px 20px', background: added ? 'linear-gradient(135deg,#22C55E,#16a34a)' : undefined }}
          >
            {added ? '✓ Added' : '🛒 Add Cart'}
          </motion.button>
        </div>
      </Link>
      <div className="hover-line" />
    </motion.div>
  );
}
function RecentlyViewedRow() {
  const { recentlyViewed } = useCart();
  if (!recentlyViewed.length) return null;
  return (
    <section style={{ padding: '60px 0', background: 'var(--bg1)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 30 }}>
          <div>
            <SectionLabel text="Your History" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800 }}>Recently <GradientText>Viewed</GradientText></h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 15 }}>
          {recentlyViewed.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const [statsOn, setStatsOn] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const { products } = useProducts();
  const { recentlyViewed } = useCart();

  // Stats observer
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Mouse glow for hero
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const tickerItems = ['SNAP-ON TOOLS', 'STANLEY', 'NORTON ABRASIVES', 'MIRKA SANDING', 'HENKEL ADHESIVES', 'SIKA', 'EASTMAN', 'BOSCH', 'FORCE', 'DE NEERS', 'TAPARIA'];

  return (
    <div>
      {/* ── HERO ── */}
      <section ref={heroRef} onMouseMove={handleMouseMove}
        style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        {/* Parallax BG image */}
        <motion.div
          style={{
            position: 'absolute', inset: '-20%', y: yParallax,
            backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'brightness(0.25) saturate(0.5)',
          }}
        />

        {/* Grid overlay */}
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(140deg, rgba(5,7,9,0.92) 0%, rgba(8,13,20,0.7) 50%, rgba(5,7,9,0.85) 100%)' }} />

        {/* Mouse glow effect */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,180,0,0.06), transparent 50%)`,
          transition: 'background 0.1s',
        }} />

        {/* Gear decorations */}
        <div style={{ position: 'absolute', right: '3%', top: '8%', opacity: 0.08 }}>
          <Gear size={280} style={{ animation: 'spinGear 25s linear infinite' }} />
        </div>
        <div style={{ position: 'absolute', right: '22%', bottom: '5%', opacity: 0.05 }}>
          <Gear size={160} style={{ animation: 'spinGearR 18s linear infinite' }} />
        </div>
        <div style={{ position: 'absolute', left: '-3%', bottom: '20%', opacity: 0.04 }}>
          <Gear size={200} style={{ animation: 'spinGear 32s linear infinite' }} />
        </div>

        {/* Gold vertical accent */}
        <div style={{ position: 'absolute', left: 0, top: '15%', width: 3, height: '60%', background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)', boxShadow: '0 0 20px rgba(255,180,0,0.4)' }} />

        {/* Content */}
        <motion.div style={{ opacity, position: 'relative', zIndex: 2, maxWidth: 1300, margin: '0 auto', padding: '120px 28px 80px', width: '100%' }}>

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.25)', padding: '6px 16px', marginBottom: 28 }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', animation: 'blink 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--gold)' }}>NAGPUR'S #1 INDUSTRIAL TOOL DISTRIBUTOR</span>
          </motion.div>

          {/* Headline */}
          <div style={{ overflow: 'hidden' }}>
            {['POWERING', 'WORKSHOPS', 'WITH PREMIUM', 'TOOLS'].map((word, i) => (
              <motion.div
                key={word}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {i === 1 ? (
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,8vw,100px)', fontWeight: 900, lineHeight: 0.92, marginBottom: 4 }}>
                    <GradientText>WORKSHOPS</GradientText>
                  </div>
                ) : (
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,8vw,100px)', fontWeight: 900, lineHeight: 0.92, color: i === 3 ? 'rgba(255,255,255,0.15)' : '#fff', WebkitTextStroke: i === 3 ? '2px rgba(255,255,255,0.15)' : 'none', marginBottom: 4 }}>
                    {word}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{ maxWidth: 540, marginTop: 28, marginBottom: 38, fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}
          >
            Authorized distributor of <strong style={{ color: 'var(--gold)' }}>Snap-on, Stanley, Eastman, Norton, Mirka, Henkel & Sika</strong>. Professional tools, hydraulic equipment, pneumatic systems and industrial consumables — Nagpur, Maharashtra.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 64 }}
          >
            <Link to="/products" className="btn-gold" style={{ fontSize: 13 }}>Explore Products →</Link>
            <Link to="/contact" className="btn-outline" style={{ fontSize: 13 }}>Request Catalog</Link>
            <Link to="/brands" className="btn-outline" style={{ fontSize: 13, borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}>Our Brands</Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 24, borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 36, maxWidth: 700 }}
          >
            <StatNum target={25} suffix="+" label="Years Experience" trigger={statsOn} />
            <StatNum target={11} suffix="+" label="Premium Brands" trigger={statsOn} />
            <StatNum target={1000} suffix="+" label="Products" trigger={statsOn} />
            <StatNum target={500} suffix="+" label="Happy Clients" trigger={statsOn} />
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, transparent, var(--bg0))' }} />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.2em', color: 'var(--text-muted)' }}>SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: 1, height: 30, background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background: 'linear-gradient(90deg, #FFB400, #FF8C00)', overflow: 'hidden', padding: '11px 0' }}>
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '.14em', color: '#050709', display: 'inline-flex', alignItems: 'center', gap: 60 }}>
              {t}
              <span style={{ width: 5, height: 5, background: 'rgba(5,7,9,0.4)', borderRadius: '50%', display: 'inline-block' }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── QUICK ABOUT ── */}
      <section style={{ padding: '90px 0', background: 'var(--bg1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)', opacity: 0.03 }}>
          <Gear size={480} style={{ animation: 'spinGearR 40s linear infinite' }} />
        </div>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 72, alignItems: 'center' }}>
            <div>
              <SectionLabel text="Who We Are" />
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <SectionTitle><GradientText>Built On Trust.</GradientText><br />Driven By Quality.</SectionTitle>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: 18, marginBottom: 22, fontSize: 15 }}>
                Seven Eyes Distribution bridges the gap between high-quality procurement and long-term operational excellence through dedicated sales and service teams. We are the authorized distributor of Snap-on, Eastman, Stanley, Norton, Mirka, Henkel, Sika and many more leading brands.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
                style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
                {['Authorized Dealer', 'GST Registered', 'Nagpur Based'].map(t => (
                  <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.2)', padding: '5px 12px', fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, color: 'var(--gold)', letterSpacing: '.06em' }}>✓ {t}</span>
                ))}
              </motion.div>
              <Link to="/about" className="btn-gold" style={{ fontSize: 12 }}>Our Full Story →</Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { icon: '🏭', t: 'B2B Specialist', s: 'Dedicated sales for workshops & factories' },
                { icon: '🔩', t: '11+ Brand Partners', s: 'Snap-on, Stanley, Norton & more' },
                { icon: '📦', t: 'Fast Delivery', s: 'Nagpur & Maharashtra-wide supply' },
                { icon: '🛡️', t: 'Genuine Products', s: 'Authorized & certified products only' },
              ].map((c, i) => (
                <motion.div key={c.t}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '22px 18px', transition: 'all .4s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,180,0,.3)'; e.currentTarget.style.background = 'rgba(255,180,0,.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg2)'; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 5 }}>{c.t}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{c.s}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ padding: '90px 0', background: 'var(--bg0)', position: 'relative' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div style={{ position: 'relative', maxWidth: 1300, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionLabel text="Our Products" />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionTitle><GradientText>Featured</GradientText> Products</SectionTitle>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
              style={{ color: 'var(--text-secondary)', marginTop: 14, maxWidth: 460, margin: '14px auto 0', fontSize: 15 }}>
              Professional-grade tools from authorized brands. Click "Add to Inquiry" to request a quote.
            </motion.p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 18 }}>
            {products.slice(0, 8).map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: 44 }}>
            <Link to="/products" className="btn-gold" style={{ fontSize: 13 }}>View All Products →</Link>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section style={{ padding: '90px 0', background: 'var(--bg1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: -80, bottom: -80, opacity: 0.03 }}>
          <Gear size={380} style={{ animation: 'spinGear 35s linear infinite' }} />
        </div>
        <div style={{ position: 'relative', maxWidth: 1300, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionLabel text="Services" />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionTitle>More Than <GradientText>Just Distribution</GradientText></SectionTitle>
            </motion.div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {SERVICES.slice(0, 4).map((s, i) => (
              <motion.div key={s.title} className="service-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span style={{ fontSize: 32, marginBottom: 18, display: 'block', transition: 'transform .4s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.2) rotate(-8deg)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1) rotate(0deg)'}>{s.icon}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 17, color: 'var(--text-primary)' }}>{s.title}</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', background: 'rgba(255,180,0,.1)', padding: '3px 8px', border: '1px solid rgba(255,180,0,.2)' }}>{s.stat}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/services" className="btn-outline" style={{ fontSize: 12 }}>View All Services →</Link>
          </div>
        </div>
      </section>

      {/* ── BRANDS STRIP ── */}
      <section style={{ padding: '72px 0', background: 'var(--bg0)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <SectionLabel text="Our Brand Partners" />
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionTitle>Authorized By The <GradientText>World's Best</GradientText></SectionTitle>
            </motion.div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
            {BRANDS.map((b, i) => (
              <motion.div key={b.name} className="brand-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.07 }}
              >
                <div style={{ fontSize: 24 }}>{b.logo}</div>
                <div className="brand-name" style={{ fontSize: 15 }}>{b.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(200,210,230,.22)', letterSpacing: '.08em' }}>{b.tag}</div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/brands" className="btn-outline" style={{ fontSize: 12 }}>View All Brands →</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '90px 0', background: 'var(--bg1)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SectionLabel text="Client Reviews" />
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionTitle>What Our <GradientText>Clients Say</GradientText></SectionTitle>
            </motion.div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '30px 26px', position: 'relative', transition: 'all .4s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,180,0,.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ position: 'absolute', top: 10, left: 20, fontFamily: 'var(--font-display)', fontSize: 72, lineHeight: 1, color: 'rgba(255,180,0,.07)', pointerEvents: 'none' }}>"</div>
                <Stars n={t.rating} />
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, margin: '14px 0 18px', fontSize: 14, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,var(--gold),#FF8C00)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: '#050709' }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{t.name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '.06em' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENTLY VIEWED ── */}
      <RecentlyViewedRow />

      {/* ── CTA STRIP ── */}
      <section style={{ padding: '72px 0', background: 'linear-gradient(135deg, #0a1020, var(--bg0))', borderTop: '1px solid rgba(255,180,0,.12)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse,rgba(255,180,0,0.04) 0%,transparent 70%)' }} />
        <div style={{ position: 'relative', maxWidth: 1300, margin: '0 auto', padding: '0 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 28 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,38px)', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
              READY TO ORDER QUALITY TOOLS?
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Contact us for pricing, bulk orders and custom procurement.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-gold" style={{ fontSize: 13 }}>Get a Quote →</Link>
            <a href="tel:+917888246020" className="btn-outline" style={{ fontSize: 13 }}>📞 Call Now</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
