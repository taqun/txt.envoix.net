import { FC, ReactNode } from 'react';

import { Header } from '@/components/Header';

import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
    </div>
  );
};
