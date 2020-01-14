import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/service/movies.service';


@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {
  popular_data: any;
  top_rated_tv: any;
  airing_tv: any;
  tv_show_airing_today: any;

  constructor(
    private _movies: MoviesService
  ) {  
   }

  ngOnInit() {
    this.PopularTvShows();
    this.TopRatedTVShows();
    this.CurrentlyAiringTVShows();
    this.TVShowsAiringToday();
  }

  PopularTvShows() {
    this._movies.getPopularTvShows().subscribe((res: any) => {
      this.popular_data = res.results;
      console.log(res)
    })
  }

  TopRatedTVShows() {
    this._movies.getTopRatedTvShows().subscribe((res: any) => {
      this.top_rated_tv = res.results;

    })
  }

  CurrentlyAiringTVShows() {
    this._movies.getAiringTvShows().subscribe((res: any) => {
      this.airing_tv = res.results;
    })
  }

  TVShowsAiringToday() {
    this._movies.TvShowsAiringToday().subscribe((res: any) => {
      this.tv_show_airing_today = res.results;

    })
  }

}
