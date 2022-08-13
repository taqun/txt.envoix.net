import { FC } from 'react';

import { BlockObject } from '@/types/notion';
import { ArticleListBlocks } from '@/features/article/components/ArticleListBlocks';
import { ArticleBlock } from '@/features/article/components/ArticleBlock';
import { getLists, isListBlock } from '@/utils/notion';

import styles from './ArticleContent.module.scss';

export type ArticleContentProps = {
  blocks: BlockObject[];
};

export const ArticleContent: FC<ArticleContentProps> = ({ blocks }) => {
  return (
    <div className={styles.articleContent}>
      {blocks?.map((block, i) => {
        if (isListBlock(block)) {
          const prevBlock = blocks[i - 1];
          if (i === 0 || !isListBlock(prevBlock)) {
            const listBlocks = getLists(blocks, i);
            return <ArticleListBlocks key={block.id} blocks={listBlocks} />;
          }
        } else {
          return <ArticleBlock key={block.id} block={block} />;
        }
      })}
    </div>
  );
};
