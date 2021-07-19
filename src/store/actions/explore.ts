import firestore from '@react-native-firebase/firestore';

import * as categoriesActions from './categories';

export enum ExploreActions {
  GET_EXPLORE_LIST = 'GET_EXPLORE_LIST',
}

export const getItems = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  await dispatch(categoriesActions.getCategories());
  const categories = getState().categories.items;
  try {
    const list = await firestore()
      .collection('cookbooks')
      .where('user_id', '!=', userId)
      .get();
    const data = [
      ...list.docs.map(x => ({
        ...x._data,
        id: x._ref._documentPath._parts.pop(),
      })),
    ];

    const datac = data.map(item => ({
      ...item,
      categories: item.categories.map((category: string) =>
        categories.find(c => c.id === category),
      ),
    }));

    //imitating searching on front, firebase dont support such actions
    const filteredData = datac.sort(
      (a, b) => new Date(b.creationDate) - new Date(a.creationDate),
    );

    dispatch({
      type: ExploreActions.GET_EXPLORE_LIST,
      data: filteredData,
    });
  } catch (e) {
    console.log(e);
  }
};
