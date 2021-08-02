import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { randomId } from '_utils';

import * as categoriesActions from './categories';
import { Recepie, Category } from '_types';

export enum CookbookActions {
  GET_LIST = 'GET_LIST',
}

export const getUserCollection =
  (query: string) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    await dispatch(categoriesActions.getCategories());
    const categories = getState().categories.items;
    try {
      const list = await firestore()
        .collection('cookbooks')
        .where('user_id', '==', userId)
        .get();
      const data = <Recepie[]>[
        ...list.docs.map(x => ({
          ...x._data,
          id: x._ref._documentPath._parts.pop(),
          categories: x._data.categories.map((categoryID: string) =>
            categories.find((c: Category) => c.id === categoryID),
          ),
        })),
      ];

      //imitating searching on front, firebase dont support such actions
      const filteredData = data
        .filter(({ title }) =>
          title.toLowerCase().match(new RegExp(query.toLowerCase(), 'g')),
        )
        .sort(
          (a: Recepie, b: Recepie) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime(),
        );

      dispatch({
        type: CookbookActions.GET_LIST,
        data: filteredData,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const addItem = data => async (dispatch, getState) => {
  const user_id = getState().auth.userId;
  try {
    // TODO: change steps obj[] to str[]
    // TODO: handle images upload
    const storageRef = storage().ref();
    const images_urls = await Promise.all(
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
    await firestore()
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
    dispatch(getUserCollection(''));
  } catch (e) {
    console.log(e);
  }
};
