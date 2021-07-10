import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '_styles';
import { CategoryIcon } from '_atoms';

interface Props {
  imagePath: string;
  title: string;
  id: string;
  creationDate: string;
  categories: string[] | string;
  onPress: () => void | undefined;
}

const ListItem = ({
  imagePath,
  title,
  id,
  categories,
  creationDate,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={typeof onPress == 'undefined' ? 1 : 0.75}>
      <View style={s.wrapper}>
        <Image
          source={{ uri: imagePath }}
          style={s.image}
          resizeMode={'cover'}
        />
        <View style={s.texts}>
          <Text style={s.date}>
            {new Date(creationDate).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })}
          </Text>
          <Text style={s.title}>{title}</Text>
          <View style={s.categories}>
            {categories.map((c, index) => (
              <CategoryIcon index={index} color={c.color} emote={c.emote} />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const s = StyleSheet.create({
  wrapper: {
    height: 135,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  image: {
    height: 121,
    width: 90,
    borderRadius: 15,
    marginRight: 20,
  },
  texts: {
    justifyContent: 'center',
  },
  date: {
    color: Colors.PRIMARY,
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_12,
  },
  title: {
    color: Colors.BLACK,
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    paddingTop: 2,
    paddingBottom: 7,
  },
  categories: {
    flexDirection: 'row',
  },
});
