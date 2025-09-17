import { render, screen } from "@testing-library/react";
import Transactions from "./Transactions";

test("renders empty state", () => {
  render(<Transactions transactions={[]} setTransactions={() => {}} />);
  expect(screen.getByText(/no transactions yet/i)).toBeInTheDocument();
});