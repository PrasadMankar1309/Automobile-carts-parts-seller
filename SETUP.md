# ✅ SEVEN EYES DISTRIBUTION — SETUP GUIDE

## The Problem You Had
You ran `npm run dev` but got "Missing script: dev" — because the old package.json used
Create React App (`react-scripts`) which only has `npm start`, not `npm run dev`.

This has been fixed. The project now uses **Vite** which supports `npm run dev`.

---

## 📋 EXACT STEPS TO RUN

### Step 1 — Make sure Node.js is installed
Open PowerShell / CMD and check:
```
node -v
```
Should show v16 or higher. If not, download from: https://nodejs.org

---

### Step 2 — Create a new folder and set up the project

```powershell
# Option A: Start fresh (recommended)
mkdir C:\dev\seven-eyes
cd C:\dev\seven-eyes
```

---

### Step 3 — Extract the ZIP into that folder
Your folder should look like this after extracting:
```
seven-eyes/
├── index.html          ← ROOT level (NOT inside /public)
├── vite.config.js
├── package.json
├── src/
│   ├── index.jsx
│   ├── index.css
│   ├── App.jsx
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   └── pages/
```

---

### Step 4 — Install dependencies

```powershell
cd C:\dev\seven-eyes
npm install
```

This installs: react, react-dom, react-router-dom, framer-motion, vite

---

### Step 5 — Run the development server

```powershell
npm run dev
```

✅ Opens at: **http://localhost:3000**

---

### Step 6 — Build for production (when ready to deploy)

```powershell
npm run build
```

Outputs to `dist/` folder. Upload `dist/` to your hosting.

---

## 🛑 COMMON ERRORS & FIXES

| Error | Fix |
|-------|-----|
| `Missing script: "dev"` | You had old package.json. Use the new ZIP. |
| `Cannot find module 'react-scripts'` | Old CRA project. Use `npm install` with new package.json. |
| `ENOENT: no such file` | Make sure `index.html` is in ROOT folder, not `/public`. |
| `Port 3000 already in use` | Run `npm run dev -- --port 3001` |
| White screen / blank page | Open browser console (F12) and check errors. |
| Images not loading | Normal on first load — Unsplash images load from internet. |

---

## 🔑 LOGIN CREDENTIALS

| Role | Email | Password | Redirects To |
|------|-------|----------|--------------|
| Admin | admin@seveneyes.com | admin123 | /admin |
| User | any@email.com | (6+ chars) | / |

---

## 📁 FILE STRUCTURE EXPLAINED

```
index.html          → Vite entry HTML (MUST be in root)
vite.config.js      → Vite configuration
package.json        → Dependencies + scripts

src/
├── index.jsx       → App entry point (mounts React)
├── index.css       → All global styles + CSS variables + animations
├── App.jsx         → React Router setup + all routes

├── context/
│   ├── CartContext.jsx      → Cart state: add/remove/qty
│   └── ProductsContext.jsx  → Products state: admin can add products

├── data/
│   └── index.js             → ALL company data from PDF
│                              (products, brands, services, contact info)

├── hooks/
│   └── useScrollReveal.js   → Scroll-triggered animation hook

├── components/
│   ├── Navbar.jsx       → Top nav with cart badge, mobile hamburger
│   ├── Footer.jsx       → Site footer with links + contact
│   ├── CartSidebar.jsx  → Animated slide-out cart panel
│   └── UI.jsx           → Reusable: SectionLabel, GradientText, Gear, Stars

└── pages/
    ├── HomePage.jsx     → Hero + parallax + all sections
    ├── ProductsPage.jsx → Gallery + search + filter + 3 view modes
    ├── BrandsPage.jsx   → Brand grid + origin filter
    ├── ServicesPage.jsx → Services + value added + FAQ
    ├── AboutPage.jsx    → Timeline + stats + address
    ├── ContactPage.jsx  → Form + WhatsApp + direct call
    ├── LoginPage.jsx    → Glassmorphism login page
    └── AdminPage.jsx    → Add products + view all products
```

---

## 🌐 ALL ROUTES

| URL | Page |
|-----|------|
| http://localhost:3000/ | Home |
| http://localhost:3000/products | Products Gallery |
| http://localhost:3000/brands | Brand Partners |
| http://localhost:3000/services | Services |
| http://localhost:3000/about | About Us |
| http://localhost:3000/contact | Contact |
| http://localhost:3000/login | Login |
| http://localhost:3000/admin | Admin Dashboard |

---

## 🎨 CUSTOMIZING

**Change phone/email/address:**
Edit `src/data/index.js` → `CONTACT` object

**Add a brand:**
Edit `src/data/index.js` → add to `BRANDS` array

**Add a product category:**
Edit `src/data/index.js` → add to `PRODUCT_CATEGORIES` array

**Change gold color accent:**
Edit `src/index.css` → `--gold: #FFB400;`

---

## 🚀 DEPLOY TO NETLIFY (Free)

1. Run `npm run build` → creates `dist/` folder
2. Go to https://app.netlify.com/drop
3. Drag and drop the `dist/` folder
4. Your site is live in seconds! 🎉
