import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, DollarSign, Users, Package, Target, Download, Upload, Search, Filter, Settings, Bell, ChevronDown, Star, Award, Calendar, BarChart3, PieChart as PieChartIcon, TrendingDown, Info, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ProcurementDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showWorkflow, setShowWorkflow] = useState(null);
  const [workflowStep, setWorkflowStep] = useState(0);

  // Current state based on actual data
  const [currentMetrics, setCurrentMetrics] = useState({
    totalSpend: 233485968.24,
    diversityRate: 14.07,
    target: 25.0,
    gap: 25515216.89,
    certificationBreakdown: {
      'LRG': { spend: 200629693.07, percentage: 85.93, transactions: 4614, color: '#ef4444' },
      'SB': { spend: 26625322.43, percentage: 11.40, transactions: 774, color: '#22c55e' },
      'MB': { spend: 5577028.03, percentage: 2.39, transactions: 1084, color: '#3b82f6' },
      'DVBE': { spend: 653924.71, percentage: 0.28, transactions: 84, color: '#f59e0b' }
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
    { category: 'Professional Services', currentDiversity: 8.5, potential: 35.0, impact: 8500000, priority: 'high' },
    { category: 'Construction', currentDiversity: 12.1, potential: 28.0, impact: 5200000, priority: 'medium' },
    { category: 'IT Services', currentDiversity: 15.8, potential: 32.0, impact: 4800000, priority: 'medium' },
    { category: 'Goods/Supplies', currentDiversity: 18.2, potential: 40.0, impact: 3900000, priority: 'low' }
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'urgent', message: 'DVBE spend at 0.28% - 24.72% below goal', action: 'Identify DVBE opportunities', priority: 'high', category: 'compliance' },
    { id: 2, type: 'warning', message: '127 supplier certifications expire in Q4 2025', action: 'Initiate renewal process', priority: 'medium', category: 'certification' },
    { id: 3, type: 'opportunity', message: 'Professional Services category shows highest improvement potential', action: 'Focus outreach efforts', priority: 'high', category: 'opportunity' }
  ]);

  const diversityData = Object.keys(currentMetrics.certificationBreakdown).map(key => ({
    name: key,
    value: currentMetrics.certificationBreakdown[key].percentage,
    spend: currentMetrics.certificationBreakdown[key].spend,
    transactions: currentMetrics.certificationBreakdown[key].transactions,
    color: currentMetrics.certificationBreakdown[key].color
  }));

  const projectedImprovement = [
    { month: 'Current', diversity: 14.07, target: 25 },
    { month: 'Month 3', diversity: 16.5, target: 25 },
    { month: 'Month 6', diversity: 19.2, target: 25 },
    { month: 'Month 9', diversity: 22.1, target: 25 },
    { month: 'Month 12', diversity: 25.0, target: 25 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'diversity', label: 'Diversity Analysis', icon: PieChartIcon },
    { id: 'opportunities', label: 'Opportunities', icon: TrendingUp },
    { id: 'optimization', label: 'Cost Optimization', icon: DollarSign },
    { id: 'alerts', label: 'Action Items', icon: Bell }
  ];

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatCurrency = (amount) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toFixed(0)}`;
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || alert.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const TabContent = ({ tabId }) => {
    switch (tabId) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                Diversity Progress Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getProgressColor(currentMetrics.diversityRate, currentMetrics.target)}`}>
                    {currentMetrics.diversityRate}%
                  </div>
                  <div className="text-sm text-slate-400">Current Rate</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentMetrics.diversityRate / currentMetrics.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{currentMetrics.target}%</div>
                  <div className="text-sm text-slate-400">Target Goal</div>
                  <div className="mt-2">
                    <Star className="h-6 w-6 text-yellow-400 mx-auto" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">
                    {formatCurrency(currentMetrics.gap)}
                  </div>
                  <div className="text-sm text-slate-400">Gap to Close</div>
                  <div className="mt-2">
                    <TrendingDown className="h-6 w-6 text-red-400 mx-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div 
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer hover:bg-white/15 transition-all"
                onClick={() => setSelectedMetric('diversity')}
              >
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="text-green-400 h-8 w-8" />
                  <span className="text-2xl font-bold text-green-400">
                    {currentMetrics.diversityRate}%
                  </span>
                </div>
                <h3 className="text-sm font-medium text-slate-300 mb-1">Current Diversity Rate</h3>
                <p className="text-xs text-slate-400">Target: 25%</p>
                <div className="mt-3 flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-blue-400">Click for details</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer hover:bg-white/15 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Target className="text-red-400 h-8 w-8" />
                  <span className="text-2xl font-bold text-red-400">
                    {formatCurrency(currentMetrics.gap)}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-slate-300 mb-1">Compliance Gap</h3>
                <p className="text-xs text-slate-400">To reach 25% goal</p>
                <div className="mt-3">
                  <div className="bg-red-500/20 rounded-full px-2 py-1">
                    <span className="text-xs text-red-300">High Priority</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer hover:bg-white/15 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Package className="text-blue-400 h-8 w-8" />
                  <span className="text-2xl font-bold text-blue-400">
                    {formatCurrency(shippingOptimization.potentialSavings)}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-slate-300 mb-1">Shipping Savings</h3>
                <p className="text-xs text-slate-400">Annual potential</p>
                <div className="mt-3">
                  <div className="bg-green-500/20 rounded-full px-2 py-1">
                    <span className="text-xs text-green-300">Quick Win</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer hover:bg-white/15 transition-all">
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
                <div className="mt-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-green-400">Verified</span>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Diversity Breakdown */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Supplier Certification Breakdown
                </h3>
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
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, 'Percentage']}
                      labelFormatter={(label) => `Category: ${label}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {diversityData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.name}: {formatCurrency(item.spend)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projected Improvement */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Diversity Goal Progress Projection
                </h3>
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
          </div>
        );

      case 'diversity':
        return (
          <div className="space-y-6">
            {/* Detailed Diversity Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Certification Distribution
                </h3>
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
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, 'Percentage']}
                      labelFormatter={(label) => `Category: ${label}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Spend Analysis
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={diversityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip formatter={(value) => [formatCurrency(value), 'Spend']} />
                    <Bar dataKey="spend" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Detailed Certification Metrics</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-2">Certification</th>
                      <th className="text-left py-3 px-2">Spend Amount</th>
                      <th className="text-left py-3 px-2">Percentage</th>
                      <th className="text-left py-3 px-2">Transactions</th>
                      <th className="text-left py-3 px-2">Avg Transaction</th>
                      <th className="text-left py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diversityData.map((item, index) => (
                      <tr key={index} className="border-b border-white/10">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            {item.name}
                          </div>
                        </td>
                        <td className="py-3 px-2 font-mono">{formatCurrency(item.spend)}</td>
                        <td className="py-3 px-2">{item.value}%</td>
                        <td className="py-3 px-2">{item.transactions}</td>
                        <td className="py-3 px-2 font-mono">{formatCurrency(item.spend / item.transactions)}</td>
                        <td className="py-3 px-2">
                          {item.name === 'DVBE' ? (
                            <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs">
                              Below Target
                            </span>
                          ) : item.name === 'LRG' ? (
                            <span className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded-full text-xs">
                              Non-Diverse
                            </span>
                          ) : (
                            <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">
                              Active
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'opportunities':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Supplier Diversity Opportunities</h3>
              <div className="space-y-4">
                {supplierOpportunities.map((opportunity, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{opportunity.category}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        opportunity.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                        opportunity.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {opportunity.priority} priority
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Current: </span>
                        <span className="text-red-400">{opportunity.currentDiversity}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Potential: </span>
                        <span className="text-green-400">{opportunity.potential}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Impact: </span>
                        <span className="text-blue-400">{formatCurrency(opportunity.impact)}</span>
                      </div>
                      <div>
                        <button className="bg-blue-500/20 hover:bg-blue-500/30 px-3 py-1 rounded-full text-blue-300 transition-colors">
                          Explore
                        </button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full"
                          style={{ width: `${(opportunity.currentDiversity / opportunity.potential) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Strategy Recommendations */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">AI Strategy Recommendations</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Priority Action
                  </h4>
                  <p className="text-sm text-slate-300">Focus on Professional Services category - lowest diversity (8.5%) but highest impact potential ($8.5M)</p>
                  <button className="mt-2 bg-blue-500/30 hover:bg-blue-500/40 px-3 py-1 rounded-full text-blue-300 text-xs transition-colors">
                    Create Action Plan
                  </button>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Quick Win
                  </h4>
                  <p className="text-sm text-slate-300">Implement carrier optimization algorithm - immediate $145K annual savings</p>
                  <button className="mt-2 bg-green-500/30 hover:bg-green-500/40 px-3 py-1 rounded-full text-green-300 text-xs transition-colors">
                    Implement Now
                  </button>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Process Improvement
                  </h4>
                  <p className="text-sm text-slate-300">Automate certification tracking to prevent 127 pending expirations</p>
                  <button className="mt-2 bg-cyan-500/30 hover:bg-cyan-500/40 px-3 py-1 rounded-full text-cyan-300 text-xs transition-colors">
                    Setup Automation
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'optimization':
        return (
          <div className="space-y-6">
            {/* Shipping Optimization */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Shipping Cost Optimization
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Carrier Analysis</h4>
                  <div className="space-y-3">
                    {shippingOptimization.carrierAnalysis.map((carrier, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{carrier.carrier}</span>
                          <span className="text-green-400">{formatCurrency(carrier.savings)} saved</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Current: </span>
                            <span>{formatCurrency(carrier.currentSpend)}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Optimized: </span>
                            <span className="text-green-400">{formatCurrency(carrier.optimizedSpend)}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(carrier.optimizedSpend / carrier.currentSpend) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Optimization Summary</h4>
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {formatCurrency(shippingOptimization.potentialSavings)}
                    </div>
                    <div className="text-sm text-slate-300 mb-4">Annual Potential Savings</div>
                    <button className="bg-green-500/30 hover:bg-green-500/40 px-4 py-2 rounded-lg text-green-300 transition-colors">
                      Apply Optimization
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cost Analysis by Category
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={supplierOpportunities}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="category" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip formatter={(value) => [formatCurrency(value), 'Impact Potential']} />
                  <Bar dataKey="impact" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'alerts':
        return (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="compliance">Compliance</option>
                    <option value="certification">Certification</option>
                    <option value="opportunity">Opportunity</option>
                  </select>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Alert Items */}
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border-l-4 bg-white/10 backdrop-blur-md border border-white/20 ${
                  alert.type === 'urgent' ? 'border-l-red-400' :
                  alert.type === 'warning' ? 'border-l-yellow-400' :
                  'border-l-blue-400'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {alert.type === 'urgent' ? <AlertCircle className="h-4 w-4 text-red-400" /> :
                         alert.type === 'warning' ? <Clock className="h-4 w-4 text-yellow-400" /> :
                         <Info className="h-4 w-4 text-blue-400" />}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          alert.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {alert.priority} priority
                        </span>
                        <span className="text-xs text-slate-400">{alert.category}</span>
                      </div>
                      <p className="text-sm mb-2">{alert.message}</p>
                      <button className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                        {alert.action}
                      </button>
                    </div>
                    <button className="ml-4 text-slate-400 hover:text-white">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Content for {tabId}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Cal Poly Procurement Intelligence Dashboard
              </h1>
              <p className="text-slate-300 text-lg">AI-Powered Supplier Diversity & Cost Optimization</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-slate-400 hover:text-white cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {alerts.length}
                </span>
              </div>
              <Settings className="h-6 w-6 text-slate-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
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

        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 mb-6 border border-white/20">
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Wins Banner */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-4 mb-6 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-yellow-400" />
              <div>
                <h3 className="font-semibold text-green-200">Quick Wins Available</h3>
                <p className="text-green-300 text-sm">
                  {formatCurrency(shippingOptimization.potentialSavings)} in immediate savings • 
                  {supplierOpportunities.filter(o => o.priority === 'high').length} high-priority opportunities
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('optimization')}
              className="bg-green-500/30 hover:bg-green-500/40 px-4 py-2 rounded-lg text-green-300 transition-colors flex items-center gap-2"
            >
              View All
              <TrendingUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <TabContent tabId={activeTab} />

        {        /* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button 
            onClick={() => setShowWorkflow('find-suppliers')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Find DVBE Suppliers
          </button>
          
          <button 
            onClick={() => setShowWorkflow('optimize-shipping')}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Optimize Shipping
          </button>
          
          <button 
            onClick={() => setShowWorkflow('generate-report')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Generate Report
          </button>
          
          <button 
            onClick={() => setShowWorkflow('update-data')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Update Data
          </button>
        </div>

        {/* Workflow Modal */}
        {showWorkflow && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full mx-4 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">
                  {showWorkflow === 'find-suppliers' && 'Find DVBE Suppliers Workflow'}
                  {showWorkflow === 'optimize-shipping' && 'Shipping Optimization Workflow'}
                  {showWorkflow === 'generate-report' && 'Generate Report Workflow'}
                  {showWorkflow === 'update-data' && 'Data Update Workflow'}
                </h3>
                <button 
                  onClick={() => {setShowWorkflow(null); setWorkflowStep(0);}}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {showWorkflow === 'find-suppliers' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        workflowStep >= step ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-400 text-slate-400'
                      }`}>
                        {step}
                      </div>
                    ))}
                  </div>
                  
                  {workflowStep === 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Step 1: Define Search Criteria</h4>
                      <p className="text-sm text-slate-300 mb-4">Specify the type of DVBE suppliers you're looking for.</p>
                      <div className="space-y-2">
                        <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                          <option>Professional Services</option>
                          <option>Construction</option>
                          <option>IT Services</option>
                          <option>Goods/Supplies</option>
                        </select>
                        <input 
                          type="text" 
                          placeholder="Location (optional)"
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                        />
                      </div>
                    </div>
                  )}

                  {workflowStep === 1 && (
                    <div>
                      <h4 className="font-medium mb-2">Step 2: AI Recommendations</h4>
                      <p className="text-sm text-slate-300 mb-4">Based on your criteria, here are our AI recommendations:</p>
                      <div className="space-y-2">
                        <div className="bg-slate-700 p-3 rounded-lg">
                          <div className="font-medium">ABC Engineering Services</div>
                          <div className="text-sm text-slate-300">DVBE Certified • Oakland, CA • $2.5M capacity</div>
                          <div className="text-xs text-green-400 mt-1">98% quality rating • 15 positive reviews</div>
                        </div>
                        <div className="bg-slate-700 p-3 rounded-lg">
                          <div className="font-medium">TechVet Solutions</div>
                          <div className="text-sm text-slate-300">DVBE Certified • San Jose, CA • $1.8M capacity</div>
                          <div className="text-xs text-green-400 mt-1">95% quality rating • 12 positive reviews</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    {workflowStep > 0 && (
                      <button 
                        onClick={() => setWorkflowStep(workflowStep - 1)}
                        className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    <button 
                      onClick={() => workflowStep < 3 ? setWorkflowStep(workflowStep + 1) : setShowWorkflow(null)}
                      className="ml-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                    >
                      {workflowStep < 3 ? 'Next' : 'Complete'}
                    </button>
                  </div>
                </div>
              )}

              {showWorkflow === 'optimize-shipping' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Optimization Ready</h4>
                    <p className="text-sm text-slate-300 mb-4">
                      Our AI has analyzed your shipping patterns and identified optimization opportunities.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Potential Annual Savings:</span>
                        <div className="font-bold text-green-400">{formatCurrency(shippingOptimization.potentialSavings)}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Implementation Time:</span>
                        <div className="font-bold">2-3 weeks</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowWorkflow(null)}
                      className="mt-4 bg-green-500/30 hover:bg-green-500/40 px-4 py-2 rounded-lg text-green-300 transition-colors"
                    >
                      Start Implementation
                    </button>
                  </div>
                </div>
              )}

              {showWorkflow === 'generate-report' && (
                <div className="space-y-4">
                  <h4 className="font-medium mb-2">Select Report Type</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { name: 'Diversity Compliance Report', desc: 'Complete overview of supplier diversity metrics' },
                      { name: 'Cost Optimization Report', desc: 'Analysis of potential savings and optimizations' },
                      { name: 'Executive Summary', desc: 'High-level dashboard for leadership' },
                      { name: 'Custom Report', desc: 'Build your own report with selected metrics' }
                    ].map((report, index) => (
                      <div key={index} className="bg-slate-700 p-3 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors">
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-slate-300">{report.desc}</div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowWorkflow(null)}
                    className="mt-4 bg-purple-500/30 hover:bg-purple-500/40 px-4 py-2 rounded-lg text-purple-300 transition-colors"
                  >
                    Generate Selected Report
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcurementDashboard;