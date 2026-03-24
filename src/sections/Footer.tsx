import { Instagram, Facebook, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Executive Assistant', href: '#services' },
      { name: 'Sales & Marketing', href: '#services' },
      { name: 'Bookkeeping', href: '#services' },
      { name: 'Project Management', href: '#services' },
      { name: 'E-commerce Support', href: '#services' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#careers' },
      { name: 'For VAs', href: '#careers' },
      { name: 'Contact', href: '#contact' },
    ],
    support: [
      { name: 'FAQs', href: '#faq' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/strivana', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/strivana', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/strivana', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/strivana', label: 'Twitter' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-strivana-dark text-white relative overflow-hidden">
      {/* Top border animation */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-strivana-purple to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-6 group">
              <img 
                src="/logo.jpg" 
                alt="Strivana" 
                className="h-20 sm:h-24 w-auto transition-transform duration-300 group-hover:scale-105 object-contain rounded-lg"
                style={{ backgroundColor: 'white', padding: '4px' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('span');
                  fallback.className = 'text-3xl font-bold text-white';
                  fallback.textContent = 'Strivana';
                  e.currentTarget.parentElement?.appendChild(fallback);
                }}
              />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Strivana connects businesses with university-educated virtual assistants from Latin America. 
              Same time zone, 70% cost savings, exceptional quality.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="text-strivana-purple" />
                <span>info@strivanallc.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="text-strivana-purple" />
                <span>Serving US & Canada</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 text-sm hover:text-strivana-purple transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 text-sm hover:text-strivana-purple transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 text-sm hover:text-strivana-purple transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            Copyright © {currentYear} Strivana. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-strivana-purple hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
