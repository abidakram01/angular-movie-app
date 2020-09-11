import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';

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
  loader = true;

  constructor(private movieService: MoviesService) {
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
    this.getDiscoverMovies();
    this.getTopRatedMovies();
    this.getNowPlaingMovies(1);
    this.getUpComingMovies(1);
  }

  getDiscoverMovies() {
    this.movieService.getDiscoverMovies().pipe(delay(2000)).subscribe((res: any) => {
      this.discover_movies_data = res.results;
      this.loader = false;
    });
  }

  getTopRatedMovies() {
    this.movieService.getTopRatedMovies().pipe(delay(2000)).subscribe((res: any) => {
      this.top_rated_movies_data = res.results;
      this.loader = false;
    });
  }

  getUpComingMovies(page: number) {
    this.movieService.getUpComingMovies(page).pipe(delay(2000)).subscribe((res: any) => {
      this.upcoming_movies = res.results;
      this.loader = false;
    });
  }

  getNowPlaingMovies(page: number) {
    this.movieService.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
      this.now_playing_movies = res.results;
      this.loader = false;
    });
  }

}
