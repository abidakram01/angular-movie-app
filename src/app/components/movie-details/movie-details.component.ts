import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MoviesService } from '../../shared/service/movies.service';
import { ActivatedRoute ,Params} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { AppMovieDialogComponent } from '../movie-details/app-movie-dialog/app-movie-dialog.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  public id: number;
  public video: boolean;
  movie: any;
  baseUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  related_video: any;
  casts:any = [];
  _backdrops: any = [];
  _posters:any = []
  _recomend: any = [];
  

  constructor(
    private _movies: MoviesService,
    private _router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
    
  }

  ngOnInit() {
    this._router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getSingleMoviesVideos(this.id);
      this.getSingleMoviesDetails(this.id);
      this.getCast(this.id);
      this.getBackropsImages(this.id);
      this.getRecomendMovie(this.id);
    });
  }

  getSingleMoviesDetails(id){
    this._movies.getMoviesDetails(id).subscribe((res:any) => {
      this.movie = res;
    });
  }

  getSingleMoviesVideos(id) {
    this._movies.getMoviesVideos(id).subscribe((res: any) => {
      if (res.results.length) {
        this.video = res.results[0];
        this.related_video = res.results;
      }
    });
  }

  openDialogMovie(video): void {
    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + video.key + this.autoplay); 
    this.dialog.open(AppMovieDialogComponent, {
      height: '600px',
      width: '900px',
      data: { video: this.video}
    });
  }
  
  getCast(id){
    this._movies.getMovieCredits(id).subscribe((res:any)=>{
      this.casts = res.cast;
    })
  }

  getBackropsImages(id){
    this._movies.getBackdropsImages(id).subscribe((res:any) =>{
      this._backdrops = res.backdrops;
    })
  }

  getRecomendMovie(id){
    this._movies.getRecomendMovies(id).subscribe((res:any) =>{
      this._recomend = res.results;
    })
  }
 
}

