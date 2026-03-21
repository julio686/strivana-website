import { useRef, useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Thank you! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-strivana-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-strivana-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* CTA Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-strivana-dark mb-4">
            Ready to{' '}
            <span className="text-strivana-purple">get started?</span>
          </h2>
          <p className="text-lg text-strivana-gray max-w-2xl mx-auto">
            Schedule a consultation and let us discuss how we can help you achieve your goals. 
            Our team is ready to match you with the perfect virtual assistant.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Contact Info & Illustration */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {/* Illustration */}
            <div className="relative mb-8">
              <div className="bg-gradient-to-br from-strivana-purple-light to-strivana-purple/10 rounded-3xl p-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-strivana-yellow/30 rounded-full animate-float" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-strivana-purple/20 rounded-full animate-float-slow" />
                
                {/* Phone illustration */}
                <div className="relative z-10 flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-48 bg-strivana-dark rounded-3xl flex items-center justify-center shadow-soft-lg">
                      <Phone size={48} className="text-white" />
                    </div>
                    {/* Chat bubble */}
                    <div className="absolute -top-4 -right-8 bg-strivana-yellow text-strivana-dark px-4 py-2 rounded-xl rounded-bl-sm text-sm font-medium animate-float">
                      Let us talk!
                    </div>
                  </div>
                </div>

                {/* Decorative sparkles */}
                <svg className="absolute top-8 left-8 w-6 h-6 text-strivana-purple animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
                </svg>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-strivana-purple-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-strivana-purple" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-strivana-dark mb-1">Phone</h4>
                  <p className="text-strivana-gray text-sm">+1 (555) 123-4567</p>
                  <p className="text-strivana-gray text-xs">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-strivana-purple-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-strivana-purple" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-strivana-dark mb-1">Email</h4>
                  <p className="text-strivana-gray text-sm">hello@strivana.com</p>
                  <p className="text-strivana-gray text-xs">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-strivana-purple-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-strivana-purple" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-strivana-dark mb-1">Location</h4>
                  <p className="text-strivana-gray text-sm">Serving US & Canada</p>
                  <p className="text-strivana-gray text-xs">Same time zone support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-soft-lg">
              <h3 className="text-xl font-display font-semibold text-strivana-dark mb-6">
                Send us a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-strivana-dark mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-strivana-dark mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-strivana-dark mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-strivana-dark mb-2">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm resize-none"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-strivana-purple text-white font-medium rounded-xl hover:bg-strivana-purple-dark transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-glow"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-strivana-gray text-center mt-4">
                By submitting, you agree to our{' '}
                <a href="#" className="text-strivana-purple hover:underline">Privacy Policy</a>
                {' '}and{' '}
                <a href="#" className="text-strivana-purple hover:underline">Terms of Service</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
