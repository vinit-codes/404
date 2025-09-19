'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  AlertTriangle, 
  Phone, 
  Activity,
  TrendingUp,
  Clock,
  Shield,
  MapPin
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  mockDashboardMetrics, 
  mockRecentActivity, 
  alertsPerDayData, 
  sosUrgencyData,
  ActivityItem as ActivityItemType
} from '@/lib/mockData';
import { LucideIcon } from 'lucide-react';

const MetricCard = ({ title, value, icon: Icon, trend, color }: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 mt-1 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

const ActivityItem = ({ activity, index }: { activity: ActivityItemType; index: number }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sos': return Phone;
      case 'alert': return AlertTriangle;
      case 'alert_resolved': return Shield;
      case 'user_join': return Users;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string, severity?: string) => {
    if (severity === 'high') return 'bg-red-500';
    if (severity === 'medium') return 'bg-yellow-500';
    if (type === 'alert_resolved') return 'bg-green-500';
    if (type === 'user_join') return 'bg-blue-500';
    return 'bg-gray-500';
  };

  const Icon = getActivityIcon(activity.type);
  const timeAgo = new Date(activity.timestamp).toLocaleTimeString();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type, activity.severity)}`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{activity.description}</p>
        <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
      </div>
    </motion.div>
  );
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Emergency Dashboard</h1>
            <p className="text-gray-600">Real-time monitoring and management</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Activity className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total SOS Requests"
            value={mockDashboardMetrics.totalSOS}
            icon={Phone}
            trend="+5 today"
            color="bg-red-500"
          />
          <MetricCard
            title="Active Alerts"
            value={mockDashboardMetrics.activeAlerts}
            icon={AlertTriangle}
            trend="+3 today"
            color="bg-yellow-500"
          />
          <MetricCard
            title="Total Users"
            value={mockDashboardMetrics.totalUsers.toLocaleString()}
            icon={Users}
            trend={mockDashboardMetrics.userGrowth}
            color="bg-blue-500"
          />
          <MetricCard
            title="Avg Response Time"
            value={mockDashboardMetrics.responseTime}
            icon={Clock}
            trend="↓ 15% faster"
            color="bg-green-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alerts Per Day Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Alerts This Week</h3>
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={alertsPerDayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alerts" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* SOS Urgency Distribution */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">SOS by Urgency</h3>
              <Phone className="w-5 h-5 text-red-500" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sosUrgencyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sosUrgencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {sosUrgencyData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Live</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-1">
              {mockRecentActivity.map((activity, index) => (
                <ActivityItem key={activity.id} activity={activity} index={index} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">Emergency Broadcast</p>
                <p className="text-sm opacity-90">Send area-wide alert</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">View Live Map</p>
                <p className="text-sm opacity-90">Monitor active incidents</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">Generate Report</p>
                <p className="text-sm opacity-90">Export daily summary</p>
              </div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
