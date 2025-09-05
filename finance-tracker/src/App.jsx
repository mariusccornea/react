import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SidebarItem from "./SidebarItem";

function App() {
  const [tab, setTab] = useState("dashboard");
  const [transactions, setTransactions] = useState([
    {
      amount: 60,
      description: "stuff",
      date: "14 may 2023",
    },
  ]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const listTransactions = transactions.map((transaction) => (
    <li>
      {transaction.amount} {transaction.description} {transaction.date}
    </li>
  ));
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
            active={tab === "dashboard"}
            onClick={() => setTab("dashboard")}
          />
          <SidebarItem
            label="Transactions"
            active={tab === "transactions"}
            onClick={() => setTab("transactions")}
          />
          <SidebarItem
            label="Categories"
            active={tab === "categories"}
            onClick={() => setTab("categories")}
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
            {tab === "dashboard" && "Dashboard"}
            {tab === "transactions" && "Transactions"}
            {tab === "categories" && "Categories"}
          </h1>
        </header>

        <section className="content-card">
          {tab === "dashboard" && (
            <div>
              <h2>Dashboard</h2>
              <p>Overview area. General stuff and first glance incoming</p>
            </div>
          )}

          {tab === "transactions" && (
            <>
              <form
                className="tx-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!amount || !date || !description) return;
                  const newTransaction = {
                    amount: Number(amount),
                    description,
                    date,
                  };
                  setTransactions([...transactions, newTransaction]);
                  setAmount("");
                  setDate("");
                  setDescription("");
                }}
              >
                <div className="form-row">
                  <label htmlFor="amount">Amount</label>
                  <input
                    id="amount"
                    className="transactionInput"
                    type="number"
                    placeholder="e.g. 59.99"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="description">Description</label>
                  <input
                    id="description"
                    className="transactionInput"
                    type="text"
                    placeholder="e.g. Groceries"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    className="transactionInput"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="addBtn">
                  Add Transaction
                </button>
              </form>

              {/* Simple list/table view */}
              <div className="tx-list">
                {transactions.length === 0 ? (
                  <p className="muted">No transactions yet.</p>
                ) : (
                  <table className="tx-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th style={{ textAlign: "right" }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((t, i) => (
                        <tr key={i}>
                          <td>
                            {new Date(t.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </td>
                          <td>{t.description}</td>
                          <td style={{ textAlign: "right" }}>
                            {Number(t.amount).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {tab === "categories" && (
            <div>
              <h2>Categories</h2>
              <p>Add/edit categories (income/expense). Keeps the app tidy.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
