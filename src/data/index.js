// ── Products from PDF ──────────────────────────────────────────────────────
export const PRODUCT_CATEGORIES = [
  'All',
  'Hand Tools',
  'Power Tools',
  'Special Tools',
  'Hydraulic Tools',
  'Pneumatic Tools',
  'Machines & Equipment',
  'Abrasives & Adhesives',
  'Garage Equipment',
  'Consumables',
];

export const PRODUCTS = [
  // HAND TOOLS
  {
    id: 1, cat: 'Hand Tools', tag: 'BESTSELLER', color: '#FFB400',
    title: 'Ring & Open-End Spanners',
    items: ['Ring Spanner', 'Double Open-End Spanner', 'Combination Spanner Set'],
    desc: 'Professional chrome-vanadium spanners for all automotive fastener applications.',
    img: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80',
    brand: 'Stanley / Eastman',
  },
  {
    id: 2, cat: 'Hand Tools', tag: 'POPULAR', color: '#FFB400',
    title: 'Screwdrivers & Pliers Set',
    items: ['Screwdrivers', 'Pliers', 'Ratchets', 'Wire Cutters'],
    desc: 'Complete workshop screwdriver and plier sets in hardened chrome steel.',
    img: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80',
    brand: 'Stanley / Snap-on',
  },
  {
    id: 3, cat: 'Hand Tools', tag: 'NEW', color: '#FFB400',
    title: 'Ratchet & Socket Set',
    items: ['3/8" Drive Ratchet', '1/2" Drive Ratchet', 'Socket Sets', 'Extensions'],
    desc: 'High-torque ratchets and deep/shallow socket sets for professional use.',
    img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80',
    brand: 'Snap-on / Force',
  },
  // POWER TOOLS
  {
    id: 4, cat: 'Power Tools', tag: 'HOT', color: '#E8302A',
    title: 'Drill Machine',
    items: ['Corded Drill', 'Hammer Drill', 'SDS Drill', 'Drill Bit Sets'],
    desc: 'Professional corded and cordless drill machines for metal, wood and masonry.',
    img: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80',
    brand: 'Bosch / Stanley',
  },
  {
    id: 5, cat: 'Power Tools', tag: 'POPULAR', color: '#E8302A',
    title: 'Hand Grinder & Bench Grinder',
    items: ['4" Angle Grinder', '7" Angle Grinder', 'Bench Grinder 6"', 'Grinding Discs'],
    desc: 'High-power angle grinders and bench grinders for cutting, grinding and polishing.',
    img: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80',
    brand: 'Bosch / Stanley',
  },
  {
    id: 6, cat: 'Power Tools', tag: 'NEW', color: '#E8302A',
    title: 'Heat Gun & Accessories',
    items: ['1500W Heat Gun', '2000W Heat Gun', 'Nozzle Attachments', 'Temperature Controller'],
    desc: 'Variable temperature heat guns for paint stripping, shrink wrapping and drying.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    brand: 'Bosch / Stanley',
  },
  // SPECIAL TOOLS
  {
    id: 7, cat: 'Special Tools', tag: 'FEATURED', color: '#00D4FF',
    title: 'Torque Wrench Set',
    items: ['1/4" Torque Wrench', '3/8" Torque Wrench', '1/2" Torque Wrench', 'Torque Adapter'],
    desc: 'Click-type and digital torque wrenches calibrated to industry standards.',
    img: 'https://images.unsplash.com/photo-1609221521563-a56041440b34?w=600&q=80',
    brand: 'Snap-on / Eastman',
  },
  {
    id: 8, cat: 'Special Tools', tag: 'POPULAR', color: '#00D4FF',
    title: 'Battery Charger & Tester',
    items: ['Smart Battery Charger 12V', 'Battery Load Tester', '12/24V Maintainer', 'Jump Starter'],
    desc: 'Professional battery chargers and diagnostic testers for all vehicle batteries.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    brand: 'Stanley / De Neers',
  },
  {
    id: 9, cat: 'Special Tools', tag: 'PRO', color: '#00D4FF',
    title: 'Axle Stand & Engine Crane',
    items: ['Axle Stand Pair 2T', 'Axle Stand 3T', 'Engine Crane 1T', 'Bench Press'],
    desc: 'Heavy-duty workshop support stands and engine cranes for vehicle servicing.',
    img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
    brand: 'Force / De Neers',
  },
  // HYDRAULIC TOOLS
  {
    id: 10, cat: 'Hydraulic Tools', tag: 'BESTSELLER', color: '#22C55E',
    title: 'Trolley Jack & Floor Jack',
    items: ['2T Trolley Jack', '3T Trolley Jack', 'Low-Profile Jack', 'Bottle Jack'],
    desc: 'Professional hydraulic floor jacks with rapid lift and safety overload valves.',
    img: 'https://images.unsplash.com/photo-1612859938407-19b49b5e73c6?w=600&q=80',
    brand: 'Force / De Neers',
  },
  {
    id: 11, cat: 'Hydraulic Tools', tag: 'POPULAR', color: '#22C55E',
    title: 'Transmission Jack',
    items: ['Transmission Jack 500kg', 'Gearbox Stand', 'Hydraulic Press 10T', 'Shop Press'],
    desc: 'Heavy-duty hydraulic transmission and workshop press systems.',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
    brand: 'Force',
  },
  // PNEUMATIC TOOLS
  {
    id: 12, cat: 'Pneumatic Tools', tag: 'HOT', color: '#A855F7',
    title: 'Impact Wrench',
    items: ['1/2" Impact Wrench', '3/4" Impact Wrench', 'Impact Sockets', 'Air Ratchet'],
    desc: 'High-torque pneumatic impact wrenches for fast tyre and bolt removal.',
    img: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80',
    brand: 'Snap-on / Force',
  },
  {
    id: 13, cat: 'Pneumatic Tools', tag: 'POPULAR', color: '#A855F7',
    title: 'Spiral Coil Hose & FRL Unit',
    items: ['Spiral Air Hose 10m', 'FRL Filter Regulator', 'QRC Quick Couplings', 'Air Blow Gun'],
    desc: 'Complete pneumatic accessories: FRL units, coil hoses, and quick couplers.',
    img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80',
    brand: 'Eastman',
  },
  // MACHINES & EQUIPMENT
  {
    id: 14, cat: 'Machines & Equipment', tag: 'FEATURED', color: '#FF8C00',
    title: 'Tyre Changer & Wheel Balancer',
    items: ['Tyre Changer Machine', 'Wheel Balancer', 'Tyre Inflator', 'Bead Breaker'],
    desc: 'Professional tyre servicing equipment for all vehicle tyre sizes.',
    img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
    brand: 'Force / De Neers',
  },
  {
    id: 15, cat: 'Machines & Equipment', tag: 'PRO', color: '#FF8C00',
    title: 'Vehicle Lift — All Types',
    items: ['2-Post Lift 3T', '4-Post Alignment Lift', 'Scissor Lift', 'Mobile Column Lift'],
    desc: 'Full range of workshop vehicle lifts from 2-post to 4-post alignment systems.',
    img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80',
    brand: 'De Neers / Force',
  },
  {
    id: 16, cat: 'Machines & Equipment', tag: 'NEW', color: '#FF8C00',
    title: 'Vacuum Cleaner & Dust Extractor',
    items: ['Industrial Vacuum 30L', 'Dust Extractor', 'Dry/Wet Vacuum', 'HEPA Filter Unit'],
    desc: 'Heavy-duty workshop vacuum and dust extraction systems by Mirka.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    brand: 'Mirka',
  },
  {
    id: 17, cat: 'Machines & Equipment', tag: 'HOT', color: '#FF8C00',
    title: 'Plasma Cutter & MIG Welder',
    items: ['Plasma Cutter 40A', 'MIG Welding Wire', 'Spot Welding Machine', 'MIG Welder 200A'],
    desc: 'Industrial plasma cutting and MIG welding machines for automotive fabrication.',
    img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
    brand: 'Bosch / Stanley',
  },
  {
    id: 18, cat: 'Machines & Equipment', tag: 'POPULAR', color: '#FF8C00',
    title: 'Paint Booth & AC Machine',
    items: ['Spray Paint Booth', 'AC Recovery Machine', 'Orbital Sander', 'DA Polisher'],
    desc: 'Complete paint application and automotive air-conditioning service equipment.',
    img: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80',
    brand: 'Mirka / Force',
  },
  // ABRASIVES & ADHESIVES
  {
    id: 19, cat: 'Abrasives & Adhesives', tag: 'STOCK', color: '#F97316',
    title: 'Abrasive Discs & Sandpaper',
    items: ['Sanding Discs P80–P2000', 'Velcro Sanding Pad', 'Flap Disc 40–120G', 'Sanding Belts'],
    desc: 'Full range of Norton abrasive discs, sheets and belts for automotive bodywork.',
    img: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80',
    brand: 'Norton (Saint-Gobain) / Mirka',
  },
  {
    id: 20, cat: 'Abrasives & Adhesives', tag: 'POPULAR', color: '#F97316',
    title: 'Henkel & Sika Adhesives',
    items: ['Structural Adhesive', 'Panel Bonding Adhesive', 'Windscreen Sealant', 'Thread Locker'],
    desc: 'Professional Henkel Loctite and Sika adhesives, sealants and bonding agents.',
    img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80',
    brand: 'Henkel / Sika',
  },
  // GARAGE EQUIPMENT
  {
    id: 21, cat: 'Garage Equipment', tag: 'FEATURED', color: '#38BDF8',
    title: 'Workshop Tool Cabinet',
    items: ['7-Drawer Tool Chest', '5-Drawer Cabinet', 'Top Chest', 'Combo Set'],
    desc: 'Heavy-duty steel tool storage cabinets with anti-corrosion coating.',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
    brand: 'Snap-on / Stanley',
  },
  {
    id: 22, cat: 'Garage Equipment', tag: 'NEW', color: '#38BDF8',
    title: 'Wheel Alignment System',
    items: ['4-Wheel Alignment', 'Camber & Caster Gauge', 'Turn Plates', 'Computer System'],
    desc: 'Professional computerized 4-wheel alignment system with HD camera sensors.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    brand: 'De Neers',
  },
  // CONSUMABLES
  {
    id: 23, cat: 'Consumables', tag: 'STOCK', color: '#6B7280',
    title: 'Washing Area Consumables',
    items: ['Car Shampoo', 'Degreaser', 'Wheel Cleaner', 'Glass Cleaner'],
    desc: 'Professional washing area consumables for automotive detailing and cleaning.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    brand: 'Henkel / Sika',
  },
  {
    id: 24, cat: 'Consumables', tag: 'POPULAR', color: '#6B7280',
    title: 'Automotive Welding Consumables',
    items: ['MIG Wire 0.8mm', 'MIG Wire 1.0mm', 'TIG Rod', 'Welding Electrodes'],
    desc: 'Premium welding consumables for MIG, TIG and stick welding applications.',
    img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
    brand: 'Bosch / Eastman',
  },
];

