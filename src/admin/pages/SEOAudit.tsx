import { useState } from 'react';
import { 
  Search, 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  RefreshCw,
  Zap
} from 'lucide-react';
import { useGhostAgent } from '../hooks/useGhostAgent';
import type { SEOAudit } from '../types';

const SEOAuditPage = () => {
  const { runSEOAudit, isLoading } = useGhostAgent();
  const [auditResult, setAuditResult] = useState<SEOAudit | null>(null);
  const [url, setUrl] = useState('');

  const handleAudit = async () => {
    const result = await runSEOAudit(url || 'https://strivana.com');
    setAuditResult(result);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertCircle size={18} className="text-red-500" />;
      case 'warning': return <AlertTriangle size={18} className="text-yellow-500" />;
      default: return <Info size={18} className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Search className="text-strivana-purple" />
            SEO Audit
          </h1>
          <p className="text-gray-500">Analyze and optimize your website's SEO performance.</p>
        </div>
      </div>

      {/* URL Input */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to audit (e.g., https://strivana.com)"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
            />
          </div>
          <button
            onClick={handleAudit}
            disabled={isLoading}
            className="px-6 py-3 bg-strivana-purple text-white font-medium rounded-lg hover:bg-strivana-purple-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Auditing...
              </>
            ) : (
              <>
                <Zap size={20} />
                Run Audit
              </>
            )}
          </button>
        </div>
      </div>

      {auditResult && (
        <>
          {/* Overall Score */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-1 bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className={`text-5xl font-bold ${getScoreColor(auditResult.overallScore)} mb-2`}>
                {auditResult.overallScore}
              </div>
              <div className="text-sm text-gray-500">Overall Score</div>
              <div className={`mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                auditResult.overallScore >= 90 ? 'bg-green-100 text-green-700' :
                auditResult.overallScore >= 70 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {auditResult.overallScore >= 90 ? <CheckCircle size={14} /> :
                 auditResult.overallScore >= 70 ? <AlertTriangle size={14} /> :
                 <AlertCircle size={14} />}
                {auditResult.overallScore >= 90 ? 'Excellent' :
                 auditResult.overallScore >= 70 ? 'Good' :
                 'Needs Improvement'}
              </div>
            </div>

            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <div className={`text-3xl font-bold ${getScoreColor(auditResult.metrics.performance)}`}>
                  {auditResult.metrics.performance}
                </div>
                <div className="text-xs text-gray-500">Performance</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <div className={`text-3xl font-bold ${getScoreColor(auditResult.metrics.accessibility)}`}>
                  {auditResult.metrics.accessibility}
                </div>
                <div className="text-xs text-gray-500">Accessibility</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <div className={`text-3xl font-bold ${getScoreColor(auditResult.metrics.bestPractices)}`}>
                  {auditResult.metrics.bestPractices}
                </div>
                <div className="text-xs text-gray-500">Best Practices</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <div className={`text-3xl font-bold ${getScoreColor(auditResult.metrics.seo)}`}>
                  {auditResult.metrics.seo}
                </div>
                <div className="text-xs text-gray-500">SEO</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Issues */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Issues Found</h2>
              <div className="space-y-3">
                {auditResult.issues.map((issue) => (
                  <div key={issue.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">{issue.title}</h3>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            issue.impact === 'high' ? 'bg-red-100 text-red-700' :
                            issue.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {issue.impact} impact
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                        {issue.fix && (
                          <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-700">
                            <strong>Fix:</strong> {issue.fix}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h2>
              <div className="space-y-3">
                {auditResult.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-strivana-purple-light rounded-lg">
                    <div className="w-6 h-6 bg-strivana-purple text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-3 bg-strivana-purple text-white font-medium rounded-lg hover:bg-strivana-purple-dark flex items-center justify-center gap-2">
                <RefreshCw size={18} />
                Re-run Audit
              </button>
            </div>
          </div>
        </>
      )}

      {/* Recent Audits */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Audits</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Page URL</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Score</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Issues</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { url: 'https://strivana.com', score: 87, issues: 3, date: '2 hours ago' },
                { url: 'https://strivana.com/pricing', score: 92, issues: 1, date: '1 day ago' },
                { url: 'https://strivana.com/services', score: 84, issues: 5, date: '2 days ago' },
              ].map((audit, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-strivana-purple">{audit.url}</td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-bold ${getScoreColor(audit.score)}`}>
                      {audit.score}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{audit.issues} issues</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{audit.date}</td>
                  <td className="py-3 px-4">
                    <button className="text-strivana-purple hover:underline text-sm">View Report</button>
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

export default SEOAuditPage;
