import { useState } from "react";
import { FC } from "react";

export const Form: FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (!name.trim() || !/^[a-z\s]+$/i.test(name)) {
        setError("Please enter a valid name.");
        return;
        }
    
        if (
        !email.trim() ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
        ) {
        setError("Please enter a valid email address.");
        return;
        }
    
        setError("");
        // Handle form submission here

        try {
            const response = await fetch("/api/submitForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email }),
            });
    
            if (response.ok) {
            setSuccess("Form submitted successfully.");
            } else {
            setError("Failed to submit the form. Please try again.");
            }
        } catch (error) {
            setError("Failed to submit the form. Please try again.");
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2 items-center">
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-auto p-2 border border-gray-300 rounded"
                placeholder="Name"
            />
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-auto p-2 border border-gray-300 rounded"
                placeholder="Email"
            />
            <button
                type="submit"
                className="py-1 px-3 text-white bg-red-600 rounded hover:bg-red-700"
            >
                Submit
            </button>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
            </form>
        );
    };
    
export default Form;