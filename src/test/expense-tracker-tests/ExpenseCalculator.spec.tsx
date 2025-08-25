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
    const options = await screen.findAllByRole("option");
    await user.selectOptions(inputCategory, "hobby");

    expect(options).toHaveLength(6);

    await user.click(options[3]);

    expect(await screen.findByRole("button")).not.toBeDisabled();
  });

  it.each([
    { userInput: "123", message: /must match pattern/i },
    { userInput: "'".repeat(20), message: /must match pattern/i },
    { userInput: "aaaaa", message: /atleast 10 charecters long/i },
  ])(
    "should check the description textbox for valid input",
    async ({ userInput, message }) => {
      const mockFn = vi.fn();
      render(<ExpenseCalculator setExpenses={mockFn} />);

      const user = userEvent.setup();

      const inputDescription = screen.getByPlaceholderText(/description/i);
      const inputAmount = screen.getByPlaceholderText(/amount/i);
      const inputCategory = screen.getByRole("combobox");
      const submitButton = screen.getByRole("button", { name: /submit/i });

      await user.type(inputDescription, userInput);

      await user.type(inputAmount, "350");
      await user.click(inputCategory);
      const options = await screen.findAllByRole("option");
      await user.selectOptions(inputCategory, "hobby");

      expect(options).toHaveLength(6);

      await user.click(options[3]);
      submitButton.click();

      expect(await screen.findByText(message)).toBeInTheDocument();
    }
  );
});
