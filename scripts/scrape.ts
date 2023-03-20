import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = "https://www.desiringgod.org/authors/john-piper";
const LINK_SELECTOR = 'a.card__shadow';
const TITLE_SELECTOR = 'h2.card--resource__title';
const DATE_SELECTOR = 'div.card--resource__date';
const NEXT_SELECTOR = 'a[rel=next]';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const scrapeLinks = async (url) => {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);

    const cards = $(`.card--resource`)
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
    
    return linkArr;
};

const getAllLinks = async () => {
    const allLinks = [];
    let currentPage = BASE_URL;
    
    while (true) {
        console.log(`Scraping links from page: ${currentPage}`);
        
        const linkArr = await scrapeLinks(currentPage);
        allLinks.push(...linkArr);
        
        const nextLink = $(NEXT_SELECTOR).attr('href');
        if (!nextLink) break;
        
        currentPage = `https://www.desiringgod.org${nextLink}`;
    }
    
    console.log('All links have been scraped:');
    console.log(allLinks);
}

(async () => {
    await getAllLinks();
})();
