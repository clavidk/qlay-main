// pages/api/submitForm.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { addFormDataToNotion } from "utils/notion";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }

    const { name, email } = req.body;

    const databaseId = process.env.NOTION_DB_ID;

    if (!databaseId) {
        res.status(500).json({ message: "Database ID not configured" });
        return;
    }

    try {
        await addFormDataToNotion(databaseId, name, email);
        res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
        console.error("Error submitting form:", error); // Log the error on the server-side
        res.status(500).json({ message: "Failed to submit the form. Please try again." });
    }
}
