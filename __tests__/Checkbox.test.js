import React from 'react';
import { render } from '@testing-library/react-native';

import Checkbox from '../src/components/atoms/Checkbox/Checkbox';

describe('Checkbox', () => {
  it('renders element', () => {
    render(<Checkbox checked={false} />);
  });
});