// ── Brands from PDF ────────────────────────────────────────────────────────
export const BRANDS = [
  { name: 'SNAP-ON', tag: 'Professional Tools', origin: 'American', logo: '🔩', color: '#E8302A', desc: 'The world\'s #1 professional tool brand. Premium hand tools, power tools and diagnostic equipment.' },
  { name: 'STANLEY', tag: 'Hand Tools & Storage', origin: 'American', logo: '🔧', color: '#FFB400', desc: 'Over 175 years of trusted hand tools, storage solutions and accessories for professionals.' },
  { name: 'EASTMAN', tag: 'Hand Tools', origin: 'Indian', logo: '🪛', color: '#22C55E', desc: 'India\'s premier industrial hand tools manufacturer with ISO-certified quality standards.' },
  { name: 'NORTON', tag: 'Abrasives & Grinding', origin: 'American', logo: '⭕', color: '#00A2E8', desc: 'Saint-Gobain Norton — the world leader in bonded and coated abrasive products.' },
  { name: 'MIRKA', tag: 'Sanding & Finishing', origin: 'Finnish', logo: '✨', color: '#FFB400', desc: 'Finnish precision abrasives and dust-free sanding systems for automotive finishing.' },
  { name: 'HENKEL', tag: 'Adhesives & Sealants', origin: 'German', logo: '🧪', color: '#E8302A', desc: 'Loctite, Teroson and Bonderite — the world\'s leading adhesive and sealant brand.' },
  { name: 'SIKA', tag: 'Bonding & Sealing', origin: 'Swiss', logo: '🔺', color: '#E8302A', desc: 'Swiss engineering excellence in automotive bonding, sealing and coating solutions.' },
  { name: 'FORCE', tag: 'Garage Equipment', origin: 'Indian', logo: '⚡', color: '#FF8C00', desc: 'Leading manufacturer of workshop equipment, jacks, lifts and automotive tools.' },
  { name: 'DE NEERS', tag: 'Best Ever Tools', origin: 'Indian', logo: '🏆', color: '#22C55E', desc: 'Premium Indian tool brand — De Neers means "Best Ever Tools" in quality and value.' },
  { name: 'TAPARIA', tag: 'Hand Tools', origin: 'Indian', logo: '🔑', color: '#3B82F6', desc: 'India\'s most trusted hand tools brand with 60+ years of manufacturing excellence.' },
  { name: 'BOSCH', tag: 'Power Tools & Auto', origin: 'German', logo: '⚙️', color: '#0070AC', desc: 'German engineering excellence in power tools, automotive parts and diagnostic systems.' },
];

