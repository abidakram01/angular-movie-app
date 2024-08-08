import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Params } from '@angular/router';

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
  video_data: any;
  videos: any[] = [];
  filteredVideos: any[] = [];
  videoTypes: string[] = [];
  backdrops: any[] = [];
  posters: any[] = [];
  cast_data: any;
  recom_data: any[] = [];

  constructor(private apiService: ApiService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.getMovieInfo(this.id);
      this.getMovieVideos(this.id);
      this.getMoviesBackdrop(this.id);
      this.getMovieCast(this.id);
      this.getMovieRecommended(this.id, 1); 
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getMovieInfo(id: number) {
    this.apiService.getMovie(id).subscribe((result: any) => {
      this.movie_data = result;
      this.getExternal(id);
    });
  }

  getExternal(id: number) {
    this.apiService.getExternalId(id).subscribe((result: any) => {
      this.external_data = result;
    });
  }

  getMovieVideos(id: number) {
    this.apiService.getYouTubeVideo(id).subscribe((res: any) => {
      this.video_data = res.results.length ? res.results[0] : null;
      this.videos = res.results;
      this.filteredVideos = this.videos;
      this.videoTypes = ['ALL', ...new Set(this.videos.map(video => video.type))];
    });
  }

  filterVideos(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;
    this.filteredVideos = filterValue === 'ALL'
      ? this.videos
      : this.videos.filter(video => video.type === filterValue);
  }

  getMoviesBackdrop(id: number) {
    this.apiService.getBackdrops(this.id).subscribe((res) => {
      this.backdrops = res.backdrops || [];
      this.posters = res.posters || [];
    });
  }

  getMovieCast(id: number) {
    this.apiService.getCredits(id, 'movie').subscribe(
      (res: any) => {
        this.cast_data = res.cast.map((item: any) => ({
          link: `/movie/${item.id}`,
          imgSrc: item.profile_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.profile_path}` : 'path/to/default/image', // Replace with a default image path if needed
          name: item.name,
          character: item.character,
          popularity: item.popularity,
        }));
      },
      error => {
        console.error('Error fetching credits data', error);
      }
    );
  }

  getMovieRecommended(id: number, page: number) {
    this.apiService.getMovieRecommended(id, page).subscribe(
      (res: any) => {
        this.recom_data = res.results.map((item: any) => ({
          link: `/movie/${item.id}`,
          imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : 'path/to/default/image', // Replace with a default image path if needed
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
