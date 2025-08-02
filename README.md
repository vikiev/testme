# AI-Driven Hardware Lifecycle Management Dashboard

A comprehensive, dark-mode web application for tracking and forecasting IT hardware replacements, costs, and vendor comparisons across global operations.

![Hardware Lifecycle Dashboard](src/assets/hero-dashboard.jpg)

## 🎯 Overview

This MVP dashboard helps businesses:
- **Track IT hardware** across global locations and OpCos
- **Forecast replacements** and future costs with AI-powered predictions
- **Filter and interact** with real-time data by region, device type, and age
- **Upload Excel files** for automated analysis and dashboard updates
- **Receive intelligent alerts** for critical upcoming replacements

## 🚀 Features

### 📊 Multi-Page Dashboard
- **Landing Page**: Interactive world map showing global OpCo distribution
- **Main Dashboard**: Real-time summary tiles, charts, and device category tabs
- **Device Management**: Detailed inventory with filtering and drill-down capabilities
- **Forecasting & Planning**: AI-powered predictions and budget planning
- **Notifications & Alerts**: Real-time alerts with email notification system
- **Settings & Administration**: Policy configuration and user management

### 🎨 Design Highlights
- **Dark-mode first** with deep gray (#1E1E2F) background and vibrant blue (#3B82F6) accents
- **Mobile-first responsive** design that works seamlessly across all devices
- **Modern animations** with glow effects and smooth transitions
- **Interactive components** with hover states and visual feedback

### 🛠 Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with custom variants
- **Charts**: Recharts for data visualization
- **Maps**: react-simple-maps for interactive world map
- **Icons**: Lucide React for consistent iconography

## 📱 Page Structure

### 🏠 Landing Page (`/`)
- Hero section with background image and key statistics
- Interactive world map with OpCo distribution
- Recent dashboard updates and quick action links
- Call-to-action buttons for main features

### 📊 Main Dashboard (`/dashboard`)
- Summary tiles showing key metrics with trend indicators
- Device category tabs (Routers, Switches, Access Points, Firewalls)
- Interactive charts for replacements and cost forecasting
- Advanced filter panel for real-time data filtering

### 🔍 Device Details (`/devices`)
- Comprehensive device inventory table
- Advanced search and filtering capabilities
- Device status indicators and replacement timelines
- Export functionality for data analysis

### 📈 Forecasting (`/forecasting`)
- AI-powered quarterly and yearly projections
- Budget variance analysis and cost optimization
- Interactive charts showing replacement trends
- Intelligent recommendations for cost savings

### 🔔 Notifications (`/notifications`)
- Real-time alert management system
- Email notification logs and delivery tracking
- Configurable alert settings and preferences
- Critical, upcoming, and budget alert categories

### ⚙️ Settings (`/settings`)
- Device lifecycle policy configuration
- Budget limits by OpCo and region
- User management with role-based access
- Integration settings for data uploads

## 🎨 Design System

### Color Palette
```css
/* Primary colors */
--background: 225 8% 8%;          /* Deep gray #1E1E2F */
--foreground: 210 40% 98%;        /* Near white text */
--primary: 217 91% 60%;           /* Vibrant blue #3B82F6 */
--primary-glow: 217 91% 70%;      /* Lighter blue for glows */

/* Status colors for hardware lifecycle */
--success: 142 71% 45%;           /* Green for healthy devices */
--warning: 38 92% 50%;            /* Orange for due soon */
--destructive: 0 84% 60%;         /* Red for overdue */
--critical: 348 83% 47%;          /* Critical red */
```

### Custom Gradients & Effects
- **Gradient cards** with subtle background variations
- **Glow effects** for interactive elements
- **Smooth animations** with cubic-bezier easing
- **Custom shadows** with blue glow accents

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with ES6+ support

### Quick Start
```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd hardware-lifecycle-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:8080
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Environment Setup
The app uses mock data by default. For full functionality with Supabase backend:

1. **Connect to Supabase**: Click the green Supabase button in Lovable
2. **Configure email notifications**: Set up Edge Functions for alerts
3. **Upload Excel templates**: Use the provided sample format

### Customization
- **Colors**: Modify `src/index.css` for color scheme changes
- **Components**: Update `src/components/ui/` for component styling
- **Mock Data**: Edit component files to update sample data

## 📊 Data Structure

### Device Information
```typescript
{
  id: string;           // Unique device identifier
  type: string;         // Router, Switch, Access Point, Firewall
  model: string;        // Device model/part number
  installDate: string;  // Installation date
  age: string;          // Calculated age
  location: string;     // Physical location
  opco: string;         // Operating Company
  healthStatus: string; // critical, warning, healthy
  replacementDue: string;
  estimatedCost: string;
}
```

### Excel Upload Format
Expected columns for data import:
- Device ID, Type, Model, Install Date
- Location, OpCo, Region
- Purchase Cost, EOS Date, EOL Date

## 🚀 Deployment

### Lovable Platform
1. Open the [Lovable Project](https://lovable.dev/projects/eae117a2-e7f2-434a-9bee-87e05134dbf4)
2. Click Share → Publish
3. Your app will be deployed with a custom URL

### Custom Domain
1. Navigate to Project > Settings > Domains
2. Click "Connect Domain"
3. Follow the DNS configuration steps

## 🤝 Contributing

This project is designed for easy customization and extension:

1. **Add new device types**: Update the device category arrays
2. **Modify charts**: Use Recharts components for new visualizations
3. **Extend filters**: Add new filter options in FilterPanel component
4. **Custom themes**: Modify the design system in index.css

## 📝 Future Enhancements

### Planned Features
- **Real-time data sync** with enterprise asset management systems
- **Advanced AI predictions** with machine learning models
- **Multi-tenant support** for MSP deployments
- **Mobile app** for field technicians
- **Integration APIs** for third-party systems

### Backend Integration
Connect to Supabase for:
- **Authentication** with role-based access control
- **Database** for persistent device storage
- **Edge Functions** for automated email alerts
- **File storage** for Excel uploads and exports

## 📄 License

This project is built with Lovable and follows their terms of service.

## 🆘 Support

For technical support or feature requests:
- View the [troubleshooting docs](https://docs.lovable.dev/tips-tricks/troubleshooting)
- Visit the [Lovable Discord community](https://discord.gg/lovable)
B
- Check the [Supabase integration guide](https://docs.lovable.dev/integrations/supabase/)
