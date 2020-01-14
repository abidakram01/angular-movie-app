import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MoviesService } from '../../shared/service/movies.service';
import { ActivatedRoute ,Params} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { AppTvDialogComponent } from './app-tv-dialog/app-tv-dialog.component';


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
  related_video:any
  casts: any;
  _backdrops: any;
  _posters: any;
  _recomend: any;

  constructor(
    private _tv: MoviesService,
    private _router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this._router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getTvDetails(this.id);
      this.getTvVideos(this.id);
      this.getTvCast(this.id);
      this.getTvBackropsImages(this.id);
      this.getRecomendTv(this.id);
    });
  }

  getTvDetails(id){
    this._tv.getTvDetails(id).subscribe((res:any) => {
      this.episode = res;  
      console.log(res)
    });
  }

  getTvVideos(id) {
    this._tv.getTvVideos(id).subscribe((res: any) => {
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
    this._tv.getMovieCredits(id).subscribe((res:any)=> {
      this.casts = res.cast;
    })
  }

  getTvBackropsImages(id) {
    this._tv.getTvBackdropsImages(id).subscribe((res:any) => {
      this._backdrops = res.backdrops;
    })
  }

  getRecomendTv(id){
    this._tv.getRecomendTv(id).subscribe((res:any) => {
      this._recomend = res.results;
    })
  }

}
