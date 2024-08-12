import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute , Params} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { AppTvDialogComponent } from './app-tv-dialog/app-tv-dialog.component';
import { TvService } from 'src/app/service/tv.service';


@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.scss']
})

export class TvShowDetailsComponent implements OnInit {

  public id: number;
  public video: boolean;
  episode: any;
  baseUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  related_video: any;
  casts: any;
  backdrop: any;
  _posters: any;
  _recomend: any;
  responsiveOptions;

  constructor(
    private tvService: TvService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
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
    this.router.params.subscribe((params: Params) => {
      this.id = params.id;
      this.getTvDetails(this.id);
      this.getTvVideos(this.id);
      this.getTvCast(this.id);
      this.getTvBackropsImages(this.id);
      this.getRecomendTv(this.id);
    });
  }

  getTvDetails(id) {
    this.tvService.getTVShow(id).subscribe((res: any) => {
      this.episode = res;
    });
  }

  getTvVideos(id) {
    this.tvService.getTvVideos(id).subscribe((res: any) => {
      if (res.results.length) {
        this.video = res.results[0];
        this.related_video = res.results;
      }
    });
  }

  openDialogTv(video): void {
    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + video.key + this.autoplay);
    this.dialog.open(AppTvDialogComponent, {
      height: '600px',
      width: '900px',
      data: { video: this.video}
    });
  }

  getTvCast(id) {
    this.tvService.getMovieCredits(id).subscribe((res: any) => {
      this.casts = res.cast;
    });
  }

  getTvBackropsImages(id) {
    this.tvService.getTvBackdropsImages(id).subscribe((res: any) => {
      this.backdrop = res.backdrops;
    });
  }

  getRecomendTv(id) {
    this.tvService.getRecomendTv(id).subscribe((res: any) => {
      this._recomend = res.results;
    });
  }

}
