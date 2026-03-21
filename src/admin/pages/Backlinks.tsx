import { useState } from 'react';
import { 
  Link, 
  Globe, 
  CheckCircle, 
  XCircle, 
  Clock,
  ExternalLink,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useGhostAgent } from '../hooks/useGhostAgent';
import type { Backlink } from '../types';

const Backlinks = () => {
  const { generateBacklinks, isLoading } = useGhostAgent();
  const [generatedLinks, setGeneratedLinks] = useState<Backlink[]>([]);
  const [formData, setFormData] = useState({
    targetUrl: '',
    anchorText: '',
    count: 10,
  });

  const handleGenerate = async () => {
    const links = await generateBacklinks({
      targetUrl: formData.targetUrl,
      anchorText: formData.anchorText,
      count: formData.count,
    });
    setGeneratedLinks(links);
  };

  const stats = {
    total: 156,
    active: 142,
    pending: 8,
    broken: 6,
    avgDA: 45,
  };

  const existingBacklinks = [
    { domain: 'forbes.com', url: 'https://forbes.com/business/productivity', da: 94, pa: 78, status: 'active' },
    { domain: 'entrepreneur.com', url: 'https://entrepreneur.com/growing-business', da: 87, pa: 72, status: 'active' },
    { domain: 'inc.com', url: 'https://inc.com/leadership', da: 91, pa: 75, status: 'active' },
    { domain: 'businessinsider.com', url: 'https://businessinsider.com/strategy', da: 89, pa: 70, status: 'pending' },
    { domain: 'fastcompany.com', url: 'https://fastcompany.com/work-life', da: 85, pa: 68, status: 'active' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Link className="text-strivana-purple" />
            Backlink Generator
          </h1>
          <p className="text-gray-500">Build high-quality backlinks to boost your domain authority.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500">Total Links</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-xs text-gray-500">Active</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-orange-500">{stats.pending}</div>
          <div className="text-xs text-gray-500">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-red-500">{stats.broken}</div>
          <div className="text-xs text-gray-500">Broken</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-strivana-purple">{stats.avgDA}</div>
          <div className="text-xs text-gray-500">Avg DA</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generate New Backlinks */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate New Backlinks</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target URL
              </label>
              <input
                type="url"
                value={formData.targetUrl}
                onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                placeholder="https://strivana.com/blog/post-slug"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Anchor Text
              </label>
              <input
                type="text"
                value={formData.anchorText}
                onChange={(e) => setFormData({ ...formData, anchorText: e.target.value })}
                placeholder="e.g., virtual assistant services"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Links
              </label>
              <select
                value={formData.count}
                onChange={(e) => setFormData({ ...formData, count: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              >
                <option value={5}>5 links</option>
                <option value={10}>10 links</option>
                <option value={25}>25 links</option>
                <option value={50}>50 links</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !formData.targetUrl}
              className="w-full py-3 bg-strivana-purple text-white font-medium rounded-lg hover:bg-strivana-purple-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Finding Links...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Generate Backlinks
                </>
              )}
            </button>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="text-sm font-semibold text-green-900 mb-2">Link Building Tips</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Target DA 30+ websites</li>
              <li>• Use varied anchor text</li>
              <li>• Focus on relevance</li>
              <li>• Build gradually over time</li>
            </ul>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Backlink Portfolio</h2>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-strivana-purple border border-strivana-purple rounded-lg hover:bg-strivana-purple-light">
              <RefreshCw size={16} />
              Refresh All
            </button>
          </div>

          {/* Generated Links */}
          {generatedLinks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Newly Generated</h3>
              <div className="space-y-2">
                {generatedLinks.map((link) => (
                  <div key={link.id} className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Globe size={20} className="text-green-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{link.domain}</p>
                      <p className="text-xs text-gray-500 truncate">{link.url}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-900">{link.domainAuthority}</div>
                        <div className="text-xs text-gray-500">DA</div>
                      </div>
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                        {link.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Existing Links Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Domain</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">DA</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">PA</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {existingBacklinks.map((link, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{link.domain}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-bold text-gray-900">{link.da}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{link.pa}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`flex items-center gap-1 text-xs ${
                        link.status === 'active' ? 'text-green-600' :
                        link.status === 'pending' ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {link.status === 'active' ? <CheckCircle size={14} /> :
                         link.status === 'pending' ? <Clock size={14} /> :
                         <XCircle size={14} />}
                        {link.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-strivana-purple hover:underline text-sm flex items-center gap-1"
                      >
                        <ExternalLink size={14} />
                        Visit
                      </a>
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

export default Backlinks;
