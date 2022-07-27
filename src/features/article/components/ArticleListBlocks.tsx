import { FC } from "react";
import { BlockObject } from "../../../types/notion";

type ArticleListBlocksProps = {
  blocks: BlockObject[];
};

export const ArticleListBlocks: FC<ArticleListBlocksProps> = ({ blocks }) => {
  return (
    <ul>
      {blocks.map((block) => {
        if (block.type === "bulleted_list_item") {
          return (
            <li key={block.id}>
              {block.bulleted_list_item.rich_text[0].plain_text}
            </li>
          );
        } else {
          return null;
        }
      })}
    </ul>
  );
};
