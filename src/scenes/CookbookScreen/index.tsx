import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '_styles';

interface Props {}

const CookbookScreen = (props: Props) => {
  return (
    <View style={s.wrapper}>
      <Text></Text>
    </View>
  );
};

export default CookbookScreen;

const s = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.TERTIARY,
    flex: 1,
  },
});