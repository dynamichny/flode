import { createReducer } from 'typesafe-actions';

import { Recepie } from '_types';

import { getUserCollectionAsync } from './cookbookActions';

export type CookbookData = {
  data: Recepie[];
  type: string;
};

const initialValues = {
  data: [],
  type: 'NotRequested',
} as CookbookData;

const cookbookReducer = createReducer<
  CookbookData,
  { type: string; payload: string | Recepie[] | Recepie | any }
>(initialValues)
  .handleAction(getUserCollectionAsync.request, state => ({
    ...state,
    type: 'Requested',
  }))
  .handleAction(getUserCollectionAsync.success, (state, { payload }) => ({
    ...state,
    data: payload,
    type: 'Success',
  }))
  .handleAction(getUserCollectionAsync.failure, state => ({
    ...state,
    type: 'Failure',
  }));

export default cookbookReducer;
