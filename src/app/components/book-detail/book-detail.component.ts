import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models//book/book.model';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  private booksService = inject(BooksService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  book = signal<Book | null>(null);
  loading = signal(true);

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.loadBookDetail(bookId);
    }
  }

  loadBookDetail(id: string) {
    this.loading.set(true);
    this.booksService.getBookById(id).subscribe({
      next: (book) => {
        this.book.set(book);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  getBookImage(): string {
    const book = this.book();
    if (!book) return '';
    
    // Buscar la imagen de mayor calidad disponible
    const images = book.volumeInfo.imageLinks;
    if (!images) {
      return 'https://via.placeholder.com/500x750?text=No+Image';
    }

    // Priorizar imágenes de mayor calidad y usar http en lugar de https para evitar errores
    let imageUrl = images.extraLarge || 
                   images.large || 
                   images.medium || 
                   images.small || 
                   images.thumbnail || 
                   images.smallThumbnail ||
                   'https://via.placeholder.com/500x750?text=No+Image';

    // Reemplazar zoom=1 con zoom=0 para obtener imagen de mayor resolución
    // y cambiar http a https si es necesario
    if (imageUrl.includes('books.google.com')) {
      imageUrl = imageUrl.replace('http://', 'https://');
      imageUrl = imageUrl.replace('zoom=1', 'zoom=2');
      imageUrl = imageUrl.replace('&edge=curl', '');
    }

    return imageUrl;
  }

  getAuthors(): string {
    const book = this.book();
    return book?.volumeInfo.authors?.join(', ') || 'Autor desconocido';
  }

  getCategories(): string {
    const book = this.book();
    return book?.volumeInfo.categories?.join(', ') || 'Sin categoría';
  }

  openPreview() {
    const book = this.book();
    if (book?.volumeInfo.previewLink) {
      window.open(book.volumeInfo.previewLink, '_blank');
    }
  }
}
