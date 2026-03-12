import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GradientText } from '../components/UI';
import { useProducts } from '../context/ProductsContext';
import { PRODUCT_CATEGORIES } from '../data';

export default function AdminPage() {
  const { products, addProduct } = useProducts();
  const [form, setForm] = useState({ title: '', cat: '', desc: '', img: '', brand: '' });
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('products'); // products | add
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  const up = k => e => setForm({ ...form, [k]: e.target.value });

  const handleAdd = e => {
    e.preventDefault();
    addProduct(form);
    setSuccess(true);
    setForm({ title: '', cat: '', desc: '', img: '', brand: '' });
    setTimeout(() => setSuccess(false), 3000);
    setActiveTab('products');
  };

  const filteredProducts = products.filter(p => {
    const matchCat = filterCat === 'All' || p.cat === filterCat;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const stats = [
    { icon: '📦', label: 'Total Products', val: products.length, color: '#FFB400' },
    { icon: '🏷️', label: 'Categories', val: PRODUCT_CATEGORIES.length - 1, color: '#00D4FF' },
    { icon: '🏆', label: 'Brand Partners', val: 11, color: '#22C55E' },
    { icon: '👥', label: 'Clients', val: '500+', color: '#A855F7' },
  ];

  return (
    <div style={{ paddingTop: 90, minHeight: '100vh', background: 'var(--bg0)' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg1)', borderBottom: '1px solid rgba(255,180,0,.15)', padding: '24px 0' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--gold)', marginBottom: 6 }}>// ADMIN DASHBOARD</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,32px)', fontWeight: 800 }}>
              <GradientText>Seven Eyes</GradientText> Admin Panel
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,180,0,.5)', background: 'rgba(255,180,0,.06)', border: '1px solid rgba(255,180,0,.15)', padding: '6px 12px' }}>
              🟢 ADMIN SESSION ACTIVE
            </div>
            <Link to="/" className="btn-outline" style={{ fontSize: 11, padding: '8px 16px' }}>← Back to Site</Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '32px 28px 80px' }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, marginBottom: 36 }}>
          {stats.map(s => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '22px 20px', position: 'relative', overflow: 'hidden', transition: 'all .4s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '50'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, background: `radial-gradient(circle at top right,${s.color}15,transparent)` }} />
              <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '.1em' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 28, borderBottom: '1px solid var(--border)' }}>
          {[['📋', 'products', 'Manage Products'], ['➕', 'add', 'Add New Product']].map(([icon, tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                background: 'none', border: 'none', padding: '12px 24px', cursor: 'pointer',
                fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, letterSpacing: '.06em',
                color: activeTab === tab ? 'var(--gold)' : 'var(--text-muted)',
                borderBottom: activeTab === tab ? '2px solid var(--gold)' : '2px solid transparent',
                marginBottom: -1, transition: 'all .3s',
              }}>
              {icon} {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Products Tab ── */}
          {activeTab === 'products' && (
            <motion.div key="products" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {success && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.3)', padding: '12px 16px', marginBottom: 20, color: '#86efac', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  ✓ PRODUCT ADDED SUCCESSFULLY — VISIBLE ON PRODUCTS PAGE
                </motion.div>
              )}

              {/* Search + filter */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 22, flexWrap: 'wrap' }}>
                <input className="form-input" placeholder="🔍 Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
                <select className="form-input" value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ minWidth: 180 }}>
                  {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 14 }}>
                SHOWING {filteredProducts.length} OF {products.length} PRODUCTS
              </div>

              {/* Product list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filteredProducts.map((p, i) => (
                  <motion.div key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i, 20) * 0.03 }}
                    style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'var(--bg2)', border: '1px solid var(--border)', padding: '14px 18px', transition: 'all .3s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,180,0,.25)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    {/* Thumb */}
                    <div style={{ width: 64, height: 64, flexShrink: 0, overflow: 'hidden', background: 'var(--bg3)' }}>
                      <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }}
                        onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;height:100%;font-size:28px">🔧</span>`; }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3, flexWrap: 'wrap' }}>
                        <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{p.title}</h3>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, background: p.color, color: '#050709', padding: '2px 7px' }}>{p.tag}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>📂 {p.cat}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,180,0,.5)' }}>🏷️ {p.brand || 'N/A'}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(200,210,230,.3)' }}>ID: {p.id}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button className="btn-outline" style={{ fontSize: 11, padding: '6px 14px' }} onClick={() => setActiveTab('add')}>Edit</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Add Product Tab ── */}
          {activeTab === 'add' && (
            <motion.div key="add" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 36 }}>
              {/* Form */}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border-gold)', padding: 32 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, letterSpacing: '.04em', marginBottom: 6 }}>ADD NEW PRODUCT</div>
                <div style={{ width: 36, height: 2, background: 'var(--gold)', marginBottom: 24 }} />

                <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.12em', display: 'block', marginBottom: 5 }}>PRODUCT NAME *</label>
                    <input className="form-input" placeholder="e.g. Professional Torque Wrench 1/2 inch Drive" value={form.title} onChange={up('title')} required />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.12em', display: 'block', marginBottom: 5 }}>CATEGORY *</label>
                    <select className="form-input" value={form.cat} onChange={up('cat')} required>
                      <option value="" disabled>Select a category</option>
                      {PRODUCT_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.12em', display: 'block', marginBottom: 5 }}>BRAND</label>
                    <input className="form-input" placeholder="e.g. Snap-on / Stanley" value={form.brand} onChange={up('brand')} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.12em', display: 'block', marginBottom: 5 }}>DESCRIPTION</label>
                    <textarea className="form-input" placeholder="Short product description..." value={form.desc} onChange={up('desc')} rows={3} style={{ resize: 'vertical' }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.12em', display: 'block', marginBottom: 5 }}>IMAGE URL</label>
                    <input className="form-input" placeholder="https://images.unsplash.com/..." value={form.img} onChange={up('img')} />
                  </div>

                  {/* Preview */}
                  {form.img && (
                    <div style={{ height: 100, overflow: 'hidden', border: '1px solid rgba(255,180,0,.2)' }}>
                      <img src={form.img} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }}
                        onError={e => e.target.style.display = 'none'} />
                    </div>
                  )}

                  <motion.button type="submit" className="btn-gold" whileTap={{ scale: 0.97 }}
                    style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '14px' }}>
                    ➕ ADD PRODUCT TO CATALOG
                  </motion.button>
                </form>
              </div>

              {/* Instructions */}
              <div>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: 28, marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--gold)', letterSpacing: '.06em', marginBottom: 14 }}>ℹ️ HOW IT WORKS</div>
                  {[
                    'Fill in all required fields marked with *',
                    'Select the correct product category from dropdown',
                    'Add an image URL from Unsplash or your server',
                    'Click Add Product — it appears instantly on the Products page',
                    'New products are marked with "NEW" tag automatically',
                    'State resets on page refresh (no backend connected)',
                  ].map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,.04)', fontSize: 13, color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--gold)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 11 }}>0{i + 1}</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: 'rgba(255,180,0,.06)', border: '1px solid rgba(255,180,0,.2)', padding: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '.1em', marginBottom: 8 }}>📸 SAMPLE IMAGE URL</div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 10 }}>Use any Unsplash URL:</p>
                  <code style={{ fontSize: 11, color: 'rgba(255,180,0,.6)', background: 'rgba(0,0,0,.3)', padding: '6px 10px', display: 'block', lineHeight: 1.6, wordBreak: 'break-all', fontFamily: 'var(--font-mono)' }}>
                    https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80
                  </code>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
