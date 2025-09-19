#!/bin/bash

# Generate PWA icons using ImageMagick
# This script creates professional SafeTour app icons with gradient background

# Create a simple SVG template first
cat > /tmp/safetour_icon.svg << 'EOF'
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="256" cy="256" r="240" fill="url(#gradient)" stroke="#ffffff" stroke-width="8"/>
  
  <!-- Shield icon -->
  <path d="M256 80 L320 120 L320 240 Q320 320 256 400 Q192 320 192 240 L192 120 Z" fill="#ffffff" stroke="#ef4444" stroke-width="4"/>
  
  <!-- Cross/Plus in shield -->
  <rect x="240" y="160" width="32" height="120" fill="#ef4444" rx="4"/>
  <rect x="200" y="220" width="112" height="32" fill="#ef4444" rx="4"/>
  
  <!-- Text "SOS" below shield -->
  <text x="256" y="340" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#ffffff">SOS</text>
</svg>
EOF

# Convert SVG to different sizes
convert /tmp/safetour_icon.svg -resize 192x192 /Users/apple/Desktop/Personal/404/public/icons/icon-192x192.png
convert /tmp/safetour_icon.svg -resize 512x512 /Users/apple/Desktop/Personal/404/public/icons/icon-512x512.png
convert /tmp/safetour_icon.svg -resize 180x180 /Users/apple/Desktop/Personal/404/public/icons/apple-touch-icon.png
convert /tmp/safetour_icon.svg -resize 32x32 /Users/apple/Desktop/Personal/404/public/icons/favicon-32x32.png
convert /tmp/safetour_icon.svg -resize 16x16 /Users/apple/Desktop/Personal/404/public/icons/favicon-16x16.png

# Create maskable icon (slightly different design)
cat > /tmp/safetour_maskable.svg << 'EOF'
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Full background for maskable -->
  <rect width="512" height="512" fill="url(#gradient)"/>
  
  <!-- Shield icon centered and larger -->
  <path d="M256 100 L340 150 L340 280 Q340 370 256 450 Q172 370 172 280 L172 150 Z" fill="#ffffff" stroke="#ef4444" stroke-width="6"/>
  
  <!-- Cross/Plus in shield -->
  <rect x="235" y="180" width="42" height="140" fill="#ef4444" rx="6"/>
  <rect x="185" y="235" width="142" height="42" fill="#ef4444" rx="6"/>
</svg>
EOF

convert /tmp/safetour_maskable.svg -resize 192x192 /Users/apple/Desktop/Personal/404/public/icons/maskable-icon-192x192.png
convert /tmp/safetour_maskable.svg -resize 512x512 /Users/apple/Desktop/Personal/404/public/icons/maskable-icon-512x512.png

# Clean up temp files
rm /tmp/safetour_icon.svg /tmp/safetour_maskable.svg

echo "✅ PWA icons generated successfully!"
