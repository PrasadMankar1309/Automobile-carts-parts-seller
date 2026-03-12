import { useState } from 'react';
import { motion } from 'framer-motion';
import { GradientText } from '../components/UI';
import { useProducts } from '../context/ProductsContext';

export default function DealerDashboard() {
    const { products } = useProducts();
    const [activeTab, setActiveTab] = useState('inventory');

    const stats = [
        { label: 'Bulk Orders', val: '24', icon: '📦', color: 'var(--gold)' },
        { label: 'Credit Limit', val: '₹5.5L', icon: '💳', color: '#22C55E' },
        { label: 'Active Quotes', val: '12', icon: '📝', color: '#00D4FF' },
        { label: 'Rebate Earned', val: '₹12.4K', icon: '💰', color: '#A855F7' },
    ];

    return (
        <div style={{ paddingTop: 90, display: 'flex', minHeight: '100vh', background: 'var(--bg0)' }}>
            {/* Sidebar */}
            <div style={{ width: 260, background: 'var(--bg1)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '30px 0' }}>
                <div style={{ padding: '0 25px 30px', borderBottom: '1px solid var(--border)', marginBottom: 20 }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>DEALER ACCOUNT</div>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>Mahalaxmi Auto</div>
                    <div style={{ fontSize: 11, color: '#22C55E' }}>● VERIFIED PARTNER</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {[
                        { id: 'inventory', label: 'Dealer Inventory', icon: '📋' },
                        { id: 'bulk', label: 'Bulk Order Upload', icon: '🚀' },
                        { id: 'quotes', label: 'My Quotes', icon: '📄' },
                        { id: 'history', label: 'Order History', icon: '🕙' },
                        { id: 'rewards', label: 'Dealer Rewards', icon: '🏆' },
                        { id: 'settings', label: 'Account Settings', icon: '⚙️' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 25px', background: activeTab === item.id ? 'var(--gold-dim)' : 'transparent',
                                border: 'none', color: activeTab === item.id ? 'var(--gold)' : 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left',
                                borderLeft: activeTab === item.id ? '3px solid var(--gold)' : '3px solid transparent', transition: 'all .3s'
                            }}
                        >
                            <span style={{ fontSize: 18 }}>{item.icon}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.05em' }}>{item.label.toUpperCase()}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: 40, overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900 }}>Dealer <GradientText>Dashboard</GradientText></h1>
                    <div style={{ background: 'var(--bg2)', padding: '10px 20px', border: '1px solid var(--border)', borderRadius: 4, display: 'flex', gap: 20, alignItems: 'center' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>CREDIT BALANCE</div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--gold)' }}>₹2,45,000</div>
                        </div>
                        <button className="btn-gold" style={{ padding: '8px 16px', fontSize: 10 }}>TOP UP</button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
                    {stats.map(s => (
                        <div key={s.label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: 25 }}>
                            <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
                            <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.val}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{s.label.toUpperCase()}</div>
                        </div>
                    ))}
                </div>

                {activeTab === 'inventory' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', padding: 30 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
                                <h2 style={{ fontSize: 18, fontWeight: 800 }}>EXCLUSIVE DEALER PRICING</h2>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <input className="form-input" placeholder="Search inventory..." style={{ width: 250, fontSize: 12 }} />
                                    <button className="btn-outline" style={{ fontSize: 10, padding: '0 15px' }}>EXPORT CSV</button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {products.slice(0, 6).map(p => (
                                    <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px 120px 100px', gap: 20, padding: '15px 0', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                                        <div style={{ width: 60, height: 60, background: 'var(--bg2)', overflow: 'hidden' }}>
                                            <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700 }}>{p.title}</div>
                                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>ID: SE-{p.id}992</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>RETAIL PRICE</div>
                                            <div style={{ fontSize: 14, fontWeight: 700, textDecoration: 'line-through', opacity: 0.5 }}>₹{(p.id * 1450).toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 10, color: 'var(--gold)' }}>DEALER PRICE</div>
                                            <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--gold)' }}>₹{(p.id * 1245).toLocaleString()}</div>
                                        </div>
                                        <button className="btn-gold" style={{ fontSize: 9, padding: '8px' }}>QUICK ADD</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'bulk' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', padding: 50, textAlign: 'center' }}>
                            <div style={{ fontSize: 60, marginBottom: 20 }}>📊</div>
                            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 15 }}>Bulk Order Upload</h2>
                            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto 30px' }}>
                                Upload a CSV or Excel file containing Product IDs and Quantities to instantly populate your cart with dealer pricing.
                            </p>
                            <div style={{ border: '2px dashed var(--border-gold)', padding: 40, background: 'var(--bg2)', cursor: 'pointer', marginBottom: 20 }}>
                                <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>DRAG & DROP FILE HERE OR CLICK TO BROWSE</div>
                            </div>
                            <button className="btn-outline" style={{ fontSize: 12 }}>DOWNLOAD TEMPLATE CSV</button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
