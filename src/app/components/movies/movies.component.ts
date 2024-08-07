import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { delay } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  hero: any;
  movies_data: any[] = [];

  movieCategories: { [key: string]: any[] } = {
    nowPlayingMovies: [],
    popularMovies: [],
    upcomingMovies: [],
    topRatedMovies: [],
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    this.loadMovies();
    this.getNowPlaying('movie', 2);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  getNowPlaying(mediaType: 'movie' | 'tv', page: number) {
    this.apiService.getNowPlaying(mediaType, page).pipe(delay(2000)).subscribe(
      (res: any) => {
        if (mediaType === 'movie') {
          this.movies_data = res.results.map((item: any) => ({
            ...item,
            link: `/movie/${item.id}`
          }));
        }
      },
      error => {
        console.error('Error fetching now playing data', error);
      }
    );
  }

  loadMovies(): void {
    this.fetchMovies('now_playing', 'nowPlayingMovies');
    this.fetchMovies('popular', 'popularMovies');
    this.fetchMovies('upcoming', 'upcomingMovies');
    this.fetchMovies('top_rated', 'topRatedMovies');
  }

  fetchMovies(category: string, property: string): void {
    this.apiService.getMoviesCategory(category, 1).subscribe(
      (response) => {
        this.movieCategories[property] = response.results.map((item: any) => ({
          link: `/movie/${item.id}`,
          imgSrc: `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}`,
          title: item.title,
          rating: item.vote_average * 10,
          vote: item.vote_average,
        }));
        console.log(`${category} movies:`, response.results);
      },
      (error) => {
        console.error(`Error fetching ${category} movies:`, error);
      });
  }
  
}
