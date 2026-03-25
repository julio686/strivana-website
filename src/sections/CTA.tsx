import { useRef, useEffect, useState } from 'react';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

const CTA = () => {
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

          {/* Right Column - GHL Lead Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft-lg">
              <h3 className="text-2xl font-display font-bold text-strivana-dark mb-2">
                Send Us a Message
              </h3>
              <p className="text-strivana-gray text-sm mb-6">
                Fill out the form below and we will get back to you within 24 hours.
              </p>

              {/* GHL Leads Form Iframe */}
              <div className="w-full" style={{ minHeight: '1443px' }}>
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/ExjN3vXTELzzMPCIsAtV"
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: '4px' }}
                  id="inline-ExjN3vXTELzzMPCIsAtV"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Strivana Leads"
                  data-height="1443"
                  data-layout-iframe-id="inline-ExjN3vXTELzzMPCIsAtV"
                  data-form-id="ExjN3vXTELzzMPCIsAtV"
                  title="Strivana Leads"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GHL Form Embed Script */}
      <script src="https://link.msgsndr.com/js/form_embed.js" />
    </section>
  );
};

export default CTA;
