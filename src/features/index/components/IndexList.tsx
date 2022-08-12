import { FC } from 'react';

import {
  IndexListItem,
  IndexListItemData,
} from '@/features/index/components/IndexListItem';

import styles from './IndexList.module.scss';

type IndexListProps = {
  articles: IndexListItemData[];
};

export const IndexList: FC<IndexListProps> = ({ articles }) => {
  return (
    <ul className={styles.list}>
      {articles.map((article) => {
        return <IndexListItem key={article.id} data={article} />;
      })}
    </ul>
  );
};
