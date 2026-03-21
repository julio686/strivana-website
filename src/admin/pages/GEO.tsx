import { useState } from 'react';
import { 
  MapPin, 
  Globe, 
  Target,
  BarChart3,
  Plus,
  CheckCircle
} from 'lucide-react';

const GEO = () => {
  const [locations, setLocations] = useState([
    { id: 1, city: 'New York', country: 'USA', keywords: ['virtual assistant NYC', 'VA services New York'], volume: 1200, position: 4 },
    { id: 2, city: 'Los Angeles', country: 'USA', keywords: ['virtual assistant Los Angeles', 'LA VA services'], volume: 890, position: 7 },
    { id: 3, city: 'Toronto', country: 'Canada', keywords: ['virtual assistant Toronto', 'Canadian VA services'], volume: 650, position: 3 },
    { id: 4, city: 'Chicago', country: 'USA', keywords: ['virtual assistant Chicago', 'Chicago VA'], volume: 540, position: 8 },
    { id: 5, city: 'Miami', country: 'USA', keywords: ['virtual assistant Miami', 'Florida VA services'], volume: 420, position: 12 },
  ]);

  const [newLocation, setNewLocation] = useState({ city: '', country: 'USA', keywords: '' });

  const handleAddLocation = () => {
    if (newLocation.city && newLocation.keywords) {
      setLocations([...locations, {
        id: Date.now(),
        city: newLocation.city,
        country: newLocation.country,
        keywords: newLocation.keywords.split(',').map(k => k.trim()),
        volume: Math.floor(Math.random() * 1000) + 200,
        position: Math.floor(Math.random() * 15) + 1,
      }]);
      setNewLocation({ city: '', country: 'USA', keywords: '' });
    }
  };

  const stats = {
    totalLocations: locations.length,
    totalVolume: locations.reduce((acc, loc) => acc + loc.volume, 0),
    avgPosition: (locations.reduce((acc, loc) => acc + loc.position, 0) / locations.length).toFixed(1),
    top3Count: locations.filter(loc => loc.position <= 3).length,
  };

  const geoContent = [
    { page: '/virtual-assistant-new-york', location: 'New York', traffic: 245, bounce: '32%' },
    { page: '/virtual-assistant-los-angeles', location: 'Los Angeles', traffic: 189, bounce: '28%' },
    { page: '/virtual-assistant-toronto', location: 'Toronto', traffic: 156, bounce: '35%' },
    { page: '/virtual-assistant-chicago', location: 'Chicago', traffic: 134, bounce: '31%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Globe className="text-strivana-purple" />
            GEO Search Optimization
          </h1>
          <p className="text-gray-500">Optimize your visibility in local search results.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.totalLocations}</div>
          <div className="text-xs text-gray-500">Locations</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-strivana-purple">{stats.totalVolume.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Monthly Searches</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">#{stats.avgPosition}</div>
          <div className="text-xs text-gray-500">Avg Position</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.top3Count}</div>
          <div className="text-xs text-gray-500">Top 3 Rankings</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Location */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Location</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={newLocation.city}
                onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                placeholder="e.g., San Francisco"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                value={newLocation.country}
                onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              >
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Keywords (comma separated)
              </label>
              <textarea
                value={newLocation.keywords}
                onChange={(e) => setNewLocation({ ...newLocation, keywords: e.target.value })}
                placeholder="e.g., virtual assistant San Francisco, SF VA services"
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              />
            </div>

            <button
              onClick={handleAddLocation}
              disabled={!newLocation.city || !newLocation.keywords}
              className="w-full py-3 bg-strivana-purple text-white font-medium rounded-lg hover:bg-strivana-purple-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Location
            </button>
          </div>

          {/* GEO Tips */}
          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <h3 className="text-sm font-semibold text-orange-900 mb-2 flex items-center gap-2">
              <Target size={16} />
              GEO Best Practices
            </h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Create location-specific pages</li>
              <li>• Use local schema markup</li>
              <li>• Add NAP (Name, Address, Phone)</li>
              <li>• Get local backlinks</li>
              <li>• Optimize Google Business Profile</li>
            </ul>
          </div>
        </div>

        {/* Locations List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Target Locations</h2>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-strivana-purple border border-strivana-purple rounded-lg hover:bg-strivana-purple-light">
              <BarChart3 size={16} />
              View Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Keywords</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Volume</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Position</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((loc) => (
                  <tr key={loc.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-strivana-purple" />
                        <span className="text-sm font-medium text-gray-900">{loc.city}, {loc.country}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {loc.keywords.slice(0, 2).map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{loc.volume.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          loc.position <= 3 ? 'bg-green-500' :
                          loc.position <= 10 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <span className="text-sm font-medium text-gray-900">#{loc.position}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        loc.position <= 3 ? 'bg-green-100 text-green-700' :
                        loc.position <= 10 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {loc.position <= 3 ? 'Excellent' : loc.position <= 10 ? 'Good' : 'Needs Work'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* GEO Landing Pages */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">GEO Landing Pages</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-strivana-purple border border-strivana-purple rounded-lg hover:bg-strivana-purple-light">
            <Plus size={16} />
            Create Page
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Page URL</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Target Location</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Monthly Traffic</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Bounce Rate</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {geoContent.map((page, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-strivana-purple">{page.page}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{page.location}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{page.traffic} visits</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{page.bounce}</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle size={14} />
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GEO;
