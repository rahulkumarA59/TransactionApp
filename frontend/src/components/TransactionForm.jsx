import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE } from '../App.jsx'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Tag,
  X,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react'

function TransactionForm() {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'credit',
    date: new Date().toISOString().split('T')[0],
    category: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      await axios.post(`${API_BASE}/transactions`, formData)
      setMessage({ type: 'success', text: 'Transaction added successfully!' })
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to add transaction. Please check your connection.' })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { value: 'salary', label: 'Salary', icon: '💰', color: 'emerald' },
    { value: 'food', label: 'Food & Dining', icon: '🍔', color: 'orange' },
    { value: 'transport', label: 'Transport', icon: '🚗', color: 'blue' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️', color: 'purple' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎬', color: 'pink' },
    { value: 'bills', label: 'Bills & Utilities', icon: '📄', color: 'red' },
    { value: 'other', label: 'Other', icon: '📌', color: 'gray' }
  ]

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <button
              onClick={() => navigate('/')}
              className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Dashboard</span>
          </button>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl shadow-xl mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <DollarSign className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              New Transaction
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Record your income or expense
            </p>
          </div>

          {/* Message Alert */}
          {message.text && (
              <div className={`mb-8 p-4 rounded-2xl flex items-start gap-3 animate-slide-down ${
                  message.type === 'success'
                      ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
              }`}>
                {message.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                )}
                <p className={`flex-1 font-medium ${
                    message.type === 'success'
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                }`}>
                  {message.text}
                </p>
                <button
                    onClick={() => setMessage({ type: '', text: '' })}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 space-y-8">
              {/* Amount Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <DollarSign className="w-4 h-4" />
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-gray-400 dark:text-gray-500">$</span>
                  <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="w-full px-6 py-5 pl-12 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-3xl font-bold text-right"
                      placeholder="0.00"
                  />
                </div>
              </div>

              {/* Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'credit'})}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center gap-3 ${
                        formData.type === 'credit'
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 shadow-lg scale-105'
                            : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    }`}
                >
                  <TrendingUp className={`w-6 h-6 ${
                      formData.type === 'credit' ? 'text-emerald-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-semibold ${
                      formData.type === 'credit' ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-600 dark:text-gray-400'
                  }`}>Income</span>
                </button>
                <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'debit'})}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center gap-3 ${
                        formData.type === 'debit'
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/30 shadow-lg scale-105'
                            : 'border-gray-200 dark:border-gray-700 hover:border-red-300'
                    }`}
                >
                  <TrendingDown className={`w-6 h-6 ${
                      formData.type === 'debit' ? 'text-red-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-semibold ${
                      formData.type === 'debit' ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'
                  }`}>Expense</span>
                </button>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  Date
                </label>
                <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300"
                />
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Tag className="w-4 h-4" />
                  Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map((category) => (
                      <button
                          key={category.value}
                          type="button"
                          onClick={() => setFormData({...formData, category: category.value})}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-2 ${
                              formData.category === category.value
                                  ? `border-${category.color}-500 bg-${category.color}-50 dark:bg-${category.color}-900/30 shadow-md`
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span className={`text-sm font-medium ${
                            formData.category === category.value
                                ? `text-${category.color}-700 dark:text-${category.color}-300`
                                : 'text-gray-600 dark:text-gray-400'
                        }`}>
                      {category.label}
                    </span>
                      </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:transform-none transform transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                  ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Add Transaction
                      </>
                  )}
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="px-8 py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </div>
          </form>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            All transactions are securely stored and can be exported anytime
          </p>
        </div>

        <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
      </div>
  )
}

export default TransactionForm