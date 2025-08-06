# Cal Poly Procurement Intelligence Dashboard

A modern, interactive React dashboard for supplier diversity management and cost optimization, featuring AI-powered insights and real-time analytics.

## 🚀 Features

- **Interactive Dashboard**: Tabbed navigation with 5 comprehensive sections
- **Supplier Diversity Analytics**: Real-time tracking of certification breakdown and compliance gaps
- **Cost Optimization**: Shipping cost analysis and potential savings identification
- **AI-Powered Recommendations**: Smart suggestions for supplier diversity improvements
- **Guided Workflows**: Step-by-step processes for finding suppliers and generating reports
- **Real-time Alerts**: Priority-based notification system for compliance and opportunities
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 📊 Dashboard Sections

1. **Overview**: Key metrics, progress indicators, and interactive charts
2. **Diversity Analysis**: Detailed certification breakdown and spend analysis
3. **Opportunities**: AI-identified improvement areas with priority rankings
4. **Cost Optimization**: Shipping cost analysis and optimization recommendations
5. **Action Items**: Searchable and filterable alerts with guided actions

## 🛠 Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd /workspace
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Alternative Installation (if needed)

If you encounter any issues, you can also:

1. **Clean install**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

## 🎯 Key Metrics Displayed

- **Current Diversity Rate**: 14.07% (Target: 25%)
- **Compliance Gap**: $25.5M to reach target
- **Potential Shipping Savings**: $145K annually
- **Active Diverse Suppliers**: 1,942 vendors
- **Certification Breakdown**:
  - LRG (Large): 85.93% ($200.6M)
  - SB (Small Business): 11.40% ($26.6M)
  - MB (Minority Business): 2.39% ($5.6M)
  - DVBE (Disabled Veteran): 0.28% ($654K)

## 💡 Interactive Features

### Guided Workflows
- **Find DVBE Suppliers**: 4-step process with AI recommendations
- **Optimize Shipping**: Immediate implementation with projected savings
- **Generate Reports**: Multiple report types with custom options
- **Update Data**: Streamlined data import and validation

### Smart Alerts
- Priority-based categorization (High, Medium, Low)
- Searchable and filterable interface
- Category-based organization (Compliance, Certification, Opportunity)
- Actionable recommendations with one-click actions

### Interactive Charts
- Clickable pie charts with detailed tooltips
- Progressive line charts showing goal projections
- Bar charts with drill-down capabilities
- Real-time data updates and animations

## 🎨 Design Features

- **Modern Glass Morphism**: Semi-transparent cards with backdrop blur effects
- **Gradient Backgrounds**: Professional purple-to-slate color schemes
- **Responsive Grid Layouts**: Adaptive design for all screen sizes
- **Smooth Animations**: Hover effects and transitions throughout
- **Color-Coded Status**: Intuitive red/yellow/green indicators
- **Professional Typography**: Clean, readable font hierarchy

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔧 Technologies Used

- **React 18**: Modern React with hooks and functional components
- **Recharts**: Interactive, responsive charts and data visualization
- **Lucide React**: Modern icon library with 1000+ icons
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **React Scripts**: Development server and build tools

## 📈 Performance Features

- **Lazy Loading**: Components load as needed
- **Optimized Renders**: Efficient state management
- **Responsive Images**: Adaptive sizing for different devices
- **Fast Navigation**: Client-side routing between tabs
- **Smooth Animations**: 60fps transitions and hover effects

## 🚀 Deployment

To build for production:

```bash
npm run build
```

This creates a `build` folder with optimized production files ready for deployment to any static hosting service.

## 📝 Usage Notes

- All monetary values are formatted automatically (K for thousands, M for millions)
- Progress bars update in real-time based on current vs. target metrics
- Workflow modals can be closed at any time without losing progress
- Search functionality works across all alert messages and categories
- Charts are fully responsive and maintain aspect ratios on all devices

## 🔄 Future Enhancements

- Real-time data integration with procurement systems
- Advanced filtering and sorting options
- Export functionality for charts and reports
- User authentication and role-based access
- Historical trend analysis and forecasting
- Integration with California SB/DVBE databases

---

**Cal Poly Procurement Intelligence Dashboard** - Making supplier diversity and cost optimization intuitive and actionable.