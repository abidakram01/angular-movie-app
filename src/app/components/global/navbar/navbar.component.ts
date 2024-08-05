import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state'; // Update the path as needed
import * as SearchActions from '../../../store/search.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchOpen$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.searchOpen$ = this.store.pipe(select(state => state.search.searchOpen));
  }

  toggleSearch(): void {
    this.store.dispatch(SearchActions.toggleSearch());
    console.log(SearchActions)
  }
}
