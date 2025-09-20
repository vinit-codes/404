// Mock data for admin dashboard

export interface Alert {
  id: string;
  type: 'flood' | 'earthquake' | 'landslide' | 'fire' | 'weather';
  location: string;
  status: 'pending' | 'resolved' | 'investigating';
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  description: string;
  coordinates: [number, number];
  reportedBy: string;
  affectedPeople?: number;
}

export interface SOSRequest {
  id: string;
  userName: string;
  email: string;
  phone: string;
  location: string;
  coordinates: [number, number];
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'acknowledged' | 'resolved';
  timestamp: string;
  description: string;
  responseTime?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastActive: string;
  location: string;
  sosCount: number;
}

export interface DashboardMetrics {
  totalSOS: number;
  activeAlerts: number;
  totalUsers: number;
  last24hEvents: number;
  sosToday: number;
  alertsToday: number;
  responseTime: string;
  userGrowth: string;
}

export interface ActivityItem {
  id: string;
  type: 'sos' | 'alert' | 'user_join' | 'alert_resolved';
  description: string;
  timestamp: string;
  severity?: 'low' | 'medium' | 'high';
}

// Mock data
export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    type: 'flood',
    location: 'Kullu Valley, Himachal Pradesh',
    status: 'pending',
    severity: 'high',
    timestamp: '2024-03-15T10:30:00Z',
    description: 'Heavy rainfall causing flash floods in Beas River. Multiple villages affected.',
    coordinates: [32.2432, 77.1892],
    reportedBy: 'District Collector Office',
    affectedPeople: 150
  },
  {
    id: 'ALT-002',
    type: 'landslide',
    location: 'Shimla-Kinnaur Highway',
    status: 'investigating',
    severity: 'high',
    timestamp: '2024-03-15T08:15:00Z',
    description: 'Major landslide blocking NH-5. Traffic diverted via alternate routes.',
    coordinates: [31.5804, 78.2357],
    reportedBy: 'Highway Authority',
    affectedPeople: 50
  },
  {
    id: 'ALT-003',
    type: 'earthquake',
    location: 'Dharamshala, Kangra',
    status: 'resolved',
    severity: 'medium',
    timestamp: '2024-03-14T22:45:00Z',
    description: 'Magnitude 4.2 earthquake detected. No major damage reported.',
    coordinates: [32.2190, 76.3234],
    reportedBy: 'Seismic Monitoring Station'
  },
  {
    id: 'ALT-004',
    type: 'fire',
    location: 'Jakhu Hill, Shimla',
    status: 'pending',
    severity: 'medium',
    timestamp: '2024-03-15T14:20:00Z',
    description: 'Forest fire detected in pine forest area. Fire brigade deployed.',
    coordinates: [31.1048, 77.1734],
    reportedBy: 'Forest Department'
  },
  {
    id: 'ALT-005',
    type: 'weather',
    location: 'Rohtang Pass',
    status: 'pending',
    severity: 'low',
    timestamp: '2024-03-15T06:00:00Z',
    description: 'Heavy snowfall expected. Road closure likely.',
    coordinates: [32.3665, 77.2477],
    reportedBy: 'Meteorological Department'
  }
];

export const mockSOSRequests: SOSRequest[] = [
  {
    id: 'SOS-001',
    userName: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91-9876543210',
    location: 'Mall Road, Shimla',
    coordinates: [31.1048, 77.1734],
    urgency: 'high',
    status: 'pending',
    timestamp: '2024-03-15T11:45:00Z',
    description: 'Tourist trapped in landslide debris near Mall Road. Immediate rescue required.',
    responseTime: '00:05:30'
  },
  {
    id: 'SOS-002',
    userName: 'Rajesh Kumar',
    email: 'rajesh.k@email.com',
    phone: '+91-9876543211',
    location: 'Beas River Bank, Kullu',
    coordinates: [32.2432, 77.1892],
    urgency: 'high',
    status: 'acknowledged',
    timestamp: '2024-03-15T10:15:00Z',
    description: 'Family stranded due to sudden flood. Need boat rescue.',
    responseTime: '00:02:45'
  },
  {
    id: 'SOS-003',
    userName: 'Amit Verma',
    email: 'amit.verma@email.com',
    phone: '+91-9876543212',
    location: 'Manali-Leh Highway',
    coordinates: [32.2396, 77.1887],
    urgency: 'medium',
    status: 'resolved',
    timestamp: '2024-03-15T09:30:00Z',
    description: 'Vehicle breakdown in remote area. Medical assistance needed.',
    responseTime: '00:15:20'
  },
  {
    id: 'SOS-004',
    userName: 'Sunita Devi',
    email: 'sunita.devi@email.com',
    phone: '+91-9876543213',
    location: 'Kasauli Hills',
    coordinates: [30.8977, 76.9653],
    urgency: 'medium',
    status: 'acknowledged',
    timestamp: '2024-03-15T13:20:00Z',
    description: 'Lost on trekking trail. GPS not working.',
    responseTime: '00:08:15'
  },
  {
    id: 'SOS-005',
    userName: 'Mohammed Ali',
    email: 'mohammed.ali@email.com',
    phone: '+91-9876543214',
    location: 'Spiti Valley',
    coordinates: [32.2456, 78.0319],
    urgency: 'low',
    status: 'pending',
    timestamp: '2024-03-15T15:10:00Z',
    description: 'Minor injury during mountain climbing. First aid required.',
    responseTime: '00:12:00'
  }
];

