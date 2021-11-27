import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import categoriesReducer from './ducks/Categories/categoriesReducer';
import cookbookReducer from './ducks/Cookbook/cookbookReducer';

const appReducer = combineReducers({
  cookbook: cookbookReducer,
  categories: categoriesReducer,
});

const rootReducer: typeof appReducer = (state, action) => {
  if (action.type === 'DESTROY_SESSION') state = undefined;
  return appReducer(state, action);
};

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
