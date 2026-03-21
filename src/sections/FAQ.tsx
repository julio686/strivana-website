import { useState, useRef, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'How do I get started with your services?',
    answer: 'Getting started is easy! Simply schedule a free consultation through our website. During the call, we will discuss your needs, match you with the perfect VA, and set up your account. You can start working with your VA within 24-48 hours.',
  },
  {
    question: 'How do you ensure the confidentiality of my information?',
    answer: 'We take data security seriously. All our VAs sign comprehensive NDAs, and we use enterprise-grade encryption for all communications. We also offer secure file sharing and can work within your existing security protocols. Our systems are GDPR and HIPAA compliant where applicable.',
  },
  {
    question: 'What are your working hours and availability?',
    answer: 'Our VAs work in US and Canada time zones, providing same-day turnaround for most tasks. Starter and Professional plans include business hours support (9 AM - 6 PM), while our Executive plan offers extended or 24/7 availability options to meet your specific needs.',
  },
  {
    question: 'How do you handle communication and task management?',
    answer: 'We adapt to your preferred communication style - whether that is email, Slack, Microsoft Teams, or phone. For task management, we can use your existing tools (Asana, Trello, Monday.com) or provide access to our project management system. You will have a dedicated account manager for any escalations.',
  },
  {
    question: 'What if I need to cancel or change my plan?',
    answer: 'We offer flexible month-to-month contracts with no long-term commitments. You can upgrade, downgrade, or cancel your plan at any time with 7 days notice. We also provide a 7-day satisfaction guarantee for new clients - if you are not satisfied, we will refund your first week.',
  },
  {
    question: 'How are your VAs vetted and trained?',
    answer: 'All our VAs go through a rigorous selection process including background checks, skills assessments, and multiple interviews. They are university-educated professionals with at least 3 years of experience. We provide ongoing training and certification programs to ensure they stay current with industry best practices.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Illustration & Header */}
          <div className={`lg:sticky lg:top-32 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              {/* Illustration */}
              <div className="relative w-full max-w-md mx-auto lg:mx-0">
                <div className="bg-strivana-light rounded-3xl p-8 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-strivana-yellow/30 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-strivana-purple/20 rounded-full" />
                  
                  {/* Main illustration content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-32 h-32 bg-white rounded-2xl shadow-soft flex items-center justify-center mb-4">
                      <HelpCircle size={64} className="text-strivana-yellow" />
                    </div>
                    <div className="w-24 h-8 bg-strivana-purple/10 rounded-full flex items-center justify-center">
                      <div className="w-16 h-2 bg-strivana-purple/30 rounded-full" />
                    </div>
                  </div>

                  {/* Magnifying glass decoration */}
                  <div className="absolute bottom-8 right-8 animate-float-slow">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-strivana-gray/30">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Header */}
              <div className="mt-8 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-strivana-dark mb-4">
                  Have questions?{' '}
                  <span className="text-strivana-purple">I have answers!</span>
                </h2>
                <p className="text-strivana-gray">
                  Can not find what you are looking for? Feel free to reach out to our team for personalized assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Accordion */}
          <div className={`space-y-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'border-strivana-purple bg-strivana-purple-light/30'
                    : 'border-gray-100 bg-white hover:border-strivana-purple/30'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className={`font-medium pr-4 transition-colors ${
                    openIndex === index ? 'text-strivana-purple' : 'text-strivana-dark'
                  }`}>
                    {item.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-strivana-purple text-white rotate-180'
                      : 'bg-strivana-light text-strivana-gray'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5">
                    <p className="text-strivana-gray text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Help CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-strivana-purple-light to-strivana-blue/20 rounded-2xl">
              <h4 className="font-display font-semibold text-strivana-dark mb-2">
                Still have questions?
              </h4>
              <p className="text-sm text-strivana-gray mb-4">
                Our team is here to help. Reach out and we will get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-strivana-purple hover:text-strivana-purple-dark transition-colors"
              >
                Contact Support
                <ChevronDown size={16} className="-rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
