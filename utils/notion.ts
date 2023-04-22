// notion.ts
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function addFormDataToNotion(
    databaseId: string,
    name: string,
    email: string
    ): Promise<void> {
    try {
        await notion.pages.create({
            parent: {
            type: "database_id",
            database_id: databaseId,
            },
            properties: {
                Name: {
                    title: [
                    {
                        text: {
                        content: name,
                        },
                    },
                    ],
                },
                Email: {
                    email: email,
                },
            },
        });
    } catch (error) {
        console.error("Error creating page in Notion:", error); // Log the error for Notion API call
        throw error;
    }
}
