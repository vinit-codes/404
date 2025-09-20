'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Phone, 
  Users, 
  BarChart3, 
  Settings, 
  Menu, 
  Shield,
  LogOut
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: AlertTriangle, label: 'Alerts', href: '/admin/alerts' },
  { icon: Phone, label: 'SOS Requests', href: '/admin/sos' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className={`bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'lg:translate-y-0 -translate-y-full' : 'translate-y-0'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">SafeNav Admin</span>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
              >
                Demo Mode
              </motion.div>
              
              <Link 
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Exit Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0 lg:z-10`}>

        {/* Mobile header - shows when sidebar is open and navbar is hidden */}
        <div className={`lg:hidden px-4 py-4 border-b border-gray-200 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SafeNav Admin</span>
          </div>
        </div>

        {/* Sidebar content */}
        <div className={`flex flex-col h-full ${sidebarOpen ? 'pt-20 lg:pt-20' : 'pt-20 lg:pt-20'}`}>
          <nav className="flex-1 px-4 pb-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="ml-auto w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              SafeNav Admin Dashboard
              <br />
              Emergency Management System
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className={`transition-all duration-300 ease-in-out lg:ml-64 ${
        sidebarOpen ? 'pt-8' : 'pt-24'
      } lg:pt-24`}>
        <main className="p-6 relative z-10 min-h-screen">
          <div className="pt-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
