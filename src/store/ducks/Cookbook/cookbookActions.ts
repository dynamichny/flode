import { createAsyncAction } from 'typesafe-actions';

import { Recepie } from '_types';

export const getUserCollectionAsync = createAsyncAction(
  'USER_COLLECTION_REQUEST',
  'USER_COLLECTION_SUCCESS',
  'USER_COLLECTION_FAILURE',
)<string, Recepie[], any>();

export const addItemToCollecitonAsync = createAsyncAction(
  'ADD_ITEM_TO_COLLECITON_REQUEST',
  'ADD_ITEM_TO_COLLECITON_SUCCESS',
  'ADD_ITEM_TO_COLLECITON_FAILURE',
)<Recepie, void, any>();
