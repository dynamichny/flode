import { all } from 'redux-saga/effects';

import categoriesSaga from './categoriesSaga';
import cookbookSaga from './cookbookSaga';

function* rootSaga() {
  yield all([categoriesSaga(), cookbookSaga()]);
}

export default rootSaga;
