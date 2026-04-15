import { useState, useEffect } from 'react'
import { Search, X, Filter, ChevronDown, Calendar, Tag, TrendingUp, TrendingDown } from 'lucide-react'

function SearchBar({ onFilterChange, initialFilters = {} }) {
    const [type, setType] = useState(initialFilters.type || '')
    const [category, setCategory] = useState(initialFilters.category || '')
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [dateRange, setDateRange] = useState({ start: '', end: '' })
    const [minAmount, setMinAmount] = useState('')
    const [maxAmount, setMaxAmount] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)

    const categories = [
        { value: 'salary', label: 'Salary', icon: '💰' },
        { value: 'food', label: 'Food', icon: '🍔' },
        { value: 'transport', label: 'Transport', icon: '🚗' },
        { value: 'shopping', label: 'Shopping', icon: '🛍️' },
        { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
        { value: 'bills', label: 'Bills', icon: '📄' },
        { value: 'other', label: 'Other', icon: '📌' }
    ]

    const handleSearch = () => {
        const filters = { type, category }
        if (dateRange.start) filters.startDate = dateRange.start
        if (dateRange.end) filters.endDate = dateRange.end
        if (minAmount) filters.minAmount = minAmount
        if (maxAmount) filters.maxAmount = maxAmount
        onFilterChange(filters)
    }

    const handleClear = () => {
        setType('')
        setCategory('')
        setDateRange({ start: '', end: '' })
        setMinAmount('')
        setMaxAmount('')
        onFilterChange({ type: '', category: '' })
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const hasActiveFilters = type || category || dateRange.start || dateRange.end || minAmount || maxAmount

    return (
        <div className="w-full">
            {/* Main Search Bar */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-5">
                    {/* Search Input Row */}
                    <div className="flex flex-col lg:flex-row gap-3">
                        {/* Type Selector */}
                        <div className="flex-1 relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <Filter className="w-5 h-5 text-gray-400" />
                            </div>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 appearance-none cursor-pointer"
                            >
                                <option value="">All Types</option>
                                <option value="credit">💰 Income</option>
                                <option value="debit">💸 Expense</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Category Selector */}
                        <div className="flex-1 relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <Tag className="w-5 h-5 text-gray-400" />
                            </div>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 appearance-none cursor-pointer"
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.icon} {cat.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={handleSearch}
                                className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                            >
                                <Search className="w-5 h-5" />
                                <span className="hidden sm:inline">Search</span>
                            </button>

                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className={`px-4 py-3.5 border-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                                    isExpanded || hasActiveFilters
                                        ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                                        : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300'
                                }`}
                            >
                                <Filter className="w-5 h-5" />
                                <span className="hidden sm:inline">Filters</span>
                                {hasActiveFilters && (
                                    <span className="ml-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                                )}
                            </button>

                            {(type || category || dateRange.start || dateRange.end || minAmount || maxAmount) && (
                                <button
                                    onClick={handleClear}
                                    className="px-4 py-3.5 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-xl transition-all duration-300 flex items-center gap-2"
                                >
                                    <X className="w-5 h-5" />
                                    <span className="hidden sm:inline">Clear</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Advanced Filters - Expandable */}
                    {(isExpanded || hasActiveFilters) && (
                        <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700 animate-slide-down">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Date Range - Start */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        From Date
                                    </label>
                                    <input
                                        type="date"
                                        value={dateRange.start}
                                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300"
                                    />
                                </div>

                                {/* Date Range - End */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        To Date
                                    </label>
                                    <input
                                        type="date"
                                        value={dateRange.end}
                                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300"
                                    />
                                </div>

                                {/* Min Amount */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                        Min Amount
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            value={minAmount}
                                            onChange={(e) => setMinAmount(e.target.value)}
                                            className="w-full pl-8 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Max Amount */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1">
                                        <TrendingDown className="w-3.5 h-3.5" />
                                        Max Amount
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            value={maxAmount}
                                            onChange={(e) => setMaxAmount(e.target.value)}
                                            className="w-full pl-8 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Quick Filter Chips */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Quick filters:</span>
                                <button
                                    onClick={() => {
                                        setType('credit')
                                        setCategory('')
                                    }}
                                    className="px-3 py-1.5 text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
                                >
                                    💰 Income Only
                                </button>
                                <button
                                    onClick={() => {
                                        setType('debit')
                                        setCategory('')
                                    }}
                                    className="px-3 py-1.5 text-xs bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    💸 Expenses Only
                                </button>
                                <button
                                    onClick={() => {
                                        const today = new Date().toISOString().split('T')[0]
                                        const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                                        setDateRange({ start: lastMonth, end: today })
                                    }}
                                    className="px-3 py-1.5 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    📅 Last 30 Days
                                </button>
                                <button
                                    onClick={() => {
                                        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
                                        const today = new Date().toISOString().split('T')[0]
                                        setDateRange({ start: startOfMonth, end: today })
                                    }}
                                    className="px-3 py-1.5 text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 transition-colors"
                                >
                                    📆 This Month
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="mt-3 flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Active filters:</span>
                    {type && (
                        <span className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg flex items-center gap-1">
              {type === 'credit' ? '💰 Income' : '💸 Expense'}
                            <button onClick={() => setType('')} className="hover:text-red-500 ml-1">×</button>
            </span>
                    )}
                    {category && (
                        <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg flex items-center gap-1">
              📁 {category}
                            <button onClick={() => setCategory('')} className="hover:text-red-500 ml-1">×</button>
            </span>
                    )}
                    {(dateRange.start || dateRange.end) && (
                        <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg flex items-center gap-1">
              📅 {dateRange.start || 'any'} → {dateRange.end || 'any'}
                            <button onClick={() => setDateRange({ start: '', end: '' })} className="hover:text-red-500 ml-1">×</button>
            </span>
                    )}
                    {(minAmount || maxAmount) && (
                        <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-1">
              💰 ${minAmount || '0'} - ${maxAmount || '∞'}
                            <button onClick={() => { setMinAmount(''); setMaxAmount(''); }} className="hover:text-red-500 ml-1">×</button>
            </span>
                    )}
                    <button
                        onClick={handleClear}
                        className="px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                        Clear all
                    </button>
                </div>
            )}

            <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
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

export default SearchBar