import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit, OnChanges {
  @Input() movieSearchResults: any = [];
  @Output() moviesEventEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.moviesEventEmitter.emit(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.movieSearchResults.currentValue) {
      console.log(this.movieSearchResults)
    }
  }

  routeToMovies(index) {
    this.router.navigate(['/movies', index], {})
  }

}
