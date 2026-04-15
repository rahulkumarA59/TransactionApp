import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE } from '../App.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  Calendar,
  Tag,
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
  Share2,
  Printer
} from 'lucide-react'

function TransactionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchTransaction()
  }, [id])

  const fetchTransaction = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${API_BASE}/transactions/${id}`)
      setTransaction(data)
      setError(null)
    } catch (err) {
      setError('Transaction not found or backend error.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setDeleting(true)
      await axios.delete(`${API_BASE}/transactions/${id}`)
      navigate('/', { state: { message: 'Transaction deleted successfully!' } })
    } catch (err) {
      setError('Failed to delete transaction. Please try again.')
      setShowDeleteConfirm(false)
    } finally {
      setDeleting(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getCategoryIcon = (category) => {
    const icons = {
      salary: '💰',
      food: '🍔',
      transport: '🚗',
      shopping: '🛍️',
      entertainment: '🎬',
      bills: '📄',
      other: '📌'
    }
    return icons[category] || '💳'
  }

  const getCategoryColor = (category) => {
    const colors = {
      salary: 'emerald',
      food: 'orange',
      transport: 'blue',
      shopping: 'purple',
      entertainment: 'pink',
      bills: 'red',
      other: 'gray'
    }
    return colors[category] || 'indigo'
  }

  if (loading) return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
        >
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-indigo-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium">Loading transaction details...</p>
        </motion.div>
      </div>
  )

  if (error || !transaction) return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6"
      >
        <div className="text-center max-w-md">
          <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative inline-block mb-6"
          >
            <div className="text-8xl mb-4">❌</div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'Transaction Not Found'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The transaction you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
  )

  const normalizedType = transaction.type?.toLowerCase() || ''
  const isCredit = normalizedType === 'credit' || normalizedType === 'income'
  const categoryColor = getCategoryColor(transaction.category)
  const categoryIcon = getCategoryIcon(transaction.category)

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Print Styles */}
        <style>{`
        @media print {
          .no-print {
            display: none;
          }
          .print-only {
            display: block;
          }
          body {
            background: white;
            padding: 20px;
          }
        }
        .print-only {
          display: none;
        }
      `}</style>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Actions - No Print */}
          <div className="no-print mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Link to="/">
                <motion.button
                    whileHover={{ x: -5 }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Back to Dashboard</span>
                </motion.button>
              </Link>

              <div className="flex gap-3">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold rounded-xl hover:bg-blue-200 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </motion.button>
                <Link to={`/edit/${transaction.id}`}>
                  <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold rounded-xl hover:bg-emerald-200 transition-all"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </motion.button>
                </Link>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-semibold rounded-xl hover:bg-red-200 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </motion.button>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header Banner */}
            <div className={`bg-gradient-to-r from-${categoryColor}-500 to-${categoryColor}-600 p-8 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium opacity-90 mb-2">Transaction Details</div>
                  <h1 className="text-3xl sm:text-4xl font-bold">Transaction #{transaction.id}</h1>
                </div>
                <div className="text-6xl opacity-80">{categoryIcon}</div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 sm:p-10">
              {/* Amount Section */}
              <div className="text-center mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {isCredit ? (
                      <TrendingUp className="w-8 h-8 text-emerald-500" />
                  ) : (
                      <TrendingDown className="w-8 h-8 text-red-500" />
                  )}
                  <span className={`text-sm font-semibold px-4 py-1 rounded-full ${
                      isCredit
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                          : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                  }`}>
                  {transaction.type.toUpperCase()}
                </span>
                </div>
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                >
                  <h2 className="text-6xl sm:text-7xl font-black text-gray-900 dark:text-white mb-2">
                    ${transaction.amount.toFixed(2)}
                  </h2>
                </motion.div>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Amount</p>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                      <Tag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Category</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                        {transaction.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                      <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                      <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Transaction ID</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                        #{transaction.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                      <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {isCredit ? 'Income' : 'Expense'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700/30 dark:to-gray-700/30 rounded-2xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📝 Notes</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {transaction.notes || "No additional notes provided for this transaction."}
                </p>
              </div>

              {/* Action Buttons - Mobile */}
              <div className="no-print flex flex-col sm:hidden gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Link to={`/edit/${transaction.id}`} className="w-full">
                  <button className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors">
                    Edit Transaction
                  </button>
                </Link>
                <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Delete Transaction
                </button>
              </div>
            </div>
          </motion.div>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {showDeleteConfirm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 no-print"
                    onClick={() => setShowDeleteConfirm(false)}
                >
                  <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Delete Transaction
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Are you sure you want to delete this transaction? This action cannot be undone.
                      </p>
                      <div className="flex gap-3">
                        <button
                            onClick={() => setShowDeleteConfirm(false)}
                            className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                        >
                          {deleting ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
  )
}

export default TransactionDetail