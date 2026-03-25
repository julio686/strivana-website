import { useState, useRef } from 'react'
import { Briefcase, MapPin, DollarSign, Globe, Clock, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

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
  const formRef = useRef<HTMLDivElement>(null)
  
  const handleApplyClick = () => {
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
            
            {jobListings.map((job) => (
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
                    onClick={handleApplyClick}
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

          {/* GHL Recruitment Form */}
          <div id="apply-form" ref={formRef}>
            <Card className="border border-gray-100 shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl text-strivana-dark">Apply Now</CardTitle>
                <CardDescription>
                  Tell us about yourself and upload your resume. We review every application personally.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* GHL Recruitment Form Iframe */}
                <div className="w-full" style={{ minHeight: '877px' }}>
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/form/rNYcdaht1k5ihTMLYAph"
                    style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
                    id="inline-rNYcdaht1k5ihTMLYAph"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Recruitment"
                    data-height="877"
                    data-layout-iframe-id="inline-rNYcdaht1k5ihTMLYAph"
                    data-form-id="rNYcdaht1k5ihTMLYAph"
                    title="Recruitment"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* GHL Form Embed Script */}
      <script src="https://link.msgsndr.com/js/form_embed.js" />
    </section>
  )
}
