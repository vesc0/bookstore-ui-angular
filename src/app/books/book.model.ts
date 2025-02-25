export interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    pageNumber: number;
    publishingYear: number;
    description: string;
    price: number;
    image?: string;
    rating?: number;
    ratingsCount?: number;
  }
  