import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movies-info',
  templateUrl: './movies-info.component.html',
  styleUrls: ['./movies-info.component.scss']
})
export class MoviesInfoComponent implements OnInit {
  id!: number;
  movie_data: any;
  external_data: any;
  activeTab: string = 'overview';
  videos: any[] = [];
  videoTypes: string[] = [];
  backdrops: any[] = [];
  posters: any[] = [];
  cast_data: any;
  recom_data: any[] = [];
  person_data: any;
  type: 'movie' = 'movie';


  constructor(private apiService: ApiService, private router: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.spinner.show();
      this.id = +params['id'];
      this.getMovieInfo(this.id);
      this.getMovieVideos(this.id);
      this.getMoviesBackdrop(this.id);
      this.getMovieCast(this.id);
      this.getMovieRecommended(this.id, 1);
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getMovieInfo(id: number) {
    this.apiService.getMovie(id).subscribe((result: any) => {
      this.movie_data = result;

      // Fetch YouTube trailer video
      this.apiService.getYouTubeVideo(id, 'movie').subscribe(
        (videoRes: any) => {
          const video = videoRes.results.find((vid: any) => vid.site === 'YouTube' && ['Trailer', 'Teaser', 'Clip'].includes(vid.type));
          if (video) {
            this.movie_data.videoId = video.key; // Set the video key in movie_data
          } else {
            console.warn('No trailer or relevant video found for this movie.');
          }
        },
        videoError => {
          console.error('Error fetching YouTube video:', videoError);
        }
      );

      this.getExternal(id);
    });
  }

  getExternal(id: number) {
    this.apiService.getExternalId(id, 'movie').subscribe((result: any) => {
      this.external_data = result;
    });
  }

  getMovieVideos(id: number) {
    this.apiService.getYouTubeVideo(id, 'movie').subscribe((res: any) => {
      this.videos = res.results;
    });
  }

  getMoviesBackdrop(id: number) {
    this.apiService.getBackdrops(id, 'movie').subscribe((res: any) => {
      this.backdrops = res.backdrops;
      this.posters = [];
      res.posters.forEach((poster: { file_path: string; }) => {
        this.posters.push({
          ...poster,
          full_path: `https://image.tmdb.org/t/p/w342${poster.file_path}`
        });
      });
    });
  }

  getMovieCast(id: number) {
    this.apiService.getCredits(id, 'movie').subscribe(
      (res: any) => {
        this.cast_data = [];
        for (let item of res.cast) {
          this.cast_data.push({
            link: `/person/${item.id}`,
            imgSrc: item.profile_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.profile_path}` : null,
            name: item.name,
            character: item.character,
            popularity: item.popularity,
          });
        }
      },
      error => {
        console.error('Error fetching credits data', error);
      }
    );
  }

  getMovieRecommended(id: number, page: number) {
    this.apiService.getRecommended(id, page, 'movie').subscribe(
      (res: any) => {
        this.recom_data = res.results.map((item: any) => ({
          link: `/movie/${item.id}`,
          imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
          title: item.title,
          vote: item.vote_average ? item.vote_average : 'N/A',
          rating: item.vote_average ? item.vote_average * 10 : 'N/A',
        }));
      },
      error => {
        console.error('Error fetching recommended movies data', error);
      }
    );
  }


}
