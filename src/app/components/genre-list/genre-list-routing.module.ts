import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenreListComponent } from './genre-list.component';

const routes: Routes = [{ path: '', component: GenreListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreListRoutingModule { }
