import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/service/movies.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  movies: Object;
  title: string;
  public id: number;

  constructor(
    private _movie: MoviesService,
    private _router: ActivatedRoute
  ) { }

  ngOnInit() {
    this._router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getMoviesByGenre(this.id);
    });
  }

  getMoviesByGenre(id) {
    this._movie.getMoviesByGenre(id).subscribe((res: any) => {
        this.movies = res.results;
    });
  }

}
