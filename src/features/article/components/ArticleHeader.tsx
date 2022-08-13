import { FC } from 'react';

import styles from './ArticleHeader.module.scss';

export type ArticleHeaderProps = {
  title: string;
  publishedAt: string;
};

export const ArticleHeader: FC<ArticleHeaderProps> = ({
  title,
  publishedAt,
}) => {
  return (
    <header className={styles.articleHeader}>
      <time dateTime={new Date(publishedAt).toISOString()}>{publishedAt}</time>
      <h1>{title}</h1>
    </header>
  );
};
