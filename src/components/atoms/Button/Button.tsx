import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '_styles';

interface Props {
  label: string;
  onPress: () => void;
  style?: any;
  textColor?: string;
  fullWidth?: boolean;
}

const Button = ({
  label,
  onPress,
  style,
  textColor = Colors.WHITE,
  fullWidth = false,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={fullWidth ? { flex: 1 } : {}}>
      <View style={[s.wrapper, style]}>
        <Text style={[s.label, { color: textColor }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const s = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.PRIMARY,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  label: {
    fontSize: Typography.FONT_SIZE_14,
    ...Typography.FONT_MEDIUM,
  },
});
