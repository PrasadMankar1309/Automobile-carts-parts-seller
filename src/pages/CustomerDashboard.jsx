import { useState } from 'react';
import { motion } from 'framer-motion';
import { GradientText } from '../components/UI';
import { Link } from 'react-router-dom';

export default function CustomerDashboard() {
    const [activeTab, setActiveTab] = useState('orders');

    const orders = [
        { id: 'ORD-77AC891', date: 'Feb 24, 2026', items: 3, total: 12450, status: 'Shipped', color: '#00D4FF' },
        { id: 'ORD-12BX992', date: 'Feb 12, 2026', items: 1, total: 24500, status: 'Delivered', color: '#22C55E' },
        { id: 'ORD-99PQ102', date: 'Jan 28, 2026', items: 5, total: 8900, status: 'Delivered', color: '#22C55E' },
    ];

    return (
        <div style={{ paddingTop: 110, paddingBottom: 100, background: 'var(--bg0)', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>
                <div style={{ marginBottom: 40 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '.2em', marginBottom: 10 }}>// MY ACCOUNT</div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 900 }}>Hello, <GradientText>Anand Patil</GradientText></h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40 }}>
                    {/* Navigation */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { id: 'orders', label: 'My Orders', icon: '📦' },
                            { id: 'track', label: 'Track Shipments', icon: '🚚' },
                            { id: 'wishlist', label: 'Wishlist', icon: '♡' },
                            { id: 'address', label: 'Saved Addresses', icon: '🏠' },
                            { id: 'profile', label: 'Profile Settings', icon: '👤' },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 15, padding: '16px 20px', background: activeTab === item.id ? 'var(--bg2)' : 'var(--bg1)',
                                    border: '1px solid', borderColor: activeTab === item.id ? 'var(--gold)' : 'var(--border)', color: activeTab === item.id ? 'var(--gold)' : 'var(--text-secondary)',
                                    cursor: 'pointer', textAlign: 'left', borderRadius: 4, transition: 'all .3s'
                                }}
                            >
                                <span style={{ fontSize: 18 }}>{item.icon}</span>
                                <span style={{ fontSize: 13, fontWeight: 700 }}>{item.label}</span>
                            </button>
                        ))}
                        <div style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} />
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <button style={{
                                display: 'flex', alignItems: 'center', gap: 15, padding: '16px 20px', background: 'var(--bg1)', width: '100%',
                                border: '1px solid var(--border)', color: 'var(--red)', cursor: 'pointer', textAlign: 'left', borderRadius: 4
                            }}>
                                <span style={{ fontSize: 18 }}>🚪</span>
                                <span style={{ fontSize: 13, fontWeight: 700 }}>Log Out</span>
                            </button>
                        </Link>
                    </div>

                    {/* Content */}
                    <div>
                        {activeTab === 'orders' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
                                    <h2 style={{ fontSize: 20, fontWeight: 800 }}>Recent Orders</h2>
                                    <button className="btn-outline" style={{ fontSize: 10 }}>VIEW ALL</button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                    {orders.map(order => (
                                        <div key={order.id} style={{ background: 'var(--bg1)', border: '1px solid var(--border)', padding: 25, borderRadius: 4 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 15 }}>
                                                <div style={{ display: 'flex', gap: 30 }}>
                                                    <div>
                                                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 5 }}>ORDER PLACED</div>
                                                        <div style={{ fontSize: 14, fontWeight: 700 }}>{order.date}</div>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 5 }}>TOTAL</div>
                                                        <div style={{ fontSize: 14, fontWeight: 700 }}>₹{order.total.toLocaleString()}</div>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 5 }}>ITEMS</div>
                                                        <div style={{ fontSize: 14, fontWeight: 700 }}>{order.items}</div>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 5 }}>ORDER ID</div>
                                                    <div style={{ fontSize: 14, fontWeight: 700 }}>#{order.id}</div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: order.color }} />
                                                    <span style={{ fontSize: 13, fontWeight: 700 }}>{order.status}</span>
                                                </div>
                                                <div style={{ display: 'flex', gap: 10 }}>
                                                    <Link to={`/track-order?id=${order.id}`} className="btn-gold" style={{ padding: '8px 20px', fontSize: 10 }}>TRACK ORDER</Link>
                                                    <button className="btn-outline" style={{ padding: '8px 20px', fontSize: 10 }}>ORDER DETAILS</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'track' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', padding: 40, textAlign: 'center' }}>
                                    <div style={{ fontSize: 50, marginBottom: 20 }}>🚚</div>
                                    <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 15 }}>Live Package Tracking</h2>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>Enter your order ID below to see where your items are.</p>
                                    <Link to="/track-order" className="btn-gold">GO TO TRACKING PAGE</Link>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'profile' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', padding: 30 }}>
                                    <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 30 }}>Personal Information</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                        <div>
                                            <label className="form-label">FULL NAME</label>
                                            <input className="form-input" defaultValue="Anand Patil" />
                                        </div>
                                        <div>
                                            <label className="form-label">EMAIL ADDRESS</label>
                                            <input className="form-input" defaultValue="anand.patil@example.com" />
                                        </div>
                                        <div>
                                            <label className="form-label">PHONE NUMBER</label>
                                            <input className="form-input" defaultValue="+91 982XXXXX99" />
                                        </div>
                                        <div>
                                            <label className="form-label">ACCOUNT TYPE</label>
                                            <input className="form-input" defaultValue="Premium Customer" disabled />
                                        </div>
                                    </div>
                                    <button className="btn-gold">SAVE CHANGES</button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
