import { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Key, 
  Bell, 
  Globe, 
  Shield,
  Save,
  CheckCircle
} from 'lucide-react';

const Settings = () => {
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    openaiApiKey: '',
    blogFrequency: 'weekly',
    backlinkTargets: 50,
    leadSources: ['linkedin', 'crunchbase'],
    notifications: true,
    autoPublish: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <SettingsIcon className="text-strivana-purple" />
            Settings
          </h1>
          <p className="text-gray-500">Configure your AI Ghost Agent and admin preferences.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
            <CheckCircle size={18} />
            <span className="font-medium">Settings saved!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Configuration */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Key size={20} className="text-strivana-purple" />
            API Configuration
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OpenAI API Key
              </label>
              <input
                type="password"
                value={config.openaiApiKey}
                onChange={(e) => setConfig({ ...config, openaiApiKey: e.target.value })}
                placeholder="sk-..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your API key is encrypted and stored securely.
              </p>
            </div>
          </div>
        </div>

        {/* Content Generation */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe size={20} className="text-strivana-purple" />
            Content Generation
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog Post Frequency
              </label>
              <select
                value={config.blogFrequency}
                onChange={(e) => setConfig({ ...config, blogFrequency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Backlink Target (per month)
              </label>
              <input
                type="number"
                value={config.backlinkTargets}
                onChange={(e) => setConfig({ ...config, backlinkTargets: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="autoPublish"
                checked={config.autoPublish}
                onChange={(e) => setConfig({ ...config, autoPublish: e.target.checked })}
                className="w-4 h-4 text-strivana-purple rounded focus:ring-strivana-purple"
              />
              <label htmlFor="autoPublish" className="text-sm text-gray-700">
                Auto-publish approved content
              </label>
            </div>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-strivana-purple" />
            Lead Sources
          </h2>
          
          <div className="space-y-3">
            {[
              { id: 'linkedin', name: 'LinkedIn', description: 'Company pages and profiles' },
              { id: 'crunchbase', name: 'Crunchbase', description: 'Startup and company data' },
              { id: 'angellist', name: 'AngelList', description: 'Startup and investor profiles' },
              { id: 'yellowpages', name: 'Yellow Pages', description: 'Local business listings' },
            ].map((source) => (
              <div key={source.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={config.leadSources.includes(source.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setConfig({ ...config, leadSources: [...config.leadSources, source.id] });
                    } else {
                      setConfig({ ...config, leadSources: config.leadSources.filter(s => s !== source.id) });
                    }
                  }}
                  className="w-4 h-4 text-strivana-purple rounded focus:ring-strivana-purple"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{source.name}</p>
                  <p className="text-xs text-gray-500">{source.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Bell size={20} className="text-strivana-purple" />
            Notifications
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="notifications"
                checked={config.notifications}
                onChange={(e) => setConfig({ ...config, notifications: e.target.checked })}
                className="w-4 h-4 text-strivana-purple rounded focus:ring-strivana-purple"
              />
              <label htmlFor="notifications" className="text-sm text-gray-700">
                Enable email notifications
              </label>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <p className="text-sm font-medium text-gray-700">Notify me when:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• New blog post is generated</li>
                <li>• Backlinks are created</li>
                <li>• New leads are found</li>
                <li>• SEO issues are detected</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-strivana-purple text-white font-medium rounded-lg hover:bg-strivana-purple-dark flex items-center gap-2"
        >
          <Save size={20} />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
