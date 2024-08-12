import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { delay } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  moviesSlider: any[] = [];
  tvSlider: any[] = [];
  movies_data: any[] = [];


  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.fetchTrendingContent('movie', 1, 'movies');
    this.fetchTrendingContent('tv', 1, 'tvShows');
    this.getNowPlaying('movie', 1);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  // Slider Data
  getNowPlaying(mediaType: 'movie', page: number) {
  this.apiService.getNowPlaying(mediaType, page).pipe(delay(2000)).subscribe(
    (res: any) => {
      this.movies_data = res.results.map((item: any) => {
        const movieItem = {
          ...item,
          link: `/movie/${item.id}`,
          videoId: '' // Initialize with an empty string
        };

        // Fetch the trailer video key for each movie
        this.apiService.getYouTubeVideo(item.id, 'movie').subscribe(
          (videoRes: any) => {
            const video = videoRes.results.find((vid: any) => vid.site === 'YouTube' && vid.type === 'Trailer');
            if (video) {
              movieItem.videoId = video.key; // Set the video key if available
            }
          },
          videoError => {
            console.error('Error fetching YouTube video for Movie:', videoError);
          }
        );

        return movieItem;
      });
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
            imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
            title: item.title,
            rating: item.vote_average * 10,
            vote: item.vote_average
          }));
        } else if (type === 'tvShows') {
          this.tvSlider = response.results.map((item: any) => ({
            link: `/tv/${item.id}`,
            imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
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
