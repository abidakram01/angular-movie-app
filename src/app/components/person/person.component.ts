import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  public id: number;
  person: any;
  // tslint:disable-next-line: variable-name
  person_cast: any = [];

  constructor(
    private movieServices: MoviesService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.gerPersonDetails(this.id);
      this.getPersonCastMovie(this.id);
    });
  }

  gerPersonDetails(id) {
    this.movieServices.getPersonDetail(id).subscribe((result: any) => {
      this.person = result;
    });
  }

  getPersonCastMovie(id) {
    this.movieServices.getPersonCast(id).subscribe((res: any) => {
      this.person_cast = res.cast;
    });
  }

}
