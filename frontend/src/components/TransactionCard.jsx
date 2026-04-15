import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react'

function TransactionCard({ transaction, onClick }) {
  const getTypeColor = (type) => {
    const colors = {
      credit: 'from-emerald-500 to-green-600',
      debit: 'from-red-500 to-rose-600',
      income: 'from-emerald-500 to-teal-600',
      expense: 'from-red-500 to-orange-600'
    }
    return colors[type?.toLowerCase()] || 'from-gray-500 to-gray-600'
  }

  const getTypeBadgeStyle = (type) => {
    const styles = {
      credit: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      debit: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
      income: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
      expense: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800'
    }
    return styles[type?.toLowerCase()] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
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
    return icons[category?.toLowerCase()] || '💳'
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
    return colors[category?.toLowerCase()] || 'indigo'
  }

  const normalizedType = transaction.type?.toLowerCase() || ''
  const isCredit = normalizedType === 'credit' || normalizedType === 'income'
  const categoryColor = getCategoryColor(transaction.category)
  const categoryIcon = getCategoryIcon(transaction.category)
  const amount = Math.abs(transaction.amount || 0).toFixed(2)
  const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
      <motion.div
          whileHover={{
            y: -8,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className="group relative cursor-pointer"
      >
        {/* Animated Gradient Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur group-hover:blur-md"></div>

        {/* Card Content */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
          {/* Colorful Top Accent Bar */}
          <div className={`h-1.5 bg-gradient-to-r ${getTypeColor(transaction.type)}`}></div>

          <div className="p-6">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Category Icon Circle */}
                <div className={`relative w-12 h-12 bg-gradient-to-br from-${categoryColor}-100 to-${categoryColor}-200 dark:from-${categoryColor}-900/30 dark:to-${categoryColor}-800/30 rounded-2xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {categoryIcon}
                  {/* Status Indicator */}
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${isCredit ? 'bg-green-500' : 'bg-red-500'} ring-2 ring-white dark:ring-gray-800`}></div>
                </div>

                {/* Category Name */}
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </p>
                  <p className="text-base font-bold text-gray-800 dark:text-gray-200 capitalize">
                    {transaction.category || 'Uncategorized'}
                  </p>
                </div>
              </div>

              {/* Type Badge */}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border ${getTypeBadgeStyle(transaction.type)}`}>
                {isCredit ? (
                    <TrendingUp className="w-3 h-3" />
                ) : (
                    <TrendingDown className="w-3 h-3" />
                )}
                <span>{transaction.type}</span>
              </div>
            </div>

            {/* Amount Section */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Amount
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">$</span>
                <motion.span
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className={`text-4xl font-black ${isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}
                >
                  {amount}
                </motion.span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

            {/* Footer Section */}
            <div className="flex items-center justify-between">
              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>

              {/* Action Icon */}
              <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-medium">Details</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* Hover Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none rounded-2xl"></div>
          </div>

          {/* Decorative Pattern */}
          <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
            <div className="text-8xl transform translate-x-4 translate-y-4">
              {isCredit ? '↑' : '↓'}
            </div>
          </div>
        </div>
      </motion.div>
  )
}

export default TransactionCard