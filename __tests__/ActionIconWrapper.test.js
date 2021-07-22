import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import ActionIconWrapper from '../src/components/atoms/ActionIconWrapper/ActionIconWrapper';

const CHILDREN_TEXT = 'test_child';

const MockElement = ({ onPress, ...rest }) => (
  <ActionIconWrapper onPress={onPress} {...rest}>
    <Text>{CHILDREN_TEXT}</Text>
  </ActionIconWrapper>
);

describe('ActionIconWrapper', () => {
  it('renders element', () => {
    render(<MockElement onPress={() => {}} />);
  });

  it('should render with child', () => {
    const { getByText } = render(<MockElement onPress={() => {}} />);
    expect(getByText(CHILDREN_TEXT)).toBeDefined();
  });

  it('should fire onPress event', () => {
    const onEventMock = jest.fn();
    const { getByTestId } = render(
      <MockElement onPress={onEventMock} testID={'actionButton'} />,
    );
    fireEvent.press(getByTestId('actionButton'));
    expect(onEventMock).toHaveBeenCalled();
  });
});
