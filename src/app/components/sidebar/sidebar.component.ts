import { Component } from '@angular/core';
import { BoardService, Board } from '../../services/board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  categories = ['Home', 'Trending'];
  boards!: Board[];

  showCreateDialog = false;

  constructor(public boardService: BoardService, private router: Router) {}

  openCreateDialog() {
    this.showCreateDialog = true;
  }

  closeCreateDialog() {
    this.showCreateDialog = false;
  }

  createNewBoard($event: string) {
    console.log('event : ', $event);
    const newBoard = this.boardService.createBoard($event);
    this.closeCreateDialog();
    this.router.navigate(['/board', newBoard.id]);
  }
}
