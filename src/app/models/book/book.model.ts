export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
    };
    categories?: string[];
    pageCount?: number;
    language?: string;
    previewLink?: string;
    averageRating?: number;
    ratingsCount?: number;
    printType?: string;
    maturityRating?: string;
  };
}

export interface BooksResponse {
  items: Book[];
  totalItems: number;
}

export interface SearchParams {
  query: string;
  filter: string;
}