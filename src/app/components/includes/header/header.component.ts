import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchBarUp;
  leftSidebar;

  searchStr: string;
  movieSearchResults: any = [];


  constructor(private movies: MoviesService) { }

  ngOnInit() {
  }


}


