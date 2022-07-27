import { FC } from "react";
import { BlockObject } from "../../../types/notion";

type ArticleBlockProps = {
  block: BlockObject;
};

export const ArticleBlock: FC<ArticleBlockProps> = ({ block }) => {
  switch (block.type) {
    case "heading_1":
      return <h1 key={block.id}>{block.heading_1.rich_text[0]?.plain_text}</h1>;
    case "paragraph":
      return <p key={block.id}>{block.paragraph.rich_text[0]?.plain_text}</p>;
    default:
      return null;
  }
};
