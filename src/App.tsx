import React, { useState } from "react";
import z from "zod";
import DisplayExpenses from "./expense-tracker/components/DisplayExpenses";
import ExpenseCalculator, { schema } from "./expense-tracker/components/ExpenseCalculator";
import FilterByCategory from "./expense-tracker/components/FilterByCategory";
import "./scss/custom.scss";

function App() {
  const [expenses, setExpenses] = useState<z.infer<typeof schema>[]>([]);
  const [category, setCategory] = useState<string>("");

  const onDeleteRow = (index: number) => {
    const newExpenses = expenses.filter(
      (expense) => expense !== expenses[index]
    );
    setExpenses(newExpenses);
  };

  const selectCategory = (category) => {
    setCategory(category);
  };
  return (
    <div>
      <ExpenseCalculator setExpenses={setExpenses} />

      {expenses.length > 0 && (
        <>
          <div className={"d-flex flex-row justify-content-center w-100 mb-5"}>
            <FilterByCategory
              expenses={expenses}
              selectCategory={selectCategory}
            />
          </div>
          <DisplayExpenses expenses={expenses} onDeleteRow={onDeleteRow} category={category} />
        </>
      )}
    </div>
  );
}

export default App;
