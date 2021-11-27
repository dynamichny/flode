import { createSelector } from 'reselect';

import { RootState } from '../../rootReducer';
import { CookbookData } from './cookbookReducer';

type CookbookState = Pick<RootState, 'cookbook'>;

export const cookbookState = (state: CookbookState) => state.cookbook;

export const cookbookDataState = createSelector(
  cookbookState,
  (categories: CookbookData) => categories.data,
);
