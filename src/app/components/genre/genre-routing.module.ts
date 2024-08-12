import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenreComponent } from './genre.component';

const routes: Routes = [{ path: '', component: GenreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
