import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 5, y: y * 5 });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-white via-strivana-purple-light/30 to-white"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-strivana-purple/10 rounded-full animate-float-slow" />
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-strivana-yellow/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-strivana-blue/20 rounded-full animate-float-slow" style={{ animationDelay: '0.5s' }} />
        
        {/* Decorative lines */}
        <svg className="absolute top-1/4 right-0 w-64 h-64 text-strivana-purple/10 animate-spin-slow" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-strivana-purple/10 rounded-full animate-slide-in-left">
              <span className="w-2 h-2 bg-strivana-purple rounded-full animate-pulse" />
              <span className="text-sm font-medium text-strivana-purple">Trusted by 150+ Businesses</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-strivana-dark leading-tight animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              Hire Elite Virtual{' '}
              <span className="text-strivana-purple">Assistants</span>{' '}
              From Latin America
            </h1>

            <p className="text-lg text-strivana-gray max-w-lg animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              University-educated professionals, fluent English, US time zones. 
              Save 70% on staffing costs without compromising quality.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => scrollToSection('#contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-strivana-purple text-white font-medium rounded-full hover:bg-strivana-purple-dark transition-all duration-300 hover:shadow-glow hover:scale-105"
              >
                <Calendar size={18} />
                Schedule a Consultation
              </button>
              <button
                onClick={() => scrollToSection('#pricing')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-strivana-dark font-medium border-2 border-strivana-dark/20 rounded-full hover:border-strivana-purple hover:text-strivana-purple transition-all duration-300 group"
              >
                See Pricing
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 text-sm text-strivana-gray">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Pre-vetted talent</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-strivana-gray">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Same time zone</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-strivana-gray">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No ongoing fees</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4 animate-slide-in-left" style={{ animationDelay: '0.5s' }}>
              <div>
                <div className="text-3xl font-display font-bold text-strivana-purple">150+</div>
                <div className="text-sm text-strivana-gray">Businesses Served</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-strivana-purple">70%</div>
                <div className="text-sm text-strivana-gray">Cost Savings</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-strivana-purple">48h</div>
                <div className="text-sm text-strivana-gray">Time to Hire</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image with Chat Bubbles */}
          <div 
            className="relative lg:h-[600px] flex items-center justify-center animate-slide-in-right"
            style={{ 
              animationDelay: '0.2s',
              transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`
            }}
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Purple background shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-strivana-purple-light to-strivana-purple/20 rounded-3xl transform rotate-3 scale-105" />
              
              {/* Decorative circles */}
              <svg className="absolute -top-8 -right-8 w-32 h-32 text-strivana-purple/20 animate-spin-slow" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>

              {/* Main Hero Image */}
              <div className="relative bg-strivana-purple-light rounded-3xl overflow-hidden shadow-soft-lg">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&crop=face"
                  alt="Professional Virtual Assistant"
                  className="w-full max-w-md h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23E0E7FF" width="400" height="500"/%3E%3Ctext fill="%236366F1" font-family="sans-serif" font-size="24" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EVirtual Assistant%3C/text%3E%3C/svg%3E';
                  }}
                />
                
                {/* Decorative elements overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="absolute top-4 right-4 w-8 h-8 text-strivana-purple animate-float" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 12l9.5-9.5L12 3l9.5 9.5L12 22 2 12z"/>
                  </svg>
                </div>
              </div>

              {/* Chat Bubble 1 - Client */}
              <div className="absolute -top-4 -left-8 sm:left-4 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="bg-strivana-yellow text-strivana-dark px-4 py-3 rounded-2xl rounded-bl-sm shadow-soft max-w-[180px]">
                  <p className="text-sm font-medium">Hi! Can you help with my calendar?</p>
                </div>
              </div>

              {/* Chat Bubble 2 - VA Response */}
              <div className="absolute bottom-20 -right-4 sm:right-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-white text-strivana-dark px-4 py-3 rounded-2xl rounded-br-sm shadow-soft max-w-[200px]">
                  <p className="text-sm">Of course! I'll organize your schedule right away.</p>
                </div>
              </div>

              {/* Paper airplane decoration */}
              <div className="absolute top-1/4 -right-8 animate-float-slow">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-strivana-purple">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </div>

              {/* Small avatar decoration */}
              <div className="absolute -bottom-4 right-8 w-16 h-16 rounded-full border-4 border-white shadow-soft overflow-hidden animate-float" style={{ animationDelay: '0.3s' }}>
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
