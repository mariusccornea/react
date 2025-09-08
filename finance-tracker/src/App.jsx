import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SidebarItem from "./SidebarItem";
import { useEffect } from "react";
import { useRef } from "react";
import Transactions from "./Transactions";

function App() {
  const [tab, setTab] = useState("dashboard");
  

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
            <Transactions/>
          
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

//save in local storage
//componente
//testE? CE PLM

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
