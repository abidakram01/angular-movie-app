import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  moviesSlider: any[] = [];
  tvSlider: any[] = [];
  movies_data: any[] = [];


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchTrendingContent('movie', 1, 'movies');
    this.fetchTrendingContent('tv', 1, 'tvShows');
    this.getNowPlaying('movie', 1);
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

  fetchTrendingContent(media: string, page: number, type: string): void {
    this.apiService.getTrending(media, page).subscribe(
      response => {
        if (type === 'movies') {
          this.moviesSlider = response.results.map((item: any) => ({
            link: `/movie/${item.id}`,
            imgSrc: `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}`,
            title: item.title,
            rating: item.vote_average * 10,
            vote: item.vote_average
          }));
        } else if (type === 'tvShows') {
          this.tvSlider = response.results.map((item: any) => ({
            link: `/tv/${item.id}`,
            imgSrc: `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}`,
            title: item.name,
            rating: item.vote_average * 10,
            vote: item.vote_average
          }));
        }
      },
      error => {
        console.error(`Error fetching trending ${type}:`, error);
      }
    );
  }



}
