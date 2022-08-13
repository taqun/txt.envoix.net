import { FC } from 'react';

import { BlockObject } from '@/types/notion';

type ArticleBlockProps = {
  block: BlockObject;
};

export const ArticleBlock: FC<ArticleBlockProps> = ({ block }) => {
  switch (block.type) {
    case 'heading_1':
      return <h2 key={block.id}>{block.heading_1.rich_text[0]?.plain_text}</h2>;
    case 'heading_2':
      return <h3 key={block.id}>{block.heading_2.rich_text[0]?.plain_text}</h3>;
    case 'heading_3':
      return <h4 key={block.id}>{block.heading_3.rich_text[0]?.plain_text}</h4>;
    case 'paragraph':
      return <p key={block.id}>{block.paragraph.rich_text[0]?.plain_text}</p>;
    default:
      return null;
  }
};
