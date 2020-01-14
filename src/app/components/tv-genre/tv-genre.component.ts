import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/service/movies.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tv-genre',
  templateUrl: './tv-genre.component.html',
  styleUrls: ['./tv-genre.component.scss']
})
export class TvGenreComponent implements OnInit {

  _tv: Object;
  title: string;
  public id: number;

  constructor(
    private _movie: MoviesService,
    private _router: ActivatedRoute

  ) { }

  ngOnInit() {
    this._router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getTvByGenre(this.id);
    });
  }

  getTvByGenre(id) {
    this._movie.getTvByGenre(id).subscribe((res: any) => {
        this._tv = res.results;
        console.log(this._tv)
    });
  }

}
