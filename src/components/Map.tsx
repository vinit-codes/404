'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  position: [number, number];
  radius: number;
  color: string;
  fillColor: string;
  risk: string;
  type: 'safe' | 'moderate' | 'danger';
  icon: string;
}

const zones: Zone[] = [
  {
    id: '1',
    name: 'Manali City Center',
    position: [32.2432, 77.1892],
    radius: 2000,
    color: '#ef4444',
    fillColor: '#fee2e2',
    risk: 'Landslide likely in this area. Avoid after 6 PM.',
    type: 'danger',
    icon: '🚨'
  },
  {
    id: '2',
    name: 'Solang Valley',
    position: [32.3080, 77.1500],
    radius: 1500,
    color: '#eab308',
    fillColor: '#fef3c7',
    risk: 'Light rainfall expected. Roads may be slippery.',
    type: 'moderate',
    icon: '⚠️'
  },
  {
    id: '3',
    name: 'Rohtang Pass Area',
    position: [32.3726, 77.2497],
    radius: 3000,
    color: '#22c55e',
    fillColor: '#dcfce7',
    risk: 'Safe zone with good weather conditions.',
    type: 'safe',
    icon: '✅'
  }
];

interface MapProps {
  onSOSPress?: () => void;
}

export default function Map({ onSOSPress }: MapProps) {
  const [isClient, setIsClient] = useState(false);
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import Leaflet components only on client side
    const loadMap = async () => {
      try {
        const L = await import('leaflet');
        const { MapContainer, TileLayer, Circle, Popup, Marker } = await import('react-leaflet');
        
        // Fix Leaflet default icon issue in Next.js
        // @ts-expect-error - Fix for Leaflet icon issue in Next.js
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: '/leaflet/marker-icon-2x.png',
          iconUrl: '/leaflet/marker-icon.png',
          shadowUrl: '/leaflet/marker-shadow.png',
        });

        // Create the map component
        const LeafletMap = () => (
          <MapContainer
            center={[31.1048, 77.1734]}
            zoom={10}
            scrollWheelZoom={true}
            className="w-full h-full z-0"
            style={{ height: '100vh', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Safety Zones */}
            {zones.map((zone) => (
              <Circle
                key={zone.id}
                center={zone.position}
                radius={zone.radius}
                color={zone.color}
                fillColor={zone.fillColor}
                fillOpacity={0.6}
                weight={3}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{zone.icon}</span>
                      <h3 className="font-semibold text-slate-900">{zone.name}</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{zone.risk}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        zone.type === 'safe' ? 'bg-green-100 text-green-800' :
                        zone.type === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {zone.type === 'safe' ? 'Safe Zone' :
                         zone.type === 'moderate' ? 'Moderate Risk' : 'High Risk'}
                      </span>
                    </div>
                    {zone.type !== 'safe' && (
                      <div className="mt-2 text-xs text-slate-500">
                        📍 Nearest Safe Shelter: {zone.type === 'moderate' ? '1.2 km' : '2.3 km'} away
                      </div>
                    )}
                  </div>
                </Popup>
              </Circle>
            ))}

            {/* Current Location Marker */}
            <Marker position={[31.1048, 77.1734]}>
              <Popup>
                <div className="text-center p-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                  <p className="font-medium text-slate-900">Your Location</p>
                  <p className="text-xs text-slate-600">Himachal Pradesh, India</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        );

        setMapComponent(() => LeafletMap);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    if (isClient) {
      loadMap();
    }
  }, [isClient]);

  if (!isClient || !MapComponent) {
    // Loading placeholder
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-green-100 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading interactive map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <MapComponent />

      {/* Floating SOS Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-[1000]"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSOSPress}
          className="relative w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-2xl flex items-center justify-center text-white font-bold text-lg overflow-hidden"
        >
          <Phone size={24} className="relative z-10" />
          
          {/* Pulsing ring animation */}
          <motion.div
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-red-500 rounded-full"
          />
          
          {/* Inner pulse */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="absolute inset-2 bg-red-400 rounded-full"
          />
        </motion.button>
        
        {/* SOS Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium"
        >
          Emergency SOS
        </motion.div>
      </motion.div>
    </div>
  );
}
