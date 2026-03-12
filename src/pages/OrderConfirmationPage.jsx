import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GradientText } from '../components/UI';

export default function OrderConfirmationPage() {
    const location = useLocation();
    const order = location.state || { orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(), name: 'Guest', total: 0 };

    return (
        <div style={{ paddingTop: 150, paddingBottom: 100, background: 'var(--bg0)', minHeight: '100vh', textAlign: 'center' }}>
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 28px' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}>
                    <div style={{ width: 80, height: 80, background: '#22C55E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', fontSize: 40, color: 'white' }}>
                        ✓
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)', letterSpacing: '.2em', marginBottom: 15 }}>ORDER CONFIRMED</div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 900, marginBottom: 20 }}>Thank You, <GradientText>{order.name.split(' ')[0]}</GradientText></h1>
                    <p style={{ fontSize: 18, color: 'var(--text-secondary)', marginBottom: 40, lineHeight: 1.6 }}>
                        Your order has been placed successfully. We've sent a confirmation email to <strong>{order.email || 'your email'}</strong>.
                    </p>

                    <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', padding: 40, marginBottom: 50, textAlign: 'left' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 30 }}>
                            <div>
                                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '.1em' }}>ORDER NUMBER</div>
                                <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text-primary)' }}>{order.orderId}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '.1em' }}>ORDER TOTAL</div>
                                <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--gold)' }}>₹{order.total.toLocaleString()}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '.1em' }}>DELIVERY ESTIMATE</div>
                                <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text-primary)' }}>3-5 Working Days</div>
                            </div>
                        </div>

                        <div style={{ marginTop: 30, paddingTop: 30, borderTop: '1px solid var(--border)' }}>
                            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 12, letterSpacing: '.1em' }}>SHIPPING TO</div>
                            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {order.address}<br />
                                {order.city}, {order.state} - {order.pincode}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
                        <Link to={`/track-order?id=${order.orderId}`} className="btn-gold" style={{ padding: '16px 32px' }}>TRACK YOUR ORDER</Link>
                        <Link to="/products" className="btn-outline" style={{ padding: '16px 32px' }}>CONTINUE SHOPPING</Link>
                    </div>

                    <div style={{ marginTop: 60, fontSize: 13, color: 'var(--text-muted)' }}>
                        Need help? Contact our support at <a href="mailto:seveneyesdis@gmail.com" style={{ color: 'var(--gold)' }}>seveneyesdis@gmail.com</a> or call +91-7888246020
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
