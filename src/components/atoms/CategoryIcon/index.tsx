import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '_styles';

interface Props {
  index: number;
  color: string;
  emote: string;
}

const CategoryIcon = ({ index, color, emote }: Props) => {
  return (
    <View
      key={index}
      style={[
        s.category,
        {
          backgroundColor: color,
          transform: [{ translateX: index * -7 }],
        },
      ]}>
      <Text style={s.emoji}>{emote}</Text>
    </View>
  );
};

export default CategoryIcon;

const s = StyleSheet.create({
  category: {
    width: 28,
    height: 28,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  emoji: { fontSize: 9 },
});
