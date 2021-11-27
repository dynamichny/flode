import React from 'react';
import { Provider } from 'react-redux';

import store from '../store';

const withStore =
  (Component: React.ComponentType) => (passThroughProps: React.Attributes) =>
    (
      <Provider store={store}>
        <Component {...passThroughProps} />
      </Provider>
    );

export default withStore;
