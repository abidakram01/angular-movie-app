import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/service/movies.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  public id: number;
  person: any;
  person_cast:any = [];

  constructor(
    private _movies: MoviesService,
    private _router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.gerPersonDetails(this.id);
      this.getPersonCastMovie(this.id);
    });
  }

  gerPersonDetails(id) {
    this._movies.getPersonDetail(id).subscribe((result: any) => {
      this.person = result
    })
  }

  getPersonCastMovie(id) {
    this._movies.getPersonCast(id).subscribe((res: any) => {
      this.person_cast = res.cast;
    })
  }


}
