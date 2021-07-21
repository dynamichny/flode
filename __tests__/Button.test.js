import React from 'react';
import { render } from '@testing-library/react-native';

import { Button } from '_atoms';

it('renders', () => {
  render(<Button label="test" onPress={() => {}} />);
});
