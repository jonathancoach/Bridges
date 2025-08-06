import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, ScatterChart, Scatter } from 'recharts';
import { Search, MessageCircle, Calculator, TrendingUp, MapPin, Users, DollarSign, Star, Package, Truck, Building, Phone, Mail, Globe, AlertCircle, CheckCircle, Filter, Zap } from 'lucide-react';

const vendorDatabase = [
  {
    id: 1,
    name: "Central Coast Office Solutions",
    category: "Office Supplies",
    businessType: "Small Business",
    location: "San Luis Obispo, CA",
    distance: 2.3,
    rating: 4.7,
    reviewCount: 143,
    phone: "(805) 544-3400",
    email: "orders@ccofficeSolutions.com",
    website: "www.centralcoastoffice.com",
    specialties: ["Paper Products", "Writing Supplies", "Office Equipment"],
    certifications: ["SBA Certified", "California Small Business"],
    employeeCount: 12,
    annualRevenue: 1200000,
    deliveryRadius: 50,
    minimumOrder: 100,
    avgOrderValue: 850,
    onTimeRate: 96,
    qualityScore: 4.6,
    lastOrder: "2024-07-15",
    totalOrders: 34,
    totalSpent: 28900
  },
  {
    id: 2,
    name: "Farm Fresh SLO Catering",
    category: "Food Services",
    businessType: "Small Business",
    location: "San Luis Obispo, CA",
    distance: 4.1,
    rating: 4.9,
    reviewCount: 267,
    phone: "(805) 756-2400",
    email: "catering@farmfreshslo.com",
    website: "www.farmfreshslocationing.com",
    specialties: ["Campus Catering", "Event Planning", "Local Sourcing"],
    certifications: ["Food Handler Certified", "Organic Certified"],
    employeeCount: 18,
    annualRevenue: 980000,
    deliveryRadius: 25,
    minimumOrder: 500,
    avgOrderValue: 2400,
    onTimeRate: 98,
    qualityScore: 4.8,
    lastOrder: "2024-08-01",
    totalOrders: 12,
    totalSpent: 31200
  },
  {
    id: 3,
    name: "Coastal Landscape Services",
    category: "Facilities & Maintenance",
    businessType: "Small Business",
    location: "Pismo Beach, CA",
    distance: 8.7,
    rating: 4.5,
    reviewCount: 89,
    phone: "(805) 773-2100",
    email: "info@coastallandscape.com",
    website: "www.coastallandscapeservices.com",
    specialties: ["Landscaping", "Irrigation", "Tree Services", "Sustainable Practices"],
    certifications: ["Licensed Landscape Contractor", "Sustainable Landscaping"],
    employeeCount: 25,
    annualRevenue: 1800000,
    deliveryRadius: 40,
    minimumOrder: 1000,
    avgOrderValue: 3200,
    onTimeRate: 94,
    qualityScore: 4.4,
    lastOrder: "2024-07-28",
    totalOrders: 8,
    totalSpent: 25600
  },
  {
    id: 4,
    name: "SLO Valley Transport",
    category: "Transportation",
    businessType: "Small Business",
    location: "Arroyo Grande, CA",
    distance: 12.4,
    rating: 4.3,
    reviewCount: 156,
    phone: "(805) 489-7700",
    email: "dispatch@slovalleytransport.com",
    website: "www.slovalleytransport.com",
    specialties: ["Local Delivery", "Moving Services", "Equipment Transport"],
    certifications: ["DOT Certified", "Insured Carrier"],
    employeeCount: 15,
    annualRevenue: 750000,
    deliveryRadius: 75,
    minimumOrder: 200,
    avgOrderValue: 680,
    onTimeRate: 91,
    qualityScore: 4.2,
    lastOrder: "2024-08-03",
    totalOrders: 23,
    totalSpent: 15640
  },
  {
    id: 5,
    name: "Tech Solutions Plus",
    category: "Technology Services",
    businessType: "Small Business",
    location: "San Luis Obispo, CA",
    distance: 1.8,
    rating: 4.8,
    reviewCount: 201,
    phone: "(805) 541-3300",
    email: "support@techsolutionsplus.com",
    website: "www.techsolutionsplus.com",
    specialties: ["IT Support", "Network Setup", "Software Installation"],
    certifications: ["CompTIA Certified", "Microsoft Partner"],
    employeeCount: 8,
    annualRevenue: 650000,
    deliveryRadius: 30,
    minimumOrder: 500,
    avgOrderValue: 1200,
    onTimeRate: 97,
    qualityScore: 4.7,
    lastOrder: "2024-07-20",
    totalOrders: 15,
    totalSpent: 18000
  },
  {
    id: 6,
    name: "Green Clean Supplies",
    category: "Cleaning Supplies",
    businessType: "Small Business",
    location: "Morro Bay, CA",
    distance: 13.2,
    rating: 4.6,
    reviewCount: 78,
    phone: "(805) 772-4500",
    email: "sales@greenCleansupplies.com",
    website: "www.greenCleansupplies.com",
    specialties: ["Eco-Friendly Products", "Bulk Cleaning Supplies", "Sanitizers"],
    certifications: ["Green Business Certified", "EPA Approved"],
    employeeCount: 6,
    annualRevenue: 420000,
    deliveryRadius: 35,
    minimumOrder: 250,
    avgOrderValue: 450,
    onTimeRate: 93,
    qualityScore: 4.5,
    lastOrder: "2024-07-25",
    totalOrders: 19,
    totalSpent: 8550
  },
  // California DGS Certified Small and Medium Businesses
  {
    id: 7,
    name: "Golden State Construction Services",
    category: "Construction & Public Works",
    businessType: "Small Business",
    location: "Sacramento, CA",
    distance: 15.2,
    rating: 4.8,
    reviewCount: 312,
    phone: "(916) 442-8200",
    email: "contracts@goldenstateconstruction.com",
    website: "www.goldenstateconstruction.com",
    specialties: ["Public Works", "Infrastructure", "Green Building", "ADA Compliance"],
    certifications: ["CA DGS SB Certified", "CA DGS SB-PW Certified", "LEED Certified"],
    employeeCount: 45,
    annualRevenue: 8500000,
    deliveryRadius: 150,
    minimumOrder: 5000,
    avgOrderValue: 125000,
    onTimeRate: 95,
    qualityScore: 4.7,
    lastOrder: "2024-08-05",
    totalOrders: 18,
    totalSpent: 2250000,
    dgsContractId: "DGS-2024-001"
  },
  {
    id: 8,
    name: "VetTech Solutions LLC",
    category: "Technology Services",
    businessType: "Disabled Veteran Business",
    location: "Los Angeles, CA",
    distance: 285.4,
    rating: 4.9,
    reviewCount: 187,
    phone: "(213) 555-0199",
    email: "info@vettechsolutions.com",
    website: "www.vettechsolutions.com",
    specialties: ["Cybersecurity", "Cloud Services", "IT Infrastructure", "Software Development"],
    certifications: ["CA DGS DVBE Certified", "NIST Cybersecurity", "Microsoft Gold Partner"],
    employeeCount: 22,
    annualRevenue: 3200000,
    deliveryRadius: 500,
    minimumOrder: 2500,
    avgOrderValue: 45000,
    onTimeRate: 98,
    qualityScore: 4.8,
    lastOrder: "2024-08-10",
    totalOrders: 28,
    totalSpent: 1260000,
    dgsContractId: "DGS-2024-002"
  },
  {
    id: 9,
    name: "Bay Area Office Supplies Co.",
    category: "Office Supplies",
    businessType: "Small Business",
    location: "Oakland, CA",
    distance: 380.1,
    rating: 4.6,
    reviewCount: 445,
    phone: "(510) 891-5500",
    email: "orders@bayareaoffice.com",
    website: "www.bayareaofficesupplies.com",
    specialties: ["Bulk Office Supplies", "Ergonomic Furniture", "Sustainable Products", "Same-Day Delivery"],
    certifications: ["CA DGS SB Certified", "Green Business Certified", "WBE Certified"],
    employeeCount: 35,
    annualRevenue: 4200000,
    deliveryRadius: 100,
    minimumOrder: 150,
    avgOrderValue: 1250,
    onTimeRate: 94,
    qualityScore: 4.5,
    lastOrder: "2024-08-08",
    totalOrders: 156,
    totalSpent: 195000,
    dgsContractId: "DGS-2024-003"
  },
  {
    id: 10,
    name: "Pacific Healthcare Supplies",
    category: "Medical Supplies",
    businessType: "Small Business",
    location: "San Diego, CA",
    distance: 245.8,
    rating: 4.7,
    reviewCount: 298,
    phone: "(619) 234-7800",
    email: "sales@pacifichealthcare.com",
    website: "www.pacifichealthcaresupplies.com",
    specialties: ["Medical Equipment", "PPE", "Laboratory Supplies", "Emergency Response"],
    certifications: ["CA DGS SB Certified", "FDA Registered", "ISO 13485"],
    employeeCount: 28,
    annualRevenue: 5800000,
    deliveryRadius: 200,
    minimumOrder: 500,
    avgOrderValue: 3200,
    onTimeRate: 97,
    qualityScore: 4.6,
    lastOrder: "2024-08-12",
    totalOrders: 89,
    totalSpent: 284800,
    dgsContractId: "DGS-2024-004"
  },
  {
    id: 11,
    name: "California Catering Collective",
    category: "Food Services",
    businessType: "Small Business",
    location: "Fresno, CA",
    distance: 210.3,
    rating: 4.8,
    reviewCount: 356,
    phone: "(559) 441-2900",
    email: "events@cacateringcollective.com",
    website: "www.cacateringcollective.com",
    specialties: ["State Events", "Large Scale Catering", "Sustainable Sourcing", "Cultural Cuisine"],
    certifications: ["CA DGS SB Certified", "Certified Sustainable", "ServSafe Certified"],
    employeeCount: 42,
    annualRevenue: 6200000,
    deliveryRadius: 300,
    minimumOrder: 1000,
    avgOrderValue: 8500,
    onTimeRate: 96,
    qualityScore: 4.7,
    lastOrder: "2024-08-11",
    totalOrders: 67,
    totalSpent: 569500,
    dgsContractId: "DGS-2024-005"
  },
  {
    id: 12,
    name: "EcoClean California",
    category: "Cleaning Supplies",
    businessType: "Small Business",
    location: "San Jose, CA",
    distance: 340.2,
    rating: 4.5,
    reviewCount: 223,
    phone: "(408) 287-4400",
    email: "info@ecocleanca.com",
    website: "www.ecocleancalifornia.com",
    specialties: ["Green Cleaning Products", "Bulk Supplies", "Custom Formulations", "Waste Reduction"],
    certifications: ["CA DGS SB Certified", "EPA Safer Choice", "Green Seal Certified"],
    employeeCount: 19,
    annualRevenue: 2800000,
    deliveryRadius: 150,
    minimumOrder: 300,
    avgOrderValue: 750,
    onTimeRate: 92,
    qualityScore: 4.4,
    lastOrder: "2024-08-09",
    totalOrders: 134,
    totalSpent: 100500,
    dgsContractId: "DGS-2024-006"
  },
  {
    id: 13,
    name: "Veteran Logistics Solutions",
    category: "Transportation",
    businessType: "Disabled Veteran Business",
    location: "Riverside, CA",
    distance: 420.5,
    rating: 4.9,
    reviewCount: 167,
    phone: "(951) 788-3300",
    email: "dispatch@vetlogistics.com",
    website: "www.veteranlogistics.com",
    specialties: ["Secure Transport", "Government Logistics", "Emergency Response", "Fleet Management"],
    certifications: ["CA DGS DVBE Certified", "DOT Certified", "TSA Approved"],
    employeeCount: 31,
    annualRevenue: 4100000,
    deliveryRadius: 500,
    minimumOrder: 1000,
    avgOrderValue: 5200,
    onTimeRate: 99,
    qualityScore: 4.8,
    lastOrder: "2024-08-13",
    totalOrders: 45,
    totalSpent: 234000,
    dgsContractId: "DGS-2024-007"
  },
  {
    id: 14,
    name: "Capital Region Facilities Management",
    category: "Facilities & Maintenance",
    businessType: "Medium Business",
    location: "Sacramento, CA",
    distance: 15.8,
    rating: 4.6,
    reviewCount: 289,
    phone: "(916) 448-7200",
    email: "services@capitalfacilities.com",
    website: "www.capitalregionfacilities.com",
    specialties: ["Building Maintenance", "HVAC Services", "Energy Management", "Emergency Repairs"],
    certifications: ["CA DGS SB Certified", "Energy Star Partner", "Licensed Contractors"],
    employeeCount: 78,
    annualRevenue: 12500000,
    deliveryRadius: 100,
    minimumOrder: 2000,
    avgOrderValue: 15000,
    onTimeRate: 93,
    qualityScore: 4.5,
    lastOrder: "2024-08-14",
    totalOrders: 92,
    totalSpent: 1380000,
    dgsContractId: "DGS-2024-008"
  },
  {
    id: 15,
    name: "Women-Owned Professional Services",
    category: "Professional Services",
    businessType: "Small Business",
    location: "San Francisco, CA",
    distance: 410.3,
    rating: 4.8,
    reviewCount: 234,
    phone: "(415) 621-9900",
    email: "contact@woprofessional.com",
    website: "www.womenprofessionalservices.com",
    specialties: ["Consulting", "Project Management", "Training", "Compliance"],
    certifications: ["CA DGS SB Certified", "WBE Certified", "PMP Certified"],
    employeeCount: 24,
    annualRevenue: 3600000,
    deliveryRadius: 200,
    minimumOrder: 1500,
    avgOrderValue: 12000,
    onTimeRate: 97,
    qualityScore: 4.7,
    lastOrder: "2024-08-07",
    totalOrders: 38,
    totalSpent: 456000,
    dgsContractId: "DGS-2024-009"
  }
];

