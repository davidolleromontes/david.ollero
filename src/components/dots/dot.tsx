import React from 'react';
import { StyleSheet, View, ViewProperties, ViewStyle } from 'react-native';
import dimensions from '../../assets/dimensions';
import colors from '../../assets/colors';

export interface IDotProps extends ViewProperties {
  style?: ViewStyle | ViewStyle[];
}
const Dot = ({ style }: IDotProps) => <View style={[styles.dot, style]} />;

const styles = StyleSheet.create({
    dot: {
      height: 6,
      width: 6,
      borderRadius: dimensions.radiusCircle,
      backgroundColor: colors.black,
    },
  });

export default Dot;