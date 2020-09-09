import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MoviesService } from '../../shared/service/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  trending_movies: any;
  tv_shows: any
  responsiveOptions;
  responsive;

  constructor(
    private _movies: MoviesService,
  ) {
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
