import { useState, useRef } from 'react'
import { Briefcase, MapPin, DollarSign, Send, Globe, Clock, GraduationCap, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Pay',
    description: 'Earn above-market rates paid in USD',
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Choose full-time or part-time schedules',
  },
  {
    icon: Globe,
    title: 'Work From Home',
    description: '100% remote - no commute required',
  },
  {
    icon: GraduationCap,
    title: 'Career Growth',
    description: 'Training and advancement opportunities',
  },
]

// Fallback job listings
const fallbackJobListings = [
  {
    id: 1,
    title: 'Executive Virtual Assistant',
    location: 'Remote (Latin America)',
    salary: '$8-12/hour',
    type: 'Full-Time / Part-Time',
    description: 'Support US-based executives with calendar management, email handling, travel coordination, and administrative tasks. Requires excellent English, 3+ years experience, and familiarity with US business culture.',
    requirements: ['Fluent English', '3+ years exp', 'US Time Zone'],
    is_active: true,
  },
  {
    id: 2,
    title: 'Sales Specialist',
    location: 'Remote (Latin America)',
    salary: '$10-14/hour',
    type: 'Full-Time',
    description: 'Lead generation, CRM management, and sales support for US clients. Experience with outbound sales, LinkedIn outreach, and sales tools required.',
    requirements: ['Sales Experience', 'CRM Knowledge', 'English Fluent'],
    is_active: true,
  },
  {
    id: 3,
    title: 'Customer Service Representative',
    location: 'Remote (Latin America)',
    salary: '$8-11/hour',
    type: 'Full-Time / Part-Time',
    description: 'Provide excellent customer support via email, chat, and phone for US businesses. Handle inquiries, resolve issues, and maintain customer satisfaction.',
    requirements: ['Customer Service Exp', 'Spanish + English', 'Communication'],
    is_active: true,
  },
  {
    id: 4,
    title: 'Project Manager',
    location: 'Remote (Latin America)',
    salary: '$12-16/hour',
    type: 'Full-Time',
    description: 'Coordinate projects, manage timelines, and ensure deliverables are met. Work with US clients to streamline operations and improve efficiency.',
    requirements: ['PM Experience', 'Organizational Skills', 'English Fluent'],
    is_active: true,
  },
]