export const mockUsers: User[] = [
  {
    id: 'USR-001',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-03-15T11:45:00Z',
    location: 'Shimla, HP',
    sosCount: 2
  },
  {
    id: 'USR-002',
    name: 'Rajesh Kumar',
    email: 'rajesh.k@email.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-02-01',
    lastActive: '2024-03-15T10:15:00Z',
    location: 'Kullu, HP',
    sosCount: 1
  },
  {
    id: 'USR-003',
    name: 'Admin User',
    email: 'admin@safenav.com',
    role: 'admin',
    status: 'active',
    joinDate: '2023-12-01',
    lastActive: '2024-03-15T16:00:00Z',
    location: 'Chandigarh',
    sosCount: 0
  },
  {
    id: 'USR-004',
    name: 'Sunita Devi',
    email: 'sunita.devi@email.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-02-20',
    lastActive: '2024-03-15T13:20:00Z',
    location: 'Kasauli, HP',
    sosCount: 3
  },
  {
    id: 'USR-005',
    name: 'Moderator Singh',
    email: 'mod@safenav.com',
    role: 'moderator',
    status: 'active',
    joinDate: '2024-01-01',
    lastActive: '2024-03-15T14:30:00Z',
    location: 'Dharamshala, HP',
    sosCount: 0
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalSOS: 45,
  activeAlerts: 8,
  totalUsers: 1247,
  last24hEvents: 23,
  sosToday: 5,
  alertsToday: 3,
  responseTime: '4.2 min',
  userGrowth: '+12.5%'
};

export const mockRecentActivity: ActivityItem[] = [
  {
    id: 'ACT-001',
    type: 'sos',
    description: 'New SOS request from Priya Sharma in Mall Road, Shimla',
    timestamp: '2024-03-15T11:45:00Z',
    severity: 'high'
  },
  {
    id: 'ACT-002',
    type: 'alert',
    description: 'Flash flood alert issued for Kullu Valley',
    timestamp: '2024-03-15T10:30:00Z',
    severity: 'high'
  },
  {
    id: 'ACT-003',
    type: 'alert_resolved',
    description: 'Earthquake alert for Dharamshala marked as resolved',
    timestamp: '2024-03-15T09:15:00Z'
  },
  {
    id: 'ACT-004',
    type: 'sos',
    description: 'SOS request from Rajesh Kumar acknowledged by rescue team',
    timestamp: '2024-03-15T10:17:00Z',
    severity: 'high'
  },
  {
    id: 'ACT-005',
    type: 'user_join',
    description: 'New user Mohammed Ali joined from Spiti Valley',
    timestamp: '2024-03-15T08:30:00Z'
  }
];

// Chart data
export const alertsPerDayData = [
  { day: 'Mon', alerts: 12 },
  { day: 'Tue', alerts: 18 },
  { day: 'Wed', alerts: 15 },
  { day: 'Thu', alerts: 22 },
  { day: 'Fri', alerts: 25 },
  { day: 'Sat', alerts: 19 },
  { day: 'Sun', alerts: 16 }
];

export const sosUrgencyData = [
  { name: 'Critical', value: 35, color: '#ef4444' },
  { name: 'High', value: 28, color: '#f97316' },
  { name: 'Medium', value: 25, color: '#f59e0b' },
  { name: 'Low', value: 12, color: '#10b981' }
];

export const userGrowthData = [
  { month: 'Jan', users: 450 },
  { month: 'Feb', users: 520 },
  { month: 'Mar', users: 610 },
  { month: 'Apr', users: 720 },
  { month: 'May', users: 850 },
  { month: 'Jun', users: 920 },
  { month: 'Jul', users: 1120 },
  { month: 'Aug', users: 1247 }
];
