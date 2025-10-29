import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Book, BooksResponse } from '../models/book/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  loading = signal(false);

  constructor(private http: HttpClient) {}

  searchBooks(query: string, filter: string = 'all'): Observable<Book[]> {
    this.loading.set(true);
    let searchQuery = query || 'bestsellers';
    
    if (filter !== 'all' && query) {
      const filterMap: { [key: string]: string } = {
        'author': 'inauthor:',
        'title': 'intitle:',
        'genre': 'subject:'
      };
      searchQuery = `${filterMap[filter]}${query}`;
    }

    // Hacer múltiples requests para obtener más libros
    const requests: Observable<BooksResponse>[] = [];
    const maxResults = 40;
    const totalRequests = 5; 

    for (let i = 0; i < totalRequests; i++) {
      const startIndex = i * maxResults;
      requests.push(
        this.http.get<BooksResponse>(
          `${this.apiUrl}?q=${encodeURIComponent(searchQuery)}&maxResults=${maxResults}&startIndex=${startIndex}`
        ).pipe(
          catchError(() => of({ items: [], totalItems: 0 }))
        )
      );
    }

    return forkJoin(requests).pipe(
      map(responses => {
        const allBooks: Book[] = [];
        responses.forEach(response => {
          if (response.items) {
            allBooks.push(...response.items);
          }
        });
        this.loading.set(false);
        return allBooks;
      }),
      catchError(() => {
        this.loading.set(false);
        return of([]);
      })
    );
  }

  getBookById(id: string): Observable<Book> {
    this.loading.set(true);
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }
}