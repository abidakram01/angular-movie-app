import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import * as SearchActions from '../../../store/search.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query: string = '';
  showButton$: Observable<boolean> = new Observable<boolean>();

  @ViewChild('input', { static: false }) inputElement!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.query = this.route.snapshot.queryParams['q'] || '';
    this.showButton$ = this.store.pipe(select(state => state.search.searchOpen));
  }

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus();
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }

  goToRoute() {
    if (this.query) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: this.query },
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigateByUrl(this.route.snapshot.queryParams['fromPage']);
    }
  }

  goBack() {
    this.query = '';
    this.router.navigateByUrl(this.route.snapshot.queryParams['fromPage']);
  }

  unFocus(event: FocusEvent) {
    const target = event.relatedTarget as HTMLElement;
    if (target && !target.classList.contains('search-toggle')) {
      this.query = '';
      this.store.dispatch(SearchActions.closeSearch());
    }
  }
}