import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  fname: z.coerce
    .string()
    .regex(/^[A-Z]+[a-z]+$/)
    .toUpperCase()
    .min(3, { message: "Too short name should be atleast 3 charecters long" })
    .max(30, { message: "Too Long name should be atmost 30 charecters long" }),
  lname: z
    .string()
    .min(3, "Too short name should be atleast 3 charecters long")
    .max(30, "Too Long name should be atmost 30 charecters long"),
  email: z.email("should be an valid email address"),
  tel: z
    .number({
      error: (issue) => {
        if (issue.code === "invalid_type") {
          return { message: `Value must be 8 digit phone number` };
        }

        //  defer to default
        return undefined;
      },
    })
    .min(100000000, {
      message: "Mobile number shoudld be atlrast 8 digits long",
    }),
  title: z.string("Title is required"),
  developer: z.boolean("Developer field is required"),
});
type FormDataProps = z.input<typeof schema>;
export default function ReactHookForms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(schema),
  });
  console.log(errors);
  const onSubmit = (data: FormDataProps) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex flex-column container gap-2 w-50 formHook"
    >
      <input
        type="text"
        placeholder="First name"
        {...register("fname")}
        className={errors.fname ? "error" : ""}
      />
      {errors.fname && <span>{errors.fname.message}</span>}

      <input
        type="text"
        placeholder="Last name"
        {...register("lname")}
        className={errors.lname ? "error" : ""}
      />
      <input
        type="text"
        placeholder="Email"
        {...register("email")}
        className={errors.email ? "error" : ""}
      />
      <input
        type="number"
        placeholder="Mobile number"
        {...register("tel", { valueAsNumber: true })}
        className={errors.tel ? "error" : ""}
      />
      <select {...register("title")} className={errors.title ? "error" : ""}>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>

      <input {...register("developer")} type="radio" value="Yes" />
      <input {...register("developer")} type="radio" value="No" />

      <input type="submit" />
    </form>
  );
}
