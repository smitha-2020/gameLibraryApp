import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterByCategory from "../../expense-tracker/components/FilterByCategory";

describe("should check the filterByCategory component", () => {
  it("should check the list of unique categories", async () => {
    const expenses = [
      {
        description: "oranges and blueberry",
        amount: 12,
        category: "Utility",
      },
      { description: "apple", amount: 2, category: "Grocery" },
      { description: "broom stick", amount: 20, category: "Utility" },
      { description: "tickets", amount: 9, category: "Tickets" },
    ];
    const mockSelectCategory = vi.fn();
    render(
      <FilterByCategory
        expenses={expenses}
        selectCategory={mockSelectCategory}
      />
    );

    const user = userEvent.setup();
    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    const options = screen.getAllByRole("option");

    expect(combobox).toBeInTheDocument();
    expect(screen.getByText(/utility/i)).toBeInTheDocument();
    expect(options).toHaveLength(4);
  });
});
