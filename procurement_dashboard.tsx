import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, DollarSign, Users, Package, Target, Download, Upload, Search, Filter } from 'lucide-react';

const ProcurementDashboard = () => {
  // Current state based on actual data
  const [currentMetrics, setCurrentMetrics] = useState({
    totalSpend: 233485968.24,
    diversityRate: 14.07,
    target: 25.0,
    gap: 25515216.89,
    certificationBreakdown: {
      'LRG': { spend: 200629693.07, percentage: 85.93, transactions: 4614 },
      'SB': { spend: 26625322.43, percentage: 11.40, transactions: 774 },
      'MB': { spend: 5577028.03, percentage: 2.39, transactions: 1084 },
      'DVBE': { spend: 653924.71, percentage: 0.28, transactions: 84 }
    }
  });

  const [shippingOptimization, setShippingOptimization] = useState({
    potentialSavings: 145000,
    carrierAnalysis: [
      { carrier: 'UPS', currentSpend: 520000, optimizedSpend: 445000, savings: 75000 },
      { carrier: 'FedEx', currentSpend: 380000, optimizedSpend: 325000, savings: 55000 },
      { carrier: 'DHL', currentSpend: 200000, optimizedSpend: 185000, savings: 15000 }
    ]
  });

  const [supplierOpportunities, setSupplierOpportunities] = useState([
    { category: 'Professional Services', currentDiversity: 8.5, potential: 35.0, impact: 8500000 },
    { category: 'Construction', currentDiversity: 12.1, potential: 28.0, impact: 5200000 },
    { category: 'IT Services', currentDiversity: 15.8, potential: 32.0, impact: 4800000 },
    { category: 'Goods/Supplies', currentDiversity: 18.2, potential: 40.0, impact: 3900000 }
  ]);

  const [alerts, setAlerts] = useState([
    { type: 'urgent', message: 'DVBE spend at 0.28% - 24.72% below goal', action: 'Identify DVBE opportunities' },
    { type: 'warning', message: '127 supplier certifications expire in Q4 2025', action: 'Initiate renewal process' },
    { type: 'opportunity', message: 'Professional Services category shows highest improvement potential', action: 'Focus outreach efforts' }
  ]);

  const diversityData = Object.keys(currentMetrics.certificationBreakdown).map(key => ({
    name: key,
    value: currentMetrics.certificationBreakdown[key].percentage,
    spend: currentMetrics.certificationBreakdown[key].spend,
    transactions: currentMetrics.certificationBreakdown[key].transactions
  }));

  const COLORS = ['#ef4444', '#22c55e', '#3b82f6', '#f59e0b'];

  const projectedImprovement = [
    { month: 'Current', diversity: 14.07, target: 25 },
    { month: 'Month 3', diversity: 16.5, target: 25 },
    { month: 'Month 6', diversity: 19.2, target: 25 },
    { month: 'Month 9', diversity: 22.1, target: 25 },
    { month: 'Month 12', diversity: 25.0, target: 25 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Cal Poly Procurement Intelligence Dashboard
          </h1>
          <p className="text-slate-300 text-lg">AI-Powered Supplier Diversity & Cost Optimization</p>
        </div>

        {/* Alert Banner */}
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-400" />
            <div>
              <h3 className="font-semibold text-red-200">Compliance Gap Alert</h3>
              <p className="text-red-300">Currently 10.93% below 25% supplier diversity goal. Gap: $25.5M</p>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="text-green-400 h-8 w-8" />
              <span className="text-2xl font-bold text-green-400">
                {currentMetrics.diversityRate}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-300 mb-1">Current Diversity Rate</h3>
            <p className="text-xs text-slate-400">Target: 25%</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Target className="text-red-400 h-8 w-8" />
              <span className="text-2xl font-bold text-red-400">
                ${(currentMetrics.gap / 1000000).toFixed(1)}M
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-300 mb-1">Compliance Gap</h3>
            <p className="text-xs text-slate-400">To reach 25% goal</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Package className="text-blue-400 h-8 w-8" />
              <span className="text-2xl font-bold text-blue-400">
                ${(shippingOptimization.potentialSavings / 1000).toFixed(0)}K
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-300 mb-1">Shipping Savings</h3>
            <p className="text-xs text-slate-400">Annual potential</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-purple-400 h-8 w-8" />
              <span className="text-2xl font-bold text-purple-400">
                {currentMetrics.certificationBreakdown.DVBE.transactions + 
                 currentMetrics.certificationBreakdown.SB.transactions + 
                 currentMetrics.certificationBreakdown.MB.transactions}
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-300 mb-1">Diverse Suppliers</h3>
            <p className="text-xs text-slate-400">Active vendors</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Diversity Breakdown */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">Supplier Certification Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={diversityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {diversityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Projected Improvement */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">Diversity Goal Progress Projection</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={projectedImprovement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="diversity" 
                  stroke="#22c55e" 
                  strokeWidth={3} 
                  name="Current Progress" 
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  name="25% Target" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Items & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Smart Alerts */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">AI-Generated Action Items</h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'urgent' ? 'bg-red-500/20 border-red-400' :
                  alert.type === 'warning' ? 'bg-yellow-500/20 border-yellow-400' :
                  'bg-blue-500/20 border-blue-400'
                }`}>
                  <p className="text-sm mb-2">{alert.message}</p>
                  <button className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                    {alert.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">AI Strategy Recommendations</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">🎯 Priority Action</h4>
                <p className="text-sm text-slate-300">Focus on Professional Services category - lowest diversity (8.5%) but highest impact potential ($8.5M)</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">💡 Quick Win</h4>
                <p className="text-sm text-slate-300">Implement carrier optimization algorithm - immediate $145K annual savings</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">🔄 Process Improvement</h4>
                <p className="text-sm text-slate-300">Automate certification tracking to prevent 127 pending expirations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
            <Search className="h-4 w-4" />
            Find DVBE Suppliers
          </button>
          
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Optimize Shipping
          </button>
          
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Generate Report
          </button>
          
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Update Data
          </button>
        </div>

        {/* Next Steps Summary */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-indigo-500/30">
          <h3 className="text-xl font-semibold mb-4">Next Steps Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-400 mb-3">Immediate (Week 1-2)</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Deploy shipping optimization algorithm</li>
                <li>• Identify expiring certifications</li>
                <li>• Launch DVBE supplier outreach campaign</li>
                <li>• Implement real-time tracking dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-400 mb-3">Strategic (Month 1-3)</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Train AI matching system on historical data</li>
                <li>• Establish supplier mentorship program</li>
                <li>• Automate quarterly compliance reporting</li>
                <li>• Integrate with CA SB/DVBE database</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProcurementDashboard;