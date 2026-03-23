import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import ChatBot from './components/ChatBot';
import AdminLayout from './admin/AdminLayout';
import Careers from './pages/Careers';

// Main website content
const MainWebsite = () => {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <FAQ />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      
      {/* Chat Bot */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-strivana-purple text-white rounded-full shadow-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center hover:scale-110"
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
      
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}

      {/* Admin Link (hidden in footer for easy access) */}
      <a 
        href="#admin" 
        className="fixed bottom-6 left-6 z-40 w-10 h-10 bg-gray-800 text-white rounded-full shadow-lg hover:bg-strivana-purple transition-all duration-300 flex items-center justify-center opacity-50 hover:opacity-100"
        title="Admin Dashboard"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      </a>
    </div>
  );
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Router wrapper
const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainWebsite />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="*" element={<MainWebsite />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if we're on the admin route
    const checkAdminRoute = () => {
      const hash = window.location.hash;
      setIsAdmin(hash === '#admin' || hash.startsWith('#admin/'));
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);

    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, []);

  // Render Admin Layout
  if (isAdmin) {
    return <AdminLayout />;
  }

  // Render Main Website with Router
  return <AppRouter />;
}

export default App;
