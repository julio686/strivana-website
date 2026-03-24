import { useState, useRef, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What countries do you hire from?',
    answer: 'We focus on Latin America for our Virtual Assistants. Our Latin American VAs are especially popular with US businesses, thanks to their exceptional English fluency with minimal accents, strong cultural alignment with US business practices, and convenient time zone overlap with North America.',
  },
  {
    question: 'How do taxes & payroll work when hiring Virtual Assistants?',
    answer: 'We handle all payroll and compliance requirements for your Virtual Assistant. This means you can focus on growing your business while we handle tax compliance, payroll processing, legal requirements, and international payment regulations. It is a simple, worry-free solution that ensures everything is managed properly and legally.',
  },
  {
    question: 'How do you get paid?',
    answer: 'It is simple – we charge a one-time flat fee, but only after you have found your perfect match. Whatever hourly pay you decide to pay goes directly to the Virtual Assistant you hire.',
  },
  {
    question: 'What is the difference between Staffing and Recruiting Agencies?',
    answer: 'Staffing agencies charge monthly fees but only pay a small portion to Virtual Assistants. This often results in lower quality talent, as skilled VAs avoid arrangements where agencies keep a large chunk of their earnings. At Strivana, we charge just one flat fee after you hire. Your Virtual Assistant receives 100% of what you pay them directly. This attracts higher-quality talent and eliminates ongoing middleman costs, saving you money while getting better results.',
  },
  {
    question: 'What if I have questions and need help after hiring?',
    answer: 'After hiring your Virtual Assistant, you will have access to a dedicated Customer Success Manager who will help ensure your success. They are here to assist with reviewing performance, monitoring progress, training guidance, and any other questions or requests.',
  },
  {
    question: 'How much does the average Virtual Assistant cost?',
    answer: 'Our Starter plan VAs are $10-12/hour, Professional is $13-17/hour, and Executive is $18+/hour. These rates include everything – the VA\'s pay, our one-time placement fee is already factored in, and there are no hidden charges or ongoing fees. The VA receives 100% of their agreed hourly rate.',
  },
  {
    question: 'Do they work for me or for Strivana?',
    answer: 'The Virtual Assistant works directly for you while we make it simple and compliant. Your Virtual Assistant is your direct team member. We handle all payroll and legal paperwork. You save thousands annually with no ongoing agency fees. Everything stays fully compliant without the administrative hassle. It is the best of both worlds – direct hires with none of the complex paperwork or compliance concerns.',
  },
  {
    question: 'What if they do not turn out to be a good fit?',
    answer: 'While it is rare to have issues since candidates are thoroughly vetted by both our team and you, we understand the importance of finding the right fit. That is why we offer a 6-month replacement guarantee at no extra cost. We also offer unlimited candidate interviews to ensure you find the best match. This double-screening process helps ensure quality matches prior to hiring an applicant, and our guarantee gives you extra peace of mind that you will find the right Virtual Assistant for your business.',
  },
  {
    question: 'How is their English and Communication skills?',
    answer: 'We maintain extremely high standards for English fluency. All candidates must submit an English voice recording. We review hundreds of applications daily, and we only select those with fluent English and minimal accents. Only the best communicators make it through our screening. This strict vetting process for language skills means you will work with a Virtual Assistant who communicates clearly and professionally from day one.',
  },
  {
    question: 'What time zone will they be working in?',
    answer: 'Your Virtual Assistant will work according to your schedule and time zone. They are accustomed to US hours, and you get to set the working hours that best fit your needs.',
  },
  {
    question: 'Can I start with Part Time?',
    answer: 'Yes, you can start with either part-time or full-time. The minimum is 20 hours per week, as our most qualified Virtual Assistants prefer stable positions with consistent hours.',
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
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
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
