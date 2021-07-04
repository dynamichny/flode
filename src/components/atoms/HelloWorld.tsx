import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HelloWorld = () => {
  return (
    <View style={s.wrapper}>
      <Text>Hello World</Text>
    </View>
  );
};

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HelloWorld;
