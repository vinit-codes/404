'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CloudRain, Mountain, Zap, Clock, MapPin } from 'lucide-react';
import Card from '@/components/ui/Card';
import BottomNavigation from '@/components/BottomNavigation';

interface Alert {
  id: string;
  type: 'weather' | 'natural' | 'emergency';
  title: string;
  description: string;
  location: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  icon: React.ComponentType<{ className?: string; }>;
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'weather',
    title: 'Heavy Rainfall Expected',
    description: 'Intense rainfall predicted in your area. Avoid outdoor activities and stay in covered areas.',
    location: 'Current Location',
    timestamp: '2 mins ago',
    severity: 'high',
    icon: CloudRain
  },
  {
    id: '2',
    type: 'natural',
    title: 'Flash Flood Risk Detected',
    description: 'Flash flood warning issued for low-lying areas near Manali. Evacuate if necessary.',
    location: 'Manali, HP',
    timestamp: '15 mins ago',
    severity: 'high',
    icon: Mountain
  },
  {
    id: '3',
    type: 'emergency',
    title: 'Power Outage Alert',
    description: 'Scheduled power maintenance from 2 PM to 6 PM. Plan accordingly.',
    location: 'City Center',
    timestamp: '1 hour ago',
    severity: 'medium',
    icon: Zap
  },
  {
    id: '4',
    type: 'weather',
    title: 'High Wind Advisory',
    description: 'Strong winds expected at hill stations. Secure loose objects and avoid tall structures.',
    location: 'Hill Stations',
    timestamp: '3 hours ago',
    severity: 'medium',
    icon: CloudRain
  }
];

export default function AlertsPage() {
  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getSeverityDot = (severity: Alert['severity']) => {
    switch (severity) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-100 px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-slate-900">Safety Alerts</h1>
          <p className="text-slate-600 text-sm mt-1">Stay informed about risks in your area</p>
        </motion.div>
      </div>

      {/* Alerts Summary */}
      <div className="px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 text-white mb-6"
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Active High Priority Alerts</h3>
              <p className="text-red-100 text-sm">2 alerts require immediate attention</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Alerts List */}
      <div className="px-6 space-y-4">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className={`border-l-4 ${getSeverityColor(alert.severity).split(' ')[2]}`}>
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-slate-900 text-sm">{alert.title}</h3>
                      <div className="flex items-center space-x-2 ml-2">
                        <div className={`w-2 h-2 rounded-full ${getSeverityDot(alert.severity)}`} />
                        <span className="text-xs text-slate-500 whitespace-nowrap">{alert.timestamp}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 mt-3 text-xs text-slate-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State for No More Alerts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="px-6 py-8 text-center"
      >
        <div className="text-slate-400 mb-2">
          <AlertTriangle className="w-12 h-12 mx-auto opacity-50" />
        </div>
        <p className="text-slate-500 text-sm">No more alerts at this time</p>
        <p className="text-slate-400 text-xs mt-1">We&apos;ll notify you of any new safety updates</p>
      </motion.div>

      <BottomNavigation />
    </div>
  );
}
