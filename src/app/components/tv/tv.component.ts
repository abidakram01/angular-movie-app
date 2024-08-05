import { Component } from '@angular/core';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.scss'
})
export class TvComponent {
  tvCategories: { [key: string]: any[] } = {
    onTheAir: [],
    popularTv: [],
    airingToday: [],
    topRatedTv: []
  };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(): void {
    this.fetchMovies('popular', 'popularTv');
    this.fetchMovies('top_rated', 'topRatedTv');
    this.fetchMovies('on_the_air', 'onTheAir');
    this.fetchMovies('airing_today', 'airingToday');
    
  }

  fetchMovies(category: string, property: string): void {
    this.apiService.getTvCategory(category, 1)
      .subscribe(
        response => {
          this.tvCategories[property] = response.results.map((item: any) => ({
            link: `/movie/${item.id}`,
            imgSrc: `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}`,
            title: item.title,
            rating: item.vote_average * 10,
            vote: item.vote_average
          }));
        },
        error => {
          console.error(`Error fetching ${category} movies:`, error);
        });
  }
}
