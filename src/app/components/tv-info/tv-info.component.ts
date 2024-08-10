import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tv-info',
  templateUrl: './tv-info.component.html',
  styleUrls: ['./tv-info.component.scss'] // Corrected to 'styleUrls'
})
export class TvInfoComponent implements OnInit {
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
  type: 'tv' = 'tv';
  episodes_data: any[] = [];
  selectedSeason: number = 1;
  seasons: any[] = [];

  constructor(private apiService: ApiService, private router: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.spinner.show();
      this.id = +params['id'];
      
      // Use forkJoin to make multiple API calls in parallel
      forkJoin({
        tvInfo: this.apiService.getTvShow(this.id),
        tvVideos: this.apiService.getYouTubeVideo(this.id, 'tv'),
        tvBackdrop: this.apiService.getBackdrops(this.id, 'tv'),
        movieCast: this.apiService.getCredits(this.id, 'tv'),
        tvRecommended: this.apiService.getRecommended(this.id, 1, 'tv')
      }).subscribe(results => {
        this.handleTvInfo(results.tvInfo);
        this.handleTvVideos(results.tvVideos);
        this.handleTvBackdrop(results.tvBackdrop);
        this.handleMovieCast(results.movieCast);
        this.handleTvRecommended(results.tvRecommended);
        this.spinner.hide();
      }, error => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      });
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  handleTvInfo(result: any) {
    this.seasons = result.seasons.filter((season: any) => season.season_number !== 0);
    
    this.selectedSeason = this.seasons.length > 0 ? this.seasons[0].season_number : 1;
    
    this.loadEpisodes(this.id, this.selectedSeason);
    this.tv_data = result;
    this.getExternal(this.id);
  }

  getExternal(id: number) {
    this.apiService.getExternalId(id, 'tv').subscribe((result: any) => {
      this.external_data = result;
    });
  }

  handleTvVideos(res: any) {
    this.video_data = res.results.length ? res.results[0] : null;
    this.videos = res.results;
    this.filteredVideos = this.videos;
    this.videoTypes = ['ALL', ...new Set(this.videos.map(video => video.type))];
  }

  filterVideos(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;
    this.filteredVideos = filterValue === 'ALL'
      ? this.videos
      : this.videos.filter(video => video.type === filterValue);
  }

  handleTvBackdrop(res: any) {
    this.backdrops = res.backdrops || [];
    this.posters = res.posters || [];
  }

  handleMovieCast(res: any) {
    this.cast_data = res.cast.map((item: any) => ({
      link: `/person/${item.id}`,
      imgSrc: item.profile_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.profile_path}` : null,
      name: item.name,
      character: item.character,
      popularity: item.popularity,
    }));
  }

  handleTvRecommended(res: any) {
    this.recom_data = res.results.map((item: any) => ({
      link: `/tv/${item.id}`,
      imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
      title: item.name,
      vote: item.vote_average ? item.vote_average : 'N/A',
      rating: item.vote_average ? item.vote_average * 10 : 'N/A',
    }));
  }

  loadEpisodes(id: number, season: number): void {
    this.apiService.getTvShowEpisodes(id, season)
      .subscribe(
        (data) => {
          this.episodes_data = data.episodes;
        },
        (error) => {
          console.error('Error fetching episodes:', error);
        }
      );
  }

  onSeasonChange(event: any): void {
    const selectedSeason = event.target.value;
    this.loadEpisodes(this.id, selectedSeason);
  }
}
