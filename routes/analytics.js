const express = require('express');
const Database = require('../database/database');

const router = express.Router();
const db = new Database();

// GET /api/analytics/dashboard-metrics - Get main dashboard metrics
router.get('/dashboard-metrics', (req, res) => {
  Promise.all([
    // Get total vendors count
    new Promise((resolve, reject) => {
      db.getDatabase().get('SELECT COUNT(*) as count FROM vendors', (err, row) => {
        if (err) reject(err);
        else resolve(row.count);
      });
    }),
    
    // Get SMB spending data
    new Promise((resolve, reject) => {
      db.getDatabase().get('SELECT SUM(smb_spend) as total FROM categories', (err, row) => {
        if (err) reject(err);
        else resolve(row.total || 0);
      });
    }),
    
    // Get total spending
    new Promise((resolve, reject) => {
      db.getDatabase().get('SELECT SUM(total_spend) as total FROM categories', (err, row) => {
        if (err) reject(err);
        else resolve(row.total || 0);
      });
    }),
    
    // Get DVBE spending
    new Promise((resolve, reject) => {
      db.getDatabase().get('SELECT SUM(dvbe_spend) as total FROM categories', (err, row) => {
        if (err) reject(err);
        else resolve(row.total || 0);
      });
    }),
    
    // Get DGS contracts count
    new Promise((resolve, reject) => {
      db.getDatabase().get('SELECT COUNT(*) as count FROM vendors WHERE dgs_contract_id IS NOT NULL', (err, row) => {
        if (err) reject(err);
        else resolve(row.count);
      });
    })
  ])
  .then(([totalVendors, smbSpending, totalSpending, dvbeSpending, dgsContracts]) => {
    const smbPercentage = totalSpending > 0 ? (smbSpending / totalSpending) * 100 : 0;
    const dvbePercentage = totalSpending > 0 ? (dvbeSpending / totalSpending) * 100 : 0;
    
    res.json({
      totalVendors,
      smbSpending,
      totalSpending,
      dvbeSpending,
      smbPercentage: parseFloat(smbPercentage.toFixed(1)),
      dvbePercentage: parseFloat(dvbePercentage.toFixed(1)),
      dgsContracts,
      monthlySavings: 142000, // Static value based on dashboard
      ab2019Compliance: {
        smbGoal: 25,
        dvbeGoal: 3,
        smbStatus: smbPercentage >= 25 ? 'met' : 'in-progress',
        dvbeStatus: dvbePercentage >= 3 ? 'met' : 'in-progress'
      }
    });
  })
  .catch(err => {
    console.error('Dashboard metrics error:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  });
});

// GET /api/analytics/spending-trends - Get spending trends over time
router.get('/spending-trends', (req, res) => {
  db.getDatabase().all(
    'SELECT * FROM spending_trends ORDER BY id ASC',
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.json(rows);
    }
  );
});

// GET /api/analytics/category-performance - Get category performance metrics
router.get('/category-performance', (req, res) => {
  db.getDatabase().all(
    `SELECT 
      c.name,
      c.total_spend,
      c.smb_spend,
      c.smb_percentage,
      c.dvbe_spend,
      c.vendor_count,
      c.dgs_contracts,
      COUNT(v.id) as actual_vendors,
      AVG(v.rating) as avg_rating,
      AVG(v.on_time_rate) as avg_on_time_rate
    FROM categories c
    LEFT JOIN vendors v ON c.name = v.category
    GROUP BY c.name
    ORDER BY c.total_spend DESC`,
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      const performance = rows.map(row => ({
        ...row,
        dvbe_percentage: row.total_spend > 0 ? (row.dvbe_spend / row.total_spend) * 100 : 0,
        avg_rating: parseFloat((row.avg_rating || 0).toFixed(1)),
        avg_on_time_rate: parseFloat((row.avg_on_time_rate || 0).toFixed(1))
      }));

      res.json(performance);
    }
  );
});

// GET /api/analytics/vendor-distribution - Get vendor distribution by business type
router.get('/vendor-distribution', (req, res) => {
  db.getDatabase().all(
    `SELECT 
      business_type,
      COUNT(*) as count,
      AVG(rating) as avg_rating,
      SUM(total_spent) as total_spent,
      COUNT(CASE WHEN dgs_contract_id IS NOT NULL THEN 1 END) as dgs_certified
    FROM vendors
    GROUP BY business_type
    ORDER BY count DESC`,
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.json(rows);
    }
  );
});

// GET /api/analytics/geographic-distribution - Get vendor distribution by location
router.get('/geographic-distribution', (req, res) => {
  db.getDatabase().all(
    `SELECT 
      location,
      COUNT(*) as vendor_count,
      AVG(rating) as avg_rating,
      AVG(distance) as avg_distance,
      SUM(total_spent) as total_spent
    FROM vendors
    GROUP BY location
    ORDER BY vendor_count DESC
    LIMIT 20`,
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.json(rows);
    }
  );
});

module.exports = router;