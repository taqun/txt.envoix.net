import { Client } from "@notionhq/client";

declare type MatchType<T, U, V = never> = T extends U ? T : V;

export type PageObject = MatchType<
  Awaited<ReturnType<Client["pages"]["retrieve"]>>,
  { properties: unknown }
>;

export type BlockObject = MatchType<
  Awaited<ReturnType<Client["blocks"]["children"]["list"]>>["results"][number],
  {
    type: unknown;
  }
>;
