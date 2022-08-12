import { FC } from 'react';
import Link from 'next/link';

import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.container}>
      <p className={styles.siteTitle}>
        <Link href="/">txt.envoix.net</Link>
      </p>
    </header>
  );
};
