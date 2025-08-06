const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const Database = require('./database/database');
const vendorRoutes = require('./routes/vendors');
const categoryRoutes = require('./routes/categories');
const analyticsRoutes = require('./routes/analytics');
const aiRoutes = require('./routes/ai');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database
const db = new Database();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'California DGS Procurement API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'California DGS Small Business Procurement API',
    version: '1.0.0',
    documentation: {
      endpoints: {
        'GET /health': 'Health check',
        'GET /api': 'API documentation',
        'POST /api/auth/login': 'User authentication',
        'GET /api/vendors': 'Get all vendors',
        'GET /api/vendors/:id': 'Get vendor by ID',
        'POST /api/vendors': 'Create new vendor',
        'PUT /api/vendors/:id': 'Update vendor',
        'DELETE /api/vendors/:id': 'Delete vendor',
        'GET /api/categories': 'Get all categories with spending data',
        'GET /api/analytics/spending-trends': 'Get spending trends data',
        'GET /api/analytics/dashboard-metrics': 'Get dashboard metrics',
        'GET /api/ai/recommendations': 'Get AI recommendations',
        'POST /api/ai/chat': 'AI chat endpoint'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'Invalid JSON format',
      message: 'Please check your request body format'
    });
  }
  
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    suggestion: 'Check /api for available endpoints'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  db.close();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  db.close();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 California DGS Procurement API running on port ${PORT}`);
  console.log(`📊 Dashboard API available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
  
  // Initialize database and seed data
  db.initialize().then(() => {
    console.log('✅ Database initialized successfully');
  }).catch(err => {
    console.error('❌ Database initialization failed:', err);
  });
});

module.exports = app;