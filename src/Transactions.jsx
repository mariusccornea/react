import { useEffect, useState } from "react";

function Transactions({ setTransactions, transactions }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const total = transactions.reduce((sum, t) => {
    return sum + Number(t.amount);
  }, 0);
  const numberOfTransactions = transactions.length;

  const categories = ["Rent", "Additional Expenses", "Food"];
  return (
    <div style={{ margin: "2rem" }}>
  
      <div>
        <p>Number of transactions: {numberOfTransactions}</p>
        <p>Total Amount: {total}</p>
      </div>
      <form
        className="tx-form"
        onSubmit={async (e) => {
          e.preventDefault();

          const newTx = {
            amount: Number(amount),
            description,
            date,
            category,
          };

          const res = await fetch("http://localhost:5000/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTx),
          });

          const savedTx = await res.json();
          setTransactions([...transactions, savedTx]);

          // reset form fields
          setAmount("");
          setDescription("");
          setDate("");
          setCategory("");
        }}
      >
        <div className="newTransactionRow">
          {/* Category */}
          <div className="form-row">
            <label htmlFor="category">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="transactionInput"
              name="Category"
              id="category"
            >
              <option>-- Choose Category --</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
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
          {/* Description */}
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
          {/* Date */}
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

          <div className="btn bg-black text-white border-black">
            <button type="submit" className="addBtn">
              Add Transaction
            </button>
          </div>
        </div>
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
                <th>Amount</th>
                <th>Category</th>
                <th>Delete</th>
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
                  <td>{Number(t.amount).toFixed(2)}</td>
                  <td>{t.category}</td>
                  <td>
                    <button
                    className="btn"
                      onClick={async () => {
                        const newTransactions = transactions.filter(
                          (x) => x.id !== t.id
                        );
                        const res = await fetch(
                          `http://localhost:5000/transactions/${t.id}`,
                          {
                            method: "DELETE",
                          }
                        );

                        const result = await res.json();
                        console.log(result);

                        if (result.success) {
                          setTransactions(newTransactions);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Transactions;
