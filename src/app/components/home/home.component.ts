import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  moviesSlider: any[] = [];
  tvSlider: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchTrendingContent('movie', 1, 'movies');
    this.fetchTrendingContent('tv', 1, 'tvShows');
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
