import { Table } from "react-bootstrap";
import z from "zod";
import { schema } from "./ExpenseCalculator";

const DisplayExpenses = ({
  expenses,
  onDeleteRow,
  category,
}: {
  expenses: z.infer<typeof schema>[];
  onDeleteRow: (index: number) => void;
  category: string;
}) => {
  const filteredExpenses =
    category !== ""
      ? expenses.filter(
          (expense) => expense.category.toLowerCase() === category.toLowerCase()
        )
      : expenses;

  return (
    <Table
      striped
      borderless
      hover
      variant="light"
      responsive="sm"
      className={"px-2"}
    >
      {filteredExpenses.length > 0 && (
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Amount($)</th>
            <th>Category</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
      )}
      <tbody>
        {filteredExpenses.map((expense, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>@mdo</td>
              <td>
                <button
                  onClick={() => onDeleteRow(index)}
                  data-testid={`delete-btn-${index}`}
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          {filteredExpenses.length > 0 ? <td>#Total</td> : <td>{""}</td>}
          {expenses.length > 0 ? (
            <td>
              $
              {filteredExpenses.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.amount,
                0
              )}
            </td>
          ) : (
            <td>{""}</td>
          )}

          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </Table>
  );
};
export default DisplayExpenses;
