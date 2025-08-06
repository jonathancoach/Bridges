const express = require('express');
const Database = require('../database/database');

const router = express.Router();
const db = new Database();

// GET /api/categories - Get all categories with spending data
router.get('/', (req, res) => {
  db.getDatabase().all('SELECT * FROM categories ORDER BY total_spend DESC', (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(rows);
  });
});

// GET /api/categories/:name - Get specific category data
router.get('/:name', (req, res) => {
  const { name } = req.params;

  db.getDatabase().get('SELECT * FROM categories WHERE name = ?', [name], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(row);
  });
});

// GET /api/categories/:name/vendors - Get vendors in specific category
router.get('/:name/vendors', (req, res) => {
  const { name } = req.params;

  db.getDatabase().all(
    'SELECT * FROM vendors WHERE category = ? ORDER BY rating DESC',
    [name],
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      const vendors = rows.map(vendor => ({
        ...vendor,
        specialties: JSON.parse(vendor.specialties || '[]'),
        certifications: JSON.parse(vendor.certifications || '[]')
      }));

      res.json(vendors);
    }
  );
});

module.exports = router;