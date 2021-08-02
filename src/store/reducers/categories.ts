import { CategoriesActions } from '../actions/categories';
import { Category } from '_types';

const initialValues = {
  items: [],
} as {
  items: Category[];
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