// ── Services ───────────────────────────────────────────────────────────────
export const SERVICES = [
  { icon: '📞', title: 'Technical Support', desc: 'Dedicated helpline for immediate technical assistance on all products we supply. Expert guidance for installation, troubleshooting and operation.', stat: '24/7' },
  { icon: '🔧', title: 'On-Site Repairs', desc: 'Rapid response field engineers with genuine spare parts for on-site equipment repairs and maintenance at your workshop or facility.', stat: 'Fast Response' },
  { icon: '🛡️', title: 'Warranty Management', desc: 'Full handling of manufacturer warranties including claims processing, repair coordination and replacement management.', stat: 'Full Cover' },
  { icon: '🎓', title: 'User Training', desc: 'Specialized training programs for safe and efficient equipment operation — OSHA-aligned workshops with certified trainers.', stat: 'CPD Cert' },
  { icon: '✨', title: 'Ceramic Coating', desc: 'Professional nano-ceramic paint protection coating application for long-lasting gloss and scratch resistance.', stat: 'Value Add' },
  { icon: '🚿', title: 'Interior Cleaning', desc: 'Deep interior valeting and sanitisation services using professional-grade detailing chemicals and equipment.', stat: 'Value Add' },
  { icon: '🔩', title: 'Engine Lacquering', desc: 'High-temperature engine bay lacquering and coating for corrosion protection and enhanced appearance.', stat: 'Value Add' },
  { icon: '🛡️', title: 'Underbody Coating', desc: 'Rubberized underbody protection coating to prevent rust, reduce road noise and protect chassis components.', stat: 'Value Add' },
];

