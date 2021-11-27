import { createAsyncAction } from 'typesafe-actions';

import { Category } from '_types';

export const getCategoriesAsync = createAsyncAction(
  'CATEGORIES_REQUEST',
  'CATEGORIES_SUCCESS',
  'CATEGORIES_FAILURE',
)<void, Category[], any>();
