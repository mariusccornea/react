import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SidebarItem from "./SidebarItem";
import { useEffect } from "react";
import { useRef } from "react";
import Transactions from "./Transactions";
import Categories from "./Categories";

function App() {
  const [tab, setTab] = useState("dashboard");

 
  //local storage stuff
  const STORAGE_KEY = "finance_tx_v1";

  const [transactions, setTransactions] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return [
      {
        amount: 60,
        description: "stuff",
        date: "2023-05-14",
        category: "Additional Expenses",
      },
    ];
  });

  useEffect(() => {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const total = transactions.reduce((sum, t) => {
    return sum + Number(t.amount);
  }, 0);
  const numberOfTransactions = transactions.length;

  const totalRent = transactions
  .filter((t) => t.category === "Rent")
  .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalAdditional = transactions
  .filter((t) => t.category === "Additional Expenses")
  .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalFood = transactions
  .filter((t) => t.category === "Food")
  .reduce((sum, t) => sum + Number(t.amount), 0);

  // constal [totalAdditional, setTotalAdditional]=

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
            <Transactions
              transactions={transactions} 
              setTransactions={setTransactions}
            />
          )}

          {tab === "categories" && (
            // <div>
            //   <h2>Categories</h2>
            //   <p>Add/edit categories (income/expense). Keeps the app tidy.</p>
            // </div> 
            <Categories totalRent={totalRent} totalAdditional={totalAdditional} totalFood={totalFood} />
          )}
        </section>
      </main>
    </div>
  );
}

//save in local storage
//componente
//testE? CE PLM (tbd)

//add tailwind ( pe sapt cealalta)

//first draft of db (tbs)

// (pt viitor)
//pt Dashboard : breakdwodn pe chart pe timeline (D, m, y, whatever)
//butoane de plictisiti (pie charts)
//React-Icons??
// search (de vazut librarii)
// accounts (tbd)
// switch de dark mode
// Tailwind, Chakra

// Tabel:
// user - Categories - Amount, Description, Date
//User: ID(key),Name,Account ID
//Transactions: ID(key), Account ID, Category ID, Amount, Description, Date
//Category: Category ID, Category Desc.

export default App;
