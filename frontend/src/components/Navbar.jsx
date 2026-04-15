import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Home,
  PlusCircle,
  BarChart3,
  Settings,
  Menu,
  X,
  Wallet,
  Sun,
  Moon,
  Bell,
  User
} from 'lucide-react'

function Navbar() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  return (
      <>
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled
                ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl'
                : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
        } border-b border-gray-200/50 dark:border-gray-700/50`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">

              {/* Logo Section */}
              <Link
                  to="/"
                  className="group flex items-center gap-3 transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  FinanceFlow
                </span>
                  <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  Track Your Wealth
                </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const active = isActive(link.path)
                  return (
                      <Link
                          key={link.path}
                          to={link.path}
                          className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 group ${
                              active
                                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                                  : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                          }`}
                      >
                        <Icon className={`w-4 h-4 transition-transform duration-300 ${
                            active ? 'scale-110' : 'group-hover:scale-110'
                        }`} />
                        <span>{link.label}</span>
                        {active && (
                            <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                        )}
                      </Link>
                  )
                })}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
                    aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                      <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                  ) : (
                      <Moon className="w-5 h-5 group-hover:-rotate-90 transition-transform duration-500" />
                  )}
                </button>

                {/* Notifications */}
                <button className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group">
                  <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                {/* User Profile */}
                <button className="hidden sm:flex items-center gap-2 ml-2 p-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 pr-2">John Doe</span>
                </button>

                {/* Add Transaction Button */}
                <Link
                    to="/add"
                    className="ml-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                >
                  <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="hidden sm:inline">Add</span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
              <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 animate-slide-down">
                <div className="px-4 py-4 space-y-2">
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    const active = isActive(link.path)
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                active
                                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{link.label}</span>
                          {active && (
                              <div className="ml-auto w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                          )}
                        </Link>
                    )
                  })}

                  <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">John Doe</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </nav>

        {/* Spacer to prevent content from hiding under fixed navbar */}
        <div className="h-16 sm:h-20"></div>

        <style>{`
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
      </>
  )
}

export default Navbar