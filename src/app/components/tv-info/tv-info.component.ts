import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tv-info',
  templateUrl: './tv-info.component.html',
  styleUrl: './tv-info.component.scss'
})
export class TvInfoComponent {
  id!: number;
  tv_data: any;
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

  constructor(private apiService: ApiService, private router: ActivatedRoute, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.spinner.show();
      this.id = +params['id'];
      this.getTvInfo(this.id);
      this.getTvVideos(this.id);
      this.getTvBackdrop(this.id);
      this.getMovieCast(this.id);
      this.getTvRecommended(this.id, 1); 
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    });
    
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getTvInfo(id: number) {
    this.apiService.getTvShow(id).subscribe((result: any) => {
      this.tv_data = result;
      this.getExternal(id);
    });
  }

  getExternal(id: number) {
    this.apiService.geTvExternalId(id).subscribe((result: any) => {
      this.external_data = result;
    });
  }

  getTvVideos(id: number) {
    this.apiService.getTvYouTubeVideo(id).subscribe((res: any) => {
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

  getTvBackdrop(id: number) {
    this.apiService.getTvBackdrops(this.id).subscribe((res) => {
      this.backdrops = res.backdrops || [];
      this.posters = res.posters || [];
    });
  }

  getMovieCast(id: number) {
    this.apiService.getCredits(id, 'tv').subscribe(
      (res: any) => {
        this.cast_data = res.cast.map((item: any) => ({
          link: `/person/${item.id}`,
          imgSrc: item.profile_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.profile_path}` : null,
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

  getTvRecommended(id: number, page: number) {
    this.apiService.getTvShowRecommended(id, page).subscribe(
      (res: any) => {
        this.recom_data = res.results.map((item: any) => ({
          link: `/tv/${item.id}`,
          imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
          title: item.name,
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
