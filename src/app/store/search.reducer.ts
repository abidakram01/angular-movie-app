import { Action, createReducer, on } from '@ngrx/store';
import * as SearchActions from './search.actions';

export interface SearchState {
  searchOpen: boolean;
  fromPage: string;
}

export const initialState: SearchState = {
  searchOpen: false,
  fromPage: '/',
};

const _searchReducer = createReducer(
  initialState,
  on(SearchActions.toggleSearch, state => ({
    ...state,
    searchOpen: !state.searchOpen
  })),
  on(SearchActions.openSearch, state => ({
    ...state,
    searchOpen: true
  })),
  on(SearchActions.closeSearch, state => ({
    ...state,
    searchOpen: false
  })),
  on(SearchActions.setFromPage, (state, { page }) => ({
    ...state,
    fromPage: page
  }))
);

export function searchReducer(state: SearchState | undefined, action: Action) {
  return _searchReducer(state, action);
}
