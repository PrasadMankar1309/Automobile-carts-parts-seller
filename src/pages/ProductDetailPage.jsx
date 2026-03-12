import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { SectionLabel, GradientText } from '../components/UI';

export default function ProductDetailPage() {
    const { id } = useParams();
    const { products } = useProducts();
    const { addItem, toggleWishlist, wishlist, addToRecentlyViewed, recentlyViewed } = useCart();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState('specs');
    const [added, setAdded] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const found = products.find(p => p.id === parseInt(id));
        if (found) {
            setProduct(found);
            addToRecentlyViewed(found);
        }
    }, [id, products, addToRecentlyViewed]);

    if (!product) return (
        <div style={{ paddingTop: 150, textAlign: 'center', minHeight: '60vh' }}>
            <div className="loader" style={{ margin: '0 auto 20px' }} />
            <p style={{ color: 'var(--text-muted)' }}>Loading product details...</p>
        </div>
    );

    const images = [
        product.img,
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
        'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80'
    ];

    const handleAddToCart = () => {
        addItem({ ...product, quantity: qty });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div style={{ paddingTop: 110, background: 'var(--bg0)', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1300, margin: '0 auto', padding: '20px 28px' }}>
                {/* Breadcrumbs */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 30, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--text-muted)' }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>HOME</Link>
                    <span>/</span>
                    <Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>PRODUCTS</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--gold)' }}>{product.cat.toUpperCase()}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 50, marginBottom: 80 }}>
                    {/* Left: Images */}
                    <div>
                        <div style={{ position: 'relative', background: 'var(--bg1)', border: '1px solid var(--border)', overflow: 'hidden', height: 450, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <motion.img
                                key={currentImage}
                                src={images[currentImage]}
                                alt={product.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'brightness(0.9) contrast(1.1)' }}
                                onError={e => { e.target.src = `https://placehold.co/600x600/0c1420/FFB400?text=${encodeURIComponent(product.title)}`; }}
                            />
                            <div style={{ position: 'absolute', top: 20, left: 20, background: product.color, color: '#050709', padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700 }}>{product.tag}</div>
                        </div>

                        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentImage(i)}
                                    style={{
                                        width: 80, height: 80, padding: 0, border: currentImage === i ? '2px solid var(--gold)' : '1px solid var(--border)',
                                        background: 'var(--bg1)', cursor: 'pointer', overflow: 'hidden', transition: 'all .3s'
                                    }}
                                >
                                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: currentImage === i ? 1 : 0.5 }}
                                        onError={e => { e.target.src = `https://placehold.co/80x80/0c1420/FFB400?text=IMG${i + 1}`; }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)', marginBottom: 8 }}>{product.brand}</div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 900, marginBottom: 16, lineHeight: 1.1 }}>{product.title}</h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 24 }}>
                            <div style={{ display: 'flex', gap: 2 }}>
                                {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: 'var(--gold)', fontSize: 14 }}>★</span>)}
                            </div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>4.9 (124 reviews)</span>
                            <span style={{ width: 1, height: 12, background: 'var(--border)' }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#22C55E' }}>● IN STOCK</span>
                        </div>

                        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 28 }}>
                            {product.desc} Higher quality construction with industrial-grade materials. This {product.title.toLowerCase()} is designed for professional mechanics and industrial workshops who demand reliability and precision.
                        </p>

                        <div style={{ background: 'var(--bg2)', padding: '24px 30px', border: '1px solid var(--border)', marginBottom: 32 }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 12, letterSpacing: '.1em' }}>DEALER PRICING AVAILABLE</div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
                                <span style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--font-display)' }}>₹{(product.id * 1245).toLocaleString()}</span>
                                <span style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{(product.id * 1450).toLocaleString()}</span>
                                <span style={{ fontSize: 11, color: '#22C55E', fontWeight: 700, background: 'rgba(34,197,94,.1)', padding: '2px 8px' }}>SAVE 15%</span>
                            </div>

                            <div style={{ display: 'flex', gap: 12 }}>
                                <div style={{ display: 'flex', border: '1px solid var(--border)', background: 'var(--bg1)' }}>
                                    <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>-</button>
                                    <input type="number" value={qty} onChange={e => setQty(parseInt(e.target.value) || 1)} style={{ width: 50, textAlign: 'center', background: 'none', border: 'none', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700 }} />
                                    <button onClick={() => setQty(qty + 1)} style={{ width: 40, background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>+</button>
                                </div>
                                <motion.button
                                    className="btn-gold"
                                    whileTap={{ scale: 0.96 }}
                                    onClick={handleAddToCart}
                                    style={{ flex: 1, justifyContent: 'center', background: added ? '#22C55E' : undefined }}
                                >
                                    {added ? '✓ ADDED TO CART' : '🛒 ADD TO CART'}
                                </motion.button>
                            </div>

                            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                                <button
                                    onClick={() => toggleWishlist(product)}
                                    className="btn-outline"
                                    style={{ flex: 1, fontSize: 11, padding: '10px', color: wishlist.some(i => i.id === product.id) ? 'var(--gold)' : undefined, borderColor: wishlist.some(i => i.id === product.id) ? 'var(--gold)' : undefined }}
                                >
                                    {wishlist.some(i => i.id === product.id) ? '★ IN WISHLIST' : '♡ WISHLIST'}
                                </button>
                                <button className="btn-outline" style={{ flex: 1, fontSize: 11, padding: '10px' }}>📋 REQ. QUOTE</button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <div style={{ width: 40, height: 40, background: 'rgba(255,180,0,.05)', border: '1px solid rgba(255,180,0,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🚚</div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 700 }}>Fast Shipping</div>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Ships in 24-48 hours</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <div style={{ width: 40, height: 40, background: 'rgba(255,180,0,.05)', border: '1px solid rgba(255,180,0,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛡️</div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 700 }}>Full Warranty</div>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Genuine manufacturer cover</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Content */}
                <div style={{ borderBottom: '1px solid var(--border)', marginBottom: 40, display: 'flex', gap: 40 }}>
                    {[
                        { id: 'specs', label: 'SPECIFICATIONS' },
                        { id: 'tech', label: 'TECHNICAL DETAILS' },
                        { id: 'shipping', label: 'SHIPPING & RETURNS' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                background: 'none', border: 'none', padding: '15px 0', cursor: 'pointer',
                                fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, letterSpacing: '.1em',
                                color: activeTab === tab.id ? 'var(--gold)' : 'var(--text-muted)',
                                borderBottom: activeTab === tab.id ? '2px solid var(--gold)' : '2px solid transparent',
                                transition: 'all .3s'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div style={{ minHeight: 300, marginBottom: 100 }}>
                    <AnimatePresence mode="wait">
                        {activeTab === 'specs' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Product Specifications</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 0, border: '1px solid var(--border)' }}>
                                    {product.items.concat(['Material', 'Finish', 'Weight', 'Dimensions', 'Warranty', 'Standard']).map((item, i) => (
                                        <div key={i} style={{ display: 'flex', borderBottom: '1px solid var(--border)', borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none' }}>
                                            <div style={{ width: 140, background: 'var(--bg1)', padding: '12px 18px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', flexShrink: 0 }}>{item.toUpperCase()}</div>
                                            <div style={{ padding: '12px 18px', fontSize: 13, color: 'var(--text-secondary)' }}>
                                                {i < product.items.length ? 'Standard Grade' : i === product.items.length ? 'Chrome Vanadium Steel' : 'Mirror Polished'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {activeTab === 'tech' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                <p>Advanced engineering techniques utilized in the manufacturing process ensure that each {product.title.toLowerCase()} exceeds ANSI and DIN standards. The ergonomic design reduces user fatigue during extended use in industrial environments.</p>
                                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <div style={{ display: 'flex', gap: 10 }}><span style={{ color: 'var(--gold)' }}>✓</span> Precision-machined for exact fitment </div>
                                    <div style={{ display: 'flex', gap: 10 }}><span style={{ color: 'var(--gold)' }}>✓</span> Corrosion-resistant coating for longevity</div>
                                    <div style={{ display: 'flex', gap: 10 }}><span style={{ color: 'var(--gold)' }}>✓</span> High-torque resistance properties</div>
                                    <div style={{ display: 'flex', gap: 10 }}><span style={{ color: 'var(--gold)' }}>✓</span> Certified for professional automotive and industrial applications</div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Related Products */}
                <div style={{ marginBottom: 100 }}>
                    <SectionLabel>// YOU MAY ALSO NEED</SectionLabel>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, marginBottom: 30 }}>Related <GradientText>Equipment</GradientText></h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
                        {products.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4).map(p => (
                            <Link key={p.id} to={`/products/${p.id}`} style={{ textDecoration: 'none' }}>
                                <div className="product-card" style={{ height: '100%' }}>
                                    <div style={{ height: 160, overflow: 'hidden' }}>
                                        <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }} />
                                    </div>
                                    <div style={{ padding: 15 }}>
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--gold)', marginBottom: 5 }}>{p.brand}</div>
                                        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 5 }}>{p.title}</h3>
                                        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>₹{(p.id * 1245).toLocaleString()}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                {/* Recently Viewed */}
                {recentlyViewed.length > 1 && (
                    <div style={{ marginBottom: 100 }}>
                        <SectionLabel>// RECENTLY VIEWED</SectionLabel>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, marginBottom: 30 }}>Continue <GradientText>Your Search</GradientText></h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 15 }}>
                            {recentlyViewed.filter(p => p.id !== product.id).slice(0, 5).map(p => (
                                <Link key={p.id} to={`/products/${p.id}`} style={{ textDecoration: 'none' }}>
                                    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: 15 }}>
                                        <img src={p.img} style={{ width: '100%', height: 120, objectFit: 'cover', marginBottom: 10 }} />
                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{p.title}</div>
                                        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--gold)' }}>₹{(p.id * 1245).toLocaleString()}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
