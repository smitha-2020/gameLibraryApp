import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpenseCalculator from "../../expense-tracker/components/ExpenseCalculator";

describe("should check if the expense calulator", () => {
  it("should check if the form is rendered", async () => {
    const mockFn = vi.fn();
    render(<ExpenseCalculator setExpenses={mockFn} />);

    const user = userEvent.setup();

    const inputDescription = screen.getByPlaceholderText(/description/i);
    const inputAmount = screen.getByPlaceholderText(/amount/i);
    const inputCategory = screen.getByRole("combobox");

    await user.type(inputDescription, "o".repeat(11));
    await user.type(inputAmount, "350");
    await user.click(inputCategory);
    await user.selectOptions(inputCategory, "hobby");

    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(6);

    await user.click(options[3]);

    expect(await screen.findByRole("button")).not.toBeDisabled();

    screen.debug();
  });
});
