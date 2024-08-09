import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  isLoading: boolean = true;
  page: number = 1;
  genre_data: any[] = [];
  type: 'tv' | 'movies' = 'movies';
  id!: number;
  title!: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.page = 1;
      this.id = +params['id'];
      this.title = params['name'];
      this.fetchMovies(this.type, this.id);

      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    });
  }

  fetchMovies(type: string, id: number): void {
    this.isLoading = true;

    this.apiService.getByGenre(id, type, this.page).subscribe(
      (response) => {
        this.genre_data.push(...response.results.map((item: any) => ({
          link: `/movie/${item.id}`,
          imgSrc: `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}`,
          title: item.title || item.name,
          rating: item.vote_average * 10,
          vote: item.vote_average,
        })));
        console.log(`${type} movies (page ${this.page}):`, response.results);
        this.isLoading = false;
        this.page++;
      },
      (error) => {
        console.error(`Error fetching ${type} movies:`, error);
        this.isLoading = false;
      }
    );
  }

  loadMoreMovies() {
    this.fetchMovies(this.type, this.id);
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight || document.body.scrollHeight;
    
    // Trigger next page load when the user is 100px from the bottom of the page
    if (pos > max - 100 && !this.isLoading) {
      this.loadMoreMovies();
    }
  }
}
