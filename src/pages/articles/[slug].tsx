import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import {
  getArticle,
  getBlockChildren,
} from '@/features/article/api/getArticleDetail';
import {
  ArticleHeader,
  ArticleHeaderProps,
} from '@/features/article/components/ArticleHeader';
import {
  ArticleContent,
  ArticleContentProps,
} from '@/features/article/components/ArticleContent';

type ArticlePageProps = {
  data: ArticleHeaderProps & ArticleContentProps;
};

const ArticlePage: NextPage<ArticlePageProps> = ({ data }) => {
  if (!data) return <div>loading...</div>;

  return (
    <article>
      <ArticleHeader {...data} />
      <ArticleContent blocks={data.blocks} />
    </article>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const article = await getArticle(params?.slug);
  if (article == null) return { props: {} };

  const title =
    article.properties['Title'].type === 'title'
      ? article.properties['Title'].title[0]?.plain_text
      : null;

  const publishedAt =
    article.properties['PublishedAt'].type === 'date'
      ? article.properties['PublishedAt'].date?.start
      : null;

  const blocks = await getBlockChildren(article.id);

  return {
    props: {
      data: {
        title,
        publishedAt,
        blocks: blocks.results,
      },
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
