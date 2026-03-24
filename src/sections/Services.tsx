import { useEffect, useRef, useState } from 'react';
import { 
  Plane, 
  Calendar, 
  ShoppingBag, 
  Search, 
  Mail, 
  Share2,
  ArrowRight
} from 'lucide-react';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const services: Service[] = [
  {
    icon: Mail,
    title: 'Executive Assistance',
    description: 'Inbox zero, calendar management, travel coordination, and administrative tasks. Your VA handles the details so you can focus on strategy and growth.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    description: 'Content creation, scheduling, community engagement, and analytics reporting. Build your brand presence across Instagram, LinkedIn, Facebook, and more.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Calendar,
    title: 'Customer Support',
    description: 'Email and chat support, ticket management, FAQ responses, and customer onboarding. Keep your customers happy with prompt, professional service.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Search,
    title: 'Research & Data',
    description: 'Market research, competitor analysis, lead generation, and data entry. Get accurate, organized information to make informed business decisions.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Support',
    description: 'Product listing management, order processing, inventory tracking, and review monitoring. Scale your online store without the overhead.',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: Plane,
    title: 'Specialized Skills',
    description: 'Bookkeeping, graphic design, video editing, project management, and more. Access specialized talent matched to your specific needs.',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll('.service-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-strivana-purple-light/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-strivana-purple/10 rounded-full text-strivana-purple text-sm font-medium mb-6">
            <span>What We Do</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-strivana-dark mb-4">
            Services That{' '}
            <span className="text-strivana-purple">Scale</span>{' '}
            Your Business
          </h2>
          <p className="text-lg text-strivana-gray max-w-2xl mx-auto">
            From day-to-day admin to specialized projects, our VAs handle the tasks 
            that slow you down so you can focus on growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleCards.includes(index);
            const isOdd = index % 2 === 1;

            return (
              <div
                key={service.title}
                data-index={index}
                className={`service-card group relative bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:border-strivana-purple/30 hover:shadow-soft-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${isOdd ? 'lg:mt-8' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon size={28} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-strivana-dark mb-3 group-hover:text-strivana-purple transition-colors">
                  {service.title}
                </h3>
                <p className="text-strivana-gray text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <button 
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-strivana-purple opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                >
                  Get this service
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-strivana-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-strivana-gray mb-4">
            Need something specific? We will match you with a VA who has exactly the skills you need.
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-strivana-dark text-white font-medium rounded-full hover:bg-strivana-purple transition-colors duration-300"
          >
            Discuss Your Needs
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
