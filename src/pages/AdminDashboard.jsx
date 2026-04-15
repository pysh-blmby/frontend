import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../sections/Navbar'
import Footer from '../sections/Footer'
import AdminSideSection from '../sections/AdminSideSection'

// Loader component for showing a loading spinner
const Loader = () => (
  <div className="flex items-center justify-center min-h-75">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
  </div>
)

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3500'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const [statsRes, ordersRes] = await Promise.all([
          fetch(`${API_BASE}/orders/admin/stats`),
          fetch(`${API_BASE}/orders/admin/all?limit=5`)
        ])

        if (!statsRes.ok) throw new Error('Failed to fetch stats')
        if (!ordersRes.ok) throw new Error('Failed to fetch orders')

        const statsData = await statsRes.json()
        const ordersData = await ordersRes.json()

        setStats(statsData.stats || {})
        setRecentOrders(ordersData.orders || [])
        setError('')
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const StatCard = ({ title, value, subtitle, icon, color = 'blue', trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-900 border border-white/10 rounded-xl p-6 hover:border-purple-500/40 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white mb-1">{value}</p>
          {subtitle && <p className="text-white/50 text-sm">{subtitle}</p>}
          {trend && (
            <p className={`text-sm font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`text-4xl text-${color}-600`}>{icon}</div>
      </div>
    </motion.div>
  )

  const QuickActionCard = ({ title, description, icon, link, color = 'blue' }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="bg-neutral-900 border border-white/10 rounded-xl p-6 hover:border-purple-500/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <Link to={link} className="block">
        <div className="flex items-center gap-4">
          <div className={`text-3xl text-${color}-600`}>{icon}</div>
          <div>
            <h3 className="font-semibold text-white mb-1">{title}</h3>
            <p className="text-white/60 text-sm">{description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <Loader />
    </div>
  )

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load dashboard</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white">


      <div className="flex gap-6 max-w-7xl mx-auto">

        <div className="flex-1">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
            <p className="text-white/60">Welcome back! Here's what's happening with your store today.</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <StatCard
              title="Total Revenue"
              value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
              subtitle="All time earnings"
              icon="💰"
              color="green"
              trend={12.5}
            />
            <StatCard
              title="Total Orders"
              value={stats?.totalOrders || 0}
              subtitle="All time orders"
              icon="📦"
              color="blue"
              trend={8.2}
            />
            <StatCard
              title="Pending Orders"
              value={stats?.pendingOrders || 0}
              subtitle="Awaiting processing"
              icon="⏳"
              color="yellow"
            />
            <StatCard
              title="Delivered Orders"
              value={stats?.deliveredOrders || 0}
              subtitle="Successfully completed"
              icon="✅"
              color="green"
              trend={15.3}
            />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionCard
                title="Add Product"
                description="Create new product listing"
                icon="➕"
                link="/admin/product"
                color="blue"
              />
              <QuickActionCard
                title="View Orders"
                description="Manage customer orders"
                icon="📦"
                link="/admin/orders"
                color="purple"
              />
              <QuickActionCard
                title="Add Category"
                description="Create product categories"
                icon="📂"
                link="/admin/categories"
                color="green"
              />
              <QuickActionCard
                title="Store Settings"
                description="Configure your store"
                icon="⚙️"
                link="/admin/settings"
                color="gray"
              />
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-neutral-900 rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
                <Link
                  to="/admin/orders"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  View All →
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">📦</div>
                  <p className="text-white/50 text-sm">No orders yet</p>
                  <p className="text-white/30 text-xs mt-1">Orders will appear here once customers start shopping</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.slice(0, 5).map((order, index) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-neutral-800/60 rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-950 rounded-full flex items-center justify-center">
                          <span className="text-blue-400 font-semibold text-sm">
                            {order.customer?.firstName?.[0]}{order.customer?.lastName?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">
                            {order.customer?.firstName} {order.customer?.lastName}
                          </p>
                          <p className="text-white/50 text-xs">{order.orderNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white text-sm">${order.totalPrice?.toFixed(2)}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Order Status Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-neutral-900 rounded-xl border border-white/10 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-6">Order Status Overview</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <span className="text-white/70">Pending</span>
                  </div>
                  <span className="font-semibold text-white">{stats?.pendingOrders || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                    <span className="text-white/70">Processing</span>
                  </div>
                  <span className="font-semibold text-white">{stats?.processingOrders || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                    <span className="text-white/70">Shipped</span>
                  </div>
                  <span className="font-semibold text-white">{stats?.shippedOrders || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    <span className="text-white/70">Delivered</span>
                  </div>
                  <span className="font-semibold text-white">{stats?.deliveredOrders || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                    <span className="text-white/70">Cancelled</span>
                  </div>
                  <span className="font-semibold text-white">{stats?.cancelledOrders || 0}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Success Rate</span>
                  <span className="font-semibold text-green-400">
                    {stats?.totalOrders > 0
                      ? Math.round(((stats.deliveredOrders || 0) / stats.totalOrders) * 100)
                      : 0
                    }%
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 bg-neutral-900 rounded-xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white/60">Dashboard loaded successfully</span>
                <span className="text-white/30 ml-auto">Just now</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white/60">Order statistics updated</span>
                <span className="text-white/30 ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-white/60">System health check passed</span>
                <span className="text-white/30 ml-auto">5 min ago</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
