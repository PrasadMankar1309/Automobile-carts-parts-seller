import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceBookingModal = ({ isOpen, onClose, serviceName }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        vehicledetails: '',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(3); // Show success
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay" style={{ background: 'rgba(5, 7, 9, 0.92)' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            background: 'var(--bg2)',
                            border: '1px solid var(--border-gold)',
                            width: '100%',
                            maxWidth: 500,
                            position: 'relative',
                            padding: 40,
                            maxHeight: '90vh',
                            overflowY: 'auto'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 24 }}
                        >
                            ×
                        </button>

                        {step === 1 && (
                            <form onSubmit={() => setStep(2)}>
                                <div style={{ textAlign: 'center', marginBottom: 30 }}>
                                    <div className="section-label" style={{ justifyContent: 'center' }}>Step 1 / 2</div>
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, marginBottom: 10 }}>
                                        Book <span style={{ color: 'var(--gold)' }}>{serviceName}</span>
                                    </h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Enter your contact details to proceed.</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>Full Name</label>
                                        <input type="text" className="form-input" required placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>Email Address</label>
                                        <input type="email" className="form-input" required placeholder="john@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>Phone Number</label>
                                        <input type="tel" className="form-input" required placeholder="+91 00000 00000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                    </div>
                                </div>

                                <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: 30 }}>
                                    Next Details →
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleSubmit}>
                                <div style={{ textAlign: 'center', marginBottom: 30 }}>
                                    <div className="section-label" style={{ justifyContent: 'center' }}>Step 2 / 2</div>
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, marginBottom: 10 }}>
                                        Service <span style={{ color: 'var(--gold)' }}>Timing</span>
                                    </h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>When should we expect you?</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>Preferred Date</label>
                                            <input type="date" className="form-input" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>Preferred Time</label>
                                            <input type="time" className="form-input" required value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>Vehicle Details (Make/Model)</label>
                                        <input type="text" className="form-input" placeholder="e.g. BMW M4 2023" value={formData.vehicledetails} onChange={e => setFormData({ ...formData, vehicledetails: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>Additional Notes</label>
                                        <textarea className="form-input" rows="3" placeholder="Any specific requirements..." value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} style={{ resize: 'none' }}></textarea>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
                                    <button type="button" onClick={() => setStep(1)} className="btn-outline" style={{ flex: 1, padding: '12px' }}>
                                        Back
                                    </button>
                                    <button type="submit" className="btn-gold" style={{ flex: 2 }}>
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        )}

                        {step === 3 && (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{ width: 80, height: 80, background: 'var(--gold-dim)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid var(--gold)' }}
                                >
                                    <span style={{ fontSize: 40 }}>✓</span>
                                </motion.div>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, marginBottom: 12 }}>
                                    Booking <span style={{ color: 'var(--gold)' }}>Confirmed!</span>
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 30 }}>
                                    Thank you, {formData.name}. Your booking for <strong>{serviceName}</strong> has been received. Our team will contact you shortly at <strong>{formData.phone}</strong> to finalize instructions.
                                </p>
                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: 16, textAlign: 'left', marginBottom: 30 }}>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', marginBottom: 8 }}>BOOKING REFERENCE: #SE-{Math.floor(100000 + Math.random() * 900000)}</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>Date: {formData.date} at {formData.time}</div>
                                </div>
                                <button onClick={onClose} className="btn-gold" style={{ width: '100%' }}>
                                    Done
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ServiceBookingModal;
