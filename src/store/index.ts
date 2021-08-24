import { createStore, combineReducers, applyMiddleware } from 'redux';
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

const middlewares = [
  thunk
];

if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  middlewares.push(createDebugger());
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
