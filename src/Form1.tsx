import { useState, ChangeEvent, FormEvent } from "react";
import { z, ZodError } from "zod";

const addressSchema = z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().regex(/^\d{5}$/, "Invalid postal code"),
});

const registrationSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    age: z.coerce.number().int().min(0, "Age must be a positive integer"),
    address: addressSchema,
});

type Address = z.infer<typeof addressSchema>;
type Registration = z.infer<typeof registrationSchema>;

const RegistrationForm1 = () => {
    const [formData, setFormData] = useState<Registration>({
        username: "",
        email: "",
        password: "",
        age: 0,
        address: {
            street: "",
            city: "",
            postalCode: "",
        },
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.startsWith("address.")) {
            const addressField = name.split(".")[1] as keyof Address;
            setFormData((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressField]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        try {
            const parsedData = registrationSchema.parse(formData);
            console.log("Validation successful", parsedData);
            // Handle successful validation here (e.g., send data to server)
        } catch (err) {
            if (err instanceof ZodError) {
                const validationErrors: Record<string, string> = {};
                err.errors.forEach(({ path, message }) => {
                    validationErrors[path.join(".")] = message;
                });
                setErrors(validationErrors);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="field">
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="field">
                <label>Email:</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="field">
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="field">
                <label>Age:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                />
                {errors.age && <p className="error">{errors.age}</p>}
            </div>
            <div>
                <h3>Address</h3>
                <div className="field">
                    <label>Street:</label>
                    <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                    />
                    {errors["address.street"] && (
                        <p className="error">{errors["address.street"]}</p>
                    )}
                </div>
                <div className="field">
                    <label>City:</label>
                    <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                    />
                    {errors["address.city"] && (
                        <p className="error">{errors["address.city"]}</p>
                    )}
                </div>
                <div className="field">
                    <label>Postal Code:</label>
                    <input
                        type="text"
                        name="address.postalCode"
                        value={formData.address.postalCode}
                        onChange={handleChange}
                    />
                    {errors["address.postalCode"] && (
                        <p className="error">{errors["address.postalCode"]}</p>
                    )}
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default RegistrationForm1;