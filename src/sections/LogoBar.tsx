import { useRef, useEffect, useState } from 'react';

// Using company name text instead of actual logos for simplicity
const companies = [
  'TechStart Inc.',
  'GrowthLabs',
  'Brandify',
  'Thompson & Co.',
  'JP Consulting',
  'Nexus Digital',
  'Elevate Partners',
  'Summit Advisors',
];

const LogoBar = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-white border-y border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className={`text-center text-sm text-strivana-gray mb-8 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Trusted by forward-thinking companies
        </p>
        
        <div className={`flex flex-wrap justify-center items-center gap-x-12 gap-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {companies.map((company, index) => (
            <div
              key={company}
              className="text-lg font-display font-semibold text-gray-300 hover:text-strivana-gray transition-colors duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {company}
            </div>
          ))}
        </div>

        <div className={`mt-8 flex justify-center gap-8 text-sm text-strivana-gray transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-strivana-purple to-strivana-purple-light border-2 border-white"
                />
              ))}
            </div>
            <span>150+ companies hired</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★★★★★</span>
            <span>4.9/5 average rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoBar;
