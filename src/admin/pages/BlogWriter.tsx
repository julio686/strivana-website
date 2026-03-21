import { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Copy,
  Download,
  Edit3,
  Save
} from 'lucide-react';
import { useGhostAgent } from '../hooks/useGhostAgent';
import type { BlogPost } from '../types';

const BlogWriter = () => {
  const { generateBlogPost, isLoading } = useGhostAgent();
  const [generatedPost, setGeneratedPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    topic: '',
    keywords: '',
    tone: 'professional' as const,
    wordCount: 1000,
  });

  const handleGenerate = async () => {
    const keywords = formData.keywords.split(',').map(k => k.trim()).filter(Boolean);
    const post = await generateBlogPost({
      topic: formData.topic,
      keywords: keywords.length > 0 ? keywords : ['virtual assistant', 'business productivity'],
      tone: formData.tone,
      wordCount: formData.wordCount,
    });
    setGeneratedPost(post);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-strivana-purple" />
            AI Ghost Writer
          </h1>
          <p className="text-gray-500">Generate SEO-optimized blog posts with AI superpowers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Topic / Title
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="e.g., Virtual Assistant Best Practices"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Keywords (comma separated)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="e.g., virtual assistant, productivity, business growth"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tone
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="persuasive">Persuasive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Word Count
                </label>
                <select
                  value={formData.wordCount}
                  onChange={(e) => setFormData({ ...formData, wordCount: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-strivana-purple focus:border-transparent"
                >
                  <option value={500}>500 words</option>
                  <option value={1000}>1,000 words</option>
                  <option value={1500}>1,500 words</option>
                  <option value={2000}>2,000 words</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !formData.topic}
              className="w-full py-3 bg-strivana-purple text-white font-medium rounded-lg hover:bg-strivana-purple-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Blog Post
                </>
              )}
            </button>
          </div>

          {/* SEO Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Target size={16} />
              SEO Superpowers Active
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Automatic keyword optimization</li>
              <li>• Meta title & description generation</li>
              <li>• Readability scoring</li>
              <li>• Internal linking suggestions</li>
              <li>• Schema markup recommendations</li>
            </ul>
          </div>
        </div>

        {/* Generated Content */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Generated Content</h2>
            {generatedPost && (
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(generatedPost.content)}
                  className="p-2 text-gray-500 hover:text-strivana-purple hover:bg-strivana-purple-light rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy size={18} />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-strivana-purple hover:bg-strivana-purple-light rounded-lg transition-colors"
                  title="Download as Markdown"
                >
                  <Download size={18} />
                </button>
              </div>
            )}
          </div>

          {!generatedPost ? (
            <div className="h-96 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <FileText size={48} className="mx-auto mb-4" />
                <p>Your generated content will appear here</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* SEO Scores */}
              <div className="flex gap-4 mb-4">
                <div className="flex-1 p-3 bg-green-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{generatedPost.seoScore}</div>
                  <div className="text-xs text-green-700">SEO Score</div>
                </div>
                <div className="flex-1 p-3 bg-blue-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{generatedPost.readabilityScore}</div>
                  <div className="text-xs text-blue-700">Readability</div>
                </div>
                <div className="flex-1 p-3 bg-purple-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{generatedPost.wordCount}</div>
                  <div className="text-xs text-purple-700">Words</div>
                </div>
              </div>

              {/* Meta Info */}
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div>
                  <span className="text-xs font-medium text-gray-500">Meta Title:</span>
                  <p className="text-sm text-gray-900">{generatedPost.metaTitle}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">Meta Description:</span>
                  <p className="text-sm text-gray-900">{generatedPost.metaDescription}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">Keywords:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {generatedPost.keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-strivana-purple/10 text-strivana-purple text-xs rounded-full">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Preview */}
              <div className="border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {generatedPost.content}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-2 bg-strivana-purple text-white font-medium rounded-lg hover:bg-strivana-purple-dark flex items-center justify-center gap-2">
                  <Save size={18} />
                  Save as Draft
                </button>
                <button className="flex-1 py-2 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Edit3 size={18} />
                  Edit Content
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">SEO Score</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Created</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'Virtual Assistant Best Practices', status: 'published', seoScore: 92, date: '2 days ago' },
                { title: 'How to Scale Your Business with VAs', status: 'draft', seoScore: 88, date: '3 days ago' },
                { title: 'Remote Work Productivity Tips', status: 'published', seoScore: 95, date: '1 week ago' },
              ].map((post, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{post.title}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} className="text-green-500" />
                      <span className="text-sm font-medium text-gray-900">{post.seoScore}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{post.date}</td>
                  <td className="py-3 px-4">
                    <button className="text-strivana-purple hover:underline text-sm">Edit</button>
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

export default BlogWriter;
