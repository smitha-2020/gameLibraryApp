import { render, screen } from "@testing-library/react";
import ExpenseCalculator from "../../expense-tracker/components/ExpenseCalculator";

describe("should check if the expense calulator", () => {
  it("should check if the form is rendered", () => {
    const mockFn = vi.fn();
    render(<ExpenseCalculator setExpenses={mockFn} />);
    screen.debug();
  });
});
