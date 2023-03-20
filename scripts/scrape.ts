import { PiperArticle } from '@/types';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {encode} from 'gpt-3-encoder';

const BASE_URL = "https://www.desiringgod.org";
const INIT_URL_PATH = "/authors/john-piper";
const LINK_SELECTOR = 'a.card__shadow';
const TITLE_SELECTOR = 'h2.card--resource__title';
const DATE_SELECTOR = 'div.card--resource__date';
const NEXT_SELECTOR = 'a[rel="next"]';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const scrapeLinks = async (url, pageCounter) => {
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
            const linkObj = {
                url: href,
                title: title,
                date: date
            };
            linkArr.push(linkObj);
        });
    });

    const nextLink = $(NEXT_SELECTOR).attr('href');
    if (nextLink && pageCounter < 1) {
        const nextLinks = await scrapeLinks(BASE_URL + nextLink, pageCounter + 1);
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

    const html = await axios.get(`${BASE_URL}/${url}`);
    const $ = cheerio.load(html.data);

    const body = $(`.resource__body`);
    const text = $(body).text();

    let cleanedText = text.replace(/\s+/g, " ");
    cleanedText = cleanedText.replace(/\.([a-zA-Z])/g, ". $1");

    article = {
        title: title,
        url: `${BASE_URL}/${url}`,
        date: date,
        content: cleanedText,
        tokens: encode(text).length,
        chunks: []
    };

    return article;
};


(async () => {
    const links = await scrapeLinks(BASE_URL + INIT_URL_PATH, 0);

    for(let i = 0; i < links.length; i++) {
        const link = links[i]

        if (i !== 0) break;
        const article = await getArticle(link.url, link.title, link.date);
        console.log(article);
    }
})();