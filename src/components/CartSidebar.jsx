import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { items, removeItem, updateQty, clearCart, isOpen, setIsOpen, totalItems } = useCart();

  const subtotal = items.reduce((acc, item) => acc + (item.qty * (item.id * 1245)), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1999,
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            }}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="cart-sidebar"
            style={{ zIndex: 2000 }}
          >
            {/* Header */}
            <div style={{
              padding: '22px 24px',
              borderBottom: '1px solid rgba(255,180,0,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'rgba(12,20,32,0.8)',
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, letterSpacing: '.06em' }}>
                  INQUIRY CART
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                  {totalItems} item{totalItems !== 1 ? 's' : ''} selected
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: 36, height: 36, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ✕
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>🛒</div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, color: 'var(--text-muted)' }}>Your cart is empty</div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>Add products to include in your inquiry</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <AnimatePresence>
                    {items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        style={{
                          display: 'flex', gap: 12,
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          padding: 12,
                        }}
                      >
                        {/* Thumb */}
                        <div style={{ width: 60, height: 60, flexShrink: 0, overflow: 'hidden' }}>
                          <img src={item.img} alt={item.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
                            onError={e => { e.target.style.display = 'none'; }}
                          />
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: '.08em', marginBottom: 8 }}>{item.cat}</div>

                          {/* Qty controls */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <button onClick={() => updateQty(item.id, item.qty - 1)}
                              style={{ width: 26, height: 26, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              −
                            </button>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.qty + 1)}
                              style={{ width: 26, height: 26, background: 'rgba(255,180,0,0.1)', border: '1px solid rgba(255,180,0,0.25)', color: 'var(--gold)', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              +
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button onClick={() => removeItem(item.id)}
                          style={{ background: 'none', border: 'none', color: 'rgba(232,48,42,0.6)', cursor: 'pointer', fontSize: 18, padding: '0 4px', alignSelf: 'flex-start', transition: 'color .3s' }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,48,42,0.6)'}
                        >✕</button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: '24px', borderTop: '1px solid rgba(255,180,0,0.15)', background: 'rgba(8,13,20,0.9)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>ESTIMATED TOTAL</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: 'var(--gold)' }}>₹{subtotal.toLocaleString()}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button
                    onClick={() => { setIsOpen(false); window.location.href = '/checkout'; }}
                    className="btn-gold"
                    style={{ width: '100%', justifyContent: 'center', fontSize: 14, padding: '16px' }}
                  >
                    🚀 PROCEED TO CHECKOUT
                  </button>
                  <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: 12, padding: '12px' }}>
                    📋 REQUEST BULK QUOTE
                  </button>
                  <button onClick={clearCart} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 11, cursor: 'pointer', marginTop: 10, textDecoration: 'underline' }}>
                    Clear All Items
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
