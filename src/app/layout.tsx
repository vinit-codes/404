import type { Metadata, Viewport } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

export const metadata: Metadata = {
  title: "SafeNav - Emergency Alert System",
  description: "Emergency disaster alert and SOS system for tourist safety and disaster management",
  applicationName: "SafeNav",
  authors: [{ name: "SafeNav Team" }],
  generator: "Next.js",
  keywords: ["emergency", "disaster", "SOS", "safety", "alerts", "tourism", "rescue"],
  referrer: "origin-when-cross-origin",
  creator: "SafeNav Team",
  publisher: "SafeNav",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-app-url.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-app-url.vercel.app',
    title: 'DisasterSOS - Emergency Alert System',
    description: 'Emergency disaster alert and SOS system for tourist safety and disaster management',
    siteName: 'SafeNav',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SafeNav - Emergency Alert System',
    description: 'Emergency disaster alert and SOS system for tourist safety and disaster management',
    creator: '@safenav',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/maskable-icon-192x192.png',
        color: '#dc2626',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DisasterSOS',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#dc2626",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DisasterSOS" />
        <meta name="application-name" content="DisasterSOS" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* iOS Splash Screens */}
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" />
        
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-128x128.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-96x96.png" />
        <link rel="shortcut icon" href="/icons/icon-192x192.png" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/icons/icon-72x72.png" />
        <meta name="msapplication-square150x150logo" content="/icons/icon-152x152.png" />
        <meta name="msapplication-wide310x150logo" content="/icons/icon-384x384.png" />
        <meta name="msapplication-square310x310logo" content="/icons/icon-512x512.png" />
      </head>
      <body className="antialiased bg-slate-50 text-slate-900 select-none">
        <div className="safe-container">
          {children}
          <PWAInstallPrompt />
        </div>
      </body>
    </html>
  );
}
