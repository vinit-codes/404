'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        {/* Logo and Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">SafeTour</h1>
          <p className="text-slate-600 text-sm">Your Safety Companion on Every Journey</p>
        </motion.div>

        {/* Login Card */}
        <Card>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {step === 'email' ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">Welcome Back</h2>
                  <p className="text-slate-600 text-sm">Enter your email to continue</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <Button
                  onClick={handleEmailSubmit}
                  className="w-full"
                  disabled={!email}
                >
                  Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">Enter OTP</h2>
                  <p className="text-slate-600 text-sm">
                    We&apos;ve sent a code to {email}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    6-Digit Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-center text-lg tracking-widest"
                  />
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleLogin}
                    className="w-full"
                    disabled={otp.length !== 6}
                  >
                    Login to SafeTour
                  </Button>
                  
                  <button
                    onClick={() => setStep('email')}
                    className="w-full text-sm text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    ← Back to email
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </Card>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center space-y-2"
        >
          <p className="text-slate-600 text-sm">✅ Real-time Safety Zones</p>
          <p className="text-slate-600 text-sm">⚠️ Disaster Alerts</p>
          <p className="text-slate-600 text-sm">🚨 Emergency SOS</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
