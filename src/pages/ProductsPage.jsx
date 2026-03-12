import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionLabel, GradientText } from '../components/UI';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { PRODUCT_CATEGORIES } from '../data';

function ProductCard({ product, view, onQuickView }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  if (view === 'list') {
    return (
      <motion.div layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        style={{ display: 'flex', gap: 20, alignItems: 'center', background: 'var(--bg2)', border: '1px solid var(--border)', padding: '16px 20px', transition: 'all .4s', cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: 4 }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,180,0,.35)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}
      >
        <Link to={`/products/${product.id}`} style={{ display: 'contents', textDecoration: 'none' }}>
          <div style={{ width: 80, height: 80, flexShrink: 0, overflow: 'hidden', position: 'relative', background: 'var(--bg1)' }}>
            <img src={product.img} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8) saturate(0.8)', transition: 'filter .3s' }}
              onError={e => { e.target.src = `https://placehold.co/80x80/0c1420/FFB400?text=${product.cat[0]}`; }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 5 }}>
              <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>{product.title}</h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, background: product.color, color: '#050709', padding: '2px 7px' }}>{product.tag}</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 6 }}>{product.desc}</p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,180,0,.5)', letterSpacing: '.08em' }}>{product.brand}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>₹{(product.id * 1245).toLocaleString()}</div>
            <button className="btn-gold" style={{ fontSize: 11, padding: '8px 16px' }} onClick={handleAdd}>
              {added ? '✓ Added' : '🛒 Add Cart'}
            </button>
          </div>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: product.color, opacity: 0.6 }} />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div layout className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      style={{ borderRadius: 4 }}
    >
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: 210 }}>
          <img
            src={product.img}
            alt={product.title}
            className="card-img"
            style={{ height: 210, minHeight: 160 }}
            onError={e => { e.target.src = `https://placehold.co/600x400/0c1420/FFB400?text=${encodeURIComponent(product.cat)}`; }}
          />
          <div className="card-overlay" />
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(5,7,9,0.88)', border: `1px solid ${product.color}55`, padding: '3px 9px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: product.color, zIndex: 2 }}>{product.cat}</div>
          <div style={{ position: 'absolute', top: 12, right: 12, background: product.color, padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#050709', fontWeight: 700, zIndex: 2 }}>{product.tag}</div>

          <div className="quick-view-btn" onClick={handleQuickView} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--gold)', color: '#050709', padding: '10px 20px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 12, letterSpacing: '.1em', opacity: 0, transition: 'all .3s', zIndex: 5 }}>
            QUICK VIEW
          </div>
        </div>

        <div style={{ padding: '16px 18px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', flex: 1 }}>{product.title}</h3>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, color: 'var(--gold)' }}>₹{(product.id * 1245).toLocaleString()}</div>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.desc}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
            {product.items.slice(0, 3).map(item => (
              <span key={item} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(200,210,230,.4)', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)', padding: '2px 7px' }}>{item}</span>
            ))}
          </div>

          <motion.button className="cart-btn btn-gold" onClick={handleAdd} whileTap={{ scale: 0.96 }}
            style={{ width: '100%', justifyContent: 'center', fontSize: 12, padding: '11px', background: added ? 'linear-gradient(135deg,#22C55E,#16a34a)' : undefined }}>
            {added ? '✓ Added to Cart' : '🛒 Add to Cart'}
          </motion.button>
        </div>
      </Link>
      <div className="hover-line" />
    </motion.div>
  );
}

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeBrand, setActiveBrand] = useState('All');
  const [sort, setSort] = useState('popular');
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { products } = useProducts();

  const brands = useMemo(() => ['All', ...new Set(products.map(p => p.brand).filter(Boolean))], [products]);

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      const matchCat = activeFilter === 'All' || p.cat === activeFilter;
      const matchBrand = activeBrand === 'All' || p.brand === activeBrand;
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchBrand && matchSearch;
    });

    if (sort === 'price-low') result.sort((a, b) => a.id - b.id);
    if (sort === 'price-high') result.sort((a, b) => b.id - a.id);
    if (sort === 'newest') result.sort((a, b) => (a.tag === 'NEW' ? -1 : 1));

    return result;
  }, [products, activeFilter, activeBrand, search, sort]);

  return (
    <div style={{ paddingTop: 110 }}>
      {/* Header */}
      <div style={{ background: 'var(--bg1)', padding: '52px 0 44px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'relative', maxWidth: 1300, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.2em', color: 'var(--gold)', marginBottom: 12 }}>// PRODUCT CATALOG</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,58px)', fontWeight: 900, marginBottom: 12 }}>
            <GradientText>Industrial Tools</GradientText> & Supply
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 480 }}>
            Premium B2B distribution platform for specialized automotive and industrial tools. 100% genuine products with full dealer support.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '36px 28px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40 }}>

          {/* Sidebar Filters */}
          <div className="hide-mobile">
            <div style={{ position: 'sticky', top: 120 }}>
              <div style={{ marginBottom: 30 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, color: 'var(--gold)', letterSpacing: '.1em', marginBottom: 15, borderLeft: '3px solid var(--gold)', paddingLeft: 12 }}>CATEGORIES</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {PRODUCT_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setActiveFilter(cat)}
                      style={{ background: 'none', border: 'none', textAlign: 'left', padding: '10px 12px', color: activeFilter === cat ? 'var(--gold)' : 'var(--text-secondary)', fontSize: 13, cursor: 'pointer', transition: 'all .3s', borderLeft: activeFilter === cat ? '1px solid var(--gold)' : '1px solid transparent' }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 30 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, color: 'var(--gold)', letterSpacing: '.1em', marginBottom: 15, borderLeft: '3px solid var(--gold)', paddingLeft: 12 }}>BRANDS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {brands.map(brand => (
                    <button key={brand} onClick={() => setActiveBrand(brand)}
                      style={{ background: 'none', border: 'none', textAlign: 'left', padding: '8px 12px', color: activeBrand === brand ? 'var(--gold)' : 'var(--text-secondary)', fontSize: 12, cursor: 'pointer', opacity: activeBrand === brand ? 1 : 0.6 }}>
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--bg2)', padding: 20, border: '1px solid var(--border)', borderRadius: 4 }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>NEED HELP?</div>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 15 }}>Speak with our product experts for bulk ordering and technical specs.</p>
                <a href="tel:+917888246020" className="btn-outline" style={{ fontSize: 10, width: '100%', padding: '10px 0', justifyContent: 'center' }}>CALL EXPERT</a>
              </div>
            </div>
          </div>

          {/* Main List */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25, flexWrap: 'wrap', gap: 20 }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 300 }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
                <input className="form-input" placeholder="Search products, brands, part numbers..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 42, background: 'var(--bg1)' }} />
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <select className="form-input" value={sort} onChange={e => setSort(e.target.value)} style={{ width: 160, fontSize: 12, background: 'var(--bg1)' }}>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low–High</option>
                  <option value="price-high">Price: High–Low</option>
                  <option value="newest">New Arrivals</option>
                </select>

                <div style={{ display: 'flex', border: '1px solid var(--border)', background: 'var(--bg1)', borderRadius: 4, overflow: 'hidden' }}>
                  {[['⊞', 'grid'], ['≡', 'list']].map(([icon, v]) => (
                    <button key={v} onClick={() => setView(v)}
                      style={{ width: 42, border: 'none', background: view === v ? 'var(--gold)' : 'transparent', color: view === v ? '#050709' : 'var(--text-muted)', cursor: 'pointer', fontSize: 18, transition: 'all .3s' }}>
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 20, letterSpacing: '.05em' }}>
              SHOWING {filtered.length} RESULTS {activeFilter !== 'All' && `FOR ${activeFilter.toUpperCase()}`}
            </div>

            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)', background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: 4 }}>
                  <div style={{ fontSize: 60, marginBottom: 20 }}>🔍</div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>No matching tools found</div>
                  <p style={{ fontSize: 14, marginTop: 8 }}>Try adjusting your filters or search term.</p>
                  <button className="btn-gold" style={{ marginTop: 25, fontSize: 11 }} onClick={() => { setActiveFilter('All'); setActiveBrand('All'); setSearch(''); }}>RESET ALL FILTERS</button>
                </motion.div>
              ) : (
                <div style={{
                  display: view === 'grid' ? 'grid' : 'flex',
                  flexDirection: view === 'grid' ? undefined : 'column',
                  gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(260px, 1fr))' : undefined,
                  gap: 20
                }}>
                  {filtered.map(p => (
                    <ProductCard key={p.id} product={p} view={view} onQuickView={setQuickViewProduct} />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setQuickViewProduct(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              style={{ position: 'relative', zIndex: 3001, background: 'var(--bg0)', border: '1px solid var(--border-gold)', maxWidth: 900, width: '100%', maxHeight: '90vh', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 0, borderRadius: 4 }}>

              <div style={{ background: 'var(--bg1)', padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={quickViewProduct.img} style={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain' }} />
              </div>

              <div style={{ padding: 40, borderLeft: '1px solid var(--border)' }}>
                <button onClick={() => setQuickViewProduct(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 24, cursor: 'pointer' }}>✕</button>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)', marginBottom: 8 }}>{quickViewProduct.brand}</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, marginBottom: 15 }}>{quickViewProduct.title}</h2>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 20 }}>₹{(quickViewProduct.id * 1245).toLocaleString()}</div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 25 }}>{quickViewProduct.desc}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  <Link to={`/products/${quickViewProduct.id}`} className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>VIEW FULL DETAILS</Link>
                  <button className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>ADD TO WISH LIST</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
