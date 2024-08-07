import { Component } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { delay } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.scss'
})
export class TvComponent {
  tv_data: any[] = [];
  tvCategories: { [key: string]: any[] } = {
    onTheAir: [],
    popularTv: [],
    airingToday: [],
    topRatedTv: []
  };

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.loadMovies();
    this.getTvDiscover(1);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  loadMovies(): void {
    this.fetchMovies('popular', 'popularTv');
    this.fetchMovies('top_rated', 'topRatedTv');
    this.fetchMovies('on_the_air', 'onTheAir');
    this.fetchMovies('airing_today', 'airingToday');
    
  }

  getTvDiscover(page: number) {
    this.apiService.getTvDiscover(page).pipe(delay(2000)).subscribe(
      (res: any) => {
        this.tv_data = res.results.map((item: any) => ({
          ...item,
          link: `/tv/${item.id}`
        }));
      },
      error => {
        console.error('Error fetching TV discover data', error);
      }
    );
  }

  fetchMovies(category: string, property: string): void {
    this.apiService.getTvCategory(category, 1)
      .subscribe(
        response => {
          this.tvCategories[property] = response.results.map((item: any) => ({
            link: `/tv/${item.id}`,
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
