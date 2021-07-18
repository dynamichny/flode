import { CategoriesActions } from '../actions/categories';

const initialValues = {
  items: [],
};

export default (state = initialValues, actions) => {
  switch (actions.type) {
    case CategoriesActions.GET_CATEGORIES:
      return {
        ...state,
        items: actions.data,
      };
  }
  return state;
};
