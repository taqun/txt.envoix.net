import { Client } from '@notionhq/client';

export const ROOT_PAGE_ID = '60a7ef207d8443acbb5a5ff62ecfd42c';

export const ARTICLE_DATABASE_ID = '27ea7417d5684c16a64bcab94c8f8b59';

export const notionClient = new Client({
  auth: process.env.NOTION_API_TOKEN,
});
