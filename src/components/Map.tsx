'use client';

import { useEffect, useState, useCallback } from 'react';
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
  type: 'danger' | 'critical' | 'severe';
  icon: string;
  lastUpdated: string;
  casualties?: string;
  roadStatus: string;
  alternateRoute?: string;
}

interface RescueCamp {
  id: string;
  name: string;
  position: [number, number];
  capacity: string;
  contact: string;
  facilities: string[];
  status: 'active' | 'full' | 'emergency';
  distance: string;
}

// CRITICAL DANGER ZONES - Based on real landslide/flood prone areas in Himachal Pradesh
const dangerZones: Zone[] = [
  {
    id: '1',
    name: 'Kinnaur Highway - Landslide Zone',
    position: [31.5804, 78.2357],
    radius: 1500,
    color: '#dc2626',
    fillColor: '#fecaca',
    risk: 'CRITICAL: Active landslide area. Highway NH-5 completely blocked. Multiple casualties reported. DO NOT ENTER.',
    type: 'critical',
    icon: '🚨',
    lastUpdated: '2 hours ago',
    casualties: '3 confirmed, 7 missing',
    roadStatus: 'CLOSED - Highway NH-5 blocked by debris',
    alternateRoute: 'Use NH-22 via Rampur → Shimla (Add 4 hours)'
  },
  {
    id: '2',
    name: 'Kullu Valley - Flash Flood Zone',
    position: [32.1265, 77.1094],
    radius: 2000,
    color: '#dc2626',
    fillColor: '#fecaca',
    risk: 'SEVERE FLOOD ALERT: Beas River overflowing. Water level 8ft above danger mark. Immediate evacuation required.',
    type: 'severe',
    icon: '🌊',
    lastUpdated: '30 minutes ago',
    casualties: 'No casualties yet',
    roadStatus: 'FLOODED - Kullu-Manali road underwater',
    alternateRoute: 'Use mountain road via Mandi (Add 6 hours)'
  },
  {
    id: '3',
    name: 'Shimla Mall Road Area - Landslip Risk',
    position: [31.1040, 77.1734],
    radius: 800,
    color: '#ef4444',
    fillColor: '#fee2e2',
    risk: 'HIGH RISK: Retaining wall cracks detected near Mall Road. Soil saturation at 90%. Avoid steep areas.',
    type: 'danger',
    icon: '⚠️',
    lastUpdated: '1 hour ago',
    casualties: 'None reported',
    roadStatus: 'RESTRICTED - Heavy vehicles banned',
    alternateRoute: 'Use Lower Bazaar → Cart Road'
  },
  {
    id: '4',
    name: 'Rohtang Pass - Avalanche Zone',
    position: [32.3726, 77.2497],
    radius: 3000,
    color: '#b91c1c',
    fillColor: '#fca5a5',
    risk: 'EXTREME DANGER: Avalanche warning issued. Snow accumulation 12ft. Temperature rising rapidly. ROAD CLOSED.',
    type: 'critical',
    icon: '❄️',
    lastUpdated: '45 minutes ago',
    casualties: '1 vehicle trapped, rescue ongoing',
    roadStatus: 'CLOSED - Avalanche risk, no passage',
    alternateRoute: 'No alternative route available'
  },
  {
    id: '5',
    name: 'Dharamshala - Mudslide Area',
    position: [32.2190, 76.3234],
    radius: 1200,
    color: '#dc2626',
    fillColor: '#fecaca',
    risk: 'ACTIVE MUDSLIDE: Continuous rainfall causing soil erosion. 15 houses evacuated. Approach with extreme caution.',
    type: 'severe',
    icon: '🏔️',
    lastUpdated: '20 minutes ago',
    casualties: '2 injured, evacuated safely',
    roadStatus: 'ONE LANE OPEN - Convoy system in place',
    alternateRoute: 'Use Palampur → Baijnath route'
  }
];

// RESCUE CAMPS AND EMERGENCY CENTERS
const rescueCamps: RescueCamp[] = [
  {
    id: '1',
    name: 'Shimla Emergency Relief Center',
    position: [31.1048, 77.1734],
    capacity: '500 people',
    contact: '+91-177-2804344 (24/7)',
    facilities: ['Medical Aid', 'Food & Water', 'Temporary Shelter', 'Communication'],
    status: 'active',
    distance: '0 km'
  },
  {
    id: '2',
    name: 'Kullu District Emergency Camp',
    position: [31.9576, 77.1094],
    capacity: '800 people',
    contact: '+91-1902-222333',
    facilities: ['Helicopter Landing', 'Medical Team', 'Food Distribution', 'Rescue Equipment'],
    status: 'active',
    distance: '2.3 km'
  },
  {
    id: '3',
    name: 'Manali Rescue Base Station',
    position: [32.2396, 77.1887],
    capacity: '300 people',
    contact: '+91-1902-252116',
    facilities: ['Mountain Rescue', 'First Aid', 'Emergency Supplies', 'Weather Updates'],
    status: 'emergency',
    distance: '5.7 km'
  },
  {
    id: '4',
    name: 'Dharamshala Relief Camp',
    position: [32.2190, 76.3234],
    capacity: '600 people (FULL)',
    contact: '+91-1892-224344',
    facilities: ['Temporary Shelter', 'Medical Care', 'Food Service'],
    status: 'full',
    distance: '12.8 km'
  }
];

interface MapProps {
  onSOSPress?: () => void;
}

