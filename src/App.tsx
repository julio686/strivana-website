import { useEffect, useState } from 'react';
import './App.css';
import { Toaster } from 'sonner';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import LogoBar from './sections/LogoBar';
import Services from './sections/Services';
import HowItWorks from './sections/HowItWorks';
import WhyStrivana from './sections/WhyStrivana';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import Testimonials from './sections/Testimonials';
import Careers from './sections/Careers';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import ChatBot from './components/ChatBot';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [showChat, setShowChat] = useState(false);
  console.log('Build timestamp: 2026-03-24-v4-NoSupabase');

  useEffect(() => {
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
        <LogoBar />
        <Services />
        <HowItWorks />
        <WhyStrivana />
        <Pricing />
        <FAQ />
        <Testimonials />
        <Careers />
        <CTA />
      </main>
      <Footer />

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
      <ScrollToTop />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