const categoryData = [
  { name: "Office Supplies", totalSpend: 2800000, smbSpend: 485000, smbPercentage: 17.3, vendorCount: 12, avgOrder: 1050, dgsContracts: 3, dvbeSpend: 85000 },
  { name: "Food Services", totalSpend: 8200000, smbSpend: 2050000, smbPercentage: 25.0, vendorCount: 18, avgOrder: 6200, dgsContracts: 2, dvbeSpend: 120000 },
  { name: "Facilities & Maintenance", totalSpend: 5100000, smbSpend: 2420000, smbPercentage: 47.5, vendorCount: 22, avgOrder: 12500, dgsContracts: 2, dvbeSpend: 180000 },
  { name: "Transportation", totalSpend: 1200000, smbSpend: 468000, smbPercentage: 39.0, vendorCount: 8, avgOrder: 5200, dgsContracts: 2, dvbeSpend: 234000 },
  { name: "Technology Services", totalSpend: 3400000, smbSpend: 1260000, smbPercentage: 37.1, vendorCount: 6, avgOrder: 45000, dgsContracts: 1, dvbeSpend: 1260000 },
  { name: "Cleaning Supplies", totalSpend: 800000, smbSpend: 420500, smbPercentage: 52.6, vendorCount: 8, avgOrder: 750, dgsContracts: 1, dvbeSpend: 0 },
  { name: "Construction & Public Works", totalSpend: 15200000, smbSpend: 4560000, smbPercentage: 30.0, vendorCount: 14, avgOrder: 125000, dgsContracts: 1, dvbeSpend: 0 },
  { name: "Medical Supplies", totalSpend: 2400000, smbSpend: 600000, smbPercentage: 25.0, vendorCount: 5, avgOrder: 3200, dgsContracts: 1, dvbeSpend: 0 },
  { name: "Professional Services", totalSpend: 4800000, smbSpend: 1200000, smbPercentage: 25.0, vendorCount: 9, avgOrder: 12000, dgsContracts: 1, dvbeSpend: 0 }
];

