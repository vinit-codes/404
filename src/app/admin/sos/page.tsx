'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Clock, 
  User, 
  Mail, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  X
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { mockSOSRequests, SOSRequest } from '@/lib/mockData';

const urgencyColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200'
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  acknowledged: 'bg-blue-100 text-blue-800 border-blue-200',
  resolved: 'bg-green-100 text-green-800 border-green-200'
};

export default function SOSManagement() {
  const [sosRequests, setSOSRequests] = useState<SOSRequest[]>(mockSOSRequests);
  const [selectedSOS, setSelectedSOS] = useState<SOSRequest | null>(null);
  const [mapComponent, setMapComponent] = useState<React.ComponentType<{ coordinates: [number, number]; location: string }> | null>(null);

  // Load map component dynamically to avoid SSR issues
  useEffect(() => {
    import('react-leaflet').then(({ MapContainer, TileLayer, Marker, Popup }) => {
      const MapComponent = ({ coordinates, location }: { coordinates: [number, number]; location: string }) => (
        <MapContainer
          center={coordinates}
          zoom={13}
          style={{ height: '300px', width: '100%' }}
          className="rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates}>
            <Popup>{location}</Popup>
          </Marker>
        </MapContainer>
      );
      setMapComponent(() => MapComponent);
    });
  }, []);

  const handleAcknowledge = (sosId: string) => {
    setSOSRequests(sosRequests.map(sos => 
      sos.id === sosId ? { ...sos, status: 'acknowledged' as const } : sos
    ));
  };

  const handleResolve = (sosId: string) => {
    setSOSRequests(sosRequests.map(sos => 
      sos.id === sosId ? { ...sos, status: 'resolved' as const } : sos
    ));
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return 'ℹ️';
      default: return '📢';
    }
  };

  const SOSDetailModal = ({ sos, onClose }: { sos: SOSRequest; onClose: () => void }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getUrgencyIcon(sos.urgency)}</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">SOS Request Details</h2>
                  <p className="text-sm text-gray-600">Request ID: {sos.id}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Information</h3>
                
                {/* Status and Urgency */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[sos.status]}`}>
                    {sos.status.charAt(0).toUpperCase() + sos.status.slice(1)}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${urgencyColors[sos.urgency]}`}>
                    {sos.urgency.charAt(0).toUpperCase() + sos.urgency.slice(1)} Urgency
                  </div>
                </div>

                {/* User Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{sos.userName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{sos.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{sos.phone}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-700">{sos.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{formatTimestamp(sos.timestamp)}</span>
                  </div>
                  {sos.responseTime && (
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">Response Time: {sos.responseTime}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Emergency Description</h4>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
                  {sos.description}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {sos.status === 'pending' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleAcknowledge(sos.id);
                      onClose();
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Acknowledge Request</span>
                  </motion.button>
                )}
                {(sos.status === 'pending' || sos.status === 'acknowledged') && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleResolve(sos.id);
                      onClose();
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark as Resolved</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Map */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                {mapComponent ? (
                  React.createElement(mapComponent, { coordinates: sos.coordinates, location: sos.location })
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <p>Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Coordinates: {sos.coordinates[0]}, {sos.coordinates[1]}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

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
            <h1 className="text-2xl font-bold text-gray-900">SOS Requests</h1>
            <p className="text-gray-600">Emergency assistance requests management</p>
          </div>
          <div className="flex space-x-4">
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {sosRequests.filter(s => s.status === 'pending').length} Pending
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {sosRequests.filter(s => s.status === 'acknowledged').length} In Progress
            </div>
          </div>
        </motion.div>

        {/* SOS Requests List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sosRequests.map((sos, index) => (
            <motion.div
              key={sos.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className={`p-4 ${sos.urgency === 'high' ? 'bg-red-50' : sos.urgency === 'medium' ? 'bg-yellow-50' : 'bg-green-50'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getUrgencyIcon(sos.urgency)}</span>
                    <span className="font-medium text-gray-900">{sos.id}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${urgencyColors[sos.urgency]}`}>
                    {sos.urgency.charAt(0).toUpperCase() + sos.urgency.slice(1)}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">{sos.userName}</span>
                </div>
                
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-700">{sos.location}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{formatTimestamp(sos.timestamp)}</span>
                </div>

                <p className="text-sm text-gray-700 line-clamp-2">{sos.description}</p>

                <div className={`px-2 py-1 rounded-full text-xs font-medium border inline-block ${statusColors[sos.status]}`}>
                  {sos.status.charAt(0).toUpperCase() + sos.status.slice(1)}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-gray-100 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSOS(sos)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </motion.button>

                <div className="flex space-x-2">
                  {sos.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAcknowledge(sos.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Acknowledge
                    </motion.button>
                  )}
                  {(sos.status === 'pending' || sos.status === 'acknowledged') && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleResolve(sos.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Resolve
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SOS Detail Modal */}
        {selectedSOS && (
          <SOSDetailModal
            sos={selectedSOS}
            onClose={() => setSelectedSOS(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
}
