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
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.5s', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideDownAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.5s', style({ transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('0.5s', style({ transform: 'translateY(-100%)' }))
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
