import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const addressSchema = z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().regex(/^\\d{5}$/, "Invalid postal code"),
});
const registrationSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    age: z.number().int().min(0, "Age must be a positive integer"),
    address: addressSchema,
});
type RegistrationFormData = z.infer<typeof registrationSchema>;
const RegistrationForm2 = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: { age: 0 },
    });
    const onSubmit = (data: RegistrationFormData) => {
        console.log("Form data:", data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            {" "}
            <div className="field">
                {" "}
                <label>Username:</label> <input {...register("username")} />{" "}
                {errors.username && <p className="error">{errors.username.message}</p>}{" "}
            </div>{" "}
            <div className="field">
                {" "}
                <label>Email:</label> <input {...register("email")} />{" "}
                {errors.email && <p className="error">{errors.email.message}</p>}{" "}
            </div>{" "}
            <div className="field">
                {" "}
                <label>Password:</label>{" "}
                <input type="password" {...register("password")} />{" "}
                {errors.password && <p className="error">{errors.password.message}</p>}{" "}
            </div>{" "}
            <div className="field">
                {" "}
                <label>Age:</label>{" "}
                <input type="number" {...register("age", { valueAsNumber: true })} />{" "}
                {errors.age && <p className="error">{errors.age.message}</p>}{" "}
            </div>{" "}
            <div>
                {" "}
                <h3>Address</h3>{" "}
                <div className="field">
                    {" "}
                    <label>Street:</label> <input {...register("address.street")} />{" "}
                    {errors.address?.street && (
                        <p className="error">{errors.address.street.message}</p>
                    )}{" "}
                </div>{" "}
                <div className="field">
                    {" "}
                    <label>City:</label> <input {...register("address.city")} />{" "}
                    {errors.address?.city && (
                        <p className="error">{errors.address.city.message}</p>
                    )}{" "}
                </div>{" "}
                <div className="field">
                    {" "}
                    <label>Postal Code:</label>{" "}
                    <input {...register("address.postalCode")} />{" "}
                    {errors.address?.postalCode && (
                        <p className="error">{errors.address.postalCode.message}</p>
                    )}{" "}
                </div>{" "}
            </div>{" "}
            <button type="submit">Submit</button>{" "}
        </form>
    );
};
export default RegistrationForm2;
