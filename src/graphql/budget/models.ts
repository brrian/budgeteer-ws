export interface Budget {
  categories: Category[];
  total: number;
}

interface Category {
  categoryId: string;
  limit: number;
}
