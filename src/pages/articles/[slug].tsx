import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { BlockObject } from '@/types/notion';
import { getArticleID, getBlockChildren } from '@/features/article/api/getArticleDetail';
import { ArticleBlock } from '@/features/article/components/ArticleBlock';
import { ArticleListBlocks } from '@/features/article/components/ArticleListBlocks';
import { getLists, isListBlock } from '@/utils/notion';

type ArticlePageProps = {
  blocks: BlockObject[];
};

const ArticlePage: NextPage<ArticlePageProps> = ({ blocks }) => {
  return (
    <div>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleId = await getArticleID(params?.slug);
  if (articleId == null) return { props: {} };

  const blocks = await getBlockChildren(articleId);

  return {
    props: {
      blocks: blocks.results,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default ArticlePage;
