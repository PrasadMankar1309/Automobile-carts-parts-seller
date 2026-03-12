import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GradientText } from '../components/UI';

export default function OrderTrackingPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [orderId, setOrderId] = useState(query.get('id') || '');
    const [trackingData, setTrackingData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = (e) => {
        if (e) e.preventDefault();
        if (!orderId) return;

        setLoading(true);
        // Mock tracking data
        setTimeout(() => {
            setTrackingData({
                id: orderId,
                status: 'Shipped',
                statusIndex: 2, // 0: Confirmed, 1: Packed, 2: Shipped, 3: Out for Delivery, 4: Delivered
                lastUpdate: 'Feb 28, 2026 - 10:30 AM',
                location: 'Nagpur Hub',
                estimatedDelivery: 'March 2, 2026',
                timeline: [
                    { status: 'Order Confirmed', time: 'Feb 26, 2026 - 09:15 AM', location: 'Seven Eyes HQ', active: true },
                    { status: 'Packed & Quality Check', time: 'Feb 27, 2026 - 02:20 PM', location: 'Nagpur Warehouse', active: true },
                    { status: 'Shipped', time: 'Feb 28, 2026 - 10:30 AM', location: 'Nagpur Logistics Center', active: true },
                    { status: 'Out for Delivery', time: 'Pending', location: '-', active: false },
                    { status: 'Delivered', time: 'Pending', location: '-', active: false },
                ]
            });
            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        if (query.get('id')) handleTrack();
    }, []);

    const statuses = [
        { label: 'Confirmed', icon: '📝' },
        { label: 'Packed', icon: '📦' },
        { label: 'Shipped', icon: '🚚' },
        { label: 'Out for Delivery', icon: '🛵' },
        { label: 'Delivered', icon: '🏠' }
    ];

    return (
        <div style={{ paddingTop: 110, paddingBottom: 100, background: 'var(--bg0)', minHeight: '100vh' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px' }}>
                <div style={{ textAlign: 'center', marginBottom: 50 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '.2em', marginBottom: 12 }}>// TRACK SHIPMENT</div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 900, marginBottom: 30 }}>Order <GradientText>Tracking</GradientText></h1>

                    <form onSubmit={handleTrack} style={{ maxWidth: 500, margin: '0 auto', display: 'flex', gap: 10 }}>
                        <input
                            className="form-input"
                            placeholder="Enter Order ID (e.g. ORD-123456)"
                            value={orderId}
                            onChange={e => setOrderId(e.target.value)}
                            style={{ fontSize: 14, padding: '15px 20px' }}
                        />
                        <button type="submit" className="btn-gold" style={{ whiteSpace: 'nowrap' }}>TRACK NOW</button>
                    </form>
                </div>

                {loading && (
                    <div style={{ textAlign: 'center', padding: '50px 0' }}>
                        <div className="loader" style={{ margin: '0 auto 20px' }} />
                        <p style={{ color: 'var(--text-muted)' }}>Fetching shipment data...</p>
                    </div>
                )}

                {trackingData && !loading && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        {/* Summary Card */}
                        <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', padding: 30, marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                            <div>
                                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 5 }}>STATUS</div>
                                <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--gold)' }}>{trackingData.status.toUpperCase()}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 5 }}>ESTIMATED DELIVERY</div>
                                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{trackingData.estimatedDelivery}</div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', padding: '50px 30px', marginBottom: 30 }}>
                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                                {/* Background line */}
                                <div style={{ position: 'absolute', top: 11, left: '5%', right: '5%', height: 2, background: 'var(--bg2)', zIndex: 1 }} />
                                {/* Progress line */}
                                <div style={{
                                    position: 'absolute', top: 11, left: '5%', width: `${(trackingData.statusIndex / (statuses.length - 1)) * 90}%`,
                                    height: 2, background: 'var(--gold)', zIndex: 2, transition: 'width 1s ease-in-out'
                                }} />

                                {statuses.map((s, i) => (
                                    <div key={i} style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 80 }}>
                                        <div style={{
                                            width: 24, height: 24, borderRadius: '50%', background: i <= trackingData.statusIndex ? 'var(--gold)' : 'var(--bg2)',
                                            border: i <= trackingData.statusIndex ? 'none' : '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
                                            boxShadow: i === trackingData.statusIndex ? '0 0 15px rgba(255,180,0,0.4)' : 'none'
                                        }}>
                                            {i < trackingData.statusIndex ? '✓' : ''}
                                        </div>
                                        <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, textAlign: 'center', color: i <= trackingData.statusIndex ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                            {s.label.toUpperCase()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detailed Timeline */}
                        <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', padding: 30 }}>
                            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 800, marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>DETAILED SHIPMENT LOG</span>
                                <button className="btn-outline" style={{ fontSize: 9, padding: '5px 10px' }}>⬇ DOWNLOAD INVOICE</button>
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                {trackingData.timeline.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 30, position: 'relative' }}>
                                        <div style={{ width: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{
                                                width: 10, height: 10, borderRadius: '50%', background: item.active ? 'var(--gold)' : 'var(--border)',
                                                marginTop: 5, flexShrink: 0
                                            }} />
                                            {i < trackingData.timeline.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', margin: '5px 0' }} />}
                                        </div>
                                        <div style={{ flex: 1, paddingBottom: 30 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                                <span style={{ fontSize: 14, fontWeight: 700, color: item.active ? 'var(--text-primary)' : 'var(--text-muted)' }}>{item.status}</span>
                                                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{item.time}</span>
                                            </div>
                                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.location}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
