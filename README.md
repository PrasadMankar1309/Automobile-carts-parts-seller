# Seven Eyes Distribution — Complete Website

Premium industrial automotive website for Seven Eyes Distribution, Nagpur.

---

## 🚀 QUICK START

### 1. Install Node.js
Download from: https://nodejs.org (v18 or higher)

### 2. Create the project
```bash
npx create-react-app seven-eyes-distribution
cd seven-eyes-distribution
```

### 3. Install dependencies
```bash
npm install react-router-dom framer-motion
```

### 4. Replace all files
Copy all the provided source files into the `src/` folder and `public/` folder as shown in the structure below.

### 5. Run the development server
```bash
npm start
```
Opens at: http://localhost:3000

### 6. Build for production
```bash
npm run build
```

---

## 📦 NPM PACKAGES TO INSTALL

```bash
npm install react-router-dom framer-motion
```

That's it. All other dependencies (React, ReactDOM) come with Create React App.

---

## 📁 COMPLETE FOLDER STRUCTURE

```
seven-eyes-distribution/
│
├── public/
│   └── index.html                    ← HTML entry point
│
├── src/
│   ├── index.js                      ← React app entry point
│   ├── index.css                     ← Global styles, CSS variables, animations
│   ├── App.jsx                       ← Main app with React Router routes
│   │
│   ├── context/
│   │   ├── CartContext.jsx           ← Global cart state (add/remove/qty)
│   │   └── ProductsContext.jsx       ← Global products state (admin can add)
│   │
│   ├── data/
│   │   └── index.js                  ← All company data from PDF (products, brands, services, contact)
│   │
│   ├── hooks/
│   │   └── useScrollReveal.js        ← Intersection Observer scroll reveal hook
│   │
│   ├── components/
│   │   ├── Navbar.jsx                ← Sticky navbar with cart badge, mobile menu
│   │   ├── Footer.jsx                ← Full footer with links and contact
│   │   ├── CartSidebar.jsx           ← Animated cart slide-out panel
│   │   └── UI.jsx                    ← Shared: SectionLabel, SectionTitle, GradientText, Gear, Stars
│   │
│   └── pages/
│       ├── HomePage.jsx              ← Hero + parallax + ticker + products + services + brands + testimonials
│       ├── ProductsPage.jsx          ← Full gallery with filters (grid/masonry/list), search, add to cart
│       ├── BrandsPage.jsx            ← Brand gallery with origin filter
│       ├── ServicesPage.jsx          ← Services + value added + process + FAQ
│       ├── AboutPage.jsx             ← Mission/vision + timeline + stats + address
│       ├── ContactPage.jsx           ← Contact form + info + quick call buttons
│       ├── LoginPage.jsx             ← Glassmorphism login with industrial BG
│       └── AdminPage.jsx             ← Admin dashboard: view/filter products + add new product
│
└── package.json
```

---

## 🌐 PAGES & ROUTES

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, about strip, featured products, services, brands, testimonials |
| `/products` | Products | Full gallery with search + category filter + 3 view modes |
| `/brands` | Brands | All 11 brand partners with origin filter |
| `/services` | Services | Core services + value added + service plus + FAQ |
| `/about` | About | Mission/vision, timeline, stats, company address |
| `/contact` | Contact | Inquiry form + direct call/WhatsApp buttons |
| `/login` | Login | Industrial glassmorphism login page |
| `/admin` | Admin | Dashboard: product management + add new product |

---

## 🔐 LOGIN CREDENTIALS (Demo)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@seveneyes.com | admin123 |
| User | any@email.com | any 6+ char password |

---

## 🛒 CART / INQUIRY SYSTEM

- Click "Add to Inquiry" on any product card
- Cart icon appears in navbar with item count badge
- Cart sidebar slides out from right
- Users can adjust quantity or remove items
- "Send Inquiry Request" simulates B2B quote submission
- No payment gateway needed (B2B inquiry system)

---

## 👨‍💼 ADMIN FEATURES

- Access at `/admin` (login as admin first)
- View all products with search and category filter
- Add new product with: name, category, brand, description, image URL
- New products appear instantly on the Products page
- State is in-memory (resets on page refresh — connect backend for persistence)

---

## 🎨 DESIGN SYSTEM

### Colors (CSS Variables)
```css
--gold: #FFB400        /* Primary accent */
--gold-light: #FFD060  /* Light gold */
--red: #E8302A         /* Danger/highlight */
--cyan: #00D4FF        /* Secondary accent */
--bg0: #050709         /* Darkest background */
--bg1: #080D14         /* Section background */
--bg2: #0C1420         /* Card background */
--bg3: #111927         /* Elevated surface */
```

### Fonts
```
Orbitron    → Display headlines (H1, H2, logo)
Rajdhani    → Subheadings, nav links, buttons
Exo 2       → Body text, descriptions
Share Tech Mono → Labels, tags, monospace
```

### Animations
- `framer-motion` — Page transitions, card hovers, counter animations
- `IntersectionObserver` — Scroll reveal for all sections
- CSS `@keyframes` — Gear rotation, ticker, glow pulse, scan line

---

## 🔧 CUSTOMIZATION

### Add a new brand:
In `src/data/index.js`, add to `BRANDS` array:
```js
{ name: 'YOUR BRAND', tag: 'Category', origin: 'Country', logo: '🔧', color: '#FFB400', desc: 'Description here.' }
```

### Add a new product category:
In `src/data/index.js`, add to `PRODUCT_CATEGORIES` array.

### Change contact details:
Edit `CONTACT` object in `src/data/index.js`.

### Change colors:
Edit CSS variables in `src/index.css` `:root` block.

---

## 📱 RESPONSIVE BREAKPOINTS

- Mobile: < 768px (hide desktop nav, full-width cart, single column grids)
- Tablet: 769px – 1024px (auto-fit grids adapt)
- Desktop: 1025px+ (full layout)

---

## 🏢 COMPANY INFO (from PDF)

**Seven Eyes Distribution**
- GST: 27AHOPG8728Q1ZD
- Address: 51, Nath Gajanan Apartment, Opp. Sony Showroom, Near Chandrashekhar Azad Square, C.A. Road, Nagpur-440032
- Phones: +91-7888246020, +91-9922923373, +91-9823894019
- Email: seveneyesdis@gmail.com

**Authorized Brands:** Snap-on, Stanley, Eastman, Norton (Saint-Gobain), Mirka, Henkel, Sika, Force, De Neers, Taparia, Bosch

---

## 🚀 DEPLOYMENT

```bash
npm run build
# Upload the `build/` folder to your hosting (Netlify, Vercel, cPanel)
```

For Netlify: Drag & drop the `build/` folder at netlify.com/drop
