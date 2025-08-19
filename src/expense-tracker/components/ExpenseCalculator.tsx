import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const categories = ["grocery", "tickets", "hobby", "fees", "shopping"];
export const schema = z.object({
  description: z
    .string()
    .min(10, { message: "Description must be atleast 10 charecters long" }),
  amount: z.number().min(1),
  category: z
    .enum(categories, {
      error: "Category is required",
    })
    .nonoptional(),
});

export default function ExpenseCalculator({
  setExpenses,
}: {
  setExpenses: React.Dispatch<React.SetStateAction<z.infer<typeof schema>[]>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    setExpenses((prev) => [...prev, data]);
    reset();
  };

  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"d-flex flex-column gap-2 formHook"}
    >
      <input
        type="text"
        placeholder="Description"
        {...register("description")}
        className={errors.description ? "error" : ""}
      />
      {errors.description && <span>{errors.description.message}</span>}
      <input
        type="amount"
        placeholder="Amount"
        {...register("amount", { valueAsNumber: true })}
        className={errors.amount ? "error" : ""}
      />
      {errors.amount && <span>{errors.amount.message}</span>}

      <select
        role="combobox"
        {...register("category", { required: true })}
        className={errors.category ? "error" : ""}
      >
        <option value="select one">select one</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}

        {/** <option value="grocery">Grocery</option>
        <option value="tickets">Tickets</option>
        <option value="hobby">Hobby</option>
        <option value="fees">School Fees</option>
        <option value="shopping">Shopping</option> */}
      </select>
      {errors.category && <span>{errors.category.message}</span>}

      <input type="submit" disabled={!isValid} />
    </form>
  );
}
