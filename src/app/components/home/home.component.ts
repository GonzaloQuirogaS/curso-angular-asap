import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book, SearchParams } from '../../models//book/book.model';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private booksService = inject(BooksService);
  private router = inject(Router);

  allBooks = signal<Book[]>([]);
  currentSort = signal<string>('none');
  loading = signal(false);

  // Computed signal para libros ordenados
  books = computed(() => {
    const books = [...this.allBooks()];
    const sort = this.currentSort();

    switch (sort) {
      case 'title-asc':
        return books.sort((a, b) => 
          a.volumeInfo.title.localeCompare(b.volumeInfo.title)
        );
      
      case 'title-desc':
        return books.sort((a, b) => 
          b.volumeInfo.title.localeCompare(a.volumeInfo.title)
        );
      
      case 'rating-desc':
        return books.sort((a, b) => 
          (b.volumeInfo.averageRating || 0) - (a.volumeInfo.averageRating || 0)
        );
      
      case 'rating-asc':
        return books.sort((a, b) => 
          (a.volumeInfo.averageRating || 0) - (b.volumeInfo.averageRating || 0)
        );
      
      default:
        return books;
    }
  });

  ngOnInit() {
    this.loadBooks('bestsellers', 'all');
  }

  loadBooks(query: string, filter: string) {
    this.loading.set(true);
    this.booksService.searchBooks(query, filter)
      .subscribe({
        next: (books) => {
          this.allBooks.set(books);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        }
      });
  }

  onSearchChanged(params: SearchParams) {
    this.loadBooks(params.query || 'bestsellers', params.filter);
  }

  onSortChanged(sortValue: string) {
    this.currentSort.set(sortValue);
  }

  viewBookDetail(bookId: string) {
    this.router.navigate(['/book', bookId]);
  }

  getBookImage(book: Book): string {
    return book.volumeInfo.imageLinks?.thumbnail || 
           book.volumeInfo.imageLinks?.smallThumbnail || 
           'https://via.placeholder.com/128x192?text=No+Image';
  }

  getAuthors(book: Book): string {
    return book.volumeInfo.authors?.join(', ') || 'Autor desconocido';
  }

  getRating(book: Book): string {
    return book.volumeInfo.averageRating 
      ? `⭐ ${book.volumeInfo.averageRating}` 
      : '';
  }
}
