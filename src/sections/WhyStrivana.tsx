import { useRef, useEffect, useState } from 'react';
import { Check, X, DollarSign, Clock, Users, Shield } from 'lucide-react';

const comparisonData = [
  {
    feature: 'Recruiting Fee',
    strivana: 'One-time flat fee',
    traditional: '$15K-30K (staffing agencies)',
    freelance: 'Platform fees (20%+)',
    icon: DollarSign,
  },
  {
    feature: 'Time to Hire',
    strivana: '48 hours',
    traditional: '4-8 weeks',
    freelance: '1-3 weeks',
    icon: Clock,
  },
  {
    feature: 'Candidate Quality',
    strivana: 'Pre-vetted, tested',
    traditional: 'Variable',
    freelance: 'Unpredictable',
    icon: Users,
  },
  {
    feature: 'Ongoing Costs',
    strivana: 'None',
    traditional: 'Monthly markup',
    freelance: 'Platform fees',
    icon: DollarSign,
  },
  {
    feature: 'Compliance & Payroll',
    strivana: 'We handle it',
    traditional: 'You handle it',
    freelance: 'You handle it',
    icon: Shield,
  },
  {
    feature: 'Replacement Guarantee',
    strivana: '6 months',
    traditional: 'Rare',
    freelance: 'None',
    icon: Shield,
  },
];

const WhyStrivana = () => {
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
      id="why-strivana"
      ref={sectionRef}
      className="py-24 bg-strivana-dark relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-strivana-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-strivana-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-strivana-purple/20 rounded-full text-strivana-purple text-sm font-medium mb-6">
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Strivana vs.{' '}
            <span className="text-strivana-purple">The Alternatives</span>
          </h2>
          <p className="text-lg text-gray-400">
            See why 150+ businesses choose our model over traditional hiring and freelance platforms.
          </p>
        </div>

        {/* Comparison Table */}
        <div className={`overflow-x-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Feature</th>
                <th className="text-center py-4 px-4 bg-strivana-purple/20 rounded-t-lg">
                  <span className="text-strivana-purple font-semibold">Strivana</span>
                </th>
                <th className="text-center py-4 px-4 text-gray-400 font-medium">Staffing Agencies</th>
                <th className="text-center py-4 px-4 text-gray-400 font-medium">Freelance Platforms</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr 
                  key={row.feature} 
                  className="border-b border-gray-800 hover:bg-white/5 transition-colors"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                        <row.icon size={16} className="text-strivana-purple" />
                      </div>
                      <span className="text-white font-medium">{row.feature}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 bg-strivana-purple/10">
                    <div className="flex items-center justify-center gap-2">
                      <Check size={18} className="text-green-400 flex-shrink-0" />
                      <span className="text-white font-medium">{row.strivana}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <X size={18} className="text-red-400 flex-shrink-0" />
                      <span className="text-gray-400">{row.traditional}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <X size={18} className="text-red-400 flex-shrink-0" />
                      <span className="text-gray-400">{row.freelance}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { value: '$15K+', label: 'Average savings vs agency' },
            { value: '4 weeks', label: 'Faster than traditional hire' },
            { value: '95%', label: 'First-match success rate' },
            { value: '0', label: 'Ongoing fees or markups' },
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-strivana-purple/50 transition-colors"
              style={{ transitionDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="text-3xl font-display font-bold text-strivana-purple mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStrivana;
