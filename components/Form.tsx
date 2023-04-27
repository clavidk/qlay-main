import { useState } from "react";
import { FC } from "react";

export const Form: FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);

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
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2 items-center">
        <div className="flex space-x-0 items-center mb-4">
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
            className="py-2 px-8 text-white text-sm bg-red-600 border border-red-600 hover:bg-red-700 flex justify-center items-center"
            disabled={isSubmitting}
            style={{ minWidth: '96px', minHeight: '32px' }}
            >
            {isSubmitting ? (
                <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l1-1.647z"
                ></path>
                </svg>
            ) : (
                'Get Updates'
            )}
            </button>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        </form>
    );
};

export default Form;
