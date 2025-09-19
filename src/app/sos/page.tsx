'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Phone, MapPin, Wifi, WifiOff, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import BottomNavigation from '@/components/BottomNavigation';

interface NearbyUser {
  id: string;
  name: string;
  distance: string;
  status: 'online' | 'offline';
}

const nearbyUsers: NearbyUser[] = [
  { id: '1', name: 'Alex R.', distance: '0.2 km', status: 'online' },
  { id: '2', name: 'Sarah M.', distance: '0.5 km', status: 'online' },
  { id: '3', name: 'Tourist Guide', distance: '0.8 km', status: 'offline' },
  { id: '4', name: 'Emergency Contact', distance: '1.2 km', status: 'online' },
];

export default function SOSPage() {
  const [sosActivated, setSosActivated] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSOSPress = () => {
    setSosActivated(true);
    setShowConfirmation(true);
    
    // Auto-hide confirmation after 5 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000);
  };

  const cancelSOS = () => {
    setSosActivated(false);
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-100 px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-slate-900">Emergency SOS</h1>
          <p className="text-slate-600 text-sm mt-1">Quick access to emergency services</p>
        </motion.div>
      </div>

      {/* SOS Button Section */}
      <div className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Main SOS Button */}
          <div className="relative mb-8">
            <motion.div
              animate={{
                scale: sosActivated ? [1, 1.1, 1] : 1,
                rotate: sosActivated ? [0, 5, -5, 0] : 0
              }}
              transition={{
                repeat: sosActivated ? Infinity : 0,
                duration: 0.6
              }}
            >
              <Button
                onClick={handleSOSPress}
                variant="danger"
                className="w-40 h-40 rounded-full shadow-2xl text-2xl font-bold relative overflow-hidden"
                disabled={sosActivated}
              >
                <motion.div
                  animate={sosActivated ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ repeat: sosActivated ? Infinity : 0, duration: 1 }}
                  className="flex flex-col items-center"
                >
                  <Phone className="w-8 h-8 mb-2" />
                  <span>SOS</span>
                </motion.div>
                
                {/* Pulsing Ring */}
                {!sosActivated && (
                  <motion.div
                    animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-red-500 rounded-full"
                  />
                )}
              </Button>
            </motion.div>
            
            {sosActivated && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-2"
              >
                <CheckCircle className="w-6 h-6" />
              </motion.div>
            )}
          </div>

          <p className="text-slate-600 text-center max-w-xs mx-auto leading-relaxed">
            Press to share your location with nearby users and authorities
          </p>
        </motion.div>
      </div>

      {/* SOS Confirmation */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-6 mb-6"
          >
            <Card className="bg-green-50 border-green-200">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-900 mb-2">SOS Alert Sent!</h3>
                <p className="text-green-700 text-sm mb-4">
                  Your location has been shared with emergency contacts and nearby users.
                </p>
                <Button
                  onClick={cancelSOS}
                  variant="secondary"
                  size="sm"
                  className="bg-white border-green-300 text-green-700 hover:bg-green-50"
                >
                  Cancel Alert
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Location */}
      <div className="px-6 mb-6">
        <Card>
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-900 mb-1">Current Location</h3>
              <p className="text-slate-600 text-sm">
                Latitude: 31.1048° N<br />
                Longitude: 77.1734° E
              </p>
              <p className="text-slate-500 text-xs mt-2">
                📍 Near Manali, Himachal Pradesh
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Nearby Users */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Nearby Users</h2>
          <div className="flex items-center space-x-1 text-xs text-slate-500">
            <Wifi className="w-3 h-3" />
            <span>Mesh Network</span>
          </div>
        </div>

        <div className="space-y-3">
          {nearbyUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{user.name}</p>
                      <p className="text-slate-500 text-xs">{user.distance} away</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {user.status === 'online' ? (
                      <Wifi className="w-4 h-4 text-green-500" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
