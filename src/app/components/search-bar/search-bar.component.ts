import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchParams } from '../../models//book/book.model';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery = signal('');
  selectedFilter = signal('all');
  selectedSort = signal('none');

  searchChanged = output<SearchParams>();
  sortChanged = output<string>();

  filters = [
    { value: 'all', label: 'Todos' },
    { value: 'title', label: 'Título' },
    { value: 'author', label: 'Autor' },
    { value: 'genre', label: 'Género' }
  ];

  sortOptions = [
    { value: 'none', label: 'Sin ordenar' },
    { value: 'title-asc', label: 'Título (A-Z)' },
    { value: 'title-desc', label: 'Título (Z-A)' },
    { value: 'rating-desc', label: 'Calificación (Mayor a Menor)' },
    { value: 'rating-asc', label: 'Calificación (Menor a Mayor)' }
  ];

  onSearch() {
    this.searchChanged.emit({
      query: this.searchQuery(),
      filter: this.selectedFilter()
    });
  }

  onFilterChange() {
    if (this.searchQuery()) {
      this.onSearch();
    }
  }

  onSortChange() {
    this.sortChanged.emit(this.selectedSort());
  }
}