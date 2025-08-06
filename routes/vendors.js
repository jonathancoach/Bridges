const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Database = require('../database/database');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const db = new Database();

// GET /api/vendors - Get all vendors with filtering and pagination
router.get('/', [
  query('category').optional().isString(),
  query('businessType').optional().isString(),
  query('search').optional().isString(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { category, businessType, search, page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;

  let query = 'SELECT * FROM vendors WHERE 1=1';
  const params = [];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  if (businessType) {
    query += ' AND business_type = ?';
    params.push(businessType);
  }

  if (search) {
    query += ' AND (name LIKE ? OR location LIKE ? OR specialties LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  query += ' ORDER BY rating DESC, name ASC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  db.getDatabase().all(query, params, (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Parse JSON fields
    const vendors = rows.map(vendor => ({
      ...vendor,
      specialties: JSON.parse(vendor.specialties || '[]'),
      certifications: JSON.parse(vendor.certifications || '[]')
    }));

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM vendors WHERE 1=1';
    const countParams = [];

    if (category) {
      countQuery += ' AND category = ?';
      countParams.push(category);
    }

    if (businessType) {
      countQuery += ' AND business_type = ?';
      countParams.push(businessType);
    }

    if (search) {
      countQuery += ' AND (name LIKE ? OR location LIKE ? OR specialties LIKE ?)';
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm);
    }

    db.getDatabase().get(countQuery, countParams, (err, countRow) => {
      if (err) {
        console.error('Count query error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.json({
        vendors,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countRow.total,
          pages: Math.ceil(countRow.total / limit)
        }
      });
    });
  });
});

// GET /api/vendors/:id - Get vendor by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.getDatabase().get('SELECT * FROM vendors WHERE uuid = ?', [id], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    const vendor = {
      ...row,
      specialties: JSON.parse(row.specialties || '[]'),
      certifications: JSON.parse(row.certifications || '[]')
    };

    res.json(vendor);
  });
});

// POST /api/vendors - Create new vendor
router.post('/', [
  body('name').isString().isLength({ min: 1 }).trim(),
  body('category').isString().isLength({ min: 1 }),
  body('businessType').isString().isLength({ min: 1 }),
  body('location').isString().isLength({ min: 1 }),
  body('distance').isFloat({ min: 0 }),
  body('rating').isFloat({ min: 0, max: 5 }),
  body('reviewCount').isInt({ min: 0 }),
  body('phone').optional().isString(),
  body('email').optional().isEmail(),
  body('website').optional().isURL(),
  body('specialties').optional().isArray(),
  body('certifications').optional().isArray(),
  body('employeeCount').optional().isInt({ min: 0 }),
  body('annualRevenue').optional().isInt({ min: 0 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const vendorData = {
    uuid: uuidv4(),
    ...req.body,
    specialties: JSON.stringify(req.body.specialties || []),
    certifications: JSON.stringify(req.body.certifications || []),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const insertQuery = `
    INSERT INTO vendors (
      uuid, name, category, business_type, location, distance, rating, review_count,
      phone, email, website, specialties, certifications, employee_count, annual_revenue,
      delivery_radius, minimum_order, avg_order_value, on_time_rate, quality_score,
      last_order, total_orders, total_spent, dgs_contract_id, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    vendorData.uuid, vendorData.name, vendorData.category, vendorData.businessType,
    vendorData.location, vendorData.distance, vendorData.rating, vendorData.reviewCount,
    vendorData.phone, vendorData.email, vendorData.website, vendorData.specialties,
    vendorData.certifications, vendorData.employeeCount, vendorData.annualRevenue,
    vendorData.deliveryRadius, vendorData.minimumOrder, vendorData.avgOrderValue,
    vendorData.onTimeRate, vendorData.qualityScore, vendorData.lastOrder,
    vendorData.totalOrders, vendorData.totalSpent, vendorData.dgsContractId,
    vendorData.created_at, vendorData.updated_at
  ];

  db.getDatabase().run(insertQuery, values, function(err) {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: 'Failed to create vendor' });
    }

    res.status(201).json({
      message: 'Vendor created successfully',
      vendor: { id: this.lastID, uuid: vendorData.uuid }
    });
  });
});

// PUT /api/vendors/:id - Update vendor
router.put('/:id', [
  body('name').optional().isString().isLength({ min: 1 }).trim(),
  body('category').optional().isString(),
  body('businessType').optional().isString(),
  body('location').optional().isString(),
  body('rating').optional().isFloat({ min: 0, max: 5 }),
  body('specialties').optional().isArray(),
  body('certifications').optional().isArray()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const updates = { ...req.body };

  if (updates.specialties) {
    updates.specialties = JSON.stringify(updates.specialties);
  }
  if (updates.certifications) {
    updates.certifications = JSON.stringify(updates.certifications);
  }

  updates.updated_at = new Date().toISOString();

  const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(updates), id];

  db.getDatabase().run(
    `UPDATE vendors SET ${setClause} WHERE uuid = ?`,
    values,
    function(err) {
      if (err) {
        console.error('Update error:', err);
        return res.status(500).json({ error: 'Failed to update vendor' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Vendor not found' });
      }

      res.json({ message: 'Vendor updated successfully' });
    }
  );
});

// DELETE /api/vendors/:id - Delete vendor
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.getDatabase().run('DELETE FROM vendors WHERE uuid = ?', [id], function(err) {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Failed to delete vendor' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json({ message: 'Vendor deleted successfully' });
  });
});

module.exports = router;