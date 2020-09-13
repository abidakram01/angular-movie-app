import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/service/tv.service';
import { delay } from 'rxjs/internal/operators/delay';


@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {
  topRatedTv: any;
  responsiveOptions;
  loader = true;
  totalResults: any;
  total_results: any;
  searchRes: any;
  searchStr: string;

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
    this.TopRatedTVShows(1);
  }

  TopRatedTVShows(page: number) {
    this.tvService.getTopRatedTVShows(page).pipe(delay(2000)).subscribe((res: any) => {
      this.topRatedTv = res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    },
    error => console.log(error));
  }

  changePage(event) {
    this.TopRatedTVShows(event.pageIndex + 1);
    this.loader = false;
  }

  searchMovies() {
    this.tvService.searchtv(this.searchStr).subscribe(res => {
      this.searchRes = res.results;
    });
  }

}
