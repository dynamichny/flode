import firestore from '@react-native-firebase/firestore';

export enum CookbookActions {
  GET_LIST = 'GET_LIST',
}

export const getUserCollection = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  try {
    const list = await firestore()
      .collection('cookbooks')
      .where('user_id', '==', userId)
      .get();
    const data = [
      ...list.docs.map(x => ({
        ...Object.values(x._data),
      })),
    ];
    console.log(data);
    dispatch({ type: CookbookActions.GET_LIST, data });
  } catch (e) {
    console.log(e);
  }
};
