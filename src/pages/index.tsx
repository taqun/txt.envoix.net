import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { getArticles } from "../features/article/api/getArticleDetail";
import { notionClient, ROOT_PAGE_ID } from "../libs/notionClient";
import { BlockObject, PageObject } from "../types/notion";

type SiteData = {
  title: string;
  url: string;
};

type ArticleData = {
  id: string;
  slug: string;
  publishedAt: string;
  title: string;
};

type IndexPageProps = {
  site: SiteData;
  articles: ArticleData[];
};

const IndexPage: NextPage<IndexPageProps> = ({ site, articles }) => {
  return (
    <div>
      <Head>
        <title>{site.title}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          {articles.map((article) => {
            return (
              <li key={article.id}>
                <time dateTime={new Date(article.publishedAt).toISOString()}>
                  {article.publishedAt}
                </time>
                <Link href={"/articles/" + article.slug}>{article.title}</Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const client = notionClient;

  // root page
  const rootPageBlocks = await client.blocks.children.list({
    block_id: ROOT_PAGE_ID,
  });

  // site data
  const siteData: SiteData = {
    title: "",
    url: "",
  };

  const siteInfoTagble = (rootPageBlocks.results as BlockObject[]).find(
    (b) => b.type === "table"
  );

  if (siteInfoTagble) {
    const siteInfoTableContent = await client.blocks.children.list({
      block_id: siteInfoTagble.id,
    });

    (siteInfoTableContent.results as BlockObject[]).forEach((o) => {
      if (o.type === "table_row") {
        const headerRowValue = o.table_row.cells[0][0].plain_text;

        switch (headerRowValue) {
          case "Title":
            siteData.title = o.table_row.cells[1][0].plain_text;
            break;
          case "URL":
            siteData.title = o.table_row.cells[1][0].plain_text;
            break;
          default:
            break;
        }
      }
    });
  }

  // article list
  const articlesData: ArticleData[] = [];
  const articles = await getArticles();

  (articles.results as PageObject[]).forEach((o) => {
    const publishedAt =
      o.properties["PublishedAt"].type === "date" &&
      o.properties["PublishedAt"].date != null
        ? o.properties["PublishedAt"].date.start
        : null;

    const title =
      o.properties["Title"].type === "title" &&
      o.properties["Title"].title[0].plain_text != null
        ? o.properties["Title"].title[0].plain_text
        : null;

    const slug =
      o.properties["Slug"].type === "rich_text" &&
      o.properties["Slug"].rich_text[0].plain_text != null
        ? o.properties["Slug"].rich_text[0].plain_text
        : null;

    if (publishedAt && title && slug) {
      articlesData.push({
        id: o.id,
        slug,
        publishedAt,
        title,
      });
    }
  });

  return {
    props: {
      site: siteData,
      articles: articlesData,
    },
  };
};

export default IndexPage;
