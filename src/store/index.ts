import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import cookbookReducer from './reducers/cookbook';

const appReducer = combineReducers({
  auth: authReducer,
  cookbook: cookbookReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'DESTROY_SESSION') state = undefined;
  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);