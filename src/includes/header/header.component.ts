import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/service/movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchBarUp;
  leftSidebar;

  searchStr: string;
  movieSearchResults: any =[];
  

  constructor(private _movies: MoviesService) { }

  ngOnInit() {
  }

  searchMovies() {
    this._movies.searchMovies(this.searchStr).subscribe((res: any) => {
      console.log(res.results);
      this.movieSearchResults = res.results;
    });
  }

  moviesEventEmitter(event : boolean) {
    alert(event);
  }

}


