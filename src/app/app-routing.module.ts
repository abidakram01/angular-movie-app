import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvComponent } from './components/tv/tv.component';
import { MoviesInfoComponent } from './components/movies-info/movies-info.component';
import { TvInfoComponent } from './components/tv-info/tv-info.component';
import { PersonComponent } from './components/person/person.component';
import { MovieCategoryComponent } from './components/movie-category/movie-category.component';
import { TvCategoryComponent } from './components/tv-category/tv-category.component';
import { GenreComponent } from './components/genre/genre.component';
import { SearchComponent } from './components/global/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movie',
    component: MoviesComponent,
  },
  {
    path: 'tv',
    component: TvComponent,
  },
  {
    path: 'movie/:id',
    component: MoviesInfoComponent,
  },
  {
    path: 'tv/:id',
    component: TvInfoComponent,
  },
  {
    path: 'person/:id',
    component: PersonComponent,
  },
  { 
    path: 'movie/category/:category', 
    component: MovieCategoryComponent 
  },
  { 
    path: 'tv/category/:category', 
    component: TvCategoryComponent 
  },
  {
    path: 'genres/:id/:type',
    component: GenreComponent
  },
  {
    path: 'tv/category/:id',
    component: TvCategoryComponent,
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
