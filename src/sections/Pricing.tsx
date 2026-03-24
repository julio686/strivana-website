import { useEffect, useRef, useState } from 'react';
import { Check, Star, ArrowRight, Zap } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  priceUnit: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  icon: React.ElementType;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$10-12',
    priceUnit: '/hour',
    description: 'Perfect for small businesses and professionals getting started with virtual assistance.',
    features: [
      '20 hours of VA service/month',
      'Email & calendar management',
      'Data entry & document creation',
      'Basic research tasks',
      'Phone support',
      'Same-day response time',
    ],
    cta: 'Get Started',
    icon: Zap,
  },
  {
    name: 'Professional',
    price: '$13-17',
    priceUnit: '/hour',
    description: 'Ideal for growing businesses that need comprehensive support and specialized skills.',
    features: [
      '40 hours of VA service/month',
      'All Starter features included',
      'Social media management',
      'Travel planning & booking',
      'Customer service support',
      'Priority task handling',
      'Dedicated account manager',
    ],
    highlighted: true,
    cta: 'Most Popular',
    icon: Star,
  },
  {
    name: 'Executive',
    price: '$18+',
    priceUnit: '/hour',
    description: 'Tailored for executives and enterprises requiring premium, white-glove service.',
    features: [
      'Full-time dedicated VA',
      'All Professional features included',
      'Project management',
      'Advanced research & analysis',
      'Event planning & coordination',
      '24/7 availability options',
      'Custom workflow integration',
    ],
    cta: 'Contact Us',
    icon: Star,
  },
];

const Pricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white via-strivana-purple-light/20 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-strivana-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-strivana-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-strivana-purple/10 rounded-full text-strivana-purple text-sm font-medium mb-6">
            <span>Simple Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-strivana-dark mb-4">
            One Flat Fee.{' '}
            <span className="text-strivana-purple">No Hidden Costs.</span>
          </h2>
          <p className="text-lg text-strivana-gray max-w-2xl mx-auto">
            You pay your VA directly. We charge a one-time placement fee only after you hire. 
            No monthly fees, no markups, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={plan.name}
                className={`relative group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${isHighlighted ? 'md:-mt-4 md:mb-4' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Popular Badge */}
                {isHighlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1 bg-strivana-purple text-white text-sm font-medium rounded-full animate-pulse-glow">
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`h-full rounded-3xl p-6 lg:p-8 transition-all duration-300 ${
                    isHighlighted
                      ? 'bg-strivana-purple text-white shadow-glow-lg scale-105'
                      : 'bg-white border border-gray-100 hover:border-strivana-purple/30 hover:shadow-soft-lg'
                  }`}
                >
                  {/* Plan Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isHighlighted ? 'bg-white/20' : 'bg-strivana-purple-light'
                    }`}>
                      <Icon size={20} className={isHighlighted ? 'text-white' : 'text-strivana-purple'} />
                    </div>
                    <h3 className={`text-lg font-display font-semibold ${
                      isHighlighted ? 'text-white' : 'text-strivana-dark'
                    }`}>
                      {plan.name} Plan
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className={`text-4xl lg:text-5xl font-display font-bold ${
                      isHighlighted ? 'text-white' : 'text-strivana-dark'
                    }`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${
                      isHighlighted ? 'text-white/80' : 'text-strivana-gray'
                    }`}>
                      {plan.priceUnit}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`text-sm mb-6 ${
                    isHighlighted ? 'text-white/80' : 'text-strivana-gray'
                  }`}>
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isHighlighted ? 'bg-white/20' : 'bg-strivana-purple-light'
                        }`}>
                          <Check size={12} className={isHighlighted ? 'text-white' : 'text-strivana-purple'} />
                        </div>
                        <span className={`text-sm ${
                          isHighlighted ? 'text-white/90' : 'text-strivana-gray'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      const element = document.querySelector('#contact');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3 px-6 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 group ${
                      isHighlighted
                        ? 'bg-white text-strivana-purple hover:bg-strivana-purple-light'
                        : 'bg-strivana-purple text-white hover:bg-strivana-purple-dark hover:shadow-glow'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className={`mt-16 flex flex-wrap justify-center gap-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-2 text-strivana-gray">
            <Check size={18} className="text-green-500" />
            <span className="text-sm">No setup fees</span>
          </div>
          <div className="flex items-center gap-2 text-strivana-gray">
            <Check size={18} className="text-green-500" />
            <span className="text-sm">Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2 text-strivana-gray">
            <Check size={18} className="text-green-500" />
            <span className="text-sm">7-day satisfaction guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-strivana-gray">
            <Check size={18} className="text-green-500" />
            <span className="text-sm">Secure payment</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
