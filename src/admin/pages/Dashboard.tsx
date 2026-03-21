import { useState, useEffect } from 'react';
import { 
  FileText, 
  Link, 
  MapPin, 
  Users, 
  Search, 
  Settings,
  TrendingUp,
  Activity,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useGhostAgent } from '../hooks/useGhostAgent';
import type { DashboardStats } from '../types';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const { getDashboardStats } = useGhostAgent();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getDashboardStats();
    setStats(data);
  };

  const statCards = [
    { 
      title: 'Blog Posts', 
      value: stats?.totalPosts || 0, 
      subValue: `${stats?.publishedPosts || 0} published`,
      icon: FileText, 
      color: 'bg-blue-500',
      onClick: () => onNavigate('blog')
    },
    { 
      title: 'Backlinks', 
      value: stats?.totalBacklinks || 0, 
      subValue: `${stats?.activeBacklinks || 0} active`,
      icon: Link, 
      color: 'bg-green-500',
      onClick: () => onNavigate('backlinks')
    },
    { 
      title: 'Leads', 
      value: stats?.totalLeads || 0, 
      subValue: `${stats?.qualifiedLeads || 0} qualified`,
      icon: Users, 
      color: 'bg-purple-500',
      onClick: () => onNavigate('leads')
    },
    { 
      title: 'GEO Targets', 
      value: stats?.geoTargets || 0, 
      subValue: 'locations',
      icon: MapPin, 
      color: 'bg-orange-500',
      onClick: () => onNavigate('geo')
    },
  ];

  const recentTasks = [
    { id: 1, type: 'Blog Post', title: 'Virtual Assistant Best Practices', status: 'completed', time: '2 hours ago' },
    { id: 2, type: 'Backlink', title: 'Generated 15 new backlinks', status: 'completed', time: '4 hours ago' },
    { id: 3, type: 'SEO Audit', title: 'Homepage optimization', status: 'running', time: 'Started 10 min ago' },
    { id: 4, type: 'Lead Scrape', title: 'Tech companies in NYC', status: 'pending', time: 'Scheduled' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening with your SEO.</p>
        </div>
        <button 
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Settings size={18} />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.title}
              onClick={card.onClick}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-strivana-purple hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                <p className="text-sm font-medium text-gray-900">{card.title}</p>
                <p className="text-xs text-gray-500 mt-1">{card.subValue}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SEO Performance */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">SEO Performance</h2>
            <button 
              onClick={() => onNavigate('seo')}
              className="text-sm text-strivana-purple hover:underline"
            >
              View Details
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-strivana-purple">{stats?.averageSeoScore || 0}</div>
              <div className="text-sm text-gray-500">Avg SEO Score</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-green-500">{stats?.tasksCompleted || 0}</div>
              <div className="text-sm text-gray-500">Tasks Completed</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-500">{stats?.tasksPending || 0}</div>
              <div className="text-sm text-gray-500">Pending Tasks</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-500">+24%</div>
              <div className="text-sm text-gray-500">Traffic Growth</div>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="mt-6 h-48 bg-gradient-to-r from-strivana-purple/5 to-blue-500/5 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Activity size={48} className="mx-auto mb-2" />
              <p>Performance chart will appear here</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`mt-0.5 ${
                  task.status === 'completed' ? 'text-green-500' :
                  task.status === 'running' ? 'text-blue-500' :
                  'text-orange-500'
                }`}>
                  {task.status === 'completed' ? <CheckCircle size={18} /> :
                   task.status === 'running' ? <Activity size={18} /> :
                   <Clock size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <p className="text-xs text-gray-500">{task.type} • {task.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => onNavigate('tasks')}
            className="w-full mt-4 py-2 text-sm text-strivana-purple font-medium hover:bg-strivana-purple-light rounded-lg transition-colors"
          >
            View All Tasks
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-strivana-purple to-purple-600 p-6 rounded-xl text-white">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => onNavigate('blog')}
            className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-left"
          >
            <FileText size={24} className="mb-2" />
            <p className="font-medium">Write Blog</p>
            <p className="text-xs text-white/70">AI-powered content</p>
          </button>
          <button 
            onClick={() => onNavigate('backlinks')}
            className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-left"
          >
            <Link size={24} className="mb-2" />
            <p className="font-medium">Build Links</p>
            <p className="text-xs text-white/70">Generate backlinks</p>
          </button>
          <button 
            onClick={() => onNavigate('leads')}
            className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-left"
          >
            <Users size={24} className="mb-2" />
            <p className="font-medium">Find Leads</p>
            <p className="text-xs text-white/70">Scrape prospects</p>
          </button>
          <button 
            onClick={() => onNavigate('seo')}
            className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-left"
          >
            <Search size={24} className="mb-2" />
            <p className="font-medium">SEO Audit</p>
            <p className="text-xs text-white/70">Analyze pages</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
