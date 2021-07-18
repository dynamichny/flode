import React, { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ActionIconWrapper } from '_atoms';
import { Colors, Typography } from '_styles';

interface Props {
  title: string;
  goBack: () => void;
}

const ModalHeader = forwardRef(
  ({ title, goBack }: Props, ref: React.ForwardedRef<View>) => {
    return (
      <View ref={ref} style={s.row} renderToHardwareTextureAndroid={true}>
        <Text style={s.screenTitle}>{title}</Text>
        <ActionIconWrapper onPress={goBack} style={s.closeBtn}>
          <Icon name="window-close" size={18} color={Colors.BLACK} />
        </ActionIconWrapper>
      </View>
    );
  },
);

export default ModalHeader;

const s = StyleSheet.create({
  screenTitle: {
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_20,
    ...Typography.FONT_MEDIUM,
    padding: 24,
    paddingRight: 80,
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 24,
    zIndex: 100,
  },
  row: { flexDirection: 'row' },
});
