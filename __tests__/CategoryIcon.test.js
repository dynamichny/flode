import React from 'react';
import { render } from '@testing-library/react-native';

import CategoryIcon from '../src/components/atoms/CategoryIcon/CategoryIcon';

const EMOTE = '🎈';

describe('CategoryIcon', () => {
  it('renders element', () => {
    render(<CategoryIcon index={0} color={'#fff'} emote={EMOTE} />);
  });
  it('renders element with propper emote', () => {
    const { getByText } = render(
      <CategoryIcon index={0} color={'#fff'} emote={EMOTE} />,
    );
    expect(getByText(EMOTE)).toBeDefined();
  });
});
