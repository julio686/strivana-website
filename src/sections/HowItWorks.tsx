import { useRef, useEffect, useState } from 'react';
import { ClipboardList, Users, MessageSquare, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Tell Us Your Needs',
    description: 'Fill out a quick form about the tasks you need help with, preferred skills, and work schedule. Takes less than 5 minutes.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    number: '02',
    icon: Users,
    title: 'We Match Candidates',
    description: 'Our team reviews your requirements and handpicks 2-3 pre-vetted VAs from our network who match your specific needs.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Interview & Select',
    description: 'Meet your matched candidates via video call. Ask questions, assess their skills, and choose the perfect fit for your business.',
    color: 'bg-green-100 text-green-600',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Start Working Together',
    description: 'Your VA starts within 24-48 hours. We handle contracts, payments setup, and onboarding. You focus on delegating tasks.',
    color: 'bg-orange-100 text-orange-600',
  },
];

const HowItWorks = () => {
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

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-strivana-purple/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-strivana-purple/10 rounded-full text-strivana-purple text-sm font-medium mb-6">
            <span>Simple Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-strivana-dark mb-4">
            How It{' '}
            <span className="text-strivana-purple">Works</span>
          </h2>
          <p className="text-lg text-strivana-gray">
            Get matched with your perfect virtual assistant in 4 simple steps. 
            No long contracts, no complicated paperwork.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Connector line (hidden on mobile, visible on lg) */}
                {index < steps.length - 1 && (
                  <div 
                    className={`hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-strivana-purple/30 to-transparent z-0 transition-all duration-1000 ${
                      isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                    style={{ 
                      transitionDelay: `${(index + 1) * 200}ms`,
                      transformOrigin: 'left'
                    }}
                  />
                )}

                <div className="relative z-10 group cursor-default">
                  {/* Step number */}
                  <div className="text-5xl font-display font-bold text-gray-100 mb-4 group-hover:text-strivana-purple/20 transition-colors duration-300">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-semibold text-strivana-dark mb-3 group-hover:text-strivana-purple transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-strivana-gray text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-strivana-purple-light/50 rounded-2xl">
            <div className="text-left">
              <p className="font-semibold text-strivana-dark">Ready to get started?</p>
              <p className="text-sm text-strivana-gray">Most clients are matched within 48 hours.</p>
            </div>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-6 py-3 bg-strivana-purple text-white font-medium rounded-full hover:bg-strivana-purple-dark transition-all duration-300 hover:shadow-glow whitespace-nowrap"
            >
              Start Your Search
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <div className="text-3xl font-display font-bold text-strivana-purple">48h</div>
            <p className="text-sm text-strivana-gray">Average Match Time</p>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-strivana-purple">95%</div>
            <p className="text-sm text-strivana-gray">Client Satisfaction</p>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-strivana-purple">3</div>
            <p className="text-sm text-strivana-gray">Candidates Provided</p>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-strivana-purple">0</div>
            <p className="text-sm text-strivana-gray">Ongoing Agency Fees</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
