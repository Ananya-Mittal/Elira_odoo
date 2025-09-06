import "./SellerDashboard.css"


import React, { useState } from 'react';
import {
  ShoppingBag,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  BookOpen,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Calendar,
  Star,
  Award,
  Target,
  Menu,
  Bell,
  Filter
} from 'lucide-react';

import './SellerDashboard.css';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([
    { id: 1, name: 'Professional Blazer', price: 89.99, stock: 25, sold: 45, rating: 4.8, status: 'active' },
    { id: 2, name: 'Silk Blouse', price: 65.99, stock: 12, sold: 32, rating: 4.6, status: 'active' },
    { id: 3, name: 'Designer Dress', price: 120.99, stock: 8, sold: 28, rating: 4.9, status: 'active' },
    { id: 4, name: 'Evening Gown', price: 199.99, stock: 5, sold: 15, rating: 5.0, status: 'active' },
  ]);

  const [orders, setOrders] = useState([
    { id: '#ORD-001', customer: 'Sarah Johnson', product: 'Professional Blazer', amount: 89.99, status: 'delivered', date: '2025-08-20' },
    { id: '#ORD-002', customer: 'Emma Wilson', product: 'Silk Blouse', amount: 65.99, status: 'shipped', date: '2025-08-21' },
    { id: '#ORD-003', customer: 'Lisa Brown', product: 'Designer Dress', amount: 120.99, status: 'processing', date: '2025-08-22' },
    { id: '#ORD-004', customer: 'Anna Davis', product: 'Evening Gown', amount: 199.99, status: 'pending', date: '2025-08-23' },
  ]);

  const [courses, setCourses] = useState([
    { id: 1, title: 'Fashion Business Fundamentals', students: 156, rating: 4.7, revenue: 2340.00, status: 'published' },
    { id: 2, title: 'Digital Marketing for Fashion', students: 89, rating: 4.5, revenue: 1560.00, status: 'published' },
    { id: 3, title: 'Personal Styling Mastery', students: 234, rating: 4.9, revenue: 4680.00, status: 'published' },
  ]);

  const [analytics] = useState({
    totalRevenue: 15420.50,
    monthlyGrowth: 12.5,
    totalOrders: 168,
    totalProducts: 24,
    totalStudents: 479,
    avgRating: 4.7,
    conversionRate: 3.2
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'status-active',
      inactive: 'status-inactive',
      pending: 'status-pending',
      processing: 'status-processing',
      shipped: 'status-shipped',
      delivered: 'status-delivered',
      published: 'status-published',
      draft: 'status-draft',
    };
    return colors[status] || 'status-draft';
  };

  const StatCard = ({ title, value, change, icon: Icon, color = 'purple' }) => (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className={`stat-card-icon ${color}-bg`}>
          <Icon className={`${color}-text`} />
        </div>
        {change && (
          <div className={`stat-card-change ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  const Sidebar = ({ tabs, activeTab, setActiveTab }) => (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Elira Seller</h2>
      </div>
      <nav className="sidebar-nav">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  const Header = ({ tabs, activeTab }) => {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    return (
      <div className="header">
        <div className="header-left">
          <h1 className="header-title">{currentTab?.label}</h1>
          <p className="header-subtitle">Manage your {currentTab?.label.toLowerCase()}</p>
        </div>
        <div className="header-right">
          <button className="header-btn">
            <Bell className="w-5 h-5" />
          </button>
          <button className="header-btn">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  const OverviewTab = () => (
    <div className="tab-content">
      <div className="stats-grid">
        <StatCard
          title="Total Revenue"
          value={`$${analytics.totalRevenue.toLocaleString()}`}
          change={analytics.monthlyGrowth}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Total Orders"
          value={analytics.totalOrders}
          change={8.2}
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Total Products"
          value={analytics.totalProducts}
          icon={Package}
          color="purple"
        />
        <StatCard
          title="Total Students"
          value={analytics.totalStudents}
          change={15.3}
          icon={Users}
          color="orange"
        />
      </div>

      <div className="content-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Orders</h3>
            <button className="btn-primary">View All</button>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 3).map((order) => (
                  <tr key={order.id}>
                    <td className="font-medium">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>${order.amount}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Top Products</h3>
            <button className="btn-primary">View All</button>
          </div>
          <div className="products-list">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-info">
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-price">${product.price}</p>
                </div>
                <div className="product-stats">
                  <span className="product-stat">
                    <Star className="w-4 h-4" />
                    {product.rating}
                  </span>
                  <span className="product-stat">Sold: {product.sold}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProductsTab = () => (
    <div className="tab-content">
      <div className="content-header">
        <div className="search-bar">
          <Search className="search-icon" />
          <input type="text" placeholder="Search products..." className="search-input" />
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Sold</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="font-medium">{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.sold}</td>
                  <td>
                    <div className="rating">
                      <Star className="w-4 h-4" />
                      {product.rating}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="action-btn">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="action-btn">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="action-btn delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const OrdersTab = () => (
    <div className="tab-content">
      <div className="content-header">
        <div className="search-bar">
          <Search className="search-icon" />
          <input type="text" placeholder="Search orders..." className="search-input" />
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="btn-secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="font-medium">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>${order.amount}</td>
                  <td>{order.date}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="action-btn">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="action-btn">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const CoursesTab = () => (
    <div className="tab-content">
      <div className="content-header">
        <div className="search-bar">
          <Search className="search-icon" />
          <input type="text" placeholder="Search courses..." className="search-input" />
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Students</th>
                <th>Rating</th>
                <th>Revenue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="font-medium">{course.title}</td>
                  <td>{course.students}</td>
                  <td>
                    <div className="rating">
                      <Star className="w-4 h-4" />
                      {course.rating}
                    </div>
                  </td>
                  <td>${course.revenue.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="action-btn">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="action-btn">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="action-btn delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="tab-content">
      <div className="stats-grid">
        <StatCard
          title="Conversion Rate"
          value={`${analytics.conversionRate}%`}
          change={2.1}
          icon={Target}
          color="green"
        />
        <StatCard
          title="Avg Rating"
          value={analytics.avgRating}
          change={0.3}
          icon={Star}
          color="yellow"
        />
        <StatCard
          title="Total Revenue"
          value={`$${analytics.totalRevenue.toLocaleString()}`}
          change={analytics.monthlyGrowth}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Growth Rate"
          value={`+${analytics.monthlyGrowth}%`}
          change={analytics.monthlyGrowth}
          icon={TrendingUp}
          color="blue"
        />
      </div>

      <div className="analytics-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Revenue Analytics</h3>
          </div>
          <div className="chart-placeholder">
            <p>Revenue chart would go here</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Performance Metrics</h3>
          </div>
          <div className="metrics-list">
            <div className="metric-item">
              <span className="metric-label">Total Views</span>
              <span className="metric-value">12,543</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Click Rate</span>
              <span className="metric-value">3.2%</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Return Rate</span>
              <span className="metric-value">2.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="tab-content">
      <div className="settings-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Profile Settings</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label className="form-label">Store Name</label>
              <input type="text" className="form-input" defaultValue="Elira Fashion" />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Email</label>
              <input type="email" className="form-input" defaultValue="seller@elira.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Store Description</label>
              <textarea className="form-textarea" rows={4} defaultValue="Premium fashion for modern women" />
            </div>
            <button className="btn-primary">Save Changes</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Notification Preferences</h3>
          </div>
          <div className="settings-form">
            <div className="form-checkbox">
              <input type="checkbox" id="orderNotifs" defaultChecked />
              <label htmlFor="orderNotifs">Order notifications</label>
            </div>
            <div className="form-checkbox">
              <input type="checkbox" id="messageNotifs" defaultChecked />
              <label htmlFor="messageNotifs">Message notifications</label>
            </div>
            <div className="form-checkbox">
              <input type="checkbox" id="marketingNotifs" />
              <label htmlFor="marketingNotifs">Marketing updates</label>
            </div>
            <button className="btn-primary">Update Preferences</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'products': return <ProductsTab />;
      case 'orders': return <OrdersTab />;
      case 'courses': return <CoursesTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'settings': return <SettingsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="seller-dashboard">
      <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Header tabs={tabs} activeTab={activeTab} />
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SellerDashboard;