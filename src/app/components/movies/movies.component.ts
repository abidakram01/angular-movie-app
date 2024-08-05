import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  hero: any;
  id: number | undefined; // Hardcoded id for testing

  movieCategories: { [key: string]: any[] } = {
    nowPlayingMovies: [],
    popularMovies: [],
    upcomingMovies: [],
    topRatedMovies: [],
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadMovies();

    this.route.params.subscribe((params: Params) => {
      console.log('Route params:', params); // Log the route params
      this.id = +params['id']; // Extract id from route parameters and convert to number
      console.log('Extracted id:', this.id); // Log the extracted id
      if (this.id) {
        this.getSingleMoviesDetails(this.id);
      }
    });
  }

  getSingleMoviesDetails(id: number): void {
    this.apiService.getMovie(id).subscribe(
      (res: any) => {
        this.hero = res;
        console.log('Movie data:', res);
      },
      (error) => {
        console.error('Error fetching movie data:', error);
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
      }
    );
  }
}
