const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class Database {
  constructor() {
    const dbPath = path.join(__dirname, 'ca_dgs_procurement.db');
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err);
      } else {
        console.log('Connected to SQLite database');
      }
    });
  }

  async initialize() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        // Create vendors table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS vendors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uuid TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            business_type TEXT NOT NULL,
            location TEXT NOT NULL,
            distance REAL NOT NULL,
            rating REAL NOT NULL,
            review_count INTEGER NOT NULL,
            phone TEXT,
            email TEXT,
            website TEXT,
            specialties TEXT, -- JSON string
            certifications TEXT, -- JSON string
            employee_count INTEGER,
            annual_revenue INTEGER,
            delivery_radius INTEGER,
            minimum_order INTEGER,
            avg_order_value INTEGER,
            on_time_rate INTEGER,
            quality_score REAL,
            last_order TEXT,
            total_orders INTEGER,
            total_spent INTEGER,
            dgs_contract_id TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Create categories table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            total_spend INTEGER NOT NULL,
            smb_spend INTEGER NOT NULL,
            smb_percentage REAL NOT NULL,
            vendor_count INTEGER NOT NULL,
            avg_order INTEGER NOT NULL,
            dgs_contracts INTEGER DEFAULT 0,
            dvbe_spend INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Create spending_trends table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS spending_trends (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            month TEXT NOT NULL,
            smb_spending INTEGER NOT NULL,
            total_spending INTEGER NOT NULL,
            smb_percentage REAL NOT NULL,
            dvbe_spending INTEGER DEFAULT 0,
            dvbe_percentage REAL DEFAULT 0,
            dgs_contracts INTEGER DEFAULT 0,
            year INTEGER DEFAULT 2024,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Create ai_recommendations table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS ai_recommendations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            confidence REAL NOT NULL,
            action TEXT NOT NULL,
            savings INTEGER NOT NULL,
            category TEXT NOT NULL,
            is_active BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Create users table for authentication
        this.db.run(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            agency TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_login DATETIME
          )
        `);

        // Create chat_sessions table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS chat_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT UNIQUE NOT NULL,
            user_id INTEGER,
            messages TEXT, -- JSON string
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
          )
        `, (err) => {
          if (err) {
            reject(err);
          } else {
            this.seedData().then(resolve).catch(reject);
          }
        });
      });
    });
  }

  async seedData() {
    return new Promise((resolve, reject) => {
      // Check if data already exists
      this.db.get("SELECT COUNT(*) as count FROM vendors", (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        if (row.count > 0) {
          console.log('Database already seeded');
          resolve();
          return;
        }

        console.log('Seeding database...');
        
        // Seed vendors data
        const vendorsData = [
          {
            uuid: uuidv4(),
            name: "Central Coast Office Solutions",
            category: "Office Supplies",
            business_type: "Small Business",
            location: "San Luis Obispo, CA",
            distance: 2.3,
            rating: 4.7,
            review_count: 143,
            phone: "(805) 544-3400",
            email: "orders@ccofficeSolutions.com",
            website: "www.centralcoastoffice.com",
            specialties: JSON.stringify(["Paper Products", "Writing Supplies", "Office Equipment"]),
            certifications: JSON.stringify(["SBA Certified", "California Small Business"]),
            employee_count: 12,
            annual_revenue: 1200000,
            delivery_radius: 50,
            minimum_order: 100,
            avg_order_value: 850,
            on_time_rate: 96,
            quality_score: 4.6,
            last_order: "2024-07-15",
            total_orders: 34,
            total_spent: 28900,
            dgs_contract_id: null
          },
          {
            uuid: uuidv4(),
            name: "Golden State Construction Services",
            category: "Construction & Public Works",
            business_type: "Small Business",
            location: "Sacramento, CA",
            distance: 15.2,
            rating: 4.8,
            review_count: 312,
            phone: "(916) 442-8200",
            email: "contracts@goldenstateconstruction.com",
            website: "www.goldenstateconstruction.com",
            specialties: JSON.stringify(["Public Works", "Infrastructure", "Green Building", "ADA Compliance"]),
            certifications: JSON.stringify(["CA DGS SB Certified", "CA DGS SB-PW Certified", "LEED Certified"]),
            employee_count: 45,
            annual_revenue: 8500000,
            delivery_radius: 150,
            minimum_order: 5000,
            avg_order_value: 125000,
            on_time_rate: 95,
            quality_score: 4.7,
            last_order: "2024-08-05",
            total_orders: 18,
            total_spent: 2250000,
            dgs_contract_id: "DGS-2024-001"
          },
          {
            uuid: uuidv4(),
            name: "VetTech Solutions LLC",
            category: "Technology Services",
            business_type: "Disabled Veteran Business",
            location: "Los Angeles, CA",
            distance: 285.4,
            rating: 4.9,
            review_count: 187,
            phone: "(213) 555-0199",
            email: "info@vettechsolutions.com",
            website: "www.vettechsolutions.com",
            specialties: JSON.stringify(["Cybersecurity", "Cloud Services", "IT Infrastructure", "Software Development"]),
            certifications: JSON.stringify(["CA DGS DVBE Certified", "NIST Cybersecurity", "Microsoft Gold Partner"]),
            employee_count: 22,
            annual_revenue: 3200000,
            delivery_radius: 500,
            minimum_order: 2500,
            avg_order_value: 45000,
            on_time_rate: 98,
            quality_score: 4.8,
            last_order: "2024-08-10",
            total_orders: 28,
            total_spent: 1260000,
            dgs_contract_id: "DGS-2024-002"
          }
        ];

        // Insert vendor data
        const vendorStmt = this.db.prepare(`
          INSERT INTO vendors (
            uuid, name, category, business_type, location, distance, rating, review_count,
            phone, email, website, specialties, certifications, employee_count, annual_revenue,
            delivery_radius, minimum_order, avg_order_value, on_time_rate, quality_score,
            last_order, total_orders, total_spent, dgs_contract_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        vendorsData.forEach(vendor => {
          vendorStmt.run([
            vendor.uuid, vendor.name, vendor.category, vendor.business_type, vendor.location,
            vendor.distance, vendor.rating, vendor.review_count, vendor.phone, vendor.email,
            vendor.website, vendor.specialties, vendor.certifications, vendor.employee_count,
            vendor.annual_revenue, vendor.delivery_radius, vendor.minimum_order, vendor.avg_order_value,
            vendor.on_time_rate, vendor.quality_score, vendor.last_order, vendor.total_orders,
            vendor.total_spent, vendor.dgs_contract_id
          ]);
        });
        vendorStmt.finalize();

        // Seed categories data
        const categoriesData = [
          { name: "Office Supplies", total_spend: 2800000, smb_spend: 485000, smb_percentage: 17.3, vendor_count: 12, avg_order: 1050, dgs_contracts: 3, dvbe_spend: 85000 },
          { name: "Food Services", total_spend: 8200000, smb_spend: 2050000, smb_percentage: 25.0, vendor_count: 18, avg_order: 6200, dgs_contracts: 2, dvbe_spend: 120000 },
          { name: "Construction & Public Works", total_spend: 15200000, smb_spend: 4560000, smb_percentage: 30.0, vendor_count: 14, avg_order: 125000, dgs_contracts: 1, dvbe_spend: 0 },
          { name: "Technology Services", total_spend: 3400000, smb_spend: 1260000, smb_percentage: 37.1, vendor_count: 6, avg_order: 45000, dgs_contracts: 1, dvbe_spend: 1260000 }
        ];

        const categoryStmt = this.db.prepare(`
          INSERT INTO categories (name, total_spend, smb_spend, smb_percentage, vendor_count, avg_order, dgs_contracts, dvbe_spend)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

        categoriesData.forEach(category => {
          categoryStmt.run([
            category.name, category.total_spend, category.smb_spend, category.smb_percentage,
            category.vendor_count, category.avg_order, category.dgs_contracts, category.dvbe_spend
          ]);
        });
        categoryStmt.finalize();

        // Seed spending trends data
        const trendsData = [
          { month: 'Jan', smb_spending: 3200000, total_spending: 14800000, smb_percentage: 21.6, dvbe_spending: 380000, dvbe_percentage: 2.6, dgs_contracts: 12 },
          { month: 'Feb', smb_spending: 3450000, total_spending: 15200000, smb_percentage: 22.7, dvbe_spending: 420000, dvbe_percentage: 2.8, dgs_contracts: 14 },
          { month: 'Mar', smb_spending: 3680000, total_spending: 15600000, smb_percentage: 23.6, dvbe_spending: 465000, dvbe_percentage: 3.0, dgs_contracts: 16 }
        ];

        const trendStmt = this.db.prepare(`
          INSERT INTO spending_trends (month, smb_spending, total_spending, smb_percentage, dvbe_spending, dvbe_percentage, dgs_contracts)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        trendsData.forEach(trend => {
          trendStmt.run([
            trend.month, trend.smb_spending, trend.total_spending, trend.smb_percentage,
            trend.dvbe_spending, trend.dvbe_percentage, trend.dgs_contracts
          ]);
        });
        trendStmt.finalize();

        // Seed AI recommendations
        const recommendationsData = [
          {
            type: "certification",
            title: "California DGS SB Certification Opportunity",
            content: "5 high-performing vendors in your network qualify for California DGS Small Business certification.",
            confidence: 0.94,
            action: "Guide vendors through DGS SB certification process",
            savings: 32000,
            category: "Certification Support"
          },
          {
            type: "discovery",
            title: "DVBE Vendor Gap Analysis",
            content: "Technology Services category shows only 37% DVBE participation vs 3% state goal.",
            confidence: 0.89,
            action: "Engage VetTech Solutions and 2 other DVBE vendors",
            savings: 145000,
            category: "Technology Services"
          }
        ];

        const recStmt = this.db.prepare(`
          INSERT INTO ai_recommendations (type, title, content, confidence, action, savings, category)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        recommendationsData.forEach(rec => {
          recStmt.run([rec.type, rec.title, rec.content, rec.confidence, rec.action, rec.savings, rec.category]);
        });
        recStmt.finalize();

        console.log('Database seeded successfully');
        resolve();
      });
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed');
      }
    });
  }

  getDatabase() {
    return this.db;
  }
}

module.exports = Database;