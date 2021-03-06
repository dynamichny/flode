import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import Button from '../src/components/atoms/Button/Button';

const LABEL = 'abcd';

describe('Button', () => {
  it('renders element with propper label', () => {
    const { getByText } = render(<Button label={LABEL} onPress={() => {}} />);
    expect(getByText(LABEL)).toBeDefined();
  });

  it('should fire onPress event', () => {
    const onEventMock = jest.fn();
    const { getByTestId } = render(
      <Button label={''} onPress={onEventMock} testID={'button'} />,
    );
    fireEvent.press(getByTestId('button'));
    expect(onEventMock).toHaveBeenCalled();
  });
});
