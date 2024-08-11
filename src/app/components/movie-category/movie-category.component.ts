import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movie-category',
  templateUrl: './movie-category.component.html',
  styleUrls: ['./movie-category.component.scss']
})
export class MovieCategoryComponent implements OnInit {

  category!: string;
  page: number = 1;
  isLoading: boolean = false;
  movieCategories: { [key: string]: any[] } = {
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    nowPlayingMovies: [],
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();

    this.route.url.subscribe(url => {
      this.category = url[2].path;
      this.page = 1;
      this.loadCategoryMovies(this.category);
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  loadCategoryMovies(category: string) {
    this.fetchMovies(category, this.getCategoryProperty(category));
  }

  fetchMovies(category: string, property: string): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.apiService.getCategory(category, this.page, 'movie').subscribe(
      (response) => {
        const results = response.results;
        for (const item of results) {
          const movie = {
            link: `/movie/${item.id}`,
            imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
            title: item.title,
            rating: item.vote_average * 10,
            vote: item.vote_average,
          };
          this.movieCategories[property].push(movie);
        }
        this.isLoading = false;
        this.page++;
      },
      (error) => {
        console.error(`Error fetching ${category} movies:`, error);
        this.isLoading = false;
      }
    );
  }

  getCategoryProperty(category: string): string {
    switch (category) {
      case 'popular':
        return 'popularMovies';
      case 'top_rated':
        return 'topRatedMovies';
      case 'upcoming':
        return 'upcomingMovies';
      case 'now_playing':
        return 'nowPlayingMovies';
      default:
        return '';
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight || document.body.scrollHeight;
    
    if (pos > max - 100) {
      this.loadCategoryMovies(this.category);
    }
  }
}
