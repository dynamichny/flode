import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import cookbookReducer from './reducers/cookbook';
import categoriesReducer from './reducers/categories';
import exploreReducer from './reducers/explore';

const appReducer = combineReducers({
  auth: authReducer,
  cookbook: cookbookReducer,
  categories: categoriesReducer,
  explore: exploreReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'DESTROY_SESSION') state = undefined;
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
