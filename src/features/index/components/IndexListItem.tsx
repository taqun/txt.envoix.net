import { FC } from 'react';
import Link from 'next/link';

import styles from './IndexListItem.module.scss';

export type IndexListItemData = {
  id: string;
  slug: string;
  publishedAt: string;
  title: string;
};

type IndexListItemProps = {
  data: IndexListItemData;
};

export const IndexListItem: FC<IndexListItemProps> = ({ data }) => {
  return (
    <li className={styles.listItem}>
      <time dateTime={new Date(data.publishedAt).toISOString()}>
        {data.publishedAt}
      </time>
      <Link href={'/articles/' + data.slug}>{data.title}</Link>
    </li>
  );
};
