# SafeTour - Tourist Safety & Disaster Management App

A mobile-first web application built with Next.js 13+, designed to help tourists stay safe during their travels through real-time safety monitoring and emergency management features.

## 🌟 Features

### 1. **Login/Onboarding Screen**

- Clean, modern card-based UI
- Email and OTP authentication flow (mock implementation)
- Gradient buttons with smooth animations
- Feature preview showcase

### 2. **Home/Map Screen**

- Interactive safety zone visualization
- Real-time risk assessment with color-coded zones:
  - ✅ **Green Zone** - Safe areas
  - ⚠️ **Yellow Zone** - Moderate risk areas
  - 🚨 **Red Zone** - High risk/danger areas
- Floating SOS emergency button
- Zone details modal with risk information and nearest shelters
- Legend toggle for zone explanations

### 3. **Alerts Screen**

- Real-time safety alerts and warnings
- Categorized notifications (Weather, Natural disasters, Emergency)
- Severity-based color coding and prioritization
- Location-based alert filtering
- Timestamp and location information

### 4. **SOS Emergency Screen**

- Large, prominent SOS button with pulsing animation
- Location sharing with emergency contacts
- Nearby users mesh network (offline capability simulation)
- Emergency confirmation and cancellation
- Current GPS coordinates display

## 🛠 Technology Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: npm

## 🎨 Design System

- **Mobile-first responsive design** (max-width: 480px)
- **Modern UI components** with rounded corners (`rounded-xl`)
- **Soft shadows** (`shadow-lg`) for depth
- **Gradient buttons** (`from-blue-500 to-indigo-600`)
- **Smooth animations** with Framer Motion
- **Clean typography** with proper hierarchy

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd safetour-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📱 Navigation Flow

1. **Login** (`/`) - Email/OTP authentication
2. **Home** (`/home`) - Interactive safety map
3. **Alerts** (`/alerts`) - Safety notifications
4. **SOS** (`/sos`) - Emergency features

Navigation uses a bottom tab bar for easy mobile access.

## 🎯 Key Components

### UI Components

- `Button` - Reusable button with variants (primary, secondary, danger)
- `Card` - Container component with hover animations
- `Modal` - Overlay component for detailed information
- `BottomNavigation` - Tab-based navigation bar

### Pages

- `page.tsx` - Login/Onboarding screen
- `home/page.tsx` - Interactive map with safety zones
- `alerts/page.tsx` - Safety alerts listing
- `sos/page.tsx` - Emergency SOS functionality

## 🔧 Customization

The app uses a mobile-first approach with:

- Maximum container width of 480px
- Responsive breakpoints using Tailwind CSS
- Custom CSS classes in `globals.css`
- Consistent color scheme and spacing

## 📄 License

This project is a prototype for demonstration purposes.

## 🤝 Contributing

This is a prototype project. For contributions or suggestions, please create an issue or pull request.

---

Built with ❤️ for tourist safety and disaster preparedness.
