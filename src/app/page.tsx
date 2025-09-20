'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const router = useRouter();

  const handleEmailSubmit = () => {
    if (email) {
      setStep('otp');
    }
  };

  const handleLogin = () => {
    // Mock login - redirect to home
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          {/* Professional Logo and Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur-lg opacity-60" />
              {/* Main logo container */}
              <div className="relative w-full h-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-2xl">
                <Shield className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-3">
              SafeNav
            </h1>
            <p className="text-gray-300 text-lg font-medium">Emergency Response System</p>
            <p className="text-gray-400 text-sm mt-1">Your Safety Companion on Every Journey</p>
          </motion.div>

          {/* Enhanced Login Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {step === 'email' ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-300 text-sm">Enter your credentials to access the emergency system</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="emergency@safenav.com"
                      className="w-full px-5 py-4 rounded-2xl bg-white/20 border border-white/30 focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all text-white placeholder-gray-300 backdrop-blur-sm"
                    />
                  </div>

                  <Button
                    onClick={handleEmailSubmit}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] border-2 border-white/20"
                    disabled={!email}
                  >
                    Continue to Security
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                  {/* Admin Demo Access */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-transparent text-gray-400">or</span>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => router.push('/admin')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-white/20 flex items-center justify-center space-x-2"
                  >
                    <Shield className="w-5 h-5" />
                    <span>Login as Admin (Demo Access)</span>
                  </motion.button>

                  {/* Quick access demo button */}
                  <div className="text-center">
                    <button
                      onClick={handleLogin}
                      className="text-gray-300 hover:text-white text-sm underline transition-colors"
                    >
                      User Demo Access (Skip Login)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Security Verification</h2>
                    <p className="text-gray-300 text-sm">
                      We&apos;ve sent a secure code to <span className="text-red-300 font-medium">{email}</span>
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3">
                      6-Digit Security Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="• • • • • •"
                      maxLength={6}
                      className="w-full px-5 py-4 rounded-2xl bg-white/20 border border-white/30 focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all text-white placeholder-gray-300 text-center text-2xl tracking-[0.5em] backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={handleLogin}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] border-2 border-white/20"
                      disabled={otp.length !== 6}
                    >
                      Access Emergency System
                    </Button>
                    
                    <button
                      onClick={() => setStep('email')}
                      className="w-full text-gray-300 hover:text-white transition-colors py-2 text-sm font-medium"
                    >
                      ← Back to credentials
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Professional Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-4"
          >
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 text-sm">✓</span>
                </div>
                <span className="text-sm font-medium">Real-time Disaster Monitoring</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <span className="text-yellow-400 text-sm">⚠</span>
                </div>
                <span className="text-sm font-medium">Intelligent Safety Alerts</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-red-400 text-sm">🚨</span>
                </div>
                <span className="text-sm font-medium">Emergency Response Network</span>
              </div>
            </div>
            
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-gray-400 text-xs">
                Powered by Advanced Emergency Response Technology
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
