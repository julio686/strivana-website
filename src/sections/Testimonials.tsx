import { useRef, useEffect, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO',
    company: 'TechStart Inc.',
    content: 'I was drowning in emails and calendar chaos before Strivana. My VA Maria took over inbox management and scheduling, and within a week I had hours back in my day. She even caught a conflicting meeting I had double-booked. Worth every penny.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Founder',
    company: 'GrowthLabs',
    content: 'Hiring through Strivana saved us about $40K annually compared to a local hire. But honestly? The quality surprised me most. My VA handles customer support, data entry, and even helps with our newsletter. Fluent English, same time zone, zero issues.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'Brandify',
    content: 'We needed someone who could jump in fast during our product launch. Strivana matched us with a VA who had actual marketing experience. She managed our social calendar, coordinated with influencers, and kept everything on track. Game changer.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'David Thompson',
    role: 'Owner',
    company: 'Thompson & Co.',
    content: 'I run a small law practice and was skeptical about remote help. My VA from Strivana manages client intake, schedules consultations, and handles billing follow-ups. She speaks better English than some local candidates I interviewed. Highly recommend.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    name: 'Jennifer Park',
    role: 'Consultant',
    company: 'JP Consulting',
    content: 'The placement process was super smooth. I interviewed two candidates, picked my favorite, and she started the next week. When I had questions about payment setup, Strivana\'s team walked me through everything. Great experience overall.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate active index based on scroll position
      const cardWidth = 400; // approximate card width + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, testimonials.length - 1));
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollability, { passive: true });
      checkScrollability();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollability);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white via-strivana-purple-light/10 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-strivana-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-strivana-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-strivana-dark mb-4">
              What Our{' '}
              <span className="text-strivana-purple">Clients</span>{' '}
              Are Saying
            </h2>
            <p className="text-lg text-strivana-gray max-w-xl">
              Do not just take our word for it. Here is what business owners and executives say about working with Strivana.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'border-strivana-purple text-strivana-purple hover:bg-strivana-purple hover:text-white'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'border-strivana-purple text-strivana-purple hover:bg-strivana-purple hover:text-white'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          className={`flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[350px] md:w-[400px] snap-start"
            >
              <div className="h-full bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 hover:border-strivana-purple/30 hover:shadow-soft-lg transition-all duration-300 group">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote size={32} className="text-strivana-purple/30" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-strivana-yellow text-strivana-yellow" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-strivana-gray text-sm leading-relaxed mb-6 line-clamp-5">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-display font-semibold text-strivana-dark">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-strivana-gray">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className={`flex justify-center gap-2 mt-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = 416; // card width + gap
                  scrollRef.current.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-strivana-purple w-6' : 'bg-strivana-purple/30 w-2 hover:bg-strivana-purple/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
