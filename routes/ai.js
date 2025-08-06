const express = require('express');
const { body, validationResult } = require('express-validator');
const Database = require('../database/database');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const db = new Database();

// GET /api/ai/recommendations - Get AI recommendations
router.get('/recommendations', (req, res) => {
  db.getDatabase().all(
    'SELECT * FROM ai_recommendations WHERE is_active = 1 ORDER BY confidence DESC, savings DESC',
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.json(rows);
    }
  );
});

// POST /api/ai/chat - AI chat endpoint
router.post('/chat', [
  body('message').isString().isLength({ min: 1, max: 1000 }).trim(),
  body('sessionId').optional().isString()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { message, sessionId = uuidv4() } = req.body;
  
  // Simulate AI response based on message content
  let aiResponse = "";
  
  if (message.toLowerCase().includes('dgs') || message.toLowerCase().includes('certified')) {
    aiResponse = "I can help you find DGS certified vendors! Currently, we have 3 vendors with active DGS contracts including Golden State Construction (SB-PW certified) and VetTech Solutions (DVBE certified). Would you like me to show you more details about their certifications?";
  } else if (message.toLowerCase().includes('dvbe') || message.toLowerCase().includes('veteran')) {
    aiResponse = "Great question about DVBE vendors! We currently have 2 Disabled Veteran Business Enterprises in our system. VetTech Solutions leads in Technology Services with $1.26M in contracts, and Veteran Logistics Solutions provides secure transportation services. The state goal is 3% DVBE participation - would you like to see opportunities to increase this?";
  } else if (message.toLowerCase().includes('ab 2019') || message.toLowerCase().includes('25%') || message.toLowerCase().includes('compliance')) {
    aiResponse = "AB 2019 requires 25% Small Business and 3% DVBE participation. Based on current data: SMB participation varies by category (17-52%), with Construction & Public Works at 30% and Food Services meeting the 25% goal. I can help identify strategies to improve compliance in underperforming categories.";
  } else if (message.toLowerCase().includes('sacramento') || message.toLowerCase().includes('construction')) {
    aiResponse = "For Sacramento-area construction vendors, I recommend Golden State Construction Services. They're CA DGS SB-PW certified with a 4.8 rating, specialize in public works and ADA compliance, and have an active DGS contract (DGS-2024-001). Would you like me to provide their contact information or find similar vendors?";
  } else if (message.toLowerCase().includes('cost') || message.toLowerCase().includes('savings') || message.toLowerCase().includes('calculate')) {
    aiResponse = "Based on current spending patterns, utilizing DGS certified small businesses can provide 12-15% cost savings while meeting AB 2019 compliance goals. Cal eProcure integration could reduce administrative costs by an additional 15%. Would you like me to calculate savings for a specific category or contract amount?";
  } else if (message.toLowerCase().includes('technology') || message.toLowerCase().includes('cyber') || message.toLowerCase().includes('it')) {
    aiResponse = "For technology services, I recommend VetTech Solutions LLC - they're DVBE certified with expertise in cybersecurity, cloud services, and IT infrastructure. They have a 4.9 rating and $1.26M in active contracts. Technology Services currently shows 37.1% SMB participation. Would you like me to find additional tech vendors to improve distribution?";
  } else {
    aiResponse = "I'm your California DGS procurement assistant! I can help you with: • Finding SB/DVBE certified vendors • AB 2019 compliance guidance • DGS certification processes • Cost optimization strategies • Cal eProcure best practices. What specific area would you like to explore?";
  }

  // Store chat session (simplified - in production you'd want proper session management)
  const chatData = {
    sessionId,
    userMessage: message,
    aiResponse,
    timestamp: new Date().toISOString()
  };

  res.json({
    response: aiResponse,
    sessionId,
    timestamp: chatData.timestamp,
    confidence: 0.85,
    relatedActions: [
      "View DGS certified vendors",
      "Check AB 2019 compliance status",
      "Calculate procurement savings",
      "Find vendors by category"
    ]
  });
});

// GET /api/ai/insights - Get AI-generated insights
router.get('/insights', (req, res) => {
  // Get data for insights
  Promise.all([
    new Promise((resolve, reject) => {
      db.getDatabase().get('SELECT SUM(smb_spend) as smb, SUM(total_spend) as total FROM categories', (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    }),
    new Promise((resolve, reject) => {
      db.getDatabase().get('SELECT COUNT(*) as count FROM vendors WHERE dgs_contract_id IS NOT NULL', (err, row) => {
        if (err) reject(err);
        else resolve(row.count);
      });
    }),
    new Promise((resolve, reject) => {
      db.getDatabase().all('SELECT category, smb_percentage FROM categories WHERE smb_percentage < 25', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    })
  ])
  .then(([spending, dgsContracts, underperforming]) => {
    const smbPercentage = (spending.smb / spending.total) * 100;
    
    const insights = [
      {
        type: "performance",
        title: "SMB Goal Performance",
        content: `Current SMB participation is ${smbPercentage.toFixed(1)}%. ${smbPercentage >= 25 ? 'Congratulations on meeting the AB 2019 goal!' : 'Focus needed to reach the 25% AB 2019 goal.'}`,
        priority: smbPercentage >= 25 ? "low" : "high",
        actionable: smbPercentage < 25
      },
      {
        type: "certification",
        title: "DGS Contract Utilization",
        content: `${dgsContracts} vendors have active DGS contracts. Consider expanding DGS certification outreach to increase vendor participation.`,
        priority: "medium",
        actionable: true
      }
    ];

    if (underperforming.length > 0) {
      insights.push({
        type: "opportunity",
        title: "Category Improvement Opportunities",
        content: `${underperforming.length} categories below 25% SMB participation: ${underperforming.map(c => c.category).join(', ')}. These represent growth opportunities.`,
        priority: "high",
        actionable: true
      });
    }

    res.json(insights);
  })
  .catch(err => {
    console.error('Insights error:', err);
    res.status(500).json({ error: 'Failed to generate insights' });
  });
});

// POST /api/ai/recommendations/feedback - Provide feedback on recommendations
router.post('/recommendations/feedback', [
  body('recommendationId').isInt({ min: 1 }),
  body('feedback').isIn(['helpful', 'not-helpful', 'implemented']),
  body('notes').optional().isString().isLength({ max: 500 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { recommendationId, feedback, notes } = req.body;

  // In a real system, you'd store this feedback for ML improvement
  console.log(`Recommendation ${recommendationId} feedback: ${feedback}`, notes ? `Notes: ${notes}` : '');

  res.json({
    message: 'Feedback recorded successfully',
    recommendationId,
    feedback,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;