// ── Contact Info from PDF ───────────────────────────────────────────────────
export const CONTACT = {
  gst: '27AHOPG8728Q1ZD',
  address: '51, Nath Gajanan Apartment, Opp. Sony Showroom, Near Chandrashekhar Azad Square, C.A. Road, Nagpur-440032, Maharashtra (India)',
  phones: ['+91-7888246020', '+91-9922923373', '+91-9823894019'],
  email: 'seveneyesdis@gmail.com',
};

// ── Testimonials ───────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  { name: 'Rajesh Sharma', role: 'Workshop Owner, AutoFix Nagpur', rating: 5, text: 'Seven Eyes has been our exclusive Snap-on tool supplier for 5 years. The quality and after-sales support are unmatched in Nagpur. Highly recommended for any professional workshop.' },
  { name: 'Anand Patil', role: 'Fleet Manager, Maharashtra Transport', rating: 5, text: 'We source all our hydraulic tools and garage equipment through Seven Eyes. Their technical team is excellent — fast delivery and genuine products always.' },
  { name: 'Vikram Desai', role: 'Service Center Manager, AutoPro', rating: 5, text: 'Best Norton abrasives and Mirka sanding products supplier in the region. The warranty management service saved us a lot of time and money. Excellent team.' },
];

// ── Value Added (Service Plus from PDF) ───────────────────────────────────
export const SERVICE_PLUS = [
  { icon: '🪟', name: 'Window Dresser', desc: 'Professional rubber and seal dresser for window surrounds' },
  { icon: '🔧', name: 'Synthetic Grease', desc: 'High-temperature synthetic grease for precision applications' },
  { icon: '🔋', name: 'Battery Terminal Protector', desc: 'Anti-corrosion terminal protection spray and caps' },
  { icon: '⚡', name: 'Electrical Contact Cleaner', desc: 'Fast-acting electronic contact cleaner for connections' },
];
