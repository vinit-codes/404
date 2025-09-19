'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Shield, ChevronDown, MapPin, Clock, Filter } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  type: 'flood' | 'rainfall' | 'fire' | 'power' | 'earthquake' | 'landslide' | 'weather';
  icon: string;
  timestamp: string;
  location: string;
  distance: string;
  isActive: boolean;
}

// Mock alert data with realistic disaster scenarios for Himachal Pradesh
const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Flash Flood Warning',
    description: 'Beas River water level rising rapidly. Immediate evacuation recommended for low-lying areas.',
    severity: 'high',
    type: 'flood',
    icon: '🌊',
    timestamp: '10 mins ago',
    location: 'Kullu Valley',
    distance: '2.3 km from your location',
    isActive: true
  },
  {
    id: '2',
    title: 'Heavy Rainfall Alert',
    description: 'Continuous rainfall expected for next 6 hours. Risk of landslides in hilly areas.',
    severity: 'high',
    type: 'rainfall',
    icon: '🌧️',
    timestamp: '25 mins ago',
    location: 'Shimla District',
    distance: '0.5 km from your location',
    isActive: true
  },
  {
    id: '3',
    title: 'Landslide Risk Zone',
    description: 'Soil saturation detected. Avoid steep slopes and unstable terrain.',
    severity: 'medium',
    type: 'landslide',
    icon: '⛰️',
    timestamp: '1 hour ago',
    location: 'Mall Road Area',
    distance: '1.2 km from your location',
    isActive: true
  },
  {
    id: '4',
    title: 'Power Outage Alert',
    description: 'Electrical supply disrupted due to weather conditions. Backup power recommended.',
    severity: 'medium',
    type: 'power',
    icon: '⚡',
    timestamp: '2 hours ago',
    location: 'Lower Bazaar',
    distance: '0.8 km from your location',
    isActive: false
  },
  {
    id: '5',
    title: 'Forest Fire Watch',
    description: 'Dry conditions detected. Maintain fire safety protocols in forest areas.',
    severity: 'low',
    type: 'fire',
    icon: '🔥',
    timestamp: '4 hours ago',
    location: 'Jakhu Hill',
    distance: '3.1 km from your location',
    isActive: false
  },
  {
    id: '6',
    title: 'Weather Advisory',
    description: 'Temperature drop expected. Travelers advised to carry warm clothing.',
    severity: 'low',
    type: 'weather',
    icon: '🌡️',
    timestamp: '6 hours ago',
    location: 'Rohtang Pass',
    distance: '45 km from your location',
    isActive: false
  }
];

type FilterType = 'all' | 'high' | 'medium' | 'low';
type SortType = 'newest' | 'closest';

