import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE } from '../App.jsx'
import SearchBar from './SearchBar.jsx'
import TransactionCard from './TransactionCard.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  RefreshCw,
  Filter,
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
  AlertCircle,
  ChevronRight
} from 'lucide-react'

function TransactionList() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({ type: '', category: '' })
  const [stats, setStats] = useState({ total: 0, income: 0, expense: 0 })
  const [showStats, setShowStats] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [filters])

  useEffect(() => {
    calculateStats()
  }, [transactions])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      let url = `${API_BASE}/transactions`
      const params = new URLSearchParams()
      if (filters.type) params.append('type', filters.type)
      if (filters.category) url = `${API_BASE}/transactions/category/${filters.category}`
      else if (params.toString()) url = `${API_BASE}/transactions/search?${params.toString()}`

      const { data } = await axios.get(url)
      setTransactions(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError('Failed to fetch transactions. Please ensure backend is running on port 8085.')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = () => {
    const total = transactions.length
    const income = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + (t.amount || 0), 0)
    const expense = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + (t.amount || 0), 0)
    setStats({ total, income, expense })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background Pattern - Fixed version */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Section */}
          <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Finance Tracker
                  </h1>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                  Monitor your financial journey with real-time insights and intelligent transaction management
                </p>
              </div>

              <Link to="/new">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center gap-2 text-white font-bold">
                    <Plus className="w-5 h-5" />
                    <span>New Transaction</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Cards */}
          {showStats && transactions.length > 0 && !loading && (
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-indigo-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                      <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.total}</span>
                  </div>
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Total Transactions</h3>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">${stats.income.toFixed(2)}</span>
                  </div>
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Total Income</h3>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-rose-100 dark:bg-rose-900/50 rounded-xl">
                      <TrendingDown className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                    </div>
                    <span className="text-3xl font-bold text-rose-600 dark:text-rose-400">${stats.expense.toFixed(2)}</span>
                  </div>
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Total Expenses</h3>
                </div>
              </motion.div>
          )}

          {/* Search and Filter Section */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-10"
          >
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Filter Transactions</h3>
                </div>
                <button
                    onClick={() => setFilters({ type: '', category: '' })}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium"
                >
                  Clear All
                </button>
              </div>
              <SearchBar onFilterChange={setFilters} />
            </div>
          </motion.div>

          {/* Loading State */}
          <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-center items-center py-32"
                >
                  <div className="relative">
                    <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw className="w-8 h-8 text-indigo-600 animate-pulse" />
                    </div>
                  </div>
                  <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium">Loading transactions...</p>
                </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {error && !loading && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8 text-center shadow-xl mb-8"
                >
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">Connection Error</h3>
                  <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                  <button
                      onClick={fetchTransactions}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
            )}
          </AnimatePresence>

          {/* Transaction Cards Grid */}
          {!loading && transactions.length > 0 && (
              <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {transactions.map((transaction) => (
                    <motion.div
                        key={transaction.id}
                        variants={itemVariants}
                        whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        className="cursor-pointer"
                    >
                      <Link to={`/transaction/${transaction.id}`}>
                        <TransactionCard transaction={transaction} />
                      </Link>
                    </motion.div>
                ))}
              </motion.div>
          )}

          {/* Empty State */}
          {!loading && transactions.length === 0 && !error && (
              <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-32"
              >
                <div className="relative inline-block">
                  <div className="text-9xl mb-6 animate-bounce">📭</div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full animate-ping"></div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                  No Transactions Found
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  {filters.type || filters.category
                      ? "Try adjusting your filters to see more results"
                      : "Get started by creating your first transaction"}
                </p>
                <Link to="/new">
                  <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    + Create Your First Transaction
                  </motion.button>
                </Link>
              </motion.div>
          )}

          {/* Footer Stats */}
          {!loading && transactions.length > 0 && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                  {filters.type && ` • Type: ${filters.type}`}
                  {filters.category && ` • Category: ${filters.category}`}
                </p>
              </motion.div>
          )}
        </div>
      </div>
  )
}

export default TransactionList