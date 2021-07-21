import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { Input } from '_atoms';
import { Formik } from 'formik';

it('renders default elements', () => {
  const { getByText } = render(
    <Input
      label="Label"
      value={''}
      onChangeText={() => {}}
      onBlur={() => {}}
    />,
  );
  expect(getByText('Label')).toBeDefined();
});

const INITIAL_VALUE = 'apple';

it('should change initial value', async () => {
  const { getByDisplayValue } = render(
    <Formik initialValues={{ name: INITIAL_VALUE }}>
      {({ handleChange, values }) => (
        <Input
          label="Label"
          value={values.name}
          onChangeText={handleChange('name')}
          onBlur={() => {}}
        />
      )}
    </Formik>,
  );
  expect(getByDisplayValue(INITIAL_VALUE)).toBeDefined();
});

it('should fire onChangeText event', () => {
  const onEventMock = jest.fn();
  const { getByTestId } = render(
    <Input
      label="Label"
      value={''}
      onChangeText={onEventMock}
      onBlur={() => {}}
      testID={'input'}
    />,
  );
  fireEvent(getByTestId('input'), 'onChangeText', 'ab');
  expect(onEventMock).toHaveBeenCalledWith('ab');
});

const CHANGE_TEXT = 'content';

it('should change value', async () => {
  const { getByDisplayValue, getByTestId } = render(
    <Formik initialValues={{ name: '' }}>
      {({ handleChange, values }) => (
        <Input
          label="Label"
          value={values.name}
          onChangeText={handleChange('name')}
          onBlur={() => {}}
          testID={'input'}
        />
      )}
    </Formik>,
  );
  await fireEvent.changeText(getByTestId('input'), CHANGE_TEXT);
  await waitFor(() => {
    expect(getByDisplayValue(CHANGE_TEXT)).toBeDefined();
  });
});
