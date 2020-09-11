import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/service/tv.service';
import { delay } from 'rxjs/internal/operators/delay';


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
  responsiveOptions;
  loader = true;

  constructor(
    private tvService: TvService
  ) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   }

  ngOnInit() {
    this.PopularTvShows(1);
    this.TopRatedTVShows(1);
    this.CurrentlyAiringTVShows(1);
    this.TVShowsAiringToday(1);
  }

  PopularTvShows(page: number) {
    this.tvService.getPopularTVShow(page).pipe(delay(2000)).subscribe((res: any) => {
      this.popular_data = res.results;
      this.loader = false;
    });
  }

  TopRatedTVShows(page: number) {
    this.tvService.getTopRatedTVShows(page).pipe(delay(2000)).subscribe((res: any) => {
      this.top_rated_tv = res.results;
      this.loader = false;
    });
  }

  CurrentlyAiringTVShows(page: number) {
    this.tvService.getTvOnTheAir(page).pipe(delay(2000)).subscribe((res: any) => {
      this.airing_tv = res.results;
      this.loader = false;
    });
  }

  TVShowsAiringToday(page: number) {
    this.tvService.getTVAiringToday(page).pipe(delay(2000)).subscribe((res: any) => {
      this.tv_show_airing_today = res.results;
      this.loader = false;
    });
  }

}
