'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Layers, Navigation } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import BottomNavigation from '@/components/BottomNavigation';
import Map from '@/components/Map';

export default function HomePage() {
  const [showLegend, setShowLegend] = useState(false);
  const [sosPressed, setSosPressed] = useState(false);

  const handleSOS = () => {
    setSosPressed(true);
    setTimeout(() => setSosPressed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Map Container */}
      <div className="relative w-full h-screen">
        <Map onSOSPress={handleSOS} />

        {/* Top Controls */}
        <div className="absolute top-4 right-4 z-[1000]">
          <Button
            onClick={() => setShowLegend(true)}
            variant="secondary"
            size="sm"
            className="shadow-lg bg-white/90 backdrop-blur-sm"
          >
            <Layers size={18} />
          </Button>
        </div>

        {/* Navigation Compass */}
        <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
          <Navigation className="w-6 h-6 text-slate-600" />
        </div>

        {/* SOS Confirmation */}
        {sosPressed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-48 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg z-[1000]"
          >
            🚨 SOS Alert Sent!
          </motion.div>
        )}
      </div>

      {/* Legend Modal */}
      <Modal
        isOpen={showLegend}
        onClose={() => setShowLegend(false)}
        title="Safety Zones Legend"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <span className="text-sm">Green Zone - Safe</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
            <span className="text-sm">Yellow Zone - Moderate Risk</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-500 rounded-full" />
            <span className="text-sm">Red Zone - High Risk</span>
          </div>
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Click on any colored zone on the map to get detailed risk information and safety recommendations.
            </p>
          </div>
        </div>
      </Modal>

      <BottomNavigation />
    </div>
  );
}
