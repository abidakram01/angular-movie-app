import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvGenreComponent } from './tv-genre.component';

const routes: Routes = [{ path: '', component: TvGenreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvGenreRoutingModule { }
