import { Color } from 'csstype';
import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewProperties, ViewStyle } from 'react-native';

import colors from '../assets/colors';

export interface IProps extends ViewProperties {
  style?: ViewStyle | ViewStyle[];
  color?: Color;
  size?: number | 'large' | 'small' | undefined;
}

/*loader to show when first loading screen*/
const Loader = ({ style, color=colors.black, size = 'large' }: IProps) => {
  return (
    <View style={[styles.view, StyleSheet.absoluteFill, style]}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
