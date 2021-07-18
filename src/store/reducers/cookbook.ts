import { CookbookActions } from '../actions/cookbook';

const initialValues = {
  items: [],
};

export default (state = initialValues, actions) => {
  switch (actions.type) {
    case CookbookActions.GET_LIST:
      return {
        ...state,
        items: actions.data,
      };
  }
  return state;
};
