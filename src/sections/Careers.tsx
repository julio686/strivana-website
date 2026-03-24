import { useState } from 'react'
import { Briefcase, MapPin, DollarSign, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

const jobListings = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    location: 'Remote (US)',
    salary: '$140K - $180K',
    type: 'Direct Hire',
    description: 'Join a fast-growing fintech company building next-generation payment solutions. 5+ years experience with React, Node.js, and AWS required.',
  },
  {
    id: 2,
    title: 'DevOps Engineer',
    location: 'Hybrid - Austin, TX',
    salary: '$130K - $160K',
    type: 'Direct Hire',
    description: 'Leading healthcare company seeking DevOps engineer to optimize CI/CD pipelines and manage cloud infrastructure. Kubernetes and Terraform experience preferred.',
  },
  {
    id: 3,
    title: 'Data Scientist',
    location: 'Remote (US)',
    salary: '$150K - $190K',
    type: 'Direct Hire',
    description: 'E-commerce giant looking for data scientists to build ML models for personalization and recommendation engines. PhD or MS in quantitative field preferred.',
  },
  {
    id: 4,
    title: 'Cloud Solutions Architect',
    location: 'On-site - New York, NY',
    salary: '$180K - $220K',
    type: 'Direct Hire',
    description: 'Enterprise consulting firm seeking experienced cloud architects to design and implement AWS/Azure solutions for Fortune 500 clients.',
  },
]

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const submitData = new FormData()
    submitData.append('_to', 'julio@strivanallc.com')
    submitData.append('_cc', 'george@strivanallc.com,info@strivanallc.com')
    submitData.append('_subject', `Resume Submission - ${formData.position || 'General Application'}`)
    submitData.append('_autoresponse', 'Thank you for submitting your resume to Strivana LLC! We have received your application and will review it shortly.')
    submitData.append('name', formData.name)
    submitData.append('email', formData.email)
    submitData.append('phone', formData.phone)
    submitData.append('position', formData.position)
    submitData.append('message', formData.message)
    if (resumeFile) {
      submitData.append('resume', resumeFile)
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/julio@strivanallc.com', {
        method: 'POST',
        body: submitData,
      })

      if (response.ok) {
        toast.success('Application submitted successfully!')
        setFormData({ name: '', email: '', phone: '', position: '', message: '' })
        setResumeFile(null)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      toast.error('Error submitting application. Please email careers@strivanallc.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApplyClick = (jobTitle: string) => {
    setFormData(prev => ({ ...prev, position: jobTitle }))
    const formElement = document.getElementById('resume-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="careers" className="py-16 sm:py-20 md:py-24 bg-strivana-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-strivana-dark mb-4">
            Join Our Talent Network
          </h2>
          <p className="text-lg text-strivana-gray">
            Looking for your next career opportunity? Browse our current openings 
            or submit your resume for future positions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-strivana-dark mb-6">Current Openings</h3>
            {jobListings.map((job) => (
              <Card key={job.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
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
            ))}
          </div>

          <div id="resume-form">
            <Card className="border-0 shadow-lg sticky top-32">
              <CardHeader>
                <CardTitle className="text-2xl text-strivana-dark">Submit Your Resume</CardTitle>
                <CardDescription>
                  Don't see the right position? Submit your resume for future opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="career-name">Full Name *</Label>
                    <Input
                      id="career-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="career-email">Email Address *</Label>
                    <Input
                      id="career-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="career-phone">Phone Number</Label>
                    <Input
                      id="career-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="career-position">Position of Interest</Label>
                    <Input
                      id="career-position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="e.g., Senior Developer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="career-message">Message / Cover Letter</Label>
                    <Textarea
                      id="career-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Tell us about your experience..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="career-resume">Resume *</Label>
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
                        Accepted formats: PDF, DOC, DOCX (max 5MB)
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
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
