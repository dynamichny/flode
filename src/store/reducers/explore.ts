import { ExploreActions } from '../actions/explore';

const initialValues = {
  items: [],
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
