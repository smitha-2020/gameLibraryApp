import z from "zod";
import { schema } from "./ExpenseCalculator";

const FilterByCategory = ({
  expenses,
  selectCategory,
}: {
  expenses: z.infer<typeof schema>[];
  selectCategory: (category: any) => void;
}) => {
  const categories: string[] = expenses.map((expense) => expense.category);
  let unique = categories.filter((item, i, ar) => ar.indexOf(item) === i);

  return (
    <select
      onChange={(event) => selectCategory(event.target.value)}
      role="combobox"
    >
      <option value="">Select Category</option>
      {unique.map((category) => (
        <option value={category} key={category}>
          {category.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default FilterByCategory;
