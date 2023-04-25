import { useState } from "react";
import { FC } from "react";

export const Form: FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
            setSuccess("Success!");
            } else {
            setError("Failed to submit the form. Please try again.");
            }
        } catch (error) {
            setError("Failed to submit the form. Please try again.");
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2 items-center">
            <div className="flex space-x-0 items-center">
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full lg:w-auto p-2 border border-gray-300 text-sm"
                    placeholder="Email"
                />
                <button
                    type="submit"
                    className="py-2 px-8 text-white text-sm bg-red-600 border border-red-600 hover:bg-red-700"
                >
                    Submit
                </button>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
        </form>
    );
};
    
export default Form;