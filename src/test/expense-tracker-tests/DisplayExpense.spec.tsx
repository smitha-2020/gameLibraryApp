import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DisplayExpenses from "../../expense-tracker/components/DisplayExpenses";

describe("should check the display expense component", () => {
  const renderComponent = (category: string) => {
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
    const mockDelete = vi.fn();
    render(
      <DisplayExpenses
        expenses={expenses}
        onDeleteRow={mockDelete}
        category={category}
      />
    );
  };

  it("should check if empty table is displayed when expenses is empty", () => {
    render(<DisplayExpenses expenses={[]} onDeleteRow={vi.fn()} category="" />);

    expect(screen.queryByText(/desciption/i)).not.toBeInTheDocument();
  });

  it("should check if expenses are displayed in the table", () => {
    renderComponent("");

    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/broom/i)).toBeInTheDocument();
    expect(screen.getByText(/#total/i)).toBeInTheDocument();
  });

  it("should check delete button works", async () => {
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
    const mockDelete = vi.fn();
    render(
      <DisplayExpenses
        expenses={expenses}
        onDeleteRow={mockDelete}
        category=""
      />
    );

    const buttons = screen.getAllByRole("button", { name: /delete/i });
    const button = await screen.findByTestId("delete-btn-1");
    const user = userEvent.setup();

    expect(screen.getByText(expenses[0].description)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(buttons).toHaveLength(expenses.length);

    await user.click(button);
    expect(mockDelete).toBeCalled();
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it("should display only the items related to the category", async () => {
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
    const mockDelete = vi.fn();
    render(
      <DisplayExpenses
        expenses={expenses}
        onDeleteRow={mockDelete}
        category="utility"
      />
    );
    expect(screen.queryByText(expenses[0].description)).toBeInTheDocument();
    expect(screen.queryByText(expenses[1].description)).not.toBeInTheDocument();
  });
});
