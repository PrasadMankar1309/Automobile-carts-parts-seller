import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: '#050709',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                    }}
                >
                    <div className="loader-container" style={{ position: 'relative', width: 120, height: 120 }}>
                        {/* Outer Hexagon Line */}
                        <motion.div
                            initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                            animate={{ rotate: 360, scale: 1, opacity: 1 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                border: '2px solid rgba(255, 180, 0, 0.2)',
                                borderRadius: '12px',
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            }}
                        />

                        {/* Inner Brand Mark / Logo Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FFB400',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 900,
                                fontSize: 24,
                                letterSpacing: '2px'
                            }}
                        >
                            SEVEN EYES
                        </motion.div>

                        {/* Scanning Line */}
                        <motion.div
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: 'absolute',
                                left: -10,
                                right: -10,
                                height: 2,
                                background: 'rgba(0, 212, 255, 0.5)',
                                boxShadow: '0 0 15px rgba(0, 212, 255, 0.8)',
                                zIndex: 2,
                            }}
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        style={{
                            marginTop: 40,
                            fontFamily: 'var(--font-mono)',
                            fontSize: 12,
                            color: 'var(--gold)',
                            letterSpacing: '4px',
                            textTransform: 'uppercase'
                        }}
                    >
                        Initializing System...
                    </motion.div>

                    <div style={{
                        position: 'absolute',
                        bottom: 40,
                        width: 200,
                        height: 1,
                        background: 'rgba(255,255,255,0.05)'
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2.2, ease: "easeInOut" }}
                            style={{
                                height: '100%',
                                background: 'var(--gold)',
                                boxShadow: '0 0 10px var(--gold)'
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
