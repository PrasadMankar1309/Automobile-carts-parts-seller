import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel, SectionTitle, GradientText } from '../components/UI';
import { SERVICES, SERVICE_PLUS } from '../data';
import ServiceBookingModal from '../components/ServiceBookingModal';

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', background: 'rgba(255,255,255,.03)', border: 'none', padding: '18px 22px', color: 'var(--text-primary)', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background .3s' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,180,0,.04)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.03)'}
      >
        <span>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} style={{ color: 'var(--gold)', fontSize: 22, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0 }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{ padding: '14px 22px 18px', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75 }}>{a}</p>
      </motion.div>
    </div>
  );
}

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleBookClick = (name) => {
    setSelectedService(name);
    setIsModalOpen(true);
  };

  return (
    <div style={{ paddingTop: 110 }}>
      <ServiceBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService}
      />

      {/* Header */}
      <div style={{ background: 'var(--bg1)', padding: '52px 0 44px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'relative', maxWidth: 1300, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.2em', color: 'var(--gold)', marginBottom: 12 }}>// OUR SERVICES</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,58px)', fontWeight: 900 }}>
            Precision <GradientText>Industrial Support</GradientText>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, maxWidth: 500, fontSize: 15 }}>
            Expert solutions and dedicated sales support for world-class industrial performance.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '60px 28px 80px' }}>
        {/* Main services */}
        <div style={{ marginBottom: 100 }}>
          <SectionLabel text="Core Service Divisions" />
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <SectionTitle><GradientText>World-Class</GradientText> Capability</SectionTitle>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} className="service-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <span style={{ fontSize: 34, marginBottom: 18, display: 'block' }}>{s.icon}</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 19, color: 'var(--text-primary)' }}>{s.title}</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--gold)', background: 'rgba(255,180,0,.1)', padding: '3px 8px', border: '1px solid rgba(255,180,0,.2)', letterSpacing: '.08em' }}>{s.stat}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, flexGrow: 1 }}>{s.desc}</p>
                <button
                  onClick={() => handleBookClick(s.title)}
                  className="btn-outline"
                  style={{ width: '100%', fontSize: 11, padding: '10px 0', justifyContent: 'center' }}
                >
                  Book Service
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Value Added Services */}
        <div style={{ marginBottom: 100 }}>
          <SectionLabel text="Premium Automotive Care" />
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <SectionTitle>Detailing & <GradientText>Surface Protection</GradientText></SectionTitle>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { icon: '✨', n: 'Ceramic Coating', d: 'Nano-ceramic paint protection coating for long-lasting gloss and scratch resistance.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
              { icon: '🛡️', n: 'PPF Installation', d: 'Self-healing paint protection film installation for premium vehicle protection.', img: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&q=80' },
              { icon: '🚿', n: 'Paint Correction', d: 'Professional compound and polish restoration for dulled automotive paintwork.', img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80' },
              { icon: '🧹', n: 'Interior Detailing', d: 'Deep interior valeting and sanitisation with professional-grade equipment.', img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80' },
              { icon: '🔩', n: 'Engine Protection', d: 'High-temperature engine bay lacquering for corrosion protection and aesthetics.', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80' },
              { icon: '🛡️', n: 'Chassis Coating', d: 'Rubberised underbody protection to prevent rust and reduce road noise.', img: 'https://images.unsplash.com/photo-1612859938407-19b49b5e73c6?w=400&q=80' },
            ].map((v, i) => (
              <motion.div key={v.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                style={{ background: 'var(--bg2)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'all .4s' }}
              >
                <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                  <img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) saturate(0.7)', transition: 'transform .5s' }}
                    className="service-img"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,20,32,0.95), transparent)' }} />
                  <div style={{ position: 'absolute', top: 10, left: 12, fontSize: 22 }}>{v.icon}</div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 8 }}>{v.n}</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>{v.d}</p>
                  <button
                    onClick={() => handleBookClick(v.n)}
                    style={{ background: 'none', border: 'none', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '1px' }}
                  >
                    SELECT PACKAGE <span style={{ fontSize: 14 }}>→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process + FAQ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, marginBottom: 80 }}>
          <div>
            <SectionLabel text="Service Protocol" />
            <SectionTitle style={{ marginBottom: 32 }}>Our <GradientText>Process</GradientText></SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { n: '01', t: 'Initial Consultation', s: 'Understand project goals and technical specifications.' },
                { n: '02', t: 'Site/Asset Assessment', s: 'Technical review of existing infrastructure or vehicles.' },
                { n: '03', t: 'Solution Engineering', s: 'Developing custom plans and material selection.' },
                { n: '04', t: 'Execution & Support', s: 'Implementation with ongoing maintenance coverage.' },
              ].map((step, i) => (
                <motion.div key={step.n}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ display: 'flex', gap: 16, padding: '22px 0', borderBottom: '1px solid rgba(255,255,255,.05)', position: 'relative' }}
                >
                  <div style={{ width: 44, height: 44, flexShrink: 0, background: 'rgba(255,180,0,.08)', border: '1px solid rgba(255,180,0,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 900, color: 'var(--gold)' }}>{step.n}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 4 }}>{step.t}</div>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.s}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel text="Assurance" />
            <SectionTitle style={{ marginBottom: 32 }}>Expert <GradientText>Answers</GradientText></SectionTitle>
            {[
              { q: 'How do I book a service consultation?', a: 'You can use the booking buttons above or call our helpline. A dedicated manager will be assigned to your case within 2 working hours.' },
              { q: 'Do you provide on-site industrial maintenance?', a: 'Yes. Our mobile technical teams are equipped to handle on-site servicing and repairs for industrial equipment across the region.' },
              { q: 'What is the processing time for detailing?', a: 'Standard detailing takes 1-2 days, while premium coatings and PPF installation can take 3-5 days depending on vehicle size.' },
              { q: 'Is there a warranty on your services?', a: 'Absolutely. All our services come with a standard 6-month satisfaction guarantee, with extended brand warranties on specific products used.' },
            ].map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

