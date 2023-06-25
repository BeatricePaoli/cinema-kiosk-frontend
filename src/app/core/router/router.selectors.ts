import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectRouter = createFeatureSelector<any>('router');

export const selectQueryParams = createSelector(selectRouter, (state) => {
  return state.state.queryParams;
});

export const selectParams = createSelector(selectRouter, (state) => {
  return state.state.params;
});
