import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TvShowsComponent } from './tv-shows.component';


const routes: Routes = [
  {
    path: '',
    component: TvShowsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowsRoutingModule { }
