import { CookbookActions } from '../actions/cookbook';
import { Recepie } from '_types';

const initialValues = {
  items: [],
} as {
  items: Recepie[];
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
