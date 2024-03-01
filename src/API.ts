import type { TableArticle } from "./types/table-article.interface";

export const getTableArticles = (): Promise<TableArticle[]> => {
  return Promise.resolve<TableArticle[]>([
    {
      title: "Article 0",
      description: "Description 0",
    },
    {
      title: "Article 1",
      description: "Description 1",
    },
  ]);
};
