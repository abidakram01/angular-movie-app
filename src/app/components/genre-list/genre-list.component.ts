import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/service/movies.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {

  genres:any;

  constructor(
    private _movie: MoviesService
  ) { }

  ngOnInit() {
    this.genreList();
  }
  
  genreList(){
    this._movie.getGenres().subscribe((res: any) => {
      this.genres = res.genres
    })
  }

}
