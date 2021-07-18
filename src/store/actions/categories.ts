import firestore from '@react-native-firebase/firestore';

export enum CategoriesActions {
  GET_CATEGORIES = 'GET_CATEGORIES',
}

export const getCategories = () => async dispatch => {
  try {
    const list = await firestore().collection('categories').get();
    const data = [
      ...list.docs.map(x => ({
        ...x._data,
        id: x._ref._documentPath._parts.pop(),
      })),
    ];

    dispatch({
      type: CategoriesActions.GET_CATEGORIES,
      data,
    });
  } catch (e) {
    console.log(e);
  }
};
