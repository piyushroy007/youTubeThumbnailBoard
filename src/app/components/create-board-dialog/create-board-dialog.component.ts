import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
})
export class CreateBoardDialogComponent {
  @Output() create = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  boardName: string = '';

  onSubmit() {
    if (this.boardName.trim()) {
      this.create.emit(this.boardName.trim());
      this.boardName = '';
    }
  }

  onCancel() {
    this.cancel.emit();
    this.boardName = '';
  }
}