const spendingTrends = [
  { month: 'Jan', smbSpending: 3200000, totalSpending: 14800000, smbPercentage: 21.6, dvbeSpending: 380000, dvbePercentage: 2.6, dgsContracts: 12 },
  { month: 'Feb', smbSpending: 3450000, totalSpending: 15200000, smbPercentage: 22.7, dvbeSpending: 420000, dvbePercentage: 2.8, dgsContracts: 14 },
  { month: 'Mar', smbSpending: 3680000, totalSpending: 15600000, smbPercentage: 23.6, dvbeSpending: 465000, dvbePercentage: 3.0, dgsContracts: 16 },
  { month: 'Apr', smbSpending: 3850000, totalSpending: 16100000, smbPercentage: 23.9, dvbeSpending: 485000, dvbePercentage: 3.0, dgsContracts: 17 },
  { month: 'May', smbSpending: 4120000, totalSpending: 16800000, smbPercentage: 24.5, dvbeSpending: 505000, dvbePercentage: 3.0, dgsContracts: 19 },
  { month: 'Jun', smbSpending: 4350000, totalSpending: 17400000, smbPercentage: 25.0, dvbeSpending: 522000, dvbePercentage: 3.0, dgsContracts: 21 },
  { month: 'Jul', smbSpending: 4580000, totalSpending: 18200000, smbPercentage: 25.2, dvbeSpending: 546000, dvbePercentage: 3.0, dgsContracts: 23 }
];

