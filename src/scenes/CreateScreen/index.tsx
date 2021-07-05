import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '_styles';

interface Props {}

const CreateScreen = (props: Props) => {
  return (
    <View style={s.wrapper}>
      <Text></Text>
    </View>
  );
};

export default CreateScreen;

const s = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
});
