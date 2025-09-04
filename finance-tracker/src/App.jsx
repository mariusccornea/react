import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SidebarItem from './SidebarItem'

function App() {
  const [tab, setTab] = useState('dashboard')
  const [transactions, setTransactions] = useState([
    'new car',
    'new house',
    'new friends'
  ])
  const [newTransaction, setNewTransaction] = useState('')
  const listTransactions = transactions.map(transaction => <li>{transaction}</li>)
  return (
    <div className="layout">
      {/* Left sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="brand">Finance Tracker</span>
        </div>

        <nav className="nav">
          <SidebarItem
            label="Dashboard"
            active={tab === 'dashboard'}
            onClick={() => setTab('dashboard')}
          />
          <SidebarItem
            label="Transactions"
            active={tab === 'transactions'}
            onClick={() => setTab('transactions')}
          />
          <SidebarItem
            label="Categories"
            active={tab === 'categories'}
            onClick={() => setTab('categories')}
          />
        </nav>

        <div className="sidebar-footer">
          <small>v0.1 • Demo</small>
        </div>
      </aside>

      {/* Right content */}
      <main className="main">
        <header className="main-header">
          <h1 className="page-title">
            {tab === 'dashboard' && 'Dashboard'}
            {tab === 'transactions' && 'Transactions'}
            {tab === 'categories' && 'Categories'}
          </h1>
        </header>

        <section className="content-card">
          {tab === 'dashboard' && (
            <div>
              <h2>Dashboard</h2>
              <p>
                Overview area. General stuff and first glance incoming
              </p>
            </div>
          )}

          {tab === 'transactions' && (
            <div>
              <h2>Transactions</h2>
              {/* <p>
                A table will live here (date, category, amount, note). We’ll start simple.
              </p> */}
              <input id="transactionInput" value={newTransaction} onChange={(e) => setNewTransaction(e.target.value)} ></input>
              <button onClick={() => { setTransactions([...transactions, newTransaction]); setNewTransaction('') }} id="addTransactionButton">Add Transaction</button>
              <ul>{listTransactions}</ul>
            </div>
          )}

          {tab === 'categories' && (
            <div>
              <h2>Categories</h2>
              <p>
                Add/edit categories (income/expense). Keeps the app tidy.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
