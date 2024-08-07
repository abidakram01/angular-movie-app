import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { selectSearchOpen } from './store/search.selectors';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  searchOpen$!: Observable<boolean>; // Observable for searchOpen

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // Initialize the observable
    this.searchOpen$ = this.store.pipe(select(selectSearchOpen));
  }
}
