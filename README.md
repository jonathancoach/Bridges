# California DGS Small Business Procurement API

A comprehensive backend API system for managing California Department of General Services (DGS) small business and DVBE vendor procurement data, supporting AB 2019 compliance goals.

## 🚀 Features

- **Vendor Management**: Complete CRUD operations for certified small businesses and DVBEs
- **Analytics Dashboard**: Real-time metrics and spending trends
- **AI-Powered Insights**: Intelligent recommendations and chat assistance
- **AB 2019 Compliance**: Track 25% SB and 3% DVBE participation goals
- **Cal eProcure Integration**: Designed to work with California's procurement system
- **Authentication**: JWT-based security with role-based access

## 🏗️ Architecture

- **Framework**: Express.js with SQLite database
- **Security**: Helmet, CORS, rate limiting, input validation
- **Authentication**: JWT tokens with bcrypt password hashing
- **Database**: SQLite with comprehensive schema for vendors, categories, and analytics

## 📊 API Endpoints

### Health & Documentation
- `GET /health` - Health check
- `GET /api` - API documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Vendors
- `GET /api/vendors` - Get all vendors (with filtering & pagination)
- `GET /api/vendors/:id` - Get vendor by ID
- `POST /api/vendors` - Create new vendor
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor

### Categories & Analytics
- `GET /api/categories` - Get all spending categories
- `GET /api/categories/:name/vendors` - Get vendors in category
- `GET /api/analytics/dashboard-metrics` - Dashboard metrics
- `GET /api/analytics/spending-trends` - Spending trends over time
- `GET /api/analytics/category-performance` - Category performance data

### AI Features
- `GET /api/ai/recommendations` - Get AI recommendations
- `POST /api/ai/chat` - AI chat assistance
- `GET /api/ai/insights` - Generated insights

## 🛠️ Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   - Copy `.env` file (already configured)
   - Default port: 3001

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Start Production Server**
   ```bash
   npm start
   ```

## 🔐 Demo Credentials

**Admin User:**
- Username: `dgs-admin`
- Password: `password`
- Role: Admin access to all features

**Regular User:**
- Username: `procurement-user`
- Password: `password`
- Role: Standard user access

## 📋 Sample Data

The database is automatically seeded with:
- **15 California vendors** including DGS certified businesses
- **9 procurement categories** with spending data
- **7 months** of spending trends
- **6 AI recommendations** for procurement optimization

### Featured Vendors:
- **Golden State Construction Services** (SB-PW certified)
- **VetTech Solutions LLC** (DVBE certified)
- **Bay Area Office Supplies Co.** (SB certified)
- **Pacific Healthcare Supplies** (SB certified)

## 🎯 California DGS Integration

### AB 2019 Compliance
- Tracks 25% Small Business participation goal
- Monitors 3% DVBE participation target
- Real-time compliance reporting

### DGS Certifications
- Small Business (SB)
- Small Business Public Works (SB-PW)
- Disabled Veteran Business Enterprise (DVBE)

### Cal eProcure Ready
- Compatible with state procurement systems
- SCPRS integration capabilities
- Vendor certification tracking

## 🤖 AI Features

### Smart Chat Assistant
Ask questions like:
- "Find DGS certified SB vendors in Sacramento"
- "How to achieve AB 2019 25% SMB goal compliance?"
- "Show construction contractors with SB-PW certification"

### Automated Recommendations
- Certification opportunities
- Cost optimization strategies
- Compliance improvement suggestions

## 📈 Analytics Dashboard

Real-time metrics including:
- SMB spending percentage vs. AB 2019 goals
- DVBE participation tracking
- Category performance analysis
- Geographic vendor distribution
- Vendor certification status

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15-minute window
- **Input Validation**: All endpoints validate input data
- **JWT Authentication**: Secure token-based authentication
- **CORS Protection**: Configured for specific origins
- **Helmet Security**: Security headers and CSP

## 🌐 CORS Configuration

Default CORS origins:
- `http://localhost:3000` (React development)
- `http://localhost:5173` (Vite development)

## 📝 API Usage Examples

### Get All Vendors
```bash
curl http://localhost:3001/api/vendors
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "dgs-admin", "password": "password"}'
```

### Get Dashboard Metrics
```bash
curl http://localhost:3001/api/analytics/dashboard-metrics
```

### AI Chat
```bash
curl -X POST http://localhost:3001/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Find DVBE vendors in technology"}'
```

## 🏛️ California DGS Context

This API supports California's commitment to small business procurement:
- **AB 2019**: Mandates 25% small business and 3% DVBE participation
- **Cal eProcure**: State's procurement platform integration
- **Economic Equity**: "Economic Equity First" action plans
- **Supplier Diversity**: Statewide supplier diversity program

## 🚦 Status Indicators

- ✅ Database initialized and seeded
- ✅ All API endpoints operational
- ✅ Authentication system active
- ✅ Real-time analytics available
- ✅ AI assistant ready

## 📞 Support

For questions about California DGS procurement or API usage:
- Email: procurement@dgs.ca.gov
- Website: www.dgs.ca.gov
- Cal eProcure: www.caleprocure.ca.gov

---

**Built for California Department of General Services**  
Supporting AB 2019 compliance and small business procurement goals