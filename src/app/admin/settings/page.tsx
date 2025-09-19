'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Moon,
  Sun,
  Monitor,
  Save,
  RefreshCw,
  MapPin,
  Key,
  Database,
  Activity
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function Settings() {
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState({
    newAlerts: true,
    sosRequests: true,
    systemUpdates: false,
    weeklyReports: true,
    criticalAlerts: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    instantAlerts: true,
    sosRequests: true,
    systemMaintenance: false,
    userActions: false
  });

  // System Settings
  const [autoEscalation, setAutoEscalation] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(30);
  const [language, setLanguage] = useState('en');

  // Security Settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(60);
  const [loginNotifications, setLoginNotifications] = useState(true);

  // Map Settings
  const [defaultMapZoom, setDefaultMapZoom] = useState(10);
  const [mapStyle, setMapStyle] = useState('satellite');
  const [showEmergencyZones, setShowEmergencyZones] = useState(true);

  const ToggleSwitch = ({ enabled, onToggle, label, description }: {
    enabled: boolean;
    onToggle: (value: boolean) => void;
    label: string;
    description?: string;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <motion.button
        onClick={() => onToggle(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
          layout
        />
      </motion.button>
    </div>
  );

  const SettingCard = ({ title, icon: Icon, children }: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </motion.div>
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
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your system preferences and configurations</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notification Settings */}
          <SettingCard title="Notification Settings" icon={Bell}>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Email Notifications</h4>
                <div className="space-y-2">
                  <ToggleSwitch
                    enabled={emailNotifications.newAlerts}
                    onToggle={(value) => setEmailNotifications(prev => ({ ...prev, newAlerts: value }))}
                    label="New Emergency Alerts"
                    description="Get notified when new emergency alerts are reported"
                  />
                  <ToggleSwitch
                    enabled={emailNotifications.sosRequests}
                    onToggle={(value) => setEmailNotifications(prev => ({ ...prev, sosRequests: value }))}
                    label="SOS Requests"
                    description="Receive emails for new SOS requests"
                  />
                  <ToggleSwitch
                    enabled={emailNotifications.weeklyReports}
                    onToggle={(value) => setEmailNotifications(prev => ({ ...prev, weeklyReports: value }))}
                    label="Weekly Reports"
                    description="Get weekly summary reports"
                  />
                  <ToggleSwitch
                    enabled={emailNotifications.criticalAlerts}
                    onToggle={(value) => setEmailNotifications(prev => ({ ...prev, criticalAlerts: value }))}
                    label="Critical Alerts Only"
                    description="Only receive notifications for critical emergencies"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Push Notifications</h4>
                <div className="space-y-2">
                  <ToggleSwitch
                    enabled={pushNotifications.instantAlerts}
                    onToggle={(value) => setPushNotifications(prev => ({ ...prev, instantAlerts: value }))}
                    label="Instant Alerts"
                    description="Real-time push notifications"
                  />
                  <ToggleSwitch
                    enabled={pushNotifications.sosRequests}
                    onToggle={(value) => setPushNotifications(prev => ({ ...prev, sosRequests: value }))}
                    label="SOS Push Notifications"
                    description="Push notifications for SOS requests"
                  />
                </div>
              </div>
            </div>
          </SettingCard>

          {/* System Settings */}
          <SettingCard title="System Settings" icon={SettingsIcon}>
            <div className="space-y-4">
              <ToggleSwitch
                enabled={autoEscalation}
                onToggle={setAutoEscalation}
                label="Auto-escalation"
                description="Automatically escalate unresolved alerts after 30 minutes"
              />

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Theme</label>
                <div className="flex space-x-3">
                  {[
                    { value: 'light', icon: Sun, label: 'Light' },
                    { value: 'dark', icon: Moon, label: 'Dark' },
                    { value: 'system', icon: Monitor, label: 'System' }
                  ].map(({ value, icon: Icon, label }) => (
                    <motion.button
                      key={value}
                      onClick={() => setTheme(value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                        theme === value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <ToggleSwitch
                enabled={soundEnabled}
                onToggle={setSoundEnabled}
                label="Sound Notifications"
                description="Play sound for emergency alerts"
              />

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Auto Refresh Interval</label>
                <select
                  value={autoRefresh}
                  onChange={(e) => setAutoRefresh(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={15}>15 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={300}>5 minutes</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                </select>
              </div>
            </div>
          </SettingCard>

          {/* Security Settings */}
          <SettingCard title="Security Settings" icon={Shield}>
            <div className="space-y-4">
              <ToggleSwitch
                enabled={twoFactorAuth}
                onToggle={setTwoFactorAuth}
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
              />

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Session Timeout</label>
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={240}>4 hours</option>
                  <option value={480}>8 hours</option>
                </select>
              </div>

              <ToggleSwitch
                enabled={loginNotifications}
                onToggle={setLoginNotifications}
                label="Login Notifications"
                description="Get notified of new login attempts"
              />

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Key className="w-4 h-4" />
                  <span>Change Password</span>
                </motion.button>
              </div>
            </div>
          </SettingCard>

          {/* Map Settings */}
          <SettingCard title="Map Settings" icon={MapPin}>
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Default Map Style</label>
                <select
                  value={mapStyle}
                  onChange={(e) => setMapStyle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="streets">Streets</option>
                  <option value="satellite">Satellite</option>
                  <option value="terrain">Terrain</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Default Zoom Level</label>
                <input
                  type="range"
                  min="1"
                  max="18"
                  value={defaultMapZoom}
                  onChange={(e) => setDefaultMapZoom(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>City</span>
                  <span className="font-medium">Level {defaultMapZoom}</span>
                  <span>Street</span>
                </div>
              </div>

              <ToggleSwitch
                enabled={showEmergencyZones}
                onToggle={setShowEmergencyZones}
                label="Show Emergency Zones"
                description="Display emergency zones on the map by default"
              />
            </div>
          </SettingCard>
        </div>

        {/* Advanced Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Advanced Settings</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Data Management</h4>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Clear Cache</span>
              </motion.button>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">System Health</h4>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Activity className="w-4 h-4" />
                <span>System Check</span>
              </motion.button>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Backup & Restore</h4>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Database className="w-4 h-4" />
                <span>Export Data</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Save Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Save className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-900">Settings Auto-saved</h4>
                <p className="text-sm text-blue-700">Your preferences are automatically saved as you make changes.</p>
              </div>
            </div>
            <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
              Last saved: Just now
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
