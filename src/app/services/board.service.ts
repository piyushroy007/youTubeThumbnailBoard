import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Thumbnail {
  id: string;
  url: string;
  title: string;
  channelName: string;
  views: string;
  uploadedAt: string;
}

export interface Board {
  id: string;
  name: string;
  thumbnails: Thumbnail[];
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private boards: Board[] = [
    { id: 'default', name: 'Default Board', thumbnails: [] },
  ];
  private currentBoardSubject = new BehaviorSubject<Board>(this.boards[0]);

  constructor() {}

  getBoards(): Board[] {
    return this.boards;
  }

  getCurrentBoard() {
    return this.currentBoardSubject.asObservable();
  }

  setCurrentBoard(boardId: string) {
    const board = this.boards.find((b) => b.id === boardId);
    if (board) {
      this.currentBoardSubject.next(board);
    }
  }

  createBoard(name: string) {
    const newBoard: Board = {
      id: Date.now().toString(),
      name,
      thumbnails: [],
    };
    this.boards.push(newBoard);
    return newBoard;
  }

  addThumbnailToBoard(boardId: string, thumbnail: Thumbnail) {
    const board = this.boards.find((b) => b.id === boardId);
    if (board) {
      board.thumbnails.unshift(thumbnail);
      if (boardId === this.currentBoardSubject.value.id) {
        this.currentBoardSubject.next({ ...board });
      }
    }
  }
}
