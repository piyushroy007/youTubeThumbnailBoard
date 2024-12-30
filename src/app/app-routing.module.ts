import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThumbnailBoardComponent } from './components/thumbnail-board/thumbnail-board.component';

const routes: Routes = [
  { path: '', redirectTo: '/board/default', pathMatch: 'full' },
  { path: 'board/:id', component: ThumbnailBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
