import { useState, useEffect } from 'react'
import { Briefcase, MapPin, DollarSign, Send, Globe, Clock, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { supabase, isSupabaseConfigured, type JobListing, type JobApplication } from '@/lib/supabase'

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

// Fallback job listings if Supabase is not configured or fails
const fallbackJobListings: JobListing[] = [
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
    title: 'Social Media Manager',
    location: 'Remote (Latin America)',
    salary: '$10-14/hour',
    type: 'Full-Time',
    description: 'Manage social media accounts for multiple clients. Create content calendars, schedule posts, engage with audiences, and provide analytics reports. Experience with Instagram, LinkedIn, and Facebook required.',
    requirements: ['Content Creation', 'Analytics', 'English Fluent'],
    is_active: true,
  },
  {
    id: 3,
    title: 'Customer Success Manager',
    location: 'Remote (Latin America)',
    salary: '$12-16/hour',
    type: 'Full-Time',
    description: 'Be the primary contact for Strivana clients. Onboard new customers, check in regularly, gather feedback, and ensure client satisfaction. Help match clients with the perfect VA.',
    requirements: ['B2B Experience', 'Spanish + English', 'Sales exp'],
    is_active: true,
  },
  {
    id: 4,
    title: 'Bookkeeping Virtual Assistant',
    location: 'Remote (Latin America)',
    salary: '$10-15/hour',
    type: 'Part-Time / Full-Time',
    description: 'Help US small businesses with QuickBooks, invoicing, expense tracking, and financial reporting. Accounting background or certification preferred.',
    requirements: ['QuickBooks', 'Accounting', 'Detail-oriented'],
    is_active: true,
  },
]

export default function Careers() {
  const [jobListings, setJobListings] = useState<JobListing[]>([])
  const [isLoadingJobs, setIsLoadingJobs] = useState(true)
  const [jobsError, setJobsError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    country: '',
    englishLevel: '',
    experience: '',
    message: '',
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch job listings from Supabase
  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoadingJobs(true)
        setJobsError(null)

        // Check if Supabase is configured
        if (!isSupabaseConfigured) {
          console.warn('Supabase not configured, using fallback job listings')
          setJobListings(fallbackJobListings)
          setUsingFallback(true)
          return
        }

        const { data, error } = await supabase
          .from('job_listings')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching jobs:', error)
          setJobsError('Failed to load job listings')
          setJobListings(fallbackJobListings)
          setUsingFallback(true)
        } else if (data && data.length > 0) {
          setJobListings(data)
        } else {
          // No jobs in database yet, use fallback
          setJobListings(fallbackJobListings)
          setUsingFallback(true)
        }
      } catch (err) {
        console.error('Error:', err)
        setJobListings(fallbackJobListings)
        setUsingFallback(true)
      } finally {
        setIsLoadingJobs(false)
      }
    }

    fetchJobs()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const uploadResume = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `resumes/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('applications')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return null
      }

      const { data } = supabase.storage.from('applications').getPublicUrl(filePath)
      return data.publicUrl
    } catch (err) {
      console.error('Error uploading resume:', err)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let resumeUrl: string | null = null

      // Upload resume if Supabase is configured
      if (resumeFile && isSupabaseConfigured) {
        resumeUrl = await uploadResume(resumeFile)
      }

      // Prepare application data
      const applicationData: JobApplication = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        country: formData.country,
        english_level: formData.englishLevel,
        experience: formData.experience,
        message: formData.message,
        resume_url: resumeUrl || undefined,
      }

      // Check if Supabase is configured
      if (isSupabaseConfigured) {
        // Submit to Supabase
        const { error } = await supabase
          .from('job_applications')
          .insert([applicationData])

        if (error) {
          throw error
        }

        toast.success('Application submitted successfully! We will review within 3-5 days.')
      } else {
        // Fallback: submit via FormSubmit.co
        const submitData = new FormData()
        submitData.append('_subject', `VA Application - ${formData.position || 'General Application'}`)
        submitData.append('_cc', 'careers@strivanallc.com')
        submitData.append('_autoresponse', 'Thank you for applying to Strivana! We have received your application and will review it within 3-5 business days.')
        submitData.append('name', formData.name)
        submitData.append('email', formData.email)
        submitData.append('phone', formData.phone)
        submitData.append('position', formData.position)
        submitData.append('country', formData.country)
        submitData.append('englishLevel', formData.englishLevel)
        submitData.append('experience', formData.experience)
        submitData.append('message', formData.message)
        if (resumeFile) {
          submitData.append('resume', resumeFile)
        }

        const response = await fetch('https://formsubmit.co/ajax/careers@strivanallc.com', {
          method: 'POST',
          body: submitData,
        })

        if (!response.ok) {
          throw new Error('Submission failed')
        }

        toast.success('Application submitted! We will review within 3-5 days.')
      }

      // Reset form
      setFormData({ name: '', email: '', phone: '', position: '', country: '', englishLevel: '', experience: '', message: '' })
      setResumeFile(null)
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Error submitting application. Please try again or email careers@strivanallc.com directly.')
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
          {usingFallback && (
            <p className="text-xs text-amber-600 mt-2">
              * Using default listings. Connect Supabase to see live job postings.
            </p>
          )}
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
            ) : jobsError ? (
              <div className="p-6 bg-red-50 rounded-xl text-red-600">
                {jobsError}. Showing default listings.
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="career-phone">Phone / WhatsApp</Label>
                      <Input
                        id="career-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="career-position">Position *</Label>
                      <select
                        id="career-position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select position...</option>
                        {jobListings.map((job) => (
                          <option key={job.id} value={job.title}>{job.title}</option>
                        ))}
                        <option value="General Application">General Application</option>
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
                    <Label htmlFor="career-message">Tell us about yourself</Label>
                    <Textarea
                      id="career-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Your background, skills, and why you want to join Strivana..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="career-resume">Resume/CV *</Label>
                    <div className="mt-1">
                      <Input
                        id="career-resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-strivana-purple file:text-white hover:file:bg-strivana-purple-dark"
                      />
                      <p className="text-xs text-strivana-gray mt-1">
                        PDF, DOC, or DOCX (max 5MB)
                      </p>
                    </div>
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
