import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchQuery: string = '';

  onSearch() {
    console.log('Searching for:', this.searchQuery);
    // Implement search functionality here
  }
}
