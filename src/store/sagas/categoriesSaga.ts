import { all, put, takeEvery } from 'redux-saga/effects';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { Category } from '_types';

import { getCategoriesAsync } from '../ducks/Categories/categoriesActions';

function* getCategoriesSaga() {
  try {
    const categoriesRef: FirebaseFirestoreTypes.CollectionReference =
      firestore().collection('categories');
    const categories: FirebaseFirestoreTypes.QuerySnapshot =
      yield categoriesRef.get();

    const data: Category[] = categories.docs.map(x => ({
      ...x.data(),
      id: x.id,
    }));

    console.log({ categories: data });

    yield put(getCategoriesAsync.success(data));
  } catch (e) {
    yield put(getCategoriesAsync.failure(e));
  }
}

function* categoriesSaga() {
  yield all([takeEvery(getCategoriesAsync.request, getCategoriesSaga)]);
}

export default categoriesSaga;
