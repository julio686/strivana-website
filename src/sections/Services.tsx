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
    icon: Plane,
    title: 'Travel Planning',
    description: 'I will handle all aspects of your travel arrangements, from booking flights and hotels to organizing transportation and creating detailed itineraries. Enjoy stress-free travel with my expert planning.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Calendar,
    title: 'Appointment Scheduling',
    description: 'I will ensure your calendar stays organized and up-to-date. I will schedule, reschedule, and send reminders for all your appointments, ensuring you stay on track with your commitments effortlessly.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: ShoppingBag,
    title: 'Personal Shopping',
    description: "Whether it's finding the perfect gift or handling your grocery shopping, I will make purchasing decisions easy and efficient. I will handle everything from research to purchase, ensuring you get exactly what you need.",
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: Search,
    title: 'Research Assistance',
    description: 'Need information fast? I will conduct thorough research on any topic, providing you with accurate and detailed reports, summaries, and data analysis tailored to your needs.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Mail,
    title: 'Email Management',
    description: 'Overwhelmed by emails? Let me manage your inbox. With all my effort, I will sort, prioritize, and respond to messages on your behalf, so you can focus on what matters most.',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    description: 'I will maintain a vibrant social media presence for you. I will create, schedule, and manage your posts, engage with your followers, and analyze performance metrics to boost your online impact.',
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-strivana-dark mb-4">
            Discover Our{' '}
            <span className="text-strivana-purple">Premium</span>{' '}
            Services
          </h2>
          <p className="text-lg text-strivana-gray max-w-2xl mx-auto">
            From executive assistance to specialized support, we provide comprehensive virtual assistant services tailored to your business needs.
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
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
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
                <button className="inline-flex items-center gap-2 text-sm font-medium text-strivana-purple opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Learn More
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
            Need a custom solution? We can tailor our services to your specific requirements.
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-strivana-dark text-white font-medium rounded-full hover:bg-strivana-purple transition-colors duration-300"
          >
            Get a Custom Quote
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
