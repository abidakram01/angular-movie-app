import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-movies-info',
  templateUrl: './movies-info.component.html',
  styleUrl: './movies-info.component.scss'
})
export class MoviesInfoComponent implements OnInit {
  public id!: number;
  movie_data: any;
  external_data: any;
  activeTab: string = 'overview';
  video_data: any;
  videos: any[] = [];
  filteredVideos: any[] = [];
  videoTypes: string[] = [];

  constructor(private apiService: ApiService, private router: ActivatedRoute,) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.getMovieInfo(this.id);
      this.getMovieVideos(this.id);
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
}