const aiRecommendations = [
  {
    type: "certification",
    title: "California DGS SB Certification Opportunity",
    content: "5 high-performing vendors in your network qualify for California DGS Small Business certification. This could unlock access to $18M+ in state contracts with 5% bid preference.",
    confidence: 0.94,
    action: "Guide vendors through DGS SB certification process",
    savings: 32000,
    category: "Certification Support"
  },
  {
    type: "discovery",
    title: "DVBE Vendor Gap Analysis",
    content: "Technology Services category shows only 37% DVBE participation vs 3% state goal. Found 3 qualified DVBE vendors in cybersecurity and cloud services with strong ratings.",
    confidence: 0.89,
    action: "Engage VetTech Solutions and 2 other DVBE vendors",
    savings: 145000,
    category: "Technology Services"
  },
  {
    type: "optimization",
    title: "DGS Contract Utilization Strategy",
    content: "Construction & Public Works has $15.2M spending but only 30% SMB participation. Golden State Construction's SB-PW certification could increase utilization to meet 25% goal.",
    confidence: 0.91,
    action: "Leverage DGS SB-PW certified contractors",
    savings: 285000,
    category: "Construction & Public Works"
  },
  {
    type: "compliance",
    title: "AB 2019 Economic Equity Action Plan",
    content: "Current spending aligns with AB 2019 requirements. Recommend developing 'Economic Equity First' action plans for underperforming categories to maintain compliance.",
    confidence: 0.87,
    action: "Implement Economic Equity First framework",
    savings: 75000,
    category: "Policy Compliance"
  },
  {
    type: "cost_savings",
    title: "Cal eProcure Integration Optimization",
    content: "Centralizing procurement through Cal eProcure system could reduce administrative costs by 15% while improving vendor diversity tracking and compliance reporting.",
    confidence: 0.82,
    action: "Enhance Cal eProcure utilization",
    savings: 128000,
    category: "Process Improvement"
  },
  {
    type: "discovery",
    title: "Statewide Contract Opportunities",
    content: "Multiple agencies show demand for Medical Supplies and Professional Services. Pacific Healthcare and Women-Owned Professional Services could serve broader state needs.",
    confidence: 0.88,
    action: "Pursue statewide contract opportunities",
    savings: 210000,
    category: "Multi-Agency Contracts"
  }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export default function CalPolyVendorPlatform() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'assistant',
      content: "Hi! I'm your California DGS procurement assistant. I can help you find SB and DVBE certified vendors, calculate costs for state contracts, and ensure AB 2019 compliance. I have access to real-time Cal eProcure data and can guide you through DGS certification processes. What would you like to explore?",
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAIThinking, setIsAIThinking] = useState(false);

  const totalSMBSpending = categoryData.reduce((sum, cat) => sum + cat.smbSpend, 0);
  const totalSpending = categoryData.reduce((sum, cat) => sum + cat.totalSpend, 0);
  const overallSMBPercentage = (totalSMBSpending / totalSpending) * 100;
  const totalVendors = categoryData.reduce((sum, cat) => sum + cat.vendorCount, 0);

  const filteredVendors = vendorDatabase.filter(vendor => 
    (selectedCategory === 'all' || vendor.category === selectedCategory) &&
    (searchQuery === '' || 
     vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     vendor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = {
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setIsAIThinking(true);
    setChatInput('');
    
    setTimeout(() => {
      let aiResponse = "";
      
      if (chatInput.toLowerCase().includes('find') || chatInput.toLowerCase().includes('search')) {
        aiResponse = "I found 8 small business vendors matching your criteria. Central Coast Office Solutions has the highest rating (4.7/5) and offers same-day delivery to campus. Would you like me to calculate costs for a sample order?";
      } else if (chatInput.toLowerCase().includes('cost') || chatInput.toLowerCase().includes('calculate')) {
        aiResponse = "Based on your requirements, splitting the order between 3 small vendors would cost $2,340 vs $2,680 with your current large supplier - saving $340 (12.7%) while supporting local businesses. Shall I show the breakdown?";
      } else if (chatInput.toLowerCase().includes('recommend') || chatInput.toLowerCase().includes('suggest')) {
        aiResponse = "I recommend diversifying your office supply spending across 5 vendors: Central Coast Office Solutions (40%), SLO Business Supplies (25%), Campus Copy Center (20%), and two others (15%). This improves vendor distribution while maintaining cost efficiency.";
      } else {
        aiResponse = "I can help you discover small business vendors, calculate multi-vendor costs, and optimize your procurement strategy. Try asking me to 'find food suppliers near campus' or 'calculate costs for office supplies'.";
      }
      
      const assistantMessage = {
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, assistantMessage]);
      setIsAIThinking(false);
    }, 2000);
  };

  const VendorCard = ({ vendor }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
          <p className="text-sm text-gray-600">{vendor.category}</p>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="text-yellow-400 fill-current" size={16} />
          <span className="text-sm font-medium">{vendor.rating}</span>
          <span className="text-xs text-gray-500">({vendor.reviewCount})</span>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={14} className="mr-2" />
          <span>{vendor.location} • {vendor.distance} miles</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users size={14} className="mr-2" />
          <span>{vendor.employeeCount} employees • ${(vendor.annualRevenue/1000000).toFixed(1)}M revenue</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Package size={14} className="mr-2" />
          <span>Min order: ${vendor.minimumOrder} • Avg: ${vendor.avgOrderValue}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {vendor.specialties.slice(0, 3).map((specialty, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {specialty}
          </span>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-500">On-time Rate:</span>
          <span className="ml-2 font-medium">{vendor.onTimeRate}%</span>
        </div>
        <div>
          <span className="text-gray-500">Quality Score:</span>
          <span className="ml-2 font-medium">{vendor.qualityScore}/5</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
          Get Quote
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
          View Details
        </button>
      </div>
    </div>
  );

  const CategoryMetricCard = ({ category }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-800">{category.name}</h3>
        <div className="flex flex-col items-end space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            category.smbPercentage >= 25 ? 'bg-green-100 text-green-800' :
            category.smbPercentage >= 20 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {category.smbPercentage.toFixed(1)}% SMB
          </span>
          {category.dgsContracts > 0 && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {category.dgsContracts} DGS Contracts
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">SMB Spending</span>
            <span className="font-medium">${(category.smbSpend/1000).toFixed(0)}K</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(category.smbPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
        
        {category.dvbeSpend > 0 && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">DVBE Spending</span>
              <span className="font-medium">${(category.dvbeSpend/1000).toFixed(0)}K</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-purple-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((category.dvbeSpend/category.totalSpend)*100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">SMB Vendors:</span>
            <span className="ml-2 font-medium">{category.vendorCount}</span>
          </div>
          <div>
            <span className="text-gray-500">Avg Order:</span>
            <span className="ml-2 font-medium">${category.avgOrder.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">California DGS Small Business Vendor Platform</h1>
              <p className="text-gray-600">AI-Powered Local Vendor Discovery & Cost Optimization • Integrated with Cal eProcure</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Data Active</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Zap size={16} />
                <span>AI Analysis</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'vendors', label: 'Vendor Discovery', icon: Search },
              { id: 'calculator', label: 'Cost Calculator', icon: Calculator },
              { id: 'analytics', label: 'Analytics', icon: BarChart },
              { id: 'chat', label: 'AI Assistant', icon: MessageCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total SMB Vendors</p>
                    <p className="text-3xl font-bold text-gray-900">{totalVendors}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+22% this quarter</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Users className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">SMB Spending</p>
                    <p className="text-3xl font-bold text-gray-900">${(totalSMBSpending/1000000).toFixed(1)}M</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+18% vs last year</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-green-100">
                    <DollarSign className="text-green-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">SMB Percentage</p>
                    <p className="text-3xl font-bold text-gray-900">{overallSMBPercentage.toFixed(1)}%</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Goal: 25% (AB 2019)</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-100">
                    <Building className="text-purple-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">DVBE Spending</p>
                    <p className="text-3xl font-bold text-gray-900">$1.9M</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Goal: 3% (AB 2019)</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-100">
                    <Star className="text-orange-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Monthly Savings</p>
                    <p className="text-3xl font-bold text-gray-900">$14.2K</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <span className="text-sm text-green-600">vs large vendors</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-100">
                    <TrendingUp className="text-orange-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">SMB Spending Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={spendingTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [
                        name === 'smbPercentage' ? `${value}%` : `$${(value/1000).toFixed(0)}K`,
                        name === 'smbPercentage' ? 'SMB %' : name === 'smbSpending' ? 'SMB Spending' : 'Total Spending'
                      ]} />
                      <Area type="monotone" dataKey="smbPercentage" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setActiveTab('vendors')}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Search size={16} />
                      <span>Discover New Vendors</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('calculator')}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Calculator size={16} />
                      <span>Calculate Costs</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('chat')}
                      className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                      <MessageCircle size={16} />
                      <span>Ask AI Assistant</span>
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="text-purple-600" size={16} />
                    <h4 className="font-semibold text-purple-800">AI Insight</h4>
                  </div>
                  <p className="text-purple-700 text-sm">
                    Your agency is meeting the 25% SB goal! Focus on increasing DVBE participation in Technology Services to reach the 3% target. Consider engaging VetTech Solutions for cybersecurity needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryData.map((category, index) => (
                <CategoryMetricCard key={category.name} category={category} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vendors' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search vendors by name, category, or specialty..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="Food Services">Food Services</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Facilities & Maintenance">Facilities & Maintenance</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Technology Services">Technology Services</option>
                    <option value="Cleaning Supplies">Cleaning Supplies</option>
                    <option value="Construction & Public Works">Construction & Public Works</option>
                    <option value="Medical Supplies">Medical Supplies</option>
                    <option value="Professional Services">Professional Services</option>
                  </select>
                  <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                    <Filter size={16} />
                    <span>Filters</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>

            {filteredVendors.length === 0 && (
              <div className="text-center py-12">
                <Search className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or browse all categories.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Multi-Vendor Cost Calculator</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Procurement Requirements</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option>Office Supplies</option>
                        <option>Food Services</option>
                        <option>Cleaning Supplies</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Copy paper, 500 sheets per ream"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input 
                          type="number" 
                          placeholder="100"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                        <input 
                          type="number" 
                          placeholder="5000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Calculator size={16} />
                      <span>Calculate Optimal Vendor Mix</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Cost Comparison Results</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium text-green-800">Recommended: 3-Vendor Split</h5>
                        <span className="text-green-600 font-bold">$2,340</span>
                      </div>
                      <div className="text-sm text-green-700 space-y-1">
                        <div>• Central Coast Office (60%): $1,404</div>
                        <div>• SLO Business Supplies (25%): $585</div>
                        <div>• Campus Copy Center (15%): $351</div>
                      </div>
                      <div className="mt-2 text-sm text-green-600">
                        💰 Saves $340 (12.7%) vs current vendor
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium text-gray-700">Current: Single Large Vendor</h5>
                        <span className="text-gray-600 font-bold">$2,680</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Single vendor concentration risk
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-medium text-blue-800 mb-2">Additional Benefits</h5>
                      <div className="text-sm text-blue-700 space-y-1">
                        <div>• Support 3 local businesses</div>
                        <div>• Reduced supply chain risk</div>
                        <div>• Enhanced vendor relationships</div>
                        <div>• Improved vendor distribution score</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Vendor Distribution Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Spending by Category</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="totalSpend"
                        nameKey="name"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${(value / 1000000).toFixed(1)}M`, 'Total Spend']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">SMB Percentage by Category</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'SMB Percentage']} />
                      <Bar dataKey="smbPercentage" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Vendor Performance vs Cost Analysis</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={vendorDatabase}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="avgOrderValue" 
                    name="Average Order Value"
                    domain={[0, 4000]}
                    tickFormatter={(value) => `${value}`}
                  />
                  <YAxis 
                    dataKey="qualityScore" 
                    name="Quality Score"
                    domain={[3.5, 5]}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ payload }) => {
                      if (payload && payload[0]) {
                        const vendor = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                            <p className="font-medium">{vendor.name}</p>
                            <p className="text-sm text-gray-600">{vendor.category}</p>
                            <p className="text-sm">Quality: {vendor.qualityScore}/5</p>
                            <p className="text-sm">Avg Order: ${vendor.avgOrderValue}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter dataKey="qualityScore" fill="#3B82F6" />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="mt-4 text-sm text-gray-600">
                <p>Analysis shows vendor quality vs order value relationship for optimization.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">AI-Generated Recommendations</h3>
              <div className="grid gap-4">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    rec.type === 'discovery' ? 'border-blue-500 bg-blue-50' :
                    rec.type === 'optimization' ? 'border-green-500 bg-green-50' :
                    'border-orange-500 bg-orange-50'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-600 font-medium">
                          ${rec.savings.toLocaleString()} savings
                        </span>
                        <span className="text-xs text-gray-500">
                          {(rec.confidence * 100).toFixed(0)}% confidence
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{rec.content}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{rec.category}</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        {rec.action} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-96 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <MessageCircle className="text-blue-600" size={20} />
                    <span>AI Procurement Assistant</span>
                  </h3>
                  <p className="text-sm text-gray-600">Ask me about vendors, costs, or procurement strategies</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isAIThinking && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                          <span className="text-sm text-gray-600">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                      placeholder="Ask about vendors, costs, or procurement strategy..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      onClick={handleChatSubmit}
                      disabled={isAIThinking}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h4 className="font-medium text-gray-800 mb-3">Suggested Questions</h4>
                <div className="space-y-2">
                  {[
                    "Find DGS certified SB vendors in Sacramento",
                    "Check DVBE certification status and opportunities",
                    "How to achieve AB 2019 25% SMB goal compliance?",
                    "Show construction contractors with SB-PW certification",
                    "Calculate Cal eProcure procurement savings"
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setChatInput(suggestion)}
                      className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h4 className="font-medium text-gray-800 mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Added 3 new food vendors</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Calculated costs for office supplies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Updated vendor performance scores</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="text-green-600" size={16} />
                  <h4 className="font-medium text-green-800">Platform Status</h4>
                </div>
                <div className="text-sm text-green-700 space-y-1">
                  <div>• Real-time data from Cal eProcure ✓</div>
                  <div>• CA DGS SB/DVBE certification sync ✓</div>
                  <div>• AB 2019 compliance monitoring active ✓</div>
                  <div>• 1,247 DGS certified vendors tracked ✓</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Live Data Sources:</span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <span>Cal eProcure ✓</span>
            <span>CA DGS SCPRS ✓</span>
            <span>SB/DVBE Registry ✓</span>
            <span>SAM.gov ✓</span>
            <span>CA SOS ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}