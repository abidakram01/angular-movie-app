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
  isLoading: boolean = false;
  page: number = 1;
  genre_data: any[] = [];
  type: 'tv' | 'movie' = 'movie';
  id!: number;
  genreName!: string; // Store the genre name separately
  genreList: any;
  genre: any;
  title!: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.type = params['type'];
      this.page = 1;
      this.genre_data = [];
      this.loadInitialData(this.type, this.id);
    });
  }

  async loadInitialData(type: string, id: number) {
    this.spinner.show();
    this.isLoading = true;
    try {
      const [items, genres] = await Promise.all([
        this.apiService.getMediaByGenre(type, id, this.page).toPromise(),
        this.apiService.getGenreList(type).toPromise()
      ]);

      this.genreList = genres.genres;
      this.genre = this.genreList.find((g: any) => g.id === id);

      if (!this.genre) {
        console.error('Page not found');
        return;
      }

      this.genreName = this.genre.name; // Store genre name directly
      this.title = `${type === 'movie' ? 'Movie' : 'TV'} Genre: ${this.genreName}`;
      
      this.genre_data = items.results.map((item: any) => ({
        link: `/${type}/${item.id}`, // Dynamic link based on type
        imgSrc: `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}`,
        title: item.title || item.name,
        rating: item.vote_average * 10,
        vote: item.vote_average,
      }));
      this.page = items.page;
    } catch (error) {
      console.error('Data not available', error);
    } finally {
      this.spinner.hide();
      this.isLoading = false;
    }
  }

  loadMoreMovies() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.apiService.getMediaByGenre(this.type, this.id, this.page + 1).subscribe(
      (response) => {
        this.genre_data.push(...response.results.map((item: any) => ({
          link: `/${this.type}/${item.id}`, // Dynamic link based on type
          imgSrc: `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}`,
          title: item.title || item.name,
          rating: item.vote_average * 10,
          vote: item.vote_average,
        })));
        this.page = response.page;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading more items:', error);
        this.isLoading = false;
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos > max - 100 && !this.isLoading) {
      this.loadMoreMovies();
    }
  }
}
