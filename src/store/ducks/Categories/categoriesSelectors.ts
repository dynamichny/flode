import { createSelector } from 'reselect';

import { RootState } from '../../rootReducer';
import { CategoriesData } from './categoriesReducer';

type CategoriesState = Pick<RootState, 'categories'>;

export const categoriesState = (state: CategoriesState) => state.categories;

export const categoriesDataState = createSelector(
  categoriesState,
  (categories: CategoriesData) => categories.data,
);
