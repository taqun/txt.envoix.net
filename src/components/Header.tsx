import { FC } from 'react';
import Link from 'next/link';

export const Header: FC = () => {
  return (
    <header>
      <h1>
        <Link href="/">txt.envoix.net</Link>
      </h1>
    </header>
  );
};
