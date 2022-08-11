import { ARTICLE_DATABASE_ID, notionClient } from "../../../libs/notionClient";

export const getArticles = async () => {
  const articles = await notionClient.databases.query({
    database_id: ARTICLE_DATABASE_ID,
    sorts: [
      {
        property: "PublishedAt",
        direction: "descending",
      },
    ],
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
  });

  return articles;
};

export const getArticleID = async (slug: string | string[] | undefined) => {
  if (typeof slug !== "string") return null;

  const articles = await notionClient.databases.query({
    database_id: ARTICLE_DATABASE_ID,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  return articles.results[0] != null ? articles.results[0].id : null;
};

export const getBlockChildren = async (blockId: string) => {
  const blocks = await notionClient.blocks.children.list({
    block_id: blockId,
  });

  return blocks;
};
