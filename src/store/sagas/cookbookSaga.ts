import { all, put, select, takeEvery } from 'redux-saga/effects';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { Category, Recepie } from '_types';
import { randomId } from '_utils';

import { getCategoriesAsync } from '../ducks/Categories/categoriesActions';
import { categoriesDataState } from '../ducks/Categories/categoriesSelectors';
import {
  addItemToCollecitonAsync,
  getUserCollectionAsync,
} from '../ducks/Cookbook/cookbookActions';

function* getUserCollectionSaga(
  action: ReturnType<typeof getUserCollectionAsync.request>,
) {
  const userId = 'userId';
  yield put(getCategoriesAsync.request());
  const categories: Category[] = yield select(categoriesDataState);
  try {
    const cookbooksQuery: FirebaseFirestoreTypes.Query = firestore()
      .collection('cookbooks')
      .where('user_id', '==', userId);

    const cookbooks: FirebaseFirestoreTypes.QuerySnapshot =
      yield cookbooksQuery.get();

    const data: Recepie[] = cookbooks.docs.map(x => ({
      ...x.data(),
      id: x.id,
      categories: x
        .data()
        .categories.map((categoryID: string) =>
          categories.find((c: Category) => c.id === categoryID),
        ),
    }));
    console.log(data);

    const filteredData = data
      .filter(({ title }) =>
        title
          .toLowerCase()
          .match(new RegExp(action.payload.toLowerCase(), 'g')),
      )
      .sort(
        (a: Recepie, b: Recepie) =>
          new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime(),
      );

    yield put(getUserCollectionAsync.success(filteredData));
  } catch (e) {
    yield put(getUserCollectionAsync.failure(e));
  }
}

function* addItemToCollecitonSaga(
  action: ReturnType<typeof addItemToCollecitonAsync.request>,
) {
  const user_id = 'userId';
  const data = action.payload;
  try {
    const storageRef = storage().ref();
    const images_urls: string[] = yield Promise.all(
      data.images.map(async (base64: string) => {
        const name = `${randomId()}.jpg`;
        const fileRef = storageRef.child(`images/${name}`);
        await fileRef.putString(
          base64.replace('data:image/png;base64,', ''),
          'base64',
        );
        const imagePath = await fileRef.getDownloadURL();
        return imagePath;
      }),
    );
    yield firestore()
      .collection('cookbooks')
      .add({
        ...data,
        images: images_urls,
        ingredients: data.ingredients.map(ingredient => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        })),
        steps: data.steps.map(step => step.value),
        creationDate: new Date().toJSON(),
        user_id,
      });
    yield put(getUserCollectionAsync.request(''));
    yield put(addItemToCollecitonAsync.success());
  } catch (e) {
    yield put(addItemToCollecitonAsync.failure(e));
  }
}

function* cookbookSaga() {
  yield all([
    takeEvery(getUserCollectionAsync.request, getUserCollectionSaga),
    takeEvery(addItemToCollecitonAsync.request, addItemToCollecitonSaga),
  ]);
}

export default cookbookSaga;
