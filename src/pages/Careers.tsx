import { useState, useRef, useEffect } from 'react';
import { 
  Briefcase, 
  Heart, 
  TrendingUp, 
  Clock,
  DollarSign,
  Laptop,
  Send,
  Loader2,
  CheckCircle,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

const Careers = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    linkedin: '',
    portfolio: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Pay',
      description: 'Earn $8-15/hour based on experience and skills. Weekly payments directly to your account.',
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Work from anywhere with flexible scheduling. Choose part-time or full-time based on your availability.',
    },
    {
      icon: Laptop,
      title: 'Remote First',
      description: '100% remote work environment. No commuting required. Work from the comfort of your home.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear advancement paths. Get promoted to senior roles, team lead, or specialist positions.',
    },
    {
      icon: GraduationCap,
      title: 'Training & Development',
      description: 'Free training programs, skill certifications, and ongoing professional development support.',
    },
    {
      icon: Heart,
      title: 'Great Culture',
      description: 'Join a supportive community of professionals. Regular team events and recognition programs.',
    },
  ];

  const openPositions = [
    {
      title: 'Executive Virtual Assistant',
      department: 'Administration',
      type: 'Full-time / Part-time',
      location: 'Remote (Latin America)',
      description: 'Support C-level executives with calendar management, email handling, travel coordination, and strategic projects.',
      requirements: ['3+ years executive assistant experience', 'Excellent English communication', 'Proficient in Google Workspace & Microsoft Office'],
    },
    {
      title: 'Customer Service Representative',
      department: 'Customer Support',
      type: 'Full-time / Part-time',
      location: 'Remote (Latin America)',
      description: 'Handle customer inquiries via email, chat, and phone. Provide exceptional service and resolve issues efficiently.',
      requirements: ['2+ years customer service experience', 'Native or fluent English', 'Experience with CRM systems'],
    },
    {
      title: 'Social Media Manager',
      department: 'Marketing',
      type: 'Part-time',
      location: 'Remote (Latin America)',
      description: 'Manage social media accounts, create engaging content, schedule posts, and analyze performance metrics.',
      requirements: ['2+ years social media management', 'Content creation skills', 'Knowledge of analytics tools'],
    },
    {
      title: 'Bookkeeping Assistant',
      department: 'Finance',
      type: 'Part-time',
      location: 'Remote (Latin America)',
      description: 'Assist with accounts payable/receivable, expense tracking, invoicing, and basic financial reporting.',
      requirements: ['Accounting or finance background', 'Experience with QuickBooks or similar', 'Attention to detail'],
    },
    {
      title: 'Sales Development Representative',
      department: 'Sales',
      type: 'Full-time',
      location: 'Remote (Latin America)',
      description: 'Generate leads, conduct outreach, qualify prospects, and set appointments for the sales team.',
      requirements: ['2+ years sales experience', 'Excellent communication skills', 'Results-driven mindset'],
    },
    {
      title: 'Project Coordinator',
      department: 'Operations',
      type: 'Full-time',
      location: 'Remote (Latin America)',
      description: 'Coordinate projects, manage timelines, communicate with stakeholders, and ensure deliverables are met.',
      requirements: ['3+ years project coordination experience', 'Familiarity with project management tools', 'Strong organizational skills'],
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Formspree for talent submissions
      const formDataObj = new FormData();
      formDataObj.append('fullName', formData.fullName);
      formDataObj.append('email', formData.email);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('position', formData.position);
      formDataObj.append('experience', formData.experience);
      formDataObj.append('linkedin', formData.linkedin);
      formDataObj.append('portfolio', formData.portfolio);
      formDataObj.append('message', formData.message);
      formDataObj.append('_subject', `Talent Application: ${formData.position} - ${formData.fullName}`);
      formDataObj.append('_replyto', formData.email);

      if (resumeFile) {
        formDataObj.append('attachment', resumeFile);
      }

      // Using FormSubmit.co - free, no signup required
      const formSubmitData = new FormData();
      formSubmitData.append('_subject', `Talent Application: ${formData.position} - ${formData.fullName}`);
      formSubmitData.append('fullName', formData.fullName);
      formSubmitData.append('email', formData.email);
      formSubmitData.append('phone', formData.phone);
      formSubmitData.append('position', formData.position);
      formSubmitData.append('experience', formData.experience);
      formSubmitData.append('linkedin', formData.linkedin || 'Not provided');
      formSubmitData.append('portfolio', formData.portfolio || 'Not provided');
      formSubmitData.append('message', formData.message);
      formSubmitData.append('_replyto', formData.email);
      formSubmitData.append('_cc', 'george@strivanallc.com,info@strivanallc.com');

      if (resumeFile) {
        formSubmitData.append('attachment', resumeFile);
      }

      const response = await fetch('https://formsubmit.co/ajax/julio@strivanallc.com', {
        method: 'POST',
        body: formSubmitData
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true) {
        toast.success('Application submitted successfully! We will review your application and get back to you within 3-5 business days.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          linkedin: '',
          portfolio: '',
          message: '',
        });
        setResumeFile(null);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form error:', error);
      toast.error('Something went wrong. Please try again or email us directly at info@strivanallc.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-32 pb-20 bg-gradient-to-br from-strivana-purple-light via-white to-strivana-blue-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-strivana-purple/10 rounded-full text-strivana-purple text-sm font-medium mb-6">
              <Briefcase size={16} />
              <span>Join Our Team</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-strivana-dark mb-6">
              Build Your Career with{' '}
              <span className="text-strivana-purple">Strivana</span>
            </h1>
            <p className="text-lg sm:text-xl text-strivana-gray max-w-3xl mx-auto mb-8">
              Join hundreds of talented virtual assistants from Latin America working with top US companies. 
              Enjoy competitive pay, flexible hours, and real growth opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#positions"
                className="inline-flex items-center gap-2 px-8 py-4 bg-strivana-purple text-white font-medium rounded-full hover:bg-strivana-purple-dark transition-all duration-300 hover:shadow-glow"
              >
                <Briefcase size={20} />
                View Open Positions
              </a>
              <a 
                href="#apply"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-strivana-purple font-medium rounded-full border-2 border-strivana-purple hover:bg-strivana-purple-light transition-all duration-300"
              >
                <Send size={20} />
                Submit Application
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-strivana-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'VAs Hired' },
              { number: '$8-15', label: 'Hourly Rate' },
              { number: '100%', label: 'Remote' },
              { number: '4.8/5', label: 'VA Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-strivana-gray text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-strivana-dark mb-4">
              Why Work With <span className="text-strivana-purple">Strivana?</span>
            </h2>
            <p className="text-strivana-gray max-w-2xl mx-auto">
              We are committed to creating the best remote work experience for virtual assistants in Latin America.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-strivana-purple-light/30 rounded-2xl p-8 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-strivana-purple rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-strivana-dark mb-3">
                  {benefit.title}
                </h3>
                <p className="text-strivana-gray text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-24 bg-strivana-purple-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-strivana-dark mb-4">
              Open <span className="text-strivana-purple">Positions</span>
            </h2>
            <p className="text-strivana-gray max-w-2xl mx-auto">
              Find the perfect role that matches your skills and career goals. All positions are 100% remote.
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-xl font-display font-semibold text-strivana-dark">
                        {position.title}
                      </h3>
                      <span className="px-3 py-1 bg-strivana-purple/10 text-strivana-purple text-xs font-medium rounded-full">
                        {position.department}
                      </span>
                    </div>
                    <p className="text-strivana-gray mb-4">{position.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-strivana-gray mb-4">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {position.location}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-strivana-dark">Requirements:</p>
                      <ul className="space-y-1">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2 text-sm text-strivana-gray">
                            <CheckCircle size={14} className="text-strivana-purple mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <a
                    href="#apply"
                    onClick={() => setFormData(prev => ({ ...prev, position: position.title }))}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-strivana-purple text-white font-medium rounded-xl hover:bg-strivana-purple-dark transition-all duration-300 whitespace-nowrap"
                  >
                    Apply Now
                    <Send size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-strivana-dark mb-4">
              Apply <span className="text-strivana-purple">Now</span>
            </h2>
            <p className="text-strivana-gray">
              Fill out the form below and we will get back to you within 3-5 business days.
            </p>
          </div>

          <div className="bg-strivana-purple-light/20 rounded-3xl p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-strivana-dark mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm bg-white"
                    placeholder="Your full name"
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
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm bg-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-strivana-dark mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm bg-white"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-strivana-dark mb-2">
                    Position Applying For *
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select a position</option>
                    {openPositions.map((pos, index) => (
                      <option key={index} value={pos.title}>{pos.title}</option>
                    ))}
                    <option value="Other">Other / General Application</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-strivana-dark mb-2">
                    Years of Experience *
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-strivana-dark mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm bg-white"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="portfolio" className="block text-sm font-medium text-strivana-dark mb-2">
                  Portfolio/Website (Optional)
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm bg-white"
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-strivana-dark mb-2">
                  Resume/CV *
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-strivana-purple file:text-white hover:file:bg-strivana-purple-dark"
                />
                <p className="text-xs text-strivana-gray mt-1">Accepted formats: PDF, DOC, DOCX (Max 10MB)</p>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-strivana-dark mb-2">
                  Why should we hire you? *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-strivana-purple focus:ring-2 focus:ring-strivana-purple/20 outline-none transition-all text-sm bg-white resize-none"
                  placeholder="Tell us about your skills, experience, and why you want to join Strivana..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-strivana-purple text-white font-medium rounded-xl hover:bg-strivana-purple-dark transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-glow"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Application
                  </>
                )}
              </button>

              <p className="text-xs text-strivana-gray text-center">
                By submitting, you agree to our privacy policy. Your information will be kept confidential.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-strivana-purple-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-strivana-dark mb-4">
              What Our <span className="text-strivana-purple">VAs Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Strivana changed my life. I went from struggling to find clients to having a steady income working with amazing US companies. The support team is incredible!",
                name: "Maria G.",
                role: "Executive Assistant",
                location: "Colombia",
              },
              {
                quote: "The flexibility is unmatched. I can work from home, spend time with my family, and still earn a great income. Plus, the training helped me level up my skills.",
                name: "Carlos R.",
                role: "Customer Service Rep",
                location: "Mexico",
              },
              {
                quote: "I started as a part-time VA and within a year got promoted to Team Lead. The growth opportunities here are real if you put in the work.",
                name: "Ana P.",
                role: "Project Coordinator",
                location: "Argentina",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-soft">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-strivana-yellow fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-strivana-gray mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-strivana-dark">{testimonial.name}</p>
                  <p className="text-sm text-strivana-gray">{testimonial.role} • {testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