export default function Map({ onSOSPress }: MapProps) {
  const [isClient, setIsClient] = useState(false);
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedCamp, setSelectedCamp] = useState<RescueCamp | null>(null);
  const [showNavigation, setShowNavigation] = useState(false);
  const [currentLocation] = useState<[number, number]>([31.1048, 77.1734]); // Shimla center

  // Utility function to calculate distance between two coordinates
  const calculateDistance = (pos1: [number, number], pos2: [number, number]): string => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (pos2[0] - pos1[0]) * Math.PI / 180;
    const dLon = (pos2[1] - pos1[1]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(pos1[0] * Math.PI / 180) * Math.cos(pos2[0] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance.toFixed(1);
  };

  // Find nearest rescue camp to current location
  const findNearestCamp = useCallback((): RescueCamp => {
    return rescueCamps.reduce((nearest, camp) => {
      const nearestDistance = parseFloat(calculateDistance(currentLocation, nearest.position));
      const campDistance = parseFloat(calculateDistance(currentLocation, camp.position));
      return campDistance < nearestDistance ? camp : nearest;
    });
  }, [currentLocation]);

  // Handle zone click for navigation
  const handleZoneClick = (zone: Zone) => {
    setSelectedZone(zone);
    setShowNavigation(true);
  };

  // Handle camp click for information
  const handleCampClick = (camp: RescueCamp) => {
    setSelectedCamp(camp);
    setShowNavigation(true);
  };

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
            
            {/* DANGER ZONES - Critical Areas */}
            {dangerZones.map((zone) => (
              <Circle
                key={zone.id}
                center={zone.position}
                radius={zone.radius}
                color={zone.color}
                fillColor={zone.fillColor}
                fillOpacity={0.7}
                weight={4}
                eventHandlers={{
                  click: () => handleZoneClick(zone),
                }}
              >
                <Popup className="danger-popup">
                  <div className="p-3 min-w-[280px] max-w-[320px]">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-2xl">{zone.icon}</span>
                      <div>
                        <h3 className="font-bold text-red-800 text-base">{zone.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          zone.type === 'critical' ? 'bg-red-600 text-white' :
                          zone.type === 'severe' ? 'bg-red-500 text-white' :
                          'bg-red-400 text-white'
                        }`}>
                          {zone.type.toUpperCase()} RISK
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="bg-red-50 p-2 rounded border-l-4 border-red-500">
                        <p className="font-semibold text-red-900">⚠️ EMERGENCY ALERT</p>
                        <p className="text-red-800">{zone.risk}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2 mt-3">
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="font-semibold text-gray-700">🚧 Road Status:</p>
                          <p className="text-gray-600">{zone.roadStatus}</p>
                        </div>
                        
                        {zone.alternateRoute && (
                          <div className="bg-blue-50 p-2 rounded">
                            <p className="font-semibold text-blue-700">🔄 Alternative Route:</p>
                            <p className="text-blue-600">{zone.alternateRoute}</p>
                          </div>
                        )}
                        
                        {zone.casualties && (
                          <div className="bg-red-50 p-2 rounded">
                            <p className="font-semibold text-red-700">🚨 Casualties:</p>
                            <p className="text-red-600">{zone.casualties}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Last Updated: {zone.lastUpdated} | 
                          Distance: {calculateDistance(currentLocation, zone.position)} km
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => handleCampClick(findNearestCamp())}
                        className="w-full mt-2 bg-green-600 text-white py-2 px-3 rounded font-semibold text-sm hover:bg-green-700 transition-colors"
                      >
                        🏕️ Find Nearest Rescue Camp
                      </button>
                    </div>
                  </div>
                </Popup>
              </Circle>
            ))}

            {/* RESCUE CAMPS */}
            {rescueCamps.map((camp) => (
              <Marker 
                key={camp.id} 
                position={camp.position}
                eventHandlers={{
                  click: () => handleCampClick(camp),
                }}
              >
                <Popup className="rescue-popup">
                  <div className="p-3 min-w-[260px]">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-2xl">🏕️</span>
                      <div>
                        <h3 className="font-bold text-green-800">{camp.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          camp.status === 'active' ? 'bg-green-500 text-white' :
                          camp.status === 'emergency' ? 'bg-orange-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {camp.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="bg-green-50 p-2 rounded">
                        <p className="font-semibold text-green-700">📍 Capacity: {camp.capacity}</p>
                        <p className="font-semibold text-green-700">📞 Emergency Contact:</p>
                        <p className="text-green-600 font-mono">{camp.contact}</p>
                      </div>
                      
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="font-semibold text-blue-700">🏥 Available Facilities:</p>
                        <ul className="list-disc list-inside text-blue-600 mt-1">
                          {camp.facilities.map((facility, index) => (
                            <li key={index}>{facility}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-3 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Distance from your location: {calculateDistance(currentLocation, camp.position)} km
                        </p>
                      </div>
                      
                      {camp.status !== 'full' && (
                        <button className="w-full mt-2 bg-blue-600 text-white py-2 px-3 rounded font-semibold text-sm hover:bg-blue-700 transition-colors">
                          🧭 Get Directions
                        </button>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Current Location Marker */}
            <Marker position={currentLocation}>
              <Popup>
                <div className="text-center p-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                  <p className="font-medium text-blue-900">📍 Your Current Location</p>
                  <p className="text-xs text-blue-600">Shimla, Himachal Pradesh</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Lat: {currentLocation[0]}, Lng: {currentLocation[1]}
                  </p>
                  <button 
                    onClick={() => handleCampClick(findNearestCamp())}
                    className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors"
                  >
                    🏕️ Nearest Safe Camp
                  </button>
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
  }, [isClient, currentLocation, findNearestCamp]);

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
