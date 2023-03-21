import { PiperArticle, PiperChunk, PiperJSON } from '@/types';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {encode} from 'gpt-3-encoder';
import fs from 'fs';

const BASE_URL = "https://www.desiringgod.org";
const INIT_URL_PATH = "/authors/john-piper";
const LINK_SELECTOR = 'a.card__shadow';
const TITLE_SELECTOR = 'h2.card--resource__title';
const DATE_SELECTOR = 'div.card--resource__date';
const NEXT_SELECTOR = 'a[rel="next"]';
const CHUNK_SIZE = 200;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const extractDoubleQuotedSentences = (text) => {
    const sentences = text.match(/“([^”]*)”/g);
    return sentences ? sentences.join(' ') : '';
};

const scrapeLinks = async (url) => {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);

    const cards = $(`.card--resource`);
    const linkArr = [];

    cards.each((i, card) => {
        const links = $(card).find(LINK_SELECTOR);
        const title = $(card).find(TITLE_SELECTOR).text().trim();
        const dateStr = $(card).find(DATE_SELECTOR).text().trim();
        const date = formatDate(dateStr);
        links.each((j, link) => {
            const href = $(link).attr('href');
            if (!href.startsWith('/labs/') && !href.startsWith('/books/')) {
                const linkObj = {
                    url: href,
                    title: title,
                    date: date
                };
                linkArr.push(linkObj);
            }
        });
    });

    const nextLink = $(NEXT_SELECTOR).attr('href');
    if (nextLink) {
        const nextLinks = await scrapeLinks(BASE_URL + nextLink);
        linkArr.push(...nextLinks);
    };

    return linkArr;
};

const getArticle = async (url: string, title: string, date: string) => {
    let article: PiperArticle = {
        title: "",
        url: "",
        date: "",
        content: "",
        tokens: 0,
        chunks: []
    };

    const html = await axios.get(`${BASE_URL}${url}`);
    const $ = cheerio.load(html.data);

    const body = $(`.resource__body`);
    const paragraphs = $(body).find('p');

    let cleanedText = '';
    let isAudioTranscript = false;
    const cleanedTextArray = [];

    for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        const text = $(paragraph).text().trim();
    
        // Skip first paragraph if it just says audio transcript
        if (url.startsWith('/interviews/') && i === 0 && text === 'Audio Transcript') {
            isAudioTranscript = true;
            continue;
        }
    
        // Remove paragraph only if it's in first 7 paragraphs and entirely wrapped in an <em> tag (i.e. is an intro to an APJ)
        if (url.startsWith('/interviews/') && i < 7 && $(paragraph).find('em').length > 0) {
            const emTag = $(paragraph).find('em');
            if (emTag.length === 1 && emTag.text().trim() === text) {
                const extractedSentences = extractDoubleQuotedSentences(text);
                cleanedTextArray.push(extractedSentences.trim()); // remove leading/trailing whitespace
                continue; // skip this paragraph
            }
        }
        cleanedTextArray.push(text.trim()); // remove leading/trailing whitespace
    }

    cleanedText = cleanedTextArray.join(' ');
    cleanedText = cleanedText.replace(/\s+/g, " ");
    cleanedText = cleanedText.replace(/\.([a-zA-Z])/g, ". $1");

    article = {
        title: title,
        url: `${BASE_URL}${url}`,
        date: date,
        content: isAudioTranscript ? cleanedText.substring(cleanedText.indexOf('\n') + 1).trim() : cleanedText.trim(), // remove leading/trailing whitespace
        tokens: encode(cleanedText).length,
        chunks: []
    };

    return article;
};

const getChunks = async (article: PiperArticle) => {
    const {title, url, date, content} = article;

    let articleTextChunks: string[] = []

    if(encode(content).length > CHUNK_SIZE) {
        const split = content.split(". ")
        let chunkText = ""

        for(let i=0; i < split.length; i++) {
            const sentence = split[i];
            const sentenceTokenLength = encode(sentence).length;
            const chunkTextTokenLength = encode(chunkText).length;

            if(chunkTextTokenLength + sentenceTokenLength > CHUNK_SIZE) {
                articleTextChunks.push(chunkText)
                chunkText = ""
            }

            if (sentence.length > 0 && sentence[sentence.length - 1].match(/[a-z0-9]/i)) {
                chunkText += sentence + ". "
            } else {
                chunkText += sentence + " "
            }
        }

        articleTextChunks.push(chunkText.trim())

    } else {
        articleTextChunks.push(content.trim());
    }

    const articleChunks: PiperChunk[] = articleTextChunks.map((text, i) => {
        const trimmedText=text.trim()

        const chunk: PiperChunk = {
            article_title: title,
            article_url: url,
            article_date: date,
            content: trimmedText,
            content_tokens: encode(trimmedText).length,
            embedding: []
        };

        return chunk;
    });

    // If any end chunks <100 tokens, just append to previous chunk
    if(articleChunks.length > 1) {
        for(let i = 0; i < articleChunks.length; i++) {
            const chunk = articleChunks[i];
            const prevChunk = articleChunks[i - 1];

            if(chunk.content_tokens < 100 && prevChunk) {
                prevChunk.content += " " + chunk.content;
                prevChunk.content_tokens += chunk.content_tokens;
                articleChunks.splice(i, 1);
                i--;
            };
        };
    };

    const chunkedArticle: PiperArticle = {
        ...article,
        chunks: articleChunks
    };

    return chunkedArticle;
};

(async () => {
    const links = await scrapeLinks(BASE_URL + INIT_URL_PATH);
    console.log(links.length);

    let articles: PiperArticle[] = [];

    for(let i = 0; i < links.length; i++) {
        const link = links[i]
        const article = await getArticle(link.url, link.title, link.date);
        const chunkedArticle = await getChunks(article);
        articles.push(chunkedArticle);
    }

    const json: PiperJSON = {
        tokens: articles.reduce((acc, article) => acc + article.tokens, 0),
        articles
    };

    fs.writeFileSync("scripts/piper.json", JSON.stringify(json));
})();