export default function AlertsPage() {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Helper function to parse timestamp for sorting
  const parseTime = (timestamp: string): number => {
    const value = parseInt(timestamp.match(/\d+/)?.[0] || '0');
    if (timestamp.includes('min')) return value;
    if (timestamp.includes('hour')) return value * 60;
    return value * 1440; // days
  };

  // Filter and sort alerts
  const filteredAndSortedAlerts = useMemo(() => {
    let filtered = mockAlerts;

    // Apply severity filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(alert => alert.severity === activeFilter);
    }

    // Apply sorting
    if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => {
        const timeA = parseTime(a.timestamp);
        const timeB = parseTime(b.timestamp);
        return timeA - timeB;
      });
    } else {
      filtered = [...filtered].sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      });
    }

    return filtered;
  }, [activeFilter, sortBy]);

  // Get severity styling
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high':
        return {
          badge: 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg',
          card: 'from-red-50 to-red-100 border-red-200',
          glow: 'shadow-red-200'
        };
      case 'medium':
        return {
          badge: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg',
          card: 'from-yellow-50 to-yellow-100 border-yellow-200',
          glow: 'shadow-yellow-200'
        };
      case 'low':
        return {
          badge: 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg',
          card: 'from-green-50 to-green-100 border-green-200',
          glow: 'shadow-green-200'
        };
      default:
        return {
          badge: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-lg',
          card: 'from-gray-50 to-gray-100 border-gray-200',
          glow: 'shadow-gray-200'
        };
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 via-white to-slate-50 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Safety Alerts</h1>
              <p className="text-xs text-slate-500">Real-time emergency updates</p>
            </div>
          </div>
          <button
            onClick={() => setShowInfoModal(true)}
            className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <Info className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="px-6 py-4 space-y-4">
        {/* Severity Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <span className="text-sm font-medium text-slate-600 whitespace-nowrap">Filter:</span>
          {(['all', 'high', 'medium', 'low'] as FilterType[]).map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? filter === 'high'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                    : filter === 'medium'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg'
                    : filter === 'low'
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg'
                    : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
              {filter !== 'all' && (
                <span className="ml-1 text-xs opacity-75">
                  {mockAlerts.filter(a => a.severity === filter).length}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Sort Control */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-600">
              {filteredAndSortedAlerts.length} alert{filteredAndSortedAlerts.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center space-x-2 px-3 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <span className="text-sm text-slate-600">
                {sortBy === 'newest' ? 'Newest First' : 'Closest First'}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>
            
            <AnimatePresence>
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 min-w-[140px] z-50"
                >
                  {(['newest', 'closest'] as SortType[]).map((sort) => (
                    <button
                      key={sort}
                      onClick={() => {
                        setSortBy(sort);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                        sortBy === sort ? 'text-blue-600 font-medium' : 'text-slate-700'
                      }`}
                    >
                      {sort === 'newest' ? 'Newest First' : 'Closest First'}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="px-6 pb-24 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedAlerts.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">You&apos;re Safe!</h3>
              <p className="text-slate-600 text-sm max-w-[250px] mx-auto">
                No current alerts in your area. We&apos;ll notify you if anything changes.
              </p>
            </motion.div>
          ) : (
            filteredAndSortedAlerts.map((alert, index) => {
              const styles = getSeverityStyles(alert.severity);
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-gradient-to-r ${styles.card} border rounded-2xl p-5 shadow-lg ${styles.glow} hover:shadow-xl transition-all cursor-pointer`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Alert Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
                        <span className="text-2xl">{alert.icon}</span>
                      </div>
                    </div>

                    {/* Alert Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-slate-900 text-base leading-tight">
                          {alert.title}
                        </h3>
                        <motion.div
                          animate={alert.severity === 'high' && alert.isActive ? {
                            scale: [1, 1.1, 1],
                            opacity: [1, 0.8, 1]
                          } : {}}
                          transition={{ 
                            repeat: alert.severity === 'high' && alert.isActive ? Infinity : 0,
                            duration: 2
                          }}
                          className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ${styles.badge}`}
                        >
                          {alert.severity.toUpperCase()}
                        </motion.div>
                      </div>
                      
                      <p className="text-sm text-slate-700 mb-3 line-clamp-2">
                        {alert.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-xs text-slate-600">
                          <Clock className="w-3 h-3" />
                          <span>{alert.timestamp}</span>
                          {alert.isActive && (
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-1"></div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-600">
                          <MapPin className="w-3 h-3" />
                          <span>{alert.location} • {alert.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Alert Severity Levels</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>
                  <div>
                    <span className="font-semibold text-red-700">HIGH</span>
                    <p className="text-xs text-slate-600">Immediate action required</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                  <div>
                    <span className="font-semibold text-yellow-700">MEDIUM</span>
                    <p className="text-xs text-slate-600">Caution advised</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                  <div>
                    <span className="font-semibold text-green-700">LOW</span>
                    <p className="text-xs text-slate-600">Advisory information</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-full mt-6 bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 rounded-xl font-semibold hover:from-slate-700 hover:to-slate-800 transition-all"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
