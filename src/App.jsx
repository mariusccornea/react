import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SidebarItem from "./SidebarItem";
import { useEffect } from "react";
import { useRef } from "react";
import Transactions from "./Transactions";
import Categories from "./Categories";
import Dashboard from "./Dashboard";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";

function App() {


  const [transactions, setTransactions] = useState([])


 useEffect(() => {
  async function loadTransactions() {
    try {
      const res = await fetch("http://localhost:5000/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to load transactions:", err);
    }
  }

  loadTransactions();
}, []);


  const totalRent = transactions
    .filter((t) => t.category === "Rent")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalAdditional = transactions
    .filter((t) => t.category === "Additional Expenses")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalFood = transactions
    .filter((t) => t.category === "Food")
    .reduce((sum, t) => sum + Number(t.amount), 0);


  return (
    <div className="layout">
     
      {/* Left sidebar */}
      <aside className="sidebar" >
        <div className="sidebar-header">
          <span className="brand">Finance Tracker</span>
        </div> 
        <NavLink to="/dashboard" className="nav-item">
          Dashboard
        </NavLink>
        <NavLink to="/transactions" className="nav-item">
          Transactions
        </NavLink>
        <NavLink to="/categories" className="nav-item">
          Categories
        </NavLink>

        <div className="sidebar-footer">
          <small>v0.5 • Demo</small>
        </div>
      </aside>
      {/* main items  */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard  />} />
          <Route path="/transactions" element={<Transactions  transactions={transactions}
              setTransactions={setTransactions} />} />
          <Route path="/categories" element={<Categories totalRent={totalRent}
              totalAdditional={totalAdditional}
              totalFood={totalFood} />} />
        </Routes>
      </main>

    </div>
  );
}
// Done
//save in local storage - done
//componente - done 
//react router
//add categories

// TBDone
//change TAB when changing page
//first draft of db - done
//teste - running/ongoing
//add tailwind
//gandit ce urmeaza. 


// Backlog
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
