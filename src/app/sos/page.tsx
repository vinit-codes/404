'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Phone, MapPin, Users, Shield, CheckCircle, AlertCircle, Loader2, Navigation, Heart } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: 'family' | 'emergency' | 'medical';
}

const emergencyContacts: EmergencyContact[] = [
  { id: '1', name: 'Emergency Services', number: '108', type: 'emergency' },
  { id: '2', name: 'Police', number: '100', type: 'emergency' },
  { id: '3', name: 'Fire Department', number: '101', type: 'emergency' },
  { id: '4', name: 'Medical Emergency', number: '102', type: 'medical' },
];

type SOSStatus = 'idle' | 'sending' | 'sent' | 'failed';

export default function SOSPage() {
  const [sosStatus, setSosStatus] = useState<SOSStatus>('idle');
  const [showLocationShare, setShowLocationShare] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentLocation] = useState('Shimla, Himachal Pradesh');

  const handleSOSActivation = async () => {
    setSosStatus('sending');
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setSosStatus('sent');
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setSosStatus('sent');
    }, 3000);
  };

  const resetSOS = () => {
    setSosStatus('idle');
    setProgress(0);
    setShowLocationShare(false);
  };

  const shareLocation = () => {
    setShowLocationShare(true);
    // Simulate location sharing
    setTimeout(() => {
      setShowLocationShare(false);
    }, 3000);
  };

  // Dynamic import for map component (client-side only)
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Load map component dynamically
    const loadMap = async () => {
      try {
        const L = await import('leaflet');
        const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet');
        
        // Fix Leaflet default icon issue
        // @ts-expect-error - Fix for Leaflet icon issue
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: '/leaflet/marker-icon-2x.png',
          iconUrl: '/leaflet/marker-icon.png',
          shadowUrl: '/leaflet/marker-shadow.png',
        });

        const EmergencyMap = () => (
          <MapContainer
            center={[31.1048, 77.1734]}
            zoom={15}
            scrollWheelZoom={false}
            className="w-full h-full rounded-2xl"
            style={{ height: '200px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[31.1048, 77.1734]}>
              <Popup>
                <div className="text-center p-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                  <p className="font-medium text-red-900">🚨 Your Emergency Location</p>
                  <p className="text-xs text-red-600">Live location being shared</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        );

        setMapComponent(() => EmergencyMap);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    if (isClient) {
      loadMap();
    }
  }, [isClient]);

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-red-50 via-white to-orange-50 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-red-100 px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Shield className="w-6 h-6 text-red-600" />
            <h1 className="text-2xl font-bold text-slate-900">Emergency SOS</h1>
          </div>
          <p className="text-sm text-slate-600">Your safety is our priority</p>
        </motion.div>
      </div>

      {/* Status Feedback */}
      <AnimatePresence mode="wait">
        {sosStatus === 'sending' && (
          <motion.div
            key="sending"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-6 mt-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white"
          >
            <div className="flex items-center space-x-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              <div className="flex-1">
                <h3 className="font-semibold">Sending Emergency Alert...</h3>
                <div className="w-full bg-blue-400 rounded-full h-2 mt-2">
                  <motion.div
                    className="bg-white h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-blue-100 text-sm mt-1">{progress}% Complete</p>
              </div>
            </div>
          </motion.div>
        )}

        {sosStatus === 'sent' && (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mx-6 mt-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <CheckCircle className="w-10 h-10" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Alert Sent Successfully!</h3>
              <p className="text-green-100 mb-4">Emergency services and contacts have been notified</p>
              <button
                onClick={resetSOS}
                className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl font-semibold transition-colors"
              >
                Reset
              </button>
            </div>
          </motion.div>
        )}

        {sosStatus === 'failed' && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mx-6 mt-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-5 text-white"
          >
            <div className="text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2">Failed to Send Alert</h3>
              <p className="text-red-100 mb-4">Please try again or call emergency services directly</p>
              <button
                onClick={resetSOS}
                className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero SOS Button */}
      <div className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          {sosStatus === 'idle' && (
            <div className="relative mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSOSActivation}
                className="relative w-56 h-56 mx-auto bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full shadow-2xl flex flex-col items-center justify-center text-white font-bold overflow-hidden group"
              >
                {/* Pulsing rings */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.6, 1],
                    opacity: [0.8, 0, 0.8]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-red-500 rounded-full"
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.3, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                  className="absolute inset-2 bg-red-400 rounded-full"
                />

                {/* Button content */}
                <div className="relative z-10">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3,
                      ease: "easeInOut"
                    }}
                  >
                    <Phone className="w-12 h-12 mb-3" />
                  </motion.div>
                  <div className="text-3xl font-black tracking-wider">SOS</div>
                  <div className="text-sm font-medium opacity-90 mt-1">EMERGENCY</div>
                </div>

                {/* Ripple effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20"
                  whileHover={{ scale: [0, 1] }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-slate-700 text-center max-w-sm mx-auto mt-6 leading-relaxed"
              >
                <span className="font-semibold">Tap to activate emergency protocol.</span><br />
                Your location will be shared with emergency services and trusted contacts.
              </motion.p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Immediate Action Cards */}
      {sosStatus === 'idle' && (
        <div className="px-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { 
                icon: Phone, 
                label: 'Call Helpline', 
                color: 'from-blue-500 to-blue-600',
                action: () => window.open('tel:108')
              },
              { 
                icon: Navigation, 
                label: 'Share Location', 
                color: 'from-green-500 to-green-600',
                action: shareLocation
              },
              { 
                icon: Users, 
                label: 'Alert Contacts', 
                color: 'from-purple-500 to-purple-600',
                action: () => {}
              }
            ].map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className={`bg-gradient-to-br ${action.color} p-4 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <action.icon className="w-8 h-8 mx-auto mb-2" />
                <p className="text-xs font-semibold">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Location Share Feedback */}
      <AnimatePresence>
        {showLocationShare && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-6 mb-6 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white"
          >
            <div className="flex items-center space-x-3">
              <Navigation className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Location Shared</h3>
                <p className="text-green-100 text-sm">Your live location is now being tracked</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Map Integration */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">Your Location</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-600">Live</span>
            </div>
          </div>
          
          <div className="relative">
            {isClient && MapComponent ? (
              <MapComponent />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-slate-400 animate-spin mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">Loading map...</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-3 flex items-center space-x-2 text-sm text-slate-600">
            <MapPin className="w-4 h-4" />
            <span>{currentLocation}</span>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-2 gap-3">
          {emergencyContacts.map((contact, index) => (
            <motion.a
              key={contact.id}
              href={`tel:${contact.number}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:border-red-300 hover:shadow-md transition-all duration-300"
            >
              <div className="text-center">
                <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${
                  contact.type === 'emergency' ? 'bg-red-100' :
                  contact.type === 'medical' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  <Phone className={`w-5 h-5 ${
                    contact.type === 'emergency' ? 'text-red-600' :
                    contact.type === 'medical' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{contact.name}</h3>
                <p className="text-slate-600 text-xs font-mono">{contact.number}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Safety Footer */}
      <div className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200"
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-slate-900">Safety First</h3>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <p>• Stay calm and assess your situation</p>
              <p>• Conserve battery and signal strength</p>
              <p>• Follow local emergency guidelines</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-300">
              <p className="text-xs text-slate-500">
                In case of network failure, find nearest authority or safe location.
                This app requires internet connection for full functionality.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
