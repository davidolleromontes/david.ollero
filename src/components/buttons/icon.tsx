import { Color } from 'csstype';
import React, { FC } from 'react';
import { Animated, Image, ImageProps, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface IProps extends ImageProps {
  onPress?: () => void;
  componentStyle?: ViewStyle | ViewStyle[] | (ViewStyle | ViewStyle[])[];
  hitSlop?: number;
  transform?: any;
  tintColor?: Color;
}

const Icon: FC<IProps> = props => {
  const { onPress, componentStyle = {}, style = {}, hitSlop = 10, transform, tintColor, ...params } = props;
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.5 : 1}
      style={[styles.icon, componentStyle]}
      onPress={onPress}
      hitSlop={{ top: hitSlop, left: hitSlop, bottom: hitSlop, right: hitSlop }}
    >
      {!transform ? (
        <Image style={[style, { tintColor }]} {...params} />
      ) : (
        <Animated.Image style={[style, { transform }]} {...params} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default Icon;