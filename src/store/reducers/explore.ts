import { ExploreActions } from '../actions/explore';
import { Recepie } from '_types';

const initialValues = {
  items: [],
} as {
  items: Recepie[];
};

export default (state = initialValues, actions) => {
  switch (actions.type) {
    case ExploreActions.GET_EXPLORE_LIST:
      return {
        ...state,
        items: actions.data,
      };
  }
  return state;
};
