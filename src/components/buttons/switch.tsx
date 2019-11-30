import React, { FC } from 'react';
import { ImageStyle, StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import colors from '../../assets/colors'
import dimensions from '../../assets/dimensions'


export interface IProps extends TouchableOpacityProps {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  iconStyle?: ImageStyle | ImageStyle[];
  activeOpacity?: number;
  disabled?: boolean;
  selected?: boolean;
}

const Switch: FC<IProps> = props => {
  const { onPress, style = {}, disabled = false, activeOpacity = 0.8, selected = false } = props;

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={[
        styles.button,
        disabled ? styles.disabledButton : selected ? styles.activeButton : styles.defaultButton,
        selected ? styles.toFlexEnd : styles.toFlexStart,
        style,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.circle,
          disabled ? styles.disabledCircle : selected ? styles.selectedCircle : styles.defaultCircle,
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 46,
    height: 24,
    borderRadius: 100,
    justifyContent: 'center',
    paddingLeft: dimensions.miniSpace,
    paddingRight: dimensions.miniSpace,
  },
  toFlexStart: { alignItems: 'flex-start' },
  toFlexEnd: { alignItems: 'flex-end' },
  defaultButton: {
    backgroundColor: colors.greyLight,
  },
  activeButton: {
    backgroundColor: colors.green,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  defaultCircle: { backgroundColor: colors.greyMedium },
  selectedCircle: { backgroundColor: colors.white },
  disabledCircle: { backgroundColor: colors.greyMedium },

  circle: { width: 16, height: 16, borderRadius: dimensions.radiusCircle },
});

export default Switch;