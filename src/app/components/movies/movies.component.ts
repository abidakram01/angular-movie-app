import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  discover_movies_data: any;
  top_rated_movies_data: any;
  upcoming_movies: any;
  now_playing_movies: any;
  responsiveOptions;

  // page = 1;
  // length;
  // pageSize = 12;

  constructor(private _movies: MoviesService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit() {
    this.discoverMovies();
    this.topRatedMovies();
    this.nowPlaingMovies();
    this.upComingMovies();
  }

  discoverMovies() {
    this._movies.getdiscoverMovies().subscribe((res: any) => {
      this.discover_movies_data = res.results;
    })
  }

  topRatedMovies() {
    this._movies.gettopRatedMovies().subscribe((res: any) => {
      this.top_rated_movies_data = res.results;

    })
  }

  upComingMovies() {
    this._movies.getupComingMovies().subscribe((res: any) => {
      this.upcoming_movies = res.results;

    })
  }

  nowPlaingMovies() {
    this._movies.getnowPlayingMovies().subscribe((res: any) => {
      this.now_playing_movies = res.results;

    })
  }

  // pageChange(event) {
  //   this.page = event.pageIndex + 1;
  //   this.discoverMovies();
  // }
}
