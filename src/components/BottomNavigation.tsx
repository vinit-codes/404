'use client';

import { motion } from 'framer-motion';
import { Home, AlertTriangle, Phone, User, Download } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const navItems = [
  { icon: User, label: 'Login', href: '/' },
  { icon: Home, label: 'Home', href: '/home' },
  { icon: AlertTriangle, label: 'Alerts', href: '/alerts' },
  { icon: Phone, label: 'SOS', href: '/sos' },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      // @ts-expect-error - navigator.standalone is iOS specific
      const isIOSInstalled = window.navigator.standalone === true;
      const isAndroidInstalled = window.matchMedia('(display-mode: standalone)').matches;
      setIsInstalled(isIOSInstalled || isAndroidInstalled);
    };

    checkInstalled();

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-md border-t border-slate-200 px-6 py-2"
    >
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 w-8 h-1 bg-blue-600 rounded-full"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
        
        {/* PWA Install Button */}
        {isInstallable && !isInstalled && (
          <motion.button
            onClick={handleInstallClick}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center py-2 px-3 rounded-xl transition-colors text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <Download size={20} />
            <span className="text-xs mt-1 font-medium">Install</span>
          </motion.button>
        )}
      </div>
    </motion.nav>
  );
}
