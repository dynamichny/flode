import { createReducer } from 'typesafe-actions';

import { Category } from '_types';

import { getCategoriesAsync } from './categoriesActions';

export type CategoriesData = {
  data: Category[];
  type: string;
};

const initialValues = {
  data: [],
  type: 'NotRequested',
} as CategoriesData;

const categoriesReducer = createReducer<
  CategoriesData,
  { type: string; payload: Category[] | any | void }
>(initialValues)
  .handleAction(getCategoriesAsync.request, state => ({
    ...state,
    type: 'Requested',
  }))
  .handleAction(getCategoriesAsync.success, (state, { payload }) => ({
    ...state,
    data: payload,
    type: 'Success',
  }))
  .handleAction(getCategoriesAsync.failure, state => ({
    ...state,
    type: 'Failure',
  }));

export default categoriesReducer;