export default function Careers() {
  const [jobListings] = useState(fallbackJobListings)
  const [isLoadingJobs] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeFileName, setResumeFileName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    country: '',
    englishLevel: '',
    experience: '',
    hearAboutUs: '',
    message: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB')
        return
      }
      setResumeFile(file)
      setResumeFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const form = formRef.current
      if (!form) return

      // Create FormData object
      const submitData = new FormData(form)
      
      // Append file if selected (FormSubmit.co handles file uploads)
      if (resumeFile) {
        submitData.append('Resume', resumeFile, resumeFile.name)
      }

      // Submit to FormSubmit.co
      const response = await fetch('https://formsubmit.co/ajax/julio@strivanallc.com', {
        method: 'POST',
        body: submitData,
      })

      if (response.ok) {
        toast.success('Application submitted successfully! We will review within 3-5 business days.')
        // Reset form
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          position: '', 
          country: '', 
          englishLevel: '', 
          experience: '', 
          hearAboutUs: '', 
          message: '' 
        })
        setResumeFile(null)
        setResumeFileName('')
        form.reset()
        
        // Redirect to thanks page after short delay
        setTimeout(() => {
          window.location.href = '/thanks-careers.html'
        }, 1500)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Error submitting application. Please try again or email info@strivanallc.com directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApplyClick = (jobTitle: string) => {
    setFormData(prev => ({ ...prev, position: jobTitle }))
    const formElement = document.getElementById('apply-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section id="careers" className="py-24 bg-gradient-to-b from-white via-strivana-light/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-strivana-purple/10 rounded-full text-strivana-purple text-sm font-medium mb-6">
            <Briefcase size={16} />
            <span>Join Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-strivana-dark mb-4">
            Work as a{' '}
            <span className="text-strivana-purple">Virtual Assistant</span>
          </h2>
          <p className="text-lg text-strivana-gray">
            Join 150+ talented professionals from Latin America. Work remotely with US clients, 
            earn competitive USD wages, and grow your career.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div key={benefit.title} className="text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-strivana-purple-light rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-strivana-purple" />
                </div>
                <h3 className="font-semibold text-strivana-dark mb-1">{benefit.title}</h3>
                <p className="text-sm text-strivana-gray">{benefit.description}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Job Listings */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-strivana-dark">Open Positions</h3>
            
            {isLoadingJobs ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-strivana-purple"></div>
              </div>
            ) : (
              jobListings.map((job) => (
                <Card key={job.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-strivana-purple/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-strivana-dark">{job.title}</CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-3 mt-2">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-strivana-purple" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={14} className="text-strivana-purple" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase size={14} className="text-strivana-purple" />
                            {job.type}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-strivana-gray text-sm mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.map((req) => (
                        <span key={req} className="px-3 py-1 bg-strivana-purple-light text-strivana-purple text-xs rounded-full">
                          {req}
                        </span>
                      ))}
                    </div>
                    <Button
                      onClick={() => handleApplyClick(job.title)}
                      variant="outline"
                      size="sm"
                      className="border-strivana-purple text-strivana-purple hover:bg-strivana-purple hover:text-white"
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Application Form */}
          <div id="apply-form">
            <Card className="border border-gray-100 shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl text-strivana-dark">Apply Now</CardTitle>
                <CardDescription>
                  Tell us about yourself and upload your resume. We review every application personally.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form 
                  ref={formRef}
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                  encType="multipart/form-data"
                >
                  {/* Hidden FormSubmit.co configuration */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value="https://strivanallc.com/thanks-careers.html" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_subject" value="New Career Application - Strivana" />
                  <input type="hidden" name="_cc" value="george@strivanallc.com" />
                  <input type="hidden" name="_autoresponse" value="Thank you for applying to Strivana! We have received your application and will review it within 3-5 business days." />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="career-name">Full Name *</Label>
                      <Input
                        id="career-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Maria Garcia"
                      />
                    </div>
                    <div>
                      <Label htmlFor="career-email">Email *</Label>
                      <Input
                        id="career-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="maria@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="career-phone">Phone / WhatsApp *</Label>
                      <Input
                        id="career-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+52 1 55 1234 5678"
                      />
                    </div>
                    <div>
                      <Label htmlFor="career-country">Country *</Label>
                      <Input
                        id="career-country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        placeholder="Mexico, Colombia, Argentina..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="career-position">Position Applying For *</Label>
                      <select
                        id="career-position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select position...</option>
                        <option value="Executive Assistant">Executive Assistant</option>
                        <option value="Sales Specialist">Sales Specialist</option>
                        <option value="Customer Service">Customer Service</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="career-english">English Level *</Label>
                      <select
                        id="career-english"
                        name="englishLevel"
                        value={formData.englishLevel}
                        onChange={handleInputChange}
                        required
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select level...</option>
                        <option value="Fluent">Fluent - Minimal accent</option>
                        <option value="Advanced">Advanced - Light accent</option>
                        <option value="Upper Intermediate">Upper Intermediate</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="career-experience">Years of Experience *</Label>
                      <select
                        id="career-experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select experience...</option>
                        <option value="0-1 years">Less than 1 year</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="career-hear-about">How did you hear about us?</Label>
                      <select
                        id="career-hear-about"
                        name="hearAboutUs"
                        value={formData.hearAboutUs}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select...</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Google">Google</option>
                        <option value="Referral">Referral</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="career-resume">Resume/CV *</Label>
                    <div className="mt-1">
                      <div className="relative">
                        <Input
                          id="career-resume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          required
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-strivana-purple file:text-white hover:file:bg-strivana-purple-dark cursor-pointer"
                        />
                        <Upload className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                      <p className="text-xs text-strivana-gray mt-1">
                        PDF, DOC, or DOCX (max 5MB)
                      </p>
                      {resumeFileName && (
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Selected: {resumeFileName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="career-message">Cover Letter / Message (Optional)</Label>
                    <Textarea
                      id="career-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Tell us about yourself, your background, skills, and why you want to join Strivana..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-strivana-purple hover:bg-strivana-purple-dark text-white"
                  >
                    {isSubmitting ? 'Submitting...' : <><Send className="mr-2 h-4 w-4" />Submit Application</>}
                  </Button>

                  <p className="text-xs text-strivana-gray text-center">
                    We respect your privacy. Your information is secure and will never be shared.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
