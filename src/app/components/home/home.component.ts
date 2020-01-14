import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/service/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  trending_movies: any;
  tv_shows: any
  responsiveOptions;
  responsiveOptions1;

  constructor(
    private _movies: MoviesService,
  ) {
      
  }

  ngOnInit() {
    this.trendingMovies();
    this.tvShow();
  }

  trendingMovies() {
    this._movies.getdiscoverMovies().subscribe((res: any) => {
      this.trending_movies = res.results;
    })
  }

  tvShow() {
    this._movies.getDiscoverTvShows().subscribe((res: any) => {
      this.tv_shows = res.results;
    })
  }

}
