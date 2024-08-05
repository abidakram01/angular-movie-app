import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectSearchFeature = (state: AppState) => state.search;

export const selectSearchOpen = createSelector(
  selectSearchFeature,
  (state) => state.searchOpen
);
