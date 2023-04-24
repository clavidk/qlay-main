export enum OpenAIModel {
    DAVINCI_TURBO = "gpt-3.5-turbo"
}

export type PiperArticle = {
    title: string;
    url: string;
    date: string;
    content: string;
    tokens: number;
    chunks: PiperChunk[];
}

export type PiperChunk = {
    article_title: string;
    article_url: string;
    article_date: string;
    content: string;
    content_tokens?: number;
    embedding?: number[];
}

export type PiperJSON = {
    tokens: number;
    articles: PiperArticle[];
}
