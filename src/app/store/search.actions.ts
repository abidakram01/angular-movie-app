import { createAction, props } from '@ngrx/store';

export const toggleSearch = createAction('[Search] Toggle Search');
export const openSearch = createAction('[Search] Open Search');
export const closeSearch = createAction('[Search] Close Search');
export const setFromPage = createAction('[Search] Set From Page', props<{ page: string }>());