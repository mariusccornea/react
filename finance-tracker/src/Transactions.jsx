import { useEffect, useState } from "react";

function Transactions({}) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  //local storage stuff
  const STORAGE_KEY = "finance_tx_v1";
  // const loadedRef = useRef(false);
  const [transactions, setTransactions] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return [{ amount: 60, description: "stuff", date: "2023-05-14" }];
  });

  useEffect(() => {
    // if (!loadedRef.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const total = transactions.reduce((sum, t) => {
    return sum + Number(t.amount);
  }, 0);
  const numberOfTransactions = transactions.length;

  const categories = ["rent", "additional expenses", "food"];
  return (
    <div>
      <div>
        <p>Number of transactions: {numberOfTransactions}</p>
        <p>Total Amount: {total}</p>
      </div>
      <form
        className="tx-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!amount || !date || !description) return;
          const newTransaction = {
            id: crypto.randomUUID(),
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
          <label htmlFor="category">Category</label>
          <select className="transactionInput" name="Category" id="category">
            <option>-- Choose Category --</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

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
                  <td>Category</td>
                  <td>
                    <button
                      className="deleteBtn"
                      onClick={() => {
                        const newTransactions = transactions.filter(
                          (x) => x.id !== t.id
                        );
                        setTransactions(newTransactions);
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
