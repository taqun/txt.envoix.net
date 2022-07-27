import Link from "next/link";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <header>
      <h1>
        <Link href="/">txt.envoix.net</Link>
      </h1>
    </header>
  );
};
