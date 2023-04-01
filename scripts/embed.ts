import { PiperArticle, PiperJSON } from "@/types";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { Configuration, OpenAIApi } from "openai";


loadEnvConfig("");

const generateEmbeddings = async (articles: PiperArticle[]) => {
    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    for(let i = 3203; i < articles.length; i++) {
        const article = articles[i];

        for(let j = 0; j < article.chunks.length; j++) {
            const chunk = article.chunks[j];

            const embeddingResponse = await openai.createEmbedding({
                model: "text-embedding-ada-002",
                input: chunk.content
            });

            const [{embedding}] = embeddingResponse.data.data;

            const {data, error} = await supabase
                .from('piper')
                .insert({
                    article_title: chunk.article_title,
                    article_url: chunk.article_url,
                    article_date: chunk.article_date,
                    content: chunk.content,
                    content_tokens: chunk.content_tokens,
                    embedding
                })
                .select("*");

            if (error) {
                console.log('error');
            } else {
                console.log('saved', i, j);
            }

            await new Promise((resolve) => setTimeout(resolve, 300));
        }
    }
};

(async() => {
    const json: PiperJSON= JSON.parse(fs.readFileSync('data/piper.json', 'utf8'))

    await generateEmbeddings(json.articles)
})()