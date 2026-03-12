import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { GradientText } from '../components/UI';

export default function CheckoutPage() {
    const { cart, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
        businessName: '', gstNumber: '',
        paymentMethod: 'card',
        cardNumber: '', cardExpiry: '', cardCvc: ''
    });

    const subtotal = total;
    const gst = subtotal * 0.18;
    const shipping = subtotal > 10000 ? 0 : 500;
    const grandTotal = subtotal + gst + shipping;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment gateway processing
        await new Promise(resolve => setTimeout(resolve, 3000));

        setIsProcessing(false);
        navigate('/order-confirmation', {
            state: {
                orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                ...formData,
                total: grandTotal
            }
        });
        clearCart();
    };

    if (cart.length === 0 && !isProcessing) {
        return (
            <div style={{ paddingTop: 150, textAlign: 'center', minHeight: '60vh' }}>
                <div style={{ fontSize: 60, marginBottom: 20 }}>🛒</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900 }}>Your Cart is Empty</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>Add items to your cart before proceeding to checkout.</p>
                <button onClick={() => navigate('/products')} className="btn-gold">BROWSE PRODUCTS</button>
            </div>
        );
    }

    if (isProcessing) {
        return (
            <div style={{ position: 'fixed', inset: 0, background: 'var(--bg0)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="loader" style={{ width: 60, height: 60, marginBottom: 24 }} />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Processing Payment</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Please do not refresh the page or click back...</p>
                <div style={{ width: 200, height: 2, background: 'var(--border)', marginTop: 30, position: 'relative', overflow: 'hidden' }}>
                    <motion.div
                        animate={{ left: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        style={{ position: 'absolute', top: 0, width: '50%', height: '100%', background: 'var(--gold)' }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: 110, background: 'var(--bg0)', minHeight: '100vh', paddingBottom: 100 }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>
                <div style={{ marginBottom: 40, textAlign: 'center' }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>SECURE GATEWAY v2.4</div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900 }}>Checkout <GradientText>Authorization</GradientText></h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>
                    {/* Left: Form */}
                    <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', padding: 'clamp(20px, 4vw, 40px)', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(10px, 2vw, 30px)', marginBottom: 40, borderBottom: '1px solid var(--border)', paddingBottom: 25 }}>
                            {['Information', 'Logistic', 'Billing'].map((s, i) => (
                                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: '4px', background: step > i ? 'var(--gold)' : 'var(--bg2)',
                                        color: step > i ? '#050709' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 12, fontWeight: 900, border: step === i + 1 ? '1px solid var(--gold)' : '1px solid var(--border)',
                                        transform: step === i + 1 ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.3s',
                                        fontFamily: 'var(--font-display)'
                                    }}>
                                        {step > i + 1 ? '✓' : i + 1}
                                    </div>
                                    <span className="hide-mobile" style={{ fontSize: 11, fontWeight: 800, color: step >= i + 1 ? 'var(--text-primary)' : 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>{s}</span>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handlePlaceOrder}>
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold)', marginBottom: 20, fontFamily: 'var(--font-head)', letterSpacing: '1px' }}>PERSONAL DISCLOSURE</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>FULL NAME</label>
                                                <input className="form-input" name="name" placeholder="E.g. Alexander Pierce" value={formData.name} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>EMAIL ADDRESS</label>
                                                <input className="form-input" name="email" type="email" placeholder="alex@industry.com" value={formData.email} onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: 30 }}>
                                            <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>OPERATIONAL PHONE</label>
                                            <input className="form-input" name="phone" placeholder="+91 00000 00000" value={formData.phone} onChange={handleInputChange} required />
                                        </div>
                                        <div style={{ background: 'rgba(255,180,0,.02)', border: '1px solid var(--border)', padding: 25, marginBottom: 30 }}>
                                            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 10 }}>B2B TAXATION (OPTIONAL)</div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>FIRM NAME</label>
                                                    <input className="form-input" name="businessName" value={formData.businessName} onChange={handleInputChange} />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>GSTIN</label>
                                                    <input className="form-input" name="gstNumber" value={formData.gstNumber} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => setStep(2)} className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>CONTINUE TO LOGISTICS →</button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold)', marginBottom: 20, fontFamily: 'var(--font-head)', letterSpacing: '1px' }}>DESTINATION LOGISTICS</div>
                                        <div style={{ marginBottom: 20 }}>
                                            <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>SITE ADDRESS / WORKSHOP LOCATION</label>
                                            <textarea className="form-input" name="address" rows={3} placeholder="Street Name, Building, Landmark..." value={formData.address} onChange={handleInputChange} required style={{ resize: 'none' }} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 30 }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>CITY</label>
                                                <input className="form-input" name="city" value={formData.city} onChange={handleInputChange} required />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>STATE / PROVINCE</label>
                                                <input className="form-input" name="state" value={formData.state} onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: 30 }}>
                                            <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>ZIP / POSTAL CODE</label>
                                            <input className="form-input" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
                                        </div>
                                        <div style={{ display: 'flex', gap: 15 }}>
                                            <button type="button" onClick={() => setStep(1)} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>BACK</button>
                                            <button type="button" onClick={() => setStep(3)} className="btn-gold" style={{ flex: 2, justifyContent: 'center' }}>PROCEED TO BILLING →</button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold)', marginBottom: 20, fontFamily: 'var(--font-head)', letterSpacing: '1px' }}>PAYMENT DISBURSEMENT</div>
                                        <div style={{ display: 'flex', gap: 12, marginBottom: 30 }}>
                                            {[
                                                { id: 'card', label: 'Card Payment', icon: '💳' },
                                                { id: 'bank', label: 'B2B Transfer', icon: '🏛️' },
                                            ].map(m => (
                                                <div key={m.id} onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                                                    style={{
                                                        flex: 1, padding: '16px 12px', border: '1px solid', borderColor: formData.paymentMethod === m.id ? 'var(--gold)' : 'var(--border)',
                                                        background: formData.paymentMethod === m.id ? 'rgba(255,180,0,.08)' : 'var(--bg2)', cursor: 'pointer',
                                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transition: 'all .3s', textAlign: 'center'
                                                    }}
                                                >
                                                    <span style={{ fontSize: 24 }}>{m.icon}</span>
                                                    <span style={{ fontWeight: 800, fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase' }}>{m.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {formData.paymentMethod === 'card' && (
                                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 25, border: '1px solid var(--border)', marginBottom: 30 }}>
                                                <div style={{ marginBottom: 20 }}>
                                                    <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>CARD NUMBER</label>
                                                    <input className="form-input" name="cardNumber" maxLength="19" placeholder="4444 4444 4444 4444" value={formData.cardNumber} onChange={handleInputChange} required />
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                                    <div>
                                                        <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>EXPIRY DATE</label>
                                                        <input className="form-input" name="cardExpiry" placeholder="MM / YY" value={formData.cardExpiry} onChange={handleInputChange} required />
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>CVC / CVV</label>
                                                        <input className="form-input" name="cardCvc" placeholder="000" maxLength="3" value={formData.cardCvc} onChange={handleInputChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {formData.paymentMethod === 'bank' && (
                                            <div style={{ background: 'var(--bg2)', padding: 20, borderLeft: '3px solid var(--gold)', marginBottom: 30, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                Bank transfer instructions will be generated after order placement. Pro-forma invoice will be emailed to <strong>{formData.email}</strong>.
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', gap: 15 }}>
                                            <button type="button" onClick={() => setStep(2)} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>BACK</button>
                                            <button type="submit" className="btn-gold" style={{ flex: 2, justifyContent: 'center', fontSize: 14 }}>AUTHORIZE ₹{grandTotal.toLocaleString()}</button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>

                    {/* Right: Summary */}
                    <div style={{ position: 'sticky', top: 130 }}>
                        <div style={{ background: 'var(--bg1)', border: '1px solid var(--border)', padding: 30 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25, borderBottom: '1px solid var(--border)', paddingBottom: 15 }}>
                                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 800, letterSpacing: '1px' }}>DISPATCH SUMMARY</h3>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)' }}>{cart.length} ITEMS</span>
                            </div>

                            <div style={{ maxHeight: 240, overflowY: 'auto', marginBottom: 25, paddingRight: 10 }}>
                                {cart.map(item => (
                                    <div key={item.id} style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'center' }}>
                                        <div style={{ width: 50, height: 50, background: 'var(--bg2)', border: '1px solid var(--border)', flexShrink: 0, padding: 4 }}>
                                            <img src={item.img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{item.title}</div>
                                            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>QTY: {item.quantity || 1} • ₹{((item.price || item.id * 1245)).toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: '1px dashed var(--border)', paddingTop: 20 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 12 }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Inventory Subtotal</span>
                                    <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 12 }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Estimated Tax (GST 18%)</span>
                                    <span style={{ fontWeight: 600 }}>₹{gst.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 20 }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Logistic Charges</span>
                                    <span style={{ fontWeight: 600, color: shipping === 0 ? '#00D4FF' : 'inherit' }}>{shipping === 0 ? 'COMPLIMENTARY' : `₹${shipping.toLocaleString()}`}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 900, color: 'var(--gold)', borderTop: '1px solid var(--border)', paddingTop: 15 }}>
                                    <span style={{ fontFamily: 'var(--font-display)' }}>GROSS TOTAL</span>
                                    <span style={{ fontFamily: 'var(--font-display)' }}>₹{grandTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div style={{ marginTop: 30, background: 'rgba(0, 212, 255, 0.03)', border: '1px solid rgba(0, 212, 255, 0.1)', padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ fontSize: 20 }}>🛡️</div>
                                <div style={{ fontSize: 9, color: 'var(--cyan)', fontWeight: 700, letterSpacing: '0.5px', lineHeight: 1.4 }}>
                                    PROTECTED BY QUANTUM-GRADE AES-256 ENCRYPTION PROTOCOLS. YOUR FINANCIAL DATA IS NEVER STORED IN OUR DATABASE.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

