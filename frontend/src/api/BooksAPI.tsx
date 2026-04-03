import type { Book } from "../Book";

const BASE_URL = "https://mission13-backend-mw-cgffh7byb9hsendg.francecentral-01.azurewebsites.net/Bookstore";

export type BooksResponse = {
  books: Book[];
  totalNumBooks: number;
};

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortOrder: string = "title_asc",
  category: string = "All"
): Promise<BooksResponse> => {
  const response = await fetch(
    `${BASE_URL}/Books?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}&category=${encodeURIComponent(
      category
    )}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return await response.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/Categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return await response.json();
};

export const addBook = async (newBook: Book): Promise<Book> => {
  const response = await fetch(`${BASE_URL}/AddBook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) {
    throw new Error("Failed to add book");
  }

  return await response.json();
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  const response = await fetch(`${BASE_URL}/UpdateBook/${bookID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  });

  if (!response.ok) {
    throw new Error("Failed to update book");
  }

  return await response.json();
};

export const deleteBook = async (bookID: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/DeleteBook/${bookID}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete book");
  }
};