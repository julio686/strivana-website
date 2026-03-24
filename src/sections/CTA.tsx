import { useRef, useEffect, useState } from 'react';
import { Mail, MapPin, Send, Loader2, MessageCircle } from 'lucide-react';
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getFieldError = (field: string, value: string) => {
    if (!touched[field]) return '';
    if (field === 'email' && value && !validateEmail(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using FormSubmit.co - sends directly to your email
      // First submission requires email verification, then it works automatically
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);
      
      const response = await fetch('https://formsubmit.co/ajax/julio@strivanallc.com', {
        method: 'POST',
        body: formDataObj
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true || response.ok) {
        toast.success('Thank you! We will get back to you within 24 hours.');
        setFormData({ name: '', email: '', company: '', message: '' });
        setIsSubmitted(true);
        form.reset();
        // Reset success state after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form error:', error);
      toast.error('Form submission failed. Please email us directly at info@strivanallc.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-strivana-purple-light via-white to-strivana-blue-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Info */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-strivana-purple/10 rounded-full text-strivana-purple text-sm font-medium mb-6">
              <Mail size={16} />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-strivana-dark mb-6">
              Ready to Get Your Time{' '}
              <span className="text-strivana-purple">Back?</span>
            </h2>

            <p className="text-lg text-strivana-gray mb-8 leading-relaxed">
              Tell us what you need help with. We will match you with 2-3 pre-vetted VAs within 48 hours. 
              No commitment required to meet candidates.
            </p>

            {/* Illustration */}
            <div className="relative mb-8">
              <div className="bg-gradient-to-br from-strivana-purple-light to-strivana-purple/10 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 w-20 h-20 bg-strivana-yellow/30 rounded-full animate-float" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-strivana-purple/20 rounded-full animate-float-slow" />
                
                <div className="relative z-10 flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-48 bg-strivana-dark rounded-3xl flex items-center justify-center shadow-soft-lg">
                      <MessageCircle size={48} className="text-white" />
                    </div>
                    <div className="absolute -top-4 -right-8 bg-strivana-yellow text-strivana-dark px-4 py-2 rounded-xl rounded-bl-sm text-sm font-medium animate-float">
                      Let us talk!
                    </div>
                  </div>
                </div>

                <svg className="absolute top-8 left-8 w-6 h-6 text-strivana-purple animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
                </svg>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-strivana-purple-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-strivana-purple" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-strivana-dark mb-1">Email</h4>
                  <p className="text-strivana-gray text-sm">info@strivanallc.com</p>
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

          {/* Right Column - Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-soft-lg">
              <h3 className="text-2xl font-display font-bold text-strivana-dark mb-2">
                Send Us a Message
              </h3>
              <p className="text-strivana-gray text-sm mb-8">
                Fill out the form below and we will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Hidden fields for FormSubmit.co */}
                <input type="hidden" name="_subject" value={`New Contact Form from ${formData.name || 'Website Visitor'}`} />
                <input type="hidden" name="_cc" value="george@strivanallc.com,info@strivanallc.com" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_autoresponse" value="Thank you for contacting Strivana! We have received your message and will get back to you within 24 hours." />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-strivana-dark mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-strivana-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all text-sm ${
                      getFieldError('email', formData.email)
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                        : 'border-gray-200 focus:border-strivana-purple focus:ring-strivana-purple/20'
                    }`}
                    placeholder="john@company.com"
                  />
                  {getFieldError('email', formData.email) && (
                    <p className="mt-1 text-sm text-red-500">{getFieldError('email', formData.email)}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-strivana-dark mb-2">
                    Company Name <span className="text-gray-400 font-normal">(optional)</span>
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
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="message" className="block text-sm font-medium text-strivana-dark">
                      How Can We Help? *
                    </label>
                    <span className={`text-xs ${formData.message.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
                      {formData.message.length}/1000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    maxLength={1000}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm resize-none"
                    placeholder="Tell us what tasks you need help with, how many hours per week, and any specific skills required..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-4 px-6 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-glow ${
                    isSubmitted 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-strivana-purple hover:bg-strivana-purple-dark text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-xs text-strivana-gray text-center">
                  By submitting, you agree to our privacy policy. We will never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
