import { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Phone, 
  Globe,
  Star,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { useGhostAgent } from '../hooks/useGhostAgent';
import type { Lead } from '../types';

const Leads = () => {
  const { scrapeLeads, isLoading } = useGhostAgent();
  const [generatedLeads, setGeneratedLeads] = useState<Lead[]>([]);
  const [formData, setFormData] = useState({
    industry: '',
    location: '',
    companySize: '',
    count: 20,
  });

  const handleScrape = async () => {
    const leads = await scrapeLeads({
      industry: formData.industry,
      location: formData.location,
      companySize: formData.companySize,
      count: formData.count,
    });
    setGeneratedLeads(leads);
  };

  const stats = {
    total: 328,
    new: 45,
    contacted: 120,
    qualified: 89,
    converted: 74,
  };

  const existingLeads = [
    { company: 'TechCorp Solutions', industry: 'Technology', location: 'New York, NY', email: 'contact@techcorp.com', score: 92, status: 'qualified' },
    { company: 'Growth Marketing Inc', industry: 'Marketing', location: 'Los Angeles, CA', email: 'hello@growthmi.com', score: 87, status: 'contacted' },
    { company: 'StartupXYZ', industry: 'Technology', location: 'Austin, TX', email: 'info@startupxyz.com', score: 78, status: 'new' },
    { company: 'Ecommerce Plus', industry: 'E-commerce', location: 'Miami, FL', email: 'support@ecommerceplus.com', score: 85, status: 'contacted' },
    { company: 'ConsultPro', industry: 'Consulting', location: 'Chicago, IL', email: 'business@consultpro.com', score: 95, status: 'qualified' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="text-strivana-purple" />
            Lead Scraper
          </h1>
          <p className="text-gray-500">Find and qualify potential customers automatically.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-strivana-purple text-white rounded-lg hover:bg-strivana-purple-dark">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500">Total Leads</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
          <div className="text-xs text-gray-500">New</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-orange-500">{stats.contacted}</div>
          <div className="text-xs text-gray-500">Contacted</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.qualified}</div>
          <div className="text-xs text-gray-500">Qualified</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.converted}</div>
          <div className="text-xs text-gray-500">Converted</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scrape Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Scrape New Leads</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Consulting">Consulting</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Real Estate">Real Estate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., New York, NY"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Size
              </label>
              <select
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              >
                <option value="">Any Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Leads
              </label>
              <select
                value={formData.count}
                onChange={(e) => setFormData({ ...formData, count: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              >
                <option value={10}>10 leads</option>
                <option value={20}>20 leads</option>
                <option value={50}>50 leads</option>
                <option value={100}>100 leads</option>
              </select>
            </div>

            <button
              onClick={handleScrape}
              disabled={isLoading || !formData.industry}
              className="w-full py-3 bg-strivana-purple text-white font-medium rounded-lg hover:bg-strivana-purple-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scraping...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Find Leads
                </>
              )}
            </button>
          </div>

          {/* Sources */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Data Sources</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• LinkedIn Company Pages</li>
              <li>• Crunchbase</li>
              <li>• AngelList</li>
              <li>• Yellow Pages</li>
              <li>• Industry Directories</li>
            </ul>
          </div>
        </div>

        {/* Leads List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Lead Database</h2>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter size={16} />
                Filter
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-strivana-purple border border-strivana-purple rounded-lg hover:bg-strivana-purple-light">
                <Plus size={16} />
                Add Lead
              </button>
            </div>
          </div>

          {/* Newly Scraped Leads */}
          {generatedLeads.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Newly Scraped</h3>
              <div className="space-y-2">
                {generatedLeads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-bold">{lead.companyName.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{lead.companyName}</p>
                      <p className="text-xs text-gray-500">{lead.industry} • {lead.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold">{lead.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Company</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Industry</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {existingLeads.map((lead, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-strivana-purple/10 rounded-full flex items-center justify-center">
                          <span className="text-strivana-purple font-bold text-sm">{lead.company.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{lead.company}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{lead.industry}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{lead.location}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold">{lead.score}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lead.status === 'qualified' ? 'bg-purple-100 text-purple-700' :
                        lead.status === 'contacted' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-strivana-purple hover:bg-strivana-purple-light rounded">
                          <Mail size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-strivana-purple hover:bg-strivana-purple-light rounded">
                          <Phone size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-strivana-purple hover:bg-strivana-purple-light rounded">
                          <Globe size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-strivana-purple hover:bg-strivana-purple-light rounded">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
