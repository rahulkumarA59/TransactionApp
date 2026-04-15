import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import TransactionList from './components/TransactionList.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import TransactionDetail from './components/TransactionDetail.jsx'
import axios from 'axios'

export const API_BASE = 'http://localhost:8085'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TransactionList />} />
            <Route path="/add" element={<TransactionForm />} />
            <Route path="/transaction/:id" element={<TransactionDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
