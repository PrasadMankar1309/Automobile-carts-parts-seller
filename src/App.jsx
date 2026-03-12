import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BrandsPage from './pages/BrandsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import DealerDashboard from './pages/DealerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import './index.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Page Transition Wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Layout for main pages (with navbar + footer)
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <CartSidebar />
      <main style={{ minHeight: '80vh' }}>{children}</main>
      <Footer />
    </>
  );
}

// Layout for dashboard pages (with navbar but different footer or none)
function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <CartSidebar />
      <main style={{ minHeight: '80vh' }}>{children}</main>
    </>
  );
}

// Layout for auth pages (no navbar/footer)
function AuthLayout({ children }) {
  return <>{children}</>;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Auth pages */}
          <Route path="/login" element={<AuthLayout><PageTransition><LoginPage /></PageTransition></AuthLayout>} />

          {/* Dashboards */}
          <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
          <Route path="/dealer-dashboard" element={<PageTransition><DealerDashboard /></PageTransition>} />
          <Route path="/dashboard" element={<DashboardLayout><PageTransition><CustomerDashboard /></PageTransition></DashboardLayout>} />

          {/* Main pages */}
          <Route path="/" element={<MainLayout><PageTransition><HomePage /></PageTransition></MainLayout>} />
          <Route path="/products" element={<MainLayout><PageTransition><ProductsPage /></PageTransition></MainLayout>} />
          <Route path="/products/:id" element={<MainLayout><PageTransition><ProductDetailPage /></PageTransition></MainLayout>} />
          <Route path="/checkout" element={<MainLayout><PageTransition><CheckoutPage /></PageTransition></MainLayout>} />
          <Route path="/order-confirmation" element={<MainLayout><PageTransition><OrderConfirmationPage /></PageTransition></MainLayout>} />
          <Route path="/track-order" element={<MainLayout><PageTransition><OrderTrackingPage /></PageTransition></MainLayout>} />

          <Route path="/brands" element={<MainLayout><PageTransition><BrandsPage /></PageTransition></MainLayout>} />
          <Route path="/services" element={<MainLayout><PageTransition><ServicesPage /></PageTransition></MainLayout>} />
          <Route path="/about" element={<MainLayout><PageTransition><AboutPage /></PageTransition></MainLayout>} />
          <Route path="/contact" element={<MainLayout><PageTransition><ContactPage /></PageTransition></MainLayout>} />

          {/* 404 */}
          <Route path="*" element={
            <MainLayout>
              <PageTransition>
                <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, paddingTop: 110 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 80, fontWeight: 900, color: 'rgba(255,180,0,0.2)' }}>404</div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 22, color: 'var(--text-secondary)' }}>Page Not Found</div>
                  <Link to="/" className="btn-gold" style={{ fontSize: 13 }}>← Back to Home</Link>
                </div>
              </PageTransition>
            </MainLayout>
          } />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [isSystemLoading, setIsSystemLoading] = useState(true);

  useEffect(() => {
    // Simulate system check/loading
    const timer = setTimeout(() => {
      setIsSystemLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          {isSystemLoading && <LoadingScreen />}
          <AppRoutes />
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

